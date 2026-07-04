<a href="https://github.com/callmezaa/kenzamariyan-portfolio">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://opengraph.githubassets.com/1/kenzamariyan-portfolio">
    <img alt="Ken Zamariyan — Portfolio" src="https://opengraph.githubassets.com/1/callmezaa/kenzamariyan-portfolio">
  </picture>
</a>

<p align="center">
  <b>Production-grade portfolio • Next.js 16 • TypeScript • Tailwind CSS v4</b><br>
  AI contract analysis · Real-time messaging · Offline-first POS · Collaborative interview platform
</p>

<p align="center">
  <a href="https://kenzamariyan.vercel.app">Live Site</a> ·
  <a href="#features">Features</a> ·
  <a href="#tech-stack">Tech Stack</a> ·
  <a href="#getting-started">Getting Started</a> ·
  <a href="#environment">Environment</a>
</p>

---

## Overview

Personal portfolio and signature case studies hub for **Ken Zamariyan** — a Frontend & Mobile Product Engineer specializing in production-grade digital platforms with structural speed, readability, and design integrity.

Built with **Next.js 16 App Router**, **Tailwind CSS v4**, and **Framer Motion**, featuring dark/light mode, live visitor analytics, AI-powered contact form, and interactive project showcases.

## Features

### Interface & Experience
- **Dark / Light mode** — CSS variable theme system with no-flash inline script, localStorage persistence, system preference detection
- **Framer Motion animations** — spring-eased word stagger, scroll-linked parallax, clip-reveal cards, flip-card playground, timeline spring-in dots
- **Responsive design** — adaptive layouts across mobile, tablet, and desktop
- **Keyboard navigation** — Vim-like hotkeys for section jumping
- **Floating Dock** — macOS-inspired app launcher for quick section access

### Project Showcase
- **Filter tabs** — All / AI / Mobile / Full-Stack with spring-animated pill indicator
- **Case study accordions** — Challenge / Solution / Impact per project
- **Screenshot carousels** — interactive tabbed image galleries for web projects
- **Phone mockup carousel** — animated bezel-framed screenshot rotator for mobile apps
- **Code snippet viewer** — VS Code–style `CodeBlock` with syntax highlighting, line numbers, and copy
- **Live mini-app previews** — embedded interactive mockups (POS transaction ticker, chat simulator, analytics charts)

### Analytics & Engagement
- **Visitor counter** — live count in footer with Upstash Redis persistence
- **Contact form** — inline validation on blur, honeypot spam protection, rate-limited Resend email delivery
- **Calendly integration** — modal scheduler for discovery calls
- **Live status indicator** — "Now building InterviewOS" pulsing dot in Hero

### Performance & SEO
- Static generation with dynamic API routes
- Optimized `next/image` with WebP and priority loading
- JSON-LD structured data
- Sitemap + robots.txt
- OpenGraph image generation

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router, Turbopack) |
| **UI** | React 19, Tailwind CSS v4, Framer Motion 12 |
| **Language** | TypeScript 5 |
| **Email** | Resend (serverless API) |
| **Persistence** | Upstash Redis (visitor counter) |
| **Fonts** | Inter, Plus Jakarta Sans (variable) |
| **Icons** | Lucide React |
| **Deployment** | Vercel |

## Architecture

```
src/
├── app/
│   ├── api/
│   │   ├── contact/       # POST /api/contact — Resend email delivery
│   │   └── visitor/       # GET|POST /api/visitor — Redis counter
│   ├── components/
│   │   ├── ui/            # Reusable: Button, GlowCard, CodeBlock, CountUp, Reveal, Magnetic, CopyEmail
│   │   ├── Hero.tsx       # Live status, metric strip, spring word stagger
│   │   ├── Projects.tsx   # Filter tabs, ProjectCard, ScreenshowShowcase, PhoneShowcase, ProjectMiniCard
│   │   ├── About.tsx      # Static gradient + mesh grid layout
│   │   ├── Skills.tsx     # Bento grid with bidirectional visibility detection
│   │   ├── Experience.tsx # Per-type timeline (work/education/org)
│   │   ├── Achievements.tsx # Certificate previews
│   │   ├── Playground.tsx # Flip-card interactive demo
│   │   ├── Contact.tsx    # Form with inline validation + Calendly modal
│   │   ├── Navbar.tsx     # Theme toggle + mobile drawer
│   │   ├── Footer.tsx     # Visitor counter, links, legal
│   │   ├── ThemeProvider.tsx
│   │   ├── FloatingDock.tsx
│   │   ├── KeyboardNav.tsx
│   │   └── ScrollToTop.tsx
│   ├── data/              # Static data: projects, skills, experience, codeSnippets
│   ├── utils/             # Animation variants, hooks (useIntersectionObserver, useIsVisible)
│   ├── hooks/             # Custom React hooks
│   ├── layout.tsx
│   └── page.tsx
└── lib/
    └── visitor.ts         # Redis client wrapper
```

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

# Upstash Redis — Visitor counter persistence
UPSTASH_REDIS_REST_URL=https://xxxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=xxxx

# Calendly — Optional booking link
# NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/yourusername/15min
```

| Variable | Required | Purpose |
|---|---|---|
| `RESEND_API_KEY` | Yes | Sends contact form submissions to your inbox |
| `UPSTASH_REDIS_REST_URL` | No* | Visitor counter persistence across deployments |
| `UPSTASH_REDIS_REST_TOKEN` | No* | Redis auth token |
| `NEXT_PUBLIC_CALENDLY_URL` | No | Enables the "Book a Call" scheduler modal |

*Without Redis, the visitor counter falls back to in-memory (resets on restart).

## Deployment

Deploy on Vercel:

```bash
npx vercel
```

Or connect your GitHub repository to [Vercel](https://vercel.com) for automatic CI/CD. Add the same environment variables from `.env.local` to your Vercel project settings.

## Author

**Ken Zamariyan** — Frontend & Mobile Product Engineer

[GitHub](https://github.com/callmezaa) · [LinkedIn](https://www.linkedin.com/in/ken-zamariyan-10b140318/) · [Portfolio](https://kenzamariyan.vercel.app)
