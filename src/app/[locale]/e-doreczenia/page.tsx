import CaseStudyPage, { caseStudyMetadata, type CaseStudyParams } from "@/components/case-study/case-study-page";

const SLUG = "e-doreczenia";

export function generateMetadata({ params }: CaseStudyParams) {
  return caseStudyMetadata(params, SLUG);
}

export default function EDoreczeniaPage({ params }: CaseStudyParams) {
  return <CaseStudyPage params={params} slug={SLUG} />;
}
