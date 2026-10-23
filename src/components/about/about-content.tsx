import Image from "next/image";
import type { T } from "@/i18n";

const PORTRAIT_SRC =
  "https://cdn.prod.website-files.com/697fa75c9246c7e0901d6165/698261a1a040ba7ee336e98c_some_handsome_guy_1.png";

const LINKEDIN_URL = "https://www.linkedin.com/in/marcin-kowalczyk-85569714a/";

type Props = { t: T };

export default function AboutContent({ t }: Props) {
  return (
    <section
      aria-labelledby="about-heading"
      className="mx-auto max-w-6xl px-6 py-20 md:grid md:grid-cols-12 md:gap-16 md:px-10 md:py-28"
    >
      <div className="md:col-span-4">
        <div className="overflow-hidden rounded-md bg-[var(--color-surface-2)]">
          <Image
            src={PORTRAIT_SRC}
            alt="Portrait photo of Marcin Kowalczyk"
            width={800}
            height={1000}
            className="h-auto w-full object-cover"
            sizes="(min-width: 768px) 33vw, 100vw"
            priority
          />
        </div>
      </div>

      <div className="mt-10 md:col-span-8 md:mt-0">
        <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--color-fg-muted)]">
          {t["about.eyebrow"]}
        </p>
        <h1
          id="about-heading"
          className="mt-6 text-[40px] leading-[48px] tracking-tight text-[var(--color-fg)]"
          style={{ fontWeight: 400 }}
        >
          {t["about.heading"]}
        </h1>
        <div className="mt-8 space-y-6 text-base leading-relaxed text-[var(--color-fg-muted)]">
          <p>{t["about.para1"]}</p>
          <p>{t["about.para2"]}</p>
          <p>{t["about.para3"]}</p>
        </div>

        <div className="mt-10">
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${t["about.linkedin"]} (opens in a new tab)`}
            className="inline-flex flex-col gap-0.5 text-sm font-medium text-[var(--color-fg)] transition-opacity hover:opacity-70"
          >
            <span>{t["about.linkedin"]}</span>
            <span className="h-px bg-[var(--color-fg)]" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
