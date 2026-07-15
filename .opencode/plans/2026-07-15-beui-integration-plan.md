# beUI Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate 23 beUI components into the portfolio across 5 phases to enhance animations, interactions, and visual polish while preserving the existing dark theme.

**Architecture:** Layer-by-layer approach — install all components first (Foundation), then replace sections top-to-bottom: Navigation → Hero → Content sections → Polish touches.

**Tech Stack:** Next.js 16, React 19, TypeScript 5, Tailwind v4, Framer Motion v12, shadcn/ui v4, beUI components

## Global Constraints

- Must preserve existing dark theme (canvas/ink colors, glass morphism, Geist font)
- All beUI components installed via `npx shadcn@latest add @beui/<name>` — NOT manual copy
- All beUI components land at `src/components/motion/` 
- Must maintain TypeScript strict mode compatibility
- `bun run check` must pass after each task
- `bun run build` must pass after each task
- Reduced-motion handling must be preserved

---

### Task 1: Install Dependencies & beUI Components

**Files:**
- Modify: `package.json` (add dependencies)
- Create: `src/components/motion/*` (23 component directories)

**Interfaces:**
- Consumes: N/A (first task)
- Produces: All beUI components available at `@/components/motion/*`

- [ ] **Step 1: Install npm dependencies**

```bash
bun add motion lenis next-themes @paper-design/shaders-react
```

- [ ] **Step 2: Install all beUI components via shadcn CLI**

```bash
# Motion primitives
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

- [ ] **Step 3: Verify installation**

```bash
ls src/components/motion/ | head -25
bun run check
```

Expected: 23 component directories in `src/components/motion/`, TypeScript passes

- [ ] **Step 4: Commit**

```bash
git add package.json bun.lock src/components/motion/
git commit -m "feat: install beUI components and dependencies"
```

---

### Task 2: Foundation — SmoothScroll Provider + Global UI

**Files:**
- Modify: `src/app/layout.tsx`
- Consumes: `@/components/motion/smooth-scroll`, `@/components/motion/command-palette`, `@/components/motion/scroll-progress`
- Produces: Layout wrapped with smooth scroll + global UI elements

- [ ] **Step 1: Read current layout.tsx**

Read `src/app/layout.tsx` to understand current structure before modifying.

- [ ] **Step 2: Modify layout.tsx** — wrap with SmoothScroll, add ScrollProgress, add CommandPalette

```tsx
// Add imports at top
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { CommandPalette } from "@/components/motion/command-palette";

// In the body/render, wrap main content:
<html>
  <body>
    <SmoothScroll>
      {children}
    </SmoothScroll>
    <ScrollProgress variant="bar" position="bottom" height={3} />
  </body>
</html>
```

Note: Exact placement depends on current layout structure. CommandPalette may need to be outside SmoothScroll. If SmoothScroll causes issues with existing animations, set `lerp={0.15}` for a subtler effect.

- [ ] **Step 3: Verify**

```bash
bun run check
bun run build
```

Expected: Build passes, page loads with smooth scrolling, scroll progress bar visible at bottom

- [ ] **Step 4: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: add SmoothScroll, ScrollProgress, CommandPalette to layout"
```

---

### Task 3: Theme System — Migrate to next-themes

**Files:**
- Modify: `src/app/components/ThemeProvider.tsx`
- Modify: `src/app/layout.tsx`
- Consumes: `next-themes` package
- Produces: `next-themes` provider replacing custom ThemeProvider

- [ ] **Step 1: Read current ThemeProvider.tsx**

Read `src/app/components/ThemeProvider.tsx` to understand current implementation.

- [ ] **Step 2: Replace custom ThemeProvider with next-themes**

```tsx
// src/app/components/ThemeProvider.tsx — rewrite entirely
"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
```

- [ ] **Step 3: Update layout.tsx** — replace old ThemeProvider import path if needed

Verify the ThemeProvider is imported from the correct path in layout.tsx.

- [ ] **Step 4: Update any component that uses old theme API**

Check `useTheme()` usage across all components. The old `ThemeProvider` exposed `{ theme, toggle }`. `next-themes` exposes `{ theme, setTheme, resolvedTheme }`. Update any component that calls `toggle()` to use `setTheme(theme === 'dark' ? 'light' : 'dark')`.

- [ ] **Step 5: Verify**

```bash
bun run check
bun run build
```

Expected: Build passes, theme toggle works, no TypeScript errors

- [ ] **Step 6: Commit**

```bash
git add src/app/components/ThemeProvider.tsx src/app/layout.tsx
git commit -m "feat: migrate custom ThemeProvider to next-themes"
```

---

### Task 4: Navbar — Drawer + ThemeToggle + Tooltip

**Files:**
- Modify: `src/app/components/Navbar.tsx`
- Consumes: `@/components/motion/drawer`, `@/components/motion/theme-toggle`, `@/components/motion/tooltip`
- Produces: Enhanced mobile drawer, theme toggle with animation, tooltip on social icons

- [ ] **Step 1: Read current Navbar.tsx**

Read `src/app/components/Navbar.tsx` to understand structure (lines 139-170 = mobile menu).

- [ ] **Step 2: Replace mobile AnimatePresence menu with Drawer**

Remove lines 139-170 (`<AnimatePresence>` block) and replace with:

```tsx
<Drawer
  open={menuOpen}
  onOpenChange={setMenuOpen}
  side="right"
  className="w-72 p-6 gap-4"
>
  {/* Section links */}
  <div className="flex flex-col gap-2">
    {sections.map((item) => (
      <button
        key={item}
        onClick={() => scrollToSection(item)}
        className={`flex h-11 items-center rounded-full px-4 text-sm font-medium transition-colors ${
          active === item
            ? "bg-white/10 text-ink"
            : "text-ink-muted hover:text-ink hover:bg-white/5"
        }`}
      >
        {capitalize(item)}
      </button>
    ))}
  </div>
  
  {/* Social links */}
  <div className="flex items-center gap-3 pt-2 border-t border-white/10">
    <a href="https://github.com/callmezaa" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-ink-muted hover:text-ink" onClick={closeMenu}>
      <FaGithub size={18} /><span className="label">GitHub</span>
    </a>
    <a href="..." target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-ink-muted hover:text-ink" onClick={closeMenu}>
      <FaLinkedin size={18} /><span className="label">LinkedIn</span>
    </a>
  </div>
</Drawer>
```

Remove the `useEffect` with `scroll-lock` class toggle (lines 58-66) — Drawer handles body scroll lock.

- [ ] **Step 3: Replace Sun/Moon button with ThemeToggle**

Replace:
```tsx
<Button onClick={toggle} ...>
  {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
</Button>
```

With:
```tsx
<ThemeToggle variant="rectangle" start="bottom-up" iconClassName="h-4 w-4" />
```

Import: `import { ThemeToggle } from "@/components/motion/theme-toggle";`

- [ ] **Step 4: Add Tooltip wraps to desktop social icons + theme toggle**

```tsx
<div className="hidden md:flex items-center gap-1 rounded-full border border-hairline/50 px-3 py-1">
  <Tooltip content="GitHub" side="bottom">
    <Button ... >
      <FaGithub size={16} />
    </Button>
  </Tooltip>
  <Tooltip content="LinkedIn" side="bottom">
    <Button ... >
      <FaLinkedin size={16} />
    </Button>
  </Tooltip>
  <Tooltip content={theme === "dark" ? "Light mode" : "Dark mode"} side="bottom">
    <ThemeToggle variant="rectangle" start="bottom-up" iconClassName="h-4 w-4" />
  </Tooltip>
</div>
```

Import: `import { Tooltip } from "@/components/motion/tooltip";`

- [ ] **Step 5: Remove unused imports**

Remove `import { AnimatePresence } from "framer-motion"` and `import { Sun, Moon } from "lucide-react"` if they become unused.

- [ ] **Step 6: Verify**

```bash
bun run check
bun run build
```

Expected: Build passes, mobile nav uses smooth drawer, theme toggle animates, tooltips work on social icons

- [ ] **Step 7: Commit**

```bash
git add src/app/components/Navbar.tsx
git commit -m "feat: upgrade Navbar with Drawer, ThemeToggle, Tooltip"
```

---

### Task 5: Hero — ShaderBackground + TextReveal + Marquee + Buttons + Loader

**Files:**
- Modify: `src/app/components/Hero.tsx`
- Consumes: `@/components/motion/shader-background`, `@/components/motion/text-reveal`, `@/components/motion/marquee`, `@/components/motion/button`, `@/components/motion/loader`
- Produces: Animated hero with shader background, text reveal, upgraded marquee, magnetic CTAs, beUI loader

- [ ] **Step 1: Read current Hero.tsx**

Read `src/app/components/Hero.tsx` fully.

- [ ] **Step 2: Replace radial-gradient div with ShaderBackground**

Replace line 42:
```tsx
{/* BEFORE: */}
<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.02)_0%,transparent_50%)] pointer-events-none" />

{/* AFTER: */}
<ShaderBackground
  variant="mesh-gradient"
  className="absolute inset-0"
  colors={["#0a0a0f", "#1a1a2e", "#16213e", "#0f3460"]}
  distortion={0.6}
  swirl={0.3}
  speed={0.3}
/>
```

- [ ] **Step 3: Replace motion.h1 with TextReveal**

Replace lines 46-53:
```tsx
{/* BEFORE: */}
<motion.h1
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={appleSpring}
  className="display-hero"
>
  Products shipped. Problems solved. No fluff.
</motion.h1>

{/* AFTER: */}
<TextReveal
  as="h1"
  text={["Products shipped.", "Problems solved.", "No fluff."]}
  className="display-hero"
  split="word"
  stagger={0.08}
  blur={8}
  yOffset="20%"
/>
```

- [ ] **Step 4: Replace custom marquee with beUI Marquee**

Replace lines 181-193:
```tsx
{/* BEFORE: */}
<div className="mt-16 md:mt-24 pb-8 overflow-hidden">
  <motion.div
    className="flex gap-12 w-max"
    animate={{ x: ["0%", "-50%"] }}
    transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
  >
    {[...techStack, ...techStack].map((tech, i) => (
      <div key={`${tech.name}-${i}`} className="flex items-center gap-2 shrink-0">
        <tech.icon size={16} className="text-ink-muted/30" />
        <span className="mono-sm text-ink-muted/30 whitespace-nowrap">{tech.name}</span>
      </div>
    ))}
  </motion.div>
</div>

{/* AFTER: */}
<div className="mt-16 md:mt-24 pb-8">
  <Marquee speed={25} fade={true}>
    {techStack.map((tech) => (
      <div key={tech.name} className="flex items-center gap-2 mx-4 shrink-0">
        <tech.icon size={16} className="text-ink-muted/30" />
        <span className="mono-sm text-ink-muted/30 whitespace-nowrap">{tech.name}</span>
      </div>
    ))}
  </Marquee>
</div>
```

- [ ] **Step 5: Wrap CTA buttons with MagneticButton**

Replace the DialogTrigger buttons:
```tsx
{/* BEFORE: */}
<DialogTrigger
  render={
    <Button variant="default" size="lg" className="rounded-full shadow-sm" suppressHydrationWarning />
  }
>
  <Send data-icon="inline-start" />
  Get in Touch
</DialogTrigger>

{/* AFTER: */}
<DialogTrigger
  render={
    <MagneticButton variant="primary" size="md" strength={0.3} className="rounded-full shadow-sm" />
  }
>
  <Send data-icon="inline-start" />
  Get in Touch
</DialogTrigger>
```

Do the same for the "Download CV" DialogTrigger:
```tsx
<DialogTrigger
  render={
    <MagneticButton variant="outline" size="md" strength={0.3} className="rounded-full" />
  }
>
  <Download data-icon="inline-start" />
  Download CV
</DialogTrigger>
```

- [ ] **Step 6: Replace CSS spinner with beUI Loader**

In the CV Dialog, replace:
```tsx
{/* BEFORE: */}
<div className="h-6 w-6 animate-spin rounded-full border-2 border-ink/10 border-t-ink" />

{/* AFTER: */}
<Loader variant="spinner" size={24} />
```

- [ ] **Step 7: Remove unused imports**

Remove `import { motion } from "framer-motion"` if TextReveal/Marquee replace all motion usage in Hero.
Keep `motion` if it's still used elsewhere (profile image, scroll indicator, subtitle particle).

- [ ] **Step 8: Verify**

```bash
bun run check
bun run build
```

Expected: Build passes, hero has animated shader background, heading reveals word-by-word, marquee scrolls infinitely, buttons have magnetic pull on hover, CV dialog shows beUI spinner

- [ ] **Step 9: Commit**

```bash
git add src/app/components/Hero.tsx
git commit -m "feat: upgrade Hero with ShaderBackground, TextReveal, Marquee, MagneticButton, Loader"
```

---

### Task 6: Projects — TiltCard

**Files:**
- Modify: `src/app/components/Projects.tsx`
- Consumes: `@/components/motion/tilt-card`
- Produces: Project cards with 3D tilt + glare effect

- [ ] **Step 1: Read current Projects.tsx**

Read `src/app/components/Projects.tsx` fully.

- [ ] **Step 2: Wrap grid project cards with TiltCard**

In the grid view (around line 82-101), wrap each project card:

```tsx
{/* BEFORE: */}
<motion.div
  whileHover={{ y: -3 }}
  transition={{ duration: 0.3, ease: easeOut }}
  className="rounded-[14px] overflow-hidden shadow-lg ..."
>
  <div className="overflow-hidden">
    <motion.div whileHover={{ scale: 1.02 }} ...>
      <Image ... />
    </motion.div>
  </div>
</motion.div>

{/* AFTER: */}
<TiltCard max={8} glare={true} className="rounded-[14px] overflow-hidden shadow-lg ...">
  <Link href={`/projects/${project.slug}`}>
    <Image ... />
  </Link>
</TiltCard>
```

Note: Move the project metadata (title, stack, year, badge) inside TiltCard so they tilt with the card. Add a content div below the image inside TiltCard.

- [ ] **Step 3: Remove manual hover animations**

Remove `whileHover={{ y: -3 }}`, `whileHover={{ scale: 1.02 }}`, and related `motion.div` wrappers from project cards.

- [ ] **Step 4: Update imports**

Add `import { TiltCard } from "@/components/motion/tilt-card";`

- [ ] **Step 5: Verify**

```bash
bun run check
bun run build
```

Expected: Build passes, project cards tilt on mouse hover with glare effect, navigation still works

- [ ] **Step 6: Commit**

```bash
git add src/app/components/Projects.tsx
git commit -m "feat: upgrade project cards with TiltCard 3D effect"
```

---

### Task 7: Experience — BouncyAccordion

**Files:**
- Modify: `src/app/components/Experience.tsx`
- Consumes: `@/components/motion/bouncy-accordion`
- Produces: Animated accordion with spring physics for experience section

- [ ] **Step 1: Read current Experience.tsx**

Read `src/app/components/Experience.tsx` fully.

- [ ] **Step 2: Transform experience data & replace Accordion with BouncyAccordion**

Replace the Accordion block (around line 76-112):

```tsx
{/* BEFORE: */}
<Accordion className="rounded-xl border bg-card shadow-sm">
  {filtered.map((exp) => (
    <AccordionItem key={`${exp.title}-${exp.year}`} value={`${exp.title}-${exp.year}`}>
      <AccordionTrigger className="px-5 py-4 ...">
        <div className="flex flex-1 flex-col items-start gap-1 ...">
          <span className="mono-sm text-muted-foreground shrink-0">{exp.year}</span>
          <span className="text-foreground font-medium">{exp.title}</span>
          <span className="body-small text-muted-foreground">{exp.place}</span>
          <span className={`ml-auto rounded-full px-2 py-0.5 text-[10px] font-medium ${typeColors[exp.type]}`}>
            {exp.type}
          </span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-5">
        <div className="space-y-4 py-2">
          <div className="flex items-center gap-2 body-small text-muted-foreground">
            <span>{exp.location}</span>
          </div>
          <p className="body-base text-muted-foreground leading-relaxed">{exp.description}</p>
          <div className="flex flex-wrap gap-1.5">
            {exp.tags.map((tag) => (
              <span key={tag} className="mono-sm rounded-full bg-muted px-2.5 py-1 text-muted-foreground">{tag}</span>
            ))}
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  ))}
</Accordion>

{/* AFTER: */}
<BouncyAccordion
  items={filtered.map((exp) => ({
    id: `${exp.title}-${exp.year}`,
    title: `${exp.year} · ${exp.title}`,
    description: (
      <div className="space-y-3">
        <div className="flex items-center gap-2 body-small text-ink-muted">
          <span>{exp.place}</span>
          <span>·</span>
          <span>{exp.location}</span>
          <span className="ml-auto rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-medium">
            {exp.type}
          </span>
        </div>
        <p className="body-base text-ink-muted leading-relaxed">{exp.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {exp.tags.map((tag) => (
            <span key={tag} className="mono-sm rounded-full bg-white/5 px-2.5 py-1 text-ink-muted">{tag}</span>
          ))}
        </div>
      </div>
    ),
    icon: exp.type === "work" ? <Briefcase className="h-4 w-4" /> : 
          exp.type === "education" ? <GraduationCap className="h-4 w-4" /> :
          <Building className="h-4 w-4" />,
  }))}
  defaultValue={null}
  collapsible
/>
```

- [ ] **Step 3: Update imports**

```tsx
import { BouncyAccordion } from "@/components/motion/bouncy-accordion";
import { Briefcase, GraduationCap, Building } from "lucide-react";
```

Remove: `import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"`

- [ ] **Step 4: Verify**

```bash
bun run check
bun run build
```

Expected: Build passes, experience section shows bouncy accordion with spring animations, filters still work

- [ ] **Step 5: Commit**

```bash
git add src/app/components/Experience.tsx
git commit -m "feat: upgrade Experience section with BouncyAccordion"
```

---

### Task 8: Skills — Tooltip + AnimatedNumber

**Files:**
- Modify: `src/app/components/Skills.tsx`
- Consumes: `@/components/motion/tooltip`, `@/components/motion/animated-number`
- Produces: Skill items with tooltip and animated percentages

- [ ] **Step 1: Read current Skills.tsx**

Read `src/app/components/Skills.tsx` fully.

- [ ] **Step 2: Add Tooltip to skill items**

In the `SkillRow` component, wrap the skill name area:

```tsx
{/* BEFORE: */}
<div className="min-w-0 flex-1">
  <span className="mono-sm text-ink-muted ...">{skill.name}</span>
  <div className="mt-1 h-[3px] overflow-hidden rounded-full bg-white/10">
    <motion.div
      initial={{ width: 0 }}
      whileInView={{ width: `${skill.mastery}%` }}
      ...
    />
  </div>
</div>

{/* AFTER: */}
<div className="min-w-0 flex-1">
  <Tooltip content={`${skill.mastery}%`} side="right" delay={300}>
    <span className="mono-sm text-ink-muted ...">{skill.name}</span>
  </Tooltip>
  <div className="mt-1 h-[3px] overflow-hidden rounded-full bg-white/10">
    <motion.div
      initial={{ width: 0 }}
      whileInView={{ width: `${skill.mastery}%` }}
      ...
    />
  </div>
</div>
```

- [ ] **Step 3: Update imports**

```tsx
import { Tooltip } from "@/components/motion/tooltip";
```

- [ ] **Step 4: Verify**

```bash
bun run check
bun run build
```

Expected: Build passes, skills show mastery percentage on hover via tooltip

- [ ] **Step 5: Commit**

```bash
git add src/app/components/Skills.tsx
git commit -m "feat: add Tooltip to skills section"
```

---

### Task 9: Contact — StatefulButton + AnimatedToastStack

**Files:**
- Modify: `src/app/components/Contact.tsx`
- Consumes: `@/components/motion/button` (StatefulButton), `@/components/motion/animated-toast-stack`
- Produces: Form submit button with loading/success/error states + toast notifications

- [ ] **Step 1: Read current Contact.tsx**

Read `src/app/components/Contact.tsx` fully.

- [ ] **Step 2: Add AnimatedToastStack hook + integration**

```tsx
import {
  AnimatedToastStack,
  useAnimatedToastStack,
} from "@/components/motion/animated-toast-stack";

// Inside component:
const { toasts, showToast, dismissToast } = useAnimatedToastStack({
  limit: 3,
  defaultDuration: 4000,
});

// In render, add:
<AnimatedToastStack
  toasts={toasts}
  onDismiss={dismissToast}
  position="bottom-right"
  placement="fixed"
  maxVisible={3}
/>
```

- [ ] **Step 3: Replace submit button with StatefulButton**

```tsx
{/* BEFORE: */}
<Button
  type="submit"
  disabled={status === "loading"}
  className="w-full"
>
  {status === "loading" ? (
    <>
      <Loader2 size={14} className="animate-spin" />
      Sending...
    </>
  ) : (
    <>
      <Send size={14} />
      Send Message
    </>
  )}
</Button>

{/* AFTER: */}
<StatefulButton
  type="submit"
  state={status}
  variant="primary"
  size="md"
  className="w-full"
  loadingText="Sending..."
  successText="Sent!"
  errorText="Try again"
>
  Send Message
</StatefulButton>
```

- [ ] **Step 4: Replace inline success/error state with toast**

Modify `onSubmit`:

```tsx
const onSubmit = useCallback(async (data: FormData) => {
  if (data.company) return;
  setStatus("loading");
  setErrorMessage("");
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const body = await res.json();
    if (!res.ok) throw new Error(body.error || "Failed to send");
    setStatus("success");
    reset();
    showToast({ status: "success", title: "Message sent!", description: "I'll get back to you soon." });
  } catch (e) {
    setStatus("error");
    const msg = e instanceof Error ? e.message : "Something went wrong";
    setErrorMessage(msg);
    showToast({ status: "error", title: "Failed to send", description: msg });
  }
}, [reset, showToast]);
```

- [ ] **Step 5: Remove inline success state view**

Remove the entire block (lines 129-147):
```tsx
{status === "success" ? (
  <div className="flex flex-col items-center gap-4 py-10 ...">
    ...
  </div>
) : (
  <form ...>
  ...
  </form>
)}
```

Replace with just the form (status === "success" is now handled by toast + StatefulButton):

```tsx
<form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
  {/* ... form content ... */}
  {status === "error" && (
    <p className="text-xs text-destructive text-center">{errorMessage}</p>
  )}
</form>
```

- [ ] **Step 6: Remove unused imports**

Remove `import { Loader2, Check } from "lucide-react"` if they're no longer used. Keep `Send`.

- [ ] **Step 7: Verify**

```bash
bun run check
bun run build
```

Expected: Build passes, form submits with animated button, success/error appears as toast notification

- [ ] **Step 8: Commit**

```bash
git add src/app/components/Contact.tsx
git commit -m "feat: upgrade Contact with StatefulButton and AnimatedToastStack"
```

---

### Task 10: Polish — 404 Page

**Files:**
- Create: `src/app/not-found.tsx`
- Consumes: `@/components/motion/not-found/glitch`
- Produces: Animated 404 page

- [ ] **Step 1: Create not-found.tsx**

```tsx
import { NotFoundGlitch } from "@/components/motion/not-found/glitch";

export default function NotFound() {
  return (
    <NotFoundGlitch
      code="404"
      title="Page not found"
      description="The page you're looking for doesn't exist or has been moved."
      homeHref="/"
      homeLabel="Go home"
    />
  );
}
```

- [ ] **Step 2: Verify**

```bash
bun run check
bun run build
```

Expected: Build passes, navigating to `/nonexistent` shows glitch 404 animation

- [ ] **Step 3: Commit**

```bash
git add src/app/not-found.tsx
git commit -m "feat: add beUI Glitch 404 page"
```

---

### Task 11: Final Verification

**Files:**
- Verify: Entire application
- Consumes: All previous tasks
- Produces: Verified working build

- [ ] **Step 1: Run full check**

```bash
bun run check
```

- [ ] **Step 2: Run build**

```bash
bun run build
```

- [ ] **Step 3: Manual spot-check**

Verify on key sections:
- Hero: shader background animates, text reveals, marquee scrolls, buttons magnetic
- Navbar: drawer opens/closes on mobile, theme toggle works, tooltips appear
- Projects: tilt card effect on hover
- Experience: bouncy accordion with spring animation
- Skills: tooltip shows mastery on hover
- Contact: form submit shows stateful button + toast notification
- 404: glitch animation on invalid route
- Smooth scroll: page scrolls smoothly with Lenis
- Scroll progress: bar visible at bottom of viewport

- [ ] **Step 4: Fix any issues**

If any step fails, fix and re-run verification.

- [ ] **Step 5: Final commit if needed**

```bash
git add -A
git commit -m "chore: final beUI integration fixes"
```
