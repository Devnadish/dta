"use client";
import React, { useState } from "react";
import Loader from "./Loader";
import Image from "next/image";
import { Expand } from "lucide-react";
import {
  DialogTrigger,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import LoaderComponent from "@/components/Loader";

function ImageGallery({
  gallery,
  altTitle,
}: {
  gallery: string[];
  altTitle: string;
}) {
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleExpandClick = (image: string) => {
    setSelectedImage(image);
  };
  if (!gallery.length) {
    return <NoGallery />;
  }

  return (
    <div>
      {loading && <LoaderComponent />}

      <div className="grid grid-cols-3 gap-4 justify-items-center">
        {gallery.map((image: string, index: number) => (
          <div
            key={index}
            className="relative w-[300px] h-[300px] group overflow-hidden rounded-lg shadow-lg border p-4"
          >
            <Image
              src={image}
              alt={`Gallery image ${index + 1} - ${altTitle}`}
              fill
              className="object-contain transition-transform duration-300 transform group-hover:scale-105"
              loading="lazy"
              onLoad={() => setLoading(false)}
            />
            <div onClick={() => handleExpandClick(image)}>
              <ShowImage
                selectedImage={selectedImage}
                altTitle={`Gallery image ${index + 1} - ${altTitle}`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageGallery;

export function ShowImage({
  selectedImage,
  altTitle,
}: {
  selectedImage: string | null;
  altTitle: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="absolute top-2 right-2 text-white opacity-75 group-hover:opacity-100 transition-opacity duration-300"
        >
          <Expand className="w-6 h-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] flex items-center justify-center flex-col">
        <DialogHeader>
          <DialogTitle className="hidden">Edit profile</DialogTitle>
        </DialogHeader>
        {selectedImage && (
          <div className="relative w-[425px] h-[380px] aspect-[3/4] bg-muted flex items-center justify-center ">
            <Image
              src={selectedImage}
              alt={altTitle}
              // layout="responsive"
              fill
              className="object-contain p-2"
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
const NoGallery = () => {
  return (
    <div className="flex items-center justify-center h-96">
      <h2 className="text-2xl font-bold text-muted-foreground">
        No images found for this gallery.
      </h2>
    </div>
  );
};
