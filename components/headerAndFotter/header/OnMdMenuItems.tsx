"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

import {
  Book,
  Briefcase,
  MessageCircle,
  HelpCircle,
  DollarSign,
} from "lucide-react";

import { useLocale } from "next-intl";

import { useTranslations } from "next-intl";

const OnMdMenuItems = React.memo(() => {
  const t = useTranslations("MenuItems");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Define menu items with their corresponding icons
  const menuItems = [
    {
      href: `/${locale}/prices`,
      label: t("price"),
      icon: (
        <DollarSign
          size={16}
          className={`text-primary ${pathname === `/${locale}/prices` ? "text-primary-foreground" : ""}`}
        />
      ),
    },
    {
      href: `/${locale}/worksample`,
      label: t("sample"),
      icon: (
        <Briefcase
          size={16}
          className={`text-primary ${pathname === `/${locale}/worksample` ? "text-primary-foreground" : ""}`}
        />
      ),
    },
    {
      href: `/${locale}/blog`,
      label: t("blog"),
      icon: (
        <Book
          size={16}
          className={`text-primary ${pathname === `/${locale}/blog` ? "text-primary-foreground" : ""}`}
        />
      ),
    },
    {
      href: `/${locale}/faq/ansewrd`,
      label: t("faq"),
      icon: (
        <HelpCircle
          size={16}
          className={`text-primary ${pathname === `/${locale}/faq/ansewrd` ? "text-primary-foreground" : ""}`}
        />
      ),
    },
    {
      href: `/${locale}/contactus`,
      label: t("contactUs"),
      icon: (
        <MessageCircle
          size={16}
          className={`text-primary ${pathname === `/${locale}/contactus` ? "text-primary-foreground" : ""}`}
        />
      ),
    },
  ];

  if (!isMounted) return null;

  return (
    <div className="w-full  flex  flex-row items-center  justify-around ">
      {menuItems.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className={`flex items-center gap-1 hover:text-primary hover:bg-primary/10 p-2 rounded-md ${
            pathname === item.href ? "text-primary-foreground bg-primary" : ""
          }`}
        >
          {item.icon}
          <p className="text-base font-tajawalLight font-semibold ">
            {item.label}
          </p>
        </Link>
      ))}
    </div>
  );
});

export default OnMdMenuItems;
