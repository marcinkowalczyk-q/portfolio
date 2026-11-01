import { getT, isValidLocale, defaultLocale, locales } from "@/i18n";
import { renderOgImage, ogSize, ogContentType } from "@/lib/og-image";
import { siteConfig } from "@/lib/site";

export const alt = `Marcin Kowalczyk — ${siteConfig.role}`;
export const size = ogSize;
export const contentType = ogContentType;

// Prerender one image per locale at build time
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = getT(isValidLocale(locale) ? locale : defaultLocale);
  // "Complex Digital Products | Product & Technology" → two lines
  return renderOgImage({ eyebrow: "Portfolio", title: t["hero.tagline"].split(" | ") });
}
