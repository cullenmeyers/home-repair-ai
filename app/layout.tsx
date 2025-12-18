import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ Your real deployed URL
const siteUrl = "https://home-repair-ai-omega.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Before You Submit Maintenance — Know If It’s Yours to Fix",
  description:
    "Not sure if a home issue is your responsibility? Get a quick, safety-aware check to decide whether to fix it yourself or submit maintenance.",
  openGraph: {
    title: "Before You Submit Maintenance — Know If It’s Yours to Fix",
    description:
      "Describe a home issue and get a clear verdict: yours to fix or submit maintenance — plus the safest next step.",
    url: siteUrl,
    siteName: "Maintenance Check",
    type: "website",
    images: [
      {
        url: "/og.png", // optional — add later if you want richer previews
        width: 1200,
        height: 630,
        alt: "Maintenance Check — DIY or Submit?",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Before You Submit Maintenance — Know If It’s Yours to Fix",
    description:
      "A fast, safety-aware check for renters and condo owners: yours to fix or submit maintenance.",
    images: ["/og.png"], // optional
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}


