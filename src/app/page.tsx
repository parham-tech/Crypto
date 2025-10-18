// src/app/page.tsx
import CryptoPage from "@/features/crypto/CryptoPage";

export const metadata = {
  title: "Crypto Tracker | Real-time Cryptocurrency Prices",
  description:
    "Track live cryptocurrency prices and interactive charts for Bitcoin, Ethereum, and more.",
  openGraph: {
    title: "Crypto Tracker | Real-time Cryptocurrency Prices",
    description:
      "Track live cryptocurrency prices and interactive charts for Bitcoin, Ethereum, and more.",
    url: "https://crypto-tracker-parham.vercel.app/",
    siteName: "Crypto Tracker",
    images: [
      {
        url: "https://crypto-tracker-parham.vercel.app/og-image-crypto.jpg",
        width: 1200,
        height: 630,
        alt: "Crypto Tracker Dashboard",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Crypto Tracker | Real-time Cryptocurrency Prices",
    description:
      "Track live cryptocurrency prices and interactive charts for Bitcoin, Ethereum, and more.",
    images: ["https://crypto-tracker-parham.vercel.app/og-image-crypto.jpg"],
  },
  alternates: {
    canonical: "https://crypto-tracker-parham.vercel.app/",
  },
};

export default function Page() {
  return <CryptoPage />;
}
