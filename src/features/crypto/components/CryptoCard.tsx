"use client";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { Coin } from "../types";
import { useCrypto } from "../context/CryptoContext";
import { useTheme } from "@/context/ThemeContext";

type Props = { coin: Coin };

export function CryptoCard({ coin }: Props) {
  const { setSelectedCoin, selectedCoin } = useCrypto();
  const { theme } = useTheme();
  const isSelected = selectedCoin === coin.id;
  const controls = useAnimation();

  // 🎨 رنگ‌های حالت‌های مختلف
  const isDark = theme === "dark";
  const gold = "#f5b841";
  const blue = "#3b82f6";

  const accent = isDark ? gold : blue;
  const accentShadow = isDark
    ? "0 0 25px rgba(245,184,65,0.5)"
    : "0 0 35px rgba(59,130,246,0.5)";
  const accentShadowStrong = isDark
    ? "0 0 45px rgba(245,184,65,0.7)"
    : "0 0 45px rgba(59,130,246,0.7)";

  useEffect(() => {
    controls.start(
      isSelected
        ? {
            boxShadow: [
              "0 0 0 rgba(59,130,246,0)",
              accentShadowStrong,
              accentShadow,
              "0 0 0 rgba(59,130,246,0)",
            ],
            borderColor: accent,
            transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          }
        : {
            boxShadow: "0 0 0 rgba(0,0,0,0)",
            borderColor: isDark
              ? "rgba(75,85,99,1)"
              : "rgba(229,231,235,1)",
            transition: { duration: 0.3 },
          }
    );
  }, [isSelected, controls, accent, accentShadowStrong, isDark]);

  // 🎨 رنگ متن‌ها
  const textColor = isSelected
    ? isDark
      ? "text-gray-900"
      : "text-white"
    : "text-gray-900 dark:text-white";

  const subTextColor = isSelected
    ? isDark
      ? "text-gray-800"
      : "text-blue-100"
    : "text-gray-500 dark:text-gray-400";

  const percentColor =
    coin.price_change_percentage_24h >= 0
      ? isSelected
        ? isDark
          ? "text-green-800"
          : "text-green-200"
        : "text-green-500"
      : isSelected
      ? isDark
        ? "text-red-800"
        : "text-red-200"
      : "text-red-500";

  return (
    <motion.div
      onClick={() => setSelectedCoin(coin.id)}
      animate={controls}
      whileHover={{
        scale: 1.05,
        y: -3,
        boxShadow: isSelected ? accentShadowStrong : accentShadow,
      }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      className={`cursor-pointer mt-[3%] rounded-2xl border px-5 py-4 select-none transition-colors duration-[1500ms] ease-in-out
        ${
          isSelected
            ? isDark
              ? "bg-[#f5b841] text-gray-900"
              : "bg-blue-600 text-white"
            : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50  dark:hover:bg-gray-900"
        }`}
    >
      <div className="flex items-center justify-between">
        {/* Info */}
        <div className="flex items-center gap-3">
          <img
            src={coin.image}
            alt={coin.name}
            className="w-8 h-8 rounded-full"
          />
          <div>
            <h3 className={`font-semibold text-sm ${textColor}`}>
              {coin.name}
            </h3>
            <p className={`text-xs uppercase ${subTextColor}`}>
              {coin.symbol}
            </p>
          </div>
        </div>

        {/* Price */}
        <div className="text-right">
          <p className={`font-medium text-sm ${textColor}`}>
            ${coin.current_price.toLocaleString()}
          </p>
          <p className={`text-xs font-medium ${percentColor}`}>
            {coin.price_change_percentage_24h.toFixed(2)}%
          </p>
        </div>
      </div>
    </motion.div>
  );
}
