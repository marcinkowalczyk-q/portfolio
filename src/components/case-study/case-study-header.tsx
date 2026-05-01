import Link from "next/link";

type Props = {
  number: string;
  title: string;
  subtitle: string;
};

export default function CaseStudyHeader({ number, title, subtitle }: Props) {
  return (
    <header className="mx-auto max-w-6xl px-6 pt-20 pb-12 md:px-10 md:pt-28 md:pb-20">
      <Link
        href="/"
        className="text-sm text-[var(--color-fg-muted)] transition-opacity hover:opacity-70"
      >
        &larr; Back to work
      </Link>
      <p className="mt-10 text-sm font-medium tracking-[0.2em] text-[var(--color-fg-muted)]">
        {number} / CASE STUDY
      </p>
      <h1 className="mt-6 text-4xl leading-[1.05] tracking-tight text-[var(--color-fg)] md:text-6xl lg:text-7xl">
        <span className="block">{title}</span>
        <span className="mt-2 block text-2xl font-normal text-[var(--color-fg-muted)] md:text-3xl">
          {subtitle}
        </span>
      </h1>
    </header>
  );
}
