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

interface ImageDropzoneProps {
    images: File[];
    setImages: React.Dispatch<React.SetStateAction<File[]>>;
    handleSave?: () => void; // Made optional
}

interface Qusation {
    Askquestion: string; // Changed from String to string
    setAskQuestion: React.Dispatch<React.SetStateAction<string>>; // Changed from String to string
    handleSave?: () => void; // Optional function
    userName?: String; //
}

function Page() {
    const [images, setImages] = useState<File[]>([]);
    const [Askquestion, setAskQuestion] = useState("");
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);


    const handleSave = () => {
        console.log('Saving images:', images);
    };

    if (!isMounted) return <LoaderComponent />;
    return (
        <div className='flex flex-col items-center justify-center gap-4 w-full'>
            <div className='max-w-xl w-full flex flex-col items-center justify-center gap-4'>
                <TextQuastion Askquestion={Askquestion} setAskQuestion={setAskQuestion} userName={",jakjkj"} />
                <ImageDropzone images={images} setImages={setImages} />
                {/* <Qimages images={images} setImages={setImages} handleSave={handleSave} /> */}
                {/* <RecordQuastion /> */}
                <AudioRecorder uploadUrl="https://api.dreamto.app/api/upload" maxRecordingTime={10} />

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


