import type { CaseStudySection } from "@/lib/case-studies";
import CaseStudyFigure from "./case-study-figure";

type Props = { section: CaseStudySection };

export default function CaseStudySectionView({ section }: Props) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12 md:grid md:grid-cols-12 md:gap-12 md:px-10 md:py-16">
      <div className="md:col-span-4">
        <h2 className="text-xl tracking-tight text-[var(--color-fg)] md:sticky md:top-8 md:text-2xl">
          {section.heading}
        </h2>
      </div>

      <div className="mt-6 md:col-span-8 md:mt-0">
        <div className="space-y-5 text-base leading-relaxed text-[var(--color-fg-muted)] md:text-lg">
          {section.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {section.bullets && section.bullets.length > 0 && (
          <ul className="mt-6 space-y-3 border-l border-[var(--color-border)] pl-5 text-base leading-relaxed text-[var(--color-fg)] md:text-lg">
            {section.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        )}

        {section.images && section.images.length > 0 && (
          <div className="mt-10 space-y-6">
            {section.images.map((img) => (
              <CaseStudyFigure key={img.src} image={img} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
