"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import type { Locale, T } from "@/i18n";
import Icon from "@/components/ui/icon";
import NavLinks from "./nav-links";
import LanguageSwitch from "./language-switch";

type Props = { locale: Locale; t: T };

const MENU_ID = "mobile-menu";

// Below md: a "Menu" button that opens the nav links + language switch in a panel
// under the header. Focus is kept inside while open; Esc closes and returns focus.
export default function MobileMenu({ locale, t }: Props) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const close = useCallback((returnFocus: boolean) => {
    setOpen(false);
    if (returnFocus) buttonRef.current?.focus();
  }, []);

  // Route change (incl. the language switch) closes the menu
  const [openedOn, setOpenedOn] = useState(pathname);
  if (pathname !== openedOn) {
    setOpenedOn(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const button = buttonRef.current;
    if (!panel || !button) return;

    panel.querySelector<HTMLElement>("a")?.focus();
    // No background scroll while the panel covers the page
    document.documentElement.classList.add("overflow-hidden");

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close(true);
        return;
      }
      if (event.key !== "Tab") return;
      // Cycle through the button + menu links only
      const items = [button, ...panel.querySelectorAll<HTMLElement>("a[href]")];
      const index = items.indexOf(document.activeElement as HTMLElement);
      const next = event.shiftKey ? index - 1 : index + 1;
      event.preventDefault();
      items[(next + items.length) % items.length].focus();
    };

    // Widening past md hides the button, so drop the open state with it
    const desktop = window.matchMedia("(min-width: 48rem)");
    const onDesktop = () => desktop.matches && close(false);

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onDesktop);
    return () => {
      document.documentElement.classList.remove("overflow-hidden");
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onDesktop);
    };
  }, [open, close]);

  return (
    <div className="md:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-label={t["nav.menu"]}
        aria-expanded={open}
        aria-controls={MENU_ID}
        onClick={() => setOpen((value) => !value)}
        className="-mr-2.5 inline-flex size-11 items-center justify-center rounded-md text-[var(--color-fg)] transition-opacity hover:opacity-70"
      >
        {/* Shape changes (three bars → ×), not just colour */}
        <Icon name={open ? "close" : "menu"} size={24} />
      </button>

      <div
        ref={panelRef}
        id={MENU_ID}
        hidden={!open}
        onClick={(event) => {
          // Any link click closes, including the link to the current page
          if ((event.target as Element).closest("a")) close(false);
        }}
        className="absolute inset-x-0 top-full z-40 h-dvh overflow-y-auto border-t border-[var(--color-border-subtle)] bg-[var(--color-bg)] px-6 pt-4 pb-8 motion-safe:animate-menu-in"
      >
        <nav aria-label={t["nav.label"]}>
          <NavLinks locale={locale} t={t} variant="menu" />
        </nav>
        <div className="mt-6 flex border-t border-[var(--color-border-subtle)] pt-6">
          <LanguageSwitch locale={locale} t={t} />
        </div>
      </div>
    </div>
  );
}
