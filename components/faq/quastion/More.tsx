"use client";
import { Button } from "@/components/ui/button";
import { CommentsIcon, ReplayIcon } from "@/components/icons/QIcon";
import React from "react";
import Link from "next/link";
import { incrementViewerCount } from "@/actions/faq/detailQuastion";
import { useRouter } from "next/navigation";
import { ChevronRightIcon } from "lucide-react";
const More = ({ slug, AnswerCount }: { slug: string; AnswerCount: number }) => {
  const router = useRouter();

  const handleMore = async () => {
    const viewerCount = await incrementViewerCount(slug);
    router.push(`/detailquastion/${slug}`);
  };

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <AnswerCounter count={AnswerCount} />
        {/* <CommentCounter count={0} /> */}
      </div>
      <Button onClick={handleMore} variant={"outline"}>
        Read More Add comments <ChevronRightIcon className="w-4 h-4" />
      </Button>
    </div>
  );
};

const AnswerCounter = ({ count }: { count: number }) => {
  return (
    <div className="flex items-center justify-center w-12 h-7 px-1 text-sm text-muted-foreground bg-secondary border border-secondary rounded-md gap-1">
      <ReplayIcon width={20} height={20} className="text-orangeColor" />
      <span className="text-xs">{count}</span>
    </div>
  );
};
export default More;

const CommentCounter = ({ count }: { count: number }) => {
  return (
    <div className="flex items-center justify-center w-12 h-7 px-1 text-sm text-muted-foreground bg-secondary border border-secondary rounded-md gap-1">
      <CommentsIcon width={20} height={20} />
      <span className="text-xs">{count}</span>
    </div>
  );
};
