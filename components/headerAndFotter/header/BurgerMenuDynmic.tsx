"use client";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
const DynamicBurgerMenu = dynamic(
  () => import("@/components/headerAndFotter/header/BuregerMenu"),
  {
    ssr: false,
    loading: () => <SkeletonCard />,
  }
);

export default DynamicBurgerMenu;

export function SkeletonCard() {
  return (
    <div className="flex flex-col h-[30px] w-[30px] items-center justify-center rounded-md bg-slate-500/50 gap-1">
      <Skeleton className="h-[4px] w-[30px]" />
      <Skeleton className="h-[4px] w-[30px]" />
      <Skeleton className="h-[4px] w-[30px]" />
    </div>
  );
}
