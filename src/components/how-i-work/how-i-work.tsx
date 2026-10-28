import type { T } from "@/i18n";
import Container from "@/components/ui/container";

type Props = { t: T };

const ITEMS = [1, 2, 3, 4] as const;

export default function HowIWork({ t }: Props) {
  return (
    <section aria-labelledby="how-i-work-heading" className="bg-[var(--color-surface)] py-16 md:py-24">
      <Container size="cards">
        <h2 id="how-i-work-heading" className="text-h2-sm text-[var(--color-fg-primary)] md:text-h2">
          {t["howIWork.heading"]}
        </h2>
        <ul className="mt-8 grid grid-cols-1 gap-8 md:mt-12 md:grid-cols-2 md:gap-x-12 md:gap-y-10 lg:grid-cols-4">
          {ITEMS.map((n) => (
            <li key={n}>
              <h3 className="text-h3 text-[var(--color-fg-primary)]">
                {t[`howIWork.${n}.lead`].replace(/\.$/, "")}
              </h3>
              <p className="mt-2 text-body text-[var(--color-fg-secondary)]">{t[`howIWork.${n}.text`]}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
