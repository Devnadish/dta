"use server";
import db from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { uploadToS3 } from "@/lib/s3";

interface SubmitFaqParams {
    question: string;
    priority: number;
    images: File[];
    voiceRecording?: File;
    userPlan: string;
    userEmail: string;
}

interface ValidationResult {
    isValid: boolean;
    errors: string[];
}

const planLimits = {
    basic: { images: 1, voiceMinutes: 1 },
    premium: { images: 5, voiceMinutes: 5 },
    enterprise: { images: 10, voiceMinutes: 10 }
} as const;

const validateSubmission = ({
    question,
    priority,
    images,
    voiceRecording,
    userPlan
}: SubmitFaqParams): ValidationResult => {
    const errors: string[] = [];

    // Question validation
    if (!question || question.length < 10) {
        errors.push("Question must be at least 10 characters long");
    }
    if (question.length > 500) {
        errors.push("Question cannot exceed 500 characters");
    }
    if (/^[^a-zA-Z0-9]+$/.test(question)) {
        errors.push("Question cannot contain only special characters");
    }

    // Priority validation
    if (priority < 1 || priority > 5) {
        errors.push("Priority must be between 1 and 5");
    }

    // Plan validation
    const limit = planLimits[userPlan as keyof typeof planLimits];
    if (!limit) {
        errors.push("Invalid user plan");
        return { isValid: false, errors };
    }

    // Image count validation
    if (images.length > limit.images) {
        errors.push(`Your plan allows maximum of ${limit.images} images`);
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};

const validateImageFile = async (file: File): Promise<boolean> => {
    // Check file type
    if (!file.type.startsWith('image/')) {
        return false;
    }

    // Check file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
        return false;
    }

    return true;
};

const validateVoiceFile = async (file: File): Promise<boolean> => {
    // Check file type
    if (!file.type.startsWith('audio/')) {
        return false;
    }

    // Check file size (max 10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
        return false;
    }

    return true;
};

export async function submitFaq(params: SubmitFaqParams) {
    const validation = validateSubmission(params);
    if (!validation.isValid) {
        return { error: validation.errors.join(", ") };
    }

    const { question, priority, images, voiceRecording, userPlan, userEmail } = params;
    
    console.log("Submitting FAQ:", {question, priority, images, voiceRecording, userPlan, userEmail});

    try {
        // Validate images
        if (images.length > 0) {
            const imageValidations = await Promise.all(images.map(validateImageFile));
            const invalidImages = imageValidations.filter(result => !result).length;
            
            if (invalidImages > 0) {
                return { error: `${invalidImages} invalid image(s) detected. Please ensure all files are images under 5MB.` };
            }
        }

        // Validate voice recording
        if (voiceRecording) {
            const isValidVoice = await validateVoiceFile(voiceRecording);
            if (!isValidVoice) {
                return { error: "Invalid voice recording. Please ensure it's an audio file under 10MB." };
            }
        }

        const slug = question
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "");

        const existingFaq = await db.faq.findFirst({
            where: { slug }
        });

        if (existingFaq) {
            return { error: "A similar question already exists" };
        }

        // Create the FAQ entry first
        const faq = await db.faq.create({
            data: {
                question,
                slug,
                priority,
                userPlan,
                userEmail,
                published: true,
                rejected: false,
                gotAnswer: false,
                viewerCount: 0,
                loveCount: 0,
                dislovCount: 0,
                rejectedReason: "",
            },
        });

        // Handle image uploads
        if (images.length > 0) {
            try {
                const imageUploadPromises = images.map(async (image) => {
                    const imageUrl = await uploadToS3(image, "images");
                    return db.faqImage.create({
                        data: {
                            url: imageUrl,
                            faqId: faq.id
                        }
                    });
                });
                await Promise.all(imageUploadPromises);
            } catch (error) {
                console.error("Error uploading images:", error);
                // Delete the FAQ if image upload fails
                await db.faq.delete({ where: { id: faq.id } });
                return { error: "Failed to upload images. Please try again." };
            }
        }

        // Handle voice recording
        if (voiceRecording) {
            try {
                const voiceUrl = await uploadToS3(voiceRecording, "audio");
                await db.faqVoiceRecording.create({
                    data: {
                        url: voiceUrl,
                        faqId: faq.id
                    }
                });
            } catch (error) {
                console.error("Error uploading voice recording:", error);
                // Delete the FAQ if voice upload fails
                await db.faq.delete({ where: { id: faq.id } });
                return { error: "Failed to upload voice recording. Please try again." };
            }
        }

        revalidatePath("/faq");
        return { success: true, data: faq };
    } catch (error) {
        console.error("Error submitting FAQ:", error);
        return { error: "Failed to submit question. Please try again." };
    }
}