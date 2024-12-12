// import type { Metadata, Viewport } from "next";
// import "./globals.css";
// import FooterBar from "@/components/headerAndFotter/fotter/FooterBar";
// import HeaderBar from "@/components/headerAndFotter/header/HeaderBar";
// import BodyContainer from "@/components/Container";
// import { NextIntlClientProvider } from "next-intl";
// import { getMessages } from "next-intl/server";
// import { getLangDir } from "rtl-detect";
// import { Toaster } from "@/components/ui/toaster";
// import {
//   outfit,
//   geistMono,
//   amiri,
//   cairo,
//   tajawal,
//   tajawalLight,
// } from "@/lib/importFonts";
// import { ThemeProvider } from "@/provider/theme-provider";
// import { SessionProvider } from "next-auth/react";
// import { NuqsAdapter } from "nuqs/adapters/next/app";
// import { Suspense, type ReactNode } from "react";

// export const viewport: Viewport = {
//   themeColor: [
//     { media: "(prefers-color-scheme: light)", color: "white" },
//     { media: "(prefers-color-scheme: dark)", color: "black" },
//   ],
//   width: "device-width",
//   initialScale: 1,
// };

// export const metadata: Metadata = {
//   metadataBase: new URL("https://dreamtoapp.com"),
//   title: {
//     template: "%s | DreamToApp",
//     default: "DreamToApp - Turn Your Dreams into Reality",
//   },
//   description: "Professional app development service that turns your ideas into reality. Get expert solutions for web and mobile applications.",
//   keywords: ["app development", "web development", "mobile apps", "software solutions", "custom applications"],
//   authors: [{ name: "khalid nadish" }],
//   openGraph: {
//     type: "website",
//     locale: "en_US",
//     url: "https://dreamtoapp.com",
//     title: "DreamToApp - Turn Your Dreams into Reality",
//     description: "Professional app development service that turns your ideas into reality",
//     siteName: "DreamToApp",
//     images: [{
//       url: "/og-image.jpg",
//       width: 1200,
//       height: 630,
//       alt: "DreamToApp Preview",
//     }],
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "DreamToApp - Turn Your Dreams into Reality",
//     description: "Professional app development service that turns your ideas into reality",
//     images: ["/twitter-image.jpg"],
//     creator: "@dreamtoapp",
//   },
//   robots: {
//     index: true,
//     follow: true,
//     googleBot: {
//       index: true,
//       follow: true,
//       "max-video-preview": -1,
//       "max-image-preview": "large",
//       "max-snippet": -1,
//     },
//   },
//   verification: {
//     google: "your-google-site-verification",
//     yandex: "your-yandex-verification",
//   },
// };

// export default async function LocaleLayout({
//   children,
//   params,
// }: {
//   children: React.ReactNode;
//   params: Promise<{ locale: string }>;
// }) {
//   const { locale } = await params;
//   const messages = await getMessages({ locale: locale });
//   const direction = getLangDir(locale);
  
//   return (
//     <html lang={locale} dir={direction} suppressHydrationWarning>
//       <head>
//         <link
//           rel="preload"
//           href="/fonts/outfit.woff2"
//           as="font"
//           type="font/woff2"
//           crossOrigin="anonymous"
//         />
//         <link
//           rel="preconnect"
//           href="https://cdn.sanity.io"
//           crossOrigin="anonymous"
//         />
//       </head>
//       <body
//         className={`${outfit.variable} ${geistMono.variable} ${amiri.variable} ${cairo.variable} ${tajawal.variable} ${tajawalLight.variable} antialiased`}
//       >
//         <SessionProvider>
//           <ThemeProvider>
//             <NextIntlClientProvider messages={messages}>
//               <HeaderBar locale={locale} />
//               <BodyContainer>
//                 <NuqsAdapter>
//                   {children}
//                   <Suspense fallback={null} />
//                 </NuqsAdapter>
//               </BodyContainer>
//               <FooterBar />
//             </NextIntlClientProvider>
//           </ThemeProvider>
//         </SessionProvider>
//         <Toaster />
//       </body>
//     </html>
//   );
// }


import type { Metadata } from "next";
import "./globals.css";
import FooterBar from "@/components/headerAndFotter/fotter/FooterBar";
import HeaderBar from "@/components/headerAndFotter/header/HeaderBar";
import BodyContainer from "@/components/Container";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { getLangDir } from "rtl-detect";
import { Toaster } from "@/components/ui/toaster";
import {
  outfit,
  geistMono,
  amiri,
  cairo,
  tajawal,
  tajawalLight,
} from "@/lib/importFonts";
import { ThemeProvider } from "@/provider/theme-provider";
import { SessionProvider } from "next-auth/react";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Suspense, type ReactNode } from "react";
import { NavigationEvents } from "@/components/NavigationEvents";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages({ locale: locale });
  const direction = getLangDir(locale);
  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${geistMono.variable} ${amiri.variable} ${cairo.variable} ${tajawal.variable} ${tajawalLight.variable} antialiased`}
      >
        <SessionProvider>
          <ThemeProvider>
            <NextIntlClientProvider messages={messages}>
              <HeaderBar locale={locale} />
              <BodyContainer>
                <NuqsAdapter>
                  {children}
                  <Suspense fallback={null}>
                    {/* <NavigationEvents /> */}
                  </Suspense>
                </NuqsAdapter>
              </BodyContainer>
              <FooterBar />
            </NextIntlClientProvider>
          </ThemeProvider>
        </SessionProvider>
        <Toaster />
      </body>
    </html>
  );
}
