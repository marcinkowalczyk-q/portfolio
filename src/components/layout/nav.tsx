"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale, T } from "@/i18n";

type Props = { locale: Locale; t: T };

export default function Nav({ locale, t }: Props) {
  const pathname = usePathname();

  function switchLocalePath(target: Locale) {
    return pathname.replace(`/${locale}`, `/${target}`);
  }

  return (
    <header className="w-full border-b border-[var(--color-border-subtle)] bg-[var(--color-bg)]">
      {/* No hamburger (DESIGN.md 5.8): on narrow screens links + toggle wrap to a second row */}
      <nav
        aria-label="Primary"
        className="flex flex-wrap items-center justify-between gap-y-3 px-6 py-4 md:px-10 md:py-5"
      >
        <Link
          href={`/${locale}`}
          className="font-serif text-sm leading-[normal] font-semibold tracking-[-0.01em] text-[var(--color-fg)]"
        >
          Marcin Kowalczyk
        </Link>

        <div className="flex w-full items-center justify-between md:contents">
          <ul className="flex items-center gap-8">
            <li>
              <Link
                href={`/${locale}`}
                className="font-serif text-nav text-[var(--color-fg)] transition-opacity hover:opacity-70"
              >
                {t["nav.work"]}
              </Link>
            </li>
            <li>
              <Link
                href={`/${locale}/about`}
                className="font-serif text-nav text-[var(--color-fg)] transition-opacity hover:opacity-70"
              >
                {t["nav.about"]}
              </Link>
            </li>
          </ul>

          <div className="flex justify-end md:w-[130px]">
            <div
              className="flex items-center gap-0.5 rounded-[6px] bg-[var(--color-surface-toggle)] p-0.5"
              role="group"
              aria-label="Language switch"
            >
              {(["pl", "en"] as Locale[]).map((lang) => {
                const isActive = locale === lang;
                return (
                  <Link
                    key={lang}
                    href={switchLocalePath(lang)}
                    aria-current={isActive ? "true" : undefined}
                    className={[
                      "w-[60px] rounded-[4px] px-3 py-1 text-center font-serif text-[14px] leading-[16px] tracking-[-0.01em] transition-colors",
                      isActive
                        ? "bg-[var(--color-bg)] text-[var(--color-fg-primary)]"
                        : "text-[var(--color-fg-tertiary)]",
                    ].join(" ")}
                  >
                    {lang === "pl" ? t["nav.langPl"] : t["nav.langEn"]}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
