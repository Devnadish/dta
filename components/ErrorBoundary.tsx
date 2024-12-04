"use client";

import { ErrorBoundaryProps } from "@/constant/type";
import { useEffect } from "react";



export default function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h2 className="text-xl font-bold">Something went wrong!</h2>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={reset}
      >
        Try again
      </button>
    </div>
  );
}
