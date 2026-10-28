import type { ComponentProps } from "react";
import type { MDXComponents } from "mdx/types";
import type { T } from "@/i18n";
import Divider from "@/components/ui/divider";
import TextLink from "@/components/ui/text-link";
import CaseStudySection from "./case-study-section";
import Figure from "./figure";
import FigureGroup from "./figure-group";
import IntroRow, { IntroRowList } from "./intro-row";

// Markdown elements → design system. Structural tags (IntroRow, CaseStudySection,
// FigureGroup, Figure) are inserted by src/lib/remark-case-study.ts.
export default function getMdxComponents(t: T): MDXComponents {
  return {
    h3: (props) => <h3 className="mt-8 w-full max-w-text text-h3 text-[var(--color-fg)] first:mt-0" {...props} />,
    p: (props) => <p className="mt-3 w-full max-w-text text-body text-[var(--color-fg-secondary)] first:mt-0" {...props} />,
    ul: (props) => <ul className="mt-3 w-full max-w-text list-disc pl-6 text-body text-[var(--color-fg-secondary)]" {...props} />,
    strong: (props) => <strong className="font-semibold text-[var(--color-fg-primary)]" {...props} />,
    a: ({ href = "", children }) => (
      <TextLink href={href} external={/^https?:/.test(href)} newTabLabel={t["a11y.newTab"]}>
        {children}
      </TextLink>
    ),
    hr: () => (
      <div className="px-6 md:px-10">
        <Divider width="section" className="mx-auto" />
      </div>
    ),
    img: ({ src, alt, title }) => (
      <Figure src={String(src)} alt={alt ?? ""} caption={title ?? undefined} enlargeLabel={t["lightbox.enlarge"]} />
    ),
    Figure: (props: Omit<ComponentProps<typeof Figure>, "enlargeLabel">) => (
      <Figure {...props} enlargeLabel={t["lightbox.enlarge"]} />
    ),
    FigureGroup,
    IntroRow,
    IntroRowList,
    CaseStudySection: (props: Omit<ComponentProps<typeof CaseStudySection>, "t">) => (
      <CaseStudySection {...props} t={t} />
    ),
  };
}
