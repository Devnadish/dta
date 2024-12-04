import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
const DynamicOnOffMenu = dynamic(
  () => import("@/components/headerAndFotter/fotter/OnOffMenu"),
  {
    ssr: false,
    loading: () => <SkeletonCard />,
  }
);

export default DynamicOnOffMenu;

export function SkeletonCard() {
  return (
    <div className="flex flex-col h-[30px] w-[30px] items-center justify-center  bg-slate-500/50 gap-1 rounded-full">
      <Skeleton className="h-[30px] w-[30px] rounded-full" />
    </div>
  );
}
