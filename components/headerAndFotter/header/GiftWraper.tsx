"use client";
import dynamic from "next/dynamic";
import SkeletonUi from "../fotter/SkeltionUi";
import { useTranslations } from "next-intl";
const GiftModal = dynamic(
  () => import("@/components/headerAndFotter/header/GiftModal"),
  {
    ssr: false,
    loading: () => <GiftModalSkeleton />,
  }
);

export default function DynamicGiftModal() {
  return <GiftModal />;
}

const GiftModalSkeleton = () => {
  const t1 = useTranslations("Free");
  return (
    <div className="w-full h-full bg-gray-200 animate-pulse p-2 rounded-md">
      <p className="text-xl font-tajawal ">{t1("prepareGift")}</p>
    </div>
  );
};
