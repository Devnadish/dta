import { Lateef, Cairo, Tajawal } from "next/font/google";

export const lateef = Lateef({
  weight: ["400", "700"],
  style: ["normal"],
  subsets: ["arabic"],
  display: "swap",
  variable: "--font-lateef",
  fallback: ["system-ui", "arial"],
});
export const cairo = Cairo({
  weight: ["400", "700"],
  style: ["normal"],
  subsets: ["arabic"],
  display: "swap",
  variable: "--font-cairo",
  fallback: ["system-ui", "arial"],
});

export const tajawal = Tajawal({
  weight: ["400", "700"],
  style: ["normal"],
  subsets: ["arabic"],
  display: "swap",
  variable: "--font-tajawal",
  fallback: ["system-ui", "arial"],
});
