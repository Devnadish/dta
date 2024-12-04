"use client";
import dynamic from "next/dynamic";
import SkeletonUi from "../SkeltionUi";
const WhatsAppButton = dynamic(
  () => import("@/components/headerAndFotter/fotter/whatapp/WhatsAppButton"),
  {
    ssr: false,
    loading: () => <SkeletonUi />,
  }
);

export default function DynamicWhatsAppButton() {
  return <WhatsAppButton />;
}
