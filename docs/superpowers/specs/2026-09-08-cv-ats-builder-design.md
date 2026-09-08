# Design Spec: CV ATS Builder — Portfolio Project Entry (Option A)

Date: 2026-09-08
Status: Approved per-section by user, pending spec review
Scope: Add one new lightweight project entry `cv-ats-builder`

## 1. Background

Repo `https://github.com/callmezaa/cv-engineeringTools` (branch `feature/ats-cv-builder`)
is a privacy-first, ATS-friendly CV builder: Next.js 16 + React 19 + Tailwind v4 +
Zustand persist + @react-pdf/renderer + Zod + Vitest, deployed statically at
`https://cv-ats-builder-beta.vercel.app`. Screenshots added under
`public/image/cv_ats_builder/` (2 files, both verified): `hero_section.png`
(dark intro hero) and `dashboard.png` (builder workspace with live A4 preview).

User decisions:
- Separate project entry with live demo + source buttons
- Not featured (home stays at 6 cards)
- Approach: Option A (lightweight, template-consistent)

## 2. Identity & Placement

- `slug`: `cv-ats-builder`
- Title EN: `ATS CV Builder — Privacy-First CV Studio`
- Title ID: `ATS CV Builder — Studio CV Privasi`
- `type`: `playground` (self-contained client-side tool, same bucket as Pallete Studio)
- `badge`: `Tool`
- `featured`: omitted (falsy) — home grid stays at 6
- `accent`: monochrome to match the product — `color: #e5e5e5`,
  `glow: rgba(229, 229, 229, 0.14)`
- `role`: EN `Frontend Developer` / ID `Pengembang Frontend`
- `year`: `2026`, `timeline`: `2026`
- `client`: EN `Self-initiated` / ID `Inisiatif mandiri`
- `category`: EN `Productivity Tool` / ID `Perkakas Produktivitas`
- `sourceUrl`: `https://github.com/callmezaa/cv-engineeringTools`
- `demoUrl`: `https://cv-ats-builder-beta.vercel.app`

## 3. Content (EN + ID)

EN:
- `summary`: "Privacy-first, ATS-friendly CV builder with live A4 PDF preview,
  job-description tailoring, and one-click PDF export — one master CV, unlimited
  tailored variants, zero accounts, data never leaves the browser."
- `challenge`: "Jobseekers maintain scattered CV copies per application and can't
  tell whether their CV survives applicant tracking systems — or they upload
  personal data to unknown online builders."
- `solution`: "Built a local-first Next.js 16 workspace: one master CV feeding
  unlimited variants with per-variant section toggles and ordering, JD keyword
  matching (covered green / missing amber), rule-based ATS readiness checks,
  real-time A4 preview via @react-pdf/renderer, and JSON backup/restore — all
  persisted in localStorage under one key."
- `impact`: "Fully static deploy with zero env vars; Vitest suite guards state,
  matching, readiness, and formatting; dark mode plus no sign-up friction."
- `stack`: Next.js, React, TypeScript, Tailwind CSS, Zustand,
  @react-pdf/renderer, Zod, Vitest
- `metrics`: `Local-First`, `Live A4 Preview`, `JD Tailoring`, `Zero Backend`

ID mirrors the same structure (translation at implementation time).

Features (6):
1. Master CV + Variants — one source of truth, unlimited role variants, per-variant
   section toggles/ordering/project picks (`dashboard.png`, "Builder")
2. Live A4 Preview + PDF Export — real-time @react-pdf preview, single-column
   real-text template, smart filenames (`dashboard.png`, "Live preview")
3. JD Keyword Tailoring — paste a job description, covered/missing highlighting
   (`dashboard.png`, "Tailoring")
4. ATS Readiness Checks — rule-based required/optional/warning checks pre-export
   (`dashboard.png`, "Readiness")
5. Backup & Restore — full workspace JSON export/import (`hero_section.png`, "Intro")
6. Local-First + Dark Mode — no sign-up, localStorage key `cv-builder:v1`,
   system-aware theme (`hero_section.png`, "Privacy")

## 4. Images & Gallery

- Card: `PROJECT_CARD_IMAGES["cv-ats-builder"] = "/image/cv_ats_builder/hero_section.png"`
- Hero: `PROJECT_HERO_IMAGES["cv-ats-builder"] = "/image/cv_ats_builder/hero_section.png"`
- Gallery in `ProjectDetail.tsx["cv-ats-builder"]`, in order:
  1. `/image/cv_ats_builder/dashboard.png` — Builder
  2. `/image/cv_ats_builder/hero_section.png` — Intro
- Note: item 2 duplicates `heroSrc`, so `showcaseShots`
  (`ProjectDetail.tsx`) filters it automatically — gallery shows Builder only.
- No image files added/renamed/deleted.

## 5. Architecture & Diagram (concise)

- `architecture.monorepo` (repo is not a monorepo — layers instead):
  - `app/` — intro hero + `/builder` workspace (Next.js 16 App Router, static output)
  - `lib/` — `state/` (Zustand + persist, key `cv-builder:v1`), `tailoring/`
    (keyword matcher), `validation/` (ATS rules + Zod schemas), `pdf/` (export +
    filename helpers)
  - `components/` — `editor/`, `cv/` (@react-pdf document + section renderers),
    `intro/`, `layout/`, `ui/` (coss ui primitives)
- `decisions`:
  - Zustand persist over a backend — zero server, zero accounts, zero cost
  - @react-pdf/renderer over html2canvas — real text output stays parseable by ATS
  - Single-column single-color template over fancy layouts — survives parsers
  - Fully static deploy over SSR — zero env vars, preview URL per push
- `endpoints`: `GET /` intro and `GET /builder` workspace — both static, no APIs
- `dataFlow`: fill master CV → create variant per role → paste JD → fix readiness
  issues → export PDF (plus periodic JSON backup)
- `deployment`: `next build` static output → Vercel zero-config, no env vars
- `diagram`: frontend Next.js static site (`Next.js 16 · React 19 · Zustand ·
  @react-pdf/renderer · Tailwind CSS v4`); backend None — 100% localStorage;
  arrow "Zero requests after load"; services: Zustand persist, @react-pdf/renderer,
  Vercel Edge Network
- No `codeSnippets` in Option A (reserved follow-up).

## 6. Files & Implementation Notes

Touch (additive only):
1. `src/app/data/projects/en.ts` — append `cv-ats-builder` object
2. `src/app/data/projects/id.ts` — append translated object
3. `src/app/data/projectImages.ts` — 2 lines (card + hero)
4. `src/app/components/ProjectDetail.tsx` — 1 gallery block (2 items)

Do not touch: `explorations/*`, `experience/*`, existing entries, image files.

## 7. Verification

- `npx tsc --noEmit` clean
- `npx eslint` on touched files clean
- `/projects/cv-ats-builder` renders EN + ID: hero, 6 features, gallery (Builder
  showcase; Intro filtered as hero duplicate), Source + Live Demo buttons
- `/projects` list includes new entry with Tool badge; home grid unchanged (6)
