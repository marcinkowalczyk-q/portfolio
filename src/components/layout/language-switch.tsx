"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale, type T } from "@/i18n";

type Props = { locale: Locale; t: T };

const NAMES: Record<Locale, string> = { pl: "Polski", en: "English" };

export default function LanguageSwitch({ locale, t }: Props) {
  const pathname = usePathname();

  // Same page in the other locale
  function hrefFor(target: Locale) {
    return pathname.replace(new RegExp(`^/${locale}(?=/|$)`), `/${target}`);
  }

  return (
    <div
      role="group"
      aria-label={t["nav.langLabel"]}
      className="flex items-center gap-0.5 rounded-[6px] bg-[var(--color-surface-toggle)] p-0.5"
    >
      {[...locales].reverse().map((lang) => {
        const isActive = locale === lang;
        const label = lang === "pl" ? t["nav.langPl"] : t["nav.langEn"];
        return (
          <Link
            key={lang}
            href={hrefFor(lang)}
            hrefLang={lang}
            lang={lang}
            // Accessible name starts with the visible label (WCAG 2.5.3)
            aria-label={`${label}, ${NAMES[lang]}`}
            aria-current={isActive ? "true" : undefined}
            className={[
              "w-[60px] rounded-[4px] px-3 py-1 text-center font-serif text-[14px] leading-[16px] tracking-[-0.01em] transition-colors",
              // Active segment is a raised white chip with a shadow, not just a colour change
              isActive
                ? "bg-[var(--color-bg)] text-[var(--color-fg-primary)] shadow-[0_1px_2px_rgba(21,21,21,0.12)]"
                : "text-[var(--color-fg-tertiary)] hover:text-[var(--color-fg)]",
            ].join(" ")}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}
