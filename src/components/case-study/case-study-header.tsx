import Link from "next/link";
import type { Locale } from "@/i18n";

type Props = {
  number: string;
  title: string;
  subtitle: string;
  backLabel: string;
  locale: Locale;
};

export default function CaseStudyHeader({
  number,
  title,
  subtitle,
  backLabel,
  locale,
}: Props) {
  return (
    <header className="mx-auto max-w-6xl px-6 pt-20 pb-12 md:px-10 md:pt-28 md:pb-20">
      <Link
        href={`/${locale}`}
        className="text-sm text-[var(--color-fg-muted)] transition-opacity hover:opacity-70"
      >
        {backLabel}
      </Link>
      <p className="mt-10 text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--color-fg-muted)]">
        {number} / CASE STUDY
      </p>
      <h1
        className="mt-6 text-4xl leading-[1.05] tracking-tight text-[var(--color-fg)] md:text-6xl lg:text-7xl"
        style={{ fontWeight: 400 }}
      >
        <span className="block">{title}</span>
        <span
          className="mt-2 block text-2xl text-[var(--color-fg-muted)] md:text-3xl"
          style={{ fontWeight: 400 }}
        >
          {subtitle}
        </span>
      </h1>
    </header>
  );
}
