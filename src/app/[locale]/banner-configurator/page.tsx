import type { Metadata } from "next";
import { getT, isValidLocale, defaultLocale, type Locale } from "@/i18n";
import { getCaseStudy } from "@/lib/content";
import { renderCaseStudyBody } from "@/lib/mdx";
import SiteHeader from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";
import CaseStudyHeader from "@/components/case-study/case-study-header";
import MetaList from "@/components/case-study/meta-list";
import Divider from "@/components/ui/divider";

const SLUG = "banner-configurator";

type Params = { params: Promise<{ locale: string }> };

async function resolveLocale(params: Params["params"]): Promise<Locale> {
  const { locale } = await params;
  return isValidLocale(locale) ? locale : defaultLocale;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { frontmatter: fm } = getCaseStudy(await resolveLocale(params), SLUG);
  return {
    title: fm.title,
    description: fm.lede,
    openGraph: { title: fm.title, description: fm.lede, images: [fm.heroImage] },
    twitter: { title: fm.title, description: fm.lede, images: [fm.heroImage] },
  };
}

export default async function BannerConfiguratorPage({ params }: Params) {
  const locale = await resolveLocale(params);
  const t = getT(locale);
  const { frontmatter, body } = getCaseStudy(locale, SLUG);
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
