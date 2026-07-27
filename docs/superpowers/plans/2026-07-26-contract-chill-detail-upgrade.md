# Contract Chill Project Detail Upgrade — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade the Contract Chill project detail section to be a comprehensive, professional case study suitable for presenting to PT MRT Jakarta's engineering team during a magang application.

**Architecture:** Refactor `ProjectDetail.tsx` into modular sub-components (MetricCards, ArchitectureSection, AIPipelineSection, TechnicalSection, ScreenshotsSection). Extend the `Project` interface with optional fields for detailed project data. Add i18n keys for both EN and ID locales.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, Framer Motion, next-intl, shadcn/ui Tabs & Accordion, lucide-react icons, NumberTicker component.

## Global Constraints

- Follow existing Tailwind v4 utility-first patterns (no CSS modules)
- Use `cn()` utility for class merging
- Use `motion/react` for all animations
- Use `next-intl` `useTranslations` for all text
- Use existing shadcn/ui components (Tabs, Accordion, Button)
- Use existing `NumberTicker` component for animated numbers
- No new dependencies — all using existing project libraries
- Mobile-first responsive design
- Preserve existing `projectImages` and `screenshots` data structures
- All new data fields are optional on `Project` interface — other projects unaffected

---

## Task 1: Extend Data Structure & i18n

**Files:**
- Modify: `src/app/data/projects/en.ts:1-23` (interface) + `en.ts:25-50` (Contract Chill data)
- Modify: `src/app/data/projects/id.ts:3-28` (Contract Chill data)
- Modify: `messages/en.json:168-179` (add new keys)
- Modify: `messages/id.json:168-179` (add new keys)

**Interfaces:**
- Produces: Extended `Project` interface with optional `architecture`, `aiPipeline`, `codeSnippets` fields

- [ ] **Step 1: Extend Project interface in `en.ts`**

Add optional fields after the existing `accent` field:

```typescript
// src/app/data/projects/en.ts — after line 22 (closing of accent)
export interface Project {
  slug: string;
  title: string;
  summary: string;
  challenge: string;
  solution: string;
  impact: string;
  stack: string[];
  role: string;
  year: string;
  sourceUrl: string;
  demoUrl?: string;
  type: ProjectType;
  metrics: string[];
  featured?: boolean;
  badge?: string;
  accent: {
    glow: string;
    color: string;
  };
  // NEW — optional detailed project data
  architecture?: {
    monorepo: { name: string; tech: string; description: string }[];
    decisions: { decision: string; reason: string }[];
    endpoints: { method: string; path: string; auth: boolean; rate: string; purpose: string }[];
    dataFlow: string[];
    deployment: string[];
  };
  aiPipeline?: {
    personas: { name: string; tone: string; example: string; icon: string }[];
    riskFormula: { high: number; medium: number; cap: number };
    extractionFlow: { step: string; detail: string }[];
    outputSchema: { field: string; type: string; description: string }[];
  };
  codeSnippets?: { title: string; language: string; code: string; reason: string }[];
}
```

- [ ] **Step 2: Update Contract Chill data in `en.ts`**

Replace the Contract Chill object (lines 26-50) with enhanced data:

```typescript
{
  slug: "contract-chill",
  title: "ContractChill — AI Contract Analyzer",
  summary:
    "An AI-powered legal document analyzer and generator that detects red flags, translates legal jargon into plain English, and drafts negotiation scripts — built for freelancers and small businesses.",
  challenge:
    "Freelancers and small business owners often sign contracts containing unfair clauses — unlimited liability, IP traps, unilateral termination rights — because they lack the legal expertise or budget to hire a lawyer for every agreement. The existing alternative: expensive legal consultations costing $200-500 per contract review, or signing blindly and hoping for the best.",
  solution:
    "Built a full-stack monorepo (React SPA + Express 5 API + Shared Types) using Google Gemini AI (gemini-2.5-flash) to scan PDF/DOCX/TXT contracts. The system extracts text via pdf-parse with Tesseract.js OCR fallback for scanned documents, routes it through one of 4 distinct AI personas (Chill Friend, Angry Lawyer, Corporate Mentor, Freelancer Senior), generates structured analysis with risk scores, red flag detection, key clause breakdowns, legal jargon translations, and auto-drafted negotiation scripts with customizable tones (Friendly/Assertive/Tough).",
  impact:
    "Processes contracts under 15 seconds with 4 AI personas, deployed as a Docker multi-stage container on Railway with Firebase Auth + Firestore persistence, featuring a premium PDF report export system, PWA support, full EN/ID bilingual interface, and a client-side risk scoring algorithm (High=+35pts, Medium=+15pts, capped at 100).",
  stack: ["React", "TypeScript", "Node.js", "Express", "Google Gemini AI", "Firebase", "Docker", "Google Cloud Run"],
  role: "Full-Stack Developer & AI Engineer",
  year: "2025",
  sourceUrl: "https://github.com/callmezaa/contract-chill",
  demoUrl: "https://contract-chill-production.up.railway.app",
  type: "ai",
  featured: true,
  badge: "Hackathon",
  metrics: ["< 15s Analysis", "4 AI Personas", "PDF/DOCX Support", "Cloud Run Deployed"],
  accent: {
    glow: "rgba(99, 102, 241, 0.14)",
    color: "#6366f1",
  },
  architecture: {
    monorepo: [
      { name: "client/", tech: "React 19 + Vite 8 + TypeScript 6", description: "SPA with TanStack Query, Firebase Web SDK, i18next, PWA support, and custom motion component library" },
      { name: "server/", tech: "Express 5 + Firebase Admin", description: "REST API with Multer uploads, rate limiting, Helmet/CORS security, Zod validation, and Gemini AI integration" },
      { name: "shared/", tech: "@chill/shared types", description: "Shared TypeScript types (AnalysisResult, RedFlag, Persona, RiskLevel) used by both client and server" },
    ],
    decisions: [
      { decision: "Express 5 over Next.js API Routes", reason: "Monorepo flexibility — independent scaling, shared types package, separation of concerns between SPA and API" },
      { decision: "Firestore over PostgreSQL", reason: "Real-time sync for analysis history, serverless scaling, no migration overhead — ideal for rapid prototyping" },
      { decision: "Docker multi-stage build", reason: "5-layer build produces minimal production image, ensures consistent dev/prod environments" },
      { decision: "pdf-parse + Tesseract.js OCR fallback", reason: "Handles both digital and scanned PDFs seamlessly — OCR activates only when extracted text < 50 chars" },
      { decision: "Gemini 2.5 Flash", reason: "Fast inference (<15s), structured JSON output capability, cost-effective for hackathon budget" },
      { decision: "Firebase Auth", reason: "Google + Email/Password out of the box, zero server-side session management, integrates with Firestore" },
      { decision: "npm workspaces", reason: "Monorepo without Lerna/Nx overhead, shared types across client/server with minimal config" },
    ],
    endpoints: [
      { method: "POST", path: "/api/analyze", auth: true, rate: "5/hr", purpose: "Upload contract + AI analysis" },
      { method: "POST", path: "/api/chat", auth: true, rate: "20/hr", purpose: "Follow-up Q&A on analyzed contract" },
      { method: "POST", path: "/api/generate-script", auth: true, rate: "20/hr", purpose: "Generate negotiation script" },
      { method: "POST", path: "/api/generate-contract", auth: true, rate: "20/hr", purpose: "Generate contract draft" },
      { method: "POST", path: "/api/upload-photo", auth: true, rate: "None", purpose: "Upload profile photo" },
    ],
    dataFlow: [
      "User uploads contract (PDF/DOCX/TXT) via Dashboard",
      "Multer receives file (memory storage, 10MB limit)",
      "Firebase Auth middleware verifies Bearer token",
      "Rate limiter checks (5 req/hr per IP for analyze)",
      "Text extraction: pdf-parse → if <50 chars → OCR fallback (Tesseract.js, 120s timeout)",
      "Save file to /uploads/ with UUID filename",
      "Gemini API call with persona prompt + contract text",
      "JSON parsing with retry logic (2x on 503, 2s delay)",
      "Return AnalysisResult + fileUrl to client",
      "Client calculates risk score → renders analysis",
      "Persist to Firestore: analyses/{docId}",
    ],
    deployment: [
      "Stage 1 (deps): npm ci — install all workspace dependencies",
      "Stage 2 (shared): tsc — compile @chill/shared types",
      "Stage 3 (client): vite build — production React SPA",
      "Stage 4 (server): tsc — compile Express API",
      "Stage 5 (runner): node:20-alpine — non-root user (uid 1001), PORT 8080",
      "Express serves client/dist/ as static files in production",
      "Auto-deploy from GitHub push via Railway",
    ],
  },
  aiPipeline: {
    personas: [
      { name: "Chill Friend", tone: "Casual, relatable, 'teman nongkrong'", example: "Gila sih bro, klausul ini bahaya banget — kamu bisa rugi gede kalau tanda tangan gini.", icon: "😎" },
      { name: "Angry Lawyer", tone: "Fierce, protective, scolding", example: "WANPRESTASI! Klausul ini JELAS merugikan kamu. Jangan berani tanda tangan tanpa negosiasi!", icon: "⚖️" },
      { name: "Corporate Mentor", tone: "Strategic, professional, balanced", example: "Pertimbangkan untuk menegosiasikan pasal ini — ada ruang untuk win-win solution.", icon: "👔" },
      { name: "Freelancer Senior", tone: "Practical, street-smart, empathetic", example: "Gue dulu kena tipu gini juga. Ini yang harus kamu lakuin sebelum tanda tangan...", icon: "🧑‍💻" },
    ],
    riskFormula: { high: 35, medium: 15, cap: 100 },
    extractionFlow: [
      { step: "PDF Upload", detail: "pdf-parse extracts text from digital PDFs" },
      { step: "OCR Fallback", detail: "If extracted text < 50 chars, Tesseract.js activates with ind+eng model, 120s timeout" },
      { step: "TXT Support", detail: "Direct UTF-8 read for plain text files" },
      { step: "Persona Routing", detail: "Contract text + persona prompt sent to Gemini 2.5 Flash" },
      { step: "JSON Parsing", detail: "Regex extraction {…} from response, parse to AnalysisResult" },
      { step: "Retry Logic", detail: "Up to 2 retries on 503 (Service Unavailable) with 2s delays" },
    ],
    outputSchema: [
      { field: "summary", type: "string", description: "Brief contract overview in persona voice" },
      { field: "redFlags[]", type: "RedFlag[]", description: "Risk flags with clause, risk level, explanation, suggested negotiation script" },
      { field: "negotiationSuggestions", type: "string[]", description: "Strategic negotiation tips" },
      { field: "clauses[]", type: "Clause[]", description: "6-8 key clause breakdowns with plain-language explanations" },
      { field: "jargons[]", type: "Jargon[]", description: "3-5 legal term definitions translated to simple language" },
      { field: "personaExplanation", type: "string", description: "Persona's concluding remark + legal disclaimer" },
    ],
  },
  codeSnippets: [
    {
      title: "Gemini Service — Persona Prompt Construction",
      language: "typescript",
      code: `const personaPrompts = {
  'Chill Friend': 'Lo adalah teman nongkrong yang lagi ngobrolin kontrak...',
  'Angry Lawyer': 'Lo adalah pengacara galak yang lagi ngomelin klien...',
  'Corporate Mentor': 'Lo adalah mentor korporat yang lagi advising...',
  'Freelancer Senior': 'Lo adalah freelancer senior yang udah kena tipu...',
};

export async function analyzeContract(text: string, persona: Persona) {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
  const prompt = personaPrompts[persona] + '\\n\\n' + OUTPUT_SCHEMA;
  const result = await model.generateContent(prompt + '\\n\\n' + text);
  return JSON.parse(result.response.text().match(/\\{[\\s\\S]*\\}/)?.[0]);
}`,
      reason: "Demonstrates structured AI integration with persona-based prompt engineering and robust JSON extraction",
    },
    {
      title: "Auth Middleware — Firebase Token Verification",
      language: "typescript",
      code: `export const authMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }
  try {
    const idToken = authHeader.split('Bearer ')[1];
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = { uid: decodedToken.uid, email: decodedToken.email! };
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};`,
      reason: "Shows enterprise-grade authentication with Firebase Admin SDK — token extraction, verification, and user context injection",
    },
    {
      title: "Risk Scoring Algorithm",
      language: "typescript",
      code: `const calculateRiskScore = (redFlags: RedFlag[]) => {
  if (!redFlags || redFlags.length === 0) return 0;
  const highRiskCount = redFlags.filter(f => f.risk === 'High').length;
  const mediumRiskCount = redFlags.filter(f => f.risk === 'Medium').length;
  let score = (highRiskCount * 35) + (mediumRiskCount * 15);
  return Math.min(score, 100);
};

// Thresholds: 0-29% Safe (green) | 30-59% Moderate (amber) | 60-100% High Risk (red)`,
      reason: "Client-side risk calculation — demonstrates weighted scoring algorithm with safety cap",
    },
    {
      title: "Rate Limiting — Dual Limiter Configuration",
      language: "typescript",
      code: `const analyzeLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // 5 requests per hour per IP
  message: { error: 'Too many analysis requests. Try again in an hour.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const chatLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 20, // 20 requests per hour per IP
  message: { error: 'Too many requests. Please slow down.' },
});

// Apply per-route: router.post('/analyze', authMiddleware, analyzeLimiter, controller.analyze);`,
      reason: "Protects Gemini API free tier from abuse — demonstrates production-aware rate limiting strategy",
    },
    {
      title: "Error Handling — AppError + asyncHandler Pattern",
      language: "typescript",
      code: `export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public code?: string
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export const asyncHandler = (fn: AsyncFn) =>
  (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

// Global handler in index.ts:
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.message,
      code: err.code,
    });
  }
  res.status(500).json({ error: 'Internal server error' });
});`,
      reason: "Clean error handling pattern — custom error class, async wrapper, and global handler for consistent API responses",
    },
  ],
}
```

- [ ] **Step 3: Update Contract Chill data in `id.ts`**

Add the same new fields to the Indonesian version. The `architecture`, `aiPipeline`, and `codeSnippets` fields are language-agnostic (code, numbers, tech terms), so they can be identical. Only `challenge`, `solution`, `impact` differ.

```typescript
// src/app/data/projects/id.ts — Contract Chill object
// Keep existing challenge, solution, impact (already translated)
// Add architecture, aiPipeline, codeSnippets (same as en.ts)
```

- [ ] **Step 4: Add i18n keys in `messages/en.json`**

Add new keys inside the `projectDetail` object:

```json
{
  "projectDetail": {
    "backToProjects": "Back to Projects",
    "overview": "Overview",
    "architecture": "Architecture",
    "aiPipeline": "AI Pipeline",
    "technical": "Technical",
    "screenshots": "Screenshots",
    "techStack": "Tech Stack",
    "challenge": "Challenge",
    "solution": "Solution",
    "impact": "Impact",
    "sourceCode": "Source Code",
    "liveDemo": "Live Demo",
    "noScreenshots": "No screenshots available.",
    "monorepoStructure": "Monorepo Structure",
    "systemArchitecture": "System Architecture",
    "dataFlow": "Data Flow Pipeline",
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
    "purpose": "Purpose",
    "method": "Method",
    "auth": "Auth",
    "decision": "Decision",
    "reason": "Why",
    "copyCode": "Copy",
    "copied": "Copied!",
    "highRisk": "High Risk",
    "mediumRisk": "Medium Risk",
    "safe": "Safe",
    "contractAnalysis": "Contract Analysis",
    "aiPersonas": "AI Personas",
    "fileSupport": "File Support",
    "deployed": "Deployed"
  }
}
```

- [ ] **Step 5: Add i18n keys in `messages/id.json`**

Add the Indonesian equivalents:

```json
{
  "projectDetail": {
    "backToProjects": "Kembali ke Proyek",
    "overview": "Gambaran",
    "architecture": "Arsitektur",
    "aiPipeline": "Pipeline AI",
    "technical": "Teknis",
    "screenshots": "Tangkapan Layar",
    "techStack": "Tech Stack",
    "challenge": "Tantangan",
    "solution": "Solusi",
    "impact": "Dampak",
    "sourceCode": "Kode Sumber",
    "liveDemo": "Demo Langsung",
    "noScreenshots": "Belum ada tangkapan layar.",
    "monorepoStructure": "Struktur Monorepo",
    "systemArchitecture": "Arsitektur Sistem",
    "dataFlow": "Alur Data Pipeline",
    "deployment": "Arsitektur Deployment",
    "the4Personas": "4 Persona AI",
    "promptEngineering": "Prompt Engineering",
    "textExtraction": "Pipeline Ekstraksi Teks",
    "riskScoring": "Algoritma Skor Risiko",
    "outputSchema": "Skema Output",
    "apiDesign": "Desain API",
    "securityAuth": "Keamanan & Autentikasi",
    "errorHandling": "Penanganan Error",
    "architectureDecisions": "Keputusan Arsitektur",
    "keyCodeSnippets": "Snippet Kode Utama",
    "whyThisMatters": "Mengapa Ini Penting",
    "endpoint": "Endpoint",
    "rateLimit": "Batas Rate",
    "purpose": "Tujuan",
    "method": "Metode",
    "auth": "Autentikasi",
    "decision": "Keputusan",
    "reason": "Alasan",
    "copyCode": "Salin",
    "copied": "Disalin!",
    "highRisk": "Risiko Tinggi",
    "mediumRisk": "Risiko Sedang",
    "safe": "Aman",
    "contractAnalysis": "Analisis Kontrak",
    "aiPersonas": "Persona AI",
    "fileSupport": "Dukungan File",
    "deployed": "Di-deploy"
  }
}
```

- [ ] **Step 6: Verify data structure compiles**

Run: `npx tsc --noEmit` from project root
Expected: No errors

- [ ] **Step 7: Commit**

```bash
git add src/app/data/projects/en.ts src/app/data/projects/id.ts messages/en.json messages/id.json
git commit -m "feat: extend Project interface with architecture, aiPipeline, codeSnippets fields and add i18n keys"
```

---

## Task 2: Create MetricCards Component

**Files:**
- Create: `src/app/components/project-detail/MetricCards.tsx`

**Interfaces:**
- Consumes: `metrics: string[]` from Project, `accent: { glow: string; color: string }`
- Produces: Renders 4 animated metric cards with NumberTicker

- [ ] **Step 1: Create directory**

```bash
mkdir -p src/app/components/project-detail
```

- [ ] **Step 2: Create MetricCards component**

```typescript
// src/app/components/project-detail/MetricCards.tsx
"use client";

import { motion } from "motion/react";
import { NumberTicker } from "@/components/motion/number-ticker";
import { staggerContainer, staggerItem } from "@/app/utils/animations";

interface MetricCardsProps {
  metrics: string[];
  accent: { glow: string; color: string };
}

export default function MetricCards({ metrics, accent }: MetricCardsProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-3"
    >
      {metrics.map((metric, i) => {
        const match = metric.match(/^([<>\d.]+)\s*(.*)$/);
        const number = match ? parseFloat(match[1].replace(/[<>]/g, "")) : null;
        const prefix = match && match[1].startsWith("<") ? "< " : undefined;
        const label = match ? match[2] : metric;

        return (
          <motion.div
            key={metric}
            variants={staggerItem}
            className="rounded-xl border border-border bg-canvas-card p-4 text-center space-y-1"
            style={{ boxShadow: `0 0 20px ${accent.glow}` }}
          >
            {number !== null ? (
              <div className="display-lg text-foreground">
                {prefix && <span className="text-muted-foreground body-small">{prefix}</span>}
                <NumberTicker value={number} duration={0.8} stagger={0.05} />
              </div>
            ) : (
              <div className="display-lg text-foreground">{metric.split(" ")[0]}</div>
            )}
            <p className="body-small text-muted-foreground">{label}</p>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
```

- [ ] **Step 3: Verify it renders**

Run: `npm run dev` and check the component compiles without errors.

- [ ] **Step 4: Commit**

```bash
git add src/app/components/project-detail/MetricCards.tsx
git commit -m "feat: add MetricCards component with animated number tickers"
```

---

## Task 3: Create ArchitectureSection Component

**Files:**
- Create: `src/app/components/project-detail/ArchitectureSection.tsx`

**Interfaces:**
- Consumes: `architecture` field from Project (optional)
- Produces: Renders monorepo tree, system diagram, data flow, deployment stages

- [ ] **Step 1: Create ArchitectureSection component**

```typescript
// src/app/components/project-detail/ArchitectureSection.tsx
"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { staggerContainer, staggerItem } from "@/app/utils/animations";
import { Server, Monitor, Package, Database, Shield, Zap } from "lucide-react";

interface ArchitectureProps {
  architecture: {
    monorepo: { name: string; tech: string; description: string }[];
    decisions: { decision: string; reason: string }[];
    endpoints: { method: string; path: string; auth: boolean; rate: string; purpose: string }[];
    dataFlow: string[];
    deployment: string[];
  };
  accent: { glow: string; color: string };
}

const ICONS: Record<string, React.ReactNode> = {
  "client/": <Monitor size={16} />,
  "server/": <Server size={16} />,
  "shared/": <Package size={16} />,
};

export default function ArchitectureSection({ architecture, accent }: ArchitectureProps) {
  const t = useTranslations("projectDetail");

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="space-y-10"
    >
      {/* Monorepo Structure */}
      <motion.section variants={staggerItem} className="space-y-4">
        <h3 className="button-cap text-foreground">{t("monorepoStructure")}</h3>
        <div className="rounded-xl border border-border overflow-hidden divide-y divide-border">
          {architecture.monorepo.map((item) => (
            <Accordion key={item.name} type="single" collapsible>
              <AccordionItem value={item.name} className="border-none">
                <AccordionTrigger className="px-4 py-3 hover:no-underline w-full">
                  <div className="flex items-center gap-3">
                    <span className="text-muted-foreground">{ICONS[item.name] || <Package size={16} />}</span>
                    <span className="mono-sm text-foreground">{item.name}</span>
                    <span className="body-small text-muted-foreground ml-auto">{item.tech}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-3">
                  <p className="body-small text-muted-foreground pl-7">{item.description}</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </motion.section>

      {/* System Architecture Diagram */}
      <motion.section variants={staggerItem} className="space-y-4">
        <h3 className="button-cap text-foreground">{t("systemArchitecture")}</h3>
        <div className="rounded-xl border border-border bg-canvas-card p-6 space-y-4">
          {/* Frontend Layer */}
          <div className="rounded-lg border border-border p-4 text-center" style={{ boxShadow: `0 0 20px ${accent.glow}` }}>
            <p className="button-cap text-foreground mb-1">FRONTEND (React SPA)</p>
            <p className="body-small text-muted-foreground">React 19 · Vite 8 · TanStack Query · Firebase Web SDK · i18next · PWA</p>
          </div>
          {/* Arrow */}
          <div className="flex justify-center">
            <div className="text-muted-foreground body-small flex flex-col items-center gap-1">
              <span>↓</span>
              <span className="mono-sm">axios + Firebase ID Token</span>
              <span>↓</span>
            </div>
          </div>
          {/* Backend Layer */}
          <div className="rounded-lg border border-border p-4 text-center" style={{ boxShadow: `0 0 20px ${accent.glow}` }}>
            <p className="button-cap text-foreground mb-1">BACKEND (Express 5 API)</p>
            <p className="body-small text-muted-foreground">Multer · Rate Limiting · Helmet/CORS · Firebase Admin · Zod Validation</p>
          </div>
          {/* Arrow */}
          <div className="flex justify-center">
            <div className="text-muted-foreground body-small flex flex-col items-center gap-1">
              <span>↓</span>
            </div>
          </div>
          {/* External Services */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="rounded-lg border border-border p-4 text-center">
              <p className="button-cap text-foreground mb-1">Gemini AI API</p>
              <p className="body-small text-muted-foreground">gemini-2.5-flash · Structured JSON · Persona prompts</p>
            </div>
            <div className="rounded-lg border border-border p-4 text-center">
              <p className="button-cap text-foreground mb-1">Firestore</p>
              <p className="body-small text-muted-foreground">analyses/{'{docId}'} · userId, fileName, persona, result, fileUrl</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Data Flow */}
      <motion.section variants={staggerItem} className="space-y-4">
        <h3 className="button-cap text-foreground">{t("dataFlow")}</h3>
        <div className="space-y-2">
          {architecture.dataFlow.map((step, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full border border-border flex items-center justify-center">
                <span className="mono-sm text-muted-foreground">{i + 1}</span>
              </div>
              <p className="body-small text-muted-foreground pt-0.5">{step}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Deployment */}
      <motion.section variants={staggerItem} className="space-y-4">
        <h3 className="button-cap text-foreground">{t("deployment")}</h3>
        <div className="rounded-xl border border-border overflow-hidden divide-y divide-border">
          {architecture.deployment.map((stage, i) => (
            <div key={i} className="px-4 py-3 flex items-start gap-3">
              <span className="mono-sm text-muted-foreground flex-shrink-0 w-16">Stage {i + 1}</span>
              <span className="body-small text-foreground">{stage}</span>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Architecture Decisions */}
      <motion.section variants={staggerItem} className="space-y-4">
        <h3 className="button-cap text-foreground">{t("architectureDecisions")}</h3>
        <div className="space-y-2">
          {architecture.decisions.map((item, i) => (
            <Accordion key={i} type="single" collapsible>
              <AccordionItem value={`decision-${i}`} className="border border-border rounded-xl overflow-hidden px-4">
                <AccordionTrigger className="hover:no-underline py-3">
                  <span className="body-base text-foreground text-left">{item.decision}</span>
                </AccordionTrigger>
                <AccordionContent className="pb-3">
                  <p className="body-small text-muted-foreground">{item.reason}</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
}
```

- [ ] **Step 2: Verify compilation**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/app/components/project-detail/ArchitectureSection.tsx
git commit -m "feat: add ArchitectureSection with monorepo tree, system diagram, data flow, and decisions"
```

---

## Task 4: Create AIPipelineSection Component

**Files:**
- Create: `src/app/components/project-detail/AIPipelineSection.tsx`

**Interfaces:**
- Consumes: `aiPipeline` field from Project (optional)
- Produces: Renders persona cards, extraction flow, risk formula, output schema

- [ ] **Step 1: Create AIPipelineSection component**

```typescript
// src/app/components/project-detail/AIPipelineSection.tsx
"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { staggerContainer, staggerItem } from "@/app/utils/animations";

interface AIPipelineProps {
  aiPipeline: {
    personas: { name: string; tone: string; example: string; icon: string }[];
    riskFormula: { high: number; medium: number; cap: number };
    extractionFlow: { step: string; detail: string }[];
    outputSchema: { field: string; type: string; description: string }[];
  };
  accent: { glow: string; color: string };
}

export default function AIPipelineSection({ aiPipeline, accent }: AIPipelineProps) {
  const t = useTranslations("projectDetail");

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="space-y-10"
    >
      {/* The 4 Personas */}
      <motion.section variants={staggerItem} className="space-y-4">
        <h3 className="button-cap text-foreground">{t("the4Personas")}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {aiPipeline.personas.map((persona) => (
            <Accordion key={persona.name} type="single" collapsible>
              <AccordionItem value={persona.name} className="border border-border rounded-xl overflow-hidden px-4">
                <AccordionTrigger className="hover:no-underline py-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{persona.icon}</span>
                    <div className="text-left">
                      <p className="body-base font-medium text-foreground">{persona.name}</p>
                      <p className="body-small text-muted-foreground">{persona.tone}</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-3">
                  <div className="rounded-lg bg-muted/50 p-3">
                    <p className="body-small text-muted-foreground italic">&ldquo;{persona.example}&rdquo;</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </motion.section>

      {/* Text Extraction Pipeline */}
      <motion.section variants={staggerItem} className="space-y-4">
        <h3 className="button-cap text-foreground">{t("textExtraction")}</h3>
        <div className="space-y-2">
          {aiPipeline.extractionFlow.map((item, i) => (
            <div key={i} className="flex items-start gap-3 rounded-lg border border-border p-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full border border-border flex items-center justify-center">
                <span className="mono-sm text-muted-foreground">{i + 1}</span>
              </div>
              <div>
                <p className="body-base font-medium text-foreground">{item.step}</p>
                <p className="body-small text-muted-foreground">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Risk Scoring Algorithm */}
      <motion.section variants={staggerItem} className="space-y-4">
        <h3 className="button-cap text-foreground">{t("riskScoring")}</h3>
        <div className="rounded-xl border border-border bg-canvas-card p-6 space-y-4">
          <div className="text-center space-y-2">
            <p className="mono-sm text-foreground">
              Score = (High Risk × {aiPipeline.riskFormula.high}) + (Medium Risk × {aiPipeline.riskFormula.medium})
            </p>
            <p className="body-small text-muted-foreground">Capped at {aiPipeline.riskFormula.cap}%</p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-lg border border-green-500/20 bg-green-500/5 p-3 text-center">
              <p className="mono-sm text-green-600 dark:text-green-400">0-29%</p>
              <p className="body-small text-muted-foreground">{t("safe")}</p>
            </div>
            <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-3 text-center">
              <p className="mono-sm text-amber-600 dark:text-amber-400">30-59%</p>
              <p className="body-small text-muted-foreground">{t("mediumRisk")}</p>
            </div>
            <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-3 text-center">
              <p className="mono-sm text-red-600 dark:text-red-400">60-100%</p>
              <p className="body-small text-muted-foreground">{t("highRisk")}</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Output Schema */}
      <motion.section variants={staggerItem} className="space-y-4">
        <h3 className="button-cap text-foreground">{t("outputSchema")}</h3>
        <div className="rounded-xl border border-border overflow-hidden divide-y divide-border">
          {aiPipeline.outputSchema.map((field) => (
            <div key={field.field} className="px-4 py-3 flex items-start gap-3">
              <code className="mono-sm text-foreground flex-shrink-0 bg-muted px-1.5 py-0.5 rounded">{field.field}</code>
              <div>
                <p className="body-small text-muted-foreground">{field.description}</p>
                <p className="mono-sm text-muted-foreground/60 mt-0.5">{field.type}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
}
```

- [ ] **Step 2: Verify compilation**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/app/components/project-detail/AIPipelineSection.tsx
git commit -m "feat: add AIPipelineSection with persona cards, extraction flow, risk scoring, and output schema"
```

---

## Task 5: Create TechnicalSection Component

**Files:**
- Create: `src/app/components/project-detail/TechnicalSection.tsx`

**Interfaces:**
- Consumes: `architecture.endpoints`, `codeSnippets` from Project (optional)
- Produces: Renders API table, security info, error handling, code snippets

- [ ] **Step 1: Create TechnicalSection component**

```typescript
// src/app/components/project-detail/TechnicalSection.tsx
"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { staggerContainer, staggerItem } from "@/app/utils/animations";
import { Check, Copy, Shield, AlertTriangle, Code } from "lucide-react";

interface TechnicalProps {
  endpoints: { method: string; path: string; auth: boolean; rate: string; purpose: string }[];
  codeSnippets: { title: string; language: string; code: string; reason: string }[];
  accent: { glow: string; color: string };
}

function CodeBlock({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = useState(false);
  const t = useTranslations("projectDetail");

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative rounded-lg border border-border bg-muted/50 overflow-hidden">
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-border">
        <span className="mono-sm text-muted-foreground">{language}</span>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={handleCopy}
          className="h-6 w-6"
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
        </Button>
      </div>
      <pre className="p-3 overflow-x-auto text-xs leading-relaxed">
        <code className="text-foreground">{code}</code>
      </pre>
    </div>
  );
}

export default function TechnicalSection({ endpoints, codeSnippets, accent }: TechnicalProps) {
  const t = useTranslations("projectDetail");

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="space-y-10"
    >
      {/* API Design */}
      <motion.section variants={staggerItem} className="space-y-4">
        <h3 className="button-cap text-foreground">{t("apiDesign")}</h3>
        <div className="rounded-xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-4 py-2.5 text-left mono-sm text-muted-foreground font-medium">{t("method")}</th>
                  <th className="px-4 py-2.5 text-left mono-sm text-muted-foreground font-medium">{t("endpoint")}</th>
                  <th className="px-4 py-2.5 text-left mono-sm text-muted-foreground font-medium">{t("auth")}</th>
                  <th className="px-4 py-2.5 text-left mono-sm text-muted-foreground font-medium">{t("rateLimit")}</th>
                  <th className="px-4 py-2.5 text-left mono-sm text-muted-foreground font-medium">{t("purpose")}</th>
                </tr>
              </thead>
              <tbody>
                {endpoints.map((ep, i) => (
                  <tr key={i} className="border-b border-border last:border-0">
                    <td className="px-4 py-2.5">
                      <span className={`mono-sm px-1.5 py-0.5 rounded text-xs font-medium ${
                        ep.method === "POST" ? "bg-blue-500/10 text-blue-600 dark:text-blue-400" :
                        ep.method === "GET" ? "bg-green-500/10 text-green-600 dark:text-green-400" :
                        "bg-muted text-foreground"
                      }`}>
                        {ep.method}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 mono-sm text-foreground">{ep.path}</td>
                    <td className="px-4 py-2.5">
                      {ep.auth ? (
                        <Shield size={14} className="text-green-500" />
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="px-4 py-2.5 body-small text-muted-foreground">{ep.rate}</td>
                    <td className="px-4 py-2.5 body-small text-muted-foreground">{ep.purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.section>

      {/* Security & Auth */}
      <motion.section variants={staggerItem} className="space-y-4">
        <h3 className="button-cap text-foreground">{t("securityAuth")}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { icon: <Shield size={16} />, title: "Firebase Auth", desc: "Email/Password + Google Popup — zero server-side session management" },
            { icon: <Shield size={16} />, title: "Token Verification", desc: "Firebase Admin verifyIdToken on every API request" },
            { icon: <Shield size={16} />, title: "Axios Interceptor", desc: "Auto-attaches Bearer token, handles 401/429/500 responses" },
            { icon: <Shield size={16} />, title: "Security Headers", desc: "Helmet + CORS + express-rate-limit protection" },
          ].map((item, i) => (
            <div key={i} className="rounded-xl border border-border p-4 flex items-start gap-3">
              <span className="text-muted-foreground mt-0.5">{item.icon}</span>
              <div>
                <p className="body-base font-medium text-foreground">{item.title}</p>
                <p className="body-small text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Error Handling */}
      <motion.section variants={staggerItem} className="space-y-4">
        <h3 className="button-cap text-foreground">{t("errorHandling")}</h3>
        <div className="rounded-xl border border-border p-4 space-y-3">
          <div className="flex items-start gap-3">
            <AlertTriangle size={16} className="text-muted-foreground mt-0.5" />
            <div>
              <p className="body-base font-medium text-foreground">AppError + asyncHandler Pattern</p>
              <p className="body-small text-muted-foreground">Custom error class with statusCode, async route wrapper, and global error handler for consistent API responses</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Key Code Snippets */}
      <motion.section variants={staggerItem} className="space-y-4">
        <h3 className="button-cap text-foreground">{t("keyCodeSnippets")}</h3>
        <div className="space-y-4">
          {codeSnippets.map((snippet, i) => (
            <Accordion key={i} type="single" collapsible>
              <AccordionItem value={`snippet-${i}`} className="border border-border rounded-xl overflow-hidden px-4">
                <AccordionTrigger className="hover:no-underline py-3">
                  <div className="flex items-center gap-3">
                    <Code size={16} className="text-muted-foreground" />
                    <span className="body-base text-foreground text-left">{snippet.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-3 space-y-3">
                  <CodeBlock code={snippet.code} language={snippet.language} />
                  <div className="rounded-lg bg-muted/50 p-3">
                    <p className="body-small text-muted-foreground">
                      <span className="font-medium text-foreground">{t("whyThisMatters")}:</span> {snippet.reason}
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
}
```

- [ ] **Step 2: Verify compilation**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/app/components/project-detail/TechnicalSection.tsx
git commit -m "feat: add TechnicalSection with API design, security, error handling, and code snippets"
```

---

## Task 6: Refactor ProjectDetail.tsx

**Files:**
- Modify: `src/app/components/ProjectDetail.tsx`

**Interfaces:**
- Consumes: All new sub-components (MetricCards, ArchitectureSection, AIPipelineSection, TechnicalSection)
- Produces: Updated ProjectDetail with new navigation and section layout

- [ ] **Step 1: Replace ProjectDetail.tsx content**

```typescript
// src/app/components/ProjectDetail.tsx
"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { ArrowLeft, ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";
import type { Project } from "../data/projects";
import { techDescriptions } from "../data/projects";
import { easeOut } from "../utils/animations";
import { Button } from "@/components/ui/button";
import MetricCards from "./project-detail/MetricCards";
import ArchitectureSection from "./project-detail/ArchitectureSection";
import AIPipelineSection from "./project-detail/AIPipelineSection";
import TechnicalSection from "./project-detail/TechnicalSection";

const projectImages: Record<string, string> = {
  "contract-chill": "/image/contract-chill/screenshot/homepage.png",
  interviewos: "/image/interviewOS/homesection.png",
  assetra: "/image/assetra/homesection.png",
  "gotani-pos": "/image/GotaniApp/mockup-v2.png",
  monetra: "/image/monetra/homesection.png",
  mercato: "/image/mercato/mockup.png",
  nextalk: "/image/nextalkApp/mockup-v2.png",
  "pallete-studio": "/image/PalleteStudio/mockup.png",
};

const screenshots: Record<string, { src: string; label: string }[]> = {
  "contract-chill": [
    { src: "/image/contract-chill/screenshot/homepage.png", label: "Homepage" },
    { src: "/image/contract-chill/screenshot/analysizpage.png", label: "Analysis" },
    { src: "/image/contract-chill/screenshot/howitsworkpage.png", label: "How It Works" },
    { src: "/image/contract-chill/screenshot/contractgeneratorpage.png", label: "Contract Generator" },
    { src: "/image/contract-chill/screenshot/CTApage.png", label: "CTA" },
    { src: "/image/contract-chill/screenshot/historypage.png", label: "History" },
    { src: "/image/contract-chill/screenshot/livedemopage.png", label: "Live Demo" },
    { src: "/image/contract-chill/screenshot/dashboardpage.png", label: "Dashboard" },
    { src: "/image/contract-chill/screenshot/loginpage.png", label: "Login" },
  ],
  interviewos: [
    { src: "/image/interviewOS/featuressection.png", label: "Features" },
    { src: "/image/interviewOS/interviewroom.png", label: "Interview Room" },
    { src: "/image/interviewOS/dashboardpage.png", label: "Dashboard" },
    { src: "/image/interviewOS/loginpage.png", label: "Login" },
  ],
  assetra: [
    { src: "/image/assetra/assetsection.png", label: "Asset" },
    { src: "/image/assetra/overviewpage.png", label: "Overview" },
    { src: "/image/assetra/marketplacepage.png", label: "Marketplace" },
    { src: "/image/assetra/librarypage.png", label: "Library" },
    { src: "/image/assetra/myproductpage.png", label: "My Product" },
    { src: "/image/assetra/addproductpage.png", label: "Add Product" },
    { src: "/image/assetra/walletpage.png", label: "Wallet" },
    { src: "/image/assetra/settingspage.png", label: "Settings" },
    { src: "/image/assetra/loginpage.png", label: "Login" },
  ],
  "gotani-pos": [
    { src: "/image/GotaniApp/beranda.png", label: "Beranda" },
    { src: "/image/GotaniApp/transaksi.png", label: "Transaksi" },
    { src: "/image/GotaniApp/laporan.png", label: "Laporan" },
    { src: "/image/GotaniApp/splashscreen.png", label: "Splash" },
    { src: "/image/GotaniApp/loginadmin.png", label: "Login Admin" },
    { src: "/image/GotaniApp/loginkaryawan.png", label: "Login Karyawan" },
    { src: "/image/GotaniApp/drawerberanda-portrait.png", label: "Drawer" },
    { src: "/image/GotaniApp/feedback-portrait.png", label: "Feedback" },
    { src: "/image/GotaniApp/pembayaran-portrait.png", label: "Pembayaran" },
    { src: "/image/GotaniApp/pembayarantunai-portrait.png", label: "Pembayaran Tunai" },
    { src: "/image/GotaniApp/transaksiberhasil-portrait.png", label: "Transaksi Berhasil" },
    { src: "/image/GotaniApp/detailtransaksi-portrait.png", label: "Detail Transaksi" },
    { src: "/image/GotaniApp/riwayattransaksi.png", label: "Riwayat Transaksi" },
    { src: "/image/GotaniApp/riwayattransaksikaryawan-portrait.png", label: "Riwayat Karyawan" },
    { src: "/image/GotaniApp/manajemenstok-portrait.png", label: "Manajemen Stok" },
    { src: "/image/GotaniApp/kelolastok-portrait.png", label: "Kelola Stok" },
    { src: "/image/GotaniApp/detailstok-portrait.png", label: "Detail Stok" },
    { src: "/image/GotaniApp/editstok-portrait.png", label: "Edit Stok" },
    { src: "/image/GotaniApp/stokprodukkaryawan-portrait.png", label: "Stok Produk Karyawan" },
    { src: "/image/GotaniApp/detailstokprodukkaryawan-portrait.png", label: "Detail Stok Karyawan" },
    { src: "/image/GotaniApp/stokkaryawan-portrait.png", label: "Stok Karyawan" },
    { src: "/image/GotaniApp/distribusistok-portrait.png", label: "Distribusi Stok" },
    { src: "/image/GotaniApp/modaldistribusistok-portrait.png", label: "Modal Distribusi" },
    { src: "/image/GotaniApp/kelolaproduk.png", label: "Kelola Produk" },
    { src: "/image/GotaniApp/tambahproduk-portrait.png", label: "Tambah Produk" },
    { src: "/image/GotaniApp/editproduk-portrait.png", label: "Edit Produk" },
    { src: "/image/GotaniApp/kategoriproduk-portrait.png", label: "Kategori Produk" },
    { src: "/image/GotaniApp/tambahkategori-portrait.png", label: "Tambah Kategori" },
    { src: "/image/GotaniApp/produkterjual-portrait.png", label: "Produk Terjual" },
    { src: "/image/GotaniApp/produkterlaris-portrait.png", label: "Produk Terlaris" },
    { src: "/image/GotaniApp/supplier-portrait.png", label: "Supplier" },
    { src: "/image/GotaniApp/kelolakaryawan-portrait.png", label: "Kelola Karyawan" },
    { src: "/image/GotaniApp/tambahkaryawan-portrait.png", label: "Tambah Karyawan" },
    { src: "/image/GotaniApp/editkaryawan-portrait.png", label: "Edit Karyawan" },
    { src: "/image/GotaniApp/laporanpenjualan-portrait.png", label: "Laporan Penjualan" },
    { src: "/image/GotaniApp/omsetperbulan-portrait.png", label: "Omset Per Bulan" },
    { src: "/image/GotaniApp/pengaturan-portrait.png", label: "Pengaturan" },
    { src: "/image/GotaniApp/pengaturanpfile-portrait.png", label: "Profil" },
    { src: "/image/GotaniApp/pengaturanubahkatasandi-portrait.png", label: "Ubah Kata Sandi" },
    { src: "/image/GotaniApp/pengaturanstruk-portrait.png", label: "Struk" },
  ],
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
  nextalk: [
    { src: "/image/nextalkApp/homescreen.png", label: "Home" },
    { src: "/image/nextalkApp/roomchatscreen.png", label: "Room Chat" },
    { src: "/image/nextalkApp/explorescreen.png", label: "Explore" },
    { src: "/image/nextalkApp/splashscreen.png", label: "Splash" },
    { src: "/image/nextalkApp/onboarding1.png", label: "Onboarding 1" },
    { src: "/image/nextalkApp/onboarding2.png", label: "Onboarding 2" },
    { src: "/image/nextalkApp/onboarding3.png", label: "Onboarding 3" },
    { src: "/image/nextalkApp/loginscreen.png", label: "Login" },
    { src: "/image/nextalkApp/registerscreen.png", label: "Register" },
    { src: "/image/nextalkApp/grupscreen.png", label: "Group" },
    { src: "/image/nextalkApp/creategrupscreen.png", label: "Create Group" },
    { src: "/image/nextalkApp/nexbotscreen.png", label: "NexBot AI" },
    { src: "/image/nextalkApp/storyscreen.png", label: "Story" },
    { src: "/image/nextalkApp/unreadscreen.png", label: "Unread" },
    { src: "/image/nextalkApp/callscreen.png", label: "Call" },
    { src: "/image/nextalkApp/profilescreen.png", label: "Profile" },
  ],
  mercato: [
    { src: "/image/mercato/1.png", label: "Onboarding" },
    { src: "/image/mercato/2.png", label: "Products" },
    { src: "/image/mercato/3.png", label: "Wishlist" },
    { src: "/image/mercato/4.png", label: "E-Receipt" },
    { src: "/image/mercato/5.png", label: "Profile" },
  ],
};

const MOBILE_APPS = ["gotani-pos", "mercato", "nextalk"];

const NAV_SECTIONS = ["overview", "architecture", "aiPipeline", "technical", "screenshots"] as const;

interface ProjectDetailProps {
  project: Project;
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  const t = useTranslations("projectDetail");
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeSection, setActiveSection] = useState<string>("overview");
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const heroSrc = projectImages[project.slug] || projectImages[project.slug];
  const gallery = screenshots[project.slug];
  const isMobileApp = MOBILE_APPS.includes(project.slug);
  const heroScreenshots = isMobileApp && gallery ? gallery.slice(0, 3) : null;
  const galleryScreenshots = isMobileApp && gallery ? gallery.slice(3) : gallery;
  const allScreenshots = galleryScreenshots ?? [];

  const hasDetailedData = !!(project.architecture || project.aiPipeline || project.codeSnippets);

  const scrollTo = useCallback((index: number) => {
    const container = containerRef.current;
    if (!container) return;
    const child = container.children[index] as HTMLElement;
    if (child) {
      child.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
      setActiveIndex(index);
    }
  }, []);

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const idx = Math.round(container.scrollLeft / container.clientWidth);
    if (idx !== activeIndex) setActiveIndex(idx);
  }, [activeIndex]);

  const scrollToSection = useCallback((sectionId: string) => {
    const el = sectionRefs.current[sectionId];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  // Intersection observer for active section tracking
  useEffect(() => {
    if (!hasDetailedData) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );

    NAV_SECTIONS.forEach((section) => {
      const el = sectionRefs.current[section];
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [hasDetailedData]);

  return (
    <div className="min-h-dvh bg-canvas pt-28 md:pt-36">
      <div className="mx-auto max-w-4xl px-6 md:px-8 pb-24">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 label text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft size={14} />
          {t('backToProjects')}
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easeOut }}
          className="space-y-10"
        >
          {/* Hero Image */}
          <div className="space-y-3">
            {heroScreenshots ? (
              <div className="grid grid-cols-3 gap-2 md:gap-4">
                {heroScreenshots.map((ss) => (
                  <div key={ss.label} className="rounded-sm border border-border bg-canvas-card overflow-hidden">
                    <Image
                      src={ss.src}
                      alt={ss.label}
                      width={400}
                      height={711}
                      className="w-full h-auto block"
                      priority
                      sizes="(max-width: 768px) 33vw, 280px"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="relative w-full rounded-sm border border-border bg-canvas-card overflow-hidden">
                <Image
                  src={heroSrc}
                  alt={project.title}
                  width={1200}
                  height={675}
                  priority
                  className="w-full h-auto block"
                  sizes="(max-width: 768px) 100vw, 896px"
                />
              </div>
            )}

            <div className="flex flex-wrap items-center gap-3">
              {project.badge && (
                <span className="label px-2.5 py-1 rounded-sm border border-border text-muted-foreground">{project.badge}</span>
              )}
              <span className="body-small text-muted-foreground">{project.year}</span>
              <span className="body-small text-muted-foreground">·</span>
              <span className="body-small text-muted-foreground">{project.role}</span>
            </div>
            <h1 className="display-xl text-balance">{project.title}</h1>
            <p className="body-base text-muted-foreground">{project.summary}</p>

            {/* Metric Cards */}
            {project.metrics.length > 0 && (
              <MetricCards metrics={project.metrics} accent={project.accent} />
            )}
          </div>

          {/* Navigation — conditional: detailed nav for enhanced projects, simple tabs for others */}
          {hasDetailedData ? (
            <>
              {/* Sticky Section Nav */}
              <nav className="sticky top-16 z-30 -mx-6 md:-mx-8 px-6 md:px-8 py-3 bg-canvas/80 backdrop-blur-lg border-b border-border">
                <div className="flex gap-1 overflow-x-auto hide-scrollbar">
                  {NAV_SECTIONS.map((section) => (
                    <button
                      key={section}
                      onClick={() => scrollToSection(section)}
                      className={`label px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                        activeSection === section
                          ? "bg-foreground text-canvas"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}
                    >
                      {t(section)}
                    </button>
                  ))}
                </div>
              </nav>

              {/* Sections */}
              <div className="space-y-16">
                {/* Overview */}
                <section
                  id="overview"
                  ref={(el) => { sectionRefs.current["overview"] = el; }}
                  className="space-y-8"
                >
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <h2 className="button-cap text-foreground">{t('challenge')}</h2>
                      <p className="body-base text-muted-foreground">{project.challenge}</p>
                    </div>
                    <div className="space-y-3">
                      <h2 className="button-cap text-foreground">{t('solution')}</h2>
                      <p className="body-base text-muted-foreground">{project.solution}</p>
                    </div>
                    <div className="space-y-3">
                      <h2 className="button-cap text-foreground">{t('impact')}</h2>
                      <p className="body-base text-muted-foreground">{project.impact}</p>
                    </div>
                    <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
                      <Button variant="outline" className="rounded-full" nativeButton={false} render={<a href={project.sourceUrl} target="_blank" rel="noopener noreferrer" />}>
                        <Github size={16} />
                        {t('sourceCode')}
                      </Button>
                      {project.demoUrl && (
                        <Button className="rounded-full" nativeButton={false} render={<a href={project.demoUrl} target="_blank" rel="noopener noreferrer" />}>
                          <ExternalLink size={16} />
                          {t('liveDemo')}
                        </Button>
                      )}
                    </div>
                  </div>
                </section>

                {/* Architecture */}
                {project.architecture && (
                  <section
                    id="architecture"
                    ref={(el) => { sectionRefs.current["architecture"] = el; }}
                  >
                    <ArchitectureSection architecture={project.architecture} accent={project.accent} />
                  </section>
                )}

                {/* AI Pipeline */}
                {project.aiPipeline && (
                  <section
                    id="aiPipeline"
                    ref={(el) => { sectionRefs.current["aiPipeline"] = el; }}
                  >
                    <AIPipelineSection aiPipeline={project.aiPipeline} accent={project.accent} />
                  </section>
                )}

                {/* Technical */}
                {project.codeSnippets && project.architecture && (
                  <section
                    id="technical"
                    ref={(el) => { sectionRefs.current["technical"] = el; }}
                  >
                    <TechnicalSection
                      endpoints={project.architecture.endpoints}
                      codeSnippets={project.codeSnippets}
                      accent={project.accent}
                    />
                  </section>
                )}

                {/* Screenshots */}
                <section
                  id="screenshots"
                  ref={(el) => { sectionRefs.current["screenshots"] = el; }}
                >
                  <h2 className="button-cap text-foreground mb-4">{t('screenshots')}</h2>
                  {allScreenshots.length === 0 ? (
                    <p className="body-base text-muted-foreground text-center py-12">{t('noScreenshots')}</p>
                  ) : (
                    <>
                      <div
                        ref={containerRef}
                        onScroll={handleScroll}
                        className="flex gap-3 overflow-x-auto snap-x snap-mandatory scroll-smooth hide-scrollbar
                                   md:grid md:grid-cols-2 md:overflow-visible md:snap-none md:gap-4"
                      >
                        {allScreenshots.map((ss, i) => (
                          <div
                            key={ss.label}
                            className="snap-start shrink-0 w-[85vw] md:w-auto
                                       rounded-[14px] overflow-hidden border border-border
                                       bg-canvas-card hover:shadow-md transition-shadow duration-300"
                          >
                            <Image
                              src={ss.src}
                              alt={ss.label}
                              width={400}
                              height={isMobileApp ? 711 : 280}
                              className="w-full h-auto block"
                              loading={i < 2 ? "eager" : "lazy"}
                              sizes="(max-width: 768px) 85vw, (max-width: 1024px) 50vw, 400px"
                            />
                          </div>
                        ))}
                      </div>

                      {allScreenshots.length > 1 && (
                        <div className="flex items-center justify-center gap-4 mt-5 md:hidden">
                          <Button
                            onClick={() => scrollTo(Math.max(0, activeIndex - 1))}
                            disabled={activeIndex === 0}
                            variant="outline"
                            size="icon-sm"
                            className="rounded-full"
                          >
                            <ChevronLeft size={16} />
                          </Button>
                          <div className="flex gap-1.5">
                            {allScreenshots.map((_, i) => (
                              <button
                                key={i}
                                onClick={() => scrollTo(i)}
                                aria-label={`Go to screenshot ${i + 1}`}
                                aria-current={i === activeIndex ? "true" : undefined}
                                className={`w-2 h-2 rounded-full transition-colors cursor-pointer ${
                                  i === activeIndex
                                    ? "bg-foreground w-4"
                                    : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
                                }`}
                              />
                            ))}
                          </div>
                          <Button
                            onClick={() => scrollTo(Math.min(allScreenshots.length - 1, activeIndex + 1))}
                            disabled={activeIndex === allScreenshots.length - 1}
                            variant="outline"
                            size="icon-sm"
                            className="rounded-full"
                          >
                            <ChevronRight size={16} />
                          </Button>
                        </div>
                      )}
                    </>
                  )}
                </section>
              </div>
            </>
          ) : (
            /* Fallback: simple tabs for projects without detailed data */
            <div className="space-y-6">
              <div className="space-y-6">
                <div className="space-y-3">
                  <h2 className="button-cap text-foreground">{t('challenge')}</h2>
                  <p className="body-base text-muted-foreground">{project.challenge}</p>
                </div>
                <div className="space-y-3">
                  <h2 className="button-cap text-foreground">{t('solution')}</h2>
                  <p className="body-base text-muted-foreground">{project.solution}</p>
                </div>
                <div className="space-y-3">
                  <h2 className="button-cap text-foreground">{t('impact')}</h2>
                  <p className="body-base text-muted-foreground">{project.impact}</p>
                </div>
                <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
                  <Button variant="outline" className="rounded-full" nativeButton={false} render={<a href={project.sourceUrl} target="_blank" rel="noopener noreferrer" />}>
                    <Github size={16} />
                    {t('sourceCode')}
                  </Button>
                  {project.demoUrl && (
                    <Button className="rounded-full" nativeButton={false} render={<a href={project.demoUrl} target="_blank" rel="noopener noreferrer" />}>
                      <ExternalLink size={16} />
                      {t('liveDemo')}
                    </Button>
                  )}
                </div>
              </div>

              {/* Tech Stack */}
              <div className="space-y-4">
                <h2 className="button-cap text-foreground">{t('techStack')}</h2>
                <div className="divide-y divide-border rounded-[14px] border border-border overflow-hidden">
                  {project.stack.map((tech) => (
                    <div key={tech} className="px-4 py-3 md:px-5 md:py-3.5 flex items-baseline gap-3">
                      <span className="body-base font-bold text-foreground shrink-0">{tech}</span>
                      {techDescriptions[tech] && (
                        <span className="body-small text-muted-foreground">{techDescriptions[tech]}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Screenshots */}
              {allScreenshots.length > 0 && (
                <div className="space-y-4">
                  <h2 className="button-cap text-foreground">{t('screenshots')}</h2>
                  <div
                    ref={containerRef}
                    onScroll={handleScroll}
                    className="flex gap-3 overflow-x-auto snap-x snap-mandatory scroll-smooth hide-scrollbar
                               md:grid md:grid-cols-2 md:overflow-visible md:snap-none md:gap-4"
                  >
                    {allScreenshots.map((ss, i) => (
                      <div
                        key={ss.label}
                        className="snap-start shrink-0 w-[85vw] md:w-auto
                                   rounded-[14px] overflow-hidden border border-border
                                   bg-canvas-card hover:shadow-md transition-shadow duration-300"
                      >
                        <Image
                          src={ss.src}
                          alt={ss.label}
                          width={400}
                          height={isMobileApp ? 711 : 280}
                          className="w-full h-auto block"
                          loading={i < 2 ? "eager" : "lazy"}
                          sizes="(max-width: 768px) 85vw, (max-width: 1024px) 50vw, 400px"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify compilation**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Verify dev server**

Run: `npm run dev`
Expected: Page loads at `/projects/contract-chill` with new sections

- [ ] **Step 4: Commit**

```bash
git add src/app/components/ProjectDetail.tsx
git commit -m "feat: refactor ProjectDetail with modular sections, sticky nav, and enhanced content"
```

---

## Task 7: Final Verification

- [ ] **Step 1: Run type check**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 2: Run dev server and test**

Run: `npm run dev`
Test:
1. Visit `/projects/contract-chill` — verify all 5 sections render
2. Click each nav tab — verify smooth scroll
3. Verify metric cards animate
4. Verify architecture accordion expands
5. Verify persona cards expand with examples
6. Verify code snippets have copy button
7. Verify screenshots gallery still works
8. Visit another project (e.g., `/projects/assetra`) — verify fallback tabs still work
9. Test mobile responsive — nav should scroll horizontally

- [ ] **Step 3: Run linter**

Run: `npm run lint`
Expected: No errors

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "feat: complete Contract Chill project detail upgrade for magang application"
```
