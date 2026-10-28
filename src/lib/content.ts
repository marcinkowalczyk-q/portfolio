import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Locale } from "@/i18n";

// Reads content/{locale}/{slug}.mdx. Server only (uses fs).

const CONTENT_DIR = path.join(process.cwd(), "content");

export type CaseStudyFrontmatter = {
  slug: string;
  locale: Locale;
  title: string;
  titleNote?: string;
  eyebrow: string;
  lede: string;
  heroImage: string;
  card: {
    category: string;
    summary: string;
    image: string;
  };
  meta: {
    year: string;
    role: string;
    scope?: string[];
    team: string;
    designSystem: string;
    status: string;
  };
  prototypes?: {
    desktop?: string;
    mobile?: string;
  };
};

export type CaseStudyCard = {
  slug: string;
  title: string;
  titleNote?: string;
  category: string;
  summary: string;
  image: string;
};

export type Entry<F> = { frontmatter: F; body: string };

export function getEntry<F = Record<string, unknown>>(
  locale: Locale,
  slug: string
): Entry<F> {
  const file = path.join(CONTENT_DIR, locale, `${slug}.mdx`);
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  return { frontmatter: data as F, body: content };
}

function assertFields(file: string, data: Record<string, unknown>, keys: string[]) {
  for (const key of keys) {
    const value = key
      .split(".")
      .reduce<unknown>((obj, k) => (obj as Record<string, unknown> | undefined)?.[k], data);
    if (value === undefined || value === "") {
      throw new Error(`content/${file}.mdx: missing frontmatter field "${key}"`);
    }
  }
}

export function getCaseStudy(locale: Locale, slug: string): Entry<CaseStudyFrontmatter> {
  const entry = getEntry<CaseStudyFrontmatter>(locale, slug);
  assertFields(`${locale}/${slug}`, entry.frontmatter, [
    "title",
    "eyebrow",
    "lede",
    "card.category",
    "card.summary",
    "card.image",
  ]);
  return entry;
}

export function getCaseStudyCard(locale: Locale, slug: string): CaseStudyCard {
  const { frontmatter: fm } = getCaseStudy(locale, slug);
  return {
    slug,
    title: fm.title,
    titleNote: fm.titleNote,
    category: fm.card.category,
    summary: fm.card.summary,
    image: fm.card.image,
  };
}
