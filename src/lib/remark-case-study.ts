import type { Heading, Image, Paragraph, Root, RootContent } from "mdast";
import type { MdxJsxAttribute, MdxJsxFlowElement } from "mdast-util-mdx-jsx";

// Shapes a case study body so the MDX files stay plain markdown:
// - `## X` blocks before the first `---`   → <IntroRow label="X"> inside <IntroRowList>
// - every later `## X` block               → <CaseStudySection heading="X">
// - a paragraph that holds only images     → <FigureGroup> of <Figure>s (1 = single, 2+ = pair)
// - `### X` + text + one image paragraph   → <FigureGroup variant="row"> (image beside text)
// - a `**Label**` paragraph + one image     → <Figure label="Label">; consecutive ones form a pair
// - an explicit <FigureGroup variant="…">  → its images become <Figure>s sized for that variant
// `---` stays a thematic break and renders as a divider.

// Rendered widths per layout, for next/image `sizes`
const SIZES = {
  single: ["(min-width: 768px) 790px, 100vw"],
  pair: ["(min-width: 768px) 474px, 100vw"],
  row: ["(min-width: 1024px) 500px, 100vw"],
  panel: ["(min-width: 768px) 726px, 100vw"],
  // Desktop screenshot, then the phone laid over it
  overlay: ["(min-width: 768px) 644px, 82vw", "(min-width: 768px) 299px, 38vw"],
} as const;

type Variant = keyof typeof SIZES;

function sizesFor(variant: Variant, index: number): string {
  const list: readonly string[] = SIZES[variant];
  return list[Math.min(index, list.length - 1)];
}

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

function imagesOnly(node: RootContent | undefined): Image[] | null {
  if (!node || node.type !== "paragraph") return null;
  const kids = (node as Paragraph).children.filter((c) => !(c.type === "text" && c.value.trim() === ""));
  if (kids.length === 0 || !kids.every((c) => c.type === "image")) return null;
  return kids as Image[];
}

function figure(image: Image, variant: Variant, index = 0, label?: string): MdxJsxFlowElement {
  return jsx(
    "Figure",
    { src: image.url, alt: image.alt ?? "", caption: image.title ?? undefined, label, sizes: sizesFor(variant, index) },
    []
  );
}

// A paragraph that is only bold text, e.g. **mObywatel**
function labelText(node: RootContent | undefined): string | null {
  if (!node || node.type !== "paragraph") return null;
  const kids = (node as Paragraph).children;
  return kids.length === 1 && kids[0].type === "strong" ? toText(kids[0]) : null;
}

function isFigureGroup(node: RootContent): node is MdxJsxFlowElement {
  return node.type === "mdxJsxFlowElement" && (node as MdxJsxFlowElement).name === "FigureGroup";
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

    if (isFigureGroup(node)) {
      const variantAttr = node.attributes.find((a) => a.type === "mdxJsxAttribute" && a.name === "variant");
      const variant = (typeof variantAttr?.value === "string" ? variantAttr.value : "single") as Variant;
      const imgs = (node.children as RootContent[]).flatMap((child) => imagesOnly(child) ?? []);
      node.children = imgs.map((img, index) => figure(img, variant, index)) as MdxJsxFlowElement["children"];
      out.push(node);
      continue;
    }

    if (labelText(node) !== null && imagesOnly(nodes[i + 1])?.length === 1) {
      const labelled: MdxJsxFlowElement[] = [];
      while (labelText(nodes[i]) !== null && imagesOnly(nodes[i + 1])?.length === 1) {
        labelled.push(figure(imagesOnly(nodes[i + 1])![0], "pair", 0, labelText(nodes[i])!));
        i += 2;
      }
      i--;
      out.push(jsx("FigureGroup", { variant: labelled.length > 1 ? "pair" : "single" }, labelled));
      continue;
    }

    const images = imagesOnly(node);
    if (images) {
      const variant: Variant = images.length > 1 ? "pair" : "single";
      out.push(jsx("FigureGroup", { variant }, images.map((img, index) => figure(img, variant, index))));
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
