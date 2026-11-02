@AGENTS.md

# Portfolio — Marcin Kowalczyk

Refactor of the existing Webflow portfolio (`https://portfolio-marcin-kowalczyk.webflow.io`) into a clean, modern Next.js codebase. Visual look stays close to the original; the goal is a tidy base to iterate the new design on top of.

## Stack

- **Next.js 16.4.3** (App Router, React 19, Turbopack build) — note: scaffolded as the latest, but App Router conventions match Next 15
- **TypeScript** — `strict: true`
- **Tailwind CSS v4** — config lives in `src/app/globals.css` via the `@theme` directive (no `tailwind.config.ts` in v4)
- **next/font** — Inter (body) + Bitter (headings), both variable
- **next/image** — all images, served from `public/`
- ESLint (next defaults), no test setup yet
- Deploy target: Vercel (zero config)

## Folder structure

```
src/
├── app/                       # App Router pages
│   ├── layout.tsx             # root layout, font, default metadata
│   ├── page.tsx               # home: nav + hero + work + footer
│   ├── globals.css            # Tailwind import + design tokens (@theme)
│   ├── about/page.tsx         # from content/{locale}/about.mdx
│   ├── banner-configurator/page.tsx
│   └── e-doreczenia/page.tsx  # both case studies render via CaseStudyPage
├── components/
│   ├── ui/                    # container, eyebrow, link-button, text-link, icon, divider
│   ├── layout/                # skip-link, site-header, nav-links, mobile-menu, language-switch, site-footer
│   ├── hero/                  # hero.tsx
│   ├── work/                  # project-list.tsx, project-card.tsx
│   ├── about/                 # about-content.tsx
│   └── case-study/            # case-study-page, header, meta-list, intro-row, section, figure, figure-group, lightbox, mdx-components
└── lib/
    ├── content.ts             # MDX frontmatter loader (content/{locale}/*.mdx)
    ├── mdx.ts                 # compiles MDX bodies (next-mdx-remote, RSC): case studies + prose
    ├── remark-case-study.ts   # markdown → IntroRow / CaseStudySection / FigureGroup
    ├── image-size.ts          # intrinsic image size from public/
    └── site.ts                # email, LinkedIn URL, pageMetadata
```

Route is `/banner-configurator`. The old Webflow URL was `/baner-configurator` (one `n`); add a redirect if the old URL needs to keep working.

## Conventions

- Function components, **default export**, no `React.FC`
- Files in **kebab-case** (`project-card.tsx`)
- **Path alias `@/*` → `./src/*`**
- Feature-based folders, not type-based
- **No inline styles**, no Webflow classes (`.w-container`, `.w-row`, etc.)
- Mobile-first responsive (`md`, `lg`, `xl` breakpoints from Tailwind defaults)
- Page content lives in `src/lib/*.ts` as typed data — components stay presentational
- Tokens in `globals.css` `@theme`: colors `--color-*`, fonts `--font-*`. Use them via `var(--color-fg)` etc.

## Git

- Commit directly to the current branch unless I ask for a new one.

## Design system

See **DESIGN.md**: typography scale, colours (WCAG 2.2 AA audited), spacing, layout, components and the base component list. Tokens live in `src/app/globals.css` `@theme`; DESIGN.md is their source of truth.

## Improvements over Webflow source

- One `<h1>` per page (Banner case study had two in the original)
- Descriptive `alt` text on all images (originals had none)
- Semantic landmarks: `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`
- External links carry `rel="noopener noreferrer"` and `aria-label` indicating new tab
- Visible focus ring (`:focus-visible`) on all interactive elements
- Metadata API: title template, description, OG/Twitter tags
- `next/font` for Inter + Bitter (no extra `<link>` request to Google)
- `next/image` for everything (auto srcset / lazy loading)

## Status

### Done
- Project scaffolded (Next.js 16, Tailwind v4, TS strict)
- Design tokens in `globals.css`
- Inter + Bitter via `next/font`
- Homepage: nav, hero, work list, two project cards, footer
- About page from `content/{pl,en}/about.mdx` (portrait exported from Figma)
- e-Doręczenia case study (`/[locale]/e-doreczenia`) with Axure prototype links
- Case study template (DESIGN.md components 16–22, 24) rendered from MDX
- Banner Configurator case study from `content/{pl,en}/banner-configurator.mdx`, images exported from Figma at 2x into `public/images/banner-configurator/`
- Metadata on every route via `pageMetadata()` in `src/lib/site.ts`: localized title/description, canonical, hreflang (pl/en/x-default), OG + Twitter tags
- Generated OG cards per route and locale (`opengraph-image.tsx`, shared renderer `src/lib/og-image.tsx`, fonts from `@fontsource`), MK monogram favicon (`icon.tsx`, `apple-icon.tsx`, `favicon.ico`)
- `sitemap.xml` + `robots.txt`; site URL from `VERCEL_PROJECT_PRODUCTION_URL` (localhost fallback)
- Day 3 QA: axe 0 violations on all 10 URLs (desktop + mobile); Lighthouse 100 on a11y / best practices / SEO; performance 100 except case study mobile ~91 (webfont preload)
- `npm audit`: 0 vulnerabilities (Next 16.2.4 → 16.4.3)
- Production build passes (4 routes × 2 locales + OG images, all static)

### In progress
- Day 3 part 1 (QA + launch prep) awaiting review; manual keyboard / VoiceOver pass pending

### Next
- Run dev server, verify look-and-feel, capture issues
- e-Doręczenia dependency diagram: re-export once the "daję" → "daje" typo fix is in Figma
- Custom domain: set it in Vercel; metadata, sitemap and OG URLs follow automatically

## Common commands

```bash
npm run dev      # local dev (http://localhost:3000)
npm run build    # production build
npm run start    # serve the production build
npm run lint     # eslint
npx tsc --noEmit # typecheck only
```
