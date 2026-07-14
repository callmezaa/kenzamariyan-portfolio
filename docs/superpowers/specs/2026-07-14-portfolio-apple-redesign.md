# Portfolio Apple-Inspired Redesign

**Date:** 2026-07-14
**Status:** Approved Design

## Overview

Redesign Ken Zamariyan's portfolio from SpaceX/D-DIN industrial aesthetic to Apple-inspired clean, minimalist, premium design. Preserve existing content and section structure; overhaul visual language, typography, spacing, motion, and component styling.

## Design Principles

- **Less but Better** — every element serves a purpose
- **Depth through Shadow, not Border** — layered elevation replaces heavy borders
- **Typography-Centric** — Geist Sans + JetBrains Mono as foundation
- **Subtle Glassmorphism** — blur and transparency used sparingly, never decorative
- **Purposeful Motion** — spring-based animations that feel physical, not mechanical
- **Nuanced Dark** — dark slate canvas, not true black

## Visual Foundation

| Token | Current | New |
|-------|---------|-----|
| **Sans Font** | D-DIN (SpaceX) | Geist Sans — headings & body |
| **Mono Font** | — | JetBrains Mono — tech/skills/code contexts |
| **Canvas** | `#000` pure black | `#0a0a0a` dark slate |
| **Card Surface** | `#0a0a0a` | `#121212` with subtle gradient |
| **Elevation** | `border border-hairline` | Layered shadows (`shadow-lg`/`shadow-xl`) |
| **Radius** | `4px` (rounded-sm) | `14-16px` cards, `pill` buttons |
| **Navbar** | Solid bg + bottom border | Glass `backdrop-blur-xl`, floating |
| **Dividers** | Full-width hairline | Subtle section spacing via background shifts |
| **Motion** | `easeOut` cubic-bezier | Spring (stiffness 200-280, damping 20-30) |

### Color Palette

```css
--color-canvas: #0a0a0a;
--color-canvas-alt: #0f0f0f;       /* alternating section bg */
--color-canvas-card: #121212;
--color-canvas-glass: rgba(18,18,18,0.7);
--color-ink: #ffffff;
--color-ink-muted: #a1a1aa;
--color-ink-tertiary: #71717a;
--color-accent: #6366f1;            /* indigo-500 — minimal accent */
--color-shadow: rgba(0,0,0,0.5);
```

### Shadow System

```css
/* Card resting */
box-shadow: 0 4px 24px rgba(0,0,0,0.4);

/* Card hover */
box-shadow: 0 8px 40px rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.3);

/* Modal */
box-shadow: 0 25px 60px rgba(0,0,0,0.8);

/* Glass panel */
background: rgba(18,18,18,0.7);
backdrop-filter: blur(20px);
-webkit-backdrop-filter: blur(20px);
```

### Typography Scale

| Token | Size | Weight | Usage |
|-------|------|--------|-------|
| `.display-hero` | `clamp(44px, 6vw, 72px)` | 600 | Hero headline |
| `.display-xl` | `clamp(32px, 4.5vw, 52px)` | 600 | Section titles |
| `.display-lg` | `clamp(24px, 3vw, 36px)` | 500 | Card titles, subheadings |
| `.body-base` | `16px` | 400 | Paragraph text |
| `.body-small` | `14px` | 400 | Secondary text |
| `.label` | `12px` | 500 | Badges, metadata (uppercase, 0.08em) |
| `.mono-sm` | `13px` | 400 | Tech tags, code (JetBrains Mono) |

## Section Architecture (preserved order)

1. Hero
2. Projects
3. About
4. Skills
5. Achievements
6. Contact
7. Footer

All sections use alternating subtle background shifts (`canvas` → `canvas-alt` → `canvas`) to differentiate sections instead of hairline borders.

---

## 1. Hero Section

### Layout
- **Grid**: 12-column, 7/5 split (text left, photo right)
- **Spacing**: `py-32 md:py-40` (more generous than current)
- **Background**: `bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.03)_0%,transparent_50%)]`

### Elements
1. **Headline**: `display-hero`, Geist Sans weight 600, `leading-[1.05]`, `tracking-[-0.03em]`
2. **Subtitle**: `body-base`, `max-w-xl`, `text-ink-muted`
3. **CTAs**: Two pill buttons (`rounded-full`), glass bg (`bg-white/5 backdrop-blur-sm`), border `white/10` hover `white/20`
   - "Get in Touch" → opens Contact modal
   - "Download CV" → opens CV modal
4. **Profile Photo**: `w-[180px] h-[180px] lg:w-[220px] lg:h-[220px]`, `rounded-[16px]`, `shadow-lg shadow-black/50`, no ring/border. `object-cover object-[center_60%]`
5. **Animation**: Staggered spring entrance — headline (0s), subtitle (0.15s), CTAs (0.3s), photo (0.2s)

### States
- **Default**: Static, subtle gradient background
- **Hover on CTA**: Background lightens, slight `-translate-y-0.5`
- **Photo hover**: Scale 1.02, shadow deepens

---

## 2. Projects Section

### Layout
- **Background**: `canvas-alt` (`#0f0f0f`)
- **Header**: Section label, title, view toggle (grid/list pill buttons)
- **Grid**: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`

### Elements
1. **Section Label**: `label` class, Geist Sans uppercase
2. **Title**: `display-xl`
3. **Project Card**:
   - No border — `rounded-[14px]` overflow-hidden
   - Shadow: `shadow-lg shadow-black/40`
   - Hover: `-translate-y-2`, `shadow-xl shadow-black/60`
   - Mockup image with `hover:scale-105` transform
   - Info: title (`display-lg` size), stack tags (`pill` style), year + badge
4. **View Toggle**: Two pill icon buttons, active state filled
5. **"View All" Button**: Glass pill (`bg-white/5 backdrop-blur-sm rounded-full`)

### List View
- Glass card rows, `rounded-[12px]`, shadow subtle
- Hover: `translate-x-1`, shadow increase

---

## 3. About Section

### Layout
- **Background**: `canvas`
- **Grid**: 2-column asymmetric (~7/5 ratio), `gap-16 lg:gap-20`

### Elements
1. **Label + Title**: Geist Sans, `display-xl` title
2. **Bio**: `body-base`, `leading-relaxed`
3. **Info Cards**: 3 glass cards with subtle shadow, `rounded-[14px]`, `p-5`
   - Icon in `rounded-xl` container
   - Label bold, description muted
4. **Tech Arsenal**: Full-width borderless section at bottom
   - Divider via spacing + background shift, not border
   - Tech tags: JetBrains Mono, pill style

---

## 4. Skills Section

### Layout
- **Background**: `canvas-alt`
- **Grid**: `grid-cols-1 md:grid-cols-2 gap-6`

### Elements
1. **Category Card**: Glass, `rounded-[14px]`, `p-6`, shadow subtle
   - Hover: `-translate-y-1`, shadow increase
2. **Skill Row**: Flex layout with icon in pill container
   - Skill name: JetBrains Mono
   - Mastery bar: 1px height, `rounded-pill`, `bg-ink` fill
   - Bar animation: spring, viewport-triggered
3. **Icon**: Tech brand icon in `rounded-lg bg-white/5 p-1.5` container

---

## 5. Achievements Section

### Layout
- **Background**: `canvas`
- **Grid**: `grid gap-5 md:grid-cols-2 lg:grid-cols-3`

### Elements
1. **Certificate Card**: Glass, `rounded-[14px]`, shadow, overflow-hidden
   - Image preview: `aspect-[16/10]`, `rounded-t-[14px]`, overflow-hidden
   - Info section: pill-style date/badge
   - "View Details": arrow-animated link (not button)
2. **Modal**: `rounded-2xl`, `shadow-2xl shadow-black/80`, glass header
   - Image viewer: aspect-ratio container, pagination dots
   - Side panel: description + download/view links

---

## 6. Contact Section

### Layout
- **Background**: `canvas-alt`
- **Container**: Glass panel, `rounded-[20px]`, shadow, `p-8 md:p-12`

### Elements
1. **Headline**: "Let's Build" + "Something Elite" with spring cursor blink
2. **Subtitle**: Body text
3. **Contact CTA**: Glass pill row with photo, name, arrow
   - Hover: background lightens, arrow slides right
4. **Modal**: `rounded-2xl`, glass, shadow-2xl, blur backdrop
   - Contact links: glass rows with chevron

---

## 7. Footer

### Layout
- **Background**: Transparent (no border section)
- **Container**: `py-10`, flex between
- Copyright left, social icons right
- Social icons: pill containers, `rounded-full`, `bg-white/5`, `hover:bg-white/10`

---

## Motion System

### Spring Configuration
```tsx
// Apple spring presets
const appleSpring = { type: "spring" as const, stiffness: 250, damping: 25, mass: 0.8 };
const appleSpringSnappy = { type: "spring" as const, stiffness: 300, damping: 28 };
const appleSpringGentle = { type: "spring" as const, stiffness: 200, damping: 22 };
```

### Entrance Patterns
- **Hero**: Stagger children (delay: 0.1s between), spring entrance from y:20
- **Section reveals**: `whileInView` with spring, y offset 24px
- **Card lists**: Stagger by index (delay: 0.05s), spring
- **Modal**: Scale down from center, spring, backdrop blur fade

### Hover Patterns
- **Cards**: `-translate-y-1` to `-translate-y-2`, shadow transition
- **Buttons**: Background opacity shift, subtle transform
- **Links/CTAs**: Arrow animation (x offset)
- **Reduced motion**: All spring → opacity fades, no transforms

---

## Accessibility

- All interactive elements `focus-visible:ring-2 ring-ink`
- Touch targets minimum 44x44px on mobile
- Skip navigation link retained
- prefers-reduced-motion: disable spring transforms, keep opacity fades
- All icons have aria-labels
- Semantic heading hierarchy (h1 → h2 → h3)

---

## Implementation Order

1. **Global styling**: Update globals.css (fonts, CSS variables, theme tokens, base styles)
2. **Navbar**: Glass effect, border removal, mobile polish
3. **Hero**: Typography, spacing, shadow, radius, animation
4. **Projects**: Card glass/styling, shadow system, list view
5. **About**: Layout, glass info cards
6. **Skills**: Card styling, JetBrains Mono, mastery bar
7. **Achievements**: Card styling, modal polish
8. **Contact**: Glass panel, modal
9. **Footer**: Polish
10. **Animation audit**: Ensure spring consistency, reduced-motion support

---

## Anti-Patterns to Avoid

- ❌ Over-blur — glass should be subtle, not frosted
- ❌ Too many shadows — use elevation scale, not random
- ❌ Exaggerated motion — Apple animations are felt, not noticed
- ❌ Keeping borders on glass elements
- ❌ Mixed radius — consistent 14px for cards, pill for interactive
- ❌ True black (`#000`) backgrounds
