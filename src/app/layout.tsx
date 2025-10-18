// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap", // ⚡️ بهبود عملکرد فونت
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Crypto Tracker",
  description: "Serverless crypto dashboard built with Next.js 14",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${robotoMono.variable} 
         <body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-[1500ms] ease-in-out">
`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
