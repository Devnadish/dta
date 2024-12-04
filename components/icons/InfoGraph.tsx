import React from "react";

export function TablerChartInfographic(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={64}
      height={64}
      viewBox="0 0 24 24"
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      >
        <path d="M3 7a4 4 0 1 0 8 0a4 4 0 1 0-8 0"></path>
        <path d="M7 3v4h4M9 17v4m8-7v7m-4-8v8m8-9v9"></path>
      </g>
    </svg>
  );
}
