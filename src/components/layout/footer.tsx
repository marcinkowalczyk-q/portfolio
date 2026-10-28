import type { T } from "@/i18n";
import { siteConfig } from "@/lib/site";

type Props = { t: T };

export default function Footer({ t }: Props) {
  return (
    <footer className="mt-auto border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 px-6 py-6 md:px-10">
        <p className="font-serif text-sm leading-[normal] font-semibold tracking-[-0.01em] text-[var(--color-fg-secondary)]">
          Marcin Kowalczyk
        </p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <a
            href={siteConfig.footer.repoUrl}
            className="text-small text-[var(--color-fg-secondary)] underline underline-offset-2 hover:text-[var(--color-fg)]"
          >
            {t["footer.credit"]}
          </a>
          <p className="text-small text-[var(--color-fg-tertiary)]">{t["footer.copy"]}</p>
        </div>
      </div>
    </footer>
  );
}
