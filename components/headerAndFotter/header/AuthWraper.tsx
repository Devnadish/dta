"use client";
import dynamic from "next/dynamic";
import SkeletonUi from "../fotter/SkeltionUi";
const AuthButton = dynamic(
  () => import("@/components/headerAndFotter/header/AuthButton"),
  {
    ssr: false,
    loading: () => <SkeletonUi />,
  }
);

export default function DynamicAuthButton() {
  return <AuthButton />;
}
