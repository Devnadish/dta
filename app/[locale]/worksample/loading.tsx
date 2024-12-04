import { SkeletonProps } from "@/constant/type";
import React from "react";

// Define the Loading component
const Loading: React.FC = () => {
  return (
    <div className="flex flex-wrap items-center justify-evenly gap-4 p-4">
      {/* Render multiple WorkeSkelton components */}
      {Array.from({ length: 10 }).map((_, index) => (
        <WorkeSkelton key={index} />
      ))}
    </div>
  );
};

// Define the WorkeSkelton component
const WorkeSkelton: React.FC = () => {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
};

// Define the Skeleton component (assuming it's a placeholder)


const Skeleton: React.FC<SkeletonProps> = ({ className }) => {
  return <div className={`bg-gray-300 animate-pulse ${className}`} />;
};

export default Loading;
