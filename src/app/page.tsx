// src/app/page.tsx

import type { Metadata } from "next";
import CryptoPage from "@/features/crypto/CryptoPage";

export const metadata: Metadata = {
  metadataBase: new URL(
    "https://crypto-project-for-portfolio.vercel.app/",
  ),

  title: "Crypto Tracker | Real-time Cryptocurrency Prices",

  description:
    "Track live cryptocurrency prices and interactive charts for Bitcoin, Ethereum, and more.",

  authors: [
    {
      name: "Parham Shirinkam",
    },
  ],

  creator: "Parham Shirinkam",
  publisher: "Parham Shirinkam",

  icons: {
    icon: "/favicon.ico",
  },

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Crypto Tracker | Real-time Cryptocurrency Prices",

    description:
      "Track live cryptocurrency prices and interactive charts for Bitcoin, Ethereum, and more.",

    url: "/",

    siteName: "Crypto Tracker",

    locale: "en_US",

    type: "website",

    images: [
      {
        url: "/crypto.png",
        width: 1200,
        height: 630,
        alt: "Crypto Tracker Dashboard",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Crypto Tracker | Real-time Cryptocurrency Prices",

    description:
      "Track live cryptocurrency prices and interactive charts for Bitcoin, Ethereum, and more.",

    images: ["/crypto.png"],
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Crypto Tracker",
  url: "https://crypto-project-for-portfolio.vercel.app/",
  description:
    "Track live cryptocurrency prices and interactive charts for Bitcoin, Ethereum, and more.",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <CryptoPage />
    </>
  );
}