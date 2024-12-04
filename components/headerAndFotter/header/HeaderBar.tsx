import React from "react"; // Import React to avoid UMD global error
import Logo from "@/components/headerAndFotter/header/Logo";
import AuthButton from "@/components/headerAndFotter/header/AuthButton";
import DynamicBurgerMenu from "@/components/headerAndFotter/header/BurgerMenuDynmic";
import OnMdMenuItems from "./OnMdMenuItems";
import DynamicGiftModal from "./GiftWraper";
import DynamicAuthButton from "./AuthWraper";
import Link from "next/link";

const HeaderBar = React.memo(({ locale }: { locale: string }) => {
  return (
    <header className="flex items-center justify-between fixed top-0 left-0 w-full p-4 h-[60px] z-10 bg-white/20 backdrop-blur-3xl shadow-lg">
      <div className="flex items-center gap-8">
        <Logo locale={locale} />
        <DynamicGiftModal />
      </div>
      <div className="hidden md:flex items-center justify-center w-[70%] max-w-[800px]  ">
        <OnMdMenuItems />
      </div>

      <div className="flex items-center gap-4">
        <AuthButton />
        <DynamicBurgerMenu />
      </div>
      {/* <Link href={`/${locale}/dashboard`}>dashboard</Link> */}
    </header>
  );
});

export default HeaderBar;
