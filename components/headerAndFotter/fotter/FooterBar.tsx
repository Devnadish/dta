"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import BackButton from "../../ui/BackButton";
import ToggleVisibilityButton from "./ToggleVisibilityButton";
import DynmicLangSwicher from "./language/DynamicLangSwicher";
import DynmicThemeSwicher from "./theme/DynamicLangSwicher";
import DynamicWhatsAppButton from "./whatapp/DynamicWhatsAppButton";
import DynamicContactUs from "./contactus/DynamicWhatsAppButton";
import DynmicLogout from "./logout/DynmicLogout";

export default function FooterBar() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="fixed right-4 bottom-20 h-[250px] w-[40px] flex items-center justify-center transition-all duration-300  ">
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: isVisible ? 1 : 0,
          height: isVisible ? "250px" : 0,
        }}
        transition={{ duration: isVisible ? 0.1 : 0.3, ease: "easeInOut" }}
        className="   border rounded-full flex flex-col w-[40px] items-center transition-all bg-opacity-50 h-[250px] bg-muted  justify-around"
      >
        <DynamicWhatsAppButton />
        <DynamicContactUs />
        <DynmicLangSwicher />
        <DynmicThemeSwicher />
        <DynmicLogout />
      </motion.div>
      <ToggleVisibilityButton
        onClick={toggleVisibility}
        isVisible={isVisible}
      />
      <BackButton />
    </div>
  );
}
