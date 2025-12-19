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
  title: "Maintenance Check — Should You Submit a Maintenance Request?",
  description:
    "Not sure whether to submit a maintenance request? Describe the issue and get a safety-aware recommendation: submit, monitor, or escalate — plus a message template.",
  openGraph: {
    title: "Maintenance Check — Should You Submit a Maintenance Request?",
    description:
      "Describe a home issue and get a clear, safety-aware recommendation: submit, monitor, or escalate — plus the safest next step.",
    url: siteUrl,
    siteName: "Maintenance Check",
    type: "website",
    images: [
      {
        url: "/og.png", // optional — add later if you want richer previews
        width: 1200,
        height: 630,
        alt: "Maintenance Check — Submit, Monitor, or Escalate",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Maintenance Check — Should You Submit a Maintenance Request?",
    description:
      "A safety-aware check for renters and condo/HOA owners: submit, monitor, or escalate — with a message template.",
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



