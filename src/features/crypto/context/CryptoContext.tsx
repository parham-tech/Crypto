"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type CryptoContextType = {
  selectedCoin: string | null;
  setSelectedCoin: (id: string | null) => void;
};

const CryptoContext = createContext<CryptoContextType | undefined>(undefined);

export function CryptoProvider({ children }: { children: ReactNode }) {
  const [selectedCoin, setSelectedCoin] = useState<string | null>(null);

  return (
    <CryptoContext.Provider value={{ selectedCoin, setSelectedCoin }}>
      {children}
    </CryptoContext.Provider>
  );
}

export function useCrypto() {
  const context = useContext(CryptoContext);
  if (!context) {
    throw new Error("useCrypto must be used within a CryptoProvider");
  }
  return context;
}
