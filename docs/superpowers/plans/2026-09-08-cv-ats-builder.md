# CV ATS Builder Project Entry Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a new separate portfolio project `cv-ats-builder` (EN + ID) with card/hero images and a 2-item gallery, with both Live Demo and Source buttons, unfeatured.

**Architecture:** Additive-only data entry following the existing `Project` template: append one object to `projectsEn`/`projectsId`, add two image-map lines, add one gallery block. No component or routing changes — `/projects/[slug]` renders automatically from data.

**Tech Stack:** Next.js App Router portfolio (TypeScript), existing `Project` interface in `src/app/data/projects/en.ts:3-52`, `PROJECT_CARD_IMAGES` / `PROJECT_HERO_IMAGES` in `src/app/data/projectImages.ts`, `screenshots` map in `src/app/components/ProjectDetail.tsx`.

## Global Constraints

- Spec: `docs/superpowers/specs/2026-09-08-cv-ats-builder-design.md` — all copy and image paths below are copied verbatim from it.
- `featured` is omitted (falsy) so the home grid stays at 6 items (`src/app/page.tsx:24` filters `featured`).
- BOTH `demoUrl` (`https://cv-ats-builder-beta.vercel.app`) and `sourceUrl` (`https://github.com/callmezaa/cv-engineeringTools`) are present so both buttons render.
- No image files added, renamed, or deleted — `public/image/cv_ats_builder/` is used as-is.
- Do NOT touch `src/app/data/explorations/*`, `src/app/data/experience/*`, or any existing project entry.
- Do NOT commit unless the user explicitly asks — leave changes in the working tree.

---

## File Structure

- Modify: `src/app/data/projects/en.ts` — append `cv-ats-builder` object as last array element (after the final `},` at line 1820, before `]` at 1821).
- Modify: `src/app/data/projects/id.ts` — append translated object as last array element (after final `},` at line 1768, before `]` at 1769).
- Modify: `src/app/data/projectImages.ts` — add card line (PROJECT_CARD_IMAGES block) and hero line (PROJECT_HERO_IMAGES block).
- Modify: `src/app/components/ProjectDetail.tsx` — add `"cv-ats-builder"` gallery block after the `"kpjmi-admin-cms"` block, before `];`.

---

### Task 1: EN project data entry

**Files:**
- Modify: `src/app/data/projects/en.ts` (append before final `]`)

**Interfaces:**
- Consumes: `Project` interface (`src/app/data/projects/en.ts:3-52`), spec sections 2, 4, 5.
- Produces: `projectsEn` entry with `slug: "cv-ats-builder"` consumed by `getLocalizedProjects` and `ProjectDetail`.

- [ ] **Step 1: Append the EN object**

Old anchor (unique tail of file):
```ts
        { name: "Vercel Analytics", description: "Visitor traffic stats linked from the admin dashboard" },
      ],
    },
  },
]
```

New tail (insert the new object between the last `},` and `]`):
```ts
        { name: "Vercel Analytics", description: "Visitor traffic stats linked from the admin dashboard" },
      ],
    },
  },
  {
    slug: "cv-ats-builder",
    title: "ATS CV Builder — Privacy-First CV Studio",
    summary:
      "Privacy-first, ATS-friendly CV builder with live A4 PDF preview, job-description tailoring, and one-click PDF export — one master CV, unlimited tailored variants, zero accounts, data never leaves the browser.",
    challenge:
      "Jobseekers maintain scattered CV copies per application and can't tell whether their CV survives applicant tracking systems — or they upload personal data to unknown online builders.",
    solution:
      "Built a local-first Next.js 16 workspace: one master CV feeding unlimited variants with per-variant section toggles and ordering, JD keyword matching (covered green / missing amber), rule-based ATS readiness checks, real-time A4 preview via @react-pdf/renderer, and JSON backup/restore — all persisted in localStorage under one key.",
    impact:
      "Fully static deploy with zero env vars; Vitest suite guards state, matching, readiness, and formatting; dark mode plus no sign-up friction.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Zustand", "@react-pdf/renderer", "Zod", "Vitest"],
    role: "Frontend Developer",
    year: "2026",
    client: "Self-initiated",
    category: "Productivity Tool",
    timeline: "2026",
    features: [
      {
        title: "Master CV + Variants",
        description: "One source of truth feeding unlimited role variants with per-variant section toggles, ordering, and project picks.",
        screenshot: "/image/cv_ats_builder/dashboard.png",
        screenshotLabel: "Builder",
      },
      {
        title: "Live A4 Preview + PDF Export",
        description: "Real-time @react-pdf A4 preview with a single-column real-text template and smart filenames.",
        screenshot: "/image/cv_ats_builder/dashboard.png",
        screenshotLabel: "Live preview",
      },
      {
        title: "JD Keyword Tailoring",
        description: "Paste a job description and see covered versus missing keyword highlights instantly.",
        screenshot: "/image/cv_ats_builder/dashboard.png",
        screenshotLabel: "Tailoring",
      },
      {
        title: "ATS Readiness Checks",
        description: "Rule-based required, optional, and warning checks that catch issues before export.",
        screenshot: "/image/cv_ats_builder/dashboard.png",
        screenshotLabel: "Readiness",
      },
      {
        title: "Backup & Restore",
        description: "Export and import the full workspace as JSON on any machine.",
        screenshot: "/image/cv_ats_builder/hero_section.png",
        screenshotLabel: "Intro",
      },
      {
        title: "Local-First + Dark Mode",
        description: "No sign-up with everything under the cv-builder:v1 localStorage key, plus a system-aware theme.",
        screenshot: "/image/cv_ats_builder/hero_section.png",
        screenshotLabel: "Privacy",
      },
    ],
    sourceUrl: "https://github.com/callmezaa/cv-engineeringTools",
    demoUrl: "https://cv-ats-builder-beta.vercel.app",
    type: "playground",
    badge: "Tool",
    metrics: ["Local-First", "Live A4 Preview", "JD Tailoring", "Zero Backend"],
    accent: {
      glow: "rgba(229, 229, 229, 0.14)",
      color: "#e5e5e5",
    },
    architecture: {
      monorepo: [
        { name: "app/", tech: "Next.js 16 App Router, static output", description: "Intro hero page plus the /builder workspace route — fully static pages with no server runtime" },
        { name: "lib/", tech: "Zustand + Zod + matchers + pdf helpers", description: "state/ store with persist middleware under key cv-builder:v1, tailoring/ keyword matcher, validation/ ATS rules and Zod schemas, pdf/ export and filename helpers" },
        { name: "components/", tech: "React 19 feature folders", description: "editor/ section editors, cv/ @react-pdf document and section renderers, intro/ hero, layout/ workspace shell, ui/ coss ui primitives" },
      ],
      decisions: [
        { decision: "Zustand persist over a backend", reason: "Zero server, zero accounts, zero cost — the entire workspace lives in one localStorage key" },
        { decision: "@react-pdf/renderer over html2canvas", reason: "Real text output stays parseable by applicant tracking systems instead of flattened images" },
        { decision: "Single-column single-color template over fancy layouts", reason: "Restrained templates survive real-world ATS parsers that choke on columns and graphics" },
        { decision: "Fully static deploy over SSR", reason: "Zero env vars and zero runtime — every push gets a preview URL with nothing to configure" },
      ],
      endpoints: [
        { method: "GET", path: "/", auth: false, rate: "Static", purpose: "Intro hero page leading into the builder" },
        { method: "GET", path: "/builder", auth: false, rate: "Static", purpose: "The CV builder workspace — all state client-side, no APIs called" },
      ],
      dataFlow: [
        "User fills the master CV in the editor panel with instant preview updates",
        "User creates one variant per target role with section toggles and ordering",
        "User pastes the job description and closes missing-keyword gaps",
        "User runs the ATS readiness check and fixes required issues",
        "User exports the PDF and backs up the workspace as JSON",
      ],
      deployment: [
        "next build static output deployed to Vercel with zero configuration",
        "No environment variables required",
        "Every push gets an automatic preview URL",
      ],
    },
    diagram: {
      frontend: { label: "CLIENT (Next.js Static Site)", tech: "Next.js 16 · React 19 · Zustand · @react-pdf/renderer · Tailwind CSS v4" },
      backend: { label: "BACKEND", tech: "None — 100% localStorage, key cv-builder:v1" },
      arrow: { label: "Zero requests after load" },
      services: [
        { name: "Zustand persist", description: "Workspace state persisted to localStorage under one key" },
        { name: "@react-pdf/renderer", description: "Real-time A4 preview and one-click real-text PDF export" },
        { name: "Vercel Edge Network", description: "Zero-config static hosting with preview URL per push" },
      ],
    },
  },
]
```

- [ ] **Step 2: Typecheck the edit**

Run: `npx tsc --noEmit`
Expected: no output (clean). If errors mention `cv-ats-builder`, fix the object to match the `Project` interface.

- [ ] **Step 3: Confirm the slug resolves in data**

Run: `grep -c '"cv-ats-builder"' src/app/data/projects/en.ts`
Expected: `1`

### Task 2: ID project data entry (translation mirror)

**Files:**
- Modify: `src/app/data/projects/id.ts` (append before final `]`)

**Interfaces:**
- Consumes: `Project` type (imported from `./en`), spec sections 2, 4, 5; mirrors Task 1 field-for-field.
- Produces: `projectsId` entry with `slug: "cv-ats-builder"`.

- [ ] **Step 1: Append the ID object**

Old anchor (unique tail of file):
```ts
        { name: "Vercel Analytics", description: "Statistik traffic pengunjung yang ditautkan dari dashboard admin" },
      ],
    },
  },
]
```

New tail:
```ts
        { name: "Vercel Analytics", description: "Statistik traffic pengunjung yang ditautkan dari dashboard admin" },
      ],
    },
  },
  {
    slug: "cv-ats-builder",
    title: "ATS CV Builder — Studio CV Privasi",
    summary:
      "Builder CV yang privasi-first dan ramah ATS dengan preview PDF A4 live, tailoring deskripsi pekerjaan, dan ekspor PDF sekali klik — satu CV master, varian tailored tanpa batas, nol akun, data tidak pernah meninggalkan browser.",
    challenge:
      "Pencari kerja merawat salinan CV yang tersebar per lamaran dan tidak tahu apakah CV mereka lolos applicant tracking system — atau mereka mengunggah data pribadi ke builder online tak dikenal.",
    solution:
      "Membangun workspace local-first Next.js 16: satu CV master yang memberi makan varian tanpa batas dengan toggle dan urutan section per varian, pencocokan keyword JD (tercakup hijau / hilang amber), cek kesiapan ATS berbasis aturan, preview A4 real-time via @react-pdf/renderer, dan backup/restore JSON — semua dipersisten di localStorage dalam satu key.",
    impact:
      "Deploy sepenuhnya statis tanpa env var; suite Vitest mengawal state, matching, readiness, dan formatting; dark mode plus nol friksi sign-up.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Zustand", "@react-pdf/renderer", "Zod", "Vitest"],
    role: "Pengembang Frontend",
    year: "2026",
    client: "Inisiatif mandiri",
    category: "Perkakas Produktivitas",
    timeline: "2026",
    features: [
      {
        title: "CV Master + Varian",
        description: "Satu sumber kebenaran yang memberi makan varian peran tanpa batas dengan toggle section, urutan, dan pilihan proyek per varian.",
        screenshot: "/image/cv_ats_builder/dashboard.png",
        screenshotLabel: "Builder",
      },
      {
        title: "Preview A4 Live + Ekspor PDF",
        description: "Preview @react-pdf A4 real-time dengan template teks-asli satu kolom dan nama file cerdas.",
        screenshot: "/image/cv_ats_builder/dashboard.png",
        screenshotLabel: "Preview live",
      },
      {
        title: "Tailoring Keyword JD",
        description: "Tempel deskripsi pekerjaan dan lihat sorotan keyword tercakup versus hilang seketika.",
        screenshot: "/image/cv_ats_builder/dashboard.png",
        screenshotLabel: "Tailoring",
      },
      {
        title: "Cek Kesiapan ATS",
        description: "Cek berbasis aturan required, optional, dan warning yang menangkap masalah sebelum ekspor.",
        screenshot: "/image/cv_ats_builder/dashboard.png",
        screenshotLabel: "Readiness",
      },
      {
        title: "Backup & Restore",
        description: "Ekspor dan impor seluruh workspace sebagai JSON di mesin mana pun.",
        screenshot: "/image/cv_ats_builder/hero_section.png",
        screenshotLabel: "Intro",
      },
      {
        title: "Local-First + Dark Mode",
        description: "Tanpa sign-up dengan segalanya di bawah key localStorage cv-builder:v1, plus tema sadar-sistem.",
        screenshot: "/image/cv_ats_builder/hero_section.png",
        screenshotLabel: "Privasi",
      },
    ],
    sourceUrl: "https://github.com/callmezaa/cv-engineeringTools",
    demoUrl: "https://cv-ats-builder-beta.vercel.app",
    type: "playground",
    badge: "Tool",
    metrics: ["Local-First", "Preview A4 Live", "Tailoring JD", "Nol Backend"],
    accent: {
      glow: "rgba(229, 229, 229, 0.14)",
      color: "#e5e5e5",
    },
    architecture: {
      monorepo: [
        { name: "app/", tech: "Next.js 16 App Router, output statis", description: "Halaman hero intro plus route workspace /builder — halaman sepenuhnya statis tanpa runtime server" },
        { name: "lib/", tech: "Zustand + Zod + matcher + helper pdf", description: "Store state/ dengan middleware persist di bawah key cv-builder:v1, matcher keyword tailoring/, aturan ATS dan skema Zod validation/, helper ekspor dan nama file pdf/" },
        { name: "components/", tech: "Folder fitur React 19", description: "Editor section editor/, dokumen @react-pdf dan renderer section cv/, hero intro/, shell workspace layout/, primitif coss ui ui/" },
      ],
      decisions: [
        { decision: "Zustand persist alih-alih backend", reason: "Nol server, nol akun, nol biaya — seluruh workspace hidup dalam satu key localStorage" },
        { decision: "@react-pdf/renderer alih-alih html2canvas", reason: "Output teks asli tetap parseable oleh applicant tracking system alih-alih gambar pipih" },
        { decision: "Template satu kolom satu warna alih-alih layout mewah", reason: "Template yang restrained selamat dari parser ATS dunia nyata yang tersedak kolom dan grafis" },
        { decision: "Deploy statis penuh alih-alih SSR", reason: "Nol env var dan nol runtime — setiap push mendapat preview URL tanpa konfigurasi" },
      ],
      endpoints: [
        { method: "GET", path: "/", auth: false, rate: "Statis", purpose: "Halaman hero intro menuju builder" },
        { method: "GET", path: "/builder", auth: false, rate: "Statis", purpose: "Workspace builder CV — seluruh state client-side, tanpa API dipanggil" },
      ],
      dataFlow: [
        "Pengguna mengisi CV master di panel editor dengan update preview seketika",
        "Pengguna membuat satu varian per peran target dengan toggle dan urutan section",
        "Pengguna menempel deskripsi pekerjaan dan menutup gap keyword yang hilang",
        "Pengguna menjalankan cek kesiapan ATS dan memperbaiki issue required",
        "Pengguna mengekspor PDF dan mem-backup workspace sebagai JSON",
      ],
      deployment: [
        "Output statis next build di-deploy ke Vercel dengan nol konfigurasi",
        "Tidak butuh environment variable",
        "Setiap push mendapat preview URL otomatis",
      ],
    },
    diagram: {
      frontend: { label: "CLIENT (Situs Statis Next.js)", tech: "Next.js 16 · React 19 · Zustand · @react-pdf/renderer · Tailwind CSS v4" },
      backend: { label: "BACKEND", tech: "None — 100% localStorage, key cv-builder:v1" },
      arrow: { label: "Nol request setelah load" },
      services: [
        { name: "Zustand persist", description: "State workspace dipersisten ke localStorage dalam satu key" },
        { name: "@react-pdf/renderer", description: "Preview A4 real-time dan ekspor PDF teks-asli sekali klik" },
        { name: "Vercel Edge Network", description: "Hosting statis zero-config dengan preview URL per push" },
      ],
    },
  },
]
```

- [ ] **Step 2: Typecheck both data files**

Run: `npx tsc --noEmit`
Expected: no output (clean).

- [ ] **Step 3: Confirm EN/ID parity**

Run: `grep -c '"cv-ats-builder"' src/app/data/projects/en.ts src/app/data/projects/id.ts`
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
- Produces: `PROJECT_CARD_IMAGES["cv-ats-builder"]`, `PROJECT_HERO_IMAGES["cv-ats-builder"]`, and `screenshots["cv-ats-builder"]` consumed by `Projects`, `AllProjects`, `Experience`, and `ProjectDetail`.

- [ ] **Step 1: Add card image line**

Old (top `PROJECT_CARD_IMAGES` block tail):
```ts
  "pallete-studio": "/image/PalleteStudio/mockup.png",
  "kpjmi-admin-cms": "/image/admin_kpjmi_cms/mockup.png",
};
```

New:
```ts
  "pallete-studio": "/image/PalleteStudio/mockup.png",
  "kpjmi-admin-cms": "/image/admin_kpjmi_cms/mockup.png",
  "cv-ats-builder": "/image/cv_ats_builder/hero_section.png",
};
```

- [ ] **Step 2: Add hero image line**

Old (bottom `PROJECT_HERO_IMAGES` block tail):
```ts
  "pallete-studio": "/image/PalleteStudio/mockup.png",
  "kpjmi-admin-cms": "/image/admin_kpjmi_cms/mockup.png",
};
```

New:
```ts
  "pallete-studio": "/image/PalleteStudio/mockup.png",
  "kpjmi-admin-cms": "/image/admin_kpjmi_cms/mockup.png",
  "cv-ats-builder": "/image/cv_ats_builder/hero_section.png",
};
```

WARNING: both blocks now end with an identical `kpjmi-admin-cms` line. Apply Step 1 to the TOP (`PROJECT_CARD_IMAGES`) block and Step 2 to the BOTTOM (`PROJECT_HERO_IMAGES`) block — NOT twice to the same block. Verify with Step 4.

- [ ] **Step 3: Add gallery block after `kpjmi-admin-cms`**

Old anchor (tail of the screenshots record — the `kpjmi-admin-cms` block plus closing `];`):
```tsx
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

New:
```tsx
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
  "cv-ats-builder": [
    { src: "/image/cv_ats_builder/dashboard.png", label: "Builder" },
    { src: "/image/cv_ats_builder/hero_section.png", label: "Intro" },
  ],
];
```

- [ ] **Step 4: Verify image references**

Run: `grep -c 'cv-ats-builder' src/app/data/projectImages.ts src/app/components/ProjectDetail.tsx`
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

- [ ] **Step 2: No stale references + demo present**

Run: `grep -rn 'cv_ats_builder/homepage' src/ || echo NONE-FOUND`
Expected: `NONE-FOUND`.
Run: `grep -c 'cv-ats-builder-beta.vercel.app' src/app/data/projects/en.ts src/app/data/projects/id.ts`
Expected: `1` in each file (demoUrl present in both locales).

- [ ] **Step 3: Render check (prod build + serve, curl)**

Run: `npm run build` (must succeed; also serves as lint+type gate).
Then: `npm run start -- -p 3103` in background, curl, kill when done.
Locale is cookie-only (`NEXT_LOCALE=en|id`), no URL prefix.
1. `/projects/cv-ats-builder` (EN cookie): HTTP 200, contains `ATS CV Builder`; the strings `cv-ats-builder-beta.vercel.app` (demoUrl) and `github.com/callmezaa/cv-engineeringTools` (sourceUrl) are both present in the response (HTML or flight data — detail buttons are client-rendered, so assert string presence, not an `<a>` tag); all 6 feature screenshot paths present (`cv_ats_builder/dashboard.png` and `cv_ats_builder/hero_section.png` in flight data).
2. Same URL with ID cookie: contains `Studio CV Privasi`.
3. `/projects` list: contains `cv-ats-builder` with `Tool` badge.
4. Static: `grep -c "featured: true" src/app/data/projects/en.ts` → `6` (home unchanged).

Expected: all four hold. Stop the server when done.

- [ ] **Step 4: Report back**

Summarize files changed (4), spec compliance, and any deviations. Do NOT commit.
