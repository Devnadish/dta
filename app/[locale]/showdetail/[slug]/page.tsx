import { imageUrl } from "@/lib/imageUrl";
import { getPost } from "@/sanity/lib/homePage/getAllservice";
import { PortableText } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = await getPost(slug, locale );
  if (!post) {
    return notFound();
  }
  return (
    <div className="max-w-4xl mx-auto p-6 flex flex-col gap-6 items-center justify-center bg-background dark:bg-background-dark">
      <div className="w-full flex flex-row items-center justify-between">
        <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
        {post.gallery && (
          <Link
            href={{
              pathname: `/${locale}/gallery/${post.slug?.current}`,
              query: { path: post?.galleryPath },
            }}
            className="bg-secondary text-foreground hover:bg-primary/80 transition duration-200 rounded-full px-4 py-2 text-sm"
          >
            View Gallery
          </Link>
        )}
      </div>
      <div className="w-full mb-6">
        <Image
          src={
            post.mainImage
              ? imageUrl(post.mainImage).url()
              : "/fallback-image.jpg"
          }
          alt={post.title || "Fallback image"}
          layout="responsive"
          width={720} // Added width property
          height={536} // Added height property
          className="rounded-lg"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
      </div>
      <div className="prose prose-li:text-foreground/70 prose-strong:text-foreground max-w-none mb-8 text-foreground prose-h3:text-foreground ">
        {Array.isArray(post.body) && <PortableText value={post.body} />}
      </div>
    </div>
  );
}
