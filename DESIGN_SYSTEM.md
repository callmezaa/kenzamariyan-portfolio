# Ken Zamariyan — Portfolio Design System

## Design Principles

- **Less but Better** — setiap elemen harus memiliki tujuan yang jelas
- **Modern Minimalism** — clean layout, purposeful whitespace, reduced visual noise
- **Accessibility First** — contrast, keyboard navigation, screen reader support
- **Motion with Purpose** — setiap animasi memperkuat UX, bukan sekedar hiasan
- **Visual Consistency** — satu sistem, satu bahasa visual
- **Strong Information Hierarchy** — pengguna tahu apa yang penting tanpa harus berpikir
- **Premium Digital Experience** — kualitas setara Vercel, Linear, Stripe

---

## 1. Typography

### Font Stack

| Role | Font | Weight | Fallback |
|------|------|--------|----------|
| Display/Headings | Plus Jakarta Sans | 300–800 | system-ui, sans-serif |
| Body/Sans | Inter | 300–700 | system-ui, -apple-system, sans-serif |

### Type Scale

| Token | Size | Weight | Line Height | Letter Spacing | Usage |
|-------|------|--------|-------------|----------------|-------|
| `.hero-display` | `clamp(40px, 7vw, 76px)` | 700 | 1.05 | -0.03em | Hero headline |
| `.display-lg` | `clamp(28px, 4vw, 44px)` | 700 | 1.15 | -0.02em | Section titles |
| `.display-md` | `clamp(22px, 3.5vw, 32px)` | 600 | 1.25 | -0.015em | Card titles, subheadings |
| `.body-base` | `clamp(15px, 1.2vw, 17px)` | 400 | 1.6 | -0.01em | Paragraph text |
| `.body-small` | `13px` | 400 | 1.5 | — | Secondary text, descriptions |
| `.label` | `10–12px` | 600 | 1.2 | 0.05em | Badges, tags, meta (uppercase) |

### Text Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--text-primary` | `#fafafa` (zinc-50) | Headings, primary text on dark |
| `--text-secondary` | `#d4d4d8` (zinc-300) | Body text |
| `--text-tertiary` | `#a1a1aa` (zinc-400) | Muted body, metadata |
| `--text-muted` | `#71717a` (zinc-500) | Labels, placeholders, disabled |

---

## 2. Color Palette

### Base Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--color-canvas` | `#030303` | Page background |
| `--color-canvas-card` | `#09090b` | Card surface |
| `--color-canvas-card-hover` | `#121214` | Card hover state |
| `--color-surface-tile-1` | `#09090b` | Tile level 1 |
| `--color-surface-tile-2` | `#121214` | Tile level 2 |
| `--color-surface-tile-3` | `#18181b` | Tile level 3 |

### Accent Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--color-primary` | `#6366f1` (indigo-500) | Interactive elements, focus rings |
| `--color-primary-focus` | `#818cf8` (indigo-400) | Focus visible outline |
| `--color-primary-on-dark` | `#a5b4fc` (indigo-300) | Text on dark backgrounds |
| `--color-success` | `#34d399` (emerald-400) | Success states, indicators |
| `--color-warning` | `#fbbf24` (amber-400) | Warnings |

### Utility Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--color-divider-soft` | `rgba(255,255,255,0.06)` | Subtle dividers |
| `--color-hairline` | `rgba(255,255,255,0.08)` | Borders |
| `--color-surface-chip` | `rgba(255,255,255,0.08)` | Badge backgrounds |

---

## 3. Spacing

### Section Padding

```
Mobile:  py-16   (64px)
Tablet:  py-24   (96px)
Desktop: py-28   (112px)
```

### Card Padding

```
All breakpoints: p-5 md:p-6  (20px / 24px)
```

### Gap System

| Context | Value |
|---------|-------|
| Content gap | `gap-6 md:gap-8 lg:gap-10` |
| Stack gap (vertical) | `space-y-4 md:space-y-6` |
| Grid gap (cards) | `gap-6` |

---

## 4. Layout

### Max Widths

| Context | Value |
|---------|-------|
| Page content | `max-w-6xl` (1152px) + `px-6 md:px-8` |
| Navigation | `max-w-5xl` (1024px) + `px-4` |
| Section headers | `max-w-2xl` |

### Grid System

- Section layouts: `grid-cols-12` with `lg:gap-20` or `gap-16`
- Card grids: `grid-cols-1 md:grid-cols-2`
- Project cards: Alternating 7/5 or 6/6 split

---

## 5. Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-xs` | `6px` | Small UI elements |
| `--radius-sm` | `10px` | Inputs, small cards |
| `--radius-md` | `14px` | Standard cards |
| `--radius-lg` | `20px` | Large cards, modals |
| `--radius-pill` | `9999px` | Buttons, badges, nav |

---

## 6. Shadows

### Surface Shadows

- **Card resting**: `shadow-lg shadow-black/40`
- **Card hover**: `shadow-xl shadow-black/60`
- **Product shadow**: `0 25px 50px -12px rgba(0,0,0,0.75)`
- **Modal**: `shadow-2xl shadow-black/80`

### Glassmorphism

```css
.glass-panel {
  background: rgba(10, 10, 12, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.05);
}
```

---

## 7. Component Standards

### Button

| Variant | Background | Text | Border | Hover |
|---------|-----------|------|--------|-------|
| Primary | `bg-white` | `text-black` | — | `bg-zinc-200` |
| Secondary | `bg-white/5` | `text-white` | `border-white/10` | `bg-white/10 border-white/20` |
| Ghost | `bg-transparent` | `text-zinc-400` | — | `text-white bg-white/5` |

**Sizes**: `sm` (px-4 py-1.5), `md` (px-6 py-3, default), `lg` (px-8 py-4)

### Badge

```tsx
<Badge variant="default" />  // Standard info
<Badge variant="success" />  // Green, for live/available
<Badge variant="warning" />  // Yellow/amber
<Badge variant="brand" />    // Per-project accent color
```

### Tech Tags

Standard: `rounded-md border border-white/5 bg-white/5 px-2.5 py-1 text-[10px]`

---

## 8. Motion & Animation

### Easing Curve

```
cubic-bezier(0.16, 1, 0.3, 1)  —  Snappy ease-out (default)
cubic-bezier(0.22, 1, 0.36, 1) —  Softer reveal
```

### Durations

| Context | Duration |
|---------|----------|
| Entrance reveals | 0.7–0.8s |
| Hover transitions | 0.2–0.3s |
| Stagger delay | 0.05–0.1s |
| Spring stiffness | 100–280 (per context) |

### Animation Patterns

- **Hero**: Stagger children (0.1s delay), fade-up 15px
- **Section reveals**: Fade-up 15–24px, `whileInView`
- **Cards**: Stagger by card index
- **Hover**: Scale 1.02–1.05, glow reveal, border color shift
- **Navigation**: Layout animation for indicator, color transition 250ms
- **Reduced motion**: Respect `prefers-reduced-motion` — disable all spring/mouse-tracking animations, retain only opacity fades

---

## 9. Section Architecture (Revised Order)

```
1. Hero          — Full viewport, strong value prop, credibility strip
2. About         — Personal narrative, scroll-glow text, capability cards
3. Skills        — Bento grid, interactive widgets (compact)
4. Projects      — 4-5 featured case studies with mockups
5. Experience    — Timeline, career journey
6. More Projects — Compact list, link to GitHub
7. Contact       — Form, scheduling, availability
```

---

## 10. Accessibility Standards

- **Color contrast**: Minimum 4.5:1 for normal text, 3:1 for large text (WCAG AA)
- **Focus indicators**: Always visible via `focus-visible:ring-2`
- **Skip navigation**: First focusable element
- **Form validation**: `aria-invalid`, `aria-describedby`, `role="alert"`
- **Text selection**: Enabled on all readable content
- **Motion**: Respect `prefers-reduced-motion`
- **Semantic HTML**: Proper heading hierarchy (h1→h2→h3), landmark elements

---

## 11. Responsive Breakpoints

| Breakpoint | Width | Behavior |
|-----------|-------|----------|
| Mobile (default) | < 768px | Single column, compact padding |
| Tablet (md) | ≥ 768px | 2-column grids, increased padding |
| Desktop (lg) | ≥ 1024px | Full 12-column grid, larger mockups |
| Wide (xl) | ≥ 1280px | Max width constraint active |

---

## 12. Performance Guidelines

- **Motion**: Prefer Framer Motion's `useMotionValue` over `useState` for animations to avoid re-renders
- **Images**: Use Next.js `Image` component with proper sizing and lazy loading
- **Icons**: Import individual icons (tree-shakeable)
- **Fonts**: Self-host with `next/font` instead of Google Fonts CDN
- **Bundle**: Lazy-load interactive widgets with `next/dynamic` if below fold
- **Animations**: Disable on `prefers-reduced-motion` to save resources
