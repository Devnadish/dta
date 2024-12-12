import createNextIntlPlugin from "next-intl/plugin";
import BundleAnalyzer from "@next/bundle-analyzer";
import type { NextConfig } from "next";

const withBundleAnalyzer = BundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
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
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

// Combine the plugins
export default withBundleAnalyzer(withNextIntl(nextConfig));


// import createNextIntlPlugin from "next-intl/plugin";
// import BundleAnalyzer from "@next/bundle-analyzer";
// import type { NextConfig } from "next";

// const withBundleAnalyzer = BundleAnalyzer({
//   enabled: process.env.ANALYZE === "true",
// });

// const withNextIntl = createNextIntlPlugin();

// /** @type {import('next').NextConfig} */
// const nextConfig: NextConfig = {
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
//       {
//         protocol: "https",
//         hostname: "lh3.googleusercontent.com",
//       },
//     ],
//     formats: ['image/avif', 'image/webp'],
//     minimumCacheTTL: 60,
//     deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
//     imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
//   },
//   compiler: {
//     removeConsole: process.env.NODE_ENV === 'production',
//   },
//   poweredByHeader: false,
//   compress: true,
//   // optimizeFonts: true,
//   // swcMinify: true,
//   experimental: {
//     optimizeCss: true,
//     optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
//   },
// };

// // Combine the plugins
// export default withBundleAnalyzer(withNextIntl(nextConfig));

