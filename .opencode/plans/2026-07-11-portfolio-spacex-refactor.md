# Portfolio SpaceX Design Refactor — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor portfolio-clean to follow the SpaceX-inspired design language: pure black/white canvas, D-DIN typography, uppercase display with wide tracking, ghost pill buttons, flat surfaces, no accent colors.

**Architecture:** Single-page Next.js App Router app with 8 sections (Hero, About, Skills, Projects, Experience, Achievements, Playground, Contact). Refactor is in-place — same component structure, new design tokens applied via CSS custom properties and Tailwind v4 `@theme`. Heavy components (GlowCard, Magnetic, CountUp, FloatingDock) removed; animations simplified to fade-in/up only.

**Tech Stack:** Next.js 16, React 19, TypeScript 5, Tailwind CSS v4, Framer Motion 12, Lucide React, react-icons

## Global Constraints

- Pure `#000` / `#fff` only — no accent colors (no indigo, emerald, amber, etc.)
- No shadows, no gradients, no glassmorphism, no blur
- Display tiers always UPPERCASE with positive letter-spacing
- D-DIN font (self-hosted free version) — no Inter, no Plus Jakarta Sans
- Ghost pill (32px radius, 1px border, transparent bg) is the only button style on marketing sections
- Animations limited to: fade-up on scroll, stagger (max 100ms), no spring/parallax/glow
- Dark + Light modes retained with new tokens

---

## Files to Create

- `public/fonts/D-DIN.woff2`
- `public/fonts/D-DIN-Bold.woff2`

## Files to Modify

- `src/app/globals.css` — rewrite theme tokens, typography classes
- `src/app/layout.tsx` — swap font loading, update imports
- `src/app/utils/animations.ts` — keep only fadeUp/stagger/easeOut
- `src/app/components/Hero.tsx` — flat display-xxl, no parallax/orbs/magnetic/countup
- `src/app/components/About.tsx` — flat cards, no GlowCard, no accent
- `src/app/components/Skills.tsx` — badge grid, remove sim/bars, retain icons
- `src/app/components/Projects.tsx` — flat cards, simplify filter, no GlowCard
- `src/app/components/Experience.tsx` — minimal timeline, no GlowCard
- `src/app/components/Achievements.tsx` — simple grid, no GlowCard
- `src/app/components/Playground.tsx` — flat cards, no 3D flip, no GlowCard
- `src/app/components/Contact.tsx` — simplify, remove GlowCard, remove accent colors
- `src/app/components/Footer.tsx` — adjust tokens
- `src/app/components/Navbar.tsx` — transparent fixed, micro-cap, no glass/progress
- `src/app/components/ThemeProvider.tsx` — update theme-color values
- `src/app/components/ui/Button.tsx` — rewrite as ghost pill
- `src/app/components/ui/Reveal.tsx` — simplify (already mostly fine)

## Files to Delete

- `src/app/components/ui/GlowCard.tsx`
- `src/app/components/ui/Magnetic.tsx`
- `src/app/components/ui/CountUp.tsx`
- `src/app/components/FloatingDock.tsx`
- `src/app/components/ScrollToTop.tsx`
- `src/app/utils/useReducedAnimation.ts`

## Files Retained (no changes)

- `src/app/page.tsx`
- `src/app/components/ui/CodeBlock.tsx`
- `src/app/components/ui/CopyEmail.tsx`
- `src/app/components/ui/VisitorCounter.tsx`
- `src/app/components/KeyboardNav.tsx`
- `src/app/data/projects.ts`
- `src/app/data/experience.ts`
- `src/app/data/codeSnippets.ts`
- API routes (`src/app/api/contact/route.ts`, `src/app/api/visitor/route.ts`)

---

### Task 1: Download & Self-Host D-DIN Font

**Files:**
- Create: `public/fonts/D-DIN.woff2`
- Create: `public/fonts/D-DIN-Bold.woff2`

**Interfaces:**
- Consumes: nothing
- Produces: font files in `public/fonts/`

- [ ] **Step 1: Search for free D-DIN font files**

Search the web for the freely available "D-DIN" font by Datto or common freeware version. Look for woff2 format files. Try sources like Google Fonts alternatives, font repositories, or the DIN Type Foundry free version.

- [ ] **Step 2: Download D-DIN Regular woff2**

Download to `public/fonts/D-DIN.woff2`

- [ ] **Step 3: Download D-DIN Bold woff2**

Download to `public/fonts/D-DIN-Bold.woff2`

- [ ] **Step 4: Verify font files exist**

Run: `ls -la public/fonts/`
Expected: `D-DIN.woff2`, `D-DIN-Bold.woff2`

---

### Task 2: Rewrite globals.css with New Theme Tokens

**Files:**
- Modify: `src/app/globals.css` (full rewrite)

**Interfaces:**
- Consumes: nothing
- Produces: CSS custom properties for canvas, ink, hairline tokens; typography classes; D-DIN font-face declarations; border-radius scale

- [ ] **Step 1: Replace entire globals.css**

Replace the file. Key changes:
- D-DIN font-face declarations (self-hosted)
- `@theme` block with `--font-din` as the single font family
- Color tokens: `canvas` (`#000000`/`#ffffff`), `canvas-card` (`#0a0a0a`/`#f0f0fa`), `ink` (`#ffffff`/`#000000`), `ink-mute` (`#f0f0fa`/`#5a5a5f`), `hairline` (`#3a3a3f`/`#e0e0e8`)
- No accent colors, no shadows, no glassmorphism, no gradients
- Typography utility classes: `.display-xxl`, `.display-xl`, `.display-lg`, `.body-lg`, `.body-md`, `.button-cap`, `.micro-cap`, `.caption`
- Border radius tokens matching DESIGN.md: `xs` 4px, `sm` 8px, `md` 16px, `pill` 32px, `full` 9999px
- Page entrance animation retained (simple fade)
- Reduced motion support retained

```css
@import "tailwindcss";

@custom-variant dark (&:where([data-theme="dark"], [data-theme="dark"] *));

@font-face {
  font-family: "D-DIN";
  src: url("/fonts/D-DIN.woff2") format("woff2");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "D-DIN";
  src: url("/fonts/D-DIN-Bold.woff2") format("woff2");
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

@theme {
  --font-din: "D-DIN", "Arial Narrow", Arial, Verdana, sans-serif;

  --color-canvas: var(--theme-canvas);
  --color-canvas-card: var(--theme-canvas-card);
  --color-ink: var(--theme-ink);
  --color-ink-muted: var(--theme-ink-muted);
  --color-hairline: var(--theme-hairline);

  --radius-xs: 4px;
  --radius-sm: 8px;
  --radius-md: 16px;
  --radius-pill: 32px;
  --radius-full: 9999px;
}

:root {
  --theme-canvas: #000000;
  --theme-canvas-card: #0a0a0a;
  --theme-ink: #ffffff;
  --theme-ink-muted: #f0f0fa;
  --theme-hairline: #3a3a3f;

  --theme-scrollbar-track: #000000;
  --theme-scrollbar-thumb: #0a0a0a;
  --theme-scrollbar-thumb-hover: #3a3a3f;
  --theme-placeholder: #5a5a5f;
  --html-bg: #000000;
  --color-scheme: dark;
}

[data-theme="light"] {
  --theme-canvas: #ffffff;
  --theme-canvas-card: #f0f0fa;
  --theme-ink: #000000;
  --theme-ink-muted: #5a5a5f;
  --theme-hairline: #e0e0e8;

  --theme-scrollbar-track: #ffffff;
  --theme-scrollbar-thumb: #e0e0e8;
  --theme-scrollbar-thumb-hover: #5a5a5f;
  --theme-placeholder: #a1a1aa;
  --html-bg: #ffffff;
  --color-scheme: light;
}

html {
  background-color: var(--html-bg);
  color-scheme: var(--color-scheme);
}

body {
  background-color: var(--html-bg);
  color: var(--theme-ink-muted);
  font-family: var(--font-din);
  font-size: 16px;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track {
  background: var(--theme-scrollbar-track);
}
::-webkit-scrollbar-thumb {
  background: var(--theme-scrollbar-thumb);
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: var(--theme-scrollbar-thumb-hover);
}

.display-xxl {
  font-family: var(--font-din);
  font-size: clamp(40px, 7vw, 80px);
  font-weight: 700;
  line-height: 0.95;
  letter-spacing: 1.6px;
  text-transform: uppercase;
  color: var(--theme-ink);
}

.display-xl {
  font-family: var(--font-din);
  font-size: clamp(36px, 5vw, 60px);
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  color: var(--theme-ink);
}

.display-lg {
  font-family: var(--font-din);
  font-size: clamp(28px, 4vw, 48px);
  font-weight: 700;
  line-height: 1.25;
  letter-spacing: 0.96px;
  text-transform: uppercase;
  color: var(--theme-ink);
}

.body-lg {
  font-size: 16px;
  font-weight: 400;
  line-height: 1.7;
  letter-spacing: 0.32px;
  color: var(--theme-ink-muted);
}

.body-md {
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: 0.32px;
  color: var(--theme-ink-muted);
}

.button-cap {
  font-family: var(--font-din);
  font-size: 13px;
  font-weight: 700;
  line-height: 0.94;
  letter-spacing: 1.17px;
  text-transform: uppercase;
}

.micro-cap {
  font-family: var(--font-din);
  font-size: 12px;
  font-weight: 400;
  line-height: 2;
  letter-spacing: 0.96px;
  text-transform: uppercase;
}

.caption {
  font-size: 13px;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: 0;
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

- [ ] **Step 2: Verify CSS compiles**

Run: `npx tailwindcss --input src/app/globals.css`
Expected: no errors

---

### Task 3: Update layout.tsx — Font Loading & Imports

**Files:**
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Consumes: globals.css from Task 2
- Produces: root layout with D-DIN font, updated theme-color, removed FloatingDock/ScrollToTop imports

- [ ] **Step 1: Rewrite layout.tsx**

Changes:
- Remove `Inter` and `Plus_Jakarta_Sans` imports from `next/font/google`
- Remove font variable classes from `<html>` (D-DIN loaded via @font-face)
- Remove `FloatingDock`, `ScrollToTop` imports and JSX
- Keep `KeyboardNav`
- Update theme-color meta values to `#000000` (dark) / `#ffffff` (light)
- Update body classes: `bg-canvas font-din text-ink-muted antialiased`

```tsx
import "./globals.css";
import type { Metadata } from "next";
import Navbar from "./components/Navbar";
import KeyboardNav from "./components/KeyboardNav";
import Footer from "./components/Footer";
import { ThemeProvider } from "./components/ThemeProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-amber-ten-22.vercel.app"),
  title: {
    default: "Ken Zamariyan | Full-Stack Developer",
    template: "%s | Ken Zamariyan",
  },
  description:
    "Full-stack developer building with React, Next.js, Go, Python, and PostgreSQL. Shipping production apps across web, mobile, and AI — from contract analyzers to mobile POS systems.",
  keywords: ["Ken Zamariyan", "Full-Stack Developer", "React Developer", "Go Developer", "Next.js Developer", "React Native Developer", "TypeScript", "PostgreSQL"],
  authors: [{ name: "Ken Zamariyan" }],
  creator: "Ken Zamariyan",
  openGraph: {
    title: "Ken Zamariyan | Full-Stack Developer",
    description:
      "Full-stack development across React, Go, Python, PostgreSQL, and cloud infrastructure. AI-powered apps, mobile POS, e-commerce, and more.",
    url: "/",
    siteName: "Ken Zamariyan Portfolio",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Ken Zamariyan portfolio preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ken Zamariyan | Full-Stack Developer",
    description: "React, Go, Python, PostgreSQL, AI, and cloud-native apps.",
    images: ["/opengraph-image"],
  },
  icons: {
    icon: [
      { url: "/favicon/favicon.ico", sizes: "any" },
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/favicon/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/favicon/site.webmanifest",
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className="scroll-smooth"
      data-theme="dark"
      style={{ colorScheme: "dark" }}
    >
      <head>
        <meta name="theme-color" content="#000000" id="theme-color-meta" />
        <script dangerouslySetInnerHTML={{
          __html: `
            (function(){
              var t = localStorage.getItem("theme");
              if (t === "light" || t === "dark") {
                document.documentElement.setAttribute("data-theme", t);
              } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
                document.documentElement.setAttribute("data-theme", "light");
              }
              var meta = document.getElementById("theme-color-meta");
              if (meta) {
                meta.setAttribute("content", document.documentElement.getAttribute("data-theme") === "dark" ? "#000000" : "#ffffff");
              }
            })();
          `,
        }} />
      </head>
      <body className="bg-canvas font-din text-ink-muted antialiased">
        <a
          href="#main-content"
          className="fixed -top-full left-4 z-[100] rounded-b-md bg-ink px-4 py-2.5 text-sm font-semibold text-canvas transition-all duration-200 focus:top-0 focus:outline-2 focus:outline-offset-0 focus:outline-ink"
        >
          Skip to main content
        </a>
        <ThemeProvider>
          <KeyboardNav />
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
```

---

### Task 4: Simplify ThemeProvider

**Files:**
- Modify: `src/app/components/ThemeProvider.tsx`

- [ ] **Step 1: Update theme-color values in apply function**

Change `#030303` → `#000000` and `#f5f5f5` → `#ffffff`:

```tsx
const apply = useCallback((t: Theme) => {
  document.documentElement.setAttribute("data-theme", t);
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", t === "dark" ? "#000000" : "#ffffff");
}, []);
```

---

### Task 5: Simplify animations.ts

**Files:**
- Modify: `src/app/utils/animations.ts`

- [ ] **Step 1: Replace entire file**

```tsx
import type { Variants } from "framer-motion";

export const easeOut = [0.16, 1, 0.3, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easeOut } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.35, ease: easeOut } },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.08 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: easeOut },
  },
};
```

---

### Task 6: Rewrite Button Component — Ghost Pill

**Files:**
- Modify: `src/app/components/ui/Button.tsx`

- [ ] **Step 1: Rewrite Button.tsx**

```tsx
import Link from "next/link";

type ButtonVariant = "ghost" | "filled";

const base =
  "inline-flex items-center justify-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 rounded-[32px] button-cap px-6 py-3";

const variants: Record<ButtonVariant, string> = {
  ghost:
    "border border-ink text-ink bg-transparent hover:bg-canvas-card",
  filled:
    "border border-hairline text-ink bg-canvas-card hover:bg-hairline",
};

interface ButtonProps {
  variant?: ButtonVariant;
  href?: string;
  download?: boolean;
  target?: string;
  rel?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export default function Button({
  variant = "ghost",
  href,
  download,
  target,
  rel,
  type = "button",
  disabled,
  className = "",
  children,
  onClick,
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link
        href={href}
        download={download}
        target={target}
        rel={rel}
        className={classes}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      className={classes}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
```

---

### Task 7: Rewrite Navbar — Transparent, Micro-cap, No Glass

**Files:**
- Modify: `src/app/components/Navbar.tsx`

- [ ] **Step 1: Rewrite Navbar.tsx**

Key changes:
- Remove `Magnetic` import and usage
- Remove `motion.div` scroll progress bar
- Remove `scrolled` state glass effect (always transparent bg)
- Change nav items to `micro-cap` (uppercase, 12px)
- Remove backdrop-blur, border, shadow
- Replace accent colors with ink/hairline tokens
- Simplify mobile menu to solid canvas background

```tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useTheme } from "./ThemeProvider";

const sections = ["home", "about", "skills", "projects", "experience", "achievements", "playground", "contact"];

export default function Navbar() {
  const { theme, toggle } = useTheme();
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const navHeight = useRef(0);

  useEffect(() => {
    const measure = () => {
      navHeight.current = headerRef.current?.offsetHeight ?? 80;
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const threshold = navHeight.current + 20;
      const current = sections.find((id) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= threshold && rect.bottom >= threshold;
      });
      if (current) setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!document.documentElement.style.getPropertyValue("--scrollbar-width")) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.documentElement.style.setProperty("--scrollbar-width", `${scrollbarWidth}px`);
    }
    document.body.classList.toggle("scroll-lock", menuOpen);
    return () => document.body.classList.remove("scroll-lock");
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-4 sm:px-6 py-4">
      <nav className="mx-auto max-w-6xl flex items-center justify-between">
        <Link href="#home" onClick={closeMenu} className="flex items-center gap-2">
          <Image src="/image/brand/logo-white.svg" alt="Ken Zamariyan" width={28} height={28} className="shrink-0" priority />
          <span className="button-cap text-ink hidden sm:inline">kenzamariyan</span>
        </Link>

        <div className="hidden md:flex items-center gap-5">
          <a href="https://github.com/callmezaa" target="_blank" rel="me noopener noreferrer" className="text-ink-muted hover:text-ink transition-colors" aria-label="GitHub">
            <FaGithub size={18} />
          </a>
          <a href="https://www.linkedin.com/in/ken-zamariyan-10b140318/" target="_blank" rel="me noopener noreferrer" className="text-ink-muted hover:text-ink transition-colors" aria-label="LinkedIn">
            <FaLinkedin size={18} />
          </a>
          <button onClick={toggle} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-hairline text-ink-muted hover:text-ink hover:border-ink transition-all cursor-pointer">
            {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
          </button>
          <Link href="#contact" className="micro-cap text-ink-muted hover:text-ink transition-colors">Contact</Link>
        </div>

        <button type="button" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-hairline text-ink-muted hover:text-ink transition-colors md:hidden">
          {menuOpen ? <X size={15} /> : <Menu size={15} />}
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-4 right-4 top-20 border border-hairline bg-canvas p-6 md:hidden z-30">
            <div className="flex flex-col gap-3">
              {sections.map((item, index) => (
                <motion.div key={item} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }}>
                  <Link href={`#${item}`} onClick={closeMenu}
                    className={`micro-cap flex h-11 items-center justify-between rounded-lg px-4 transition-all ${active === item ? "bg-canvas-card text-ink" : "text-ink-muted hover:bg-canvas-card hover:text-ink"}`}>
                    {item}
                  </Link>
                </motion.div>
              ))}
              <div className="h-px bg-hairline my-2" />
              <button onClick={toggle}
                className="flex items-center justify-center gap-2 rounded-full border border-hairline px-4 py-2 micro-cap text-ink-muted hover:text-ink transition-colors cursor-pointer w-full">
                {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
                <span>{theme === "dark" ? "Light" : "Dark"} Mode</span>
              </button>
              <div className="flex items-center justify-around py-2">
                <a href="https://github.com/callmezaa" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-ink-muted hover:text-ink" onClick={closeMenu}>
                  <FaGithub size={18} /><span className="micro-cap">GitHub</span>
                </a>
                <a href="https://www.linkedin.com/in/ken-zamariyan-10b140318/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-ink-muted hover:text-ink" onClick={closeMenu}>
                  <FaLinkedin size={18} /><span className="micro-cap">LinkedIn</span>
                </a>
              </div>
              <Link href="#contact" onClick={closeMenu}
                className="mt-2 flex h-11 items-center justify-center rounded-[32px] border border-ink text-ink button-cap hover:bg-canvas-card transition-colors">Contact</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
```

---

### Task 8: Rewrite Hero — Flat Display-xxl

**Files:**
- Modify: `src/app/components/Hero.tsx`

- [ ] **Step 1: Rewrite Hero.tsx**

Key changes:
- Remove `Magnetic`, `CountUp`, `Sparkle`, `Download` imports
- Remove mouse tracking, parallax orbs, gradient backgrounds, mesh-grid, vignette
- Remove per-word spring stagger (replace with simple fade-up)
- Remove achievement strip with CountUp
- Remove "Now building" status indicator, role badge
- Keep: display-xxl headline (uppercase), body-lg subtitle, single ghost CTA, avatar (circular, flat)

```tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Button from "./ui/Button";
import { easeOut } from "../utils/animations";

export default function Hero() {
  return (
    <section id="home" className="relative bg-canvas min-h-screen flex flex-col justify-center">
      <div className="relative mx-auto max-w-6xl px-6 md:px-8 w-full">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 w-full space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: easeOut }}
              className="display-xxl"
            >
              9 products shipped across web, mobile, and AI — no fluff.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4, ease: easeOut }}
              className="body-lg max-w-xl"
            >
              From AI contract analyzers and e-commerce marketplaces to
              offline-first mobile POS systems — I build production apps across
              web, mobile, and AI with React, Go, Python, and cloud infrastructure.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.4, ease: easeOut }}
            >
              <Button variant="ghost" href="#projects">Explore Work</Button>
            </motion.div>
          </div>
          <div className="lg:col-span-5 w-full flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5, ease: easeOut }}
            >
              <div className="relative h-[200px] w-[200px] lg:h-[260px] lg:w-[260px] overflow-hidden rounded-full bg-canvas-card">
                <Image src="/image/profile/profile-image.jpeg" alt="Ken Zamariyan" fill priority
                  sizes="(max-width: 1024px) 200px, 260px" className="object-cover object-[center_60%]" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

---

### Task 9: Rewrite About Section — Flat Cards

**Files:**
- Modify: `src/app/components/About.tsx`

- [ ] **Step 1: Rewrite About.tsx**

Key changes:
- Remove `GlowCard` import
- Remove `slideLeft`, `slideRight`, `seqHeader`, `seqLabel`, `seqTitle`, `seqDesc`, `seqContent` variants
- Change accent color refs to ink/hairline
- Replace GlowCard with plain `<div>` with border hairline
- Remove gradient backgrounds, mesh-grid, accent-colored text

```tsx
"use client";

import { motion } from "framer-motion";
import { SiReact, SiNextdotjs, SiGo, SiPython, SiFastapi, SiPostgresql, SiDocker, SiGooglecloud, SiTypescript } from "react-icons/si";
import { easeOut } from "../utils/animations";

const cards = [
  { title: "Full-Stack Engineering", desc: "I build across the entire stack — React/Next.js frontends, Node.js & Go APIs, Python AI services, and PostgreSQL databases." },
  { title: "AI-Powered Products", desc: "I integrate Google Gemini & OpenAI APIs into production apps — from contract analysis to AI chat assistants and smart productivity features." },
  { title: "Multi-Platform Delivery", desc: "I ship responsive web apps, React Native mobile experiences, and Dockerized backends deployed on cloud infrastructure." },
];

export default function About() {
  return (
    <section id="about" className="relative bg-canvas py-24 md:py-28 border-b border-hairline">
      <div className="relative mx-auto max-w-6xl px-6 md:px-8">
        <div className="grid items-center gap-14 md:grid-cols-2 md:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, ease: easeOut }}
            className="space-y-6"
          >
            <p className="micro-cap text-ink-muted">About Me</p>
            <h2 className="display-xl">Building reliable digital products with clarity and purpose.</h2>
            <p className="body-lg">Shipping production apps across web, mobile, and AI — from AI contract analyzers processing documents under 15 seconds to offline-first mobile POS serving 1,500+ cooperative members. TypeScript, Go, Python, and PostgreSQL, end to end.</p>
          </motion.div>
          <div className="space-y-4">
            {cards.map((item) => (
              <motion.div key={item.title}
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.4, ease: easeOut }}
              >
                <div className="p-5 border border-hairline rounded-sm bg-canvas-card">
                  <h3 className="mb-1 body-md font-bold text-ink">{item.title}</h3>
                  <p className="body-md text-ink-muted">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-20 pt-10 border-t border-hairline"
        >
          <p className="micro-cap text-ink-muted text-center mb-6">Technology Arsenal</p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 text-ink-muted">
            <span className="flex items-center gap-3"><SiReact size={20} /><SiNextdotjs size={20} /></span>
            <SiGo size={20} />
            <span className="flex items-center gap-3"><SiPython size={20} /><SiFastapi size={20} /></span>
            <SiPostgresql size={20} />
            <span className="flex items-center gap-3"><SiDocker size={20} /><SiGooglecloud size={20} /></span>
            <SiTypescript size={20} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

---

### Task 10: Rewrite Skills Section — Flat Badge Grid

**Files:**
- Modify: `src/app/components/Skills.tsx`

- [ ] **Step 1: Rewrite Skills.tsx**

Key changes:
- Remove `GlowCard`, `Sparkle` imports
- Remove `scaleRotateIn`, `seqHeader`, `seqLabel`, `seqTitle`, `seqDesc` variants
- Remove `useEffect` for latency sim, POS queue, state toggle
- Remove `useIsVisible` custom hook
- Replace bento grid with flat badge cards
- Remove all interactive widgets
- Retain icons for each category

```tsx
"use client";

import { motion } from "framer-motion";
import {
  SiTypescript, SiReact, SiNextdotjs, SiTailwindcss, SiFirebase,
  SiGo, SiExpress, SiPostgresql, SiRedis, SiDocker, SiGooglecloud, SiPrisma, SiSupabase
} from "react-icons/si";
import { staggerContainer, staggerItem } from "../utils/animations";

const skillCategories = [
  {
    title: "Frontend Architecture",
    icons: [SiReact, SiNextdotjs, SiTypescript, SiTailwindcss],
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    title: "Mobile Platform",
    icons: [SiReact, SiTypescript, SiFirebase],
    items: ["React Native", "Expo", "Firebase", "Offline-first"],
  },
  {
    title: "Backend & Database",
    icons: [SiGo, SiExpress, SiPostgresql, SiRedis],
    items: ["Go (Gin & Fiber)", "Node.js/Express", "PostgreSQL", "Redis", "FastAPI"],
  },
  {
    title: "Infrastructure & AI",
    icons: [SiDocker, SiGooglecloud, SiPrisma, SiSupabase],
    items: ["Docker", "Google Cloud Run", "Prisma", "Supabase", "Gemini/OpenAI API"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="relative bg-canvas py-24 md:py-28 border-b border-hairline">
      <div className="relative mx-auto max-w-6xl px-6 md:px-8">
        <div className="mb-16 max-w-2xl space-y-3">
          <p className="micro-cap text-ink-muted">Capabilities</p>
          <h2 className="display-xl">Expertise Ecosystem</h2>
          <p className="body-lg">A comprehensive mapping of my engineering domains, showcasing the technical depth and workflows I use to launch digital products.</p>
        </div>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="grid gap-6 md:grid-cols-2">
          {skillCategories.map((cat) => (
            <motion.div key={cat.title} variants={staggerItem}
              className="p-6 md:p-8 border border-hairline rounded-sm bg-canvas-card">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="button-cap text-ink">{cat.title}</h3>
                  <div className="flex gap-2 text-ink-muted">
                    {cat.icons.map((Icon, i) => <Icon key={i} size={16} />)}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <span key={item} className="rounded-sm border border-hairline px-3 py-1.5 body-md text-ink-muted">{item}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
```

---

### Task 11: Rewrite Projects Section — Flat Cards

**Files:**
- Modify: `src/app/components/Projects.tsx`

- [ ] **Step 1: Rewrite Projects.tsx**

Key changes:
- Remove `GlowCard` import and usage
- Remove `clipRevealUp`, `seqHeader`, `seqLabel`, `seqTitle`, `seqDesc` variants
- Remove `Sparkle`, `Award`, `Lock`, `ChevronDown`, `AlertTriangle`, `FileText` icons (keep `ExternalLink`, `Github`, `Play`, `X`)
- Remove `codeSnippets` import and accordion/code expand sections
- Replace `GlowCard` in `ProjectCard` with flat `<div className="p-6 md:p-10 border border-hairline rounded-sm bg-canvas-card">`
- Replace `GlowCard` in `ProjectMiniCard` with flat `<div>`
- Simplify filter tabs: remove `layoutId` spring indicator, use simple `border-b-2 border-ink` active state
- Remove `product-shadow`, `hover:scale`, `hover:shadow` classes
- Remove all gradient backgrounds
- Remove all accent-colored elements (badge colors, icon colors, text gradient)
- Remove accordion state and JSX for case details + code snippets
- Use `fadeUp` from animations instead of `clipRevealUp`
- Project preview components (ScreenshotShowcase, PhoneShowcase, ProjectPreview) can stay but remove any shadow/glow/gradient/hover-scale effects from their containers

---

### Task 12: Rewrite Experience Section — Minimal Timeline

**Files:**
- Modify: `src/app/components/Experience.tsx`

- [ ] **Step 1: Rewrite Experience.tsx**

Full rewrite content provided in the `.opencode/plans/2026-07-11-portfolio-spacex-refactor-design.md` file. Key changes:
- Remove `GlowCard` import and usage
- Remove `timelineItem`, `timelineDot`, `timelineCard`, `seqHeader`, `seqLabel`, `seqTitle`, `seqDesc` variants
- Remove `typeConfig` accent colors — use ink/hairline only
- Replace `GlowCard` with flat `<div>`
- Use simple `fadeUp` for entrance animation

---

### Task 13: Rewrite Achievements Section — Flat Cards

**Files:**
- Modify: `src/app/components/Achievements.tsx`

- [ ] **Step 1: Rewrite Achievements.tsx**

Key changes:
- Remove `GlowCard` import and usage
- Remove `seqHeader`, `seqLabel`, `seqTitle`, `seqDesc`, `staggerContainer`, `staggerItem` variants (import from animations.ts directly)
- Remove `useReducedVariants` import
- Replace `GlowCard` with flat `<div>`
- Remove `color` and `glowColor` from Certificate interface
- Remove accent-colored text (cert.color references)

---

### Task 14: Rewrite Playground Section — Flat Cards

**Files:**
- Modify: `src/app/components/Playground.tsx`

- [ ] **Step 1: Rewrite Playground.tsx**

Key changes:
- Remove `GlowCard` import and usage
- Remove `seqHeader`, `seqLabel`, `seqTitle`, `seqDesc` variants
- Remove `useReducedVariants` import
- Remove `Ticker` component (animated bars)
- Remove `flipCard` variants — use `staggerItem` instead
- Replace `GlowCard` with flat `<div>`
- Remove accent-colored icon containers

---

### Task 15: Rewrite Contact Section — Simplify

**Files:**
- Modify: `src/app/components/Contact.tsx`

- [ ] **Step 1: Rewrite Contact.tsx**

Key changes:
- Remove `GlowCard` import and usage
- Remove `seqHeader`, `seqLabel`, `seqTitle`, `seqDesc`, `seqContent` variants
- Replace `GlowCard` info cards with flat `<div>`
- Remove accent colors from form border/focus states (use `border-hairline focus:border-ink`)
- Remove accent-colored Calendly button (use ghost style)

---

### Task 16: Rewrite Footer — Adjust Tokens

**Files:**
- Modify: `src/app/components/Footer.tsx`

- [ ] **Step 1: Update token references**

Replace:
- `border-white/5` → `border-hairline`
- `text-zinc-*` → `text-ink-muted` or `text-ink`
- `bg-zinc-*` → `bg-canvas-card`

---

### Task 17: Delete Removed Components

**Files:**
- Delete: `src/app/components/ui/GlowCard.tsx`
- Delete: `src/app/components/ui/Magnetic.tsx`
- Delete: `src/app/components/ui/CountUp.tsx`
- Delete: `src/app/components/FloatingDock.tsx`
- Delete: `src/app/components/ScrollToTop.tsx`
- Delete: `src/app/utils/useReducedAnimation.ts`

- [ ] **Step 1: Remove files**

```bash
rm src/app/components/ui/GlowCard.tsx
rm src/app/components/ui/Magnetic.tsx
rm src/app/components/ui/CountUp.tsx
rm src/app/components/FloatingDock.tsx
rm src/app/components/ScrollToTop.tsx
rm src/app/utils/useReducedAnimation.ts
```

---

### Task 18: Build & Verify

**Files:**
- None

- [ ] **Step 1: Run Next.js build**

```bash
npm run build
```
Expected: Build succeeds

- [ ] **Step 2: Check for remaining accent colors, shadows, glass**

```bash
rg -i "indigo|emerald|amber|violet|cyan|shadow|blur|backdrop-blur|glass|gradient|glow" src/ --include "*.tsx" --include "*.css"
```
Expected: Only project data image filenames or false positives

- [ ] **Step 3: Check no imports of deleted components**

```bash
rg "GlowCard|Magnetic|CountUp|FloatingDock|ScrollToTop|useReducedAnimation" src/ --include "*.tsx"
```
Expected: No results

- [ ] **Step 4: Check no seqHeader/seqLabel/seqTitle/seqDesc/seqContent imports**

```bash
rg "seqHeader|seqLabel|seqTitle|seqDesc|seqContent" src/components/ --include "*.tsx"
```
Expected: No results

- [ ] **Step 5: Run lint**

```bash
npm run lint
```
Expected: Lint passes
