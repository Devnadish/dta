// ImageDropzone.tsx
import Image from 'next/image';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface ImageDropzoneProps {
    images: File[]; // Array of images passed from the parent
    setImages: React.Dispatch<React.SetStateAction<File[]>>; // Function to update images in the parent
}

const ImageDropzone: React.FC<ImageDropzoneProps> = ({ images, setImages }) => {

    const onDrop = useCallback((acceptedFiles: File[]) => {
        // Update the images state in the parent component
        setImages((prevImages) => [...prevImages, ...acceptedFiles]);
    }, [setImages]);

    const removeImage = (index: number) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    const removeAllImages = () => {
        setImages([]);
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'image/*': [] // Accept only images
        },
    });

    return (
        <div>
            <div {...getRootProps({ className: 'dropzone border-2 border-dashed border-gray-400 p-4 w-full text-center' })}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            <div className="mt-4 flex items-center justify-center gap-4 flex-wrap">
                {images.map((file, index) => (
                    <div key={index} className="relative">
                        <Image
                            src={URL.createObjectURL(file)}
                            alt={file.name}
                            width={200}
                            height={200}
                            className="w-24 h-24 object-cover rounded"
                        />
                        <button
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 border text-red-500 bg-white border-red-500 rounded-full p-1 size-6 flex items-center justify-center font-bo"
                        >
                            &times; {/* Close icon */}
                        </button>
                    </div>
                ))}
            </div>
            {images.length > 0 && (
                <button
                    onClick={removeAllImages}
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                    Remove All Images
                </button>
            )}
        </div>
    );
};

export default ImageDropzone;