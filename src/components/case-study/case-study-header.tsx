import Image from "next/image";
import type { T } from "@/i18n";
import type { CaseStudyFrontmatter } from "@/lib/content";
import { getImageSize } from "@/lib/image-size";
import Container from "@/components/ui/container";
import Eyebrow from "@/components/ui/eyebrow";
import TextLink from "@/components/ui/text-link";

type Props = { frontmatter: CaseStudyFrontmatter; t: T };

const TINTS: Record<string, string> = {
  "banner-configurator": "bg-[var(--color-project-configurator)]",
  "e-doreczenia": "bg-[var(--color-project-edelivery)]",
};

// Tinted header: eyebrow, h1, lede in a 460px column; device mockup bleeds off the right edge.
// The mockup export already carries the header tint, so it sits flush with the bottom edge.
export default function CaseStudyHeader({ frontmatter: fm, t }: Props) {
  if (!fm.heroAlt?.trim()) throw new Error(`content/${fm.locale}/${fm.slug}.mdx: missing "heroAlt"`);

  const prototypes = Object.entries(fm.prototypes ?? {}).filter(
    (entry): entry is ["desktop" | "mobile", string] => Boolean(entry[1])
  );

  return (
    <header className={`relative overflow-hidden ${TINTS[fm.slug] ?? "bg-[var(--color-surface)]"}`}>
      <Container size="content" className="pt-12 lg:flex lg:min-h-[463px] lg:items-center lg:pt-0">
        <div className="max-w-[460px]">
          <Eyebrow>{fm.eyebrow}</Eyebrow>
          <h1 className="mt-2 text-h1-sm text-[var(--color-fg)] md:text-h1">
            {fm.title}
            {fm.titleNote && <span className="text-[var(--color-fg-secondary)]"> {fm.titleNote}</span>}
          </h1>
          <p className="mt-5 text-body text-[var(--color-fg-secondary)]">{fm.lede}</p>
          {prototypes.length > 0 && (
            <ul className="mt-6 flex flex-col gap-2 text-sm text-[var(--color-fg)]">
              {prototypes.map(([kind, href]) => (
                <li key={kind}>
                  <TextLink href={href} external newTabLabel={t["a11y.newTab"]}>
                    {t["cs.prototype"]}
                    {prototypes.length > 1 && ` (${t[`cs.prototype.${kind}`]})`}
                  </TextLink>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Container>
      <div className="mt-10 ml-auto w-[min(100%,560px)] lg:absolute lg:right-0 lg:bottom-0 lg:mt-0 lg:w-[49%] lg:max-w-[708px]">
        <Image
          src={fm.heroImage}
          alt={fm.heroAlt}
          {...getImageSize(fm.heroImage)}
          priority
          sizes="(min-width: 1024px) 708px, 560px"
          className="h-auto w-full"
        />
      </div>
    </header>
  );
}
