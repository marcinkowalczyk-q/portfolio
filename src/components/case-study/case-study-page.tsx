import type { Metadata } from "next";
import { getT, isValidLocale, defaultLocale, type Locale } from "@/i18n";
import { getCaseStudy } from "@/lib/content";
import { renderCaseStudyBody } from "@/lib/mdx";
import SiteHeader from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";
import Divider from "@/components/ui/divider";
import CaseStudyHeader from "./case-study-header";
import MetaList from "./meta-list";

export type CaseStudyParams = { params: Promise<{ locale: string }> };

export async function resolveLocale(params: CaseStudyParams["params"]): Promise<Locale> {
  const { locale } = await params;
  return isValidLocale(locale) ? locale : defaultLocale;
}

export async function caseStudyMetadata(params: CaseStudyParams["params"], slug: string): Promise<Metadata> {
  const { frontmatter: fm } = getCaseStudy(await resolveLocale(params), slug);
  const title = fm.titleNote ? `${fm.title} ${fm.titleNote}` : fm.title;
  return {
    title,
    description: fm.lede,
    openGraph: { title, description: fm.lede, images: [fm.heroImage] },
    twitter: { title, description: fm.lede, images: [fm.heroImage] },
  };
}

// Shared case study route: header, meta card, MDX body
export default async function CaseStudyPage({ params, slug }: CaseStudyParams & { slug: string }) {
  const locale = await resolveLocale(params);
  const t = getT(locale);
  const { frontmatter, body } = getCaseStudy(locale, slug);
  const content = await renderCaseStudyBody(body, t);

  return (
    <>
      <SiteHeader locale={locale} t={t} />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        <article>
          <CaseStudyHeader frontmatter={frontmatter} t={t} />
          {/* One rhythm for the whole body: 80px mobile / 90px desktop between blocks.
              Block layout (not flex) so the centred containers keep their full width. */}
          <div className="pt-20 pb-26 md:pt-section [&>*+*]:mt-20 md:[&>*+*]:mt-section">
            <MetaList meta={frontmatter.meta} t={t} />
            <div className="px-6 md:px-10">
              <Divider width="meta" className="mx-auto" />
            </div>
            {content}
          </div>
        </article>
      </main>
      <SiteFooter locale={locale} t={t} />
    </>
  );
}
