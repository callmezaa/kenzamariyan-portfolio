# KPJMI Admin CMS Project Entry Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a new separate portfolio project `kpjmi-admin-cms` (EN + ID) with card/hero images and an 8-item gallery, no live demo button.

**Architecture:** Additive-only data entry following the existing `Project` template: append one object to `projectsEn`/`projectsId`, add two image-map lines, add one gallery block. No component or routing changes — `/projects/[slug]` renders automatically from data.

**Tech Stack:** Next.js App Router portfolio (TypeScript), existing `Project` interface in `src/app/data/projects/en.ts:3-52`, `PROJECT_CARD_IMAGES` / `PROJECT_HERO_IMAGES` in `src/app/data/projectImages.ts`, `screenshots` map in `src/app/components/ProjectDetail.tsx:17-108`.

## Global Constraints

- Spec: `docs/superpowers/specs/2026-09-08-kpjmi-admin-cms-design.md` — all copy and image paths below are copied verbatim from it.
- `featured` is omitted (falsy) so the home grid stays at 6 items (`src/app/page.tsx:24` filters `featured`).
- `demoUrl` is omitted so no Live Demo button renders (admin requires a Supabase Auth account).
- No image files added, renamed, or deleted — `public/image/admin_kpjmi_cms/` is used as-is.
- Do NOT touch `src/app/data/explorations/*`, `src/app/data/experience/*`, or the existing `koperasi-kpjmi` entry.
- Do NOT commit unless the user explicitly asks — leave changes in the working tree.

---

## File Structure

- Modify: `src/app/data/projects/en.ts` — append `kpjmi-admin-cms` object as last array element (after the final `},` at line 1706, before `]` at 1707).
- Modify: `src/app/data/projects/id.ts` — append translated object as last array element (after final `},` at line 1654, before `]` at 1655).
- Modify: `src/app/data/projectImages.ts` — add card line (`:2-9` block) and hero line (`:11-19` block).
- Modify: `src/app/components/ProjectDetail.tsx` — add `"kpjmi-admin-cms"` gallery block after the `monetra` block (`:97-107`), before `];` at line 108.

---

### Task 1: EN project data entry

**Files:**
- Modify: `src/app/data/projects/en.ts` (append before final `]`)

**Interfaces:**
- Consumes: `Project` interface (`src/app/data/projects/en.ts:3-52`), spec sections 2, 4, 5.
- Produces: `projectsEn` entry with `slug: "kpjmi-admin-cms"` consumed by `getLocalizedProjects` (`src/app/data/projects/index.ts`) and `ProjectDetail`.

- [ ] **Step 1: Append the EN object**

Old anchor (unique tail of file, lines 1702-1707):
```ts
        { section: "Server", type: "Express webhook", description: "Standalone Node.js server for Midtrans Snap token generation and payment status webhook callback" },
      ],
    },
  },
]
```

New tail (insert the new object between the last `},` and `]`):
```ts
        { section: "Server", type: "Express webhook", description: "Standalone Node.js server for Midtrans Snap token generation and payment status webhook callback" },
      ],
    },
  },
  {
    slug: "kpjmi-admin-cms",
    title: "KPJMI — Admin CMS Dashboard",
    summary:
      "Self-hosted admin dashboard backing the KPJMI company profile — a Supabase-powered CMS for products, gallery, testimonials, FAQ, and contact info, so client edits go live instantly with no redeploy.",
    challenge:
      "Client content lived in code — every product or gallery change needed a developer commit and redeploy.",
    solution:
      "Built an `/admin` area with Supabase Auth, CRUD plus ordering and visibility toggles across 5 content modules, in-browser WebP image compression before Storage upload, and a layered public-site content provider (localStorage cache → Supabase → bundled defaults).",
    impact:
      "Non-technical admin independently updates 6 products, 8 gallery photos, 4 testimonials, and 8 FAQs; the public site never renders blank and updates appear without a rebuild.",
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Supabase", "react-router-dom", "Vercel Analytics"],
    role: "Full-Stack Developer",
    year: "2026",
    client: "KPJMI — Koperasi Petani Jaya Makmur",
    category: "Admin Dashboard",
    timeline: "2026",
    features: [
      {
        title: "Secure Admin Auth",
        description: "Supabase Auth email + password login with protected routes guarding every /admin page.",
        screenshot: "/image/admin_kpjmi_cms/login_page.png",
        screenshotLabel: "Login",
      },
      {
        title: "Dashboard Monitoring",
        description: "At-a-glance content counts with Vercel Analytics pointers and live Supabase sync status.",
        screenshot: "/image/admin_kpjmi_cms/dashboard.png",
        screenshotLabel: "Dashboard",
      },
      {
        title: "Products CRUD",
        description: "Manage 6 products with arrow ordering, visibility toggles, and WebP-compressed image uploads.",
        screenshot: "/image/admin_kpjmi_cms/product_page.png",
        screenshotLabel: "Products",
      },
      {
        title: "Gallery Manager",
        description: "Curate 8 gallery photos with the same ordering and visibility pattern as products.",
        screenshot: "/image/admin_kpjmi_cms/gallery_page.png",
        screenshotLabel: "Gallery",
      },
      {
        title: "Testimonials Manager",
        description: "Publish and reorder 4 testimonials shown on the public site.",
        screenshot: "/image/admin_kpjmi_cms/testimony_page.png",
        screenshotLabel: "Testimonials",
      },
      {
        title: "FAQ Manager",
        description: "Maintain 8 questions and answers without touching code.",
        screenshot: "/image/admin_kpjmi_cms/FAQ_page.png",
        screenshotLabel: "FAQ",
      },
      {
        title: "Contact Info Manager",
        description: "Edit WhatsApp, address, and office details driving the public contact section.",
        screenshot: "/image/admin_kpjmi_cms/contact_page.png",
        screenshotLabel: "Contact",
      },
    ],
    sourceUrl: "https://github.com/callmezaa/koperasi-KPJMI",
    type: "dashboard",
    badge: "CMS",
    metrics: ["5 Content Modules", "Supabase RLS", "WebP Uploads", "Zero Redeploy"],
    accent: {
      glow: "rgba(184, 17, 4, 0.14)",
      color: "#B81104",
    },
    architecture: {
      monorepo: [
        { name: "src/admin/", tech: "React 19 + react-router-dom", description: "Login, admin layout with collapsible sidebar, breadcrumb navbar, and account menu, plus one CRUD page per content module with a per-table API layer" },
        { name: "src/content/", tech: "Provider + defaults + shared types", description: "Layered content provider for the public site: localStorage cache paints instantly, Supabase fetch refreshes, bundled defaults guarantee the page never renders blank" },
        { name: "supabase/schema.sql + scripts/seed-supabase.mjs", tech: "Postgres + Storage + seed", description: "Tables with RLS policies, public media bucket, plus a seed script that uploads initial imagery, inserts content, and creates the admin account" },
      ],
      decisions: [
        { decision: "Supabase Postgres over a headless CMS", reason: "One vendor for database, auth, and storage on the free tier, with row-level security gating every write" },
        { decision: "Public-read / admin-write RLS", reason: "Visitors read content anonymously while only the authenticated admin can write — enforced in the database, not just the UI" },
        { decision: "Browser-side WebP compression before upload", reason: "Images are compressed and converted in-browser so Storage bandwidth stays small and page loads stay fast" },
        { decision: "react-router-dom for /admin inside the Vite SPA", reason: "Admin lives at /admin/* routes in the same deployment, served by the vercel.json SPA rewrite — no second app to host" },
      ],
      endpoints: [
        { method: "SELECT", path: "products", auth: false, rate: "N/A", purpose: "Public product list read by the website; writes require admin auth" },
        { method: "SELECT", path: "gallery", auth: false, rate: "N/A", purpose: "Public gallery photos read by the website; writes require admin auth" },
        { method: "SELECT", path: "testimonials", auth: false, rate: "N/A", purpose: "Public testimonials read by the website; writes require admin auth" },
        { method: "SELECT", path: "faq", auth: false, rate: "N/A", purpose: "Public FAQ entries read by the website; writes require admin auth" },
        { method: "SELECT", path: "contact_info", auth: false, rate: "N/A", purpose: "Public contact details read by the website; writes require admin auth" },
        { method: "READ", path: "Storage bucket media", auth: false, rate: "N/A", purpose: "Public image bucket for uploaded product and gallery photos" },
      ],
      dataFlow: [
        "Admin logs in at /admin via Supabase Auth email + password; routes stay protected until authenticated",
        "Admin edits products, gallery, testimonials, FAQ, or contact info with ordering and visibility toggles",
        "Images are compressed to WebP in-browser then uploaded to the public media Storage bucket",
        "Row writes go to Supabase Postgres under admin-only RLS write policies",
        "Public site provider serves localStorage cache instantly, then revalidates from Supabase",
        "Edits appear on the live website with no rebuild and no redeploy",
      ],
      deployment: [
        "Vite build deployed to Vercel as a static SPA with vercel.json rewrite for /admin deep links",
        "Production env: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY; service-role key used by the seed script locally only",
        "Seed script run once per Supabase project: uploads assets, inserts content, creates the admin account",
      ],
    },
    diagram: {
      frontend: { label: "CLIENT (React SPA + Admin)", tech: "React 19 · Vite 8 · Tailwind CSS v4 · react-router-dom" },
      backend: { label: "BACKEND (Supabase)", tech: "Postgres · Auth · Storage" },
      arrow: { label: "Supabase client, RLS-gated" },
      services: [
        { name: "Vercel Edge Network", description: "Static SPA hosting with rewrite serving /admin deep links" },
        { name: "Supabase", description: "Postgres content tables, email Auth, and public media Storage bucket" },
        { name: "Vercel Analytics", description: "Visitor traffic stats linked from the admin dashboard" },
      ],
    },
  },
]
```

- [ ] **Step 2: Typecheck the edit**

Run: `npx tsc --noEmit`
Expected: no output (clean). If errors mention `kpjmi-admin-cms`, fix the object to match the `Project` interface.

- [ ] **Step 3: Confirm the slug resolves in data**

Run: `grep -c '"kpjmi-admin-cms"' src/app/data/projects/en.ts`
Expected: `1`

### Task 2: ID project data entry (translation mirror)

**Files:**
- Modify: `src/app/data/projects/id.ts` (append before final `]`)

**Interfaces:**
- Consumes: `Project` type (imported from `./en`), spec sections 2, 4, 5; mirrors Task 1 field-for-field.
- Produces: `projectsId` entry with `slug: "kpjmi-admin-cms"`.

- [ ] **Step 1: Append the ID object**

Old anchor (unique tail of file, lines 1650-1655):
```ts
        { section: "Server", type: "Webhook Express", description: "Server Node.js mandiri untuk generasi token Midtrans Snap dan callback status pembayaran" },
      ],
    },
  },
]
```

New tail:
```ts
        { section: "Server", type: "Webhook Express", description: "Server Node.js mandiri untuk generasi token Midtrans Snap dan callback status pembayaran" },
      ],
    },
  },
  {
    slug: "kpjmi-admin-cms",
    title: "KPJMI — Dashboard Admin CMS",
    summary:
      "Dashboard admin self-hosted yang menopang company profile KPJMI — CMS bertenaga Supabase untuk produk, galeri, testimoni, FAQ, dan info kontak, sehingga edit klien langsung tayang tanpa redeploy.",
    challenge:
      "Konten klien hidup di dalam kode — setiap perubahan produk atau galeri butuh commit developer dan redeploy.",
    solution:
      "Membangun area `/admin` dengan Supabase Auth, CRUD plus toggle urutan dan visibilitas di 5 modul konten, kompresi gambar WebP di browser sebelum upload ke Storage, dan provider konten berlapis di situs publik (cache localStorage → Supabase → default bawaan).",
    impact:
      "Admin non-teknis mandiri mengupdate 6 produk, 8 foto galeri, 4 testimoni, dan 8 FAQ; situs publik tidak pernah blank dan perubahan tampil tanpa rebuild.",
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Supabase", "react-router-dom", "Vercel Analytics"],
    role: "Pengembang Full-Stack",
    year: "2026",
    client: "KPJMI — Koperasi Petani Jaya Makmur",
    category: "Dashboard Admin",
    timeline: "2026",
    features: [
      {
        title: "Auth Admin Aman",
        description: "Login email + password Supabase Auth dengan route terproteksi yang menjaga setiap halaman /admin.",
        screenshot: "/image/admin_kpjmi_cms/login_page.png",
        screenshotLabel: "Login",
      },
      {
        title: "Monitoring Dashboard",
        description: "Ringkasan jumlah konten sekilas dengan tautan Vercel Analytics dan status sinkron Supabase live.",
        screenshot: "/image/admin_kpjmi_cms/dashboard.png",
        screenshotLabel: "Dashboard",
      },
      {
        title: "CRUD Produk",
        description: "Kelola 6 produk dengan pengurutan panah, toggle visibilitas, dan upload gambar terkompresi WebP.",
        screenshot: "/image/admin_kpjmi_cms/product_page.png",
        screenshotLabel: "Produk",
      },
      {
        title: "Manajer Galeri",
        description: "Kurasi 8 foto galeri dengan pola urutan dan visibilitas yang sama seperti produk.",
        screenshot: "/image/admin_kpjmi_cms/gallery_page.png",
        screenshotLabel: "Galeri",
      },
      {
        title: "Manajer Testimoni",
        description: "Terbitkan dan urutkan ulang 4 testimoni yang tampil di situs publik.",
        screenshot: "/image/admin_kpjmi_cms/testimony_page.png",
        screenshotLabel: "Testimoni",
      },
      {
        title: "Manajer FAQ",
        description: "Rawat 8 pertanyaan dan jawaban tanpa menyentuh kode.",
        screenshot: "/image/admin_kpjmi_cms/FAQ_page.png",
        screenshotLabel: "FAQ",
      },
      {
        title: "Manajer Info Kontak",
        description: "Edit WhatsApp, alamat, dan detail kantor penggerak section kontak publik.",
        screenshot: "/image/admin_kpjmi_cms/contact_page.png",
        screenshotLabel: "Kontak",
      },
    ],
    sourceUrl: "https://github.com/callmezaa/koperasi-KPJMI",
    type: "dashboard",
    badge: "CMS",
    metrics: ["5 Modul Konten", "RLS Supabase", "Upload WebP", "Nol Redeploy"],
    accent: {
      glow: "rgba(184, 17, 4, 0.14)",
      color: "#B81104",
    },
    architecture: {
      monorepo: [
        { name: "src/admin/", tech: "React 19 + react-router-dom", description: "Login, layout admin dengan sidebar lipat, navbar breadcrumb, dan menu akun, plus satu halaman CRUD per modul konten dengan API layer per tabel" },
        { name: "src/content/", tech: "Provider + default + tipe bersama", description: "Provider konten berlapis untuk situs publik: cache localStorage tampil instan, fetch Supabase menyegarkan, default bawaan menjamin halaman tidak pernah blank" },
        { name: "supabase/schema.sql + scripts/seed-supabase.mjs", tech: "Postgres + Storage + seed", description: "Tabel dengan policy RLS, bucket media publik, plus skrip seed yang mengunggah gambar awal, mengisi konten, dan membuat akun admin" },
      ],
      decisions: [
        { decision: "Supabase Postgres alih-alih headless CMS", reason: "Satu vendor untuk database, auth, dan storage di tier gratis, dengan row-level security mengawal setiap write" },
        { decision: "RLS baca-publik / tulis-admin", reason: "Pengunjung membaca konten secara anonim sementara hanya admin terautentikasi yang bisa menulis — ditegakkan di database, bukan hanya di UI" },
        { decision: "Kompresi WebP di browser sebelum upload", reason: "Gambar dikompresi dan dikonversi di browser sehingga bandwidth Storage tetap kecil dan load halaman tetap cepat" },
        { decision: "react-router-dom untuk /admin di dalam SPA Vite", reason: "Admin hidup di route /admin/* dalam deploy yang sama, dilayani rewrite vercel.json SPA — tidak perlu hosting aplikasi kedua" },
      ],
      endpoints: [
        { method: "SELECT", path: "products", auth: false, rate: "N/A", purpose: "Daftar produk publik dibaca website; write butuh auth admin" },
        { method: "SELECT", path: "gallery", auth: false, rate: "N/A", purpose: "Foto galeri publik dibaca website; write butuh auth admin" },
        { method: "SELECT", path: "testimonials", auth: false, rate: "N/A", purpose: "Testimoni publik dibaca website; write butuh auth admin" },
        { method: "SELECT", path: "faq", auth: false, rate: "N/A", purpose: "Entri FAQ publik dibaca website; write butuh auth admin" },
        { method: "SELECT", path: "contact_info", auth: false, rate: "N/A", purpose: "Detail kontak publik dibaca website; write butuh auth admin" },
        { method: "READ", path: "Storage bucket media", auth: false, rate: "N/A", purpose: "Bucket gambar publik untuk foto produk dan galeri yang diunggah" },
      ],
      dataFlow: [
        "Admin login di /admin via email + password Supabase Auth; route tetap terproteksi hingga terautentikasi",
        "Admin mengedit produk, galeri, testimoni, FAQ, atau info kontak dengan toggle urutan dan visibilitas",
        "Gambar dikompresi ke WebP di browser lalu diunggah ke bucket Storage media publik",
        "Write baris masuk ke Postgres Supabase di bawah policy RLS tulis-khusus-admin",
        "Provider situs publik menyajikan cache localStorage seketika, lalu revalidasi dari Supabase",
        "Edit tampil di website live tanpa rebuild dan tanpa redeploy",
      ],
      deployment: [
        "Build Vite di-deploy ke Vercel sebagai SPA statis dengan rewrite vercel.json untuk deep link /admin",
        "Env produksi: VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY; service-role key hanya dipakai skrip seed secara lokal",
        "Skrip seed dijalankan sekali per project Supabase: mengunggah aset, mengisi konten, membuat akun admin",
      ],
    },
    diagram: {
      frontend: { label: "CLIENT (React SPA + Admin)", tech: "React 19 · Vite 8 · Tailwind CSS v4 · react-router-dom" },
      backend: { label: "BACKEND (Supabase)", tech: "Postgres · Auth · Storage" },
      arrow: { label: "Supabase client, RLS-gated" },
      services: [
        { name: "Vercel Edge Network", description: "Hosting SPA statis dengan rewrite yang melayani deep link /admin" },
        { name: "Supabase", description: "Tabel konten Postgres, Auth email, dan bucket Storage media publik" },
        { name: "Vercel Analytics", description: "Statistik traffic pengunjung yang ditautkan dari dashboard admin" },
      ],
    },
  },
]
```

- [ ] **Step 2: Typecheck both data files**

Run: `npx tsc --noEmit`
Expected: no output (clean).

- [ ] **Step 3: Confirm EN/ID parity**

Run: `grep -c '"kpjmi-admin-cms"' src/app/data/projects/en.ts src/app/data/projects/id.ts`
Expected:
```
src/app/data/projects/en.ts:1
src/app/data/projects/id.ts:1
```

### Task 3: Card/hero images + detail gallery

**Files:**
- Modify: `src/app/data/projectImages.ts`
- Modify: `src/app/components/ProjectDetail.tsx`

**Interfaces:**
- Consumes: Task 1–2 slugs; spec section 4.
- Produces: `PROJECT_CARD_IMAGES["kpjmi-admin-cms"]`, `PROJECT_HERO_IMAGES["kpjmi-admin-cms"]`, and `screenshots["kpjmi-admin-cms"]` consumed by `Projects`, `AllProjects`, `Experience`, and `ProjectDetail`.

- [ ] **Step 1: Add card image line**

Old (line 8-9):
```ts
  "pallete-studio": "/image/PalleteStudio/mockup.png",
};
```

New:
```ts
  "pallete-studio": "/image/PalleteStudio/mockup.png",
  "kpjmi-admin-cms": "/image/admin_kpjmi_cms/mockup.png",
};
```

- [ ] **Step 2: Add hero image line**

Old (line 18-19):
```ts
  "pallete-studio": "/image/PalleteStudio/mockup.png",
};
```

New:
```ts
  "pallete-studio": "/image/PalleteStudio/mockup.png",
  "kpjmi-admin-cms": "/image/admin_kpjmi_cms/mockup.png",
};
```

Note: both blocks end with the identical pallete-studio line — apply Step 1 to the `PROJECT_CARD_IMAGES` block (top of file) and Step 2 to the `PROJECT_HERO_IMAGES` block (bottom of file). Verify with Step 4.

- [ ] **Step 3: Add gallery block after `monetra`**

Old anchor (lines 97-108, unique — file's only `];`):
```tsx
  monetra: [
    { src: "/image/monetra/dashboard.png", label: "Dashboard" },
    { src: "/image/monetra/transactions.png", label: "Transactions" },
    { src: "/image/monetra/budgets.png", label: "Budgets" },
    { src: "/image/monetra/goals.png", label: "Goals" },
    { src: "/image/monetra/categories.png", label: "Categories" },
    { src: "/image/monetra/reports.png", label: "Reports" },
    { src: "/image/monetra/recurring.png", label: "Recurring" },
    { src: "/image/monetra/login.png", label: "Login" },
    { src: "/image/monetra/settings.png", label: "Settings" },
  ],
];
```

New:
```tsx
  monetra: [
    { src: "/image/monetra/dashboard.png", label: "Dashboard" },
    { src: "/image/monetra/transactions.png", label: "Transactions" },
    { src: "/image/monetra/budgets.png", label: "Budgets" },
    { src: "/image/monetra/goals.png", label: "Goals" },
    { src: "/image/monetra/categories.png", label: "Categories" },
    { src: "/image/monetra/reports.png", label: "Reports" },
    { src: "/image/monetra/recurring.png", label: "Recurring" },
    { src: "/image/monetra/login.png", label: "Login" },
    { src: "/image/monetra/settings.png", label: "Settings" },
  ],
  "kpjmi-admin-cms": [
    { src: "/image/admin_kpjmi_cms/dashboard.png", label: "Dashboard" },
    { src: "/image/admin_kpjmi_cms/login_page.png", label: "Login" },
    { src: "/image/admin_kpjmi_cms/product_page.png", label: "Products" },
    { src: "/image/admin_kpjmi_cms/gallery_page.png", label: "Gallery" },
    { src: "/image/admin_kpjmi_cms/testimony_page.png", label: "Testimonials" },
    { src: "/image/admin_kpjmi_cms/FAQ_page.png", label: "FAQ" },
    { src: "/image/admin_kpjmi_cms/contact_page.png", label: "Contact" },
    { src: "/image/admin_kpjmi_cms/mockup.png", label: "Overview" },
  ],
];
```

- [ ] **Step 4: Verify image references**

Run: `grep -c 'kpjmi-admin-cms' src/app/data/projectImages.ts src/app/components/ProjectDetail.tsx`
Expected:
```
src/app/data/projectImages.ts:2
src/app/components/ProjectDetail.tsx:1
```
(2 = card + hero lines; 1 = gallery block key.)

- [ ] **Step 5: Lint touched files**

Run: `npx eslint src/app/data/projects/en.ts src/app/data/projects/id.ts src/app/data/projectImages.ts src/app/components/ProjectDetail.tsx`
Expected: no output (clean).

### Task 4: Verification pass

**Files:** none (read-only checks).

- [ ] **Step 1: Full typecheck**

Run: `npx tsc --noEmit`
Expected: no output.

- [ ] **Step 2: No stale references**

Run: `grep -rn 'admin_kpjmi_cms/homepage\|admin-kpjmi-cms.*demoUrl' src/ || echo NONE-FOUND`
Expected: `NONE-FOUND` (no typos, no demo URL).

- [ ] **Step 3: Render check (manual, dev server)**

Run: `npm run dev`, then visit:
1. `/projects/kpjmi-admin-cms` (EN): hero shows mockup, 7 features each with its screenshot, gallery shows 7 showcase shots (Overview filtered as hero duplicate), only Source button — no Live Demo.
2. Same URL with `id` locale: Indonesian copy, same images.
3. `/projects` list: new CMS card appears with mockup thumbnail and CMS badge.
4. Home `/`: still 6 project cards (new entry not featured).

Expected: all four hold. Stop the dev server when done.

- [ ] **Step 4: Report back**

Summarize files changed (4), spec compliance (separate entry, no demo, mockup hero, featured false), and any deviations. Do NOT commit.
