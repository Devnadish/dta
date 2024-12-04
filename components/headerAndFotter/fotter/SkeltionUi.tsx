import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonUi() {
  return (
    <div className="flex flex-col h-[24px] w-[24px] items-center justify-center  bg-slate-500/50 gap-1 rounded-full">
      <Skeleton className="h-[24px] w-[24px] rounded-full" />
    </div>
  );
}
