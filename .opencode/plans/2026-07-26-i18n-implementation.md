# i18n (EN + ID) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add English + Indonesian internationalization to the portfolio using next-intl with cookie-based toggle (no URL prefix).

**Architecture:** next-intl prefix-less mode. Locale stored in `NEXT_LOCALE` cookie. Middleware reads cookie, sets locale. `messages/{locale}.json` for UI strings. Locale-specific `.ts` files for content data (projects, experience, skills, tech arsenal, explorations).

**Tech Stack:** next-intl, Next.js 16, React 19, TypeScript

## Global Constraints

- All UI strings go in `messages/{en,id}.json`
- Data content (projects, experience, etc.) stays in TypeScript files split by locale
- No URL prefix (`/en/` or `/id/`)
- Toggle sets cookie + reloads page
- `en` is default locale, `id` is secondary
- All existing functionality must remain intact

---

### Task 1: Install next-intl + Create i18n config + Message files + Middleware

**Files:**
- Modify: `package.json` (add dependency)
- Create: `messages/en.json`
- Create: `messages/id.json`
- Create: `src/i18n/request.ts`
- Create: `src/middleware.ts`

**Interfaces:**
- Consumes: nothing
- Produces: `messages/*.json` (all UI strings), `src/i18n/request.ts` (next-intl config), `src/middleware.ts` (locale detection)

- [ ] **Step 1: Install next-intl**

```bash
npm install next-intl
```

- [ ] **Step 2: Create `messages/en.json`**

Extract all UI strings from the codebase into namespaced JSON:

```json
{
  "hero": {
    "headlines": ["Products shipped.", "Problems solved.", "No fluff."],
    "subheadline": "Full-stack engineer building AI-powered products that ship in weeks, not months.",
    "getInTouch": "Get in Touch",
    "downloadCv": "Download CV",
    "cvTitle": "Curriculum Vitae",
    "downloadPdf": "Download PDF",
    "reachMe": "Reach me through any of these.",
    "scroll": "Scroll",
    "name": "Ken Zamariyan",
    "role": "Full-Stack Developer",
    "modalTitle": "Get in Touch",
    "contactLinks": {
      "linkedin": "LinkedIn",
      "github": "GitHub",
      "email": "Email",
      "whatsapp": "WhatsApp"
    },
    "techStack": {
      "react": "React",
      "typescript": "TypeScript",
      "go": "Go",
      "nextjs": "Next.js",
      "tailwind": "Tailwind",
      "postgresql": "PostgreSQL",
      "express": "Express",
      "nodejs": "Node.js",
      "mongodb": "MongoDB",
      "docker": "Docker",
      "python": "Python",
      "git": "Git"
    }
  },
  "about": {
    "label": "About Me",
    "heading": "Building reliable digital products with clarity and purpose.",
    "description": "Shipping production apps across web, mobile, and AI — from AI contract analyzers processing documents under {time} to offline-first mobile POS serving {users} cooperative members. TypeScript, Go, Python, and PostgreSQL, end to end.",
    "time": "15 seconds",
    "users": "1,500+",
    "infoItems": {
      "experience": { "label": "4+ Years Experience", "desc": "Full-stack & mobile product engineering" },
      "location": { "label": "Based in Indonesia", "desc": "Remote-friendly, global timezone" },
      "freelance": { "label": "Open to Freelance & Collaboration", "desc": "Available for contracts & partnerships" }
    },
    "stats": {
      "projects": { "label": "Projects Shipped", "reveal": "contracts · mobile · AI" },
      "years": { "label": "Years Experience", "reveal": "since 2020" },
      "technologies": { "label": "Technologies", "reveal": "react → go" },
      "users": { "label": "Users Served", "reveal": "served worldwide" }
    },
    "techArsenalLabel": "Technology Arsenal"
  },
  "skills": {
    "label": "Capabilities",
    "heading": "What I can deliver for you",
    "description": "Grouped by outcome, not just tools — the engineering domains I use to launch reliable digital products.",
    "tabAll": "All",
    "openSource": "Open Source",
    "viewGithub": "View GitHub",
    "years": "yr",
    "yearsPlural": "yrs"
  },
  "projects": {
    "label": "Selected Work",
    "heading": "Projects That Ship",
    "tabAll": "All",
    "tabWebApp": "Web App",
    "tabMobile": "Mobile",
    "tabPlayground": "Playground",
    "emptyTitle": "No projects yet in this category.",
    "emptySubtitle": "Coming soon.",
    "viewAll": "View All Projects"
  },
  "experience": {
    "label": "Career",
    "heading": "Experience & Education",
    "filterAll": "All",
    "filterWork": "Work",
    "filterEducation": "Education",
    "filterOrganization": "Organization",
    "empty": "No entries in this category yet."
  },
  "achievements": {
    "label": "Credentials",
    "heading": "Certifications & Recognition",
    "verifiable": "Verifiable",
    "viewDetails": "View Details",
    "showAll": "View All ({count})",
    "showLess": "Show Less",
    "download": "Download",
    "viewOriginal": "View Original"
  },
  "exploration": {
    "label": "Exploration",
    "heading": "Things I've been building",
    "description": "A visual log of interfaces and experiments — screenshots of products and prototypes I've designed and shipped."
  },
  "contact": {
    "label": "Get In Touch",
    "heading1": "Let's Build",
    "heading2": "Something Elite",
    "description": "Have an active product requirement, need an engineer to scale operations, or want to audit your UI architecture? Reach out below."
  },
  "contactForm": {
    "nameLabel": "Name",
    "namePlaceholder": "Your name…",
    "emailLabel": "Email",
    "emailPlaceholder": "your@email.com…",
    "messageLabel": "Message",
    "messagePlaceholder": "What are you building?…",
    "sendButton": "Send Message",
    "sendingButton": "Sending...",
    "successButton": "Sent!",
    "errorButton": "Try again",
    "toastSuccessTitle": "Message sent!",
    "toastSuccessDesc": "I'll get back to you soon.",
    "toastErrorTitle": "Failed to send",
    "toastErrorDesc": "{message}",
    "errors": {
      "nameRequired": "Name is required",
      "nameTooLong": "Name is too long",
      "emailRequired": "Email is required",
      "emailInvalid": "Please enter a valid email",
      "messageRequired": "Message is required",
      "messageTooLong": "Message is too long"
    }
  },
  "footer": {
    "copyright": "{year} Ken Zamariyan. All rights reserved.",
    "email": "Email",
    "whatsapp": "WhatsApp",
    "linkedin": "LinkedIn",
    "github": "GitHub"
  },
  "navbar": {
    "home": "Home",
    "projects": "Projects",
    "about": "About",
    "skills": "Skills",
    "experience": "Experience",
    "achievements": "Achievements",
    "contact": "Contact",
    "menuLabel": "Navigation menu",
    "openMenu": "Open navigation",
    "closeMenu": "Close navigation"
  },
  "commandMenu": {
    "home": "Home",
    "projects": "Projects",
    "about": "About",
    "skills": "Skills",
    "experience": "Experience",
    "achievements": "Achievements",
    "contact": "Contact",
    "github": "GitHub",
    "linkedin": "LinkedIn",
    "email": "Email",
    "groupNavigate": "Navigate",
    "groupLinks": "Links"
  },
  "projectDetail": {
    "backToProjects": "Back to Projects",
    "overview": "Overview",
    "screenshots": "Screenshots",
    "techStack": "Tech Stack",
    "challenge": "Challenge",
    "solution": "Solution",
    "impact": "Impact",
    "sourceCode": "Source Code",
    "liveDemo": "Live Demo",
    "noScreenshots": "No screenshots available."
  },
  "techArsenal": {
    "mastery": "Mastery",
    "categories": {
      "frontend": "Frontend",
      "backend": "Backend",
      "mobile": "Mobile",
      "aiInfra": "AI & Infra"
    }
  },
  "common": {
    "skipToContent": "Skip to main content",
    "gitHub": "GitHub",
    "linkedin": "LinkedIn",
    "lightMode": "Light mode",
    "darkMode": "Dark mode"
  },
  "notFound": {
    "title": "Page not found",
    "description": "The page you're looking for doesn't exist or has been moved.",
    "goHome": "Go home"
  },
  "githubSection": {
    "noData": "No contribution data available.",
    "contributions": "contributions in the last year"
  },
  "visitor": {
    "count": "visitors",
    "offline": "offline",
    "unavailable": "Visitor count unavailable"
  },
  "certificates": {
    "bnsp": {
      "title": "Certified Programmer — Software Development",
      "issuer": "BNSP (Badan Nasional Sertifikasi Profesi)",
      "year": "2026",
      "description": "Indonesian national professional certification validating competency in software development — including programming fundamentals, system design, and application architecture."
    },
    "googleAi": {
      "title": "AI Professional Certificate",
      "issuer": "Google",
      "year": "2026",
      "description": "Comprehensive certification in artificial intelligence — covering ML workflows, Google AI tools, prompt engineering, and responsible AI deployment practices."
    },
    "hubspot": {
      "title": "CMS For Developer II",
      "issuer": "HubSpot Academy",
      "year": "2026",
      "description": "Advanced HubSpot CMS development certification — custom modules, serverless functions, HubDB integration, and marketplace app publishing."
    },
    "micro1": {
      "title": "Certified Full-Stack Developer",
      "issuer": "micro1",
      "year": "2026",
      "description": "Industry-validated full-stack engineering certification assessing proficiency across frontend, backend, database, and cloud deployment technologies."
    },
    "juaraVibeCoding": {
      "title": "Top 100 — JuaraVibeCoding",
      "issuer": "JuaraVibeCoding",
      "year": "2026",
      "description": "Recognized among the top 100 participants in a national coding competition, demonstrating strong algorithmic problem-solving and software engineering skills."
    },
    "programmingFundamental": {
      "title": "Programming Fundamental",
      "issuer": "Kementerian Pendidikan dan Kebudayaan (Nasional)",
      "year": "2026",
      "description": "Indonesian national certification in core programming concepts — algorithms, data structures, and object-oriented programming with practical assessments."
    },
    "intermediateWeb": {
      "title": "Intermediate Assistant Web Developer",
      "issuer": "Kementerian Pendidikan dan Kebudayaan (Nasional)",
      "year": "2026",
      "description": "Indonesian national certification in intermediate web development — frontend frameworks, REST API integration, and relational database management."
    },
    "fundamentalWeb": {
      "title": "Fundamental of Assistant Web Developer",
      "issuer": "Kementerian Pendidikan dan Kebudayaan (Nasional)",
      "year": "2026",
      "description": "Indonesian national certification in foundational web development — HTML, CSS, JavaScript, responsive design, and basic front-end engineering."
    },
    "fullstackNasional": {
      "title": "Front-End & Back-End Development",
      "issuer": "Kementerian Pendidikan dan Kebudayaan (Nasional)",
      "year": "2026",
      "description": "Indonesian national certification in full-stack web development — covering frontend frameworks, backend APIs, database integration, and production deployment workflows."
    }
  }
}
```

- [ ] **Step 3: Create `messages/id.json`**

Duplicate the same structure as `en.json` with Indonesian translations. Key sections:

```json
{
  "hero": {
    "headlines": ["Produk dikirim.", "Masalah dipecahkan.", "Tanpa basa-basi."],
    "subheadline": "Full-stack engineer membangun produk bertenaga AI yang siap dikirim dalam hitungan minggu, bukan bulan.",
    "getInTouch": "Hubungi Saya",
    "downloadCv": "Unduh CV",
    "cvTitle": "Curriculum Vitae",
    "downloadPdf": "Unduh PDF",
    "reachMe": "Hubungi saya melalui salah satu berikut.",
    "scroll": "Gulir",
    "name": "Ken Zamariyan",
    "role": "Full-Stack Developer",
    "modalTitle": "Hubungi Saya",
    "contactLinks": {
      "linkedin": "LinkedIn",
      "github": "GitHub",
      "email": "Email",
      "whatsapp": "WhatsApp"
    },
    "techStack": {
      "react": "React",
      "typescript": "TypeScript",
      "go": "Go",
      "nextjs": "Next.js",
      "tailwind": "Tailwind",
      "postgresql": "PostgreSQL",
      "express": "Express",
      "nodejs": "Node.js",
      "mongodb": "MongoDB",
      "docker": "Docker",
      "python": "Python",
      "git": "Git"
    }
  },
  "about": {
    "label": "Tentang Saya",
    "heading": "Membangun produk digital yang andal dengan jelas dan penuh tujuan.",
    "description": "Mengirimkan aplikasi production di web, mobile, dan AI — dari AI analisis kontrak yang memproses dokumen dalam {time} hingga mobile POS offline yang melayani {users} anggota koperasi. TypeScript, Go, Python, dan PostgreSQL, end to end.",
    "time": "15 detik",
    "users": "1.500+",
    "infoItems": {
      "experience": { "label": "4+ Tahun Pengalaman", "desc": "Rekayasa produk full-stack & mobile" },
      "location": { "label": "Berbasis di Indonesia", "desc": "Ramah remote, zona waktu global" },
      "freelance": { "label": "Terbuka untuk Freelance & Kolaborasi", "desc": "Tersedia untuk kontrak & kemitraan" }
    },
    "stats": {
      "projects": { "label": "Proyek Dikirim", "reveal": "kontrak · mobile · AI" },
      "years": { "label": "Tahun Pengalaman", "reveal": "sejak 2020" },
      "technologies": { "label": "Teknologi", "reveal": "react → go" },
      "users": { "label": "Pengguna Dilayani", "reveal": "dilayani di seluruh dunia" }
    },
    "techArsenalLabel": "Persenjataan Teknologi"
  },
  "skills": {
    "label": "Kemampuan",
    "heading": "Yang bisa saya berikan untuk Anda",
    "description": "Dikelompokkan berdasarkan hasil, bukan hanya alat — domain rekayasa yang saya gunakan untuk meluncurkan produk digital yang andal.",
    "tabAll": "Semua",
    "openSource": "Open Source",
    "viewGithub": "Lihat GitHub",
    "years": "thn"
  },
  "projects": {
    "label": "Karya Terpilih",
    "heading": "Proyek Yang Dikirim",
    "tabAll": "Semua",
    "tabWebApp": "Web App",
    "tabMobile": "Mobile",
    "tabPlayground": "Playground",
    "emptyTitle": "Belum ada proyek di kategori ini.",
    "emptySubtitle": "Segera hadir.",
    "viewAll": "Lihat Semua Proyek"
  },
  "experience": {
    "label": "Karir",
    "heading": "Pengalaman & Pendidikan",
    "filterAll": "Semua",
    "filterWork": "Kerja",
    "filterEducation": "Pendidikan",
    "filterOrganization": "Organisasi",
    "empty": "Belum ada entri di kategori ini."
  },
  "achievements": {
    "label": "Kredensial",
    "heading": "Sertifikasi & Pengakuan",
    "verifiable": "Dapat Diverifikasi",
    "viewDetails": "Lihat Detail",
    "showAll": "Lihat Semua ({count})",
    "showLess": "Tampilkan Sedikit",
    "download": "Unduh",
    "viewOriginal": "Lihat Asli"
  },
  "exploration": {
    "label": "Eksplorasi",
    "heading": "Hal-hal yang sedang saya bangun",
    "description": "Log visual dari antarmuka dan eksperimen — tangkapan layar produk dan prototipe yang saya desain dan kirim."
  },
  "contact": {
    "label": "Hubungi Saya",
    "heading1": "Mari Bangun",
    "heading2": "Sesuatu yang Elite",
    "description": "Punya kebutuhan produk aktif, butuh engineer untuk menskalakan operasi, atau ingin mengaudit arsitektur UI Anda? Hubungi saya di bawah."
  },
  "contactForm": {
    "nameLabel": "Nama",
    "namePlaceholder": "Nama Anda…",
    "emailLabel": "Email",
    "emailPlaceholder": "email@anda.com…",
    "messageLabel": "Pesan",
    "messagePlaceholder": "Apa yang sedang Anda bangun?…",
    "sendButton": "Kirim Pesan",
    "sendingButton": "Mengirim...",
    "successButton": "Terkirim!",
    "errorButton": "Coba lagi",
    "toastSuccessTitle": "Pesan terkirim!",
    "toastSuccessDesc": "Saya akan membalas Anda segera.",
    "toastErrorTitle": "Gagal mengirim",
    "toastErrorDesc": "{message}",
    "errors": {
      "nameRequired": "Nama wajib diisi",
      "nameTooLong": "Nama terlalu panjang",
      "emailRequired": "Email wajib diisi",
      "emailInvalid": "Masukkan email yang valid",
      "messageRequired": "Pesan wajib diisi",
      "messageTooLong": "Pesan terlalu panjang"
    }
  },
  "footer": {
    "copyright": "{year} Ken Zamariyan. Hak cipta dilindungi.",
    "email": "Email",
    "whatsapp": "WhatsApp",
    "linkedin": "LinkedIn",
    "github": "GitHub"
  },
  "navbar": {
    "home": "Beranda",
    "projects": "Proyek",
    "about": "Tentang",
    "skills": "Keahlian",
    "experience": "Pengalaman",
    "achievements": "Pencapaian",
    "contact": "Kontak",
    "menuLabel": "Menu navigasi",
    "openMenu": "Buka navigasi",
    "closeMenu": "Tutup navigasi"
  },
  "commandMenu": {
    "home": "Beranda",
    "projects": "Proyek",
    "about": "Tentang",
    "skills": "Keahlian",
    "experience": "Pengalaman",
    "achievements": "Pencapaian",
    "contact": "Kontak",
    "github": "GitHub",
    "linkedin": "LinkedIn",
    "email": "Email",
    "groupNavigate": "Navigasi",
    "groupLinks": "Tautan"
  },
  "projectDetail": {
    "backToProjects": "Kembali ke Proyek",
    "overview": "Gambaran",
    "screenshots": "Tangkapan Layar",
    "techStack": "Tech Stack",
    "challenge": "Tantangan",
    "solution": "Solusi",
    "impact": "Dampak",
    "sourceCode": "Kode Sumber",
    "liveDemo": "Demo Langsung",
    "noScreenshots": "Belum ada tangkapan layar."
  },
  "techArsenal": {
    "mastery": "Penguasaan",
    "categories": {
      "frontend": "Frontend",
      "backend": "Backend",
      "mobile": "Mobile",
      "aiInfra": "AI & Infra"
    }
  },
  "common": {
    "skipToContent": "Lompat ke konten utama",
    "gitHub": "GitHub",
    "linkedin": "LinkedIn",
    "lightMode": "Mode terang",
    "darkMode": "Mode gelap"
  },
  "notFound": {
    "title": "Halaman tidak ditemukan",
    "description": "Halaman yang Anda cari tidak ada atau telah dipindahkan.",
    "goHome": "Ke beranda"
  },
  "githubSection": {
    "noData": "Data kontribusi tidak tersedia.",
    "contributions": "kontribusi dalam setahun terakhir"
  },
  "visitor": {
    "count": "pengunjung",
    "offline": "offline",
    "unavailable": "Jumlah pengunjung tidak tersedia"
  },
  "certificates": {
    "bnsp": {
      "title": "Certified Programmer — Software Development",
      "issuer": "BNSP (Badan Nasional Sertifikasi Profesi)",
      "year": "2026",
      "description": "Sertifikasi profesi nasional Indonesia yang memvalidasi kompetensi dalam pengembangan perangkat lunak — termasuk fundamental pemrograman, desain sistem, dan arsitektur aplikasi."
    },
    "googleAi": {
      "title": "AI Professional Certificate",
      "issuer": "Google",
      "year": "2026",
      "description": "Sertifikasi komprehensif dalam kecerdasan buatan — mencakup alur kerja ML, alat Google AI, prompt engineering, dan praktik penerapan AI yang bertanggung jawab."
    },
    "hubspot": {
      "title": "CMS For Developer II",
      "issuer": "HubSpot Academy",
      "year": "2026",
      "description": "Sertifikasi pengembangan CMS HubSpot tingkat lanjut — modul kustom, serverless functions, integrasi HubDB, dan penerapan aplikasi marketplace."
    },
    "micro1": {
      "title": "Certified Full-Stack Developer",
      "issuer": "micro1",
      "year": "2026",
      "description": "Sertifikasi full-stack engineering yang divalidasi industri, menilai kemahiran di seluruh teknologi frontend, backend, database, dan deployment cloud."
    },
    "juaraVibeCoding": {
      "title": "Top 100 — JuaraVibeCoding",
      "issuer": "JuaraVibeCoding",
      "year": "2026",
      "description": "Diakui di antara 100 peserta teratas dalam kompetisi coding nasional, menunjukkan kemampuan pemecahan masalah algoritmik dan rekayasa perangkat lunak yang kuat."
    },
    "programmingFundamental": {
      "title": "Programming Fundamental",
      "issuer": "Kementerian Pendidikan dan Kebudayaan (Nasional)",
      "year": "2026",
      "description": "Sertifikasi nasional Indonesia dalam konsep pemrograman inti — algoritma, struktur data, dan pemrograman berorientasi objek dengan penilaian praktis."
    },
    "intermediateWeb": {
      "title": "Intermediate Assistant Web Developer",
      "issuer": "Kementerian Pendidikan dan Kebudayaan (Nasional)",
      "year": "2026",
      "description": "Sertifikasi nasional Indonesia dalam pengembangan web tingkat menengah — framework frontend, integrasi REST API, dan manajemen database relasional."
    },
    "fundamentalWeb": {
      "title": "Fundamental of Assistant Web Developer",
      "issuer": "Kementerian Pendidikan dan Kebudayaan (Nasional)",
      "year": "2026",
      "description": "Sertifikasi nasional Indonesia dalam pengembangan web dasar — HTML, CSS, JavaScript, desain responsif, dan rekayasa front-end dasar."
    },
    "fullstackNasional": {
      "title": "Front-End & Back-End Development",
      "issuer": "Kementerian Pendidikan dan Kebudayaan (Nasional)",
      "year": "2026",
      "description": "Sertifikasi nasional Indonesia dalam pengembangan web full-stack — mencakup framework frontend, API backend, integrasi database, dan alur kerja deployment produksi."
    }
  }
}
```

- [ ] **Step 4: Create `src/i18n/request.ts`**

```ts
import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";
import { hasLocale } from "next-intl";

const locales = ["en", "id"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function getLocaleFromCookie(cookieValue: string | undefined): Locale {
  if (cookieValue && hasLocale(locales, cookieValue)) {
    return cookieValue as Locale;
  }
  return defaultLocale;
}

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const locale = getLocaleFromCookie(cookieStore.get("NEXT_LOCALE")?.value);

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
```

- [ ] **Step 5: Create `src/middleware.ts`**

```ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const LOCALES = ["en", "id"];
const DEFAULT_LOCALE = "en";

export function middleware(request: NextRequest) {
  const cookie = request.cookies.get("NEXT_LOCALE")?.value;
  const locale = LOCALES.includes(cookie ?? "") ? cookie! : DEFAULT_LOCALE;
  const requestHeaders = new NextResponse().headers;
  requestHeaders.set("x-next-locale", locale);

  const response = NextResponse.next();

  if (!request.cookies.has("NEXT_LOCALE")) {
    response.cookies.set("NEXT_LOCALE", DEFAULT_LOCALE, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
```

- [ ] **Step 6: Run build to verify no errors**

```bash
npm run build
```

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json messages/ src/i18n/ src/middleware.ts
git commit -m "feat: add next-intl i18n foundation with EN/ID message files"
```

---

### Task 2: Restructure content data files for i18n

**Files:**
- Create: `src/app/data/projects/index.ts`
- Create: `src/app/data/projects/en.ts`
- Create: `src/app/data/projects/id.ts`
- Delete: `src/app/data/projects.ts`
- Create: `src/app/data/experience/index.ts`
- Create: `src/app/data/experience/en.ts`
- Create: `src/app/data/experience/id.ts`
- Delete: `src/app/data/experience.ts`
- Create: `src/app/data/skillsData/index.ts`
- Create: `src/app/data/skillsData/en.ts`
- Create: `src/app/data/skillsData/id.ts`
- Delete: `src/app/data/skillsData.ts`
- Create: `src/app/data/techArsenal/index.ts`
- Create: `src/app/data/techArsenal/en.ts`
- Create: `src/app/data/techArsenal/id.ts`
- Delete: `src/app/data/techArsenal.ts`
- Create: `src/app/data/explorations/index.ts`
- Create: `src/app/data/explorations/en.ts`
- Create: `src/app/data/explorations/id.ts`
- Delete: `src/app/data/explorations.ts`
- Create: `src/i18n/data.ts`

**Interfaces:**
- Consumes: `src/i18n/request.ts` (Locale type)
- Produces: Data functions accessible from all components

**Pattern for each data file:**

Instead of:
```ts
export const projects: Project[] = [...]
export const PROJECT_CATEGORIES = {...}
export const CATEGORY_TABS = [...]
```

New structure:
```ts
// src/app/data/projects/en.ts
export const projectsEn: Project[] = [...] // English content

// src/app/data/projects/id.ts
export const projectsId: Project[] = [...] // Indonesian content

// src/app/data/projects/index.ts
export type { Project, ProjectType } from "./en";
export { PROJECT_CATEGORIES, CATEGORY_TABS, techDescriptions } from "./en";
export function getProjects(locale: 'en' | 'id'): Project[] {
  return locale === 'id' ? projectsId : projectsEn;
}
```

- [ ] **Step 1: Create `src/i18n/data.ts`**

```ts
import type { Locale } from "./request";
import { getProjects } from "@/app/data/projects";
import { getExperience } from "@/app/data/experience";
import { getSkills } from "@/app/data/skillsData";
import { getTechArsenal } from "@/app/data/techArsenal";
import { getExplorations } from "@/app/data/explorations";

export function getLocalizedProjects(locale: Locale) {
  return getProjects(locale);
}
export function getLocalizedExperience(locale: Locale) {
  return getExperience(locale);
}
export function getLocalizedSkills(locale: Locale) {
  return getSkills(locale);
}
export function getLocalizedTechArsenal(locale: Locale) {
  return getTechArsenal(locale);
}
export function getLocalizedExplorations(locale: Locale) {
  return getExplorations(locale);
}
```

- [ ] **Step 2: Restructure `projects.ts` → `projects/` folder**

Move `src/app/data/projects.ts` content:
- `en.ts`: Keep English content as-is, export as `projectsEn`
- `id.ts`: Duplicate with Indonesian translations for all user-facing strings (title, summary, challenge, solution, impact, role)
- `index.ts`: Re-export shared types, constants, and `getProjects(locale)`

Shared constants (`PROJECT_CATEGORIES`, `CATEGORY_TABS`, `techDescriptions`) stay in `index.ts` since they reference slugs/keys — only the Project data objects need locale variants.

- [ ] **Step 3: Restructure `experience.ts` → `experience/` folder**

Same pattern. `en.ts` has current data, `id.ts` has Indonesian translations for description/title/place fields.

- [ ] **Step 4: Restructure `skillsData.ts` → `skillsData/` folder**

`en.ts` has current data, `id.ts` has Indonesian for `title`, `tagline` fields. `skills[i].name` stays the same (technology names).

- [ ] **Step 5: Restructure `techArsenal.ts` → `techArsenal/` folder**

`en.ts` has current data, `id.ts` has Indonesian for `description` field. `name`, `category`, `icon` etc stay the same.

- [ ] **Step 6: Restructure `explorations.ts` → `explorations/` folder**

`en.ts` has current data, `id.ts` has Indonesian for `title`, `caption`, `tag` fields.

- [ ] **Step 7: Run build to verify**

```bash
npm run build
```

- [ ] **Step 8: Commit**

```bash
git add src/app/data/ src/i18n/data.ts
git commit -m "feat: restructure data files for i18n locale support"
```

---

### Task 3: Update layout.tsx + Create LanguageToggle + Update Navbar

**Files:**
- Modify: `src/app/layout.tsx`
- Create: `src/app/components/LanguageToggle.tsx`
- Modify: `src/app/components/Navbar.tsx`

**Interfaces:**
- Consumes: `src/app/components/ThemeProvider.tsx`, `messages/*.json`
- Produces: LanguageToggle visible in navbar, locale switching functional

- [ ] **Step 1: Create `src/app/components/LanguageToggle.tsx`**

```tsx
"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/navigation";
import { Button } from "@/components/ui/button";

export function LanguageToggle() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const toggleLocale = () => {
    const next = locale === "en" ? "id" : "en";
    document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
    router.refresh();
    window.location.reload();
  };

  return (
    <Button
      onClick={toggleLocale}
      variant="ghost"
      size="icon-sm"
      className="rounded-full text-ink-muted hover:text-ink hover:bg-surface-hover font-mono text-xs font-semibold tracking-wider"
      aria-label={locale === "en" ? "Switch to Indonesian" : "Switch to English"}
    >
      {locale === "en" ? "ID" : "EN"}
    </Button>
  );
}
```

- [ ] **Step 2: Modify `src/app/layout.tsx`**

Add `NextIntlClientProvider` wrapper:

```tsx
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { cookies } from "next/headers";
// ... existing imports

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";
  const messages = await getMessages({ locale });

  return (
    <html
      lang={locale}
      className={cn("font-sans", geist.variable)}
      data-theme="light"
      style={{ colorScheme: "light" }}
      suppressHydrationWarning
    >
      {/* ... head ... */}
      <body className={/* ... */}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <a href="#main-content" className="...">
            ...
          </a>
          <LayoutClient>{children}</LayoutClient>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

Remove the import for `getLocaleFromCookie` — just read cookie directly.

- [ ] **Step 3: Modify `Navbar.tsx`**

Add LanguageToggle import and place it next to ThemeToggle in both desktop and mobile sections:

```tsx
import { LanguageToggle } from "./LanguageToggle";

// In desktop view (next to ThemeToggle):
<LanguageToggle />
<ThemeToggle ... />

// In mobile drawer (next to ThemeToggle):
<LanguageToggle />
<ThemeToggle ... />
```

- [ ] **Step 4: Build and test**

```bash
npm run build
```

Verify that switching EN/ID toggles the cookie and the page reloads.

- [ ] **Step 5: Commit**

```bash
git add src/app/layout.tsx src/app/components/LanguageToggle.tsx src/app/components/Navbar.tsx
git commit -m "feat: add LanguageToggle component and i18n provider to layout"
```

---

### Task 4: i18n for Navbar + CommandMenu + Footer + not-found page

**Files:**
- Modify: `src/app/components/Navbar.tsx`
- Modify: `src/app/components/CommandMenu.tsx`
- Modify: `src/app/components/Footer.tsx`
- Modify: `src/app/not-found.tsx`

- [ ] **Step 1: Update `Navbar.tsx` — replace hardcoded strings with `useTranslations()`**

```tsx
import { useTranslations } from "next-intl";

export default function Navbar() {
  const t = useTranslations("navbar");
  const c = useTranslations("common");

  const sections = [
    { id: "home", label: t("home") },
    { id: "projects", label: t("projects") },
    { id: "about", label: t("about") },
    { id: "skills", label: t("skills") },
    { id: "experience", label: t("experience") },
    { id: "achievements", label: t("achievements") },
    { id: "contact", label: t("contact") },
  ];

  // Replace aria-labels with t() calls
  // Replace menu button labels
  // Replace section labels in both desktop nav and mobile drawer
  // Replace Tooltip content for GitHub/LinkedIn/ThemeToggle
}
```

Replace:
- `"Navigation menu"` → `t("menuLabel")`
- `"Open navigation"` → `t("openMenu")`
- `"Close navigation"` → `t("closeMenu")`
- Section labels → `t("home")`, `t("projects")`, etc.
- Tooltip "GitHub" → `c("gitHub")`
- Tooltip "LinkedIn" → `c("linkedin")`
- Theme toggle tooltips → `c("lightMode")`, `c("darkMode")`

- [ ] **Step 2: Update `CommandMenu.tsx`**

```tsx
"use client";

import { useTranslations } from "next-intl";
import { CommandPalette } from "@/components/motion/command-palette";

export function CommandMenu() {
  const tn = useTranslations("commandMenu");
  const cl = useTranslations("common");

  return (
    <CommandPalette
      items={[
        { id: "home", label: tn("home"), group: tn("groupNavigate"), onSelect: ... },
        { id: "projects", label: tn("projects"), group: tn("groupNavigate"), onSelect: ... },
        { id: "about", label: tn("about"), group: tn("groupNavigate"), onSelect: ... },
        { id: "skills", label: tn("skills"), group: tn("groupNavigate"), onSelect: ... },
        { id: "experience", label: tn("experience"), group: tn("groupNavigate"), onSelect: ... },
        { id: "achievements", label: tn("achievements"), group: tn("groupNavigate"), onSelect: ... },
        { id: "contact", label: tn("contact"), group: tn("groupNavigate"), onSelect: ... },
        { id: "github", label: cl("gitHub"), group: tn("groupLinks"), ... },
        { id: "linkedin", label: cl("linkedin"), group: tn("groupLinks"), ... },
        { id: "email", label: tn("email"), group: tn("groupLinks"), ... },
      ]}
    />
  );
}
```

- [ ] **Step 3: Update `Footer.tsx`**

```tsx
"use client";

import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer>
      <p>{t("copyright", { year: "2026" })}</p>
      {/* Labels/socials use t("email"), t("github"), etc. */}
    </footer>
  );
}
```

- [ ] **Step 4: Update `not-found.tsx`**

```tsx
import { useTranslations } from "next-intl";
import { NotFoundGlitch } from "@/components/motion/not-found/glitch";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <main id="main-content">
      <NotFoundGlitch
        code="404"
        title={t("title")}
        description={t("description")}
        homeHref="/"
        homeLabel={t("goHome")}
      />
    </main>
  );
}
```

Note: not-found.tsx is a Server Component. Use `getTranslations` instead:

```tsx
import { getTranslations } from "next-intl/server";

export default async function NotFound() {
  const t = await getTranslations("notFound");
  // ...
}
```

Wait — but `NotFoundGlitch` is a client component. The `not-found.tsx` page is a Server Component by default, so we can use `getTranslations`:

```tsx
import { getTranslations } from "next-intl/server";
import { NotFoundGlitch } from "@/components/motion/not-found/glitch";

export default async function NotFound() {
  const t = await getTranslations("notFound");
  return (
    <main id="main-content">
      <NotFoundGlitch
        code="404"
        title={t("title")}
        description={t("description")}
        homeHref="/"
        homeLabel={t("goHome")}
      />
    </main>
  );
}
```

- [ ] **Step 5: Build**

```bash
npm run build
```

- [ ] **Step 6: Commit**

```bash
git add src/app/components/Navbar.tsx src/app/components/CommandMenu.tsx src/app/components/Footer.tsx src/app/not-found.tsx
git commit -m "feat: i18n for navbar, command menu, footer, and not-found page"
```

---

### Task 5: i18n for Hero + About + Skills sections

**Files:**
- Modify: `src/app/components/Hero.tsx`
- Modify: `src/app/components/About.tsx`
- Modify: `src/app/components/Skills.tsx`

- [ ] **Step 1: Update `Hero.tsx`**

Import `useTranslations` and replace all hardcoded strings:

```tsx
"use client";

import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations("hero");

  // Replace:
  // text={["Products shipped.", "Problems solved.", "No fluff."]}
  // → text={[t("headlines.0"), t("headlines.1"), t("headlines.2")]}
  // "Full-stack engineer building..." → t("subheadline")
  // "Get in Touch" → t("getInTouch")
  // "Download CV" → t("downloadCv")
  // "Ken Zamariyan" → t("name")
  // "Full-Stack Developer" → t("role")
  // "Scroll" → t("scroll")
  // Contact links: link.label → t(`contactLinks.${key}`)
  // Tech stack: tech.name → t(`techStack.${key}`)
}
```

- [ ] **Step 2: Update `About.tsx`**

Replace:
- `infoItems` array label/desc → `t("infoItems.experience.label")`, etc.
- `stats` label/reveal → `t("stats.projects.label")`, etc.
- Label "About Me" → `t("label")`
- Heading → `t("heading")`
- Description → use `t.rich("description", { time: "...", users: "..." })` or interpolate
- "Technology Arsenal" → `t("techArsenalLabel")`

- [ ] **Step 3: Update `Skills.tsx`**

Replace:
- Label "Capabilities" → `t("label")`
- Heading → `t("heading")`
- Description → `t("description")`
- "All" → `t("tabAll")`
- "Open Source" → `t("openSource")`
- "View GitHub" → `t("viewGithub")`
- Tooltip text in SkillRow → use `t` for "yr"/"yrs"

- [ ] **Step 4: Build**

```bash
npm run build
```

- [ ] **Step 5: Commit**

```bash
git add src/app/components/Hero.tsx src/app/components/About.tsx src/app/components/Skills.tsx
git commit -m "feat: i18n for hero, about, and skills sections"
```

---

### Task 6: i18n for Projects + ProjectDetail + AllProjects

**Files:**
- Modify: `src/app/components/Projects.tsx`
- Modify: `src/app/components/ProjectDetail.tsx`
- Modify: `src/app/components/AllProjects.tsx`

- [ ] **Step 1: Update `Projects.tsx`**

Replace:
- Label "Selected Work" → `t("label")`
- Heading → `t("heading")`
- Category tabs → `t("tabAll")`, `t("tabWebApp")`, etc.
- Empty state → `t("emptyTitle")`, `t("emptySubtitle")`
- "View All Projects" → `t("viewAll")`

- [ ] **Step 2: Update `ProjectDetail.tsx`**

Replace:
- "Back to Projects" → `t("backToProjects")`
- Tab labels → `t("overview")`, `t("screenshots")`, `t("techStack")`
- Section headings → `t("challenge")`, `t("solution")`, `t("impact")`
- Button labels → `t("sourceCode")`, `t("liveDemo")`
- Empty state → `t("noScreenshots")`

- [ ] **Step 3: Update `AllProjects.tsx`**

Replace:
- "All Projects" heading
- "Back to Home" label

- [ ] **Step 4: Build**

```bash
npm run build
```

- [ ] **Step 5: Commit**

```bash
git add src/app/components/Projects.tsx src/app/components/ProjectDetail.tsx src/app/components/AllProjects.tsx
git commit -m "feat: i18n for projects, project detail, and all projects"
```

---

### Task 7: i18n for Experience + Achievements + Exploration

**Files:**
- Modify: `src/app/components/Experience.tsx`
- Modify: `src/app/components/Achievements.tsx`
- Modify: `src/app/components/Exploration.tsx`

- [ ] **Step 1: Update `Experience.tsx`**

Replace:
- Label "Career" → `t("label")`
- Heading → `t("heading")`
- Filter labels → `t("filterAll")`, `t("filterWork")`, etc.
- Empty state → `t("empty")`
- Filter `exp.type` → `t(\`filter\${capitalize(exp.type)}\`)`

For experience data, use `getLocalizedExperience(locale)`:
```tsx
import { useLocale } from "next-intl";
import { getLocalizedExperience } from "@/i18n/data";

const locale = useLocale();
const items = getLocalizedExperience(locale);
```

- [ ] **Step 2: Update `Achievements.tsx`**

Replace:
- Label "Credentials" → `t("label")`
- Heading → `t("heading")`
- "Verifiable" → `t("verifiable")`
- "View Details" → `t("viewDetails")`
- "View All (+N)" → `t("showAll", { count: hidden })`
- "Show Less" → `t("showLess")`
- "Download" → `t("download")`
- "View Original" → `t("viewOriginal")`

Certificate descriptions use translations from messages:
```tsx
const t = useTranslations("certificates");
// cert.description → t(`${certKey}.description`)
```

Map `certificates` array keys to translation keys:
```ts
const CERT_KEYS = ["bnsp", "googleAi", "hubspot", "micro1", "juaraVibeCoding", "programmingFundamental", "intermediateWeb", "fundamentalWeb", "fullstackNasional"];
```

- [ ] **Step 3: Update `Exploration.tsx`**

Replace:
- Label → `t("label")`
- Heading → `t("heading")`
- Description → `t("description")`

- [ ] **Step 4: Build**

```bash
npm run build
```

- [ ] **Step 5: Commit**

```bash
git add src/app/components/Experience.tsx src/app/components/Achievements.tsx src/app/components/Exploration.tsx
git commit -m "feat: i18n for experience, achievements, and exploration sections"
```

---

### Task 8: i18n for Contact + ContactForm + TechArsenal + misc components

**Files:**
- Modify: `src/app/components/Contact.tsx`
- Modify: `src/app/components/ContactForm.tsx`
- Modify: `src/app/components/TechArsenal.tsx`
- Modify: `src/app/components/ThemeProvider.tsx` (skip, no user-facing strings)
- Modify: `src/app/components/GitHubSection.tsx`
- Modify: `src/app/components/KeyboardNav.tsx` (skip, no UI)
- Modify: `src/app/components/ui/VisitorCounter.tsx`
- Modify: `src/app/components/ui/CopyEmail.tsx`
- Modify: `src/app/components/ui/CodeBlock.tsx` (skip, data-driven)
- Modify: `src/app/components/ui/EmptyState.tsx`

- [ ] **Step 1: Update `Contact.tsx`**

Replace:
- Label "Get In Touch" → `t("label")`
- Heading "Let's Build" → `t("heading1")`
- Heading "Something Elite" → `t("heading2")`
- Description → `t("description")`

- [ ] **Step 2: Update `ContactForm.tsx`**

Replace:
- Form labels → `t("nameLabel")`, `t("emailLabel")`, `t("messageLabel")`
- Placeholders → `t("namePlaceholder")`, etc.
- Button text → `t("sendButton")`
- Loading/success/error texts → `t("sendingButton")`, `t("successButton")`, `t("errorButton")`
- Toast messages → `t("toastSuccessTitle")`, `t("toastSuccessDesc")`, etc.
- Error messages → `t("errors.nameRequired")`, etc.

- [ ] **Step 3: Update `TechArsenal.tsx`**

Replace:
- Category labels → `t("categories.frontend")`, etc.
- "Mastery" → `t("mastery")`

- [ ] **Step 4: Update `GitHubSection.tsx`**

Replace:
- "No contribution data available." → `t("noData")`
- "contributions in the last year" → `t("contributions")`

- [ ] **Step 5: Update `VisitorCounter.tsx`**

Replace:
- "visitors" → `t("count")`
- "offline" → `t("offline")`
- "Visitor count unavailable" → `t("unavailable")`

- [ ] **Step 6: Build**

```bash
npm run build
```

- [ ] **Step 7: Commit**

```bash
git add src/app/components/Contact.tsx src/app/components/ContactForm.tsx src/app/components/TechArsenal.tsx src/app/components/GitHubSection.tsx src/app/components/ui/VisitorCounter.tsx
git commit -m "feat: i18n for contact, tech arsenal, and utility components"
```

---

### Task 9: Final verification & polish

- [ ] **Step 1: Run full build**

```bash
npm run build
```

- [ ] **Step 2: Run lint**

```bash
npm run lint
```

- [ ] **Step 3: Fix any remaining hardcoded strings**

Search for remaining English strings that should be translated:

```bash
rg -n "("Products shipped"|"Problems solved"|"Download CV"|"About Me"|"Selected Work"|"Career"|"Get In Touch"|"Credentials"|"Capabilities"|"Exploration"|"Navigation menu"|"Skip to main"|"Page not found")" src/app/
```

- [ ] **Step 4: Verify EN/ID toggle works**

```bash
npm run dev
```

Test manually:
1. Open localhost
2. Click ID toggle → page reloads with Indonesian text
3. Click EN toggle → page reloads with English text
4. Refresh page → locale persists via cookie

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: final i18n polish and verification"
```
