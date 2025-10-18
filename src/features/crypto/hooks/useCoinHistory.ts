"use client";
import { useEffect, useState } from "react";
import { CoinHistory } from "../types";

export function useCoinHistory(id: string | null) {
  const [history, setHistory] = useState<CoinHistory | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    fetch(`/api/coin/${id}`)
      .then((r) => r.json())
      .then((data) => setHistory(data))
      .finally(() => setLoading(false));
  }, [id]);

  return { history, loading };
}
