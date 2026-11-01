import type { T } from "@/i18n";
import Eyebrow from "@/components/ui/eyebrow";
import Divider from "@/components/ui/divider";

type Props = { t: T };

export default function Hero({ t }: Props) {
  return (
    <section
      aria-labelledby="hero-heading"
      className="flex flex-col items-center gap-3 px-10 py-20 text-center md:py-[184px]"
    >
      <div className="flex flex-col items-center gap-3">
        <div className="flex flex-col items-center gap-2">
          <Eyebrow uppercase={false}>{t["hero.eyebrow"]}</Eyebrow>
          <h1
            id="hero-heading"
            className="text-display-sm text-[var(--color-fg-primary)] md:text-display"
          >
            Marcin Kowalczyk
          </h1>
        </div>
        <p className="text-base leading-[normal] text-[var(--color-fg-secondary)]">
          {t["hero.tagline"]}
        </p>
      </div>

      <Divider width="hero" />

      <p className="max-w-[680px] text-lede-sm text-[var(--color-fg-lede)] md:text-lede">
        {t["hero.bio"]}
      </p>
    </section>
  );
}
