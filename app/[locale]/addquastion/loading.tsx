import FaqSkelton from "@/components/skelton/FaqSkelton";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function loading() {
  return (
    <div className="flex flex-col gap-4">
      <FaqSkelton />
      <FaqSkelton />
      <FaqSkelton />
      <FaqSkelton />
    </div>
  );
}

export default loading;


