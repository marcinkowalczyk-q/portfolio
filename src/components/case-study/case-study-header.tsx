import { getImageProps } from "next/image";
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

// Desktop mockup box from Figma (EN desktop frames 2004:602, 2004:938), measured from the
// content container's left edge and the header's top edge (112px padding above the text).
// Anchored to the container, so the gap to the text column is the same at every width.
// minHeight is the Figma header height: it keeps the bottom crop when the text is shorter.
const MOCKUP_DESKTOP: Record<string, { className: string; minHeight: string; width: number }> = {
  "banner-configurator": {
    className: "lg:left-[417px] lg:-top-[83px] lg:w-[819px]",
    minHeight: "lg:min-h-[463px]",
    width: 819,
  },
  "e-doreczenia": {
    className: "lg:left-[539px] lg:-top-[82px] lg:w-[606px]",
    minHeight: "lg:min-h-[471px]",
    width: 606,
  },
};

// Tinted header: eyebrow, h1, lede in a 460px column, device mockup next to it.
// Below lg the mockup sits under the text, flush right; from lg it is placed inside the
// content container and the header crops whatever runs past its right or bottom edge.
export default function CaseStudyHeader({ frontmatter: fm, t }: Props) {
  if (!fm.heroAlt?.trim()) throw new Error(`content/${fm.locale}/${fm.slug}.mdx: missing "heroAlt"`);

  const prototypes = Object.entries(fm.prototypes ?? {}).filter(
    (entry): entry is ["desktop" | "mobile", string] => Boolean(entry[1])
  );

  const desktop = MOCKUP_DESKTOP[fm.slug];
  const desktopSrc = fm.heroImageDesktop ?? fm.heroImage;
  // Art direction: one <img>, the browser fetches only the source that matches the viewport
  const { props: desktopProps } = getImageProps({
    src: desktopSrc,
    alt: "",
    ...getImageSize(desktopSrc),
    sizes: `${desktop?.width ?? 708}px`,
  });
  const { props: mobileProps } = getImageProps({
    src: fm.heroImage,
    alt: fm.heroAlt,
    ...getImageSize(fm.heroImage),
    loading: "eager",
    fetchPriority: "high",
    sizes: "(min-width: 560px) 560px, 100vw",
  });

  return (
    <header
      className={`relative overflow-hidden ${desktop?.minHeight ?? ""} ${TINTS[fm.slug] ?? "bg-[var(--color-surface)]"}`}
    >
      <Container size="content" className="pt-12 lg:py-[112px]">
        <div className="relative">
          <div className="relative z-10 max-w-[460px]">
            {/* Figma lets a long eyebrow run past the 460px column on desktop */}
            <Eyebrow className="lg:whitespace-nowrap">{fm.eyebrow}</Eyebrow>
            <h1 className="mt-2 text-h1-sm text-[var(--color-fg)] md:text-h1">
              {fm.title}
              {/* Own line on mobile, as in Figma; never split at the hyphen */}
              {fm.titleNote && (
                <span className="block text-h2-sm whitespace-nowrap text-[var(--color-fg-tertiary)] md:inline">
                  {" "}
                  {fm.titleNote}
                </span>
              )}
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

          {/* Below lg: spans the gutters (full header width), mockup flush right up to 560px */}
          <div
            className={`mt-10 -mx-6 md:-mx-10 lg:absolute lg:m-0 ${desktop?.className ?? "lg:right-0 lg:w-[708px]"}`}
          >
            <picture className="ml-auto block max-w-[560px] lg:max-w-none">
              <source
                media="(min-width: 64rem)"
                srcSet={desktopProps.srcSet}
                sizes={desktopProps.sizes}
                width={desktopProps.width}
                height={desktopProps.height}
              />
              <img {...mobileProps} alt={fm.heroAlt} className="h-auto w-full" />
            </picture>
          </div>
        </div>
      </Container>
    </header>
  );
}
