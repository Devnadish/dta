"use client";
import { submitFaq } from '@/actions/faq/submitFaq';
import React, { useEffect, useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Button } from '@/components/ui/button';
import LoaderComponent from '@/components/Loader';

import MediaUploadSection from './_component/MediaUploadSection';
import QuestionInput from './_component/QuestionInput';
import PrioritySelector from './_component/PrioritySelector';
import PolicyHints from './_component/PolicyHints';
import LoadingAddFaq from './_component/LoaderFAQ';


// Types
interface FaqFormData {
    question: string;
    priority: number;
    images: File[];
    voiceRecording?: File;
}

// Policy Hints Component



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
            await submitFaq({
                question: formData.question,
                priority: formData.priority,
                images: formData.images,
                voiceRecording: formData.voiceRecording,
                userPlan,
                userEmail: "userEmail"
            });

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

    if (!isMounted) return <LoadingAddFaq />;
    
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