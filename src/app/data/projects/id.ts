import type { Project } from "./en";

export const projectsId: Project[] = [
  {
    slug: "contract-chill",
    title: "ContractChill — Analisis Kontrak AI",
    summary:
      "Penganalisis dokumen hukum bertenaga AI yang mendeteksi red flag, menerjemahkan bahasa hukum ke bahasa awam, dan menyusun skrip negosiasi — dibuat untuk freelancer dan pemilik usaha kecil.",
    challenge:
      "Freelancer dan pemilik usaha kecil sering menandatangani kontrak yang mengandung klausul tidak adil, tanggung jawab tak terbatas, dan jebakan kekayaan intelektual karena mereka tidak memiliki keahlian hukum atau anggaran untuk berkonsultasi dengan pengacara untuk setiap perjanjian.",
    solution:
      "Membangun aplikasi full-stack menggunakan Google Gemini AI untuk memindai kontrak PDF/DOCX, mengidentifikasi klausul berisiko tinggi, menghasilkan skor risiko, menyediakan chat interaktif dengan 4 persona AI berbeda (Teman Santai, Pengacara Galak, Mentor Korporat, Senior Freelancer), dan menyusun draf skrip negosiasi secara otomatis.",
    impact:
      "Memproses kontrak di bawah 15 detik dengan 4 persona AI, di-deploy di Google Cloud Run dengan Docker, dilengkapi Firebase Auth, penyimpanan Firestore, dan sistem ekspor laporan PDF premium.",
    stack: ["React", "TypeScript", "Node.js", "Express", "Google Gemini AI", "Firebase", "Docker", "Google Cloud Run"],
    role: "Pengembang Full-Stack & Insinyur AI",
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
    diagram: {
      frontend: { label: "FRONTEND (React SPA)", tech: "React 19 · Vite 8 · TanStack Query · Firebase Web SDK · i18next · PWA" },
      backend: { label: "BACKEND (Express 5 API)", tech: "Multer · Rate Limiting · Helmet/CORS · Firebase Admin · Zod Validation" },
      arrow: { label: "axios + Firebase ID Token" },
      services: [
        { name: "Gemini AI API", description: "gemini-2.5-flash · Structured JSON · Persona prompts" },
        { name: "Firestore", description: "analyses/{docId} · userId, fileName, persona, result, fileUrl" },
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
    title: "InterviewOS — Platform Wawancara Bertenaga AI",
    summary:
      "Platform wawancara teknis real-time kelas produksi yang menggabungkan panggilan video WebRTC, pengeditan kode tersinkronisasi, perekaman layar, dan transkripsi suara-ke-teks bertenaga Whisper ke dalam satu sistem operasi untuk perekrutan.",
    challenge:
      "Wawancara teknis terfragmentasi di berbagai platform seperti Zoom, CoderPad, Loom, dan lembar evaluasi manual — menciptakan gesekan, perpindahan konteks, dan pengalaman kandidat yang tidak konsisten bagi tim engineering.",
    solution:
      "Mengarsitektur monorepo full-stack dengan Next.js 16 + NestJS 11 yang menampilkan video WebRTC P2P dengan sinyal Socket.io, Monaco Editor tersinkronisasi dengan siaran ketukan tombol, perekaman layar MediaRecorder, dan pipeline transkripsi OpenAI Whisper — semuanya dibungkus dalam sistem desain gelap terinspirasi Apple dengan autentikasi JWT/OAuth.",
    impact:
      "Menghadirkan platform komprehensif yang mengintegrasikan WebRTC, pengeditan kolaboratif, transkripsi Whisper AI, perekaman layar, gelombang audio langsung, dan manajemen ruangan — mendemonstrasikan arsitektur sistem full-stack yang mendalam dengan 51 komit, pemantauan Sentry, analitik PostHog, dan pengujian E2E Playwright.",
    stack: ["Next.js 16", "React 19", "NestJS 11", "TypeScript", "WebRTC", "Socket.io", "Monaco Editor", "OpenAI Whisper", "Prisma", "PostgreSQL", "Docker", "Tailwind CSS"],
    role: "Pengembang Full-Stack & Arsitek Sistem",
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
    title: "Assetra — Pasar Aset Digital",
    summary:
      "Pasar aset digital modern yang dibangun dengan Next.js 16 di mana kreator dapat membeli, menjual, dan menemukan kit UI premium, template, ikon, dan sumber daya digital.",
    challenge:
      "Kreator tidak memiliki platform khusus untuk memonetisasi aset digital dengan pengiriman file yang aman, pembayaran terintegrasi, dan komunikasi pembeli-penjual secara real-time.",
    solution:
      "Membangun marketplace lengkap dengan Next.js 16 App Router, Supabase (PostgreSQL + RLS) untuk autentikasi & data, integrasi gateway pembayaran Midtrans, chat real-time antara pembeli dan penjual, serta unduhan file aman melalui Supabase Signed URLs.",
    impact:
      "Menghadirkan marketplace kelas produksi dengan fitur server-side filtering, dompet kreator dengan analitik pendapatan, mode gelap/terang, data terstruktur JSON-LD untuk SEO, dan state loading skeleton.",
    stack: ["Next.js 16", "TypeScript", "Supabase", "PostgreSQL", "Midtrans", "Resend", "Tailwind CSS"],
    role: "Pengembang Full-Stack",
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
    title: "Aplikasi POS Mobile Gotani",
    summary:
      "Aplikasi point-of-sale dan alur kerja rantai pasok React Native berperforma tinggi yang dirancang untuk operasi pembukuan pertanian offline-first di daerah pedesaan terpencil.",
    challenge:
      "Operator koperasi di daerah pertanian terpencil tidak memiliki koneksi desktop dan membutuhkan alat transaksi yang mampu mencatat log POS secara offline tanpa koneksi internet.",
    solution:
      "Membangun cache state lokal yang tersinkronisasi dengan Firestore, mengintegrasikan state machine transaksional dengan antrean offline, dan merancang grid transaksi responsif yang dioptimalkan untuk perangkat mobile kelas bawah.",
    impact:
      "Menghilangkan pembukuan kertas manual, mengurangi kesalahan rekonsiliasi data hingga 90% dan mempercepat entri transaksi hingga di bawah 5 detik per operasi.",
    stack: ["React Native", "Expo", "Firebase", "Firestore", "AsyncStorage"],
    role: "Pengembang Mobile & Backend",
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
    title: "Mercato — Butik E-Commerce",
    summary:
      "Platform e-commerce mobile unggulan yang dibangun dengan React Native, menampilkan alur on-boarding sinematik, wishlist butik, skeleton shimmer loader, dan sistem e-receipt digital yang dirender dengan indah.",
    challenge:
      "Aplikasi e-commerce mobile sering terasa generik dan transaksional — tanpa pengalaman butik premium yang diharapkan konsumen modern, dengan spinner native yang mengganggu dan alur navigasi yang tidak inspiratif.",
    solution:
      "Mengarsitektur aplikasi e-commerce mobile full-stack dengan React Native dan Expo untuk frontend, Express.js dan PostgreSQL untuk backend, dan Prisma ORM untuk pemodelan data. Menghadirkan on-boarding sinematik tanpa scroll, grid wishlist butik 2 kolom, breathing shimmer skeleton loader, dan e-receipt digital bergaya tiket berlubang — semua dibungkus dengan autentikasi JWT.",
    impact:
      "Menciptakan platform e-commerce siap produksi dengan alur on-boarding hingga checkout yang mulus, transisi paralaks dinamis, navigasi sadar safe-area, dan pendekatan perceived-performance-first yang menghilangkan semua spinner loading native.",
    stack: ["React Native", "Expo", "Node.js", "Express", "PostgreSQL", "Prisma", "JWT", "Reanimated"],
    role: "Pengembang Mobile Full-Stack",
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
    title: "Monetra — Pelacak Keuangan Pribadi",
    summary:
      "Pelacak keuangan pribadi full-stack dengan backend Go (Gin) dan frontend React, menampilkan pelacakan anggaran, tujuan keuangan, manajemen transaksi, dan wawasan pengeluaran bertenaga AI.",
    challenge:
      "Aplikasi pelacak keuangan yang ada terlalu rumit untuk pengguna biasa atau tidak memiliki kedalaman yang dibutuhkan untuk analisis anggaran dan pelacakan tujuan yang bermakna.",
    solution:
      "Mengarsitektur REST API yang bersih di Go dengan framework Gin dan PostgreSQL, dipasangkan dengan dashboard React/Vite yang menampilkan visualisasi Recharts, peringatan anggaran, otomatisasi transaksi berulang, dan wawasan pengeluaran yang dihasilkan AI.",
    impact:
      "Menciptakan platform keuangan siap produksi dengan autentikasi JWT, pelaporan CSV, mode gelap, dan pelacakan anggaran/tujuan yang komprehensif — mendemonstrasikan kemampuan full-stack di Go dan React.",
    stack: ["Go", "Gin", "PostgreSQL", "React", "Vite", "Tailwind CSS", "Recharts"],
    role: "Pengembang Full-Stack",
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
    title: "Palette Studio — Toolkit Ekstraksi Warna",
    summary:
      "Toolkit warna premium yang mengekstrak warna dominan dari gambar apa pun, menghasilkan harmoni, memeriksa kontras WCAG, memvisualisasikan palet dalam 3D, dan mengekspor ke CSS/Tailwind/JSON — semuanya dalam UI glassmorphic gelap.",
    challenge:
      "Desainer dan pengembang kekurangan satu alat yang indah yang dapat mengekstrak palet dari gambar, menganalisis aksesibilitasnya, memvisualisasikan relasi, dan mengekspor token desain siap produksi — tanpa bergantung pada beberapa utilitas yang terpisah.",
    solution:
      "Membangun toolkit warna komprehensif dengan kuantisasi median-cut kustom untuk ekstraksi, peta relasi yang menampilkan harmoni komplementer/analog/triadik, visualisasi heliks DNA 3D dengan Three.js, taman bermain fisika gradien, dan sistem pratinjau UI langsung — semuanya didukung oleh manajemen state Zustand dan animasi GSAP.",
    impact:
      "Menghadirkan ekosistem warna mandiri dengan 15+ fitur termasuk deteksi suasana, analisis kontras WCAG berpasangan, riwayat palet dengan tautan yang dapat dibagikan, dan ekspor multi-format (variabel CSS, konfigurasi Tailwind, JSON, SCSS, token desain, strip PNG).",
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "Three.js", "GSAP", "Zustand"],
    role: "Pengembang Full-Stack & Insinyur UI",
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
    title: "NexTalk — Aplikasi Pesan Real-Time",
    summary:
      "Ekosistem pesan real-time yang canggih dengan backend Go/Fiber, caching Redis, dan frontend React Native premium dengan desain glassmorphism dan asisten chat AI.",
    challenge:
      "Aplikasi pesan modern sering berkompromi antara UI yang indah dan kinerja real-time, membuat pengguna mendapatkan antarmuka yang kikuk atau pengiriman pesan yang tidak dapat diandalkan.",
    solution:
      "Merekayasa platform pesan berperforma tinggi menggunakan Go (Fiber) dengan Gorilla WebSocket untuk komunikasi real-time, Redis untuk manajemen state, PostgreSQL dengan GORM untuk persistensi data, dan frontend React Native dengan UI glassmorphic bertema nila dan animasi Reanimated.",
    impact:
      "Menghadirkan aplikasi pesan lengkap dengan chat real-time, percakapan grup, asisten AI (NexBot), fitur cerita/berbagi, riwayat panggilan, dan unggahan media Cloudinary — semuanya berjalan di backend Go yang skalabel.",
    stack: ["Go", "Fiber", "Gorilla WebSocket", "React Native", "Expo", "PostgreSQL", "Redis", "Cloudinary"],
    role: "Pengembang Full-Stack & Insinyur Backend",
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
