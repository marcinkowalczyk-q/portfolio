import { getT, isValidLocale, locales } from "@/i18n";
import { getAbout } from "@/lib/content";
import { renderOgImage } from "@/lib/og-image";
import { ogPages, type OgPage } from "@/lib/site";
import { caseStudyOgImage } from "@/components/case-study/case-study-og-image";

// Share cards, one per locale and page, all rendered at build time. A route handler rather
// than opengraph-image.tsx so pageMetadata() can give each card an alt in the page language.
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => Object.values(ogPages).map((page) => ({ locale, page })));
}

type Context = { params: Promise<{ locale: string; page: string }> };

export async function GET(_request: Request, { params }: Context) {
  const { locale, page } = await params;
  if (!isValidLocale(locale) || !(Object.values(ogPages) as string[]).includes(page)) {
    return new Response("Not found", { status: 404 });
  }
  const t = getT(locale);
  switch (page as OgPage) {
    case "home":
      // "Złożone produkty cyfrowe | Produkt i technologia" → two lines
      return renderOgImage({ eyebrow: "Portfolio", title: t["hero.tagline"].split(" | ") });
    case "about":
      return renderOgImage({ eyebrow: t["about.eyebrow"], title: getAbout(locale).frontmatter.title });
    case "banner-configurator":
    case "e-doreczenia":
      return caseStudyOgImage({ locale }, page as "banner-configurator" | "e-doreczenia");
  }
}
