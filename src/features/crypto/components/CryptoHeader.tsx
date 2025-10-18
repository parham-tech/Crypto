"use client";
import { useState } from "react";
import { ThemeToggle } from "@/context";

type Props = {
  onSearch?: (query: string) => void;
};

export function CryptoHeader({ onSearch }: Props) {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch?.(value);
  };

  return (
    <div className="flex items-center justify-between gap-4 mb-4 px-2 sm:px-4">
      {/* === Title + Theme Toggle === */}
      <div className="flex items-center gap-3">
        <h1 className="flex items-center text-2xl font-bold tracking-tight">
          <span className="ml-1 sm:ml-4">Crypto Tracker</span>
        </h1>
        <ThemeToggle />
      </div>

      {/* === Search Box === */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search coin..."
          value={query}
          onChange={handleChange}
          className="border rounded-xl px-3 py-2 w-44 sm:w-56 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none 
                     dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500
                           transition-colors duration-[1500ms] ease-in-out
"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="absolute right-3 top-2.5 w-5 h-5 text-gray-400 dark:text-gray-500 pointer-events-none"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 105.64 5.64a7.5 7.5 0 0010.01 10.01z"
          />
        </svg>
      </div>
    </div>
  );
}
