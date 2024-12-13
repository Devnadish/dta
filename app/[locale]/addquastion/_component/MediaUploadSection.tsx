"use client";
import dynamic from 'next/dynamic';
import ImageDropzone from '@/components/ImageDropzone';
import React from 'react';
import LoaderComponent from '@/components/Loader';

// Dynamically import AudioRecorder with SSR disabled
const AudioRecorder = dynamic(
    () => import('@/components/MicRecored'),
    { 
        ssr: false,
        loading: () => <LoaderComponent />
    }
);

interface MediaUploadSectionProps {
    images: File[];
    setImages: React.Dispatch<React.SetStateAction<File[]>>;
    voiceRecording: File | undefined;
    setVoiceRecording: (file: File | undefined) => void;
    planLimits: {
        images: number;
        voiceMinutes: number;
    };
}

const MediaUploadSection: React.FC<MediaUploadSectionProps> = ({
    images,
    setImages,
    voiceRecording,
    setVoiceRecording,
    planLimits
}) => {
    const handleVoiceUpload = (blob: Blob) => {
        const file = new File([blob], 'voice-recording.webm', {
            type: blob.type,
            lastModified: Date.now()
        });
        setVoiceRecording(file);
    };

    return (
        <div className="space-y-6">
            <div>
                <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium">
                        Attach Images
                    </label>
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

            <div>
                <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium">
                        Voice Recording
                    </label>
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
        </div>
    );
};

export default MediaUploadSection;