import Image from 'next/image';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useToast } from "@/hooks/use-toast";

interface ImageDropzoneProps {
    images: File[];
    setImages: React.Dispatch<React.SetStateAction<File[]>>;
    maxFiles?: number;
}

const ImageDropzone: React.FC<ImageDropzoneProps> = ({ images, setImages, maxFiles = Infinity }) => {
    const { toast } = useToast();

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (images.length + acceptedFiles.length > maxFiles) {
            toast({
                title: "Maximum images limit reached",
                description: `You can only upload up to ${maxFiles} images`,
                variant: "destructive",
            });
            // Only add images up to the limit
            const remainingSlots = maxFiles - images.length;
            if (remainingSlots > 0) {
                setImages((prevImages) => [...prevImages, ...acceptedFiles.slice(0, remainingSlots)]);
            }
            return;
        }
        setImages((prevImages) => [...prevImages, ...acceptedFiles]);
    }, [setImages, maxFiles, images.length, toast]);

    const removeImage = (index: number) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    const removeAllImages = () => {
        setImages([]);
    };

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
                    <p>Drag 'n' drop images here, or click to select</p>
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
                                <Image
                                    src={URL.createObjectURL(file)}
                                    alt={file.name}
                                    width={200}
                                    height={200}
                                    className="w-24 h-24 object-cover rounded-lg transition-transform group-hover:scale-105"
                                    loading="lazy"
                                    onLoad={(e) => {
                                        URL.revokeObjectURL(e.currentTarget.src);
                                    }}
                                />
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