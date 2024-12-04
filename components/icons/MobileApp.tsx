import React from "react";

export function CarbonApplicationMobile(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={64}
      height={64}
      viewBox="0 0 32 32"
      {...props}
    >
      <path
        fill="currentColor"
        d="M23 7h4v4h-4zm0 6h4v4h-4zm-6-6h4v4h-4zm0 6h4v4h-4z"
      ></path>
      <circle cx={14.5} cy={24.5} r={1.5} fill="currentColor"></circle>
      <path
        fill="currentColor"
        d="M21 30H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h13v2H8v24h13v-8h2v8a2 2 0 0 1-2 2"
      ></path>
    </svg>
  );
}
