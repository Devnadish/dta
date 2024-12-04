import React, { useState } from "react";
import { Post } from "@/sanity.types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { imageUrl } from "@/lib/imageUrl";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

const PostCard = React.memo(({ post }: { post: Post }) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const t = useTranslations("button");
  const locale = useLocale();
  return (
    <Card className="w-full   flex flex-col   h-full mx-auto  ">
      <div className="relative w-full h-0 pb-[50%]">
        <Image
          src={
            post.mainImage
              ? imageUrl(post.mainImage).url()
              : "/fallback-image.jpg"
          }
          alt={post.title || "Fallback image"}
          fill
          className="object-cover transition-transform duration-200 group-hover:scale-105 rounded-t-lg"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
      </div>
      <CardHeader>
        <CardTitle className="text-xl font-bold font-outfit">
          {post.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <div
          className={`text-muted-foreground font-outfit ${isDescriptionExpanded ? "" : "line-clamp-2"}`}
        >
          {post.description}
        </div>

        {post.description && post.description.length > 100 && (
          <div className="flex items-center justify-end">
            {isDescriptionExpanded ? (
              <ChevronUp
                className="ml-1 inline cursor-pointer text-gravity text-gray-400"
                onClick={() => setIsDescriptionExpanded(false)}
              />
            ) : (
              <ChevronDown
                className="ml-1 inline cursor-pointer text-gravity text-gray-400"
                onClick={() => setIsDescriptionExpanded(true)}
              />
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-row items-center w-full justify-between ">
        <Link
          className="bg-secondary font-cairo font-[600] text-foreground hover:bg-primary/80 transition duration-200 rounded-full px-4 py-2 text-xs  "
          href={`/${locale}/showdetail/${post.slug?.current}`}
        >
          {t("details")}
        </Link>

        {post.gallery && (
          <Link
            href={{
              pathname: `/${locale}/gallary/${post.slug?.current}`,
              query: { path: post?.galleryPath },
            }}
            className="bg-secondary font-cairo  text-foreground hover:bg-primary/80 transition duration-200 rounded-full px-4 py-2 text-sm"
          >
            {t("showGallery")}
          </Link>
        )}
      </CardFooter>
    </Card>
  );
});

export default PostCard;

// galleryPath;
