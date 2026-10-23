# Figma tokens (reference only)

> Extracted on 2026-10-23 from Figma file `CGhui9MPfrGTTYfZwj7Ukx`, page `Porfolio`.
> **This is reference only. The visual style is going to change.** Don't copy it into `globals.css` as-is.

## Variables (`get_variable_defs`, called once on `2004:131` Homepage — Desktop EN)

| Figma variable | Value | Closest current code token |
|---|---|---|
| `color/bg` | `#ffffff` | `--color-bg` (same) |
| `color/fg` | `#151515` | `--color-fg` (same) |
| `color/border` | `#dbdbdb` | `--color-border` (same) |
| `fg/primary` | `#202226` | none (new, used for headings) |
| `fg/secondary` | `#4b5160` | none (Figma body copy; code uses `--color-fg-muted` `#707070`) |
| `fg/tertiary` | `#80889b` | none (inactive toggle, footer ©; code uses `--color-fg-subtle` `#838383`) |

Also referenced but **not returned** by the call above, because that homepage frame doesn't use it. It appears only in the case study frames:

| Figma variable | Value (fallback in code output) | Used for |
|---|---|---|
| `divider` | `#cbd3e4` | Section dividers, meta card border |

## Hard-coded colours (not variables)

| Value | Where |
|---|---|
| `#c3c7d2` | Hero divider line |
| `#fafbfd` | Project card 01 background (desktop) |
| `rgba(166,180,215,0.06)` | Project card 01 background (mobile) |
| `rgba(166,180,215,0.15)` | Language toggle track |
| `rgba(203,211,228,0.5)` | Desktop nav bottom border |
| `#e4e7f0` | PL mobile nav bottom border (EN mobile uses `color/border`) |
| `rgba(237,240,247,0.3)` | Footer background |
| `rgba(128,136,155,0.8)` / `0.5` | CTA button border (EN / PL) |
| `#e2e8ed` | Banner case study header background |
| `#f2f9ff` | e-Delivery case study header background |
| `#f6f8fa` | Diagram panel background |
| `#707070` | "(e-Doręczenia)" suffix in EN e-Delivery title |
| `#000000` | Image labels "mObywatel" / "e-Delivery" |

## Typography

Font families in Figma: **Bitter** (serif headings: Medium 500, SemiBold 600), **Inter** (body: Light 300, Regular 400, Medium 500, Semi Bold 600, Bold 700).
A few layers use **Kadwa** (language toggle, PL mobile nav name, e-Delivery "Scope" label, Banner mobile H2s), which looks accidental.
The current code loads **Inter Tight** only, so the families don't match.

| Role | Desktop | Mobile |
|---|---|---|
| Display name (hero) | Bitter Medium 64/1.05, −1% (EN) · 72/1.05 (PL) | Bitter Medium 48/1.2, −1% |
| H1 (card / case study title) | Bitter Medium 40/48, −1% | Bitter Medium 32/48 (card), 32/36 (card 02) |
| About H1 | Bitter Medium 40/56 | Bitter Medium 32/48 (EN), 28/40 (PL) |
| H2 (case study section) | Bitter Medium 32/48, −1% | Bitter Medium 24/36 |
| H3 (layer title) | Bitter Medium 20/normal, −1% | Bitter Medium 20/36 |
| Intro row label (Context, Challenge…) | Bitter Medium 18/30, −1% | Bitter Medium 18/30 |
| Meta label (Year, Role…) | Bitter Medium 16/30 | Bitter Medium 14/24 |
| Body | Inter Regular 16/1.6 | Inter Regular 16/1.6 |
| Meta value | Inter Regular 16/1.6 | Inter Regular 14/1.56 |
| Hero lede | Inter Light 24/36 (EN), 22/36 (PL) | Inter Light 18/26–27 |
| Hero tagline | Inter Regular 16 | Inter Regular 16 |
| Eyebrow (uppercase) | Inter Regular 12, tracking 2.4px (20%) | same |
| Card number ("01") | Inter Bold 20, tracking 2.4px | same |
| Nav brand | Bitter SemiBold 14 (EN) / 16 (PL) | Bitter SemiBold 14 / Inter Medium 14 (CS) |
| Nav link | Bitter Medium 14/18, −1% | (hamburger) |
| CTA | Inter Medium 14 | same |
| Caption | Inter Bold + Regular 14/1.6 | same |
| Footer | Bitter SemiBold 14 · Inter Regular 13 | same |

## Spacing & layout

| Token | Value |
|---|---|
| Page gutter | 40px desktop · 24px mobile (16px inside case study sections) |
| Nav padding | 20px / 40px (EN), 16px / 40px (PL) · mobile 16–18px / 24px |
| Hero padding | 180px vertical · mobile 122px top / 128px bottom |
| Hero stack gap | 30px desktop · 20px mobile |
| Project card | 96px vertical padding, 48px gap; text column 460px, image 672×420 |
| Case study section gap | 90px desktop · 80px mobile |
| Case study header | 112px vertical padding (mobile 48px top / 112px bottom, fixed 555px height) |
| Content widths | prose 740 · figure 790 · wide figure 980 · header/meta card 1014 · intro rows 1140 (160 label + 48 gap + 752 text) |
| Paragraph gap | 12px (16px in some "constraints" blocks) |
| Heading → body gap | 16px (H2 blocks), 12px (eyebrow → title) |
| Figure gap | 32px (text → image), 56px (layers section) |
| Radius | 6px images & buttons · 12px meta card · 4px toggle segment |
| Dividers | 1px; 478px (after meta card), 740px (between sections), 268/178px (hero) |
| Breakpoints in file | 1440 desktop · 360 mobile (no tablet frame) |
