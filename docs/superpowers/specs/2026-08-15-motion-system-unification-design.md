# Motion System Unification

**Date:** 2026-08-15
**Status:** Approved Design

## Overview

Upgrade Ken Zamariyan's portfolio interaction quality through a unified, centralized motion system. Fixes three pain points the owner identified while using the site: flat hover states, monotonous scroll reveals, and rigid page transitions. Keeps the existing clean & responsive aesthetic (Apple/Linear/Vercel-inspired), preserving section structure and content. No new dependencies.

## Design Principles

- **One source of truth** — motion presets, easing, and durations live in a single module imported everywhere.
- **Clean & responsive** — motion is felt, not noticed. Fast springs, restrained duration, minimal excess.
- **Primitives over one-offs** — reusable components replace scattered `whileHover` / `whileInView` implementations.
- **Safe by default** — every effect respects `prefers-reduced-motion` and touch devices (`useHoverCapable`).
- **Performance discipline** — only `transform`, `opacity`, and cheap `clip-path` animations; `once: true` reveals.

## Architecture

```
src/lib/
├── motion.ts              # Single source: easings + springs + durations
└── (ease.ts re-exports from motion.ts to avoid breaking imports)

src/components/motion/
├── reveal/
│   ├── Reveal.tsx          # Universal reveal primitive (variant prop)
│   └── variants.ts         # Variant registry (fade, rise, mask, blur, scale, word)
├── hover/
│   ├── SpotlightCard.tsx   # Cursor-follow spotlight + smart shadow + border glow
│   ├── Magnetic.tsx        # Cursor-attraction wrapper for primary CTAs
│   └── ArrowSlide.tsx      # Reusable arrow-slide pattern for links/buttons
└── transition/
    └── PageTransition.tsx  # View Transitions wrapper + AnimatePresence fallback
```

## Motion Tokens (`src/lib/motion.ts`)

Consolidated from `src/lib/ease.ts` and `src/app/utils/animations.ts`. Existing exports preserved for backwards compatibility.

### Easing
| Token | Curve | Use |
|-------|-------|-----|
| `EASE_OUT` | `[0.16, 1, 0.3, 1]` | Productive/standard easing |
| `EASE_IN_OUT` | `[0.77, 0, 0.175, 1]` | Dramatic entrance |
| `EASE_EXPO` (new) | `[0.87, 0, 0.13, 1]` | Mask/clip reveals, high-impact entrances |
| `EASE_DRAWER` | `[0.32, 0.72, 0, 1]` | Sheets/panels |

### Springs
| Token | Config | Use |
|-------|--------|-----|
| `SPRING_PRESS` | stiffness 500, damping 30, mass 0.6 | Press feedback |
| `SPRING_SWAP` | stiffness 460, damping 30, mass 0.55 | Content swaps |
| `SPRING_PANEL` | stiffness 420, damping 40, mass 0.5 | Overlay panels |
| `SPRING_LAYOUT` | stiffness 360, damping 32, mass 0.6 | Shared-layout glides |
| `SPRING_MOUSE` | stiffness 200, damping 15, mass 0.3 | Cursor-follow physics |
| `SPRING_HOVER` (new) | stiffness 400, damping 28, mass 0.5 | All hover interactions |

### Durations (new constants)
| Token | Value | Use |
|-------|-------|-----|
| `DURATION_FAST` | 0.2s | Micro-interactions, hover, state swaps |
| `DURATION_MED` | 0.35s | Standard entrances, small reveals |
| `DURATION_SLOW` | 0.6s | Large reveals, masks, page transitions |

No inline easing/duration hardcodes in new components — always import from `@/lib/motion.ts`.

## Hover System

Three reusable primitives replace all scattered `whileHover={{ y: -2 }}` / `scale: 1.02` patterns.

### `SpotlightCard` (all cards)
- **Cursor-follow spotlight**: radial highlight tracks the pointer inside the card (reuses pattern from Hero avatar, made reusable).
- **Smart shadow**: shadow strengthens and shifts subtly with hover direction; card lifts `y: -3` via `SPRING_HOVER`.
- **Border glow**: thin `border-hairline` edge lights up toward the pointer corner — dark mode only, low opacity, decorative.
- Cursor-follow disabled on touch devices and reduced motion via existing `useHoverCapable`.

**Applied to:** About info cards, Skill cards, Achievement cards, Exploration cards, project cards (grid view).

### `Magnetic` (primary CTAs)
- Target links/buttons are attracted toward the cursor (±6px), spring back on leave.
- Used sparingly — only primary CTAs: Get in Touch, Download CV, View All.

### `ArrowSlide` (links/buttons with arrows)
- Arrow translates further (+4px) with spring; label shifts subtly.
- Used in: View All buttons, View Details (Achievements), social links.

## Scroll Reveal System

Universal `Reveal` primitive with a variant registry. All reveals remain `whileInView` + `once: true`. Redundant nested reveals removed (single reveal per container where possible).

### Variant Registry
| Variant | Motion | Use |
|---------|--------|-----|
| `fade` | opacity only | small/decorative elements |
| `rise` | opacity + y:24 | paragraphs, cards |
| `mask` | clip-path bottom reveal (curtain) | section headings, project images — most impactful |
| `blur` | opacity + blur 8px→0 | large headings only (used sparingly) |
| `scale` | scale 0.96→1 | card grids |
| `word` | per-word stagger | large headlines (reusable version of Hero) |

### Section Mapping
| Section | Heading | Content |
|---------|---------|---------|
| Hero | `word` (existing) | unchanged |
| Projects | `mask` | `rise` + stagger |
| About | `mask` | `fade` (info cards), `rise` (stats) |
| Skills | `rise` | `scale` (cards), stagger |
| Experience | `mask` | accordion (existing) |
| Achievements | `mask` | `rise` + stagger |
| Exploration | `rise` | `scale` (grid) |
| Contact | `word` (2-line heading) | `rise` |

## Page Transitions

### View Transitions API (primary, no dependency)
- Enable Next.js view transitions (`experimental.viewTransition` config, or `viewTransition` prop on `Link`).
- `PageTransition` component wraps `children` in `LayoutClient.tsx`.
- **Fade-through (default)**: old page fades (opacity + slight y), new page rises in. ~0.25s, `EASE_OUT`.
- **Shared-element (project routes)**: project card image on Home expands into hero image on detail page via `view-transition-name` — the signature effect.

### Fallback
- Browsers without View Transitions API (older Safari): automatic fallback to a simple fade via `AnimatePresence` + `usePathname`. No regression.
- Reduced motion: transitions skipped entirely.

### Technical note
Verify at implementation time whether `experimental.viewTransition` works cleanly with next-intl + middleware routing. If it conflicts, fall back fully to the AnimatePresence + pathname approach.

## Accessibility

- All new primitives respect `prefers-reduced-motion`: spotlight/magnet/mask disabled, reveals become plain opacity fades, page transitions skipped.
- Touch devices: all cursor-follow effects off (`useHoverCapable`) — no phantom hover.
- Existing focus-visible rings unchanged. New components add no new interactive elements needing extra aria.
- Spotlight/border-glow are decorative with low opacity; text contrast unaffected.

## Performance

- Animations use `transform` + `opacity` only, plus cheap `clip-path` for masks.
- `will-change` set only while animating, then removed.
- Reveals are `once: true` — nothing animates repeatedly off-screen.
- SpotlightCard uses `useMotionValue` + `useMotionTemplate` (no per-frame re-render), same pattern as Hero.
- View Transitions are free (browser-native).

## Verification

1. `npm run lint` — zero errors.
2. `npm run build` — success, no static-generation regression.
3. Manual browser test:
   - Full scroll in dark and light mode.
   - Navigation Home → /projects → /projects/[slug] (check shared-element transition).
   - Safari (fallback fade) and mobile (hover off).
   - DevTools Performance — no jank.
4. Verify View Transition ↔ next-intl routing compatibility.

## Out of Scope

- No section structure/content changes.
- No new color/typography system changes.
- No new dependencies.
