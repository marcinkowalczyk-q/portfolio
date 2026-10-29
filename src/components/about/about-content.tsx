import Image from "next/image";
import type { ReactNode } from "react";
import type { T } from "@/i18n";
import type { AboutFrontmatter } from "@/lib/content";
import { getImageSize } from "@/lib/image-size";
import Eyebrow from "@/components/ui/eyebrow";
import TextLink from "@/components/ui/text-link";

type Props = { frontmatter: AboutFrontmatter; t: T; children: ReactNode };

// Desktop: 380 × 475 portrait frame + 64px gap + 500px text. Mobile: text first, portrait below.
export default function AboutContent({ frontmatter: fm, t, children }: Props) {
  return (
    <section
      aria-labelledby="about-heading"
      className="flex flex-col gap-5 px-6 pt-12 pb-24 md:px-10 lg:flex-row lg:items-start lg:justify-center lg:gap-16 lg:py-28"
    >
      <div className="order-last flex aspect-[380/475] w-full items-center justify-center lg:order-first lg:w-[380px] lg:shrink-0">
        <Image
          src={fm.portrait}
          alt={fm.portraitAlt}
          {...getImageSize(fm.portrait)}
          sizes="315px"
          loading="eager"
          fetchPriority="high"
          className="h-auto w-[75%] lg:w-[83%]"
        />
      </div>

      <div className="lg:w-[500px]">
        <Eyebrow uppercase={false}>{t["about.eyebrow"]}</Eyebrow>
        <h1 id="about-heading" className="mt-3 text-h1-sm text-[var(--color-fg)] md:text-h1">
          {fm.title}
        </h1>
        <div className="mt-5">{children}</div>
        <p className="mt-9 text-sm font-medium text-[var(--color-fg)]">
          <TextLink href={fm.linkedinUrl} external newTabLabel={t["a11y.newTab"]} icon="linkedin">
            {t["about.linkedin"]}
          </TextLink>
        </p>
      </div>
    </section>
  );
}
