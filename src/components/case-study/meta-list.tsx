import type { T } from "@/i18n";
import type { CaseStudyFrontmatter } from "@/lib/content";
import Container from "@/components/ui/container";

type Props = { meta: CaseStudyFrontmatter["meta"]; t: T };

const FIELDS = ["year", "role", "scope", "team", "designSystem", "status"] as const;

// Year / Role / Scope / Team / Design System / Status card
export default function MetaList({ meta, t }: Props) {
  return (
    <Container size="content">
      <dl className="rounded-card border border-[var(--color-divider)] px-4 py-3">
        {FIELDS.map((field) => {
          const value = meta[field];
          if (!value || (Array.isArray(value) && value.length === 0)) return null;
          return (
            <div key={field} className="flex gap-4 py-0.5 md:gap-12 md:py-0">
              <dt className="w-[70px] shrink-0 text-label-sm text-[var(--color-fg-primary)] md:w-[112px] md:text-label md:whitespace-nowrap">
                {t[`cs.meta.${field}`]}
              </dt>
              <dd className="min-w-0 text-body-sm text-[var(--color-fg-secondary)] md:text-body">
                {Array.isArray(value) ? (
                  <ul className="list-disc pl-5">
                    {value.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  value
                )}
              </dd>
            </div>
          );
        })}
      </dl>
    </Container>
  );
}
