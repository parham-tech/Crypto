"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCrypto } from "../context/CryptoContext";
import { useTheme } from "@/context/ThemeContext";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const memoryCache = new Map<string, any>();

export function CryptoChart() {
  const { selectedCoin } = useCrypto();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [history, setHistory] = useState<any | null>(null);
  const [range, setRange] = useState("7");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  // 🎨 رنگ‌ها برای حالت‌های شب و روز
  const palette = {
    accent: isDark ? "#f5b841" : "#3b82f6",
    bg: isDark ? "#1f2937" : "#ffffff",
    grid: isDark ? "#374151" : "#e5e7eb",
    text: isDark ? "#d1d5db" : "#374151",
  };

  const cacheKey = useMemo(
    () => (selectedCoin ? `${selectedCoin}::${range}` : ""),
    [selectedCoin, range]
  );

  const data = useMemo(() => {
    if (!history?.prices) return [];
    return history.prices.map(([time, price]: [number, number]) => ({
      time: new Date(time).toLocaleDateString(),
      price,
    }));
  }, [history]);

  const ranges = [
    { label: "1D", value: "1" },
    { label: "7D", value: "7" },
    { label: "1M", value: "30" },
    { label: "3M", value: "90" },
    { label: "1Y", value: "365" },
    { label: "MAX", value: "max" },
  ];

  useEffect(() => {
    if (!selectedCoin) {
      setHistory(null);
      setErrorMsg(null);
      return;
    }

    const cached = memoryCache.get(cacheKey);
    if (cached) {
      setHistory(cached);
      setErrorMsg(null);
    }

    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(!cached);
    setErrorMsg(null);

    fetch(`/api/coin/${selectedCoin}?days=${range}`, { signal: controller.signal })
      .then(async (res) => {
        if (controller.signal.aborted) return;
        const json = await res.json();
        if (!json || !Array.isArray(json.prices) || json.prices.length < 2) {
          setErrorMsg("No historical data available for this time range.");
          setHistory(cached || null);
          setLoading(false);
          return;
        }
        memoryCache.set(cacheKey, json);
        setHistory(json);
        setErrorMsg(null);
        setLoading(false);
      })
      .catch(() => {
        if (!controller.signal.aborted) {
          setErrorMsg("Failed to load chart data.");
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, [selectedCoin, range, cacheKey]);

  if (!selectedCoin)
    return (
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-gray-500 text-center"
      >
        Select a coin to view its chart.
      </motion.p>
    );

  return (
    <motion.div
      key={selectedCoin} // فقط با تغییر کوین رفرش می‌شود، نه بازه زمانی
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className={`p-4 rounded-xl shadow-lg w-full transition-colors duration-[1500ms] ease-in-out`}
      style={{ backgroundColor: palette.bg }}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold capitalize" style={{ color: palette.text }}>
            {selectedCoin} – {range === "max" ? "All Time" : `Last ${range} Days`}
          </h2>
          {loading && (
            <span className="inline-block h-4 w-4 rounded-full border-2 border-gray-400 border-t-transparent animate-spin" />
          )}
        </div>

        <div className="flex gap-2">
          {ranges.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setRange(value)}
              disabled={loading && range === value}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-[1500ms] ease-in-out ${
                range === value
                  ? `text-white shadow`
                  : `text-gray-700 dark:text-gray-300 hover:opacity-80`
              } ${loading && range === value ? "opacity-60 cursor-not-allowed" : ""}`}
              style={{
                backgroundColor: range === value ? palette.accent : "transparent",
                border: `1px solid ${isDark ? "#4b5563" : "#d1d5db"}`,
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {errorMsg && (
        <p className="text-center text-amber-500 text-sm mb-2">{errorMsg}</p>
      )}

      {/* Chart */}
<div
  className="relative h-[350px] w-full overflow-hidden rounded-xl"
  style={{
    backgroundColor: isDark ? "#111827" : "#ffffff", // ← رنگ دقیق تم بک‌گراند
    transition: "background-color 1s ease-in-out",
  }}
>
        <AnimatePresence mode="wait">
          {loading && !history ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 animate-pulse rounded-xl"
              style={{ backgroundColor: palette.bg }}
            />
          ) : history?.prices?.length >= 2 ? (
            <motion.div
              key="chart"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0"
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor={palette.accent}
                        stopOpacity={0.4}
                      />
                      <stop
                        offset="95%"
                        stopColor={palette.accent}
                        stopOpacity={0.05}
                      />
                    </linearGradient>
                  </defs>

                  <XAxis dataKey="time" hide />
                  <YAxis
                    domain={["auto", "auto"]}
                    tick={{ fontSize: 12, fill: palette.text }}
                    width={60}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isDark
                        ? "rgba(17,24,39,0.9)"
                        : "rgba(255,255,255,0.9)",
                      borderRadius: "8px",
                      border: "none",
                      color: palette.text,
                    }}
                    labelStyle={{ color: palette.text }}
                    formatter={(value: number) => `$${value.toLocaleString()}`}
                  />

                  <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                  >
                    <Area
                      type="monotone"
                      dataKey="price"
                      stroke={palette.accent}
                      strokeWidth={2}
                      fill="url(#colorPrice)"
                    />
                  </motion.g>
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>
          ) : (
            <motion.div
              key="nodata"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 flex items-center justify-center"
              style={{ color: palette.text }}
            >
              No data available for this range.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
