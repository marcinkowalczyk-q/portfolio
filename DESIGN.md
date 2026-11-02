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
| `h1-sm` | 32 / 1.5 | −1% | serif 500 | Same, mobile (48px line, as in Figma mobile card and case study title) |
| `h2` | 32 / 1.5 | −1% | serif 500 | Case study section heading |
| `h2-sm` | 24 / 1.5 | −1% | serif 500 | Same, mobile |
| `h3` | 20 / 1.4 | −1% | serif 500 | Sub-section (e.g. "Banner list") |
| `label-lg` | 18 / 1.67 | −1% | serif 500 | Intro row label (Context, Challenge…) |
| `label` | 16 / 1.875 | −1% | serif 500 | Meta label (Year, Role…) |
| `label-sm` | 14 / 1.7 | −1% | serif 500 | Meta label, mobile |
| `lede` | 20 / 32px | 0 | sans 300 | Hero intro |
| `lede-sm` | 18 / 28px | 0 | sans 300 | Hero intro, mobile |
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
| `--color-fg-lede` | `#383c44` | Hero intro | **new** (11.06:1 on white) |
| `--color-fg-tertiary` | `#60687a` | Meta, captions, inactive toggle, footer © | **was `#80889b`** (contrast) |
| `--color-border` | `#dbdbdb` | Image frames, footer top border | — |
| `--color-border-subtle` | `#e5e9f2` | Nav bottom border | merged `rgba(203,211,228,.5)` and `#e4e7f0` |
| `--color-divider` | `#cbd3e4` | Section dividers, meta card border | merged `#c3c7d2` (hero divider) |
| `--color-control-border` | `#80889b` | CTA / button outline | **was `rgba(128,136,155,.8)`** (non-text contrast) |
| `--color-surface` | `#fafbfd` | Featured card, footer | merged `#fafbfd`, `rgba(166,180,215,.06)`, `rgba(237,240,247,.3)` (identical once composited) |
| `--color-surface-muted` | `#f6f8fa` | Diagram panel | — |
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
| `#383c44` fg/lede | 11.06 ✅ | 10.69 ✅ | 10.62 ✅ | 10.05 ✅ | 8.96 ✅ | 10.42 ✅ | 10.39 ✅ |
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
| Hero vertical padding | 80px | 184px (see Changes) |
| Hero divider spacing (above / below) | 28 / 20px | 38 / 30px |
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
| `--container-page` | 1140px | Intro rows (160px label + 48px gap + text) |
| `--container-cards` | 1180px | Project cards (460 text + 48 gap + 672 image) |

**Breakpoints:** Tailwind defaults (`md` 768, `lg` 1024, `xl` 1280). Figma only defines 360 and 1440, so layouts switch from stacked to side-by-side at `md` and reach full width at `lg`.

**Radii:** `rounded-sm` 4px (toggle segment), `rounded-md` 6px (images, buttons), `rounded-card` 12px (meta card).

---

## 4. Components (current style)

| Component | Spec |
|---|---|
| **Nav** | Brand (serif 600, 14/16px) on the left; links "Work / About" (`text-nav`, 32px gap); language toggle on the right (track `surface-toggle`, 2px padding, 6px radius; 14px labels; active segment white, `fg-primary`; inactive `fg-tertiary`). 1px `border-subtle` bottom border. |
| **Hero** | Centred stack: eyebrow (normal case, as in Figma) → name (`display`) → tagline (`body`, `fg-secondary`) → 268px divider (178px mobile; 28px above / 20px below, 38 / 30px on desktop) → lede (`lede`, `fg-lede`, max 680px). |
| **Project card** | Text column (eyebrow with bold number "01", `h1` title, `body` summary, CTA) + visual. Desktop: 460px text + 672px visual, sides alternate, first card on `surface`. Mobile: stacked, text first. |
| **CTA (secondary button)** | 1px `control-border`, 6px radius, 10/18px padding, Inter 500 14px, `fg`, arrow "→" as part of the label. |
| **Case study header** | Project-tinted background, eyebrow + `h1` + lede in a 460px column. Device mockup on the right, anchored to the content container (see 5.2). When the frontmatter has `prototypes` (e-Delivery: desktop + mobile Axure URLs), show them below the lede as external `TextLink`s: "Zobacz prototyp w Axure" / "View the Axure prototype", with a desktop / mobile qualifier when there are two. Labels go in `src/messages/*.json`. |
| **Meta card** | 1px `divider` border, 12px radius, 12/16px padding; rows of label (112px, `label`) + value (`body`). Scope renders as a bullet list. |
| **Intro row** | Label (160px, `label-lg`) + text (752px). Stacks on mobile. |
| **Section** | `h2` + paragraphs (+ lists) + figure(s), inside `container-text`; figures widen to `container-figure` / `container-wide`. Dividers (`divider`, 740px) between topic groups. |
| **Figure** | Image + optional caption (`body-sm`, bold lead-in sentence allowed). |
| **Footer** | `surface` background, 24px vertical padding, 12px above and below the divider between rows (mobile and desktop). See Changes for the content. |

---

## 5. Changes from Figma

### 5.1 Accessible contrast
All text tokens meet WCAG 2.2 AA (see the audit above). `fg-tertiary` → `#60687a`, CTA outline → solid `#80889b`.

### 5.2 Project visuals: device mockups (decorative)
- Homepage project cards and case study headers keep the **device mockups** (monitor, laptop, phone) from the existing images in `public/images/`. No browser frame.
- Mockups are decorative. On homepage cards the project title sits right next to the image, so the `<img>` has **empty alt** (`alt=""`). The image link is a mouse shortcut only (`tabIndex=-1`, `aria-hidden`); the CTA is the single keyboard / screen reader link per card. Case study headers give the mockup a **short alt** (e.g. "e-Delivery on a laptop and a phone").
- Inside case study bodies, figures stay frameless and carry full alt text (see 5.6).
- **Case study header mockup (lg and up).** Text column and mockup are one group inside `container-content` (1014px, centred). The mockup box is positioned from the container's left edge and the header's top edge, never from the viewport, so the distance between the heading and the mockup is the same at every width. Whatever runs past the header's right or bottom edge is cropped by the header (`overflow: hidden`).

  | Project | Box (left × top, from container / header) | Size | Header height (min) | Figma |
  |---|---|---|---|---|
  | Configurator | 417 × 29px | 819 × 512 (full monitor with stand, transparent) | 463px | `2004:602` → `2004:606` |
  | e-Delivery | 539 × 30px | 606 × 606 (laptop + phone, transparent) | 471px | `2004:938` → `2004:948` (`object-contain` square in a 970 × 606 frame at 357px) |

  The header has 112px padding above and below the text, with the Figma frame height as a minimum so the bottom crop stays as designed when the text is short; longer text makes the header taller and shows more of the mockup. Desktop files are `hero-desktop.png` (frontmatter `heroImageDesktop`, 2x); below lg the old `hero.png` crop stays (full header width up to 560px, flush right, under the text). One `<picture>` serves both, so only the matching file is downloaded.

### 5.3 Hero
- Vertical padding 184px on desktop, 80px on mobile (Figma: 180 / 122–128). Mobile is scaled down so the first project card starts on the first screen.
- Divider spacing: 28px above / 20px below on mobile, 38px / 30px on desktop.
- Intro text: `lede` (20/32px) on desktop, `lede-sm` (18/28px) on mobile, weight 300, `fg-lede` `#383c44` (11.06:1 on white).
- **No background illustration.** The hero sits on `bg`.

### 5.4 Homepage order
1. Hero → 2. **e-Delivery** (`02` becomes `01`) → 3. **Configurator** → 4. Footer.
Card numbers follow the display order. The featured `surface` background goes on the first card.

### 5.5 Footer
Two rows inside `container-page`, 24px vertical padding, separated by a 1px `border-subtle` divider with exactly 12px above and below it (box to border, no extra padding on either row):
- **Contact:** email (shown as visible text + `mailto:` link, value in `src/lib/site.ts`), LinkedIn. No CV download.
- **Meta:** **About** link ("O mnie" / "About", so About is reachable on mobile without opening the menu) · © year. No accessibility page.
- External links carry `rel="noopener noreferrer"` and announce "opens in a new tab".
- Email and LinkedIn URL are in `src/lib/site.ts`.

### 5.6 Case study images: click to enlarge
- Every case study image is a button ("Enlarge image: {alt}") that opens a **lightbox**:
  - native `<dialog>` with `showModal()`, so focus is trapped and the background is inert;
  - closes with **Esc**, a visible close button, or a backdrop click; focus returns to the image that opened it;
  - shows the image at its natural size (half its pixel size, the files are 2x) plus its caption. If that still fits the viewport width it is scaled to fit as before (up to 100vw/100vh with padding); if it is **wider than the viewport** it opens in a **scroll area** at that size instead of being shrunk: `role="region"`, focusable (`tabindex=0`, focus ring), named "Obraz w pełnym rozmiarze, przewijaj strzałkami: {alt}" / "Full-size image, scroll with the arrow keys: {alt}" (`lightbox.pan`), arrow keys scroll it, touch can pan and pinch-zoom (browser zoom; `touch-action` stays `auto`). On phones this applies to most screenshots;
  - when a section has several images, ←/→ move between them, except while focus is in the scroll area (there the arrows scroll); the prev / next buttons always work;
  - **separate lightbox file:** wrap the image in a link, `[![alt](thumb.png)](full.png "Hint")`. The thumbnail stays on the page, the lightbox opens `full.png` (Figure `fullSrc`) unoptimized at full resolution, shown at a quarter of its pixel size so there is some overview to start from (touch can only zoom in from there). The link title is a visible hint under the thumbnail (`body-sm`, `fg-tertiary`), e.g. "Kliknij, aby zobaczyć pełny schemat" / "Click to view the full diagram". Used for the Configurator "Od zadań do logiki systemu" diagram (`system-logic-full.png`, FigJam PDF rendered at 2x, 12310 × 5536);
  - respects `prefers-reduced-motion` (no zoom animation);
  - the lightbox has an accessible name: the caption, or else the alt text.
- **Alt text is required.** The MDX image component throws at build time if `alt` is empty. Purely decorative images aren't allowed in case study bodies.

### 5.7 Mobile nav
- **md and up:** unchanged. Brand, the two links and the language toggle in one row.
- **Below md:** one row, brand on the left and a **Menu button** on the right. The button opens a panel under the header (full width, `bg`, top border `border-subtle`) with the two links ("Projekty / O mnie", "Work / About") as a vertical list in `label-lg` serif, then a `border-subtle` divider and the language toggle.
- **Button:** a real `<button>`, accessible name "Menu" in both languages (`nav.menu`), `aria-expanded`, `aria-controls="mobile-menu"`. 44×44px, standard focus ring. Icon is three bars when closed and × when open, so the state change is a change of shape, not colour.
- **Behaviour:** opening moves focus to the first link; Tab and Shift+Tab cycle through the button and the menu links only; Esc closes and returns focus to the button. A link click or a route change (including the language toggle) closes it. The page behind doesn't scroll while it's open. Widening past `md` closes it.
- **Motion:** 160ms fade + 4px slide in (`animate-menu-in`), applied with `motion-safe:` only. Closing is instant.
- Current page keeps `aria-current="page"` and the underline in both layouts.

### 5.8 Skip link and focus
- A **skip link** ("Przejdź do treści" / "Skip to content") is the first focusable element. It's visually hidden until focused and targets `<main id="main" tabindex="-1">`.
- **Visible focus on everything interactive:** 2px solid `--color-fg` outline, 3px offset, via `:focus-visible`. Never remove outlines without an equal replacement. On tinted headers the ring still has ≥ 14:1 contrast.
- Touch targets are at least 24×24px (2.5.8), with 44px preferred for nav and toggle.

---

## 6. Base components to build

The build list. "existing" means a file in `src/components` to refactor; "done" gives the file that implements it.

| # | Component | Purpose | Key requirements | Status |
|---|---|---|---|---|
| 1 | `SkipLink` | Jump to `#main` | First in tab order, visible on focus, localized | done `layout/skip-link.tsx` |
| 2 | `Container` | Width wrapper | `size`: text / figure / wide / content / page / cards; gutters | done `ui/container.tsx` |
| 3 | `SiteHeader` (+ `NavLinks`) | Top nav | Brand, two links, current page `aria-current`; below md a Menu button + panel (5.7) | done `layout/site-header.tsx, nav-links.tsx, mobile-menu.tsx` |
| 4 | `LanguageSwitch` | PL/EN toggle | Links to the same page in the other locale, `hreflang`/`lang`, active state not by colour alone | done `layout/language-switch.tsx` |
| 5 | `SiteFooter` | Contact + meta | Email, LinkedIn, About link | done `layout/site-footer.tsx` |
| 6 | `Eyebrow` | Uppercase label | CSS uppercase, optional bold number prefix | done `ui/eyebrow.tsx` |
| 7 | `Button` / `LinkButton` | CTA | `control-border` outline, 6px radius, works as `<a>` or `<button>` | done `ui/link-button.tsx` |
| 8 | `TextLink` | Inline / external link | Underline, external variant with icon + "(opens in a new tab)" | done `ui/text-link.tsx` |
| 9 | `Icon` | SVG icons | LinkedIn, mail, external, menu, close, arrows; `aria-hidden` by default | done `ui/icon.tsx` |
| 10 | `Divider` | Section separator | Decorative `<hr>`, width variants | done `ui/divider.tsx` |
| 11 | `Hero` | Homepage intro | No background image; 184 / 80px padding, `lede` intro in `fg-lede` | done `hero/hero.tsx` |
| 13 | `ProjectCard` | Homepage card | Reads `card:` frontmatter, alternating layout, decorative device mockup (`alt=""`) | done `work/project-card.tsx` |
| 14 | `ProjectList` | Ordered cards | Order: e-Delivery, Configurator; numbering by position | done `work/project-list.tsx` |
| 16 | `CaseStudyHeader` | Case study top | Tinted bg per project, eyebrow, `h1`, lede, device mockup (short alt from frontmatter `heroAlt`), optional Axure prototype links from frontmatter `prototypes` | done `case-study/case-study-header.tsx` |
| 17 | `MetaList` | Year / role / scope / team / DS / status | `<dl>`, labels from `cs.meta.*`, scope as `<ul>` | done `case-study/meta-list.tsx` |
| 18 | `IntroRow` | Context / Challenge / Constraints | Label + text, stacks on mobile | done `case-study/intro-row.tsx` |
| 19 | `CaseStudySection` | H2 block | Wraps MDX section, container widths | done `case-study/case-study-section.tsx` |
| 20 | `Figure` | Image + caption | Required alt (build error if empty), opens `Lightbox`; optional `fullSrc` (separate lightbox file) + `hint` | done `case-study/figure.tsx` |
| 21 | `FigureGroup` | Pairs, 2×2 grids, labelled comparisons, image + text rows | Stacks on mobile, shared lightbox gallery | done `case-study/figure-group.tsx` (single, pair / 2×2, row, panel, overlay) |
| 22 | `Lightbox` | Enlarged image | `<dialog>`, focus trap, Esc, return focus, ←/→, reduced motion, focusable scroll area for images wider than the viewport | done `case-study/lightbox.tsx` (client) |
| 23 | `Portrait` / `AboutContent` | About page | Portrait with alt, MDX body | done `about/about-content.tsx` |
| 24 | `MdxComponents` | MDX → components map | `h2`, `h3`, `p`, `ul`, `img`→`Figure`, `hr`→`Divider`, `strong` | done `case-study/mdx-components.tsx` |

Supporting non-component work: the MDX content loader `src/lib/content.ts` (`gray-matter`) reads `content/{locale}/*.mdx` frontmatter. Bodies compile with `next-mdx-remote` (`src/lib/mdx.ts`); `src/lib/remark-case-study.ts` turns plain markdown into the template: `##` blocks before the first `---` become intro rows, later `##` blocks become sections, image-only paragraphs become figure groups (1 image = single, 2 = pair), a `###` block with one image becomes an image + text row, and a `**Label**` paragraph before an image becomes a labelled figure (two in a row form a comparison pair). Layouts markdown can't express use an explicit wrapper: `<FigureGroup variant="panel">` (diagram on `surface-muted`) or `<FigureGroup variant="overlay">` (desktop shot + phone). A caption goes in the image title: `![alt](src "**Lead.** Rest")`. Image sizes are read from `public/` at build time (`src/lib/image-size.ts`).
