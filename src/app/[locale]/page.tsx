import { getT, isValidLocale, defaultLocale, type Locale } from "@/i18n";
import SiteHeader from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";
import Hero from "@/components/hero/hero";
import ProjectList from "@/components/work/project-list";
import HowIWork from "@/components/how-i-work/how-i-work";

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
        <HowIWork t={t} />
      </main>
      <SiteFooter locale={locale} t={t} />
    </>
  );
}
