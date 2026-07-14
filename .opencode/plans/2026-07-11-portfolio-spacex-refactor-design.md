# Portfolio Refactor: SpaceX-Inspired Clean & Minimalist Design

**Date:** 2026-07-11
**Status:** Draft
**Goal:** Refactor portfolio-clean Next.js app to follow the SpaceX-inspired design language from `DESIGN.md` — pure black canvas, D-DIN typography, uppercase display, ghost pill buttons, flat surfaces, no accent colors.

---

## Scope & Approach

- **Approach chosen:** Literal/full conversion (Approach A) — apply the DESIGN.md system as faithfully as possible within a developer portfolio context.
- **Dark + Light modes** retained, adapted to pure `#000` / `#fff`.
- Icons retained for tech stack + essential social links (GitHub, LinkedIn).
- Animations retained minimally: fade-in/up only, no spring/stagger/parallax/glow/magnetic.

---

## 1. Color System

### Dark Mode

| Token | Value | Usage |
|---|---|---|
| `canvas` | `#000000` | Page background |
| `canvas-card` | `#0a0a0a` | Card / section surface (barely-lifted) |
| `ink` | `#ffffff` | Primary text |
| `ink-mute` | `#f0f0fa` | Secondary/muted text |
| `hairline` | `#3a3a3f` | 1px borders on dark |
| `on-primary` | `#ffffff` | Text on canvas |
| `on-primary-mute` | `#f0f0fa` | Muted text on dark |

### Light Mode

| Token | Value | Usage |
|---|---|---|
| `canvas` | `#ffffff` | Page background |
| `canvas-card` | `#f0f0fa` | Card / section surface (cool white) |
| `ink` | `#000000` | Primary text |
| `ink-mute` | `#5a5a5f` | Secondary/muted text |
| `hairline` | `#e0e0e8` | 1px borders on light |
| `canvas-cool` | `#f0f0fa` | Secondary surface |

### Removed

- All accent colors (indigo, emerald, amber) — no brand color beyond black/white.
- All glassmorphism classes (`glass-panel`, `backdrop-blur`, translucent backgrounds).
- All shadows (`shadow-sm` through `shadow-2xl`, glow, drop-shadow).
- All gradients.
- All opacity-based backgrounds `bg-black/50` etc.

---

## 2. Typography

### Font Family

- **D-DIN** (free version, self-hosted via `next/font/local` or static files in `public/fonts/`).
- **D-DIN-Bold** for display tiers (uppercase, wide tracking, condensed).
- **D-DIN Regular** for body, buttons, captions.
- Remove `@next/font/google` references to Inter and Plus Jakarta Sans.

### Token Hierarchy

| Token | Size | Weight | LineH | Tracking | Case | Usage |
|---|---|---|---|---|---|---|
| `display-xxl` | 80px | 700 | 0.95 | 1.6px | UPPERCASE | Hero headline |
| `display-xl` | 60px | 700 | 1.2 | 1.2px | UPPERCASE | Section heading |
| `display-lg` | 48px | 700 | 1.25 | 0.96px | UPPERCASE | Sub-section heading |
| `body-lg` | 16px | 400 | 1.7 | 0.32px | sentence | Lead body |
| `body-md` | 16px | 400 | 1.5 | 0.32px | sentence | Default body |
| `button-cap` | 13px | 700 | 0.94 | 1.17px | UPPERCASE | Button labels |
| `micro-cap` | 12px | 400 | 2.0 | 0.96px | UPPERCASE | Eyebrow / nav items |
| `caption` | 13px | 400 | 1.5 | 0 | sentence | Footer / helper |

### Responsive Scaling

- `display-xxl`: 80px → 60px (tablet) → 48px (mobile) → 40px (small mobile)
- `display-xl`: 60px → 48px (tablet) → 36px (mobile)
- `display-lg`: 48px → 36px (tablet) → 28px (mobile)

---

## 3. Spacing & Layout

### Spacing Scale

| Token | Value |
|---|---|
| `xxs` | 4px |
| `xs` | 8px |
| `sm` | 12px |
| `md` | 16px |
| `lg` | 18px |
| `xl` | 24px |
| `xxl` | 32px |
| `huge` | 48px |

### Layout Principles

- Full-bleed bands (full-width, bg extends edge-to-edge).
- Inner content constrained to ~1200px max-width, centered.
- Section vertical padding: `huge` (48px) top & bottom.
- No container margin on marketing sections — type column is the only constraint.

---

## 4. Border Radius

| Token | Value | Usage |
|---|---|---|
| `xs` | 4px | Form inputs |
| `sm` | 8px | Cards, containers |
| `md` | 16px | Larger surface chrome |
| `pill` | 32px | Ghost CTA buttons |
| `full` | 9999px | Reserved (not used yet) |

---

## 5. Components

### Buttons

**Ghost Pill CTA (primary — marketing sections)**
- Transparent background
- 1px solid `ink` (`#fff` dark / `#000` light)
- Text: `ink`
- `button-cap` typography (13px / 700 / 1.17px / UPPERCASE)
- Pill radius: 32px
- Padding: 18px 24px
- Hover: bg subtle `canvas-card` (optional), or just border brightness increase

**Filled Pill CTA (secondary — only on cards / forms)**
- Dark: `bg #0a0a0a`, text `#fff`, 1px `hairline` border
- Light: `bg #f0f0fa`, text `#000`, 1px `hairline` border
- Same typography & geometry as ghost

### Navbar

- Fixed top, transparent background (no bg color — text floats on canvas)
- Logo on left (or initials in uppercase `button-cap`)
- Nav items: uppercase `micro-cap`, 12px, 0.96px tracking
- Mobile: hamburger below 768px; dropdown with solid `canvas` bg
- No scroll progress bar
- No glass effect
- Sticky on scroll: stays transparent

### Hero

- `display-xxl` — name + tagline in uppercase, 80px, 1.6px tracking, 0.95 line-height
- Subtitle in `body-lg` (sentence-case, 16px)
- Single ghost pill CTA button
- Avatar: circular, flat (no glow/shadow/parallax)
- No count-up numbers
- No parallax orbs
- No magnetic effects

### About Section

- Eyebrow `micro-cap` (UPPERCASE, 12px)
- Heading `display-xl` (UPPERCASE, 60px)
- Body text `body-md`
- Skill tags: flat badges, border `hairline`, `rounded.sm`, `body-md`

### Skills Section

- Heading `display-xl`
- Grid of skill badges: border hairline, flat, `rounded.sm`, text `body-md`
- Retain tech stack icons (react-icons/si)
- Hapus bar chart animation, real-time simulation, glow hover
- Entrance: simple stagger fade-up

### Projects Section

- Heading `display-xl`
- Filter tabs: text-only (no animated indicator), uppercase `button-cap`, border-bottom active state
- Project cards: flat, border `hairline`, `rounded.sm` 8px, padding `md` 16px
- Card hover: subtle border color change (no scale, no glow)
- No accordion — expand on click or navigate to project detail
- Thumbnail image at top of card, flat (no shadow)

### Experience Section

- Heading `display-xl`
- Timeline: vertical line + dot, minimal
- Cards: flat, border `hairline`, `rounded.xs` 4px
- No stagger — simple fade-up on scroll

### Achievements Section

- Heading `display-xl`
- Simple list or flat cards with border hairline
- No glow, no animation beyond fade-up

### Playground Section

- Heading `display-xl`
- Card grid: flat cards, border `hairline`, `rounded.sm`
- Thumbnail + title + description
- No 3D flip animation
- Hover: border color change only

### Contact Section

- Heading `display-xl`
- Form inputs: `rounded.xs` 4px, 1px `hairline` border, padding 12px 16px, `body-md`
- Submit button: ghost pill CTA
- CopyEmail component retained (simplified, no decorative styling)

### Footer

- Background: `canvas` (`#000` / `#fff`)
- Text: `caption` (13px, sentence-case)
- Nav links: `micro-cap` (UPPERCASE)
- Padding: 32px 24px
- 1px `hairline` top border

### Removed Components

- **GlowCard** — replaced with flat card
- **Magnetic** — no magnetic hover displacement
- **FloatingDock** — no floating dock navigation
- **CountUp** — no animated counters
- **VisitorCounter** — removed (optional, confirm)
- **ScrollToTop** — removed (user scrolls naturally)

---

## 6. Icons

- **Retained:**
  - Tech stack icons (react-icons/si) for Skills section
  - GitHub, LinkedIn, Email icons in Contact / Footer
  - Chevron arrows for CTA hover or navigation
- **Removed:**
  - Decorative icons, animated icons, hover-rotate icons
  - Theme toggle icon can stay (Sun/Moon) — utilitarian

---

## 7. Animations (Minimal Entrance)

### Allowed

| Animation | Implementation |
|---|---|
| Fade-up on scroll | `opacity: 0→1`, `y: 16→0`, 0.5s ease-out |
| Stagger children | Max 100ms delay between items |
| Page entrance fade | On `<main>` mount |
| Text reveal | Simple opacity (no word-by-word spring) |
| Border hover | Color transition only |

### Removed

- `spring` physics transitions (use `easeOut: [0.16, 1, 0.3, 1]` instead)
- `parallax`, `scaleRotateIn`, `clipRevealUp`, `flipCard`, `timelineItem/Dot/Card`, `scaleIn`
- `Magnetic` displacement
- `GlowCard` mouse-tracking gradient
- `CountUp` number animation
- `FloatingDock` spring indicator
- `Navbar` scroll-based glass
- All `framer-motion` `layoutId` animated tab indicators

### Reduced Motion

- Respect `prefers-reduced-motion`
- Use Framer Motion's `useReducedMotion()` directly
- Remove `useReducedAnimation.ts` utility

---

## 8. Files to Modify

### Core Config & Styles

| File | Changes |
|---|---|
| `src/app/globals.css` | Rewrite `@theme` block: new color tokens, remove accent/glass/shadow classes, add D-DIN font-face, add typography token classes, remove glow/glass utilities |
| `src/app/layout.tsx` | Remove Inter + Plus Jakarta Sans font loading, add D-DIN self-hosted font loading, update font variables |
| `next.config.ts` | Possibly add `transpilePackages` if needed for font assets |

### Section Components

| File | Changes |
|---|---|
| `src/app/components/Hero.tsx` | Rewrite: flat display-xxl, no parallax/orbs/magnetic/countup, simple avatar, single ghost CTA |
| `src/app/components/About.tsx` | Flat badges, remove glow, adjust typography tokens |
| `src/app/components/Skills.tsx` | Flat badge grid, remove bar chart / real-time simulation / glow, retain icons |
| `src/app/components/Projects.tsx` | Flat cards, remove glow/hover-scale, simplify filter tabs |
| `src/app/components/Experience.tsx` | Simplify timeline, remove stagger |
| `src/app/components/Achievements.tsx` | Simple flat cards |
| `src/app/components/Playground.tsx` | Flat cards, remove 3D flip |
| `src/app/components/Contact.tsx` | Simplify form styling |
| `src/app/components/Footer.tsx` | Adjust colors/typography |

### Layout & Navigation

| File | Changes |
|---|---|
| `src/app/components/Navbar.tsx` | Transparent fixed, no glass/scroll-progress, uppercase micro-cap links |
| `src/app/components/ThemeProvider.tsx` | Retain but simplify tokens |
| `src/app/layout.tsx` | Apply new font, update meta |

### UI Primitives

| File | Changes |
|---|---|
| `src/app/components/ui/Button.tsx` | Rewrite: ghost pill variant, filled card variant, remove all decorative hover effects |
| `src/app/components/ui/GlowCard.tsx` | Delete or replace with `FlatCard.tsx` |
| `src/app/components/ui/Magnetic.tsx` | Delete |
| `src/app/components/ui/CountUp.tsx` | Delete |
| `src/app/components/ui/Reveal.tsx` | Simplify to basic observer fade-up |

### Utilities

| File | Changes |
|---|---|
| `src/app/utils/animations.ts` | Simplify: keep only `fadeUp`, `staggerContainer`, `staggerItem`, `easeOut` |
| `src/app/utils/useReducedAnimation.ts` | Delete (use `useReducedMotion` directly) |

### Data Files

| File | Changes |
|---|---|
| `src/app/data/projects.ts` | Possibly adjust — no changes needed unless project data format changes |
| `src/app/data/experience.ts` | No changes needed |
| `src/app/data/codeSnippets.ts` | No changes needed |

### Removed Files

- `src/app/components/ui/GlowCard.tsx`
- `src/app/components/ui/Magnetic.tsx`
- `src/app/components/ui/CountUp.tsx`
- `src/app/components/FloatingDock.tsx`
- `src/app/components/ScrollToTop.tsx`
- `src/app/components/KeyboardNav.tsx` (if present — confirm)
- `src/app/utils/useReducedAnimation.ts`

### New Files

- `public/fonts/D-DIN.woff2` (font files)
- `public/fonts/D-DIN-Bold.woff2`
- Possibly `src/app/components/ui/FlatCard.tsx` (replaces GlowCard)

---

## 9. Implementation Order

1. **Font setup** — download D-DIN free font, add to `public/fonts/`, update `layout.tsx` and `globals.css`
2. **globals.css rewrite** — color tokens, typography tokens, border radius, remove old utilities
3. **ThemeProvider** — simplify to `#000`/`#fff` palette
4. **Button component** — rewrite as ghost pill
5. **Navbar** — transparent, micro-cap, no glass/scroll-bar
6. **Hero** — flat display-xxl, simple avatar, ghost CTA
7. **About** — flat badges, adjusted typography
8. **Skills** — badge grid, remove sim/bar, retain icons
9. **Projects** — flat cards, simplify filter
10. **Experience** — minimal timeline
11. **Achievements** — simple cards
12. **Playground** — flat cards
13. **Contact** — minimal form, ghost CTA
14. **Footer** — adjust colors/typo
15. **Cleanup** — delete removed components, simplify animations.ts
16. **Test + verify** — build check, lint, manual review

---

## 10. Open Questions

- **VisitorCounter** — remove? Current implementation uses Upstash Redis. For minimalist design, this can be removed. Decision: **remove** unless user specifies otherwise.
- **KeyboardNav** — utility component for keyboard navigation. Can be retained as-is (adds accessibility without visual impact).
- **CopyEmail** — retained as-is (utilitarian, no decorative styling).
- **D-DIN free font** — need to source the actual `woff2` files. Popular free versions: "D-DIN" by Datto or the "DIN 1451" free alternatives. Will search for the best available free version.
