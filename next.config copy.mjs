import createNextIntlPlugin from "next-intl/plugin";
import BundleAnalyzer from "@next/bundle-analyzer";
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "dreamtoapp-worksample.s3.eu-north-1.amazonaws.com",
      },
    ],
  },
};

export default withNextIntl(nextConfig);

// import type { NextConfig } from "next";
// import createNextIntlPlugin from "next-intl/plugin";
// const withNextIntel = createNextIntlPlugin();

// const nextConfig: NextConfig = {
//   /* config options here */

//   reactStrictMode: true,
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "cdn.sanity.io",
//       },
//       {
//         protocol: "https",
//         hostname: "dreamtoapp-worksample.s3.eu-north-1.amazonaws.com",
//       },
//     ],
//   },
// };

// export default withNextIntel(nextConfig);
