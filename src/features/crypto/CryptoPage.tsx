"use client";
import { useState } from "react";
import { CryptoList } from "@/features/crypto/components/CryptoList";
import { CryptoChart } from "@/features/crypto/components/CryptoChart";
import { CryptoHeader } from "@/features/crypto/components/CryptoHeader";
import { CryptoProvider } from "@/features/crypto/context/CryptoContext";

export default function CryptoPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <CryptoProvider>
      <div className="container mx-auto py-8 px-4">
        <CryptoHeader onSearch={setSearchQuery} />
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <CryptoList searchQuery={searchQuery} />
          <CryptoChart />
        </div>
      </div>
    </CryptoProvider>
  );
}
