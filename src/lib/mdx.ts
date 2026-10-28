import { compileMDX } from "next-mdx-remote/rsc";
import type { MDXComponents } from "mdx/types";
import type { T } from "@/i18n";
import getMdxComponents from "@/components/case-study/mdx-components";
import remarkCaseStudy from "./remark-case-study";

// Compiles an MDX body (frontmatter already stripped by gray-matter) to React. Server only.
async function renderMdx(source: string, components: MDXComponents, caseStudy: boolean) {
  const { content } = await compileMDX({
    source,
    components,
    options: { mdxOptions: { remarkPlugins: caseStudy ? [remarkCaseStudy] : [] } },
  });
  return content;
}

// Case study body: shaped into intro rows, sections and figure groups
export function renderCaseStudyBody(source: string, t: T) {
  return renderMdx(source, getMdxComponents(t), true);
}

// Plain prose (About, Accessibility statement); `overrides` adjusts per-page spacing
export function renderProse(source: string, t: T, overrides: MDXComponents = {}) {
  return renderMdx(source, { ...getMdxComponents(t), ...overrides }, false);
}
