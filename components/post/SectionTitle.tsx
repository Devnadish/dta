import { SectionTitleProps } from "@/constant/type";
import React from "react";

function SectionTitle({ title, icon }: SectionTitleProps) {
  return (
    <div className="flex flex-row gap-1  items-center justify-center self-start borer-b-2 border-b-2 border-orangeColor w-fit ">
      {icon}
      <p className="text-sm md:text-2xl font-cairo font-semibold">{title}</p>
    </div>
  );
}

export default SectionTitle;
