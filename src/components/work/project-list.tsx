import type { Locale, T } from "@/i18n";
import { getCaseStudyCard } from "@/lib/content";
import ProjectCard from "./project-card";

// Display order; card numbers follow position, not frontmatter
const ORDER = ["e-doreczenia", "banner-configurator"];

type Props = { locale: Locale; t: T };

export default function ProjectList({ locale, t }: Props) {
  return (
    <section id="work" aria-labelledby="work-heading">
      <h2 id="work-heading" className="sr-only">
        {t["project.workHeading"]}
      </h2>
      {ORDER.map((slug, i) => (
        <ProjectCard
          key={slug}
          card={getCaseStudyCard(locale, slug)}
          href={`/${locale}/${slug}`}
          number={String(i + 1).padStart(2, "0")}
          ctaLabel={t["project.viewCaseStudy"]}
          featured={i === 0}
          imageFirst={i % 2 === 1}
        />
      ))}
    </section>
  );
}
