import { compileMDX } from "next-mdx-remote/rsc";
import type { T } from "@/i18n";
import getMdxComponents from "@/components/case-study/mdx-components";
import remarkCaseStudy from "./remark-case-study";

// Compiles a case study body (frontmatter already stripped by gray-matter) to React. Server only.
export async function renderCaseStudyBody(source: string, t: T) {
  const { content } = await compileMDX({
    source,
    components: getMdxComponents(t),
    options: { mdxOptions: { remarkPlugins: [remarkCaseStudy] } },
  });
  return content;
}
