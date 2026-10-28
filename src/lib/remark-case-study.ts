import type { Heading, Image, Paragraph, Root, RootContent } from "mdast";
import type { MdxJsxAttribute, MdxJsxFlowElement } from "mdast-util-mdx-jsx";

// Shapes a case study body so the MDX files stay plain markdown:
// - `## X` blocks before the first `---`   → <IntroRow label="X"> inside <IntroRowList>
// - every later `## X` block               → <CaseStudySection heading="X">
// - a paragraph that holds only images     → <FigureGroup> of <Figure>s (1 = single, 2+ = pair)
// - `### X` + text + one image paragraph   → <FigureGroup variant="row"> (image beside text)
// `---` stays a thematic break and renders as a divider.

// Rendered widths per layout, for next/image `sizes`
const SIZES = {
  single: "(min-width: 768px) 790px, 100vw",
  pair: "(min-width: 768px) 474px, 100vw",
  row: "(min-width: 1024px) 500px, 100vw",
} as const;

type Variant = keyof typeof SIZES;

function attr(name: string, value: string): MdxJsxAttribute {
  return { type: "mdxJsxAttribute", name, value };
}

function jsx(name: string, attrs: Record<string, string | undefined>, children: RootContent[]): MdxJsxFlowElement {
  const attributes = Object.entries(attrs)
    .filter((entry): entry is [string, string] => entry[1] !== undefined)
    .map(([key, value]) => attr(key, value));
  return { type: "mdxJsxFlowElement", name, attributes, children: children as MdxJsxFlowElement["children"] };
}

function toText(node: { children?: unknown[]; value?: unknown }): string {
  if (typeof node.value === "string") return node.value;
  return (node.children ?? []).map((child) => toText(child as typeof node)).join("");
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/ł/g, "l")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function imagesOnly(node: RootContent): Image[] | null {
  if (node.type !== "paragraph") return null;
  const kids = (node as Paragraph).children.filter((c) => !(c.type === "text" && c.value.trim() === ""));
  if (kids.length === 0 || !kids.every((c) => c.type === "image")) return null;
  return kids as Image[];
}

function figure(image: Image, variant: Variant): MdxJsxFlowElement {
  return jsx("Figure", { src: image.url, alt: image.alt ?? "", caption: image.title ?? undefined, sizes: SIZES[variant] }, []);
}

function isHeading(node: RootContent, depth: number): node is Heading {
  return node.type === "heading" && (node as Heading).depth === depth;
}

function shapeSection(nodes: RootContent[]): RootContent[] {
  const out: RootContent[] = [];
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];

    if (isHeading(node, 3)) {
      let end = i + 1;
      while (end < nodes.length && !isHeading(nodes[end], 3)) end++;
      const block = nodes.slice(i, end);
      const imageNodes = block.filter((n) => imagesOnly(n));
      if (imageNodes.length === 1 && imagesOnly(imageNodes[0])!.length === 1) {
        const text = block.filter((n) => n !== imageNodes[0]);
        out.push(jsx("FigureGroup", { variant: "row" }, [figure(imagesOnly(imageNodes[0])![0], "row"), ...text]));
        i = end - 1;
        continue;
      }
    }

    const images = imagesOnly(node);
    if (images) {
      const variant: Variant = images.length > 1 ? "pair" : "single";
      out.push(jsx("FigureGroup", { variant }, images.map((img) => figure(img, variant))));
      continue;
    }

    out.push(node);
  }
  return out;
}

export default function remarkCaseStudy() {
  return (tree: Root) => {
    const out: RootContent[] = [];
    const intro: MdxJsxFlowElement[] = [];
    let seenBreak = false;
    let current: { heading: string; nodes: RootContent[] } | null = null;

    const close = () => {
      if (!current) return;
      if (seenBreak) {
        out.push(jsx("CaseStudySection", { heading: current.heading, id: slugify(current.heading) }, shapeSection(current.nodes)));
      } else {
        intro.push(jsx("IntroRow", { label: current.heading }, current.nodes));
      }
      current = null;
    };

    for (const node of tree.children) {
      if (node.type === "thematicBreak") {
        close();
        if (!seenBreak && intro.length > 0) out.push(jsx("IntroRowList", {}, intro));
        seenBreak = true;
        out.push(node);
      } else if (isHeading(node, 2)) {
        close();
        current = { heading: toText(node), nodes: [] };
      } else if (current) {
        current.nodes.push(node);
      } else {
        out.push(node);
      }
    }
    close();
    if (!seenBreak && intro.length > 0) out.push(jsx("IntroRowList", {}, intro));

    tree.children = out as Root["children"];
  };
}
