import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Codegarden — Coding for teens. That doesn't feel like school.",
  description:
    "Your kid builds a game, a Discord bot, or a mod — guided by an AI tutor that speaks their language.",
  openGraph: {
    title: "Codegarden — Coding for teens. That doesn't feel like school.",
    description:
      "Your kid builds a game, a Discord bot, or a mod — guided by an AI tutor that speaks their language.",
    images: [
      {
        url: "https://waitlist-api-sigma.vercel.app/api/og?title=Codegarden&accent=green&category=Education",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      "https://waitlist-api-sigma.vercel.app/api/og?title=Codegarden&accent=green&category=Education",
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-neutral-900 min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
