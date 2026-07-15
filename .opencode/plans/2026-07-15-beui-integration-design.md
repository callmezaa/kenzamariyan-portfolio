# beUI Integration — Portfolio Enhancement Design

**Date:** 2026-07-15
**Status:** Approved

## Overview

Integrate beUI (https://beui.dev) animated components into the existing portfolio to enhance motion quality, interactivity, and visual polish — while preserving the current dark theme and design system (canvas/ink colors, glass morphism, Geist font).

## Approach

Layer-by-layer in 5 phases:

1. **Foundation** — Install all components + dependencies + SmoothScroll provider
2. **Navigation & Global** — Drawer, ThemeToggle, Tooltip
3. **Hero** — ShaderBackground, TextReveal, Marquee, MagneticButton
4. **Sections** — TiltCard, BouncyAccordion, StatefulButton, Toast
5. **Polish** — NotFound, Loader, CommandPalette, ScrollProgress

---

## Phase 1: Foundation

### Components to Install

```bash
npx shadcn@latest add @beui/text-reveal
npx shadcn@latest add @beui/text-shimmer
npx shadcn@latest add @beui/text-cascade
npx shadcn@latest add @beui/shader-background
npx shadcn@latest add @beui/marquee
npx shadcn@latest add @beui/button-base
npx shadcn@latest add @beui/button-stateful
npx shadcn@latest add @beui/button-magnetic
npx shadcn@latest add @beui/tilt-card
npx shadcn@latest add @beui/theme-toggle
npx shadcn@latest add @beui/tooltip
npx shadcn@latest add @beui/drawer
npx shadcn@latest add @beui/bouncy-accordion
npx shadcn@latest add @beui/animated-toast-stack
npx shadcn@latest add @beui/number-ticker
npx shadcn@latest add @beui/animated-number
npx shadcn@latest add @beui/smooth-scroll
npx shadcn@latest add @beui/scroll-reveal
npx shadcn@latest add @beui/scroll-progress
npx shadcn@latest add @beui/loader
npx shadcn@latest add @beui/not-found-glitch
npx shadcn@latest add @beui/expandable-tabs
npx shadcn@latest add @beui/command-palette
npx shadcn@latest add @beui/parallax
```

### Dependencies

- `motion` — beUI imports from `motion/react`
- `@paper-design/shaders-react` — ShaderBackground
- `lenis` — SmoothScroll
- `next-themes` — ThemeToggle

### Layout Changes

`src/app/layout.tsx`:
- Wrap children with `<SmoothScroll>` provider
- Add `<ScrollProgress>` bar
- Add `<CommandPalette>`

---

## Phase 2: Navigation & Global

### 2a. Drawer — Mobile Navigation

**File:** `src/app/components/Navbar.tsx`

- Remove `AnimatePresence` mobile menu block (lines 139-170)
- Replace with `<Drawer side="right">` from beUI
- Remove scroll-lock useEffect (Drawer handles it)
- Desktop nav stays unchanged

### 2b. ThemeToggle

**File:** `src/app/components/Navbar.tsx`, `src/app/components/ThemeProvider.tsx`

- Replace Sun/Moon button with `<ThemeToggle variant="rectangle" start="bottom-up">`
- Migrate from custom ThemeProvider to `next-themes`

### 2c. Tooltip

**File:** `src/app/components/Navbar.tsx`

- Wrap social icons + theme toggle with `<Tooltip content="..." side="bottom">`

---

## Phase 3: Hero

**File:** `src/app/components/Hero.tsx`

### 3a. ShaderBackground
Replace radal-gradient div with:
```tsx
<ShaderBackground variant="mesh-gradient" className="absolute inset-0"
  colors={["#0a0a0f", "#1a1a2e", "#16213e", "#0f3460"]} />
```

### 3b. TextReveal
Replace `motion.h1`:
```tsx
<TextReveal as="h1" text={["Products shipped.", "Problems solved.", "No fluff."]}
  className="display-hero" split="word" stagger={0.08} blur={8} yOffset="20%" />
```

### 3c. Marquee
Replace custom CSS marquee with `<Marquee speed={25} fade={true}>`

### 3d. MagneticButton
Wrap CTAs with `<MagneticButton variant="primary" strength={0.3}>`

### 3e. Loader
Replace inline CSS spinner in CV dialog with `<Loader variant="spinner" size={24} />`

---

## Phase 4: Sections

### 4a. Projects — TiltCard

**File:** `src/app/components/Projects.tsx`

Wrap project cards with `<TiltCard max={8} glare={true}>`. Remove manual `whileHover`.

### 4b. Experience — BouncyAccordion

**File:** `src/app/components/Experience.tsx`

Replace `<Accordion>` with `<BouncyAccordion>`. Keep filter buttons (they filter the data).

### 4c. Skills — Tooltip + AnimatedNumber

**File:** `src/app/components/Skills.tsx`

Add `<Tooltip>` to skill items. Replace mastery bar width with `<AnimatedNumber>`.

### 4d. Contact — StatefulButton + AnimatedToastStack

**File:** `src/app/components/Contact.tsx`

- Replace submit button with `<StatefulButton>`
- Add `<AnimatedToastStack>` for success/error notifications
- Remove inline success state view

---

## Phase 5: Polish

### 5a. NotFound — Glitch 404

**New File:** `src/app/not-found.tsx`
```tsx
import { NotFoundGlitch } from "@/components/motion/not-found/glitch";
export default function NotFound() { return <NotFoundGlitch />; }
```

### 5b. Command Palette — ⌘K

Add `<CommandPalette>` to layout. Sections + projects + social links.

### 5c. ScrollProgress

Add `<ScrollProgress variant="bar" position="bottom" height={3} />` to layout.

---

## Design Compatibility

- **Theme:** beUI uses Tailwind classes (`bg-card`, `text-foreground`) — shadcn v4 CSS vars already defined
- **Font:** Geist + JetBrains Mono — inherited
- **Radius:** Existing radii compatible
- **Reduced motion:** beUI respects `prefers-reduced-motion`

## File Change Summary

| File | Action | Phase |
|------|--------|-------|
| `package.json` | Add deps | 1 |
| `src/app/layout.tsx` | SmoothScroll + CommandPalette + ScrollProgress | 1, 5 |
| `src/app/not-found.tsx` | New — NotFoundGlitch | 5 |
| `src/app/components/Navbar.tsx` | Drawer + ThemeToggle + Tooltip | 2 |
| `src/app/components/ThemeProvider.tsx` | Migrate to next-themes | 2 |
| `src/app/components/Hero.tsx` | ShaderBackground, TextReveal, Marquee, MagneticButton, Loader | 3 |
| `src/app/components/Projects.tsx` | TiltCard | 4 |
| `src/app/components/Experience.tsx` | BouncyAccordion | 4 |
| `src/app/components/Skills.tsx` | Tooltip, AnimatedNumber | 4 |
| `src/app/components/Contact.tsx` | StatefulButton, AnimatedToastStack | 4 |

## Verification

After each phase:
1. `bun run check` — TypeScript + lint
2. `bun run build` — production build
3. Manual review — no console errors, all animations working
