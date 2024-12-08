"use client";
import { interactionAction } from "@/actions/faq/detailQuastion";
import LoveIt, { Dislike } from "@/components/icons/QIcon";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

const ViewerCounter = ({
  viewerCount,
  loveCount,
  dislikeCount,
}: {
  viewerCount: number;
  loveCount: number;
  dislikeCount: number;
}) => (
  <div className="flex items-center justify-end gap-1  flex-row   ">
    <ShowCounters counter={viewerCount} icon={<Eye className="w-4 h-4" />} />
    <ShowCounters
      counter={loveCount}
      icon={<LoveIt width={16} height={16} />}
    />
    <ShowCounters
      counter={dislikeCount}
      icon={<Dislike width={16} height={16} />}
    />
  </div>
);
export default ViewerCounter;

export const LoveItConter = ({
  loveCount,
  slug,
  userEmail,
}: {
  loveCount: number;
  slug: string;
  userEmail: string;
}) => {
  const handleLoveIt = async () => {
    await interactionAction(slug, userEmail, "love");
  };

  return (
    <Button
      className="text-sm text-muted-foreground flex items-center justify-center h-5  bg-greenColor  "
      onClick={handleLoveIt}
      variant={"link"}
    >
      {/* <LoveIt width={16} height={16} /> */}

      <p className="text-[10px] text-foreground">I love it</p>
    </Button>
  );
};
export const DislikeCounter = ({
  dislovCount,
  slug,
  userEmail,
}: {
  dislovCount: number;
  slug: string;
  userEmail: string;
}) => {
  const handleDislike = async () => {
    await interactionAction(slug, userEmail, "dislike");
  };
  return (
    <Button
      className="text-sm  flex items-center justify-center h-5  bg-destructive text-foreground  "
      onClick={handleDislike}
      variant={"link"}
    >
      <p className="text-[10px]">I dislike it</p>
    </Button>
  );
};

const ShowCounters = ({
  counter,
  icon,
}: {
  counter: number;
  icon: React.ReactNode;
}) => (
  <div className="rounded-md text-xs text-muted-foreground flex items-center justify-center    border bg-secondary border-white/20 p-0 py-1 px-2">
    {icon}
    <p className="text-[10px]">{counter}</p>
  </div>
);
