"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale, T } from "@/i18n";

type Props = { locale: Locale; t: T };

export default function NavLinks({ locale, t }: Props) {
  const pathname = usePathname();
  const aboutHref = `/${locale}/about`;
  const isAbout = pathname.startsWith(aboutHref);
  // The accessibility statement (footer link) belongs to neither section
  const isWork = !isAbout && !pathname.startsWith(`/${locale}/accessibility`);

  // Work covers the homepage and the case studies; About is its own page
  const links = [
    { href: `/${locale}`, label: t["nav.work"], current: isWork },
    { href: aboutHref, label: t["nav.about"], current: isAbout },
  ];

  return (
    <ul className="flex items-center gap-8">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            aria-current={link.current ? "page" : undefined}
            className={[
              // after: extends the hit area to 44px without changing the nav height
              "relative inline-flex items-center after:absolute after:inset-x-0 after:-inset-y-[13px] font-serif text-nav text-[var(--color-fg)] decoration-1 underline-offset-[6px] transition-opacity hover:opacity-70",
              // Underline marks the current page, so the state isn't shown by colour alone
              link.current ? "underline" : "",
            ].join(" ")}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
