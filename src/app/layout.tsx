import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-marcin-kowalczyk.webflow.io"),
  title: {
    default: "Marcin Kowalczyk — UX Designer | Complex Interfaces & System Tools",
    template: "%s | Marcin Kowalczyk",
  },
  description:
    "UX designer focused on complex digital products, operational tools, and turning ambiguous problems into systems people can actually use.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Marcin Kowalczyk — Portfolio",
    title: "Marcin Kowalczyk — UX Designer",
    description:
      "Senior UX Designer working on complex digital products, system tools and operational interfaces.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Marcin Kowalczyk — UX Designer",
    description:
      "Senior UX Designer working on complex digital products, system tools and operational interfaces.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${interTight.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
