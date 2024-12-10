import React, { useState } from "react";
import {
    DialogTrigger,
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import MdiImageAddOutline from "@/components/icons/RecordIcon"; // Adjust the import as necessary
import Image from "next/image";

export function ImageQuestion() {
    const [isOpen, setIsOpen] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpload = () => {
        if (selectedImage) {
            console.log('Uploading:', selectedImage);
            // Reset the state after upload
            setSelectedImage(null);
            setImagePreview(null);
            setIsOpen(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant={"secondary"}>
                    <MdiImageAddOutline width={34} height={34} />
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px] flex items-center justify-center flex-col bg-secondary rounded-lg border border-primary text-center overflow-hidden">
                <DialogHeader>
                    <DialogTitle>Edit Image</DialogTitle>
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                </DialogHeader>
                <div className="flex flex-col items-center justify-center">
                    {imagePreview && (
                        <div className="relative w-52 h-56 overflow-hidden rounded-lg flex items-center justify-center">
                            <Image src={imagePreview} alt="Preview" fill />
                        </div>
                    )}
                </div>
                <DialogFooter className="flex items-center justify-end gap-2">
                    <Button onClick={handleUpload} disabled={!selectedImage}>
                        Upload
                    </Button>
                    <Button onClick={() => setIsOpen(false)} className="ml-2">
                        Cancel
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default ImageQuestion;