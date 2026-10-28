import Link from "next/link";
import type { Locale, T } from "@/i18n";
import NavLinks from "./nav-links";
import LanguageSwitch from "./language-switch";

type Props = { locale: Locale; t: T };

export default function SiteHeader({ locale, t }: Props) {
  return (
    <header className="w-full border-b border-[var(--color-border-subtle)] bg-[var(--color-bg)]">
      {/* No hamburger (DESIGN.md 5.8): on narrow screens links + toggle wrap to a second row */}
      <div className="flex flex-wrap items-center justify-between gap-y-3 px-6 py-4 md:px-10 md:py-5">
        <Link
          href={`/${locale}`}
          className="font-serif text-sm leading-[normal] font-semibold tracking-[-0.01em] text-[var(--color-fg)]"
        >
          Marcin Kowalczyk
        </Link>

        <div className="flex w-full items-center justify-between md:contents">
          <nav aria-label={t["nav.label"]}>
            <NavLinks locale={locale} t={t} />
          </nav>

          <div className="flex justify-end md:w-[130px]">
            <LanguageSwitch locale={locale} t={t} />
          </div>
        </div>
      </div>
    </header>
  );
}
