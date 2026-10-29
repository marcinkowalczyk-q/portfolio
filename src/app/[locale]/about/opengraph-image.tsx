import { getT, isValidLocale, defaultLocale, locales } from "@/i18n";
import { getAbout } from "@/lib/content";
import { renderOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const alt = "Marcin Kowalczyk — About";
export const size = ogSize;
export const contentType = ogContentType;

// Prerender one image per locale at build time
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = isValidLocale(raw) ? raw : defaultLocale;
  return renderOgImage({ eyebrow: getT(locale)["about.eyebrow"], title: getAbout(locale).frontmatter.title });
}
