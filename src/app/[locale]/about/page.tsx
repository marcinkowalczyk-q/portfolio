import type { Metadata } from "next";
import { getT, isValidLocale, defaultLocale, type Locale } from "@/i18n";
import SiteHeader from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";
import AboutContent from "@/components/about/about-content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Marcin Kowalczyk — UX/UI designer focused on complex systems, ambiguous problems, and AI-assisted product design.",
};

export default async function AboutPage({
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
      <main id="main" tabIndex={-1} className="focus:outline-none">
        <AboutContent t={t} />
      </main>
      <SiteFooter locale={locale} t={t} />
    </>
  );
}
