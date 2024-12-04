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
