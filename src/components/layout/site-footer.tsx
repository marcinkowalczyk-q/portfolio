import fs from "node:fs";
import path from "node:path";
import type { Locale, T } from "@/i18n";
import { siteConfig } from "@/lib/site";
import TextLink from "@/components/ui/text-link";

type Props = { locale: Locale; t: T };

// The CV link only shows once a PDF is dropped into public/cv/
function findCv(): { href: string; size: string } | null {
  const dir = path.join(process.cwd(), "public", "cv");
  if (!fs.existsSync(dir)) return null;
  const file = fs.readdirSync(dir).find((name) => name.toLowerCase().endsWith(".pdf"));
  if (!file) return null;
  const bytes = fs.statSync(path.join(dir, file)).size;
  const size = bytes >= 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.round(bytes / 1024)} KB`;
  return { href: `/cv/${encodeURIComponent(file)}`, size };
}

export default function SiteFooter({ locale, t }: Props) {
  const cv = findCv();
  const newTab = t["a11y.newTab"];

  return (
    <footer className="mt-auto border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="flex flex-col gap-6 px-6 py-6 md:px-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="font-serif text-sm leading-[normal] font-semibold tracking-[-0.01em] text-[var(--color-fg-secondary)]">
            Marcin Kowalczyk
          </p>
          <ul
            aria-label={t["footer.contactHeading"]}
            className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-[var(--color-fg-secondary)]"
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
            {cv && (
              <li>
                <TextLink href={cv.href} download icon="download">
                  {t["footer.cv"].replace("{size}", cv.size)}
                </TextLink>
              </li>
            )}
          </ul>
        </div>

        <div className="flex flex-col gap-3 border-t border-[var(--color-border-subtle)] pt-6 text-small text-[var(--color-fg-secondary)] md:flex-row md:items-center md:justify-between">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <li>
              <TextLink href={`/${locale}/about`}>{t["nav.about"]}</TextLink>
            </li>
            <li>
              <TextLink href={`/${locale}/accessibility`}>{t["footer.accessibility"]}</TextLink>
            </li>
          </ul>
          <p className="text-[var(--color-fg-tertiary)]">{t["footer.copy"]}</p>
        </div>
      </div>
    </footer>
  );
}
