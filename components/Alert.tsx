// components/Alert.tsx
"use client";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";

interface AlertProps {
  message: string;
  isVisible: boolean;
}

const Alert: React.FC<AlertProps> = ({ message, isVisible }) => {
  const [visible, setVisible] = useState(isVisible);

  useEffect(() => {
    setVisible(isVisible);
  }, [isVisible]);

  const handleClose = () => {
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="absolute top-0 left-0 transform -translate-x-1/2 z-50 bg-blue-500 text-white p-4 rounded-lg shadow-lg flex items-center justify-between w-full"
    >
      <span>{message}</span>
      <button onClick={handleClose} className="ml-4" type="button">
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

export default Alert;
