import CaseStudyPage, { caseStudyMetadata, type CaseStudyParams } from "@/components/case-study/case-study-page";

const SLUG = "banner-configurator";

export function generateMetadata({ params }: CaseStudyParams) {
  return caseStudyMetadata(params, SLUG);
}

export default function BannerConfiguratorPage({ params }: CaseStudyParams) {
  return <CaseStudyPage params={params} slug={SLUG} />;
}
