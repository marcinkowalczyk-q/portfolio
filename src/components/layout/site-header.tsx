import Link from "next/link";
import type { Locale, T } from "@/i18n";
import NavLinks from "./nav-links";
import LanguageSwitch from "./language-switch";
import MobileMenu from "./mobile-menu";

type Props = { locale: Locale; t: T };

export default function SiteHeader({ locale, t }: Props) {
  return (
    <header className="relative w-full border-b border-[var(--color-border-subtle)] bg-[var(--color-bg)]">
      {/* Below md: brand + menu button (DESIGN.md 5.7); md and up: brand, links, language switch */}
      <div className="flex items-center justify-between px-6 py-2 md:px-10 md:py-5">
        <Link
          href={`/${locale}`}
          className="font-serif text-sm leading-[normal] font-semibold tracking-[-0.01em] text-[var(--color-fg)]"
        >
          Marcin Kowalczyk
        </Link>

        <nav aria-label={t["nav.label"]} className="hidden md:block">
          <NavLinks locale={locale} t={t} />
        </nav>

        <div className="hidden justify-end md:flex md:w-[130px]">
          <LanguageSwitch locale={locale} t={t} />
        </div>

        <MobileMenu locale={locale} t={t} />
      </div>
    </header>
  );
}
