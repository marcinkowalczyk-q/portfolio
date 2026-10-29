import type { Metadata } from "next";
import { getT, isValidLocale, defaultLocale, type Locale } from "@/i18n";
import { getAbout } from "@/lib/content";
import { renderProse } from "@/lib/mdx";
import { pageMetadata } from "@/lib/site";
import SiteHeader from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";
import AboutContent from "@/components/about/about-content";

type Params = { params: Promise<{ locale: string }> };

async function resolveLocale(params: Params["params"]): Promise<Locale> {
  const { locale } = await params;
  return isValidLocale(locale) ? locale : defaultLocale;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { frontmatter } = getAbout(locale);
  const title = getT(locale)["about.eyebrow"];
  return pageMetadata({ locale, route: "/about", title, description: frontmatter.title });
}

export default async function AboutPage({ params }: Params) {
  const locale = await resolveLocale(params);
  const t = getT(locale);
  const { frontmatter, body } = getAbout(locale);
  // 20px between paragraphs here (12px in case studies)
  const content = await renderProse(body, t, {
    p: (props) => <p className="mt-5 text-body text-[var(--color-fg-secondary)] first:mt-0" {...props} />,
  });

  return (
    <>
      <SiteHeader locale={locale} t={t} />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        <AboutContent frontmatter={frontmatter} t={t}>
          {content}
        </AboutContent>
      </main>
      <SiteFooter locale={locale} t={t} />
    </>
  );
}
