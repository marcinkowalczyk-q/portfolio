import type { T } from "@/i18n";

type Props = { t: T };

export default function Footer({ t }: Props) {
  return (
    <footer className="mt-auto border-t border-[var(--color-border)] bg-[var(--color-surface-footer)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 md:px-10">
        <p className="text-sm text-[var(--color-fg-muted)]">Marcin Kowalczyk</p>
        <p className="text-[13px] text-[var(--color-fg-subtle)]">{t["footer.copy"]}</p>
      </div>
    </footer>
  );
}
