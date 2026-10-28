import type { Metadata } from "next";
import { getT, isValidLocale, defaultLocale, type Locale } from "@/i18n";
import { getBanerCaseStudy } from "@/lib/case-studies";
import SiteHeader from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";
import CaseStudyHeader from "@/components/case-study/case-study-header";
import CaseStudySectionView from "@/components/case-study/case-study-section";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : defaultLocale;
  const cs = getBanerCaseStudy(locale);
  return { title: cs.metaTitle, description: cs.metaDescription };
}

export default async function BanerConfiguratorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : defaultLocale;
  const t = getT(locale);
  const cs = getBanerCaseStudy(locale);

  return (
    <>
      <SiteHeader locale={locale} t={t} />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        <CaseStudyHeader
          number={cs.number}
          title={cs.title}
          subtitle={cs.subtitle}
          backLabel={t["cs.backToWork"]}
          locale={locale}
        />
        <article>
          {cs.sections.map((section) => (
            <CaseStudySectionView key={section.heading} section={section} />
          ))}
        </article>
      </main>
      <SiteFooter locale={locale} t={t} />
    </>
  );
}
