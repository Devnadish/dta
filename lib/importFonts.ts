import localFont from "next/font/local";

const outfit = localFont({
  src: "../fonts/Outfit-Regular.ttf",
  variable: "--font-outfit-regular",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const amiri = localFont({
  src: "../fonts/Amiri-Regular.ttf",
  variable: "--font-amiri",
  weight: "100 900",
});

const cairo = localFont({
  src: "../fonts/Cairo-Regular.ttf",
  variable: "--font-cairo",
  weight: "100 200 300 400 500 600 700 800 900",
});

const tajawal = localFont({
  src: "../fonts/Tajawal-Black.ttf",
  variable: "--font-tajawal",
  weight: "100 200 300 400 500 600 700 800 900",
});

const tajawalLight = localFont({
  src: "../fonts/Tajawal-Light.ttf",
  variable: "--font-tajawal-light",
  weight: "100 200 300 400 500 600 700 800 900",
});

export { outfit, geistMono, amiri, cairo, tajawal, tajawalLight };
