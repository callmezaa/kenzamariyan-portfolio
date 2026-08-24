<a href="https://github.com/callmezaa/kenzamariyan-portfolio">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://opengraph.githubassets.com/1/kenzamariyan-portfolio">
    <img alt="Ken Zamariyan — Portfolio" src="https://opengraph.githubassets.com/1/callmezaa/kenzamariyan-portfolio">
  </picture>
</a>

<p align="center">
  <b>Bilingual developer portfolio • Next.js 16 • React 19 • Tailwind CSS v4</b><br>
  AI contract analysis · Real-time messaging · Offline-first POS · Collaborative interview platform
</p>

<p align="center">
  <a href="https://kenzamariyan.is-a.dev">Live Site</a> ·
  <a href="#features">Features</a> ·
  <a href="#tech-stack">Tech Stack</a> ·
  <a href="#getting-started">Getting Started</a> ·
  <a href="#environment">Environment</a>
</p>

---

## Overview

Personal portfolio and signature case studies hub for **Ken Zamariyan** — a Frontend & Mobile Product Engineer specializing in production-grade digital platforms with structural speed, readability, and design integrity.

Built with **Next.js 16 App Router**, **React 19**, **Tailwind CSS v4**, and **Motion**, featuring bilingual EN/ID content, dark/light mode with no flash-of-wrong-theme, smooth inertial scrolling, and interactive project case studies.

## Features

### Interface & Experience
- **Bilingual EN / ID** — next-intl with cookie-based locale persistence and a language toggle; all UI copy and project case studies localized
- **Dark / Light mode** — next-themes on a `data-theme` attribute, dark by default, localStorage persistence, inline no-flash script, and live `theme-color` meta sync for mobile browser chrome
- **Floating dock** — macOS-inspired magnetic dock with scroll-spy active-section tracking that hides on scroll down
- **Keyboard navigation** — digit keys `1`–`8` jump to sections in page order (claimed only when the target exists); `Ctrl/Cmd + K` opens a command palette for navigation and links
- **Lenis smooth scrolling** — inertial scroll wrapper with `prefers-reduced-motion` fallback
- **Scroll progress bar** — bottom-edge progress indicator
- **Accessible by default** — skip-to-content link, focus-trapped dialogs, Escape/arrow-key handling, ARIA labels on icon-only controls

### Project Showcase
- **Grid / list view toggle** for the home project grid, connected to detail pages via **View Transitions**
- **Tabbed case studies** per project — Overview (Challenge / Solution / Impact), Architecture (decision accordions), AI Pipeline or Site Map, Technical, Screenshots
- **Metric cards** with animated number tickers
- **Technical deep-dives** — API endpoint tables, code snippets with one-click copy, and architecture decision records
- **Phone screenshot layouts** for mobile app case studies
- **Exploration section** — visual experiment gallery with keyboard-navigable lightbox

### Engagement
- **Certificates gallery** — credential previews with an accessible lightbox (focus trap, arrow-key paging) and download links
- **Download CV dialog** — embedded PDF preview before download
- **Contact form** — react-hook-form + Zod validation, animated stateful submit button, toast notifications, rate-limited Resend email delivery (5 submissions/hour/IP)

### Performance & SEO
- React Compiler enabled
- JSON-LD structured data (site graph + per-project schemas)
- Sitemap + robots.txt
- Dynamic OpenGraph image generation per project
- Optimized `next/image` with priority loading and responsive sizes

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router, Turbopack, React Compiler) |
| **UI** | React 19, Tailwind CSS v4, Motion 12 |
| **Language** | TypeScript 5 |
| **i18n** | next-intl (EN / ID) |
| **Email** | Resend (serverless API) |
| **Fonts** | Geist Sans, Geist Mono, JetBrains Mono |
| **Icons** | Lucide React, Simple Icons |
| **Deployment** | Vercel |

## Architecture

```
src/
├── app/
│   ├── api/contact/          # POST /api/contact — Resend email delivery (rate-limited)
│   ├── components/           # Section & layout components (Hero, Projects, DockNav, …)
│   │   └── project-detail/   # Case-study sections (metrics, architecture, technical…)
│   ├── data/                 # Localized content data (projects, skills, experience,
│   │                         #   tech arsenal, explorations) as en/id module pairs
│   ├── projects/             # /projects index + [slug] case-study route with
│   │                         #   dynamic OG image generation
│   ├── utils/                # Animation variants, keyboard navigation hook
│   ├── globals.css           # Theme tokens (light/dark via [data-theme])
│   ├── layout.tsx            # Root layout, fonts, theme bootstrap, JSON-LD
│   ├── not-found.tsx
│   └── page.tsx              # Home: Hero → Projects → About → Skills →
│                             #   Experience → Achievements → Exploration → Contact
├── components/
│   ├── motion/               # Vendored motion primitives (reveal, tooltip,
│   │                         #   command palette, smooth scroll, …)
│   └── ui/                   # shadcn-style primitives (button, dialog, accordion…)
├── i18n/                     # Locale config, request config, data accessors
├── lib/                      # SEO schemas, section registry, easing, utils
└── messages/                 # en.json / id.json UI strings
```

Single source of truth: `src/lib/sections.ts` defines the home-section order shared by the dock, digit hotkeys, and scroll-spy — adding or removing a section updates every navigation surface at once.

## Getting Started

```bash
# Clone
git clone https://github.com/callmezaa/kenzamariyan-portfolio.git

# Install
npm install

# Run
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build

```bash
npm run build    # Production build
npm run lint     # ESLint
```

## Environment

Create `.env.local` in the project root:

```env
# Resend — Contact form email delivery
RESEND_API_KEY=re_xxxxxxxxxxxx

# Canonical site URL — used for metadataBase, sitemap, robots.txt, and OG images
# Defaults to https://kenzamariyan.is-a.dev if unset
NEXT_PUBLIC_SITE_URL=https://kenzamariyan.is-a.dev
```

| Variable | Required | Purpose |
|---|---|---|
| `RESEND_API_KEY` | Yes | Sends contact form submissions to your inbox |
| `NEXT_PUBLIC_SITE_URL` | No | Canonical URL for SEO metadata and OG images |

## Deployment

Deploy on Vercel:

```bash
npx vercel
```

Or connect your GitHub repository to [Vercel](https://vercel.com) for automatic CI/CD. Add the same environment variables from `.env.local` to your Vercel project settings.

## Author

**Ken Zamariyan** — Frontend & Mobile Product Engineer

[GitHub](https://github.com/callmezaa) · [LinkedIn](https://www.linkedin.com/in/ken-zamariyan-10b140318/) · [Portfolio](https://kenzamariyan.is-a.dev)
