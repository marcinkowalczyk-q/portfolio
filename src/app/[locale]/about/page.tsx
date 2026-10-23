import type { Metadata } from "next";
import { getT, isValidLocale, defaultLocale, type Locale } from "@/i18n";
import Nav from "@/components/layout/nav";
import Footer from "@/components/layout/footer";
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
      <Nav locale={locale} t={t} />
      <main id="main">
        <AboutContent t={t} />
      </main>
      <Footer t={t} />
    </>
  );
}
