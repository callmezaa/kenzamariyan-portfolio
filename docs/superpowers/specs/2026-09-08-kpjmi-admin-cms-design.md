# Design Spec: KPJMI Admin CMS — Separate Portfolio Project (Option A)

Date: 2026-09-08
Status: Approved per-section by user, pending spec review
Scope: Add one new lightweight project entry `kpjmi-admin-cms` (companion to `koperasi-kpjmi`)

## 1. Background

The KPJMI repo (`https://github.com/callmezaa/koperasi-KPJMI`) evolved from a fully
static company profile into website + self-hosted admin dashboard (`/admin`) backed by
Supabase (Postgres + Auth + Storage). The portfolio entry `koperasi-kpjmi` still
describes the old static architecture ("None — fully static"). New screenshots were
added under `public/image/admin_kpjmi_cms/` (8 files).

User decisions:
- Separate project entry (not merged into `koperasi-kpjmi`)
- No live demo button (admin requires Supabase Auth account) — source only
- Hero/card image: `mockup.png`
- Approach: Option A (lightweight, template-consistent)

## 2. Identity & Placement

- `slug`: `kpjmi-admin-cms`
- Title EN: `KPJMI — Admin CMS Dashboard`
- Title ID: `KPJMI — Dashboard Admin CMS`
- `type`: `dashboard`, `badge`: `CMS`
- `featured`: `false` — home grid (`page.tsx:24` filters `featured`) stays at 6;
  new project appears on `/projects` full list + sitemap. Flip to `true` later to
  feature it on home.
- `accent`: brand red family — `color: #B81104`, `glow: rgba(184, 17, 4, 0.14)`
- `role`: EN `Full-Stack Developer` / ID `Pengembang Full-Stack`
- `year`: `2026`, `timeline`: `2026`
- `client`: `KPJMI — Koperasi Petani Jaya Makmur`
- `category`: EN `Admin Dashboard` / ID `Dashboard Admin`
- `sourceUrl`: `https://github.com/callmezaa/koperasi-KPJMI`
- `demoUrl`: omitted (no Live Demo button renders)

## 3. Content (EN + ID)

EN:
- `summary`: "Self-hosted admin dashboard backing the KPJMI company profile — a
  Supabase-powered CMS for products, gallery, testimonials, FAQ, and contact info,
  so client edits go live instantly with no redeploy."
- `challenge`: "Client content lived in code — every product or gallery change needed
  a developer commit and redeploy."
- `solution`: "Built an `/admin` area with Supabase Auth, CRUD plus ordering and
  visibility toggles across 5 content modules, in-browser WebP image compression
  before Storage upload, and a layered public-site content provider (localStorage
  cache → Supabase → bundled defaults)."
- `impact`: "Non-technical admin independently updates 6 products, 8 gallery photos,
  4 testimonials, and 8 FAQs; the public site never renders blank and updates appear
  without a rebuild."
- `stack`: React, TypeScript, Vite, Tailwind CSS, Supabase, react-router-dom,
  Vercel Analytics
- `metrics`: `5 Content Modules`, `Supabase RLS`, `WebP Uploads`, `Zero Redeploy`

ID mirrors the same structure (translation at implementation time).

Features (7, each mapped to a screenshot):
1. Secure Admin Auth — Supabase Auth email+password, protected routes
   (`login_page.png`, label "Login")
2. Dashboard Monitoring — content counts, Vercel Analytics pointer, Supabase sync
   status (`dashboard.png`, label "Dashboard")
3. Products CRUD — 6 products, arrow ordering, visibility toggle, WebP upload
   (`product_page.png`, label "Products")
4. Gallery Manager — 8 photos, same ordering/visibility pattern
   (`gallery_page.png`, label "Gallery")
5. Testimonials Manager — 4 items (`testimony_page.png`, label "Testimonials")
6. FAQ Manager — 8 questions (`FAQ_page.png`, label "FAQ")
7. Contact Info Manager — WhatsApp, Maps, office details
   (`contact_page.png`, label "Contact")

## 4. Images & Gallery

- Card: `PROJECT_CARD_IMAGES["kpjmi-admin-cms"] = "/image/admin_kpjmi_cms/mockup.png"`
- Hero: `PROJECT_HERO_IMAGES["kpjmi-admin-cms"] = "/image/admin_kpjmi_cms/mockup.png"`
- Gallery in `ProjectDetail.tsx["kpjmi-admin-cms"]`, in order:
  1. `/image/admin_kpjmi_cms/dashboard.png` — Dashboard
  2. `/image/admin_kpjmi_cms/login_page.png` — Login
  3. `/image/admin_kpjmi_cms/product_page.png` — Products
  4. `/image/admin_kpjmi_cms/gallery_page.png` — Gallery
  5. `/image/admin_kpjmi_cms/testimony_page.png` — Testimonials
  6. `/image/admin_kpjmi_cms/FAQ_page.png` — FAQ
  7. `/image/admin_kpjmi_cms/contact_page.png` — Contact
  8. `/image/admin_kpjmi_cms/mockup.png` — Overview
- Note: item 8 duplicates `heroSrc`, so `showcaseShots`
  (`ProjectDetail.tsx:130-132`) filters it automatically — no visual duplicate.
- No image files added/renamed/deleted.

## 5. Architecture & Diagram (concise, Supabase-accurate)

- `architecture.monorepo`:
  - `src/admin/` — login, layout (collapsible sidebar, breadcrumb, account menu),
    CRUD pages per module, per-table API layer
  - `src/content/` — provider + defaults + shared types; resilience order:
    localStorage cache → Supabase fetch → bundled defaults fallback
  - `supabase/schema.sql` + `scripts/seed-supabase.mjs` — tables, RLS policies,
    public `media` bucket, seed content + admin account
- `decisions`:
  - Supabase Postgres over headless CMS — one vendor for DB + Auth + Storage, free
    tier, RLS-gated
  - Public-read / admin-write RLS — visitors read, only authed admin writes
  - Browser-side WebP compression before upload — saves Storage bandwidth
  - react-router-dom for `/admin` inside the Vite SPA (served via `vercel.json`
    SPA rewrite)
- `endpoints` (Supabase tables, not REST): `products`, `gallery`, `testimonials`,
  `faq`, `contact_info` — public read, authenticated write; Storage bucket `media`
  public read
- `dataFlow`: admin login → CRUD/order/visibility edits → image WebP upload to
  Storage → Supabase row write → public provider revalidates → site updates with
  no redeploy
- `deployment`: Vite build → Vercel static + SPA rewrite; env
  `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY`; seed script uses service-role key
  locally only, never committed
- `diagram`: frontend React SPA + admin (`React 19 · Vite 8 · Tailwind CSS v4 ·
  react-router-dom`); backend Supabase (Postgres · Auth · Storage); arrow
  "Supabase client, RLS-gated"; services: Vercel Edge Network, Supabase,
  Vercel Analytics
- No `codeSnippets` in Option A (reserved for Option B follow-up).

## 6. Files & Implementation Notes

Touch (additive only):
1. `src/app/data/projects/en.ts` — append `kpjmi-admin-cms` object
2. `src/app/data/projects/id.ts` — append translated object
3. `src/app/data/projectImages.ts` — 2 lines (card + hero)
4. `src/app/components/ProjectDetail.tsx` — 1 gallery block (8 items)

Do not touch: `explorations/*`, `experience/*`, existing `koperasi-kpjmi` entry,
image files.

## 7. Verification

- `npx tsc --noEmit` clean
- `npx eslint` on touched files clean
- `/projects/kpjmi-admin-cms` renders EN + ID: hero = mockup, 7 features, gallery
  without mockup duplicate, Source button only (no Live Demo)
- `/projects` list includes new entry; home grid unchanged (6 items)
