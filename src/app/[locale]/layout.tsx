import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Bitter } from "next/font/google";
import "../globals.css";
import { getT, isValidLocale, locales, defaultLocale, type Locale } from "@/i18n";
import SkipLink from "@/components/layout/skip-link";

// Both are variable fonts, so no weight list is needed
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const bitter = Bitter({
  variable: "--font-bitter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-marcin-kowalczyk.webflow.io"),
  title: {
    default: "Marcin Kowalczyk — UX / UI Designer",
    template: "%s | Marcin Kowalczyk",
  },
  description:
    "UX/UI designer focused on complex digital products, operational tools, and turning ambiguous problems into systems people can actually use.",
  openGraph: {
    type: "website",
    siteName: "Marcin Kowalczyk — Portfolio",
    title: "Marcin Kowalczyk — UX / UI Designer",
    description:
      "UX/UI designer working on complex digital products, system tools and operational interfaces.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Marcin Kowalczyk — UX / UI Designer",
    description:
      "UX/UI designer working on complex digital products, system tools and operational interfaces.",
  },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : defaultLocale;

  return (
    <html lang={locale} className={`${inter.variable} ${bitter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <SkipLink label={getT(locale)["a11y.skipLink"]} />
        {children}
      </body>
    </html>
  );
}
