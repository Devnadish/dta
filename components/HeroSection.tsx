import Image from "next/image";
import bg from "@/public/bg.webp";
import logo from "@/public/logo.webp";
import HomeQuastion from "@/components/HomeQuastion";

// New BackgroundImage component
function BackgroundImage() {
  return (
    <div className="absolute inset-0 -z-10 w-full h-full">
      <Image
        src={bg}
        alt="Background Image"
        priority
        fill
        className="object-cover object-center"
        sizes="100vw"
        quality={75}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-50" />
    </div>
  );
}

// New Logo component
function Logo() {
  return (
    <div className="relative w-[225px] h-[225px]">
      <Image
        src={logo}
        alt="Logo"
        priority
        className="object-contain"
        sizes="(max-width: 640px) 50vw, (max-width: 1280px) 50vw, 30vw"
        fill
        quality={90}
      />
    </div>
  );
}

// New Title component
function Title() {
  return (
    <p className="text-3xl font-cairo font-bold text-blueColor bg-yellowColor rounded-lg p-2 w-full z-1 text-center">
      Dream To App
      <span className="text-orangeColor text-[12px] font-extralight align-super">
        {"  "}v1.0
      </span>
    </p>
  );
}

export default function HeroSection() {
  return (
    <div className="relative h-screen w-screen overflow-hidden flex flex-col items-center justify-center">
      <BackgroundImage />
      <div className="absolute inset-0 bg-gradient-custom" />
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-custom">
        <div className="flex flex-col items-center justify-center gap-6">
          <Logo />
          <Title />
          <HomeQuastion headTitle="طلب جديد" />
        </div>
      </div>
    </div>
  );
}
