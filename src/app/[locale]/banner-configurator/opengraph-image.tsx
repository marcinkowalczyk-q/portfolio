import { locales } from "@/i18n";
import { caseStudyOgImage } from "@/components/case-study/case-study-og-image";
import { ogSize, ogContentType } from "@/lib/og-image";

export const alt = "Banner Configurator — case study by Marcin Kowalczyk";
export const size = ogSize;
export const contentType = ogContentType;

// Prerender one image per locale at build time
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  return caseStudyOgImage(params, "banner-configurator");
}
