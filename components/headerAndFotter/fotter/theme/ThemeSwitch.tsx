"use client";

import { Sun, MoonStar } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeSwitch() {
  const { setTheme, resolvedTheme } = useTheme();

  const handleThemeChange = (theme: string) => setTheme(theme);

  const Icon = resolvedTheme === "dark" ? Sun : MoonStar;

  return (
    <div className="rounded-full w-[30px] h-[30px] hover:text-black hover:bg-white/80 flex items-center justify-center   flex-row  p-1">
      <Icon
        onClick={() =>
          handleThemeChange(resolvedTheme === "dark" ? "light" : "dark")
        }
        className="cursor-pointer w-[24px] h-[24px] text-foreground/50 hover:text-black "
      />
    </div>
  );
}
