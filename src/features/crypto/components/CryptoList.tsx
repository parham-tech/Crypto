"use client";
import { useMemo } from "react";
import { useCryptoData } from "../hooks/useCryptoData";
import { CryptoCard } from "./CryptoCard";
import { motion, AnimatePresence } from "framer-motion";

export function CryptoList({ searchQuery }: { searchQuery: string }) {
  const { coins, loading, error } = useCryptoData();

  // 🔍 فیلتر هوشمند فقط در صورت تغییر ورودی‌ها
  const filteredCoins = useMemo(
    () =>
      coins.filter((coin) =>
        coin.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [coins, searchQuery]
  );

  // ⚡ اسکلت لودر
  if (loading)
    return (
      <div className="flex flex-col gap-3 p-4 animate-fadeIn">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-20 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-2xl transition-colors duration-[1500ms] ease-in-out"
          />
        ))}
      </div>
    );

  // ⚠ خطا در دریافت داده‌ها
  if (error)
    return (
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-red-500 text-center mt-6"
      >
        ❌ Failed to fetch data.
      </motion.p>
    );

  // 📉 در صورت نبود نتیجه
  if (!filteredCoins.length)
    return (
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-gray-500 text-center mt-6"
      >
        No coins found.
      </motion.p>
    );

  // ✅ نمایش لیست کوین‌ها
  return (
    <motion.div
      key={searchQuery}
      initial={{ opacity: 0, x: -15 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="relative"
    >
      {/* fade بالا */}
      <div className="pointer-events-none absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-white/60 dark:from-gray-900/50 to-transparent z-10 rounded-t-xl" />

      {/* fade پایین */}
      <div className="pointer-events-none absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white/60 dark:from-gray-900/50 to-transparent z-10 rounded-b-xl" />

      {/* لیست کوین‌ها */}
      <div className="overflow-y-auto h-[calc(100vh-18rem)] md:h-[calc(100vh-14rem)] no-scrollbar px-6 transition-colors duration-[1500ms] ease-in-out">
        <AnimatePresence mode="popLayout">
          {filteredCoins.map((coin, i) => (
            <motion.div
              key={coin.id}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.45, delay: i * 0.025, ease: "easeOut" }}
              className="mb-3"
            >
              <CryptoCard coin={coin} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
