import Image from 'next/image';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useToast } from "@/hooks/use-toast";

interface ImageDropzoneProps {
    images: File[];
    setImages: React.Dispatch<React.SetStateAction<File[]>>;
    maxFiles?: number;
}

const validateImage = async (file: File): Promise<boolean> => {
    // Check file type
    if (!file.type.startsWith('image/')) {
        return false;
    }

    // Check file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
        return false;
    }

    return new Promise((resolve) => {
        const img = document.createElement('img');
        img.onload = () => {
            URL.revokeObjectURL(img.src);
            resolve(true);
        };
        img.onerror = () => {
            URL.revokeObjectURL(img.src);
            resolve(false);
        };
        img.src = URL.createObjectURL(file);
    });
};

const ImageDropzone: React.FC<ImageDropzoneProps> = ({ images, setImages, maxFiles = Infinity }) => {
    const { toast } = useToast();
    const [previews, setPreviews] = useState<string[]>([]);

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        if (images.length + acceptedFiles.length > maxFiles) {
            toast({
                title: "Maximum images limit reached",
                description: `You can only upload up to ${maxFiles} images`,
                variant: "destructive",
            });
            return;
        }

        // Validate each file
        const validationPromises = acceptedFiles.map(validateImage);
        const validationResults = await Promise.all(validationPromises);
        
        const validFiles = acceptedFiles.filter((_, index) => validationResults[index]);
        const invalidCount = acceptedFiles.length - validFiles.length;

        if (invalidCount > 0) {
            toast({
                title: "Invalid files detected",
                description: `${invalidCount} file(s) were not valid images or exceeded size limit (max 5MB) and were skipped`,
                variant: "destructive",
            });
        }

        if (validFiles.length > 0) {
            const remainingSlots = maxFiles - images.length;
            const filesToAdd = validFiles.slice(0, remainingSlots);
            
            // Create new previews
            const newPreviews = filesToAdd.map(file => URL.createObjectURL(file));
            setPreviews(prev => [...prev, ...newPreviews]);
            
            setImages(prevImages => [...prevImages, ...filesToAdd]);
        }
    }, [setImages, maxFiles, images.length, toast]);

    const removeImage = (index: number) => {
        // Cleanup preview URL
        if (previews[index]) {
            URL.revokeObjectURL(previews[index]);
        }
        setPreviews(prev => prev.filter((_, i) => i !== index));
        setImages(prevImages => prevImages.filter((_, i) => i !== index));
    };

    const removeAllImages = () => {
        // Cleanup all preview URLs
        previews.forEach(url => URL.revokeObjectURL(url));
        setPreviews([]);
        setImages([]);
    };

    // Cleanup previews on unmount
    React.useEffect(() => {
        return () => {
            previews.forEach(url => URL.revokeObjectURL(url));
        };
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': [] // Accept only images
        },
        maxFiles: maxFiles - images.length,
        disabled: images.length >= maxFiles,
    });

    return (
        <div className="w-full">
            <div 
                {...getRootProps({ 
                    className: `dropzone border-2 border-dashed rounded-lg p-4 w-full text-center transition-colors
                        ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-400'}
                        ${images.length >= maxFiles ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-blue-500'}
                    `
                })}
            >
                <input {...getInputProps()} />
                {images.length >= maxFiles ? (
                    <p className="text-gray-500">Maximum number of images reached</p>
                ) : (
                    <div className="space-y-2">
                        <p>Drag 'n' drop images here, or click to select</p>
                        <p className="text-sm text-gray-500">Maximum file size: 5MB</p>
                    </div>
                )}
            </div>

            {images.length > 0 && (
                <div className="mt-4">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-500">
                            {images.length} of {maxFiles} images
                        </span>
                        <button
                            onClick={removeAllImages}
                            className="text-sm text-red-500 hover:text-red-700"
                        >
                            Remove all
                        </button>
                    </div>
                    <div className="flex items-center justify-start gap-4 flex-wrap">
                        {images.map((file, index) => (
                            <div key={index} className="relative group">
                                <div className="w-24 h-24 relative">
                                    <img
                                        src={previews[index]}
                                        alt={file.name}
                                        className="w-full h-full object-cover rounded-lg transition-transform group-hover:scale-105"
                                    />
                                </div>
                                <button
                                    onClick={() => removeImage(index)}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center
                                        opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageDropzone;