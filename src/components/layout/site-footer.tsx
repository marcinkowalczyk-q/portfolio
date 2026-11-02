import type { T } from "@/i18n";
import { siteConfig } from "@/lib/site";
import TextLink from "@/components/ui/text-link";

type Props = { t: T };

// One row: name on the left; email, LinkedIn and © on the right.
// Below md: name and © share the first line, the contact links go underneath.
export default function SiteFooter({ t }: Props) {
  const newTab = t["a11y.newTab"];

  return (
    <footer className="mt-auto border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-3 px-6 py-6 md:flex md:justify-between md:px-10">
        <p className="font-serif text-sm leading-[normal] font-semibold tracking-[-0.01em] text-[var(--color-fg-secondary)]">
          Marcin Kowalczyk
        </p>
        <div className="contents md:flex md:flex-wrap md:items-center md:gap-x-6 md:gap-y-2">
          <ul
            aria-label={t["footer.contactHeading"]}
            className="col-span-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[var(--color-fg-secondary)]"
          >
            <li>
              <TextLink href={`mailto:${siteConfig.email}`} icon="mail">
                {siteConfig.email}
              </TextLink>
            </li>
            <li>
              <TextLink href={siteConfig.linkedinUrl} external newTabLabel={newTab} icon="linkedin">
                {t["footer.linkedin"]}
              </TextLink>
            </li>
          </ul>
          <p className="col-start-2 row-start-1 text-small text-[var(--color-fg-tertiary)]">{t["footer.copy"]}</p>
        </div>
      </div>
    </footer>
  );
}
