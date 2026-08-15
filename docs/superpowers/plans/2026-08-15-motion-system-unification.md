# Motion System Unification Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade the portfolio's interaction quality via a unified motion system — richer hover states, varied scroll reveals, and smooth page transitions — keeping the existing clean & responsive Apple/Linear/Vercel aesthetic, without new dependencies or content changes.

**Architecture:** Consolidate all motion tokens into one module (`src/lib/motion.ts`); build reusable `Reveal` (variants), `SpotlightCard`, `Magnetic`, `ArrowSlide` primitives; apply a section-to-variant reveal map; implement page transitions with the native View Transitions API (`document.startViewTransition`) so a project card image morphs into the detail hero. Everything respects `prefers-reduced-motion` and touch devices via the existing `useHoverCapable` hook.

**Tech Stack:** Next.js 16.1.1 (App Router), React 19.2.3, TypeScript 5.9, Motion (`motion/react` v12), Tailwind CSS v4, next-intl. No test framework is installed — verification is `npm run lint` + `npm run build` + manual browser checks (spec's Verification section).

**Spec:** `docs/superpowers/specs/2026-08-15-motion-system-unification-design.md`

## Global Constraints

> **Controller resolutions (2026-08-15, approved by human):**
> - **Drop the `blur` reveal variant** (Task 2). It animated `filter: blur()` which violates Constraint #4; it is unused by any section (headings use the existing `TextReveal` `word` variant). Registry is `fade | rise | mask | scale` only.
> - **Drop `will-change: transform`** from the `.vt-project-image` CSS (Task 7). The transition itself animates it; honors "will-change only while animating".
> - **Per-slug `view-transition-name`** (Task 7, post-review). The single shared `vt-project-image` name violates the CSS View Transitions spec's uniqueness requirement (duplicate names → the browser captures only the last matching element, so the morph starts from the wrong card). Cards use inline `style={{ viewTransitionName: 'vt-' + project.slug }}` and the detail hero uses the matching `'vt-' + project.slug`. The `.vt-project-image` CSS class is dropped (unused).

- Import all easing/springs/durations from `@/lib/motion` in any new or modified motion code — **no inline easing/duration hardcodes**.
- Respect `prefers-reduced-motion` in every new primitive: cursor-follow/mask/magnet disabled, reveals become plain opacity fades, page transitions skipped.
- Respect touch devices: gate all cursor-follow effects behind the existing `useHoverCapable` hook.
- Animations use `transform` + `opacity` only (plus cheap `clip-path` for masks); `will-change` only while animating.
- Reveals use `once: true` — nothing animates repeatedly off-screen.
- **No new dependencies.** React 19.2.3 stable does NOT export `ViewTransition`; page transitions MUST use the native `document.startViewTransition` browser API with graceful fallback (no-op navigation when unsupported).
- Run `npm run lint` (zero errors) and `npm run build` (success) after each task.
- Commit after each task with a message matching repo style (e.g. `feat: ...`, `refactor: ...`).

---

### Task 1: Consolidate motion tokens into `src/lib/motion.ts`

**Files:**
- Create: `src/lib/motion.ts`
- Modify: `src/lib/ease.ts` (replace body with re-export)
- Modify: `src/app/utils/animations.ts`

**Interfaces:**
- Consumes: nothing (foundation task).
- Produces: `EASE_OUT`, `EASE_IN_OUT`, `EASE_EXPO`, `EASE_DRAWER`, `EASE_OUT_CSS`, `DURATION_FAST`, `DURATION_MED`, `DURATION_SLOW`, `SPRING_PRESS`, `SPRING_SWAP`, `SPRING_PANEL`, `SPRING_LAYOUT`, `SPRING_MOUSE`, `SPRING_HOVER` — all from `@/lib/motion`.

- [ ] **Step 1: Create `src/lib/motion.ts`**

```ts
/**
 * Single source of truth for motion tokens.
 * New components must import from here — no inline easing/durations.
 */

export const EASE_OUT = [0.16, 1, 0.3, 1] as const;
export const EASE_IN_OUT = [0.77, 0, 0.175, 1] as const;
export const EASE_EXPO = [0.87, 0, 0.13, 1] as const;
export const EASE_DRAWER = [0.32, 0.72, 0, 1] as const;

/** CSS string form of EASE_OUT for inline style transitions. */
export const EASE_OUT_CSS = "cubic-bezier(0.16, 1, 0.3, 1)";

/** Micro-interactions, hover, state swaps. */
export const DURATION_FAST = 0.2;
/** Standard entrances, small reveals. */
export const DURATION_MED = 0.35;
/** Large reveals, masks, page transitions. */
export const DURATION_SLOW = 0.6;

/** Press feedback on buttons and other tappable surfaces. */
export const SPRING_PRESS = {
  type: "spring",
  stiffness: 500,
  damping: 30,
  mass: 0.6,
} as const;

/** Content swaps — label/icon slots trading places inside a control. */
export const SPRING_SWAP = {
  type: "spring",
  stiffness: 460,
  damping: 30,
  mass: 0.55,
} as const;

/** Overlay panel entrances — modals and sheets summoned by pointer. */
export const SPRING_PANEL = {
  type: "spring",
  stiffness: 420,
  damping: 40,
  mass: 0.5,
} as const;

/** Shared-layout glides — pills, indicators and panels morphing between positions. */
export const SPRING_LAYOUT = {
  type: "spring",
  stiffness: 360,
  damping: 32,
  mass: 0.6,
} as const;

/** Cursor-follow physics for decorative mouse tracking (magnetic, tilt, dock). */
export const SPRING_MOUSE = {
  stiffness: 200,
  damping: 15,
  mass: 0.3,
} as const;

/** All hover interactions — snappy but soft. */
export const SPRING_HOVER = {
  type: "spring",
  stiffness: 400,
  damping: 28,
  mass: 0.5,
} as const;
```

- [ ] **Step 2: Replace `src/lib/ease.ts` body with a re-export**

Replace the entire contents of `src/lib/ease.ts` with:

```ts
export * from "./motion";
```

Verify no other file breaks: `EASE_OUT_CSS` and all other tokens are re-exported through `ease.ts`, so the ~19 existing `@/lib/ease` importers keep working.

- [ ] **Step 3: Update `src/app/utils/animations.ts` to consume the consolidated tokens**

Keep this file's apple-spring variants (used by Hero, Contact, Experience) but drop the duplicated `easeOut` constant. Replace the top of the file:

```ts
import type { Variants, Transition } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";

export const appleSpring: Transition = {
  type: "spring",
  stiffness: 250,
  damping: 25,
  mass: 0.8,
};

export const appleSpringSnappy: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 28,
};

export const appleSpringGentle: Transition = {
  type: "spring",
  stiffness: 200,
  damping: 22,
};

export const easeOut = EASE_OUT;
```

The rest of `animations.ts` (fadeUpSpring, fadeIn, staggerContainer, staggerItem) is unchanged.

- [ ] **Step 4: Verify lint and build**

Run: `npm run lint`
Expected: no errors.

Run: `npm run build`
Expected: success, no static-generation regression.

- [ ] **Step 5: Commit**

```bash
git add src/lib/motion.ts src/lib/ease.ts src/app/utils/animations.ts
git commit -m "refactor: consolidate motion tokens into src/lib/motion.ts"
```

---

### Task 2: Create `Reveal` primitive + variant registry

**Files:**
- Create: `src/components/motion/reveal/variants.ts`
- Create: `src/components/motion/reveal/Reveal.tsx`

**Interfaces:**
- Consumes: `EASE_OUT`, `DURATION_MED`, `DURATION_SLOW`, `EASE_EXPO` from `@/lib/motion`; `cn` from `@/lib/utils`.
- Produces:
  - `type RevealVariant = "fade" | "rise" | "mask" | "scale"`
  - `function Reveal({ children, variant, delay, duration, amount, className }): JSX.Element`
  - `const revealVariants: Record<RevealVariant, Variants>`
- Note: the `word` variant from the spec is already fulfilled by the existing `TextReveal` component (`src/components/motion/text-reveal.tsx`) — no new variant needed; the section map uses `TextReveal` directly for word-staggered headlines (Hero existing, Contact in Task 4).

- [ ] **Step 1: Create `src/components/motion/reveal/variants.ts`**

```ts
import type { Variants } from "motion/react";

export type RevealVariant = "fade" | "rise" | "mask" | "scale";

/** Per-variant hidden/visible states. Reduced motion handled by Reveal.tsx. */
export const revealVariants: Record<RevealVariant, Variants> = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  rise: {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  },
  mask: {
    hidden: { clipPath: "inset(0 0 100% 0)" },
    visible: { clipPath: "inset(0 0 0% 0)" },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.96 },
    visible: { opacity: 1, scale: 1 },
  },
};
```

- [ ] **Step 2: Create `src/components/motion/reveal/Reveal.tsx`**

```tsx
"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { type ReactNode } from "react";
import { EASE_OUT, DURATION_MED, DURATION_SLOW } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { revealVariants, type RevealVariant } from "./variants";

export interface RevealProps {
  children: ReactNode;
  variant?: RevealVariant;
  /** Delay in seconds before the reveal starts. */
  delay?: number;
  /** Animation duration in seconds. mask defaults to DURATION_SLOW (0.6). */
  duration?: number;
  /** Portion of the element that must be visible to trigger. */
  amount?: number;
  className?: string;
}

export function Reveal({
  children,
  variant = "rise",
  delay = 0,
  duration,
  amount = 0.3,
  className,
}: RevealProps) {
  const reduce = useReducedMotion();
  const v = reduce
    ? ({ hidden: { opacity: 0 }, visible: { opacity: 1 } } as Variants)
    : revealVariants[variant];

  return (
    <motion.div
      variants={v}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      transition={{ duration: duration ?? (variant === "mask" ? DURATION_SLOW : DURATION_MED), ease: EASE_OUT, delay }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 3: Verify lint and build**

Run: `npm run lint` — expected: no errors.
Run: `npm run build` — expected: success.

- [ ] **Step 4: Commit**

```bash
git add src/components/motion/reveal
git commit -m "feat: add Reveal primitive with variant registry"
```

---

### Task 3: Apply reveal variants — Projects, About, Skills

**Files:**
- Modify: `src/app/components/Projects.tsx`
- Modify: `src/app/components/About.tsx`
- Modify: `src/app/components/Skills.tsx`

**Interfaces:**
- Consumes: `Reveal` from `@/components/motion/reveal/Reveal`; `TextReveal` from `@/components/motion/text-reveal` (if a section already uses it).

- [ ] **Step 1: Projects.tsx — header `mask`, grid items `rise` + stagger**

Add import:

```tsx
import { Reveal } from "@/components/motion/reveal/Reveal";
```

Replace the header `motion.div` block (currently `initial={{ opacity: 0, y: 12 }} whileInView=...` wrapping label + heading) with:

```tsx
<Reveal variant="mask" className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
  <div className="space-y-3">
    <p className="label text-ink-muted">{t('label')}</p>
    <h2 className="display-xl text-balance">{t('heading')}</h2>
  </div>
  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
    {/* category tabs + view toggle — unchanged */}
  </div>
</Reveal>
```

Replace the grid-item wrapper `motion.div` (grid view, currently `initial={{ opacity: 0, y: 16 }} ... delay: i * 0.05`) with:

```tsx
<Reveal key={project.slug} variant="rise" delay={i * 0.05} className="h-full">
  <Link href={`/projects/${project.slug}`} className="group block">
    {/* TiltCard + title + stack — unchanged */}
  </Link>
</Reveal>
```

Replace the list-item wrapper `motion.div` (list view, currently `initial={{ opacity: 0, x: -8 }} ... delay: i * 0.03`) with:

```tsx
<Reveal key={project.slug} variant="rise" delay={i * 0.03}>
  <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.3, ease: easeOut }}>
    <Link href={`/projects/${project.slug}`} className="flex items-center gap-3 p-4 rounded-[14px] bg-canvas-glass shadow-1 hover:shadow-2 transition-shadow duration-300">
      <h3 className="body-base font-semibold text-ink truncate">{project.title}</h3>
      <p className="body-small text-ink-muted truncate ml-auto">{project.stack.slice(0, 3).join(" · ")}</p>
    </Link>
  </motion.div>
</Reveal>
```

Replace the "View All" wrapper `motion.div` (currently `initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}`) with:

```tsx
<Reveal className="mt-10 text-center">
  <Link href="/projects">
    <Button variant="outline" size="lg" className="rounded-full">
      {t('viewAll')} <ArrowRight data-icon="inline-end" />
    </Button>
  </Link>
</Reveal>
```

Remove the now-unused `motion` import only if `motion` is no longer referenced in the file (the tabs layoutId pill and grid inner wrappers still use `motion` — keep the import if referenced; the `easeOut` import is still used by the list-view inner wrapper).

- [ ] **Step 2: About.tsx — heading `mask`, info cards `fade`, stats `rise`**

Add import:

```tsx
import { Reveal } from "@/components/motion/reveal/Reveal";
```

Replace the left-column `motion.div` (currently `initial={{ opacity: 0, y: 16 }} whileInView=...`) with:

```tsx
<Reveal className="space-y-6 md:col-span-7">
  <p className="label text-ink-muted">{t("label")}</p>
  <h2 className="display-xl text-balance">{t("heading")}</h2>
  <p className="body-base">{t.rich("description", {
    time: (chunks) => <strong className="font-semibold text-ink tabular-nums">{chunks}</strong>
  })}</p>
</Reveal>
```

Replace the info-card `motion.div` wrappers (currently `whileHover={{ y: -2 ... }} initial={{ opacity: 0, y: 12 }} whileInView=... delay: i * 0.1`) with `Reveal` + a `fade` hover-free lift preserved via the existing `whileHover` on an inner element — keep the current structure but swap the outer wrapper:

```tsx
<Reveal key={item.label} variant="fade" delay={i * 0.1}>
  <motion.div
    whileHover={{ y: -2, transition: { duration: 0.3, ease: easeOut } }}
    className="flex items-start gap-4 rounded-[14px] bg-canvas-card shadow-1 hover:shadow-2 p-5 transition-shadow duration-300"
  >
    {/* icon + label + desc + badge — unchanged */}
  </motion.div>
</Reveal>
```

Replace the stat band `motion.div` (currently `initial={{ opacity: 0, y: 16 }} whileInView=... delay: 0.1`) with:

```tsx
<Reveal variant="rise" className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-[20px] bg-hairline shadow-1 md:grid-cols-4">
  {/* stat items — unchanged */}
</Reveal>
```

Replace the Tech Arsenal wrapper `motion.div` (currently `initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} delay: 0.2`) with:

```tsx
<Reveal className="mt-20 pt-10 border-t border-hairline">
  <p className="label text-ink-muted text-center mb-6">{t("techArsenalLabel")}</p>
  <TechArsenal />
</Reveal>
```

Keep the per-stat `motion.div` inner wrappers unchanged (they handle the hover reveal swap). Verify `motion` is still imported (it is — stat items use it).

- [ ] **Step 3: Skills.tsx — heading `rise`, cards `scale` + stagger**

Add import:

```tsx
import { Reveal } from "@/components/motion/reveal/Reveal";
```

Replace the header block (currently `motion.div ... mb-10 max-w-2xl space-y-3`) with:

```tsx
<Reveal variant="rise" className="mb-10 max-w-2xl space-y-3">
  <p className="label text-ink-muted">{t("label")}</p>
  <h2 className="display-xl text-balance">{t("heading")}</h2>
  <p className="body-base">{t("description")}</p>
</Reveal>
```

Replace the outer category-grid `motion.div` (currently `variants={staggerContainer} initial="hidden" whileInView="visible" ... grid gap-6 md:grid-cols-2`) with:

```tsx
<div className="grid gap-6 md:grid-cols-2">
  {skillsData.map((cat) => (
    <SkillCard key={cat.title} category={cat} />
  ))}
</div>
```

Update `SkillCard` so the outer `motion.div` (variants + layout + initial/animate/exit) becomes a `Reveal variant="scale"` and the hover lift stays on the inner card:

```tsx
function SkillCard({ category }: { category: SkillCategory }) {
  return (
    <Reveal variant="scale" className="h-full">
      <motion.div
        whileHover={{ y: -2 }}
        transition={{ duration: 0.3, ease: easeOut }}
        className="flex h-full rounded-[14px] bg-canvas-glass backdrop-blur-sm shadow-1 p-6 transition-shadow duration-300 hover:shadow-2"
      >
        {/* card content — unchanged */}
      </motion.div>
    </Reveal>
  );
}
```

Replace the GitHub-section wrapper `motion.div` (currently `initial={{ opacity: 0, y: 12 }} whileInView=...`) with:

```tsx
<Reveal className="mt-14">
  <div className="rounded-[14px] bg-canvas-glass backdrop-blur-sm shadow-1 p-6 md:p-8">
    {/* openSource header + GitHubSection — unchanged */}
  </div>
</Reveal>
```

Remove `staggerContainer`/`staggerItem` imports from Skills.tsx if no longer referenced (they were only used by the two wrappers being replaced). Keep `easeOut` (used in `SkillCard` hover) and `motion` (used in `SkillRow` and `SkillCard` hover).

- [ ] **Step 4: Verify lint and build**

Run: `npm run lint` — expected: no errors.
Run: `npm run build` — expected: success.

- [ ] **Step 5: Commit**

```bash
git add src/app/components/Projects.tsx src/app/components/About.tsx src/app/components/Skills.tsx
git commit -m "feat: apply varied reveal variants to Projects, About, and Skills"
```

---

### Task 4: Apply reveal variants — Experience, Achievements, Exploration, Contact

**Files:**
- Modify: `src/app/components/Experience.tsx`
- Modify: `src/app/components/Achievements.tsx`
- Modify: `src/app/components/Exploration.tsx`
- Modify: `src/app/components/Contact.tsx`

**Interfaces:**
- Consumes: `Reveal` from `@/components/motion/reveal/Reveal`; `TextReveal` from `@/components/motion/text-reveal` (Contact heading).

- [ ] **Step 1: Experience.tsx — heading `mask`**

Add import:

```tsx
import { Reveal } from "@/components/motion/reveal/Reveal";
```

Replace the header `motion.div` (currently `initial={{ opacity: 0, y: 12 }} whileInView=... mb-12 space-y-3`) with:

```tsx
<Reveal variant="mask" className="mb-12 space-y-3">
  <p className="label text-ink-muted">{t("label")}</p>
  <h2 className="display-xl text-balance">{t("heading")}</h2>
</Reveal>
```

Replace the filter-row `motion.div` (currently `initial={{ opacity: 0, y: 8 }} whileInView=... mb-8 flex flex-wrap gap-2`) with:

```tsx
<Reveal className="mb-8 flex flex-wrap gap-2">
  {/* filter buttons — unchanged */}
</Reveal>
```

Leave the accordion content wrapper (keyed by `activeFilter`) unchanged.

- [ ] **Step 2: Achievements.tsx — heading `mask`, cards `rise` + stagger**

Add import:

```tsx
import { Reveal } from "@/components/motion/reveal/Reveal";
```

Replace the header block (currently `mb-12 max-w-2xl space-y-3`, plain div) with:

```tsx
<Reveal variant="mask" className="mb-12 max-w-2xl space-y-3">
  <p className="label text-ink-muted">{t("label")}</p>
  <h2 className="display-xl text-balance">{t("heading")}</h2>
</Reveal>
```

Replace the certificate-grid wrapper `motion.div` (currently `initial={{ opacity: 0, y: 12 }} animate=... exit=... delay: i * 0.03`) with `Reveal` and keep the `AnimatePresence` behavior intact — change the outer wrapper only:

```tsx
<Reveal key={cert.title} variant="rise" delay={i * 0.03} className="h-full">
  <motion.div
    whileHover={{ y: -3 }}
    transition={{ duration: 0.3, ease: easeOut }}
    className="rounded-[14px] overflow-hidden shadow-1 hover:shadow-2 bg-canvas-card h-full flex flex-col transition-shadow duration-300"
  >
    {/* CertificatePreview + info + view button — unchanged */}
  </motion.div>
</Reveal>
```

Replace the "Show All" wrapper `motion.div` (currently `initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} mt-10 text-center`) with:

```tsx
<Reveal className="mt-10 text-center">
  <Button onClick={() => setShowAll((v) => !v)} variant="outline" size="lg" className="rounded-full">
    {showAll ? t("showLess") : t("showAll", { count: hidden })}
  </Button>
</Reveal>
```

Note: `Reveal` animates via `whileInView`, so the previous `animate`/`exit` for the grid items is replaced by the viewport-triggered reveal. Remove the `AnimatePresence` wrapper around the grid if it becomes unused (it was only needed for the old animate/exit pattern) — but keep `AnimatePresence` for the `CertificateModal` at the bottom (still needed).

- [ ] **Step 3: Exploration.tsx — heading `rise`, cards `scale`**

Add import:

```tsx
import { Reveal } from "@/components/motion/reveal/Reveal";
```

Replace the header `motion.div` (currently `initial={{ opacity: 0, y: 12 }} whileInView=... mb-12 max-w-2xl space-y-3`) with:

```tsx
<Reveal variant="rise" className="mb-12 max-w-2xl space-y-3">
  <p className="label text-ink-muted">{t("label")}</p>
  <h2 className="display-xl text-balance">{t("heading")}</h2>
  <p className="body-base">{t("description")}</p>
</Reveal>
```

Replace the grid-item `motion.div` wrappers (currently `initial={{ opacity: 0, y: 16 }} whileInView=... delay: i * 0.05`) with:

```tsx
<Reveal key={item.slug} variant="scale" delay={i * 0.05} className="h-full">
  <TiltCard max={6} glare={true} className="h-full rounded-[14px] overflow-hidden shadow-1 hover:shadow-2 transition-shadow duration-300">
    {/* button + image + overlay — unchanged */}
  </TiltCard>
</Reveal>
```

- [ ] **Step 4: Contact.tsx — heading `word` (TextReveal), content `rise`**

Add imports:

```tsx
import { Reveal } from "@/components/motion/reveal/Reveal";
import { TextReveal } from "@/components/motion/text-reveal";
```

Replace the left text column: keep the `label` `motion.p` (fade) but replace the two `motion.h2` heading blocks with a `TextReveal` and keep the blinking cursor. Replace the whole left column block:

```tsx
<div className="w-full space-y-6 lg:col-span-5">
  <motion.p
    initial={{ opacity: 0, y: 8 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.3, ease: easeOut }}
    className="label text-ink-muted"
  >
    {t('label')}
  </motion.p>
  <div className="space-y-1">
    <TextReveal
      as="h2"
      text={[t('heading1')]}
      split="word"
      stagger={0.08}
      blur={8}
      yOffset="20%"
      whileInView
      className="display-xl leading-tight text-balance text-ink"
    />
    <TextReveal
      as="h2"
      text={[t('heading2')]}
      split="word"
      stagger={0.08}
      blur={8}
      yOffset="20%"
      whileInView
      className="display-xl leading-tight text-balance text-ink"
    >
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        className="inline-block h-[0.85em] w-[3px] bg-ink ml-1 align-middle"
      />
    </TextReveal>
  </div>
  <Reveal variant="rise" delay={0.2}>
    <p className="body-base">{t('description')}</p>
  </Reveal>
</div>
```

Replace the right form `motion.div` (currently `initial={{ opacity: 0, scale: 0.95 }} whileInView=...`) with:

```tsx
<Reveal className="w-full lg:col-span-7 lg:pl-8 lg:self-center">
  <ContactForm />
</Reveal>
```

- [ ] **Step 5: Verify lint and build**

Run: `npm run lint` — expected: no errors.
Run: `npm run build` — expected: success.

- [ ] **Step 6: Commit**

```bash
git add src/app/components/Experience.tsx src/app/components/Achievements.tsx src/app/components/Exploration.tsx src/app/components/Contact.tsx
git commit -m "feat: apply varied reveal variants to Experience, Achievements, Exploration, Contact"
```

---

### Task 5: Create hover primitives — `SpotlightCard`, `Magnetic`, `ArrowSlide`

**Files:**
- Create: `src/components/motion/hover/SpotlightCard.tsx`
- Create: `src/components/motion/hover/Magnetic.tsx`
- Create: `src/components/motion/hover/ArrowSlide.tsx`
- Modify: `src/types/css.d.ts` (add `viewTransitionName` to CSSProperties — used in Task 7)

**Interfaces:**
- Consumes: `SPRING_HOVER`, `SPRING_MOUSE` from `@/lib/motion`; `useHoverCapable` from `@/lib/hooks/use-hover-capable`; `cn` from `@/lib/utils`.
- Produces:
  - `function SpotlightCard({ children, className }: { children: ReactNode; className?: string }): JSX.Element`
  - `function Magnetic({ children, strength, className }: { children: ReactNode; strength?: number; className?: string }): JSX.Element`
  - `function ArrowSlide({ children, className, icon }: { children: ReactNode; className?: string; icon?: ReactNode }): JSX.Element` — animates its trailing arrow; defaults to `ArrowRight`.

- [ ] **Step 1: Create `src/components/motion/hover/SpotlightCard.tsx`**

```tsx
"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { useRef, type ReactNode } from "react";
import { SPRING_HOVER, SPRING_MOUSE } from "@/lib/motion";
import { useHoverCapable } from "@/lib/hooks/use-hover-capable";
import { cn } from "@/lib/utils";

export interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
}

/**
 * Card with a cursor-follow spotlight, smart lift, and (dark mode) border glow.
 * All cursor-follow is disabled on touch devices and reduced motion.
 */
export function SpotlightCard({ children, className }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const canHover = useHoverCapable();
  const enabled = !reduce && canHover;

  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const smx = useSpring(mx, SPRING_MOUSE);
  const smy = useSpring(my, SPRING_MOUSE);
  const glow = useMotionTemplate`radial-gradient(180px circle at ${smx}% ${smy}%, rgba(255,255,255,0.09), transparent 65%)`;
  const borderGlow = useMotionTemplate`radial-gradient(60px circle at ${smx}% ${smy}%, rgba(255,255,255,0.18), transparent 70%)`;

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || !enabled) return;
    const rect = el.getBoundingClientRect();
    mx.set(((e.clientX - rect.left) / rect.width) * 100);
    my.set(((e.clientY - rect.top) / rect.height) * 100);
  };
  const onLeave = () => {
    mx.set(50);
    my.set(50);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={enabled ? { y: -3 } : undefined}
      transition={SPRING_HOVER}
      className={cn("group relative", className)}
    >
      {children}
      {enabled ? (
        <motion.div
          aria-hidden
          style={{ background: glow }}
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      ) : null}
      {enabled ? (
        <motion.div
          aria-hidden
          style={{ background: borderGlow }}
          className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 hidden dark:block"
        />
      ) : null}
    </motion.div>
  );
}
```

- [ ] **Step 2: Create `src/components/motion/hover/Magnetic.tsx`**

```tsx
"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useRef, type ReactNode } from "react";
import { SPRING_MOUSE } from "@/lib/motion";
import { useHoverCapable } from "@/lib/hooks/use-hover-capable";
import { cn } from "@/lib/utils";

export interface MagneticProps {
  children: ReactNode;
  /** Max displacement in px. */
  strength?: number;
  className?: string;
}

/** Cursor-attraction wrapper for primary CTAs. Disabled on touch and reduced motion. */
export function Magnetic({ children, strength = 6, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const canHover = useHoverCapable();
  const enabled = !reduce && canHover;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, SPRING_MOUSE);
  const sy = useSpring(y, SPRING_MOUSE);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || !enabled) return;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set((dx / rect.width) * strength);
    y.set((dy / rect.height) * strength);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={cn("inline-block", className)}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 3: Create `src/components/motion/hover/ArrowSlide.tsx`**

```tsx
"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { type ReactNode } from "react";
import { SPRING_HOVER } from "@/lib/motion";
import { cn } from "@/lib/utils";

export interface ArrowSlideProps {
  children: ReactNode;
  className?: string;
  /** Override the default trailing arrow icon. */
  icon?: ReactNode;
}

/** Renders children with a trailing arrow that slides forward on hover. */
export function ArrowSlide({ children, className, icon }: ArrowSlideProps) {
  const reduce = useReducedMotion();
  return (
    <span className={cn("group inline-flex items-center gap-1.5", className)}>
      <span>{children}</span>
      <motion.span
        whileHover={reduce ? undefined : { x: 4 }}
        transition={SPRING_HOVER}
        className="inline-flex"
      >
        {icon ?? <ArrowRight size={14} />}
      </motion.span>
    </span>
  );
}
```

- [ ] **Step 4: Add `viewTransitionName` to `src/types/css.d.ts`**

Prepend the property so Task 7's inline style type-checks:

```ts
import type { MotionValue } from "framer-motion";

declare module "react" {
  interface CSSProperties {
    [key: `--${string}`]:
      | string
      | number
      | MotionValue<string>
      | MotionValue<number>
      | undefined;
    /** Native View Transitions API — used for the project image morph. */
    viewTransitionName?: string;
  }
}
```

- [ ] **Step 5: Verify lint and build**

Run: `npm run lint` — expected: no errors (SpotlightCard uses `motion`/`useMotionTemplate`; all imports used).
Run: `npm run build` — expected: success.

- [ ] **Step 6: Commit**

```bash
git add src/components/motion/hover src/types/css.d.ts
git commit -m "feat: add SpotlightCard, Magnetic, and ArrowSlide hover primitives"
```

---

### Task 6: Apply hover primitives across components

**Files:**
- Modify: `src/app/components/About.tsx` (info cards → SpotlightCard)
- Modify: `src/app/components/Skills.tsx` (SkillCard → SpotlightCard)
- Modify: `src/app/components/Achievements.tsx` (cert cards → SpotlightCard, View Details → ArrowSlide)
- Modify: `src/app/components/Hero.tsx` (Get in Touch + Download CV → Magnetic)
- Modify: `src/app/components/Projects.tsx` (View All button → Magnetic)
- Modify: `src/app/components/Footer.tsx` (social links → ArrowSlide)

**Interfaces:**
- Consumes: `SpotlightCard`, `Magnetic`, `ArrowSlide` from `@/components/motion/hover/*`.

- [ ] **Step 1: About.tsx — wrap info cards in `SpotlightCard`**

Add import:

```tsx
import { SpotlightCard } from "@/components/motion/hover/SpotlightCard";
```

Replace the info-card inner `motion.div` with a `SpotlightCard` (keeping the reveal wrapper):

```tsx
<Reveal key={item.label} variant="fade" delay={i * 0.1}>
  <SpotlightCard className="flex items-start gap-4 rounded-[14px] bg-canvas-card shadow-1 hover:shadow-2 p-5 transition-shadow duration-300">
    {/* icon + label + desc + badge — unchanged */}
  </SpotlightCard>
</Reveal>
```

Remove the now-unused `whileHover` motion.div. Keep the `motion` import (stat items still use it).

- [ ] **Step 2: Skills.tsx — wrap `SkillCard` in `SpotlightCard`**

Add import:

```tsx
import { SpotlightCard } from "@/components/motion/hover/SpotlightCard";
```

Replace the inner `motion.div` hover wrapper in `SkillCard`:

```tsx
function SkillCard({ category }: { category: SkillCategory }) {
  return (
    <Reveal variant="scale" className="h-full">
      <SpotlightCard className="flex h-full rounded-[14px] bg-canvas-glass backdrop-blur-sm shadow-1 p-6 transition-shadow duration-300 hover:shadow-2">
        {/* card content — unchanged */}
      </SpotlightCard>
    </Reveal>
  );
}
```

- [ ] **Step 3: Achievements.tsx — wrap cert cards in `SpotlightCard`, View Details in `ArrowSlide`**

Add imports:

```tsx
import { SpotlightCard } from "@/components/motion/hover/SpotlightCard";
import { ArrowSlide } from "@/components/motion/hover/ArrowSlide";
```

Replace the cert-card inner `motion.div` hover wrapper:

```tsx
<Reveal key={cert.title} variant="rise" delay={i * 0.03} className="h-full">
  <SpotlightCard className="rounded-[14px] overflow-hidden shadow-1 hover:shadow-2 bg-canvas-card h-full flex flex-col transition-shadow duration-300">
    {/* CertificatePreview + info + view button — unchanged */}
  </SpotlightCard>
</Reveal>
```

Replace the "View Details" button content:

```tsx
<Button onClick={() => setModalIndex(i)} variant="ghost" size="sm" className="text-ink-muted">
  <ArrowSlide icon={<Eye size={12} />}>{t("viewDetails")}</ArrowSlide>
</Button>
```

- [ ] **Step 4: Hero.tsx — wrap primary CTAs in `Magnetic`**

Add import:

```tsx
import { Magnetic } from "@/components/motion/hover/Magnetic";
```

Wrap the Get in Touch trigger (keep `CenterMorphModalTrigger` intact inside):

```tsx
<CenterMorphModal>
  <Magnetic>
    <CenterMorphModalTrigger>
      <Button variant="default" size="lg" className="rounded-full shadow-sm" suppressHydrationWarning>
        <Send data-icon="inline-start" />
        {t("getInTouch")}
      </Button>
    </CenterMorphModalTrigger>
  </Magnetic>
  {/* CenterMorphModalContent — unchanged */}
</CenterMorphModal>
```

Wrap the Download CV `Dialog` trigger similarly:

```tsx
<Magnetic>
  <DialogTrigger
    render={
      <Button variant="outline" size="lg" className="rounded-full" suppressHydrationWarning />
    }
  >
    <Download data-icon="inline-start" />
    {t("downloadCv")}
  </DialogTrigger>
</Magnetic>
```

- [ ] **Step 5: Projects.tsx — wrap View All button in `Magnetic`**

Add import:

```tsx
import { Magnetic } from "@/components/motion/hover/Magnetic";
```

Replace the View All Reveal body:

```tsx
<Reveal className="mt-10 text-center">
  <Magnetic>
    <Link href="/projects">
      <Button variant="outline" size="lg" className="rounded-full">
        {t('viewAll')} <ArrowRight data-icon="inline-end" />
      </Button>
    </Link>
  </Magnetic>
</Reveal>
```

- [ ] **Step 6: Footer.tsx — social links via `ArrowSlide`**

Add import:

```tsx
import { ArrowSlide } from "@/components/motion/hover/ArrowSlide";
```

Wrap each social icon link with `ArrowSlide`, using the icon as the animated trailing element:

```tsx
<div className="flex items-center gap-2">
  {socials.map((s) => (
    <a
      key={s.label}
      href={s.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={s.label}
      className="group flex h-9 w-9 items-center justify-center rounded-full bg-surface-soft text-ink-muted transition-colors hover:bg-surface-active hover:text-ink"
    >
      <ArrowSlide icon={<s.icon size={14} />} />
    </a>
  ))}
</div>
```

Note: `ArrowSlide` renders `inline-flex items-center gap-1.5`; the empty children span is fine. If the empty label span causes an awkward gap, use `icon` only and pass `className="gap-0"`. To keep the icon centered with no gap, render:

```tsx
<ArrowSlide icon={<s.icon size={14} />} className="gap-0" />
```

- [ ] **Step 7: Verify lint and build**

Run: `npm run lint` — expected: no errors.
Run: `npm run build` — expected: success.

- [ ] **Step 8: Manual smoke test**

Run `npm run dev`, open `http://localhost:3000`:
- Hover an About info card, Skill card, and Achievement card → cursor-follow spotlight + lift appear (desktop only).
- Hover Get in Touch / Download CV → button attracts toward cursor.
- Hover View All / View Details → arrow slides.
- Switch to a touch device / narrow viewport → no phantom hover.

- [ ] **Step 9: Commit**

```bash
git add src/app/components/About.tsx src/app/components/Skills.tsx src/app/components/Achievements.tsx src/app/components/Hero.tsx src/app/components/Projects.tsx src/app/components/Footer.tsx
git commit -m "feat: apply SpotlightCard, Magnetic, and ArrowSlide hover primitives"
```

---

### Task 7: Page transitions with native View Transitions API

**Files:**
- Create: `src/components/motion/transition/TransitionLink.tsx`
- Modify: `src/app/globals.css` (transition CSS + reduced-motion override)
- Modify: `src/app/components/Projects.tsx` (card links → TransitionLink + `viewTransitionName` on card image)
- Modify: `src/app/components/AllProjects.tsx` (card links → TransitionLink + `viewTransitionName` on card image)
- Modify: `src/app/components/ProjectDetail.tsx` (hero image `viewTransitionName` + back link → TransitionLink)

**Interfaces:**
- Consumes: `next/link`, `next/navigation` (`useRouter`), `next-intl` locale from `useLocale` (Projects/AllProjects already have it).
- Produces:
  - `function TransitionLink(props: ComponentProps<typeof Link>): JSX.Element` — wraps `next/link`, intercepting clicks when `document.startViewTransition` is available and motion is not reduced; falls back to plain navigation otherwise.
  - CSS class `.vt-project-image` with `view-transition-name` (set inline via style prop, using the `viewTransitionName` type added in Task 5).

Rationale (from spec's technical note): React 19.2.3 does not export `ViewTransition`, so the React `<ViewTransition>` component is unavailable without upgrading to canary. The native `document.startViewTransition` API delivers the same fade-through default and the shared-element project-image morph, with zero dependencies and automatic graceful fallback in browsers without support.

- [ ] **Step 1: Create `src/components/motion/transition/TransitionLink.tsx`**

```tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, type ComponentProps, type MouseEvent } from "react";

type TransitionLinkProps = ComponentProps<typeof Link>;

/**
 * next/link wrapper that runs navigation inside document.startViewTransition
 * when the browser supports it and the user has not requested reduced motion.
 * Falls back to plain Link behavior otherwise (no regression).
 */
export function TransitionLink({ href, onClick, children, ...rest }: TransitionLinkProps) {
  const router = useRouter();

  const handleClick = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      onClick?.(e);
      if (e.defaultPrevented) return;
      const modifier = e.metaKey || e.ctrlKey || e.shiftKey || e.altKey;
      if (modifier) return; // let new-tab / new-window open normally
      if (typeof document === "undefined" || !("startViewTransition" in document)) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const target = typeof href === "string" ? href : href.href;
      e.preventDefault();
      document.startViewTransition(() => {
        router.push(target);
      });
    },
    [href, onClick, router],
  );

  return (
    <Link href={href} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}
```

- [ ] **Step 2: Add View Transitions CSS to `src/app/globals.css`**

Append at the end of `globals.css`:

```css
/* ---- View Transitions (native API, no dependency) ---- */

::view-transition-old(root) {
  animation: vt-fade-out 0.2s ease-out both;
}
::view-transition-new(root) {
  animation: vt-fade-in 0.25s ease-out both;
}

@keyframes vt-fade-out {
  to { opacity: 0; }
}
@keyframes vt-fade-in {
  from { opacity: 0; }
}

/* Shared-element morph for the project card image -> detail hero. */
.vt-project-image {
  view-transition-name: vt-project-image;
}

/* Keep the page interactive while the transition overlay is active. */
::view-transition {
  pointer-events: none;
}

@media (prefers-reduced-motion: reduce) {
  ::view-transition-old(*),
  ::view-transition-new(*),
  ::view-transition-group(*) {
    animation: none !important;
    animation-duration: 0s !important;
    animation-delay: 0s !important;
  }
}
```

Note: `.vt-project-image` uses one fixed `view-transition-name` because only one card is navigated at a time — the browser captures the clicked card's snapshot for the outgoing page and the detail hero's snapshot for the incoming page. This keeps the morph simple and avoids duplicate-name conflicts.

- [ ] **Step 3: Projects.tsx — card links → TransitionLink + viewTransitionName on image**

Add imports:

```tsx
import { TransitionLink } from "@/components/motion/transition/TransitionLink";
```

Replace the grid-view `Link` (inside the grid `Reveal`) with `TransitionLink`, and add `viewTransitionName` to the `Image`:

```tsx
<Reveal key={project.slug} variant="rise" delay={i * 0.05} className="h-full">
  <TransitionLink href={`/projects/${project.slug}`} className="group block">
    <TiltCard max={8} glare={true} className="rounded-[14px] overflow-hidden shadow-1 group-hover:shadow-2 transition-shadow duration-300">
      <Image
        src={PROJECT_CARD_IMAGES[project.slug]}
        alt={project.title}
        width={1200}
        height={750}
        className="w-full h-auto vt-project-image"
        style={{ viewTransitionName: "vt-project-image" }}
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
    </TiltCard>
    <div className="mt-3">
      <h3 className="body-base font-semibold text-ink group-hover:text-ink-muted transition-colors duration-200">{project.title}</h3>
      <p className="body-small text-ink-muted mt-1">{project.stack.slice(0, 3).join(" · ")}</p>
    </div>
  </TransitionLink>
</Reveal>
```

Also replace the list-view `Link` with `TransitionLink` (same href pattern; no image, so no `viewTransitionName`):

```tsx
<TransitionLink
  href={`/projects/${project.slug}`}
  className="flex items-center gap-3 p-4 rounded-[14px] bg-canvas-glass shadow-1 hover:shadow-2 transition-shadow duration-300"
>
  <h3 className="body-base font-semibold text-ink truncate">{project.title}</h3>
  <p className="body-small text-ink-muted truncate ml-auto">{project.stack.slice(0, 3).join(" · ")}</p>
</TransitionLink>
```

- [ ] **Step 4: AllProjects.tsx — card links → TransitionLink + viewTransitionName on image**

Add import:

```tsx
import { TransitionLink } from "@/components/motion/transition/TransitionLink";
```

Replace the grid-view `Link` (inside the grid `motion.div`):

```tsx
<motion.div key={project.slug} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35, ease: easeOut, delay: i * 0.05 }}>
  <TransitionLink href={`/projects/${project.slug}`} className="group block">
    <TiltCard max={8} glare={true} className="rounded-[14px] overflow-hidden shadow-1 group-hover:shadow-2 transition-shadow duration-300">
      <Image
        src={PROJECT_CARD_IMAGES[project.slug]}
        alt={project.title}
        width={1200}
        height={750}
        className="w-full h-auto vt-project-image"
        style={{ viewTransitionName: "vt-project-image" }}
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
    </TiltCard>
    <div className="mt-3">
      <h3 className="body-base font-semibold text-ink group-hover:text-ink-muted transition-colors duration-200">{project.title}</h3>
      <p className="body-small text-ink-muted mt-1">{project.stack.slice(0, 3).join(" · ")}</p>
    </div>
  </TransitionLink>
</motion.div>
```

Replace the list-view `Link` with `TransitionLink` (same as Task 7 Step 3 list pattern).

- [ ] **Step 5: ProjectDetail.tsx — hero image viewTransitionName + back link → TransitionLink**

Add import:

```tsx
import { TransitionLink } from "@/components/motion/transition/TransitionLink";
```

Replace the desktop hero image wrapper (`rounded-sm ... bg-canvas-card overflow-hidden`) with the `vt-project-image` style applied to the `Image`:

```tsx
<div className="relative w-full rounded-sm border border-border bg-canvas-card overflow-hidden">
  <Image
    src={heroSrc}
    alt={project.title}
    width={1200}
    height={675}
    priority
    className="w-full h-auto block vt-project-image"
    style={{ viewTransitionName: "vt-project-image" }}
    sizes="(max-width: 768px) 100vw, 896px"
  />
</div>
```

Replace the back `Link` with `TransitionLink`:

```tsx
<TransitionLink
  href="/#projects"
  className="inline-flex items-center gap-2 label text-muted-foreground hover:text-foreground transition-colors mb-8"
>
  <ArrowLeft size={14} />
  {t('backToProjects')}
</TransitionLink>
```

Note: for mobile apps (`heroScreenshots` branch), the three-phone layout stays as-is — no morph (no matching single element). Remove the `Link` import from ProjectDetail.tsx only if no other `Link` usage remains (there is none after this change — verify).

- [ ] **Step 6: Verify lint and build**

Run: `npm run lint` — expected: no errors.
Run: `npm run build` — expected: success.

- [ ] **Step 7: Manual browser test**

Run `npm run dev`, open `http://localhost:3000` (Chromium):
- Click a project card from Home → detail: the card image morphs/expands into the hero image (fade-through for the rest).
- Back navigation (`/#projects`) → fades back.
- Open `/projects` → click a card → morph plays.
- Safari or a browser without `document.startViewTransition` → plain navigation, no visual glitch.
- Enable OS "reduce motion" → transitions skipped entirely.
- Verify next-intl routing still works (`/id` locale navigation doesn't break).

- [ ] **Step 8: Commit**

```bash
git add src/components/motion/transition/TransitionLink.tsx src/app/globals.css src/app/components/Projects.tsx src/app/components/AllProjects.tsx src/app/components/ProjectDetail.tsx
git commit -m "feat: add native view-transition page transitions with project image morph"
```

---

### Task 8: Final verification pass

**Files:** none (verification only).

- [ ] **Step 1: Full lint**

Run: `npm run lint`
Expected: zero errors.

- [ ] **Step 2: Production build**

Run: `npm run build`
Expected: success; all routes (`/`, `/projects`, `/projects/[slug]`, `not-found`) statically generated without regression.

- [ ] **Step 3: Full manual pass**

Run `npm run dev` and verify:
- Full scroll on Home in dark AND light mode — reveals varied per section (mask headings, rise/scale cards), no elements hidden after scroll.
- Hover states: spotlight on About/Skills/Achievement cards, magnetic CTAs, sliding arrows (desktop).
- Navigation: Home → `/projects` → `/projects/[slug]` and back — image morph + fade-through.
- DevTools Performance during a scroll and a navigation — no long tasks / jank; network shows no new dependencies.
- `prefers-reduced-motion` and touch device — all effects disabled gracefully.
- next-intl: switch to Indonesian (`/id`) and repeat key checks; navigation with transition still works.

- [ ] **Step 4: Final commit (if any stragglers)**

```bash
git add -A
git commit -m "chore: final motion system polish"
```

---

## Self-Review

**Spec coverage:**
- Motion tokens (`src/lib/motion.ts`, +`EASE_EXPO`, `SPRING_HOVER`, durations) → Task 1. ✅
- `Reveal` + variant registry (`fade/rise/mask/blur/scale`; `word` via existing TextReveal) → Task 2. ✅
- Section-to-variant mapping (Projects=rise/mask, About=mask/fade/rise, Skills=rise/scale, Experience=mask, Achievements=mask/rise, Exploration=rise/scale, Contact=word/rise) → Tasks 3–4. ✅
- `SpotlightCard`, `Magnetic`, `ArrowSlide` + application → Tasks 5–6. ✅
- Page transitions: fade-through + shared-element morph + fallback + reduced-motion → Task 7. ✅ (deviation: native `document.startViewTransition` instead of React `<ViewTransition>` because React 19.2.3 does not export it — documented in Task 7 rationale.)
- Verification (`npm run lint`, `npm run build`, manual dark/light/mobile/Safari/perf) → Task 8. ✅
- Global constraints (no deps, reduced-motion, touch, transform/opacity only, once:true) → enforced in every task. ✅

**Placeholder scan:** Every step has concrete code or an exact command; no TBD/TODO. ✅

**Type consistency:** `RevealVariant` type is exported from `variants.ts` and consumed in `Reveal.tsx`; `Reveal` props (`variant`, `delay`, `duration`, `amount`, `className`) used consistently across Tasks 3–4. `SpotlightCard`/`Magnetic`/`ArrowSlide` props (`children`, `className`, `strength?`, `icon?`) match across Tasks 5–6. `TransitionLink` accepts `ComponentProps<typeof Link>` and is used with string hrefs in Tasks 7. `viewTransitionName` added to `CSSProperties` in Task 5 and used in Task 7. ✅
