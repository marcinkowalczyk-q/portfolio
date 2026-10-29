import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Bitter } from "next/font/google";
import "../globals.css";
import { getT, isValidLocale, locales, defaultLocale, type Locale } from "@/i18n";
import { siteUrl } from "@/lib/site";
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const t = getT(isValidLocale(rawLocale) ? rawLocale : defaultLocale);
  return {
    metadataBase: new URL(siteUrl),
    title: { default: t["meta.title"], template: "%s | Marcin Kowalczyk" },
    description: t["meta.description"],
  };
}

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
