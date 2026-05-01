import type { Metadata } from "next";
import Nav from "@/components/layout/nav";
import Footer from "@/components/layout/footer";
import CaseStudyHeader from "@/components/case-study/case-study-header";
import CaseStudySectionView from "@/components/case-study/case-study-section";
import { banerCaseStudy } from "@/lib/case-studies";

export const metadata: Metadata = {
  title: banerCaseStudy.metaTitle,
  description: banerCaseStudy.metaDescription,
};

export default function BanerConfiguratorPage() {
  return (
    <>
      <Nav />
      <main id="main">
        <CaseStudyHeader
          number={banerCaseStudy.number}
          title={banerCaseStudy.title}
          subtitle={banerCaseStudy.subtitle}
        />
        <article>
          {banerCaseStudy.sections.map((section) => (
            <CaseStudySectionView key={section.heading} section={section} />
          ))}
        </article>
      </main>
      <Footer />
    </>
  );
}
