import type { T } from "@/i18n";
import { siteConfig } from "@/lib/site";

type Props = { t: T };

export default function Footer({ t }: Props) {
  return (
    <footer className="mt-auto border-t border-[var(--color-border)] bg-[var(--color-surface-footer)]">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-6 py-6 md:px-10">
        <p className="text-sm text-[var(--color-fg-muted)]">Marcin Kowalczyk</p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <a
            href={siteConfig.footer.repoUrl}
            className="text-[13px] text-[var(--color-fg-muted)] underline underline-offset-2 hover:text-[var(--color-fg)]"
          >
            {t["footer.credit"]}
          </a>
          <p className="text-[13px] text-[var(--color-fg-subtle)]">{t["footer.copy"]}</p>
        </div>
      </div>
    </footer>
  );
}
