# Design Spec: Project Detail Upgrade — Contract Chill

**Date:** 2026-07-26
**Target Audience:** Tim Engineering PT MRT Jakarta
**Focus:** Konten teknis mendalam + interaktif (Hybrid Approach A+B)
**File:** `src/app/components/ProjectDetail.tsx` + `src/app/data/projects/en.ts` & `id.ts`

---

## 1. Overview

Upgrade Project Detail section untuk Contract Chill agar lebih proper dan profesional untuk presentasi ke tim engineering PT MRT Jakarta. Konten teknis mendalam (enterprise case study) dikombinasikan dengan navigasi interaktif (technical deep-dive).

---

## 2. Information Architecture

```
Hero Section
├── Hero Image (wide desktop screenshot)
├── Metadata row: [Hackathon] · 2025 · Full-Stack Developer & AI Engineer
├── Title: ContractChill — AI Contract Analyzer
└── Summary

Deep Navigation Bar (sticky)
├── Overview | Architecture | AI Pipeline | Technical | Screenshots

1. OVERVIEW
   ├── Challenge → Solution → Impact (enhanced content)
   ├── Key Metrics Cards (4 persona, <15s analysis, etc)
   └── Live Demo + Source Code buttons

2. ARCHITECTURE
   ├── Monorepo Structure (visual tree diagram)
   ├── System Architecture Diagram (interactive SVG — clickable nodes)
   ├── Data Flow Pipeline (upload → parse → AI → result)
   └── Deployment Architecture (Docker multi-stage)

3. AI PIPELINE (Deep Dive)
   ├── The 4 Personas — interactive card comparison
   ├── Prompt Engineering — expandable prompt snippets
   ├── Text Extraction — PDF parsing → OCR fallback flow
   ├── Risk Scoring Algorithm — formula + visualization
   └── Output Schema — structured JSON result

4. TECHNICAL
   ├── API Design (table of endpoints, auth, rate limiting)
   ├── Security (Firebase Auth, Helmet, CORS, Zod validation)
   ├── Error Handling (AppError class, asyncHandler, global handler)
   ├── Key Code Snippets (with syntax highlighting, copyable)
   └── Architecture Decisions (kenapa Express 5? kenapa Firestore?)

5. SCREENSHOTS
   └── Existing gallery (tetap dipertahankan)

Footer
└── Source Code + Live Demo CTA
```

---

## 3. Section Details

### 3.1 Hero Section

Tidak ada perubahan layout, tapi konten metadata di-upgrade:

| Element | Current | Upgrade |
|---|---|---|
| Badge | `Hackathon` | Tetap `Hackathon` |
| Role | `Full-Stack Developer & AI Engineer` | Tetap |
| Title | `ContractChill — AI Contract Analyzer` | Tetap |
| Summary | 1 baris | Tetap — tapi lebih impactful |

**Tambahan di bawah summary:** Metric cards row — 4 card kecil horizontal:
- `< 15s` — Contract Analysis
- `4` — AI Personas
- `PDF/DOCX/TXT` — File Support
- `Docker + Cloud Run` — Deployed

Setiap metric card: number besar (animated counter) + label kecil di bawah.

### 3.2 Deep Navigation Bar

Sticky tab bar di bawah hero, **menggantikan Tabs lama** (Overview | Screenshots | Tech Stack).

**Tab baru:**
| # | Tab | Content |
|---|---|---|
| 1 | Overview | Challenge, Solution, Impact, Metrics, CTA buttons |
| 2 | Architecture | Monorepo, System diagram, Data flow, Deployment |
| 3 | AI Pipeline | Personas, Prompt engineering, Text extraction, Risk scoring |
| 4 | Technical | API design, Security, Error handling, Code snippets, Decisions |
| 5 | Screenshots | Existing gallery |

Tab ini **scroll-linked** — klik tab scroll ke section, scroll section tab highlight.

### 3.3 Section: Overview

Challenge, Solution, Impact di-upgrade kontennya jadi lebih teknis dan spesifik:

**Challenge (Enhanced):**
> Freelancers and small business owners often sign contracts containing unfair clauses — unlimited liability, IP traps, unilateral termination rights — because they lack the legal expertise or budget to hire a lawyer for every agreement. The existing alternative: expensive legal consultations that cost $200-500 per contract review, or signing blindly and hoping for the best.

**Solution (Enhanced):**
> Built a full-stack monorepo (React SPA + Express 5 API + Shared Types) using Google Gemini AI (gemini-2.5-flash) to scan PDF/DOCX/TXT contracts. The system extracts text via pdf-parse with Tesseract.js OCR fallback for scanned documents, routes it through one of 4 distinct AI personas (Chill Friend, Angry Lawyer, Corporate Mentor, Freelancer Senior), generates structured analysis with risk scores, red flag detection, key clause breakdowns, legal jargon translations, and auto-drafted negotiation scripts with customizable tones (Friendly/Assertive/Tough).

**Impact (Enhanced):**
> Processes contracts under 15 seconds with 4 AI personas, deployed as a Docker multi-stage container on Railway with Firebase Auth + Firestore persistence, featuring a premium PDF report export system, PWA support, full EN/ID bilingual interface, and a client-side risk scoring algorithm (High=+35pts, Medium=+15pts, capped at 100).

**Key Metrics Cards:**
```
┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
│  < 15s   │ │    4     │ │ PDF/DOCX │ │ Docker + │
│ Contract │ │   AI     │ │   + OCR  │ │ Cloud Run│
│ Analysis │ │ Personas │ │  Support │ │ Deployed │
└──────────┘ └──────────┘ └──────────┘ └──────────┘
```

**CTA Buttons:**
- `[GitHub Source]` — link ke repo
- `[Live Demo]` — link ke Railway

### 3.4 Section: Architecture

**4.1 Monorepo Structure**
Visual tree diagram (CSS-based, bukan SVG):
```
contract-chill/
├── client/          → React 19 + Vite 8 + TypeScript 6
├── server/          → Express 5 + Firebase Admin
├── shared/          → Shared TypeScript types (@chill/shared)
├── Dockerfile       → Multi-stage production build
└── package.json     → npm workspaces orchestration
```

Setiap node: clickable accordion yang expand jelasin tech stack-nya.

**4.2 System Architecture Diagram**
SVG diagram interaktif dengan 3 layer:
```
┌─────────────────────────────────────────────┐
│           FRONTEND (React SPA)              │
│  React 19 · Vite 8 · TanStack Query         │
│  Firebase Web SDK · i18next · PWA           │
└──────────────────┬──────────────────────────┘
                   │ axios + Firebase ID Token
                   ▼
┌─────────────────────────────────────────────┐
│           BACKEND (Express 5 API)           │
│  Multer · Rate Limiting · Helmet/CORS       │
│  Firebase Admin · Zod Validation             │
└──────┬──────────────┬───────────────────────┘
       │              │
       ▼              ▼
┌──────────┐  ┌──────────────────────────────┐
│ Gemini   │  │        FIRESTORE             │
│ AI API   │  │  analyses/{docId}            │
│ 2.5-flash│  │  userId, fileName, persona   │
└──────────┘  │  result, fileUrl, createdAt  │
              └──────────────────────────────┘
```

Setiap kotak: hover → tooltip dengan penjelasan teknis.

**4.3 Data Flow Pipeline**
Step-by-step animated flow (Framer Motion stagger):
```
User Upload → Multer (10MB limit) → Text Extraction
→ PDF: pdf-parse → if <50 chars → OCR (Tesseract.js)
→ TXT: UTF-8 read
→ Save to /uploads/ (UUID filename)
→ Gemini API (persona prompt + contract text)
→ JSON parsing → Retry (2x on 503)
→ Return AnalysisResult
→ Client: Risk Score calc → Render
→ Firestore: persist to analyses/{docId}
```

**4.4 Deployment Architecture**
```
Docker Multi-Stage Build:
Stage 1: deps        → npm ci (all workspaces)
Stage 2: shared      → tsc (compile shared types)
Stage 3: client      → vite build (React SPA)
Stage 4: server      → tsc (Express API)
Stage 5: runner      → node:20-alpine (production)
                     → non-root user (uid 1001)
                     → PORT 8080
                     → Express serves client/dist/ as static
```

### 3.5 Section: AI Pipeline

**5.1 The 4 Personas — Interactive Card Comparison**
4 card layout, setiap card represent 1 persona:

| Persona | Tone | Example Phrase |
|---|---|---|
| **Chill Friend** | Casual, relatable, "teman nongkrong" | "Gila sih bro, klausul ini bahaya banget..." |
| **Angry Lawyer** | Fierce, protective, scolding | "WANPRESTASI! Ini jelas merugikan kamu!" |
| **Corporate Mentor** | Strategic, professional, balanced | "Pertimbangkan untuk menegosiasikan pasal ini..." |
| **Freelancer Senior** | Practical, street-smart | "Gue dulu kena tipu gini juga. Ini yang harus kamu lakuin..." |

Card di-expandable — klik buat lihat full system prompt snippet.

**5.2 Prompt Engineering**
Expandable section yang nunjukin:
- System prompt structure
- Language detection rule
- Output JSON schema enforcement
- Critical requirements (6-8 clauses, 3-5 jargons, script per red flag)

**5.3 Text Extraction Pipeline**
```
PDF → pdf-parse
  ├── Text ≥ 50 chars → use extracted text
  └── Text < 50 chars → OCR fallback
      └── Tesseract.js (ind+eng, 120s timeout)
TXT → UTF-8 read
DOCX → not directly supported (future: mammoth.js)
```

**5.4 Risk Scoring Algorithm**
Visual formula display:
```
Score = (HighRisk × 35) + (MediumRisk × 15)
Capped at 100

Thresholds:
  0-29%  → Safe (green)
  30-59% → Moderate (amber)
  60-100%→ High Risk (red)
```

**5.5 Output Schema**
Code block display `AnalysisResult` TypeScript interface dengan komentar per field.

### 3.6 Section: Technical Deep-Dive

**6.1 API Design**
Table of endpoints:
| Method | Endpoint | Auth | Rate | Purpose |
|---|---|---|---|---|
| POST | `/api/analyze` | ✅ | 5/hr | Upload + analyze contract |
| POST | `/api/chat` | ✅ | 20/hr | Follow-up Q&A |
| POST | `/api/generate-script` | ✅ | 20/hr | Negotiation script |
| POST | `/api/generate-contract` | ✅ | 20/hr | Contract draft generator |
| POST | `/api/upload-photo` | ✅ | None | Profile photo |

**6.2 Security & Auth**
Expandable card:
- Firebase Auth (Email/Password + Google Popup)
- Server-side token verification (Firebase Admin `verifyIdToken`)
- Axios interceptor auto-attaches Bearer token
- Helmet + CORS + express-rate-limit
- Zod-validated environment variables

**6.3 Error Handling Pattern**
Code showcase:
```typescript
export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public code?: string
  ) { super(message); }
}

export const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);
```

**6.4 Key Code Snippets**
Beberapa snippet penting yang di-display:
1. **Gemini Service** — persona prompt construction + API call
2. **Auth Middleware** — Firebase token verification flow
3. **Risk Scoring** — client-side algorithm
4. **Rate Limiting** — dual limiter configuration
5. **PDF Export** — HTML generation + window.print()

Setiap snippet: copyable, dengan label "Why this matters for PT MRT Jakarta" di bawah.

**6.5 Architecture Decisions**
Expandable cards:
| Decision | Why |
|---|---|
| Express 5 over Next.js API Routes | Monorepo flexibility, independent scaling, shared types package |
| Firestore over PostgreSQL | Real-time sync for history, serverless scaling, no migration overhead |
| Docker multi-stage | 5 layer build → small production image, consistent dev/prod |
| pdf-parse + OCR fallback | Handle both digital and scanned PDFs seamlessly |
| Gemini 2.5 Flash | Fast inference (<15s), structured JSON output, cost-effective |
| Firebase Auth | Google + Email/Password out of the box, zero server-side session management |
| npm workspaces | Monorepo without Lerna/Nx overhead, shared types across client/server |

### 3.7 Section: Screenshots

**Tetap seperti sekarang** — scrollable gallery dengan 9 screenshots Contract Chill. Tidak perlu diubah.

---

## 4. i18n Keys (New)

Perlu tambahkan key baru di `messages/en.json` dan `messages/id.json`:

```json
"projectDetail": {
  // existing keys tetap...
  "architecture": "Architecture",
  "aiPipeline": "AI Pipeline",
  "technical": "Technical",
  "monorepoStructure": "Monorepo Structure",
  "systemArchitecture": "System Architecture",
  "dataFlow": "Data Flow",
  "deployment": "Deployment Architecture",
  "the4Personas": "The 4 AI Personas",
  "promptEngineering": "Prompt Engineering",
  "textExtraction": "Text Extraction Pipeline",
  "riskScoring": "Risk Scoring Algorithm",
  "outputSchema": "Output Schema",
  "apiDesign": "API Design",
  "securityAuth": "Security & Authentication",
  "errorHandling": "Error Handling",
  "architectureDecisions": "Architecture Decisions",
  "keyCodeSnippets": "Key Code Snippets",
  "whyThisMatters": "Why This Matters",
  "endpoint": "Endpoint",
  "rateLimit": "Rate Limit",
  "purpose": "Purpose"
}
```

---

## 5. Data Structure Changes

### `Project` interface — tambahkan field optional:
```typescript
export interface Project {
  // ... existing fields ...
  architecture?: {
    monorepo: { name: string; tech: string; description: string }[];
    decisions: { decision: string; reason: string }[];
    endpoints: { method: string; path: string; auth: boolean; rate: string; purpose: string }[];
  };
  aiPipeline?: {
    personas: { name: string; tone: string; example: string }[];
    riskFormula: string;
    extractionFlow: string[];
  };
  codeSnippets?: { title: string; language: string; code: string; reason: string }[];
}
```

Field ini optional — hanya project yang mau detailed (Contract Chill, InterviewOS) yang diisi.

---

## 6. Tech & Dependencies

Tidak perlu install dependency baru. Semua pakai yang sudah ada:
- `motion` (Framer Motion) — animasi section transitions
- `lucide-react` — icons
- Tailwind CSS — styling
- shadcn/ui Tabs, Accordion — interactive elements
- `next-intl` — i18n

Optional (kalau mau syntax highlighting untuk code snippets):
- Tambah `rehype-highlight` atau `shiki` untuk code block rendering
- Atau pakai `<pre><code>` styling manual dengan Tailwind

---

## 7. Implementation Notes

- Component `ProjectDetail.tsx` perlu di-refactor dari single-file menjadi modular sub-components
- Data structure perlu extended dengan field optional (architecture, aiPipeline, codeSnippets)
- i18n keys perlu ditambahkan untuk kedua locale (en, id)
- Mobile responsive: tab bar horizontal scroll, cards stack vertically
- Accessibility: proper ARIA labels, keyboard navigation, focus management
