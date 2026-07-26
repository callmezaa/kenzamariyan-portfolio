export type ProjectType = "mobile" | "dashboard" | "company" | "ai" | "fullstack" | "messaging" | "marketplace" | "pos" | "finance" | "chat" | "interviewos" | "playground";

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

export const projectsEn: Project[] = [
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
  },
  {
    slug: "interviewos",
    title: "InterviewOS — AI-Powered Interview Platform",
    summary:
      "A production-grade realtime technical interview platform combining WebRTC video calls, synchronized code editing, screen recording, and Whisper-powered speech-to-text transcription into a single operating system for hiring.",
    challenge:
      "Technical interviews are fragmented across Zoom, CoderPad, Loom, and manual evaluation sheets — creating friction, context-switching, and inconsistent candidate experiences for engineering teams.",
    solution:
      "Architected a full-stack monorepo with Next.js 16 + NestJS 11 featuring P2P WebRTC video with Socket.io signaling, synchronized Monaco Editor with keystroke broadcast, MediaRecorder screen recording, and an OpenAI Whisper transcription pipeline — all wrapped in an Apple-inspired dark design system with JWT/OAuth authentication.",
    impact:
      "Delivered a comprehensive platform integrating WebRTC, collaborative editing, Whisper AI transcription, screen recording, live audio waveforms, and room management — demonstrating deep full-stack systems architecture across 51 commits with Sentry monitoring, PostHog analytics, and Playwright E2E tests.",
    stack: ["Next.js 16", "React 19", "NestJS 11", "TypeScript", "WebRTC", "Socket.io", "Monaco Editor", "OpenAI Whisper", "Prisma", "PostgreSQL", "Docker", "Tailwind CSS"],
    role: "Full-Stack Developer & Systems Architect",
    year: "2026",
    sourceUrl: "https://github.com/callmezaa/InterviewOS",
    demoUrl: "https://interviewos-dev.vercel.app",
    type: "interviewos",
    featured: true,
    badge: "Open Source",
    metrics: ["WebRTC Video Calls", "Collaborative Code Editor", "Whisper Transcription", "Screen Recording"],
    accent: {
      glow: "rgba(0, 102, 204, 0.14)",
      color: "#0066cc",
    },
  },
  {
    slug: "assetra",
    title: "Assetra — Digital Asset Marketplace",
    summary:
      "A modern digital asset marketplace built with Next.js 16 where creators can buy, sell, and discover premium UI kits, templates, icons, and digital resources.",
    challenge:
      "Creators lacked a dedicated platform to monetize digital assets with secure file delivery, integrated payments, and real-time buyer-seller communication.",
    solution:
      "Built a full-featured marketplace with Next.js 16 App Router, Supabase (PostgreSQL + RLS) for auth & data, Midtrans payment gateway integration, real-time chat between buyers and sellers, and secure file downloads via Supabase Signed URLs.",
    impact:
      "Delivered a production-grade marketplace featuring server-side filtering, creator wallets with earnings analytics, dark/light mode, JSON-LD structured data for SEO, and skeleton loading states.",
    stack: ["Next.js 16", "TypeScript", "Supabase", "PostgreSQL", "Midtrans", "Resend", "Tailwind CSS"],
    role: "Full-Stack Developer",
    year: "2026",
    sourceUrl: "https://github.com/callmezaa/assetra-digital-product",
    demoUrl: "https://assetra-digital-product.vercel.app",
    type: "marketplace",
    featured: true,
    metrics: ["Midtrans Payments", "Real-time Chat", "Creator Wallet", "Supabase RLS"],
    accent: {
      glow: "rgba(168, 85, 247, 0.14)",
      color: "#a855f7",
    },
  },
  {
    slug: "gotani-pos",
    title: "Gotani Mobile POS Application",
    summary:
      "A high-performance React Native point-of-sale and supply-chain workflow app designed for offline-first agricultural ledger operations in remote farming areas.",
    challenge:
      "Cooperative operators in remote farming areas lacked desktop connections and required a robust transaction tool capable of recording POS ledger logs offline without internet connectivity.",
    solution:
      "Built a robust local state cache synced with Firestore, integrated transactional state machines with offline queue, and designed responsive transaction grids optimized for low-end mobile devices.",
    impact:
      "Eliminated manual paper bookkeeping, reducing data reconciliation errors by 90% and accelerating transaction entries to under 5 seconds per operation.",
    stack: ["React Native", "Expo", "Firebase", "Firestore", "AsyncStorage"],
    role: "Mobile & Backend Developer",
    year: "2024",
    sourceUrl: "https://github.com/callmezaa/gotani-POS-application",
    type: "pos",
    featured: true,
    badge: "Enterprise App",
    metrics: ["90% Error Reduction", "Offline Transaction Sync", "5s Entry Time"],
    accent: {
      glow: "rgba(16, 185, 129, 0.14)",
      color: "#10b981",
    },
  },
  {
    slug: "mercato",
    title: "Mercato — E-Commerce Boutique",
    summary:
      "A flagship mobile e-commerce platform built with React Native, featuring a cinematic onboarding flow, boutique wishlist, skeleton shimmer loaders, and a beautifully rendered digital e-receipt system.",
    challenge:
      "Mobile e-commerce apps often feel generic and transactional — lacking the premium, boutique experience that modern consumers expect, with jarring native spinners and uninspired navigation flows.",
    solution:
      "Architected a full-stack mobile e-commerce app with React Native and Expo for the frontend, Express.js and PostgreSQL for the backend, and Prisma ORM for data modeling. Delivered zero-scroll cinematic onboarding, a 2-column boutique wishlist grid, breathing skeleton shimmer loaders, and a perforated ticket-style digital e-receipt — all wrapped in JWT-secured authentication.",
    impact:
      "Created a production-ready e-commerce platform with seamless onboarding-to-checkout flows, dynamic parallax transitions, safe-area-aware navigation, and a perceived-performance-first approach that eliminated all native loading spinners.",
    stack: ["React Native", "Expo", "Node.js", "Express", "PostgreSQL", "Prisma", "JWT", "Reanimated"],
    role: "Full-Stack Mobile Developer",
    year: "2026",
    sourceUrl: "https://github.com/callmezaa/mercato-ecommerceApp",
    type: "mobile",
    featured: true,
    badge: "Mobile App",
    metrics: ["React Native", "Express API", "PostgreSQL", "Prisma ORM"],
    accent: {
      glow: "rgba(239, 68, 68, 0.14)",
      color: "#ef4444",
    },
  },
  {
    slug: "monetra",
    title: "Monetra — Personal Finance Tracker",
    summary:
      "A full-stack personal finance tracker with a Go (Gin) backend and React frontend, featuring budget tracking, financial goals, transaction management, and AI-powered spending insights.",
    challenge:
      "Existing finance tracking apps were either too complex for casual users or lacked the depth needed for meaningful budget analysis and goal tracking.",
    solution:
      "Architected a clean REST API in Go with Gin framework and PostgreSQL, paired with a React/Vite dashboard featuring Recharts visualizations, budget alerts, recurring transaction automation, and AI-generated spending insights.",
    impact:
      "Created a production-ready finance platform with JWT authentication, CSV reporting, dark mode, and comprehensive budget/goal tracking — demonstrating full-stack capability across Go and React.",
    stack: ["Go", "Gin", "PostgreSQL", "React", "Vite", "Tailwind CSS", "Recharts"],
    role: "Full-Stack Developer",
    year: "2026",
    sourceUrl: "https://github.com/callmezaa/monetra-financetrackerApp",
    demoUrl: "https://monetra-financetracker-app.vercel.app/",
    type: "finance",
    featured: true,
    metrics: ["Go + React Full Stack", "AI Spending Insights", "JWT Auth", "Recurring Transactions"],
    accent: {
      glow: "rgba(251, 146, 60, 0.14)",
      color: "#fb923c",
    },
  },
  {
    slug: "pallete-studio",
    title: "Palette Studio — Color Extraction Toolkit",
    summary:
      "A premium color toolkit that extracts dominant colors from any image, generates harmonies, checks WCAG contrast, visualizes palettes in 3D, and exports to CSS/Tailwind/JSON — all in a dark-first glassmorphic UI.",
    challenge:
      "Designers and developers lacked a single, beautiful tool that could extract a palette from an image, analyze its accessibility, visualize relationships, and export production-ready design tokens — without relying on multiple disjointed utilities.",
    solution:
      "Built a comprehensive color toolkit with custom median-cut quantization for extraction, a relationship map showing complementary/analogous/triadic harmonies, a Three.js 3D DNA helix visualization, a gradient physics playground, and a live UI preview system — all powered by Zustand state management and GSAP animations.",
    impact:
      "Delivered a fully self-contained color ecosystem with 15+ features including mood detection, pairwise WCAG contrast analysis, palette history with shareable links, and multi-format export (CSS variables, Tailwind config, JSON, SCSS, design tokens, PNG strip).",
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "Three.js", "GSAP", "Zustand"],
    role: "Full-Stack Developer & UI Engineer",
    year: "2026",
    sourceUrl: "https://github.com/callmezaa/Pallete-studio",
    demoUrl: "https://pallete-studio-ten.vercel.app",
    type: "playground",
    featured: true,
    badge: "Playground",
    metrics: ["Color Extraction", "WCAG Contrast", "3D DNA Helix", "Export CSS/JSON"],
    accent: {
      glow: "rgba(236, 72, 153, 0.14)",
      color: "#ec4899",
    },
  },
  {
    slug: "nextalk",
    title: "NexTalk — Real-Time Messaging App",
    summary:
      "A sophisticated real-time messaging ecosystem with a Go/Fiber backend, Redis caching, and a premium React Native frontend featuring glassmorphism design and AI-powered chat assistant.",
    challenge:
      "Modern messaging apps often compromise between beautiful UI and real-time performance, leaving users with either clunky interfaces or unreliable message delivery.",
    solution:
      "Engineered a high-performance messaging platform using Go (Fiber) with Gorilla WebSocket for real-time communication, Redis for state management, PostgreSQL with GORM for data persistence, and a React Native frontend with indigo-themed glassmorphic UI and Reanimated animations.",
    impact:
      "Delivered a full-featured messaging app with real-time chat, group conversations, AI assistant (NexBot), story/sharing features, call history, and Cloudinary media uploads — all running on a scalable Go backend.",
    stack: ["Go", "Fiber", "Gorilla WebSocket", "React Native", "Expo", "PostgreSQL", "Redis", "Cloudinary"],
    role: "Full-Stack Developer & Backend Engineer",
    year: "2026",
    sourceUrl: "https://github.com/callmezaa/nextalk-messagingApp",
    type: "chat",
    featured: true,
    metrics: ["Real-time WebSocket", "Go + Fiber Backend", "Redis Caching", "AI Chat Assistant"],
    accent: {
      glow: "rgba(59, 130, 246, 0.14)",
      color: "#3b82f6",
    },
  },
];
