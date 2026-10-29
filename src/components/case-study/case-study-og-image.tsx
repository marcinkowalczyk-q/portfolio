import { getT, isValidLocale, defaultLocale } from "@/i18n";
import { getCaseStudy } from "@/lib/content";
import { renderOgImage, projectBg } from "@/lib/og-image";

// Share card for a case study route's opengraph-image.tsx
export async function caseStudyOgImage(params: Promise<{ locale: string }>, slug: keyof typeof projectBg) {
  const { locale: raw } = await params;
  const locale = isValidLocale(raw) ? raw : defaultLocale;
  const { frontmatter: fm } = getCaseStudy(locale, slug);
  return renderOgImage({
    eyebrow: getT(locale)["cs.label"],
    title: fm.titleNote ? `${fm.title} ${fm.titleNote}` : fm.title,
    image: { src: fm.card.image, bg: projectBg[slug] },
  });
}
