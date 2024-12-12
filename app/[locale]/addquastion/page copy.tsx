"use client";
import { submitFaq } from '@/actions/faq/submitFaq';
import ImageDropzone from '@/components/ImageDropzone';
import React, { useEffect, useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { RecordQuestion } from '@/components/faq/quastion/RecordQuestion';
import AudioRecorder from '@/components/MicRecored';
import LoaderComponent from '@/components/Loader';
import { motion, AnimatePresence } from "framer-motion";
// Policy Hints Component
const PolicyHints = ({ 
    showPolicyHint, 
    setShowPolicyHint 
}: { 
    showPolicyHint: boolean; 
    setShowPolicyHint: (show: boolean) => void; 
}) => {
    return (
        <motion.div 
            className="mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <motion.button
                onClick={() => setShowPolicyHint(!showPolicyHint)}
                className="text-sm text-blue-500 hover:underline mb-2 flex items-center gap-2 w-full"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
            >
                <motion.span
                    animate={{ rotate: showPolicyHint ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    ↓
                </motion.span>
                {showPolicyHint ? 'Hide Policy Hints' : 'Show Policy Hints'}
            </motion.button>

            <AnimatePresence>
                {showPolicyHint && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0, y: -20 }}
                        animate={{ 
                            opacity: 1, 
                            height: "auto", 
                            y: 0,
                        }}
                        exit={{ 
                            opacity: 0, 
                            height: 0, 
                            y: -20,
                            transition: { duration: 0.2 }
                        }}
                        transition={{ 
                            duration: 0.3,
                            ease: "easeOut"
                        }}
                        className="overflow-hidden"
                    >
                        <motion.div 
                            className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm border border-blue-200"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                        >
                            <motion.h3 
                                className="font-medium mb-2 text-blue-600"
                                initial={{ x: -20 }}
                                animate={{ x: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                Question Submission Guidelines:
                            </motion.h3>
                            <motion.ul 
                                className="list-disc pl-4 space-y-2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                {[
                                    "Questions should be clear and specific",
                                    "Avoid sharing sensitive personal information",
                                    "Higher priority questions (4-5) are for urgent matters",
                                    "Images should be relevant to the question",
                                    "Voice recordings should be clear and concise"
                                ].map((item, index) => (
                                    <motion.li
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ 
                                            delay: 0.3 + (index * 0.1),
                                            duration: 0.2
                                        }}
                                    >
                                        {item}
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

// Priority Selector Component
const PrioritySelector = ({ 
    priority, 
    setPriority 
}: { 
    priority: number; 
    setPriority: (priority: number) => void; 
}) => {
    return (
        <div className="mt-4">
            <label className="block text-sm font-medium mb-2">Priority Level</label>
            <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((level) => (
                    <Button
                        key={level}
                        onClick={() => setPriority(level)}
                        className={`px-4 py-2 rounded ${
                            priority === level 
                                ? 'bg-blue-500 text-white' 
                                : 'bg-gray-200 hover:bg-gray-300'
                        }`}
                    >
                        {level}
                    </Button>
                ))}
            </div>
        </div>
    );
};

// Media Upload Section Component
const MediaUploadSection = ({ 
    images, 
    setImages, 
    planLimits 
}: { 
    images: File[]; 
    setImages: React.Dispatch<React.SetStateAction<File[]>>; 
    planLimits: { images: number; voiceMinutes: number; }; 
}) => {
    return (
        <>
            <div className="mt-6">
                <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium">Attach Images</label>
                    <span className="text-sm text-gray-500">
                        ({images.length}/{planLimits.images} images allowed)
                    </span>
                </div>
                <ImageDropzone 
                    images={images} 
                    setImages={setImages} 
                    maxFiles={planLimits.images}
                />
            </div>

            <div className="mt-6">
                <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium">Voice Recording</label>
                    <span className="text-sm text-gray-500">
                        (Max {planLimits.voiceMinutes} minutes)
                    </span>
                </div>
                <AudioRecorder 
                    uploadUrl="https://api.dreamto.app/api/upload" 
                    maxRecordingTime={planLimits.voiceMinutes * 60} 
                />
            </div>
        </>
    );
};

interface Qusation {
    Askquestion: string;
    setAskQuestion: React.Dispatch<React.SetStateAction<string>>;
    handleSave?: () => void;
    userName?: string;
    priority: number;
    setPriority: React.Dispatch<React.SetStateAction<number>>;
}

function Page() {
    const [images, setImages] = useState<File[]>([]);
    const [Askquestion, setAskQuestion] = useState("");
    const [priority, setPriority] = useState(1);
    const [isMounted, setIsMounted] = useState(false);
    const [showPolicyHint, setShowPolicyHint] = useState(false);
    const { toast } = useToast();
    const userPlan = "basic"; // This should come from your user context/authentication

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleSave = async () => {
        if (!Askquestion.trim()) {
            toast({
                title: "Error",
                description: "Please enter your question",
                variant: "destructive",
            });
            return;
        }

        try {
            console.log('Saving question:', { 
                question: Askquestion, 
                priority,
                images,
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to submit question",
                variant: "destructive",
            });
        }
    };

    const getPlanLimits = () => {
        const plans = {
            basic: { images: 1, voiceMinutes: 1 },
            premium: { images: 5, voiceMinutes: 5 },
            enterprise: { images: 10, voiceMinutes: 10 }
        };
        return plans[userPlan as keyof typeof plans];
    };

    if (!isMounted) return <LoaderComponent />;
    
    const planLimits = getPlanLimits();

    return (
        <div className='flex flex-col items-center justify-center gap-4 w-full p-6'>
            <div className='max-w-xl w-full flex flex-col items-center justify-center gap-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6'>
                <h1 className="text-2xl font-bold text-center mb-2">Submit Your Question</h1>
                
                <div className="w-full">
                    <PolicyHints 
                        showPolicyHint={showPolicyHint} 
                        setShowPolicyHint={setShowPolicyHint} 
                    />

                    <TextQuastion 
                        Askquestion={Askquestion} 
                        setAskQuestion={setAskQuestion}
                        priority={priority}
                        setPriority={setPriority}
                    />

                    <PrioritySelector 
                        priority={priority} 
                        setPriority={setPriority} 
                    />

                    <MediaUploadSection 
                        images={images} 
                        setImages={setImages} 
                        planLimits={planLimits} 
                    />

                    <div className="mt-6">
                        <Button 
                            onClick={handleSave}
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                        >
                            Submit Question
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Page;
const TextQuastion = ({ Askquestion, setAskQuestion, userName }: Qusation) => {
    const { toast } = useToast();

    const handleSubmit = async (formData: FormData) => {
        const question = formData.get("question");
        const userEmail = "userEmail"

        if (!question || !question.toString().trim()) {
            toast({
                title: "Error",
                description: "Question is required",
            });
            return;
        }

        const result = await submitFaq(question.toString(), userEmail); // Ensure usernamed is defined

        if (result.error) {
            toast({
                title: "Error",
                description: "Question already exists",
            });
        } else {
            toast({
                title: "Success",
                description: "Question added successfully. Will respond soon.",
            });
            setAskQuestion("");
        }
    };

    return (
        <form action={handleSubmit} className="flex flex-col gap-4 w-full">
            <Textarea
                placeholder="Question"
                value={Askquestion}
                onChange={(e) => setAskQuestion(e.target.value)}
                className="min-h-[100px]"
                name="question" // Changed from "Question" to "question"
                required
            />
            <div className="flex flex-row items-center justify-center gap-4 w-full h-11">
                <Button
                    type="submit"
                    className="bg-green-500 hover:bg-green-600 text-white w-full"
                >
                    Save
                </Button>
            </div>
        </form>
    );
}





