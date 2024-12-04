"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import LoaderComponent from "./Loader";

export function NavigationEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 400); // Adjust the duration as needed

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-50 backdrop-blur-sm">
          <LoaderComponent />
        </div>
      )}
    </>
  );
}
