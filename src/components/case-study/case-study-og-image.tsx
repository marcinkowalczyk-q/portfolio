import { getT, isValidLocale, defaultLocale, type Locale } from "@/i18n";
import { getCaseStudy } from "@/lib/content";
import { renderOgImage, projectBg } from "@/lib/og-image";

type Params = Promise<{ locale: string }> | { locale: string };

async function resolve(params: Params, slug: keyof typeof projectBg) {
  const { locale: raw } = await Promise.resolve(params);
  const locale: Locale = isValidLocale(raw) ? raw : defaultLocale;
  const { frontmatter: fm } = getCaseStudy(locale, slug);
  return { t: getT(locale), fm, title: fm.titleNote ? `${fm.title} ${fm.titleNote}` : fm.title };
}

// Share card for a case study (app/[locale]/og/[page]/route.tsx)
export async function caseStudyOgImage(params: Params, slug: keyof typeof projectBg) {
  const { t, fm, title } = await resolve(params, slug);
  return renderOgImage({
    eyebrow: t["cs.label"],
    title,
    image: { src: fm.card.image, bg: projectBg[slug] },
  });
}
