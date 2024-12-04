import React from "react";

export function FlatColorIconsGallery(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={32}
      height={32}
      viewBox="0 0 48 48"
      {...props}
    >
      <path
        fill="#e65100"
        d="M41 42H13c-2.2 0-4-1.8-4-4V18c0-2.2 1.8-4 4-4h28c2.2 0 4 1.8 4 4v20c0 2.2-1.8 4-4 4"
      ></path>
      <path
        fill="#f57c00"
        d="M35 36H7c-2.2 0-4-1.8-4-4V12c0-2.2 1.8-4 4-4h28c2.2 0 4 1.8 4 4v20c0 2.2-1.8 4-4 4"
      ></path>
      <circle cx={30} cy={16} r={3} fill="#fff9c4"></circle>
      <path fill="#942a09" d="M17 17.9L8 31h18z"></path>
      <path fill="#bf360c" d="M28 23.5L22 31h12z"></path>
    </svg>
  );
}
