import { NextResponse } from "next/server";

export const revalidate = 300; // cache for 5 minutes

export async function GET() {
  const apiKey = process.env.COINGECKO_API_KEY;

  if (!apiKey) {
    console.error("❌ Missing CoinGecko API key");
    return NextResponse.json(
      { error: "Missing API key" },
      { status: 500 }
    );
  }

  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1";

  try {
    const res = await fetch(url, {
      headers: {
        accept: "application/json",
        "x-cg-pro-api-key": apiKey,
        "User-Agent": "CryptoTrackerApp/1.0",
      },
      next: { revalidate },
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("❌ CoinGecko Error:", res.status, text);
      return NextResponse.json(
        { error: "CoinGecko request failed", details: text },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data, { status: 200 });
  } catch (err: any) {
    console.error("❌ API Error /coins:", err);
    return NextResponse.json(
      { error: "Unexpected server error" },
      { status: 500 }
    );
  }
}
