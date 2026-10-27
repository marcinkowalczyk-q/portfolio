# DESIGN.md

The visual system for the portfolio. It **refines** the current Figma style (`design/figma-tokens.md`) and is not a redesign: same fonts, colours, spacing and layout, with accessibility fixes and a few structural changes (see [Changes from Figma](#changes-from-figma)).

Tokens live in `src/app/globals.css` (`@theme`). This file is the source of truth for them. If they disagree, update this file first.

---

## 1. Typography

**Families** (loaded with `next/font/google`, both variable, `latin` + `latin-ext` for Polish):

| Token | Family | Use |
|---|---|---|
| `--font-serif` | Bitter (500 Medium, 600 SemiBold) | Headings, name, nav, labels |
| `--font-sans` | Inter (300 Light, 400 Regular, 500 Medium, 600 SemiBold, 700 Bold) | Body, UI, eyebrows, captions |

Kadwa and Inter Tight are removed. The few Kadwa layers in Figma were accidental (see `design/figma-tokens.md`).

**Scale.** Mobile first: the `-sm` step applies below `md` (768px) and the base step from `md` up.

| Token (`text-*`) | Size / line height | Tracking | Family · weight | Use |
|---|---|---|---|---|
| `display` | 64 / 1.05 | −1% | serif 500 | Hero name (desktop) |
| `display-sm` | 48 / 1.2 | −1% | serif 500 | Hero name (mobile) |
| `h1` | 40 / 1.2 | −1% | serif 500 | Page / case study title, project card title |
| `h1-sm` | 32 / 1.25 | −1% | serif 500 | Same, mobile |
| `h2` | 32 / 1.5 | −1% | serif 500 | Case study section heading |
| `h2-sm` | 24 / 1.5 | −1% | serif 500 | Same, mobile |
| `h3` | 20 / 1.4 | −1% | serif 500 | Sub-section (e.g. "Banner list") |
| `label-lg` | 18 / 1.67 | −1% | serif 500 | Intro row label (Context, Challenge…) |
| `label` | 16 / 1.875 | −1% | serif 500 | Meta label (Year, Role…) |
| `label-sm` | 14 / 1.7 | −1% | serif 500 | Meta label, mobile |
| `lede` | 24 / 1.5 | 0 | sans 300 | Hero intro |
| `lede-sm` | 18 / 1.5 | 0 | sans 300 | Hero intro, mobile |
| `body` | 16 / 1.6 | 0 | sans 400 | Paragraphs, card summary, meta value |
| `body-sm` | 14 / 1.6 | 0 | sans 400 | Meta value (mobile), captions |
| `nav` | 14 / 1.3 | −1% | serif 500 | Nav links |
| `eyebrow` | 12 / 1.5 | +20%, uppercase | sans 400 | Eyebrows, card category |
| `small` | 13 / 1.5 | 0 | sans 400 | Footer meta |

Rules:
- One `h1` per page. Case study sections are `h2`, sub-sections `h3`.
- Hero name: Figma had 64 (EN) and 72 (PL). This system uses **64** for both, because the shorter hero needs it.
- Eyebrows are stored in normal case in content and uppercased in CSS, so screen readers don't spell them out.
- Body text measure is no wider than `--container-text` (740px ≈ 80 characters).

---

## 2. Colour

### Palette

| Token | Value | Use | Changed? |
|---|---|---|---|
| `--color-bg` | `#ffffff` | Page background | — |
| `--color-fg` | `#151515` | Strongest text, nav, CTA label, focus ring | — |
| `--color-fg-primary` | `#202226` | Headings | — |
| `--color-fg-secondary` | `#4b5160` | Body copy | — |
| `--color-fg-tertiary` | `#60687a` | Meta, captions, inactive toggle, footer © | **was `#80889b`** (contrast) |
| `--color-border` | `#dbdbdb` | Image frames, footer top border | — |
| `--color-border-subtle` | `#e5e9f2` | Nav bottom border | merged `rgba(203,211,228,.5)` and `#e4e7f0` |
| `--color-divider` | `#cbd3e4` | Section dividers, meta card border | merged `#c3c7d2` (hero divider) |
| `--color-control-border` | `#80889b` | CTA / button outline | **was `rgba(128,136,155,.8)`** (non-text contrast) |
| `--color-surface` | `#fafbfd` | Featured card, footer, How I work strip | merged `#fafbfd`, `rgba(166,180,215,.06)`, `rgba(237,240,247,.3)` (identical once composited) |
| `--color-surface-muted` | `#f6f8fa` | Diagram panel, browser-frame toolbar | — |
| `--color-surface-toggle` | `#f2f4f9` | Language toggle track | solid version of `rgba(166,180,215,.15)` |
| `--color-project-configurator` | `#e2e8ed` | Configurator case study header | — |
| `--color-project-edelivery` | `#f2f9ff` | e-Delivery case study header | — |

Semi-transparent fills are replaced by their solid composite on white, so contrast can be measured and stays the same over any background.

### Contrast audit (WCAG 2.2 AA)

Thresholds: **4.5:1** for normal text, **3:1** for large text (≥ 24px regular or ≥ 18.66px bold) and for UI component boundaries (1.4.11). Ratios were computed with the WCAG relative-luminance formula, with alpha fills composited on white.

**Text colours vs every background in the file**

| Text | white `#fff` | card `#fafbfd` | footer `#fafafd` | toggle `#f2f4f9` | Configurator header `#e2e8ed` | e-Delivery header `#f2f9ff` | diagram `#f6f8fa` |
|---|---|---|---|---|---|---|---|
| `#151515` fg | 18.26 ✅ | 17.64 ✅ | 17.57 ✅ | 16.56 ✅ | 14.78 ✅ | 17.19 ✅ | 17.15 ✅ |
| `#202226` fg/primary | 15.93 ✅ | 15.39 ✅ | 15.32 ✅ | 14.44 ✅ | 12.90 ✅ | 15.00 ✅ | 14.96 ✅ |
| `#4b5160` fg/secondary | 7.94 ✅ | 7.67 ✅ | 7.64 ✅ | 7.20 ✅ | 6.43 ✅ | 7.47 ✅ | 7.46 ✅ |
| `#707070` title suffix (24px, large) | 4.95 ✅ | 4.78 ✅ | 4.76 ✅ | 4.49 ✅ | 4.01 ✅ | 4.66 ✅ | 4.65 ✅ |
| **`#80889b` fg/tertiary** | **3.55 ❌** | **3.43 ❌** | **3.42 ❌** | **3.22 ❌** | **2.87 ❌** | **3.34 ❌** | **3.34 ❌** |
| **`#838383` old code `fg-subtle`** | **3.79 ❌** | **3.66 ❌** | **3.65 ❌** | **3.44 ❌** | **3.07 ❌** | **3.57 ❌** | **3.56 ❌** |
| `#60687a` **new fg-tertiary** | 5.59 ✅ | 5.40 ✅ | 5.37 ✅ | 5.07 ✅ | 4.52 ✅ | 5.26 ✅ | 5.25 ✅ |

**Failing pairs actually in the design**

| Element | Pair | Ratio | Needs | Fix |
|---|---|---|---|---|
| Inactive language toggle ("PL"), 12px | `#80889b` on toggle `#f2f4f9` | 3.22 | 4.5 | `#60687a` → **5.07** |
| Footer "© 2026", 13px | `#80889b` on footer `#fafafd` | 3.42 | 4.5 | `#60687a` → **5.37** |
| Any tertiary text on white (meta, captions) | `#80889b` on `#fff` | 3.55 | 4.5 | `#60687a` → **5.59** |
| Legacy `--color-fg-subtle` in code | `#838383` on `#fff` | 3.79 | 4.5 | replaced by `#60687a` → **5.59** |
| CTA button outline | `rgba(128,136,155,.8)` = `#99a0af` on card `#fafbfd` | 2.54 | 3.0 | `#80889b` solid → **3.43** (3.55 on white) |
| CTA button outline (PL variant) | `rgba(128,136,155,.5)` = `#c0c3cd` on white | 1.76 | 3.0 | same, `#80889b` |

`#60687a` is the closest darker step of `#80889b` (same hue and saturation, lower lightness) that passes 4.5:1 on **every** background in the system, including the darkest one (Configurator header `#e2e8ed`, 4.52). One value, no per-background exceptions.

**Non-text elements.** These are decorative, so 1.4.11 doesn't apply, and they are kept as they are:

| Element | Colour | vs white | Note |
|---|---|---|---|
| Dividers | `#cbd3e4` | 1.50 | Decorative; sections are also separated by headings and spacing |
| Hero divider (old) | `#c3c7d2` | 1.69 | Merged into `--color-divider` |
| Border / image frame | `#dbdbdb` | 1.38 | Decorative; the image content defines the boundary |
| Nav border | `#e5e9f2` | 1.22 | Decorative |
| Focus ring | `#151515` | 18.26 | ✅ well above 3:1 on all backgrounds |

---

## 3. Spacing and layout

**Spacing** uses Tailwind's 4px base (`--spacing: 0.25rem`). The rhythm values from Figma:

| Use | Mobile | Desktop |
|---|---|---|
| Page gutter | 24px (`px-6`) | 40px (`px-10`) |
| Case study section gap | 80px | 90px (`gap-[90px]`, or the `--spacing-section` token) |
| Hero vertical padding | 64px | 96px (**was 180px**, see Changes) |
| Project card vertical padding / gap | 96 / 48px | 96 / 48px |
| Heading → body | 16px | 16px |
| Paragraph gap | 12px | 12px |
| Text → figure | 32px | 32px |

**Containers** (`max-w-*`, centred):

| Token | Width | Use |
|---|---|---|
| `--container-text` | 740px | Prose, H2 sections, takeaways |
| `--container-figure` | 790px | Single figures |
| `--container-wide` | 980px | Figure pairs, 2×2 grids, image + text rows |
| `--container-content` | 1014px | Case study header, meta card |
| `--container-page` | 1140px | Intro rows (160px label + 48px gap + text), project cards |

**Breakpoints:** Tailwind defaults (`md` 768, `lg` 1024, `xl` 1280). Figma only defines 360 and 1440, so layouts switch from stacked to side-by-side at `md` and reach full width at `lg`.

**Radii:** `rounded-sm` 4px (toggle segment), `rounded-md` 6px (images, buttons, browser frame), `rounded-card` 12px (meta card).

---

## 4. Components (current style)

| Component | Spec |
|---|---|
| **Nav** | Brand (serif 600, 14/16px) on the left; links "Work / About" (`text-nav`, 32px gap); language toggle on the right (track `surface-toggle`, 2px padding, 6px radius; active segment white, `fg-secondary`; inactive `fg-tertiary`). 1px `border-subtle` bottom border. |
| **Hero** | Centred stack: eyebrow → name (`display`) → tagline (`body`, `fg-secondary`) → 268px divider (178px mobile) → lede (`lede`, max 680px). |
| **Project card** | Text column (eyebrow with bold number "01", `h1` title, `body` summary, CTA) + visual. Desktop: 460px text + 672px visual, sides alternate, first card on `surface`. Mobile: stacked, text first. |
| **CTA (secondary button)** | 1px `control-border`, 6px radius, 10/18px padding, Inter 500 14px, `fg`, arrow "→" as part of the label. |
| **Case study header** | Project-tinted background, eyebrow + `h1` + lede in a 460px column. Visual on the right (see Changes). |
| **Meta card** | 1px `divider` border, 12px radius, 12/16px padding; rows of label (112px, `label`) + value (`body`). Scope renders as a bullet list. |
| **Intro row** | Label (160px, `label-lg`) + text (752px). Stacks on mobile. |
| **Section** | `h2` + paragraphs (+ lists) + figure(s), inside `container-text`; figures widen to `container-figure` / `container-wide`. Dividers (`divider`, 740px) between topic groups. |
| **Figure** | Image + optional caption (`body-sm`, bold lead-in sentence allowed). |
| **Footer** | `surface` background. See Changes for the new content. |

---

## 5. Changes from Figma

### 5.1 Accessible contrast
All text tokens meet WCAG 2.2 AA (see the audit above). `fg-tertiary` → `#60687a`, CTA outline → solid `#80889b`.

### 5.2 Project visuals: browser frame instead of device mockups
- Tilted monitor, laptop and phone mockups are replaced by **flat screenshots in a minimal browser frame**: a 28px toolbar on `surface-muted` with three 8px dots in `divider`, an optional fake URL in `text-small fg-tertiary`, a 1px `border` frame and 6px radius.
- This applies to homepage project cards and case study headers. Inside case study bodies, figures stay frameless, except screenshots of full pages, which may use the frame.
- Frames are decorative (`aria-hidden`). The screenshot `<img>` carries the alt text.
- Assets to export: one flat 16:10 screenshot per project (`/images/projects/{slug}.png`), replacing `configurator.png` and `edor.png`.

### 5.3 Hero
- Lower height: 96px vertical padding on desktop, 64px on mobile (was 180 / 122–128).
- **No background illustration.** The hero sits on `bg`.

### 5.4 Homepage order
1. Hero → 2. **e-Delivery** (`02` becomes `01`) → 3. **Configurator** → 4. **How I work** → 5. Footer.
Card numbers follow the display order. The featured `surface` background goes on the first card.

### 5.5 "Jak pracuję / How I work" strip
- Placed before the footer, on `surface`, inside `container-page`.
- A section `h2` ("Jak pracuję" / "How I work"), then the points in a grid (1 column mobile, 2 at `md`, 4 at `lg`). Each point has a short title (`h3`) and one or two sentences of `body`.
- **4 points**, each a bold lead (rendered as the `h3`) followed by one sentence: Research and data · Collaboration · Accessibility · Implementation quality.
- Copy lives in `src/messages/{pl,en}.json` under `howIWork.*` (short UI strings, so not MDX).

### 5.6 Footer
Two rows inside `container-page`:
- **Contact:** email (shown as visible text + `mailto:` link), LinkedIn, **CV download** (PDF, `download` attribute, label states the file type and size, e.g. "CV (PDF, 120 KB)").
- **Meta:** "Designed and coded by Marcin Kowalczyk" + a link to the GitHub repo · **Accessibility statement** link · © year.
- External links carry `rel="noopener noreferrer"` and announce "opens in a new tab".
- Still to supply: the email address, the CV file, the GitHub repo URL (there's no git remote yet), and the accessibility statement page (new route `/[locale]/accessibility`, called "Deklaracja dostępności" in PL).

### 5.7 Case study images: click to enlarge
- Every case study image is a button ("Enlarge image: {alt}") that opens a **lightbox**:
  - native `<dialog>` with `showModal()`, so focus is trapped and the background is inert;
  - closes with **Esc**, a visible close button, or a backdrop click; focus returns to the image that opened it;
  - shows the image at its natural size (up to 100vw/100vh with padding) plus its caption; when a section has several images, ←/→ move between them;
  - respects `prefers-reduced-motion` (no zoom animation);
  - the lightbox has an accessible name: the caption, or else the alt text.
- **Alt text is required.** The MDX image component throws at build time if `alt` is empty. Purely decorative images aren't allowed in case study bodies.

### 5.8 Mobile nav
No hamburger. Both links ("Work / About" and "Projekty / O mnie") and the language toggle stay visible on every width. At 360px: brand on the first row, links and toggle on the second if they don't fit on one.

### 5.9 Skip link and focus
- A **skip link** ("Przejdź do treści" / "Skip to content") is the first focusable element. It's visually hidden until focused and targets `<main id="main" tabindex="-1">`.
- **Visible focus on everything interactive:** 2px solid `--color-fg` outline, 3px offset, via `:focus-visible`. Never remove outlines without an equal replacement. On tinted headers the ring still has ≥ 14:1 contrast.
- Touch targets are at least 24×24px (2.5.8), with 44px preferred for nav and toggle.

---

## 6. Base components to build

No implementation yet; this is the build list. "Existing" means a file in `src/components` to refactor.

| # | Component | Purpose | Key requirements | Status |
|---|---|---|---|---|
| 1 | `SkipLink` | Jump to `#main` | First in tab order, visible on focus, localized | new |
| 2 | `Container` | Width wrapper | `size`: text / figure / wide / content / page; gutters | new |
| 3 | `SiteHeader` (+ `NavLinks`) | Top nav | Brand, two links, current page `aria-current`, no hamburger | existing `layout/nav.tsx` |
| 4 | `LanguageSwitch` | PL/EN toggle | Links to the same page in the other locale, `hreflang`/`lang`, active state not by colour alone | part of `nav.tsx` → split out |
| 5 | `SiteFooter` | Contact + meta | Email, LinkedIn, CV download, credit + repo link, accessibility statement link | existing `layout/footer.tsx` |
| 6 | `Eyebrow` | Uppercase label | CSS uppercase, optional bold number prefix | new |
| 7 | `Button` / `LinkButton` | CTA | `control-border` outline, 6px radius, works as `<a>` or `<button>` | new (extract from `project-card.tsx`) |
| 8 | `TextLink` | Inline / external link | Underline, external variant with icon + "(opens in a new tab)" | new |
| 9 | `Icon` | SVG icons | LinkedIn, GitHub, external, download, close, arrows; `aria-hidden` by default | new |
| 10 | `Divider` | Section separator | Decorative `<hr>`, width variants | new |
| 11 | `Hero` | Homepage intro | Shorter, no background image | existing `hero/hero.tsx` |
| 12 | `BrowserFrame` | Flat screenshot frame | Decorative chrome, image with alt, optional URL | new |
| 13 | `ProjectCard` | Homepage card | Reads `card:` frontmatter, alternating layout, uses `BrowserFrame` | existing `work/project-card.tsx` |
| 14 | `ProjectList` | Ordered cards | Order: e-Delivery, Configurator; numbering by position | existing `work/work-list.tsx` |
| 15 | `HowIWork` | Process strip | `h2` + 3–4 items, responsive grid | new |
| 16 | `CaseStudyHeader` | Case study top | Tinted bg per project, eyebrow, `h1`, lede, `BrowserFrame` | existing `case-study/case-study-header.tsx` |
| 17 | `MetaList` | Year / role / scope / team / DS / status | `<dl>`, labels from `cs.meta.*`, scope as `<ul>` | new |
| 18 | `IntroRow` | Context / Challenge / Constraints | Label + text, stacks on mobile | new |
| 19 | `CaseStudySection` | H2 block | Wraps MDX section, container widths | existing `case-study/case-study-section.tsx` |
| 20 | `Figure` | Image + caption | Required alt (build error if empty), opens `Lightbox` | existing `case-study/case-study-figure.tsx` |
| 21 | `FigureGroup` | Pairs, 2×2 grids, labelled comparisons, image + text rows | Stacks on mobile, shared lightbox gallery | new |
| 22 | `Lightbox` | Enlarged image | `<dialog>`, focus trap, Esc, return focus, ←/→, reduced motion | new (client component) |
| 23 | `Portrait` / `AboutContent` | About page | Portrait with alt, MDX body | existing `about/about-content.tsx` |
| 24 | `MdxComponents` | MDX → components map | `h2`, `h3`, `p`, `ul`, `img`→`Figure`, `hr`→`Divider`, `strong` | new |
| 25 | `AccessibilityStatement` page | Required statement | Route `/[locale]/accessibility`, linked from footer | new |

Supporting non-component work: an MDX content loader (`src/lib/content.ts`) that reads `content/{locale}/*.mdx`, replacing the copy in `src/lib/projects.ts` and `src/lib/case-studies.ts`.
