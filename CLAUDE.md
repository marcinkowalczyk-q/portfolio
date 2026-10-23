@AGENTS.md

# Portfolio — Marcin Kowalczyk

Refactor of the existing Webflow portfolio (`https://portfolio-marcin-kowalczyk.webflow.io`) into a clean, modern Next.js codebase. Visual look stays close to the original; the goal is a tidy base to iterate the new design on top of.

## Stack

- **Next.js 16.2.4** (App Router, React 19, Turbopack build) — note: scaffolded as the latest, but App Router conventions match Next 15
- **TypeScript** — `strict: true`
- **Tailwind CSS v4** — config lives in `src/app/globals.css` via the `@theme` directive (no `tailwind.config.ts` in v4)
- **next/font** — Inter Tight (single family used by Webflow source)
- **next/image** — all images, with `remotePatterns` for `cdn.prod.website-files.com`
- ESLint (next defaults), no test setup yet
- Deploy target: Vercel (zero config)

## Folder structure

```
src/
├── app/                       # App Router pages
│   ├── layout.tsx             # root layout, font, default metadata
│   ├── page.tsx               # home: nav + hero + work + footer
│   ├── globals.css            # Tailwind import + design tokens (@theme)
│   ├── about/page.tsx
│   └── banner-configurator/page.tsx
├── components/
│   ├── layout/                # nav.tsx, footer.tsx
│   ├── hero/                  # hero.tsx
│   ├── work/                  # work-list.tsx, project-card.tsx
│   ├── about/                 # about-content.tsx
│   └── case-study/            # case-study-header / -section / -figure
└── lib/
    ├── projects.ts            # homepage project list (data)
    └── case-studies.ts        # case study content (Banner)
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

## Design tokens (extracted from Webflow CSS)

| Token | Value | Use |
|---|---|---|
| `--color-bg` | `#ffffff` | Page background |
| `--color-fg` | `#151515` | Headings, strong text |
| `--color-fg-muted` | `#707070` | Body copy |
| `--color-fg-subtle` | `#838383` | Tertiary text |
| `--color-border` | `#dbdbdb` | Dividers |
| `--color-surface` | `#fafafa` | Subtle surfaces |
| `--color-surface-2` | `#f3f3f3` | Image backdrops |

## Improvements over Webflow source

- One `<h1>` per page (Banner case study had two in the original)
- Descriptive `alt` text on all images (originals had none)
- Semantic landmarks: `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`
- External links carry `rel="noopener noreferrer"` and `aria-label` indicating new tab
- Visible focus ring (`:focus-visible`) on all interactive elements
- Metadata API: title template, description, OG/Twitter tags
- `next/font` for Inter Tight (no extra `<link>` request to Google)
- `next/image` for everything (auto srcset / lazy loading)

## Status

### Done
- Project scaffolded (Next.js 16, Tailwind v4, TS strict)
- Design tokens in `globals.css`
- Inter Tight via `next/font`
- Homepage: nav, hero, work list, two project cards, footer
- About page with portrait + bio + LinkedIn
- Banner Configurator case study (15 sections, 11 figures)
- Metadata + OG tags on every route
- `next.config.ts` with `remotePatterns` for Webflow CDN
- Production build passes (3 static routes)

### In progress
- Awaiting first manual review (`npm run dev`) before iterating

### Next
- Run dev server, verify look-and-feel, capture issues
- Replace remote Webflow CDN images with local files in `public/` (user will do this)
- Consider: dedicated case study route for `panel-e-doreczenia` once content is ready
- Consider: redirect from the old Webflow URL `/baner-configurator` → `/banner-configurator`
- Lighthouse pass (target: 90+ across all metrics)

## Common commands

```bash
npm run dev      # local dev (http://localhost:3000)
npm run build    # production build
npm run start    # serve the production build
npm run lint     # eslint
npx tsc --noEmit # typecheck only
```
