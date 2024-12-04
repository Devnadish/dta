"use client";
import { useState, useEffect } from "react";
import arabic from "@/public/locales/arabic.png";
import english from "@/public/locales/english.png";
import Image from "next/image";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

export default function LangSwicher() {
  const locale = useLocale();
  const [lang, setLang] = useState(locale || "ar");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => setLang(locale || "ar"), [locale]);

  const toggleLanguage = () => {
    setLang((prevLang) => (prevLang === "ar" ? "en" : "ar"));
    const newLocale = lang === "ar" ? "en" : "ar";
    const path = pathname.split("/").slice(2).join("/");
    router.push(`/${newLocale}/${path}`);
  };

  return (
    <button
      className="rounded-full w-[30px] h-[30px] hover:text-black hover:bg-white/80 flex items-center justify-center   flex-row  p-1"
      onClick={toggleLanguage}
    >
      <Image
        src={locale === "ar" ? arabic : english}
        width={24}
        height={24}
        sizes="24x24"
        alt="Loading Light/Dark Toggle"
        priority={false}
      />
    </button>
  );
}
