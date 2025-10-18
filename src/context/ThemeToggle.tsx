"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-500 
      ${
        theme === "dark"
          ? "bg-blue-600/20 hover:bg-blue-600/30"
          : "bg-gray-100 hover:bg-gray-200"
      }`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === "dark" ? (
          <motion.div
            key="sun"
            initial={{ scale: 0.7, opacity: 0, rotate: -45 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.7, opacity: 0, rotate: 45 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="text-yellow-400"
          >
            <Sun className="w-5 h-5" strokeWidth={2.5} />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ scale: 0.7, opacity: 0, rotate: 45 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.7, opacity: 0, rotate: -45 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="text-blue-600"
          >
            <Moon className="w-5 h-5" strokeWidth={2.5} />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
