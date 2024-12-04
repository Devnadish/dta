import React from "react";

export function MajesticonsUxCircleLine(props: React.SVGProps<SVGSVGElement>) {
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
        <path d="M7 10v2c0 .667.4 2 2 2s2-1.333 2-2v-2m3 0l1.5 2m1.5 2l-1.5-2m0 0l1.5-2m-1.5 2L14 14"></path>
        <circle cx={12} cy={12} r={10}></circle>
      </g>
    </svg>
  );
}
