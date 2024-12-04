"use client";
import dynamic from "next/dynamic";
import SkeletonUi from "../SkeltionUi";
const ThemeSwicher = dynamic(
  () => import("@/components/headerAndFotter/fotter/theme/ThemeSwitch"),
  {
    ssr: false,
    loading: () => <SkeletonUi />,
  }
);

export default function DynmicThemeSwicher() {
  return <ThemeSwicher />;
}
