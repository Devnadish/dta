import React from "react";

export function LineMdInstagram(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={64}
      height={64}
      viewBox="0 0 24 24"
      {...props}
    >
      <circle cx={17} cy={7} r={1.5} fill="white" fillOpacity={0}>
        <animate
          fill="freeze"
          attributeName="fill-opacity"
          begin="1.3s"
          dur="0.15s"
          values="0;1"
        ></animate>
      </circle>
      <g
        fill="none"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      >
        <path
          strokeDasharray={72}
          strokeDashoffset={72}
          d="M16 3c2.76 0 5 2.24 5 5v8c0 2.76 -2.24 5 -5 5h-8c-2.76 0 -5 -2.24 -5 -5v-8c0 -2.76 2.24 -5 5 -5h4Z"
        >
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            dur="0.6s"
            values="72;0"
          ></animate>
        </path>
        <path
          strokeDasharray={28}
          strokeDashoffset={28}
          d="M12 8c2.21 0 4 1.79 4 4c0 2.21 -1.79 4 -4 4c-2.21 0 -4 -1.79 -4 -4c0 -2.21 1.79 -4 4 -4"
        >
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="0.7s"
            dur="0.6s"
            values="28;0"
          ></animate>
        </path>
      </g>
    </svg>
  );
}

export function IconoirYoutube(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={64}
      height={64}
      viewBox="0 0 24 24"
      {...props}
    >
      <g fill="none" stroke="white" strokeWidth={1.5}>
        <path
          fill="white"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m14 12l-3.5 2v-4z"
        ></path>
        <path d="M2 12.708v-1.416c0-2.895 0-4.343.905-5.274c.906-.932 2.332-.972 5.183-1.053C9.438 4.927 10.818 4.9 12 4.9s2.561.027 3.912.065c2.851.081 4.277.121 5.182 1.053S22 8.398 22 11.292v1.415c0 2.896 0 4.343-.905 5.275c-.906.931-2.331.972-5.183 1.052c-1.35.039-2.73.066-3.912.066s-2.561-.027-3.912-.066c-2.851-.08-4.277-.12-5.183-1.052S2 15.602 2 12.708Z"></path>
      </g>
    </svg>
  );
}

export function IcRoundTiktok(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={64}
      height={64}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="white"
        d="M16.6 5.82s.51.5 0 0A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6c0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64c0 3.33 2.76 5.7 5.69 5.7c3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48"
      ></path>
    </svg>
  );
}

export function PrimeTwitter(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={64}
      height={64}
      viewBox="0 0 14 14"
      {...props}
    >
      <g fill="none">
        <g clipPath="url(#primeTwitter0)">
          <path
            fill="white"
            d="M11.025.656h2.147L8.482 6.03L14 13.344H9.68L6.294 8.909l-3.87 4.435H.275l5.016-5.75L0 .657h4.43L7.486 4.71zm-.755 11.4h1.19L3.78 1.877H2.504z"
          ></path>
        </g>
        <defs>
          <clipPath id="primeTwitter0">
            <path fill="#fff" d="M0 0h14v14H0z"></path>
          </clipPath>
        </defs>
      </g>
    </svg>
  );
}
