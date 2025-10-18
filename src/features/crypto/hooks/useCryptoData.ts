"use client";
import { useEffect, useState } from "react";
import { Coin } from "../types";

export function useCryptoData() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await fetch("/api/coins");
        if (!res.ok) throw new Error("Failed to fetch coins");
        const data = await res.json();
        setCoins(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCoins();
  }, []);

  return { coins, loading, error };
}
