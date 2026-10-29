import { isValidLocale, defaultLocale, locales } from "@/i18n";
import { getPage } from "@/lib/content";
import { renderOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const alt = "Marcin Kowalczyk — Accessibility statement";
export const size = ogSize;
export const contentType = ogContentType;

// Prerender one image per locale at build time
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = isValidLocale(raw) ? raw : defaultLocale;
  return renderOgImage({ eyebrow: "WCAG 2.2 AA", title: getPage(locale, "accessibility").frontmatter.title });
}
