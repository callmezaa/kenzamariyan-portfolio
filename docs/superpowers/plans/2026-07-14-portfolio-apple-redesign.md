# Portfolio Apple-Inspired Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign portfolio from SpaceX/D-DIN industrial aesthetic to Apple-inspired clean, minimalist, premium design. Content preserved; visual language overhauled.

**Architecture:** Single-page Next.js app with client components. Each section is an independent component. Global styling via globals.css + Tailwind v4 theme. Motion via Framer Motion spring presets.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, Framer Motion 12, Geist font (npm), JetBrains Mono (next/font/google)

**Package already installed:** `geist` (npm). JetBrains Mono loads via `next/font/google`.

## Global Constraints

- Canvas color: `#0a0a0a` (dark), light mode values preserved but adjusted for contrast
- Card radius: `rounded-[14px]`, buttons `rounded-full`
- No `border border-hairline` on cards — use shadow for elevation
- Glass elements: `bg-white/5 backdrop-blur-xl` (dark) or `bg-black/5 backdrop-blur-xl` (light)
- Motion: use spring presets from `src/app/utils/animations.ts`, not inline bezier
- Font: Geist Sans for everything, JetBrains Mono for tech/skills contexts
- All sections retain existing content

---
### Task 1: Global fonts & CSS foundation

**Files:**
- Modify: `src/app/layout.tsx` — load Geist + JetBrains Mono fonts
- Modify: `src/app/globals.css` — restyle CSS variables, shadows, radius, typography

- [ ] **Step 1: Update layout.tsx with new fonts**

Replace current layout font setup with Geist and JetBrains Mono via next/font:

```tsx
// src/app/layout.tsx
import { Geist, Geist_Mono } from "geist/font";
import { JetBrains_Mono } from "next/font/google";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});
```

Update body className to include both font variables:

```tsx
<body className={`${Geist.variable} ${Geist_Mono.variable} ${jetbrainsMono.variable} bg-canvas font-sans text-ink-muted antialiased`}>
```

- [ ] **Step 2: Update globals.css with new design tokens**

Replace the entire file content:

```css
@import "tailwindcss";

@custom-variant dark (&:where([data-theme="dark"], [data-theme="dark"] *));

@theme {
  --font-sans: "Geist", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;

  --color-canvas: var(--theme-canvas);
  --color-canvas-alt: var(--theme-canvas-alt);
  --color-canvas-card: var(--theme-canvas-card);
  --color-canvas-glass: var(--theme-canvas-glass);
  --color-ink: var(--theme-ink);
  --color-ink-muted: var(--theme-ink-muted);
  --color-ink-tertiary: var(--theme-ink-tertiary);
  --color-hairline: var(--theme-hairline);

  --radius-xs: 6px;
  --radius-sm: 10px;
  --radius-md: 14px;
  --radius-lg: 20px;
  --radius-xl: 24px;
  --radius-pill: 9999px;
}

:root {
  --theme-canvas: #0a0a0a;
  --theme-canvas-alt: #0f0f0f;
  --theme-canvas-card: #121212;
  --theme-canvas-glass: rgba(18, 18, 18, 0.7);
  --theme-ink: #ffffff;
  --theme-ink-muted: #a1a1aa;
  --theme-ink-tertiary: #71717a;
  --theme-hairline: rgba(255, 255, 255, 0.08);

  --theme-scrollbar-track: #0a0a0a;
  --theme-scrollbar-thumb: #1a1a1a;
  --theme-scrollbar-thumb-hover: #2a2a2a;
  --theme-placeholder: #52525b;
  --html-bg: #0a0a0a;
  --color-scheme: dark;
}

[data-theme="light"] {
  --theme-canvas: #f5f5f0;
  --theme-canvas-alt: #efefe8;
  --theme-canvas-card: #ffffff;
  --theme-canvas-glass: rgba(255, 255, 255, 0.7);
  --theme-ink: #1a1a1a;
  --theme-ink-muted: #6b6b6b;
  --theme-ink-tertiary: #9a9a9a;
  --theme-hairline: rgba(0, 0, 0, 0.08);

  --theme-scrollbar-track: #f5f5f0;
  --theme-scrollbar-thumb: #d4d4d0;
  --theme-scrollbar-thumb-hover: #b0b0a8;
  --theme-placeholder: #a1a1aa;
  --html-bg: #f5f5f0;
  --color-scheme: light;
}

html {
  background-color: var(--html-bg);
  color-scheme: var(--color-scheme);
}

body {
  background-color: var(--html-bg);
  color: var(--theme-ink-muted);
  font-family: var(--font-sans);
  font-size: 16px;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: var(--theme-scrollbar-track);
}
::-webkit-scrollbar-thumb {
  background: var(--theme-scrollbar-thumb);
  border-radius: 9999px;
}
::-webkit-scrollbar-thumb:hover {
  background: var(--theme-scrollbar-thumb-hover);
}

.display-hero {
  font-family: var(--font-sans);
  font-size: clamp(44px, 6vw, 72px);
  font-weight: 600;
  line-height: 1.05;
  letter-spacing: -0.03em;
  color: var(--theme-ink);
}

.display-xl {
  font-family: var(--font-sans);
  font-size: clamp(32px, 4.5vw, 52px);
  font-weight: 600;
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: var(--theme-ink);
}

.display-lg {
  font-family: var(--font-sans);
  font-size: clamp(24px, 3vw, 36px);
  font-weight: 500;
  line-height: 1.25;
  letter-spacing: -0.015em;
  color: var(--theme-ink);
}

.body-base {
  font-size: 16px;
  font-weight: 400;
  line-height: 1.6;
  letter-spacing: -0.01em;
}

.body-small {
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
}

.label {
  font-family: var(--font-sans);
  font-size: 12px;
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.mono-sm {
  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 400;
  line-height: 1.4;
}

.button-cap {
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: -0.01em;
}

@keyframes page-entrance {
  from { opacity: 0; }
  to { opacity: 1; }
}

@media (prefers-reduced-motion: no-preference) {
  main {
    animation: page-entrance 0.5s ease-out 0.1s both;
  }
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}

section[id] {
  scroll-margin-top: 80px;
}

body.scroll-lock {
  overflow: hidden;
  padding-right: var(--scrollbar-width, 0px);
}

input::placeholder,
textarea::placeholder {
  color: var(--theme-placeholder);
  opacity: 1;
}

*:focus {
  outline: none;
}

*:focus-visible {
  outline: 2px solid var(--theme-ink);
  outline-offset: 3px;
  border-radius: 6px;
}

*,
*::before,
*::after {
  transition: background-color 0.3s ease, border-color 0.3s ease, color 0.15s ease;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    transition: none !important;
  }
}
```

- [ ] **Step 3: Update ThemeProvider theme-color meta for new canvas**

Edit `ThemeProvider.tsx` line 40 to use new canvas color:

```tsx
const meta = document.querySelector('meta[name="theme-color"]');
if (meta) meta.setAttribute("content", t === "dark" ? "#0a0a0a" : "#f5f5f0");
```

- [ ] **Step 4: Update animations.ts with Apple spring presets**

Replace `src/app/utils/animations.ts`:

```tsx
import type { Variants, Transition } from "framer-motion";

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

export const easeOut = [0.16, 1, 0.3, 1] as const;

export const fadeUpSpring: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: appleSpring },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.35, ease: easeOut } },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.08 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: appleSpringGentle,
  },
};
```

- [ ] **Step 5: Build to verify**

Run: `npm run build`
Expected: Build succeeds with no errors.

---
### Task 2: Navbar Apple polish

**Files:**
- Modify: `src/app/components/Navbar.tsx`

- [ ] **Step 1: Rewrite Navbar with glass effect and Apple styling**

Replace Navbar.tsx — keep logic identical, update styling:

- Header: remove `border-b border-hairline` on scroll, use `bg-canvas-glass backdrop-blur-xl shadow-lg shadow-black/20`
- Unsrolled: `bg-transparent` (no change)
- Nav pills: buttons with `rounded-full` instead of `rounded-sm`
- Active indicator: use `bg-ink/10 rounded-full px-4` instead of underline layoutId
- Desktop social/theme icons: pill containers `rounded-full border border-hairline/50`
- Mobile menu: glass panel, `rounded-[20px]`, shadow
- Logo: keep SVG, adjust container

Key edit for header class:

```tsx
<header ref={headerRef} className={`fixed top-0 left-0 w-full z-50 px-4 sm:px-6 py-3 transition-all duration-500 ${
  scrolled
    ? "bg-canvas-glass backdrop-blur-xl shadow-lg shadow-black/20"
    : "bg-transparent"
}`}>
```

Nav item buttons:

```tsx
<button
  key={item}
  onClick={() => scrollToSection(item)}
  className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
    active === item
      ? "bg-white/10 text-ink"
      : "text-ink-muted hover:text-ink hover:bg-white/5"
  }`}
>
  {capitalize(item)}
</button>
```

Social/theme icons:

```tsx
<button onClick={toggle} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-ink-muted hover:text-ink hover:bg-white/5 transition-all cursor-pointer">
  {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
</button>
```

- [ ] **Step 2: Build to verify**

Run: `npm run build`
Expected: Build succeeds.

---
### Task 3: Hero Apple redesign

**Files:**
- Modify: `src/app/components/Hero.tsx`

- [ ] **Step 1: Rewrite Hero with Apple aesthetic**

Key changes:
- Background: `bg-canvas` with `bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.02)_0%,transparent_50%)]`
- Remove section border
- Headline: `display-hero` (already defined in globals.css)
- Subtitle: `body-base text-ink-muted max-w-xl`
- CTAs: `rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20`
- Photo: `w-[180px] h-[180px] lg:w-[220px] lg:h-[220px] rounded-[16px] shadow-lg shadow-black/50` — no ring, no border
- Animations: spring entrance (use `appleSpring`)

Hero section:

```tsx
<section id="home" className="relative bg-canvas min-h-screen flex flex-col pt-32 md:pt-40 overflow-hidden">
  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.02)_0%,transparent_50%)] pointer-events-none" />
  <div className="relative mx-auto max-w-6xl px-6 md:px-8 w-full">
    <div className="flex flex-col lg:grid lg:grid-cols-12 gap-16 items-center">
      <div className="lg:col-span-7 w-full space-y-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={appleSpring}
          className="display-hero"
        >
          Products shipped. Problems solved. No fluff.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...appleSpring, delay: 0.15 }}
          className="body-base text-ink-muted max-w-xl"
        >
          Full-stack engineering across web, mobile, and AI.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...appleSpring, delay: 0.3 }}
          className="flex flex-wrap gap-3"
        >
          <button
            onClick={() => setModalOpen(true)}
            className="group inline-flex cursor-pointer items-center gap-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 px-7 py-3.5 button-cap text-ink-muted transition-all duration-200 hover:bg-white/10 hover:border-white/20 hover:text-ink active:scale-[0.98]"
          >
            <Send size={14} className="transition-transform duration-200 group-hover:-translate-y-0.5" />
            Get in Touch
          </button>
          <button
            onClick={() => setCvModalOpen(true)}
            className="group inline-flex cursor-pointer items-center gap-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 px-7 py-3.5 button-cap text-ink-muted transition-all duration-200 hover:bg-white/10 hover:border-white/20 hover:text-ink active:scale-[0.98]"
          >
            <Download size={14} className="transition-transform duration-200 group-hover:-translate-y-0.5" />
            Download CV
          </button>
        </motion.div>
      </div>
      <div className="lg:col-span-5 w-full flex justify-center lg:justify-end">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.02 }}
          transition={{ ...appleSpring, delay: 0.2 }}
        >
          <div className="relative h-[180px] w-[180px] lg:h-[220px] lg:w-[220px] overflow-hidden rounded-[16px] shadow-lg shadow-black/50">
            <Image src="/image/profile/profile-image.jpeg" alt="Ken Zamariyan" fill priority
              sizes="(max-width: 1024px) 180px, 220px" className="object-cover object-[center_60%]" />
          </div>
        </motion.div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Polish modal styling**

Both modals (Contact and CV) use Apple styling:
- `rounded-[20px]` instead of `rounded-sm`
- `shadow-2xl shadow-black/80`
- Glass header with `backdrop-blur-xl`

Contact modal container:
```tsx
<motion.div ... className="relative w-full max-w-sm border border-white/10 bg-canvas-glass backdrop-blur-xl p-6 rounded-[20px] shadow-2xl shadow-black/80">
```

CV modal container:
```tsx
<motion.div ... className="flex w-full max-w-3xl flex-col overflow-hidden rounded-[20px] border border-white/10 bg-canvas-glass backdrop-blur-xl shadow-2xl shadow-black/80">
```

Close button: `rounded-full border border-white/10 hover:bg-white/10`

- [ ] **Step 3: Build to verify**

Run: `npm run build`
Expected: Build succeeds.

---
### Task 4: Projects section Apple redesign

**Files:**
- Modify: `src/app/components/Projects.tsx`

- [ ] **Step 1: Rewrite Projects styling**

Key changes:
- Section background: `bg-canvas-alt` (alternating)
- No section border
- Card: `rounded-[14px] overflow-hidden shadow-lg shadow-black/40 hover:shadow-xl hover:shadow-black/60` — no border
- Card hover: `-translate-y-2`, image `scale-105`
- Mockup image: `rounded-[14px]` container
- Title: `display-lg` instead of `body-md font-bold`
- View toggle: pill buttons, active = filled white/10
- "View All" button: `rounded-full bg-white/5 backdrop-blur-sm border border-white/10`
- List view: cards with `rounded-[12px] bg-canvas-glass shadow`

Card structure:
```tsx
<Link href={`/projects/${project.slug}`} className="block group">
  <div className="rounded-[14px] overflow-hidden shadow-lg shadow-black/40 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-black/60 group-hover:-translate-y-2">
    <div className="overflow-hidden">
      <Image
        src={projectImages[project.slug]}
        alt={project.title}
        width={1200}
        height={750}
        className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
    </div>
  </div>
  <div className="mt-5 space-y-2">
    <h3 className="display-lg">{project.title}</h3>
    <p className="body-small text-ink-muted">{project.stack.slice(0, 3).join(" · ")}</p>
    <div className="flex items-center gap-2 body-small text-ink-tertiary">
      <span>{project.year}</span>
      {project.badge && (
        <>
          <span className="text-hairline">·</span>
          <span className="mono-sm px-3 py-0.5 rounded-full bg-white/5 text-ink-muted">{project.badge}</span>
        </>
      )}
    </div>
  </div>
</Link>
```

View toggle buttons:
```tsx
<button onClick={() => setView("grid")}
  className={`flex h-9 w-9 items-center justify-center rounded-full transition-all cursor-pointer ${
    view === "grid" ? "bg-white/10 text-ink" : "text-ink-muted hover:text-ink hover:bg-white/5"
  }`}
  aria-label="Grid view">
  <LayoutGrid size={14} />
</button>
```

- [ ] **Step 2: Build to verify**

Run: `npm run build`
Expected: Build succeeds.

---
### Task 5: About section Apple redesign

**Files:**
- Modify: `src/app/components/About.tsx`

- [ ] **Step 1: Restyle About section**

Key changes:
- Background: `bg-canvas` (return to base)
- No section border
- Grid: 7/5 split more asymmetric
- Info cards: `rounded-[14px] bg-canvas-card shadow-lg shadow-black/30 p-5` — no border
- Icon container: `rounded-xl bg-white/5 w-10 h-10`
- Section divider (before Tech Arsenal): spacing + `border-t border-white/5`

Info card structure:
```tsx
<motion.div ... className="flex items-start gap-4 rounded-[14px] bg-canvas-card shadow-lg shadow-black/30 p-5">
  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-ink-muted">
    <item.icon size={18} />
  </div>
  <div>
    <p className="body-base font-semibold text-ink">{item.label}</p>
    <p className="body-small text-ink-muted mt-0.5">{item.desc}</p>
  </div>
</motion.div>
```

- [ ] **Step 2: Build to verify**

Run: `npm run build`
Expected: Build succeeds.

---
### Task 6: Skills section Apple redesign

**Files:**
- Modify: `src/app/components/Skills.tsx`

- [ ] **Step 1: Restyle Skills section**

Key changes:
- Background: `bg-canvas-alt`
- No section border
- Category cards: `rounded-[14px] bg-canvas-glass backdrop-blur-sm shadow-lg shadow-black/30 p-6` — no border
- Hover: `-translate-y-1` with shadow increase
- Skill name: `mono-sm` (JetBrains Mono) instead of `caption`
- Mastery bar: `h-[3px] rounded-pill bg-white/10` background, `bg-ink` fill
- Icon container: `rounded-lg bg-white/5 p-1`
- Section divider: `h-px bg-white/5` instead of `bg-hairline`

Skill card:
```tsx
<motion.div
  variants={staggerItem}
  whileHover={{ y: -2 }}
  transition={{ duration: 0.3, ease: easeOut }}
  className="h-full rounded-[14px] bg-canvas-glass backdrop-blur-sm shadow-lg shadow-black/30 p-6"
>
  <div className="flex w-full flex-col gap-5">
    <h3 className="button-cap text-ink">{category.title}</h3>
    <div className="h-px bg-white/5" />
    <div className="grid grid-cols-2 gap-x-4 gap-y-2">
      {category.skills.map((skill, i) => (
        <SkillRow key={skill.name} skill={skill} index={i} />
      ))}
    </div>
  </div>
</motion.div>
```

SkillRow:
```tsx
function SkillRow({ skill, index }: { ... }) {
  return (
    <div className="group flex cursor-default items-center gap-2 py-1">
      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-lg bg-white/5 p-1">
        {skill.icon ? (
          <skill.icon size={12} className="transition-colors duration-200 group-hover:text-ink" style={{ color: skill.brandColor ?? undefined }} />
        ) : (
          <span className="h-1.5 w-1.5 rounded-full bg-ink-muted" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <span className="mono-sm text-ink-muted transition-colors duration-200 group-hover:text-ink">
          {skill.name}
        </span>
        <div className="mt-1 h-[3px] overflow-hidden rounded-full bg-white/10">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.mastery}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: easeOut, delay: index * 0.05 }}
            className="h-full rounded-full bg-ink"
          />
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Build to verify**

Run: `npm run build`
Expected: Build succeeds.

---
### Task 7: Achievements section Apple redesign

**Files:**
- Modify: `src/app/components/Achievements.tsx`

- [ ] **Step 1: Restyle Achievements section**

Key changes:
- Background: `bg-canvas`
- No section border
- Certificate cards: `rounded-[14px] overflow-hidden shadow-lg shadow-black/30 hover:shadow-xl hover:shadow-black/50 hover:-translate-y-1 bg-canvas-card`
- Preview image: `aspect-[16/10] overflow-hidden rounded-t-[14px]`
- "View Details": `mono-sm` link with arrow animation
- Modal: `rounded-[20px] border border-white/10 bg-canvas-glass backdrop-blur-xl shadow-2xl shadow-black/80`
- Download/View buttons: glass pill style

Certificate card:
```tsx
<motion.div
  whileHover={{ y: -3 }}
  transition={{ duration: 0.3, ease: easeOut }}
  className="rounded-[14px] overflow-hidden shadow-lg shadow-black/30 hover:shadow-xl hover:shadow-black/50 bg-canvas-card h-full flex flex-col transition-shadow duration-300"
>
  <CertificatePreview cert={cert} files={cert.files} />
  <div className="p-5 space-y-2 flex-1">
    <h3 className="body-base font-semibold text-ink">{cert.title}</h3>
    <div className="flex items-center gap-2 body-small text-ink-tertiary">
      <span>{cert.issuer}</span>
      <span className="text-hairline">·</span>
      <span>{cert.year}</span>
    </div>
  </div>
  <div className="px-5 pb-5">
    <button
      onClick={() => setModalIndex(i)}
      className="mono-sm text-ink-muted hover:text-ink transition-colors inline-flex items-center gap-1.5 cursor-pointer group"
    >
      View Details <Eye size={12} className="transition-transform group-hover:translate-x-0.5" />
    </button>
  </div>
</motion.div>
```

- [ ] **Step 2: Build to verify**

Run: `npm run build`
Expected: Build succeeds.

---
### Task 8: Contact section Apple redesign

**Files:**
- Modify: `src/app/components/Contact.tsx`

- [ ] **Step 1: Restyle Contact section**

Key changes:
- Background: `bg-canvas-alt`
- No section border
- Container: `rounded-[20px] bg-canvas-glass backdrop-blur-xl shadow-lg shadow-black/30 p-8 md:p-12`
- Cursor: spring animation
- "Get in Touch" button: `rounded-full bg-white/5 backdrop-blur-sm border border-white/10 p-4`
- Contact modal: `rounded-[20px] border border-white/10 bg-canvas-glass backdrop-blur-xl shadow-2xl shadow-black/80`
- Contact links: glass rows with `rounded-[12px] hover:bg-white/5`

Container:
```tsx
<section id="contact" className="bg-canvas-alt py-24 md:py-28">
  <div className="mx-auto max-w-6xl px-6 md:px-8">
    <div className="rounded-[20px] bg-canvas-glass backdrop-blur-xl shadow-lg shadow-black/30 p-8 md:p-12">
      {/* content */}
    </div>
  </div>
</section>
```

- [ ] **Step 2: Build to verify**

Run: `npm run build`
Expected: Build succeeds.

---
### Task 9: Footer & TechArsenal polish

**Files:**
- Modify: `src/app/components/Footer.tsx`
- Modify: `src/app/components/TechArsenal.tsx`

- [ ] **Step 1: Restyle Footer**

Replace content:

```tsx
<footer className="px-6 py-10">
  <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
    <p className="body-small text-ink-tertiary">
      &copy; 2026 Ken Zamariyan. All rights reserved.
    </p>
    <div className="flex items-center gap-2">
      {socials.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.label}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-ink-muted transition-all hover:bg-white/10 hover:text-ink"
        >
          <s.icon size={14} />
        </a>
      ))}
    </div>
  </div>
</footer>
```

- [ ] **Step 2: Polish TechArsenal styling**

Update category filter buttons to pills:

```tsx
<button
  key={cat}
  onClick={() => handleCategoryChange(cat)}
  className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
    activeCategory === cat
      ? "bg-white/10 text-ink"
      : "text-ink-muted hover:text-ink hover:bg-white/5"
  }`}
>
  {cat}
</button>
```

Update TechCard border/radius:
```tsx
<motion.div ... className="flex min-w-[100px] flex-col items-center gap-1.5 rounded-[12px] bg-canvas-glass backdrop-blur-sm shadow-lg shadow-black/20 p-4 border border-white/5">
```

- [ ] **Step 3: Build to verify**

Run: `npm run build`
Expected: Build succeeds.

---
### Task 10: Final build & visual verification

**Files:**
- All modified files

- [ ] **Step 1: Run full production build**

Run: `npm run build`
Expected: Build succeeds with no warnings.

- [ ] **Step 2: Run lint**

Run: `npm run lint`
Expected: No lint errors.

- [ ] **Step 3: Start dev server and visual check**

Run: `npm run dev`
Visit: http://localhost:3000
Verify:
- [ ] Fonts render as Geist Sans + JetBrains Mono
- [ ] Cards have shadow, no border
- [ ] Navbar has glass effect on scroll
- [ ] Buttons are pill shaped
- [ ] Photo has rounded-[16px] with shadow
- [ ] Colors match dark slate palette
- [ ] Animations feel smooth, spring-based
- [ ] Light mode toggle works correctly
- [ ] Reduced motion respected
