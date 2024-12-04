"use client";
import dynamic from "next/dynamic";
import SkeletonUi from "../SkeltionUi";
const ContactUs = dynamic(
  () => import("@/components/headerAndFotter/fotter/contactus/ContactUs"),
  {
    ssr: false,
    loading: () => <SkeletonUi />,
  }
);

export default function DynamicContactUs() {
  return <ContactUs />;
}
