"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";
import {
  DollarSign,
  Briefcase,
  Book,
  HelpCircle,
  MessageCircle,
} from "lucide-react";
import MenuItems from "./MenuItems";

export default function BuregerMenu() {
  const t = useTranslations("MenuItems");
  const locale = useLocale();
  return (
    <Sheet>
      <SheetTrigger
        className="rounded-full md:hidden w-[50px] h-[50px] flex items-center justify-center text-foreground flex-col"
        aria-label="Open menu"
      >
        <MenuIcon />
      </SheetTrigger>
      <SheetContent
        forceMount
        side="right"
        className="w-72 flex flex-col items-center gap-4"
      >
        <SheetHeader className="w-full justify-center items-center font-cairo">
          <SheetTitle className="font-amiri text-xl">
            {t("welcomeMsg")}
          </SheetTitle>
          <SheetDescription
            className={`w-full ${locale === "ar" ? "text-right" : "text-left"} items-center text-pretty font-amiri`}
          >
            {t("welcomeDesction")}
          </SheetDescription>
        </SheetHeader>
        <div className="w-full flex flex-col items-center justify-center gap-4 border-t border-border pt-4">
          <MenuItems />
        </div>
        <SheetFooter className="w-full justify-center items-center">
          {/* <WorkButton text={t("collectPrize")}/> */}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

const MenuIcon = React.memo(() => {
  return (
    <div className="w-[30px] h-[30px] bg-orangeColor/50  rounded-md flex items-center justify-around flex-col p-1">
      <div className="w-full h-[4px] bg-blueColor rounded-md" />
      <div className="w-full h-[4px] bg-yellowColor rounded-md" />
      <div className="w-full h-[4px] bg-greenColor rounded-md" />
    </div>
  );
});
