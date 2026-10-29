import type { Metadata } from "next";
import { getT, isValidLocale, defaultLocale, type Locale } from "@/i18n";
import { getPage } from "@/lib/content";
import { renderProse } from "@/lib/mdx";
import { pageMetadata } from "@/lib/site";
import SiteHeader from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";
import Container from "@/components/ui/container";

const SLUG = "accessibility";

type Params = { params: Promise<{ locale: string }> };

async function resolveLocale(params: Params["params"]): Promise<Locale> {
  const { locale } = await params;
  return isValidLocale(locale) ? locale : defaultLocale;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { frontmatter } = getPage(locale, SLUG);
  return pageMetadata({ locale, route: "/accessibility", title: frontmatter.title, description: frontmatter.description });
}

// Text-column layout: 740px measure, same type as case study prose
export default async function AccessibilityPage({ params }: Params) {
  const locale = await resolveLocale(params);
  const t = getT(locale);
  const { frontmatter, body } = getPage(locale, SLUG);
  const content = await renderProse(body, t);

  return (
    <>
      <SiteHeader locale={locale} t={t} />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        <Container as="article" size="text" className="pt-16 pb-24 md:pt-28 md:pb-28">
          <h1 className="mb-6 text-h1-sm text-[var(--color-fg)] md:text-h1">{frontmatter.title}</h1>
          {content}
        </Container>
      </main>
      <SiteFooter locale={locale} t={t} />
    </>
  );
}
