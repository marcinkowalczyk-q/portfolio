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
    <header className="w-full border-b border-[var(--color-border-nav)] bg-[var(--color-bg)]">
      <nav
        aria-label="Primary"
        className="mx-auto grid max-w-[1180px] grid-cols-3 items-center px-6 py-5 md:px-0"
      >
        <Link
          href={`/${locale}`}
          className="font-serif text-sm text-[var(--color-fg-muted)]"
        >
          Marcin Kowalczyk
        </Link>

        <ul className="hidden items-center justify-center gap-8 text-sm md:flex">
          <li>
            <Link
              href={`/${locale}`}
              className="font-serif text-[var(--color-fg)] transition-opacity hover:opacity-70"
            >
              {t["nav.work"]}
            </Link>
          </li>
          <li>
            <Link
              href={`/${locale}/about`}
              className="font-serif text-[var(--color-fg)] transition-opacity hover:opacity-70"
            >
              {t["nav.about"]}
            </Link>
          </li>
        </ul>

        <div className="flex justify-end">
          <div
            className="flex items-center gap-0.5 rounded-[6px] bg-[var(--color-accent-toggle)] p-0.5"
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
                    "rounded-[4px] px-3 py-1 font-serif text-[12px] leading-[13px] transition-colors",
                    isActive
                      ? "bg-white text-[var(--color-fg-muted)]"
                      : "text-[var(--color-fg-subtle)]",
                  ].join(" ")}
                >
                  {lang === "pl" ? t["nav.langPl"] : t["nav.langEn"]}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </header>
  );
}
