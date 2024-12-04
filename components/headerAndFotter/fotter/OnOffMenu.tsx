"use client";
import { motion } from "framer-motion";
import { Eye, EyeOff, Settings } from "lucide-react";

export default function OnOffMenu({
  onClick,
  isVisible,
}: {
  onClick: () => void;
  isVisible: boolean;
}) {
  return (
    <motion.button
      onClick={onClick}
      className=" rounded-full w-[38px] h-[38px] flex items-center justify-center "
    >
      {isVisible ? (
        <EyeOff className="w-[24px] h-[24px] text-foreground/50 " />
      ) : (
        <Settings className="w-[24px] h-[24px] text-foreground/50 " />
      )}
    </motion.button>
  );
}
