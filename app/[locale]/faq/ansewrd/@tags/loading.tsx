import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function loading() {
  return (
    <div className="flex flex-row gap-4 items-center justify-center ">
      <Skeleton className="h-9 w-[200px] rounded-md" />
    </div>
  );
}

export default loading;
