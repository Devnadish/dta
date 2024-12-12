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


// Types
interface FaqFormData {
    question: string;
    priority: number;
    images: File[];
    voiceRecording?: File;
}

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

// Question Input Component
const QuestionInput = ({ 
    question,
    setQuestion,
    onError
}: { 
    question: string;
    setQuestion: (question: string) => void;
    onError: (message: string) => void;
}) => {
    const MAX_LENGTH = 500;
    const MIN_LENGTH = 10;
    
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        
        // Prevent exceeding max length
        if (value.length > MAX_LENGTH) {
            onError(`Question cannot exceed ${MAX_LENGTH} characters`);
            return;
        }
        
        setQuestion(value);
    };

    const getRemainingChars = () => MAX_LENGTH - question.length;
    
    const getCharacterCountColor = () => {
        const remaining = getRemainingChars();
        if (question.length < MIN_LENGTH) return "text-red-500";
        if (remaining < MAX_LENGTH * 0.2) return "text-orange-500";
        return "text-gray-500";
    };

    const isValidLength = question.length >= MIN_LENGTH && question.length <= MAX_LENGTH;
    const hasSpecialCharsOnly = /^[^a-zA-Z0-9]+$/.test(question);
    const isValid = isValidLength && !hasSpecialCharsOnly;

    const handleClear = () => {
        setQuestion("");
    };

    return (
        <div className="w-full space-y-2">
            <div className="flex justify-between items-center">
                <label className="block text-sm font-medium">Your Question</label>
                <span className={`text-xs ${getCharacterCountColor()}`}>
                    {getRemainingChars()} characters remaining
                </span>
            </div>
            <div className="relative">
                <Textarea
                    value={question}
                    onChange={handleChange}
                    placeholder="Type your question here... (min 10 characters)"
                    className={`min-h-[100px] bg-gray-100 dark:bg-gray-700 rounded-md pr-16 ${
                        !isValid && question.length > 0 ? 'border-red-500' : ''
                    }`}
                    maxLength={MAX_LENGTH}
                />
                <div className="absolute bottom-2 right-2 flex gap-2 items-center">
                    {question.length > 0 && (
                        <button
                            onClick={handleClear}
                            className="text-gray-500 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
                            title="Clear text"
                        >
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                width="16" 
                                height="16" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="2" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                            >
                                <circle cx="12" cy="12" r="10"/>
                                <line x1="15" y1="9" x2="9" y2="15"/>
                                <line x1="9" y1="9" x2="15" y2="15"/>
                            </svg>
                        </button>
                    )}
                    <div className={`text-xs font-medium ${getCharacterCountColor()} bg-white dark:bg-gray-800 px-2 py-1 rounded-full shadow-sm`}>
                        {getRemainingChars()}
                    </div>
                </div>
            </div>
            
            {/* Validation Messages */}
            <div className="text-xs space-y-1">
                {question.length > 0 && (
                    <>
                        {question.length < MIN_LENGTH && (
                            <p className="text-red-500">
                                ⚠️ Question must be at least {MIN_LENGTH} characters long
                            </p>
                        )}
                        {hasSpecialCharsOnly && (
                            <p className="text-red-500">
                                ⚠️ Question cannot contain only special characters
                            </p>
                        )}
                        {getRemainingChars() < MAX_LENGTH * 0.2 && (
                            <p className="text-orange-500">
                                ℹ️ Only {getRemainingChars()} characters remaining
                            </p>
                        )}
                    </>
                )}
                <ul className="text-gray-500 list-disc pl-4 pt-1">
                    <li>Must be between {MIN_LENGTH} and {MAX_LENGTH} characters</li>
                    <li>Cannot contain only special characters</li>
                    <li>Should be clear and specific</li>
                </ul>
            </div>
        </div>
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
            <div className="flex gap-2 flex-wrap">
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
    voiceRecording,
    setVoiceRecording,
    planLimits 
}: { 
    images: File[]; 
    setImages: React.Dispatch<React.SetStateAction<File[]>>;
    voiceRecording: File | undefined;
    setVoiceRecording: (file: File | undefined) => void;
    planLimits: { images: number; voiceMinutes: number; }; 
}) => {
    const handleVoiceUpload = (blob: Blob) => {
        // Convert Blob to File
        const file = new File([blob], 'voice-recording.webm', {
            type: blob.type,
            lastModified: Date.now()
        });
        setVoiceRecording(file);
    };

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
                    onRecordingComplete={handleVoiceUpload}
                />
            </div>
        </>
    );
};

function Page() {
    // Centralized state
    const [formData, setFormData] = useState<FaqFormData>({
        question: "",
        priority: 1,
        images: [],
        voiceRecording: undefined
    });
    const [isMounted, setIsMounted] = useState(false);
    const [showPolicyHint, setShowPolicyHint] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();
    const userPlan = "basic"; // This should come from your user context/authentication

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const getPlanLimits = () => {
        const plans = {
            basic: { images: 1, voiceMinutes: 1 },
            premium: { images: 5, voiceMinutes: 5 },
            enterprise: { images: 10, voiceMinutes: 10 }
        };
        return plans[userPlan as keyof typeof plans];
    };

    const handleSubmit = async () => {
        if (!formData.question.trim()) {
            toast({
                title: "Error",
                description: "Please enter your question",
                variant: "destructive",
            });
            return;
        }

        setIsSubmitting(true);
        try {
            // Here you would typically make an API call
            // await submitFaq({
            //     question: formData.question,
            //     priority: formData.priority,
            //     images: formData.images,
            //     voiceRecording: formData.voiceRecording,
            //     userPlan
            // });

            toast({
                title: "Success",
                description: "Your question has been submitted successfully",
            });

            // Reset form after successful submission
            setFormData({
                question: "",
                priority: 1,
                images: [],
                voiceRecording: undefined
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to submit question. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
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

                    <QuestionInput 
                        question={formData.question}
                        setQuestion={(question) => setFormData(prev => ({ ...prev, question }))}
                        onError={(message) => toast({ title: "Error", description: message, variant: "destructive" })}
                    />

                    <PrioritySelector 
                        priority={formData.priority} 
                        setPriority={(priority) => setFormData(prev => ({ ...prev, priority }))}
                    />

                    <MediaUploadSection 
                        images={formData.images}
                        setImages={(images) => setFormData(prev => ({ ...prev, images: Array.isArray(images) ? images : prev.images }))}
                        voiceRecording={formData.voiceRecording}
                        setVoiceRecording={(file) => setFormData(prev => ({ ...prev, voiceRecording: file }))}
                        planLimits={planLimits}
                    />

                    <div className="mt-6">
                        <Button 
                            onClick={handleSubmit}
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Question'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Page;