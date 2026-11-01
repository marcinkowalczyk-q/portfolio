import type { Metadata } from "next";
import { getT, isValidLocale, defaultLocale, type Locale } from "@/i18n";
import { pageMetadata } from "@/lib/site";
import SiteHeader from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";
import Hero from "@/components/hero/hero";
import ProjectList from "@/components/work/project-list";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({ locale: isValidLocale(locale) ? locale : defaultLocale, route: "" });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : defaultLocale;
  const t = getT(locale);

  return (
    <>
      <SiteHeader locale={locale} t={t} />
      {/* tabIndex lets the skip link move focus here; no ring on a programmatic focus target */}
      <main id="main" tabIndex={-1} className="focus:outline-none">
        <Hero t={t} />
        <ProjectList locale={locale} t={t} />
      </main>
      <SiteFooter locale={locale} t={t} />
    </>
  );
}
