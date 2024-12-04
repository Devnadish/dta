import { getImages } from "@/lib/awsImages";
import React from "react";
import ImageGallery from "@/components/ImageGallery";
import { propType } from "@/constant/type";

export const dynamic = "force-dynamic";



export default async function Page({ params, searchParams }: propType) {
  const slug = (await params).slug;
  const galleryPath = (await searchParams).path;

  const unsluggedSlug = slug.replace(/-/g, " ");
  const gallery = await getImages(galleryPath + "/");

  if (!gallery) {
    return <h1>No images found for this gallery.</h1>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold capitalize mb-2">
        <span className="uppercase text-primary ml-4"> gallery of </span>
        {unsluggedSlug}
      </h1>

      <ImageGallery gallery={gallery} altTitle={unsluggedSlug} />
    </div>
  );
}
