import type { T } from "@/i18n";

type Props = { t: T };

export default function Hero({ t }: Props) {
  return (
    <section
      aria-labelledby="hero-heading"
      className="py-[180px] text-center"
    >
      <div className="mx-auto max-w-[621px] px-6">
        <p className="text-[12px] uppercase tracking-[0.2em] text-[var(--color-fg-muted)]">
          {t["hero.eyebrow"]}
        </p>
        <h1
          id="hero-heading"
          className="mt-1 text-[72px] leading-[1.05] tracking-tight text-[var(--color-fg-hero)]"
        >
          Marcin Kowalczyk
        </h1>
        <p className="text-base text-[var(--color-fg-muted)]">
          {t["hero.tagline"]}
        </p>
      </div>

      <div
        className="mx-auto my-[30px] h-px w-[268px] bg-[var(--color-divider)]"
        aria-hidden="true"
      />

      <p className="mx-auto max-w-[680px] px-6 font-light text-[20px] leading-[34px] text-[var(--color-fg-muted)]">
        {t["hero.bio"]}
      </p>
    </section>
  );
}
