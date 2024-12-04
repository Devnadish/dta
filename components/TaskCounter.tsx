"use client"; // Ensure this is a Client Component

import React, { useEffect, useState } from "react";
import { getImages } from "@/lib/awsImages";
import { TaskCounterProps } from "@/constant/type";



const TaskCounter: React.FC<TaskCounterProps> = ({ prefix }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [taskCounter, setTaskCounter] = useState<number>(0);

  useEffect(() => {
    const fetchTaskCounter = async () => {
      setLoading(true);
      try {
        const images = await getImages(prefix);
        setTaskCounter(images.length);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTaskCounter();
  }, [prefix]);

  return (
    <div className="text-primary text-xs w-[24px] h-[24px] flex items-center justify-center border border-primary bg-primary/40 p-1 rounded-full absolute left-2 top-2">
      {loading ? <CircularLoader /> : taskCounter}
    </div>
  );
};

// Circular Loader Component
const CircularLoader: React.FC = () => (
  <div className="flex items-center justify-center">
    <div className="animate-spin rounded-full border-t-2 border-b-2 border-blue-500 h-4 w-4"></div>
  </div>
);

export default TaskCounter;
