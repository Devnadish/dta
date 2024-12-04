import HeroSection from "@/components/HeroSection";
import { MdiApprove } from "@/components/icons/Approval";
import { MaterialSymbolsPartnerExchange } from "@/components/icons/exculisve";
import { FileIconsPowerbuilder } from "@/components/icons/Experts";
import { IcRoundTouchApp } from "@/components/icons/OurService";
import SectionView from "@/components/post/SectionView";
import { getData } from "@/sanity/lib/homePage/getAllservice";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";

const LoadingSection = () => (
  <div className="w-full h-48 animate-pulse bg-gray-200 dark:bg-gray-800 rounded-lg" />
);

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const t = await getTranslations("HomePage");
  const locale = (await params).locale;
  // Parallel data fetching with error handling
  const [services, experts, support, provide] = await Promise.all([
    getData("Service", locale).catch(() => []),
    getData("Experts", locale).catch(() => []),
    getData("Support", locale).catch(() => []),
    getData("Provide", locale).catch(() => []),
  ]);

  const sections = [
    {
      data: services,
      title: t("Service"),
      icon: <IcRoundTouchApp width={38} height={38} />,
    },
    {
      data: experts,
      title: t("Expert"),
      icon: <FileIconsPowerbuilder width={38} height={38} />,
    },
    {
      data: support,
      title: t("Support"),
      icon: <MaterialSymbolsPartnerExchange width={38} height={38} />,
    },
    {
      data: provide,
      title: t("free"),
      icon: <MdiApprove width={38} height={38} />,
    },
  ];

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-16 font-[family-name:var(--font-geist-sans)]">
      {/* <AnimatedModal /> */}
      {sections.map((section, index) => (
        <Suspense key={section.title} fallback={<LoadingSection />}>
          <SectionView
            posts={section.data}
            title={section.title}
            icon={section.icon}
          />
        </Suspense>
      ))}
    </main>
  );
}

// Metadata configuration using Next.js 15 metadata API
// export const metadata: Metadata = {
//   title: "Dream To App",
//   description: "A brief description of your page for SEO.",
//   keywords: "keyword1, keyword2, keyword3",
//   authors: [{ name: "khalid nadish" }],
//   openGraph: {
//     title: "Your Page Title",
//     description: "A brief description of your page for SEO.",
//     images: ["/path/to/image.jpg"],
//     url: "https://yourwebsite.com",
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "Your Page Title",
//     description: "A brief description of your page for SEO.",
//     images: ["/path/to/image.jpg"],
//   },
// };
// export const dynamic = "force-static";
// export const revalidate = 60;
