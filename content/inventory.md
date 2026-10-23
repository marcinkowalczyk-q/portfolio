# Content inventory

Source: Figma file `CGhui9MPfrGTTYfZwj7Ukx`, page `Porfolio` (`0:1`). Extracted 2026-10-23.

The page has **16 view frames**: 4 views × 2 breakpoints (desktop 1440, mobile 360) × 2 languages.
English frames are on the left half of the canvas (x 0–8830) and Polish frames on the right (x 9480–18310).
The `Language bar` frames (`2004:227`, `2004:2222`) and `Page bar` frames (`2004:932…`, `2004:2224…`) are canvas labels, not views.

## Views

| View | Route (current) | EN desktop | EN mobile | PL desktop | PL mobile |
|---|---|---|---|---|---|
| Homepage | `/[locale]` | `2004:131` | `2004:145` | `2004:2188` | `2004:2202` |
| Case study: Dynamic Content Configurator | `/[locale]/banner-configurator` | `2004:602` | `2004:750` | `2004:2232` | `2004:2380` |
| Case study: e-Delivery / e-Doręczenia | none yet (suggested `/[locale]/e-doreczenia`) | `2004:938` | `2070:446` | `2004:2539` | `2004:2700` |
| About | `/[locale]/about` | `2004:1285` | `2004:1303` | `2004:2859` | `2004:2877` |

Desktop frames are treated as canonical copy. Places where mobile copy differs are listed under [Copy issues](#copy-issues-found-in-figma).

## Sections per view

### Homepage: introduce Marcin and route to the two case studies

| # | Section | Purpose | Desktop vs mobile |
|---|---|---|---|
| 1 | Nav | Brand, Work / About links, PL/ENG toggle | Mobile: links collapse into a hamburger, no toggle shown |
| 2 | Hero | Eyebrow "UX / UI Designer", name, tagline, divider, one-line intro (lede) over a faint illustration | Same stack, smaller type (64/72 → 48) |
| 3 | Work list | Two project cards: number + category, title, summary, "View case study →" CTA, device mockup | Desktop alternates text/image sides (card 02 is image-first) and card 01 has a tinted background. Mobile stacks text above image. |
| 4 | Footer | Name + © 2026 | Same |

### Case study: shared template (both case studies)

| # | Section | Purpose | Desktop vs mobile |
|---|---|---|---|
| 1 | Nav | as Homepage | Mobile: hamburger |
| 2 | Header (`CS/Header`) | Eyebrow (client / category), title, lede; device mockup overflowing to the right | Mobile: fixed 555px block, mockup peeks in from the bottom |
| 3 | Meta card | Year · Role · (Scope list, e-Delivery only) · Team · Design System · Status | Mobile: narrower label column (70px), 14px text |
| 4 | Intro rows | Context · Challenge · Working within constraints (label left, text right) | Mobile: label above text |
| 5 | Body sections | H2 + 1–2 paragraphs + figure(s), split by 740px dividers | All figures go full width on mobile; side-by-side pairs stack |
| 6 | Key takeaways | H2, two paragraphs, bullet list | Same |
| 7 | Footer | as Homepage | |

**Banner body sections:** Understanding the operational context → From tasks to system logic → Designing within the Design System (2 images side by side) → Interaction flows → Error prevention → System interface layers (3 image + text rows: Banner list, Configuration form, Preview) → Scenarios → Design documentation → Key takeaways.

**e-Delivery body sections:** Understanding the context of a public service → From a simple inbox to a complex access model (diagram) → Adapting to mObywatel (labelled comparison: mObywatel vs e-Delivery) → Dashboard (desktop shot with phone overlay) → Permissions model (image + bold-lead caption) → Managing users and access → Mailbox settings → System interface layers (2×2 screenshot grid) → Key takeaways.

### About: who Marcin is and how to reach him

| # | Section | Purpose | Desktop vs mobile |
|---|---|---|---|
| 1 | Nav | | |
| 2 | About content | Portrait, eyebrow "About", H1, 3 paragraphs, LinkedIn link with icon | Desktop: portrait left, text right. Mobile: text first, portrait below. |
| 3 | Footer | | |

## Where the copy lives (no duplication)

| Copy | Location |
|---|---|
| Nav, language toggle, hero (eyebrow, tagline, lede), CTA labels, case study meta labels, About eyebrow, LinkedIn label, footer | `src/messages/{pl,en}.json` |
| Case study title, eyebrow, lede, meta values, project-card summary, full body | `content/{pl,en}/banner-configurator.mdx`, `content/{pl,en}/e-doreczenia.mdx` (frontmatter + body) |
| About H1 + paragraphs + LinkedIn URL | `content/{pl,en}/about.mdx` |
| Images | `content/assets.md` (planned paths match the MDX) |

The project-card copy (category + summary) is stored in each case study's frontmatter under `card:`, so the homepage card and the case study read from the same file.

### Changes made to `src/messages/*.json`

| Key | Locale | Before | After (from Figma) |
|---|---|---|---|
| `hero.tagline` | pl | Złożone produkty cyfrowe \| Produkt & technologia | Złożone produkty cyfrowe \| Produkt i technologia \| E-commerce |
| `hero.bio` | pl | Projektuję dla skomplikowanych produktów — i robię z nich coś prostego. | Cześć, jestem Marcin! Projektuję złożone produkty cyfrowe i pomagam zamieniać skomplikowane problemy w przejrzyste rozwiązania. |
| `hero.bio` | en | Hi! I'm a designer who likes complicated products and making them feel simple. | Hi, I’m Marcin. I design complex digital products and help turn complicated problems into clear solutions. |
| `cs.meta.year` / `role` / `scope` / `team` / `designSystem` / `status` | both | (new) | Rok / Rola / Zakres / Zespół / Design System / Status · Year / Role / Scope / Team / Design System / Status |

Keys checked and unchanged (they already match Figma): `nav.work`, `nav.about`, `nav.langPl`, `nav.langEn`, `hero.eyebrow`, `hero.tagline` (en), `about.eyebrow`, `about.linkedin`, `project.viewCaseStudy`, `footer.copy`.

### Pending cleanup (needs code changes, so not done yet)

- `about.heading`, `about.para1–3` in the JSON still hold the **old** About copy. The new copy is only in `content/*/about.mdx`. Delete these keys when `about-content.tsx` reads from MDX. They're still there because deleting them now would break the typecheck.
- `src/lib/case-studies.ts` holds an older copy of the Banner case study, and `src/lib/projects.ts` holds older card copy and the e-Delivery "case study in progress" + prototype links. Both duplicate the MDX. Replace them with an MDX loader when components are wired.
- `project.caseStudyInProgress`, `project.statusNote`, `project.mobilePrototype`, `project.desktopPrototype`, `cs.backToWork`, `cs.label` don't appear anywhere in Figma. Either drop them or add them to the design.

## Copy issues found in Figma

These are worth fixing at the source:

1. **EN vs PL hero tagline:** PL adds "| E-commerce", EN doesn't.
2. **PL desktop nav has no language toggle.** Only the EN desktop frames show PL/ENG.
3. **PL card 01 category:** desktop says "Narzędzie konfiguracyjne dla Wakacje.pl", mobile says "Konfigurator dla Wakacje.pl", and EN card says just "Configurator". MDX uses the desktop PL text.
4. **PL Banner mobile header eyebrow** is English ("CONFIGURATOR FOR WAKACJE.PL"). MDX uses the PL desktop "Konfigurator dla Wakacje.pl".
5. **Banner role differs:** EN "Solo Product Designer" vs PL "Product Designer". The Team line is also much longer in PL.
6. **EN Banner copy is condensed** compared with PL. In "From tasks to system logic", "Designing within the DS" and "Scenarios", PL and EN say different things, not translations of each other.
7. **EN e-Delivery mobile header** title is "e-Doręczenia". Desktop says "e-Delivery (e-Doręczenia)", which the MDX uses.
8. **EN About mobile (`2004:1303`) has the old About copy** (the same text as the current JSON). EN desktop has the new copy. MDX uses desktop.
9. **PL About mobile LinkedIn label** is English ("My LinkedIn profile").
10. **EN mobile homepage card 01** says "managing *dynamic* promotional banners"; desktop omits "dynamic".
11. **PL mobile homepage nav** brand is "Marcin_Kowalczyk" set in Kadwa Bold, which looks like a placeholder.
12. **PL mobile homepage hero** has no background illustration.
13. **e-Delivery mobile frames** contain extra images not in desktop: a "Scenarios Image" in System layers (both languages), and a second dependency diagram in the Dashboard section (PL only). Both look misplaced and aren't in the MDX.
14. **Typos fixed in MDX** (still wrong in Figma): PL image label "e-Doręcznia" → "e-Doręczenia" (`2004:2641`, `2068:258`); PL scope item "…i konfigurację na poziomie…" → "…i konfiguracja na poziomie…" (`2004:2576`, `2004:2733`).
15. **Two LinkedIn URLs:** one has a trailing slash (`2014:533`) and one doesn't. MDX uses the version without it.
