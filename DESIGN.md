# AngelPaws Serif — design system

**Canonical name:** AngelPaws Serif (Blue Edition — with dark section bands)
**Role:** Single source of truth for typography, color, spacing, and UI patterns before adding new pages or components.

**Implementation:** Tailwind CSS v4 tokens in `src/app/globals.css` (`@theme inline`). Fonts load in `src/app/layout.tsx` via `next/font/google`.

---

## Typography

| Role | Font | Tailwind | Notes |
|------|------|----------|--------|
| Headlines, emotional titles, logo wordmark | **Noto Serif** | `font-serif` | Use `italic` for emphasis where the comp specifies it. |
| Body, UI, labels, buttons, nav (functional) | **Manrope** | `font-sans` | Default on `body`. |
| Base body | — | `text-base` `leading-relaxed` `tracking-[0.01em]` | Applied in `@layer base`. |

**Headings:** `h1`–`h4` use `font-serif` and `text-on-background` in global CSS. Override weight when a section needs bold display type.

---

## Color tokens (semantic)

Seed / primary brand blue: **`#4784F2`**. Use semantic names in markup, not raw hex (except rare gradients).

| Token | Hex (approx.) | Use |
|-------|----------------|-----|
| `primary` | `#4784F2` | CTAs, links, key accents |
| `on-primary` | `#FFFFFF` | Text on primary buttons |
| `primary-strong` | `#2D65D9` | Deep blue endpoint for primary gradients |
| `primary-container` | `#D7E2FF` | Soft chips, selection, light blue fields |
| `on-primary-container` | `#001A40` | Text on primary-container |
| `secondary` | `#565E71` | Muted headings, secondary labels |
| `on-secondary` | `#FFFFFF` | — |
| `secondary-container` | `#DAE2F9` | Tonal cards / panels |
| `on-secondary-container` | `#131C2C` | Text on secondary-container |
| `tertiary` | `#8A6914` | Warm gold accent (highlights, seasonal warmth) |
| `on-tertiary` | `#FFFFFF` | Text on solid tertiary |
| `tertiary-container` | `#F8ECC8` | Soft gold panels |
| `on-tertiary-container` | `#3A3000` | Text on tertiary-container |
| `background` / `surface` | `#FDF8F9` | Page + main surfaces |
| `on-background` / `on-surface` | `#1B1B1F` | Primary text (not pure black) |
| `on-surface-variant` | `#44474F` | Supporting body |
| `surface-container-low` … `highest` | warm neutrals | Layered sections, cards, footer slab |

### Dark bands (marketing differentiation)

Strategic navy or charcoal full-width bands break up long white scrolls and differentiate from similarly blue-on-white national ministry sites.

| Token | Hex (approx.) | Use |
|-------|----------------|-----|
| `surface-inverse` | `#131C2C` | Navy section backgrounds |
| `on-surface-inverse` | `#F0F4FA` | Headings/body emphasis on navy |
| `on-surface-inverse-muted` | `#9EB0C8` | Supporting copy on navy |
| `surface-charcoal` | `#292524` | Charcoal section backgrounds |
| `on-surface-charcoal` | `#FAFAF9` | Headings/body emphasis on charcoal |
| `on-surface-charcoal-muted` | `#B8B3AD` | Supporting copy on charcoal |

**Implementation:** Prefer utility classes **`section-tone-inverse`** and **`section-tone-charcoal`** (`globals.css`), or **`Section`** tones `inverse` and `charcoal`, plus the `on-*-muted` text tokens above for paragraphs and captions.

---

**Stone (marketing shell):** Header and footer also use Tailwind `stone-*` where the Stitch shell calls for a neutral strip (`stone-50`, `stone-100`, `stone-600`, etc.). Prefer **semantic tokens** for page content; **stone** for chrome when matching the export.

---

## Layout & composition

- **Whitespace:** Generous vertical rhythm.
- **Gutter:** Consistent `px-6` (mobile) to `px-12` (desktop) padding.
- **Max width:** Primary content `max-w-screen-xl` (1280px) with horizontal padding unless a narrow reading column is intentional.
- **Asymmetry:** Prefer offset grids and varied column weight over perfectly centered everything.
- **Corners:** Editorial radii roughly **0.5rem–1.5rem**; hero and large media often **`rounded-[2.5rem]`–`rounded-[3rem]`** per comps.
- **Elevation:** Default soft shadow token: **`shadow-soft`** (`0 12px 32px rgba(26,28,28,0.06)`). Use sparingly.

---

## Principles (non-negotiables)

1. **No hard borders or rules** for section separation—use **tonal surfaces**, spacing, and soft shadow.
2. **No pure black** for long-form text—use `on-surface` / `on-background`.
3. **Serif = emotional / display; sans = functional UI** (nav labels may use serif when matching a specific Stitch header comp—document per page).
4. **Icons:** **Lucide React** (SVG) only—no icon-font ligatures.
5. **No nested card stacks.** Choose one primary surface per section, then use type, spacing, and a single clear action path for hierarchy.

---

## Components (starter set)

| Component | Path | Role |
|-----------|------|------|
| `Button` | `src/components/ui/Button.tsx` | Primary / secondary actions |
| `Card` | `src/components/ui/Card.tsx` | Tonal cards, no borders |
| `Container` | `src/components/ui/Container.tsx` | Max width + optional narrow column |
| `HeadingBlock` | `src/components/ui/HeadingBlock.tsx` | Label + serif title + optional body |
| `Section` | `src/components/ui/Section.tsx` | Vertical section padding + tone variants (incl. `inverse`, `charcoal`) |
| `SiteHeader` | `src/components/layout/SiteHeader.tsx` | Light frosted bar, brand + centered nav |
| `SiteFooter` | `src/components/layout/SiteFooter.tsx` | Light stone slab, four columns |

**Brand assets:** `public/brand/angel-paws/` (`logo.png`, `logo@2x.png`, `logo@4x.png`, etc.).

---

## Before you ship a new page

- [ ] Uses `font-serif` / `font-sans` per roles above  
- [ ] Uses semantic colors (`bg-surface`, `text-primary`, …) or documented `stone-*` for shell only  
- [ ] Section spacing matches the rest of the site (no cramped `py-8` unless intentional)  
- [ ] No new one-off hex colors without adding a token in `globals.css`  
- [ ] Images: `next/image` + `remotePatterns` in `next.config.ts` if external  
- [ ] Metadata: title/description (and later OG) per route  

---

## Motion

Keep motion **sparse and editorial**: one primary idea (soft enter on scroll), fast enough to feel responsive, slow enough to read as intentional.

- **Scroll reveal:** Section-level fade + slight upward move via **`Element.animate()`** (Web Animations API) in `src/components/ui/Reveal.tsx`—this runs outside Tailwind/CSS layers so it reliably reaches the browser. Optional `delayMs` staggers the WAAPI timeline slightly; do not chain long delays.
- **Reduced motion:** When `prefers-reduced-motion: reduce`, `Reveal` does not start an animation; content stays as authored.
- **Micro-interaction:** Default link color transitions (`globals.css` base `a`) are enough for most hovers; reserve stronger motion for primary CTAs already styled in components.

---

## Changelog (high level)

- **Blue Edition** is the canonical brand palette (seed **`#4784F2`**), tertiary as **warm gold** (replacing legacy purple-tertiary).
- **`primary-strong`** drives primary button gradients alongside `primary`.
- **Inverse / charcoal bands** (`section-tone-inverse`, `section-tone-charcoal`, matching `@theme` tokens) add rhythm and differentiation versus generic white + blue brochure sites.
- A **Green Edition** snapshot (`#2F7D5A`) existed briefly in 2026; rollback reference values live in Git history alongside `docs/theme-archive/angelpaws-serif-blue.css` (canonical blue token list mirrored in active `globals.css`).
- Icons migrated to Lucide.

When tokens change, update **this file** and **`src/app/globals.css`** together.
