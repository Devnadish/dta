"use client";
import dynamic from "next/dynamic";
import SkeletonUi from "../SkeltionUi";
const LangSwicher = dynamic(
  () => import("@/components/headerAndFotter/fotter/language/LangSwicher"),
  {
    ssr: false,
    loading: () => <SkeletonUi />,
  }
);

export default function DynmicLangSwicher() {
  return <LangSwicher />;
}
