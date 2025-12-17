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

export const metadata: Metadata = {
  title: "Maintenance Check — DIY or Submit?",
  description:
    "Not sure if a home issue is your responsibility? Get a quick, safety-aware check to decide whether to fix it yourself or submit maintenance.",
  openGraph: {
    title: "Maintenance Check — DIY or Submit?",
    description:
      "Describe a home issue and get a quick recommendation: DIY or submit maintenance.",
    url: "https://YOURDOMAIN.com",
    siteName: "Maintenance Check",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maintenance Check — DIY or Submit?",
    description:
      "A fast way for renters and condo owners to decide what to fix vs submit.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
