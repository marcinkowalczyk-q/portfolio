import { getT, isValidLocale, defaultLocale, type Locale } from "@/i18n";
import { getProjects } from "@/lib/projects";
import Nav from "@/components/layout/nav";
import Footer from "@/components/layout/footer";
import Hero from "@/components/hero/hero";
import WorkList from "@/components/work/work-list";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : defaultLocale;
  const t = getT(locale);
  const projects = getProjects(locale);

  return (
    <>
      <Nav locale={locale} t={t} />
      <main id="main">
        <Hero t={t} />
        <WorkList projects={projects} t={t} />
      </main>
      <Footer t={t} />
    </>
  );
}
