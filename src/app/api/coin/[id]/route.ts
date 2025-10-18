import { NextResponse } from "next/server";

export const revalidate = 600; // cache server result for 10 minutes

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { searchParams } = new URL(request.url);
  const days = searchParams.get("days") || "7";

  try {
    const url = `https://api.coingecko.com/api/v3/coins/${params.id}/market_chart?vs_currency=usd&days=${days}`;
    const res = await fetch(url, {
      headers: { accept: "application/json" },
      next: { revalidate },
    });

    // اگر پاسخ ok نبود
    if (!res.ok) {
      const text = await res.text();
      console.error(`❌ CoinGecko error (${params.id}):`, text);
      return NextResponse.json({ prices: [] }, { status: 200 });
    }

    const data = await res.json();

    // ولیدیشن: حتماً prices آرایه باشه
    if (!data || !Array.isArray(data.prices)) {
      return NextResponse.json({ prices: [] }, { status: 200 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error("❌ API Error /coin/[id]:", err);
    return NextResponse.json({ prices: [] }, { status: 200 });
  }
}
