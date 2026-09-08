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
  client?: string;
  category?: string;
  timeline?: string;
  features?: { title: string; description: string; screenshot: string; screenshotLabel: string }[];
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
  diagram?: {
    frontend: { label: string; tech: string };
    backend: { label: string; tech: string };
    arrow: { label?: string };
    services: { name: string; description: string }[];
  };
  aiPipeline?: {
    personas: { name: string; tone: string; example: string; icon: string }[];
    riskFormula: { high: number; medium: number; cap: number };
    extractionFlow: { step: string; detail: string }[];
    outputSchema: { field: string; type: string; description: string }[];
  };
  codeSnippets?: { title: string; language: string; code: string; reason: string }[];
  siteMap?: {
    userRoles: { role: string; description: string; needs: string; icon: string }[];
    userFlow: { step: string; detail: string }[];
    siteArchitecture: { section: string; type: string; description: string }[];
  };
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
    role: "Full-Stack Developer",
    year: "2025",
    client: "Hackathon",
    category: "Web App",
    timeline: "2026",
    features: [
      {
        title: "Instant AI Analysis",
        description: "Upload a contract as PDF, DOCX, or TXT and get structured analysis in under 15 seconds — risk score, red flag detection, key clause breakdowns, and plain-language jargon translations.",
        screenshot: "/image/contract-chill/screenshot/analysizpage.png",
        screenshotLabel: "Analysis report",
      },
      {
        title: "4 AI Personas",
        description: "Chill Friend, Angry Lawyer, Corporate Mentor, and Freelancer Senior — four distinct tones explaining the same contract, from casual to fierce.",
        screenshot: "/image/contract-chill/screenshot/livedemopage.png",
        screenshotLabel: "Persona live demo",
      },
      {
        title: "Contract Generator",
        description: "Draft new contracts and negotiation scripts from scratch with customizable tones — Friendly, Assertive, or Tough.",
        screenshot: "/image/contract-chill/screenshot/contractgeneratorpage.png",
        screenshotLabel: "Contract generator",
      },
      {
        title: "Guided How-It-Works",
        description: "A step-by-step walkthrough that takes first-time users from upload to understanding their contract in minutes.",
        screenshot: "/image/contract-chill/screenshot/howitsworkpage.png",
        screenshotLabel: "How it works",
      },
      {
        title: "Analysis History",
        description: "Every analysis persists to Firestore — revisit past contracts, compare risk scores, and export premium PDF reports anytime.",
        screenshot: "/image/contract-chill/screenshot/historypage.png",
        screenshotLabel: "History",
      },
      {
        title: "Secure Authentication",
        description: "Firebase Auth with Google and email sign-in, rate-limited API, and per-user data isolation from day one.",
        screenshot: "/image/contract-chill/screenshot/loginpage.png",
        screenshotLabel: "Login",
      },
    ],
    sourceUrl: "https://github.com/callmezaa/contract-chill",
    demoUrl: "https://contract-chill-client.vercel.app",
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
    slug: "koperasi-kpjmi",
    title: "KPJMI — Company Profile Koperasi Petani",
    summary:
      "A premium editorial-style corporate website for Koperasi Petani Jaya Makmur Indonesia (KPJMI), a cooperative empowering local farmers in Banyumas through organic papaya cultivation and processed products.",
    challenge:
      "KPJMI, a farmer cooperative in Banyumas, Central Java, needed a modern digital presence that reflects their premium organic products and the dignity of their farmers. Existing cooperative websites are often outdated and fail to communicate the brand's premium positioning — making it hard to attract partners, buyers, and new members.",
    solution:
      "Built a React 19 + TypeScript SPA with Vite 8 and Tailwind CSS v4, featuring an editorial magazine-spread layout with full-bleed hero, organic image masks, floating glass quote cards, zigzag timeline for vision & mission, real product photography showcase (Papaya Candy, Chips, Soap), gallery lightbox with Embla Carousel, WhatsApp-integrated contact section, and live Google Maps embed — all wrapped in a premium Swiss-editorial design system.",
    impact:
      "Delivered a fully responsive, performant company profile that positions KPJMI as a modern, trustworthy cooperative brand. Features 10+ distinct sections, smooth scroll-aware animations via Motion, dark/transparent glass navbar, and a consistent editorial design language with brand red (#B81104) accent.",
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS"],
    role: "Frontend Developer & UI Designer",
    year: "2026",
    client: "KPJMI — Koperasi Petani Jaya Makmur",
    category: "Company Profile",
    timeline: "2026",
    features: [
      {
        title: "Editorial Magazine Layout",
        description: "Full-bleed hero, organic image masks, and floating glass quote cards in a premium Swiss-editorial design system.",
        screenshot: "/image/koperasi-kpjmi/homepage.png",
        screenshotLabel: "Homepage",
      },
      {
        title: "Vision & Mission Timeline",
        description: "Zigzag mission cards with staggered scroll animations and a commitment banner over imagery.",
        screenshot: "/image/koperasi-kpjmi/visidanmisi.png",
        screenshotLabel: "Vision and mission",
      },
      {
        title: "Product Showcase",
        description: "Real photography for Papaya Candy, Chips, and Soap with category badges and WhatsApp inquiry CTAs.",
        screenshot: "/image/koperasi-kpjmi/product.png",
        screenshotLabel: "Products",
      },
      {
        title: "Gallery Lightbox",
        description: "Filterable photo grid with Embla-powered lightbox, autoplay, and drag-to-dismiss overlay.",
        screenshot: "/image/koperasi-kpjmi/gallery.png",
        screenshotLabel: "Gallery",
      },
      {
        title: "Contact & Location",
        description: "WhatsApp-integrated contact section with live Google Maps embed for the Banyumas office.",
        screenshot: "/image/koperasi-kpjmi/contact.png",
        screenshotLabel: "Contact",
      },
    ],
    sourceUrl: "https://github.com/callmezaa/koperasi-KPJMI",
    demoUrl: "https://koperasi-kpjmi.vercel.app",
    type: "company",
    featured: true,
    metrics: ["React 19 + Vite 8", "Tailwind CSS v4", "Editorial Design", "Embla Lightbox"],
    accent: {
      glow: "rgba(184, 17, 4, 0.14)",
      color: "#B81104",
    },
    architecture: {
      monorepo: [
        { name: "src/components/", tech: "React 19 + Motion", description: "6 layout components (Navbar, Footer, Container, BackToTop, ScrollProgress, SectionDivider) and 10 section components (Hero, About, VisionMission, BusinessUnits, Products, Gallery, Testimonials, FAQ, Contact, SectionHeader)" },
        { name: "src/data/", tech: "TypeScript modules", description: "12 static data modules (navigation, company, businessUnits, products, gallery, testimonials, faq, contact, statistics, values, timeline, partners, certifications)" },
        { name: "src/hooks/", tech: "TypeScript", description: "Custom hooks including useCounter — IntersectionObserver-triggered animated counter for statistics" },
        { name: "src/utils/", tech: "TypeScript", description: "cn() utility combining clsx + tailwind-merge for conflict-free class composition" },
      ],
      decisions: [
        { decision: "Vite 8 over Next.js", reason: "Static company profile doesn't need SSR/SSG — Vite's instant HMR and simpler build pipeline is faster to iterate on with zero server cost" },
        { decision: "React 19 + Motion over vanilla JS", reason: "Component architecture with declarative scroll-driven animations (useScroll, useTransform, whileInView) for the editorial experience" },
        { decision: "Tailwind CSS v4 with @theme", reason: "Custom design tokens (brand-red, brand-lemon, Satoshi/Outfit fonts) in a single config — no CSS preprocessor needed" },
        { decision: "Embla Carousel over Swiper", reason: "Lightweight (12KB), framework-agnostic, full control over autoplay and custom progress bar animation" },
        { decision: "Sharp build-time WebP conversion", reason: "Pre-converted WebP via prebuild script — zero runtime overhead, all images served in modern format" },
        { decision: "Static data modules over CMS", reason: "No database or API — content lives in TypeScript files with full type safety, zero runtime latency, instant page loads" },
        { decision: "IntersectionObserver for nav tracking", reason: "Native browser API with multiple thresholds (0, 0.25, 0.5, 0.75) and rootMargin for accurate active section detection" },
      ],
      endpoints: [
        { method: "GET", path: "/", auth: false, rate: "N/A", purpose: "Serve static SPA entry point — all content bundled at build time" },
        { method: "N/A", path: "src/data/*.ts", auth: false, rate: "N/A", purpose: "Static data modules imported at build time — zero runtime API dependencies" },
      ],
      dataFlow: [
        "User loads koperasi-kpjmi.vercel.app → Vite-built SPA serves index.html with bundled CSS/JS",
        "App.tsx composes Navbar + 9 sections + Footer in linear scroll layout",
        "Each section imports its data directly from src/data/*.ts at build time — no network requests",
        "ScrollProgress + Navbar use useScroll() for real-time scroll progress tracking",
        "Navbar IntersectionObserver highlights active section based on viewport visibility with multiple thresholds",
        "Gallery images loaded via Vite import.meta.glob — WebP preferred, PNG fallback via <picture>",
        "Testimonials Embla carousel autoplays with custom progress bar synced to autoplay timer",
        "Contact section renders Google Maps embed iframe + WhatsApp deep link for instant messaging",
        "All animations respect prefers-reduced-motion via Motion's useReducedMotion hook"
      ],
      deployment: [
        "npm run build → prebuild (Sharp WebP conversion) → tsc -b + vite build",
        "Static output in dist/ — no server-side runtime, no Node.js on production",
        "Deployed to Vercel via Git push — zero-config static hosting on edge network",
        "Vercel serves compressed dist/ with automatic HTTPS, HTTP/2, and global CDN caching"
      ],
    },
    diagram: {
      frontend: { label: "FRONTEND (React SPA)", tech: "React 19 · Vite 8 · TypeScript 6 · Motion · Tailwind CSS v4 · Embla Carousel" },
      backend: { label: "BACKEND", tech: "None — fully static site, all content in src/data/" },
      arrow: { label: "Build-time data import" },
      services: [
        { name: "Vercel Edge Network", description: "Static hosting · Global CDN · Zero-config · HTTPS · Auto-deploy from Git" },
        { name: "Embla Carousel", description: "12KB gzip · Autoplay · Responsive breakpoints · Touch-optimized dots + progress bar" },
        { name: "Google Maps Embed", description: "Static iframe embed for KPJMI office location in Banyumas" },
      ],
    },
    codeSnippets: [
      {
        title: "Parallax Hero — useScroll + useTransform",
        language: "typescript",
        code: `const { scrollYProgress } = useScroll({
  target: heroRef,
  offset: ["start start", "end start"],
});
const bgY = useTransform(scrollYProgress, [0, 1],
  prefersReducedMotion ? ["0%", "0%"] : ["0%", "30%"]);
const contentY = useTransform(scrollYProgress, [0, 1],
  prefersReducedMotion ? ["0%", "0%"] : ["0%", "12%"]);

return (
  <section ref={heroRef} className="relative flex min-h-screen overflow-hidden">
    <motion.div className="absolute inset-0 bg-cover bg-center"
      style={{ y: bgY }}>
      <picture>
        <source srcSet={heroBgWebp} type="image/webp" />
        <img src={heroBg} alt="" className="h-full w-full object-cover" />
      </picture>
    </motion.div>
    <motion.div style={{ y: contentY }} className="relative z-10">
      <h1>...</h1>
    </motion.div>
  </section>
);`,
        reason: "Scroll-driven parallax with Motion's useScroll + useTransform — background and content move at different rates for depth, with full reduced-motion respect"
      },
      {
        title: "Navbar Glass Transition + Active Section",
        language: "typescript",
        code: `function useActiveSection(ids: string[]) {
  const [activeId, setActiveId] = useState("");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      { threshold: [0, 0.25, 0.5, 0.75], rootMargin: "-80px 0px 0px 0px" }
    );
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);
  return activeId;
}

// In component:
<motion.header
  animate={{ y: hidden ? -80 : 0 }}
  className={cn(
    "fixed top-0 left-0 right-0 z-50 transition-colors duration-300",
    scrolled
      ? "bg-white/80 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.08)]"
      : "bg-transparent"
  )}
>`,
        reason: "Transparent-to-glass navbar with IntersectionObserver-based active section tracking — the rootMargin accounts for navbar height, multiple thresholds prevent jitter"
      },
      {
        title: "Embla Carousel — Autoplay Progress Bar",
        language: "typescript",
        code: `const [emblaRef, emblaApi] = useEmblaCarousel(
  { loop: true, align: "start" },
  [Autoplay({ delay: 4000, stopOnInteraction: false })]
);

// Animated progress bar synced to autoplay timer
const [progress, setProgress] = useState(0);
useEffect(() => {
  if (!emblaApi) return;
  const onTimer = setInterval(() => {
    setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
  }, 40); // 4000ms / 100 steps
  return () => clearInterval(onTimer);
}, [emblaApi]);

return (
  <div className="overflow-hidden" ref={emblaRef}>
    <div className="flex">
      {slides.map(slide => (
        <div className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.33%]">
          {slide}
        </div>
      ))}
    </div>
    <div className="mt-4 h-1 rounded-full bg-gray-200">
      <motion.div
        className="h-full rounded-full bg-brand-red"
        style={{ width: \`\${progress}%\` }}
      />
    </div>
  </div>
);`,
        reason: "Embla autoplay carousel with a custom animated progress bar — 4s autoplay divided into 100 steps (40ms each) for smooth visual progress tracking per slide"
      },
      {
        title: "Gallery Lightbox — AnimatePresence + Drag Dismiss",
        language: "typescript",
        code: `const images = Object.entries(
  import.meta.glob<{ default: string }>(
    "/src/assets/dokumentasi/*.png", { eager: true }
  )
);

// Animated grid with category filter
<AnimatePresence mode="popLayout">
  {filteredImages.map(([path, mod]) => (
    <motion.div
      key={path}
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => setLightbox(path)}
    >
      <ResponsiveImage src={mod.default} />
    </motion.div>
  ))}
</AnimatePresence>

// Lightbox overlay with drag to dismiss
<AnimatePresence>
  {lightbox && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
    >
      <motion.img
        drag="y"
        onDragEnd={(_, info) => {
          if (Math.abs(info.offset.y) > 150) setLightbox(null);
        }}
        dragConstraints={{ top: 0, bottom: 0 }}
      />
    </motion.div>
  )}
</AnimatePresence>`,
        reason: "Image gallery with Vite import.meta.glob for asset discovery, AnimatePresence popLayout for smooth filter transitions, and drag-to-dismiss lightbox overlay"
      },
    ],
    siteMap: {
      userRoles: [
        { role: "Farmers & Members", description: "Cooperative members selling organic produce", needs: "Looking to showcase their products, build trust with buyers, and attract new partnership opportunities through a professional brand presence.", icon: "👨‍🌾" },
        { role: "Wholesale Buyers", description: "Businesses sourcing organic papaya products", needs: "Need to verify product quality, understand the cooperative's production capacity, and easily reach out via WhatsApp or contact form.", icon: "🛒" },
        { role: "General Visitors", description: "Public interested in organic products and social impact", needs: "Want to learn about organic farming practices, the cooperative's story, and how to support local farmers in Banyumas.", icon: "👤" },
        { role: "Government & Partners", description: "Local government and institutional partners", needs: "Need transparent information about the cooperative's operations, certifications, and community impact for partnership evaluation.", icon: "🤝" },
      ],
      userFlow: [
        { step: "Parallax Hero Landing", detail: "Full-bleed hero with scroll-driven parallax, animated text reveal, and three CTAs: Jelajahi Profil, Hubungi Kami, and WhatsApp direct link" },
        { step: "About & Statistics", detail: "Magazine-spread editorial layout with organic image mask, floating glass quote card, and animated counter statistics triggered by IntersectionObserver" },
        { step: "Vision, Mission & Timeline", detail: "Centered glass vision card, zigzag timeline cards with staggered scroll animations, and commitment banner on image background" },
        { step: "Production & Business Units", detail: "Rich detail cards showing four business units with per-item breakdown — Users can understand the full product ecosystem at a glance" },
        { step: "Product Showcase", detail: "Real product photography for Papaya Candy, Chips, and Soap with category badges and WhatsApp CTA for inquiries" },
        { step: "Gallery with Lightbox", detail: "Documentation photos in a filterable grid (AnimatePresence popLayout), with drag-to-dismiss lightbox and pinch-to-zoom on mobile" },
        { step: "Testimonials Carousel", detail: "Embla autoplay carousel with animated progress bar, responsive breakpoints (1/2/3 slides), and dot navigation" },
        { step: "FAQ & Contact", detail: "Smooth accordion with AnimatePresence, live Google Maps embed, WhatsApp integration, and contact form for inquiries" },
      ],
      siteArchitecture: [
        { section: "Hero", type: "Full-bleed parallax", description: "Scroll-driven background/content parallax with ambient glow overlay, noise texture, and animated headline reveal" },
        { section: "About", type: "Editorial magazine-spread", description: "Organic image mask with clip-path, floating glass quote card, feature grid, animated statistics counter, story card" },
        { section: "Vision & Mission", type: "Zigzag timeline", description: "Centered glass vision card, alternating left/right mission cards with staggered fade-in, commitment banner on image background" },
        { section: "Business Units", type: "Detail cards", description: "Four business unit cards (Papaya Farming, Processing, Livestock, Trading) with icon, description, and per-unit breakdown" },
        { section: "Products", type: "Product catalog", description: "Three product cards (Opak, Candy, Soap) with real photography, category badges, and WhatsApp inquiry CTA" },
        { section: "Gallery", type: "Filterable grid + lightbox", description: "Vite import.meta.glob asset discovery, category filter tabs with AnimatePresence popLayout, drag-to-dismiss overlay" },
        { section: "Testimonials", type: "Embla carousel", description: "Autoplay with progress bar, 3 responsive breakpoints, dot navigation, previous/next buttons" },
        { section: "FAQ", type: "Accordion", description: "8 FAQ items with AnimatePresence smooth expand/collapse, brand-red accent on active items" },
        { section: "Contact", type: "Google Maps + WhatsApp", description: "Live Google Maps iframe embed, WhatsApp deep link, address/phone/email info, operating hours" },
        { section: "Footer", type: "Dark footer", description: "Brand logo, social media icons (SVG), navigation links, copyright with brand-red separator" },
      ],
    },
  },
  {
    slug: "interviewos",
    title: "InterviewOS — AI-Powered Interview Platform",
    summary:
      "A production-grade realtime technical interview platform combining P2P WebRTC video calls, synchronized code editing, collaborative whiteboards, screen recording, and live speech-to-text transcription into a single operating system for hiring.",
    challenge:
      "Technical interviews are fragmented across Zoom, CoderPad, Loom, and manual evaluation sheets — creating friction, context-switching, and inconsistent candidate experiences for engineering teams.",
    solution:
      "Architected a full-stack monorepo (Next.js 16 frontend + NestJS 11 backend + shared types) featuring P2P WebRTC video with Socket.io signaling guarded by JWT identity and database membership checks, a synchronized Monaco Editor with throttled revision history, a collaborative whiteboard, MediaRecorder capture with pluggable storage adapters, and a Gemini 2.5 Flash AI layer for live transcription, auto-generated coding challenges, and structured interview scoring — wrapped in an Apple-inspired dark design system with cookie-based auth, 2FA, OAuth, and per-route rate limiting.",
    impact:
      "Delivered a comprehensive platform integrating WebRTC, collaborative editing, live AI transcription, proctoring event logging, and a community question bank with votes and bookmarks — hardened with per-socket flood protection and ownership guards, and backed by Vitest/Jest unit suites, Playwright E2E tests, Sentry monitoring, and PostHog analytics.",
    stack: ["Next.js 16", "React 19", "NestJS 11", "TypeScript", "WebRTC", "Socket.io", "Monaco Editor", "Google Gemini AI", "Prisma", "PostgreSQL", "Redis", "Zustand"],
    role: "Full-Stack Developer & Systems Architect",
    year: "2026",
    client: "Self-initiated — Open Source",
    category: "Interview Platform",
    timeline: "2026",
    features: [
      {
        title: "Realtime Interview Room",
        description: "P2P WebRTC video grid with collaborative whiteboard, chat drawer, and live speaker waveforms in one workspace.",
        screenshot: "/image/interviewOS/interviewroom.png",
        screenshotLabel: "Interview room",
      },
      {
        title: "Synced Code Editing",
        description: "Monaco Editor synchronized across peers with throttled revision history and Wandbox code execution.",
        screenshot: "/image/interviewOS/featuressection.png",
        screenshotLabel: "Features",
      },
      {
        title: "Scheduling Dashboard",
        description: "Upcoming and past interviews, activity feed, and quick actions with Sentry-instrumented error boundaries.",
        screenshot: "/image/interviewOS/dashboardpage.png",
        screenshotLabel: "Dashboard",
      },
      {
        title: "Secure Authentication",
        description: "Cookie-based JWT auth with 2FA, OAuth providers, device sessions, and per-route rate limiting.",
        screenshot: "/image/interviewOS/loginpage.png",
        screenshotLabel: "Login",
      },
    ],
    sourceUrl: "https://github.com/callmezaa/InterviewOS",
    demoUrl: "https://interviewos-dev.vercel.app",
    type: "interviewos",
    featured: true,
    badge: "Open Source",
    metrics: ["P2P WebRTC Video", "Synced Code + Whiteboard", "Gemini Live Transcription", "JWT + 2FA Auth"],
    accent: {
      glow: "rgba(0, 102, 204, 0.14)",
      color: "#0066cc",
    },
    architecture: {
      monorepo: [
        { name: "apps/frontend/", tech: "Next.js 16 + React 19 + Zustand", description: "App Router UI with Monaco Editor, socket.io-client, custom hooks (useWebRTC, useInterviewRoom, useRecording, useFocusTrap), 7 Zustand stores, Shiki highlighting, and Sentry + PostHog instrumentation" },
        { name: "apps/backend/", tech: "NestJS 11 + Prisma + PostgreSQL", description: "REST API (/api/*) plus a Socket.io RealtimeGateway — Passport JWT auth with 2FA/OAuth, @nestjs/throttler rate limits, OwnershipGuard resource checks, and modular feature folders (auth, interview, realtime, media, ai, questions, integrations)" },
        { name: "apps/shared/", tech: "@interviewos/shared", description: "Shared TypeScript types and compiler/language maps consumed by both frontend and backend — e.g. COMPILER_MAP routing languages to Wandbox compiler ids" },
      ],
      decisions: [
        { decision: "Self-hosted Socket.io gateway over a hosted realtime SaaS", reason: "Full control of signaling, room authorization, and event schemas in one NestJS process — zero per-minute vendor cost for video minutes" },
        { decision: "Identity from the verified JWT, never the client payload", reason: "join-room cross-checks the claimed userId against the JWT sub and reads the role from the database — a forged payload can never impersonate another peer" },
        { decision: "Database membership gate before room admission", reason: "Participant lookup on the composite unique (userId, interviewId) ensures only scheduled candidates/interviewers ever receive room state or signals" },
        { decision: "Per-socket rate limiter (40 events/sec)", reason: "grantAccess() gates every write/broadcast handler — one lightweight sliding window doubles as flood protection and room-scoped authorization" },
        { decision: "Gemini 2.5 Flash multimodal for STT instead of a separate Whisper pipeline", reason: "Raw audio chunks go inline as base64 to the same model used for evaluation and question generation — one API key, one integration, mock fallback without a key" },
        { decision: "Throttled code-history checkpoints (5s interval, 500 cap)", reason: "Keystrokes persist instantly for crash recovery while revision snapshots stay bounded — a replayable timeline that cannot bloat the database" },
        { decision: "Redis pub/sub adapter behind an env flag", reason: "REDIS_URL switches Socket.io to the Redis adapter for multi-instance fan-out; omitted, it falls back to the in-memory adapter keeping local dev trivial" },
        { decision: "Storage factory (local/S3/GCS) for recordings", reason: "MediaRecorder blobs upload through a StorageFactory interface — deployment targets swap object storage without touching feature code" },
      ],
      endpoints: [
        { method: "POST", path: "/api/auth/register", auth: false, rate: "3/min", purpose: "Create account, issue httpOnly access + refresh cookies, record device session" },
        { method: "POST", path: "/api/auth/login", auth: false, rate: "5/min", purpose: "Login — returns a 2FA challenge token when two-factor is enabled" },
        { method: "POST", path: "/api/auth/refresh", auth: false, rate: "None", purpose: "Rotate refresh token and reissue access token" },
        { method: "DELETE", path: "/api/auth/sessions/:id", auth: true, rate: "None", purpose: "Revoke a specific device session (list via GET /sessions)" },
        { method: "POST", path: "/api/interviews", auth: true, rate: "Throttled", purpose: "Schedule an interview with template, candidate email, and optional recurrence pattern" },
        { method: "PATCH", path: "/api/interviews/:id/reschedule", auth: true, rate: "OwnershipGuard", purpose: "Reschedule — ownership decorator verifies the requesting interviewer" },
        { method: "POST", path: "/api/interviews/:id/evaluate", auth: true, rate: "5/min", purpose: "Generate the AI evaluation report from final code + transcript" },
        { method: "POST", path: "/api/interviews/run-code", auth: true, rate: "10/min", purpose: "Execute code in the Wandbox sandbox via the shared COMPILER_MAP" },
      ],
      dataFlow: [
        "Login sets httpOnly access/refresh cookies; device metadata (UA, IP, OS) is stored as a Session row for later revocation",
        "Client opens a Socket.io connection passing the JWT via handshake.auth or cookie — invalid tokens are disconnected immediately",
        "join-room verifies the JWT subject, then confirms membership through the Participant table before admitting the socket",
        "Joiner receives room state: connected peers, current codeContent, language, whiteboard shapes, and code history",
        "WebRTC offer/answer/ICE messages are relayed peer-to-peer through the webrtc-signal event pair",
        "Every code-change broadcasts to peers and persists to Interview.codeContent; snapshots throttle into codeHistory every 5s (max 500)",
        "Mic levels are sampled locally and relayed as audio-level peaks to drive live speaker waveforms",
        "Audio chunks stream to Gemini 2.5 Flash multimodal transcription; segments broadcast to the room and append to Interview.transcript",
        "Tab/focus events are throttled client-side, relayed as proctoring-events, persisted to proctoringLogs, and annotatable with a candidate-supplied reason",
        "Recording stops → .webm uploads through the storage adapter (local/S3/GCS) → URL, size, duration saved to the interview",
        "Evaluate endpoint sends final code + last transcript entries to Gemini → structured {score, technicalRating, communicationRating, review} persisted as feedback",
      ],
      deployment: [
        "Local infrastructure: npm run db:up boots PostgreSQL + Redis via docker-compose",
        "npm run db:migrate runs prisma migrate + generate inside the backend workspace",
        "Root workspace scripts orchestrate both apps concurrently — Next.js (:3000) and NestJS (:3001)",
        "CI via GitHub Actions: ci.yml (lint/typecheck/unit), preview.yml (PR previews), deploy.yml (production)",
        "Backend ships to Railway through nixpacks.toml + Dockerfile; frontend deploys to Vercel",
        "REDIS_URL opts into the Socket.io Redis adapter for horizontal scaling; otherwise in-memory adapter",
      ],
    },
    diagram: {
      frontend: { label: "FRONTEND (Next.js App Router)", tech: "Next.js 16 · React 19 · Monaco Editor · socket.io-client · Zustand 5 · Tailwind CSS v4 · Shiki" },
      backend: { label: "BACKEND (NestJS 11 API + Gateway)", tech: "REST /api/* · Socket.io RealtimeGateway · Passport JWT + 2FA · @nestjs/throttler · Prisma ORM" },
      arrow: { label: "HTTPS REST · WebSocket signaling, keystrokes & transcripts" },
      services: [
        { name: "PostgreSQL", description: "Prisma-managed schema — users, interviews, participants, question bank, templates, organizations, integrations" },
        { name: "Redis", description: "Socket.io pub/sub adapter for multi-instance fan-out (optional via REDIS_URL)" },
        { name: "Gemini 2.5 Flash", description: "Multimodal audio transcription · structured evaluation · challenge generation" },
        { name: "Wandbox Sandbox", description: "Remote code execution endpoint routed by the shared COMPILER_MAP" },
      ],
    },
    codeSnippets: [
      {
        title: "Room Authorization — JWT Identity + Membership Gate",
        language: "typescript",
        code: `@SubscribeMessage('join-room')
async handleJoinRoom(@ConnectedSocket() client: Socket, data: JoinRoomDto) {
  // Trust nothing from the payload — identity comes from the verified JWT.
  const user = client.data.user;
  if (!user?.sub || !user.role) return client.disconnect(true);
  if (data.userId && data.userId !== user.sub) {
    this.logger.warn(\`Join rejected: claimed \${data.userId} != JWT \${user.sub}\`);
    return client.disconnect(true);
  }

  // Only scheduled participants may enter the room.
  const participant = await this.prisma.participant.findUnique({
    where: { userId_interviewId: { userId: user.sub, interviewId: data.interviewId } },
    select: { role: true, user: { select: { name: true } } },
  });
  if (!participant) {
    return client.emit('join-error', { message: 'Not a participant of this interview' });
  }

  await client.join(data.interviewId);
  this.socketUserDetails.set(client.id, {
    userId: user.sub,
    userName: participant.user?.name,
    userRole: participant.role, // role from the DB, not the client
  });
}`,
        reason: "Room authorization hardening — identity is cross-checked against the verified JWT and membership is enforced from the database, so a forged payload can never enter someone else's interview",
      },
      {
        title: "Flood Protection — grantAccess() Sliding Window",
        language: "typescript",
        code: `private grantAccess(client: Socket, interviewId: string): boolean {
  // A socket may only act on a room it actually joined.
  if (this.socketRooms.get(client.id) !== interviewId) return false;

  const now = Date.now();
  let entry = this.rateLimits.get(client.id);
  if (!entry || now - entry.windowStart >= RATE_LIMIT_WINDOW_MS) {
    entry = { windowStart: now, count: 0 };
    this.rateLimits.set(client.id, entry);
  }
  entry.count++;
  return entry.count <= RATE_LIMIT_MAX_EVENTS; // 40 events/sec
}

// Every write/broadcast handler gates on it:
@SubscribeMessage('code-change')
handleCodeChange(client: Socket, data: CodeChangeDto) {
  if (!this.grantAccess(client, data.interviewId)) return;
  /* broadcast + persist */
}`,
        reason: "One lightweight Map-based sliding window provides both room-scoped authorization and flood control — no external rate-limit dependency inside the WebSocket layer",
      },
      {
        title: "Bounded Revision History — Throttled Checkpoints",
        language: "typescript",
        code: `client.to(interviewId).emit('code-updated', codeContent);

await this.prisma.interview.update({
  where: { id: interviewId },
  data: { codeContent }, // instant persistence for crash recovery
});

const now = Date.now();
const lastSave = this.lastHistoryTimes.get(interviewId) ?? 0;
if (now - lastSave > 5000) {           // snapshot at most every 5s
  this.lastHistoryTimes.set(interviewId, now);
  const history = interview.codeHistory ?? [];
  if (history.length < 500) {          // hard cap per interview
    history.push({ codeContent, language, timestamp: new Date().toISOString() });
    await this.prisma.interview.update({
      where: { id: interviewId },
      data: { codeHistory: history },
    });
  }
}`,
        reason: "Live keystrokes persist immediately while revision snapshots stay throttled and bounded — a replayable code timeline that can never bloat the database",
      },
      {
        title: "Gemini Multimodal Transcription",
        language: "typescript",
        code: `async transcribeAudioStream(chunk: Buffer, mimeType = 'audio/webm') {
  if (!this.hasValidKey()) {
    return 'Mock transcription segment.'; // graceful dev fallback
  }

  const response = await fetch(
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': this.geminiApiKey,
      },
      body: JSON.stringify({
        contents: [{
          parts: [
            { inlineData: { mimeType, data: chunk.toString('base64') } },
            { text: 'Transcribe this audio clip accurately.' },
          ],
        }],
      }),
    },
  );

  const json = await response.json();
  return json.candidates?.[0]?.content?.parts?.[0]?.text?.trim()
    ?? '[Audio transcription failed]';
}`,
        reason: "Speech-to-text without hosting a separate Whisper model — raw audio chunks go inline to Gemini 2.5 Flash's multimodal endpoint, with a mock fallback when no API key is configured",
      },
    ],
    siteMap: {
      userRoles: [
        { role: "Interviewer", description: "Schedules and conducts live technical interviews", needs: "Spin up sessions from curated templates or AI-generated challenges, watch proctoring signals live, and finish with a structured evaluation report.", icon: "🧑‍💼" },
        { role: "Candidate", description: "Joins invited coding interviews in the browser", needs: "Enter the room from an invite without installing anything, code in a familiar editor, and talk through solutions via voice, chat, and whiteboard.", icon: "👨‍💻" },
        { role: "Reviewer", description: "Evaluates completed sessions asynchronously", needs: "Replay recordings, read the transcript, inspect proctoring logs and AI scores, and share findings through a secure token link.", icon: "🔍" },
      ],
      userFlow: [
        { step: "Schedule", detail: "Interviewer picks a template or generates a challenge by role/level/difficulty; sessions can repeat daily, weekly, biweekly, or monthly as a managed series" },
        { step: "Invite", detail: "Candidate email attaches them as a CANDIDATE participant; authentication covers email/password, Google/GitHub OAuth, and magic login tokens" },
        { step: "Join", detail: "JWT-authenticated socket handshake plus database membership check; the joiner receives peers, code, language, and whiteboard state in one snapshot" },
        { step: "Live Session", detail: "P2P video with muted-state sync, Monaco editing with remote cursors, whiteboard drawing with cursor presence, chat, and speaking waveforms" },
        { step: "Proctoring", detail: "Tab-switches and focus loss stream to the room and persist as logs; the candidate can attach a reason that binds back to the flagged event" },
        { step: "Wrap-up", detail: "The .webm recording uploads through the storage adapter while the transcript has been accumulating segment by segment during the call" },
        { step: "Review", detail: "AI evaluation produces score, technical/communication ratings, and a written review; share tokens expose a read-only report for async hiring decisions" },
      ],
      siteArchitecture: [
        { section: "Dashboard", type: "Overview + analytics", description: "Upcoming and past interviews, activity feed, and quick actions with Sentry-instrumented error boundaries" },
        { section: "Scheduling", type: "CRUD + recurrence engine", description: "Create, reschedule, cancel; RecurringPattern rows materialize DAILY/WEEKLY/BIWEEKLY/MONTHLY series with occurrence limits" },
        { section: "Interview Room", type: "Realtime workspace", description: "Video grid, Monaco editor with language selector and test runner, whiteboard canvas, chat drawer, and waveform strip" },
        { section: "Question Bank", type: "Community + curated", description: "Categories, tags, difficulty filters, up/down votes, bookmarks, view and usage counters, plus AI generation" },
        { section: "Templates", type: "Reusable interview kits", description: "Starter code + test cases per stack category (FRONTEND/BACKEND/DSA) with vote and usage statistics" },
        { section: "Review & Feedback", type: "Post-session reports", description: "AI evaluation dashboard, transcript reader, recording playback, and share-token links" },
        { section: "Integrations", type: "Notification routing", description: "Slack, Discord, and generic webhook providers with per-user enablement and notification-type scoping" },
        { section: "Settings", type: "Profile & security", description: "Avatar upload, password change, 2FA setup with backup codes, active-session management, and notification preferences" },
      ],
    },
  },
  {
    slug: "assetra",
    title: "Assetra — Digital Asset Marketplace",
    summary:
      "A full-stack digital asset marketplace where creators sell UI kits, templates, and icons — with Midtrans payments verified end-to-end, Row Level Security data isolation, realtime buyer-seller chat, and signed-URL file delivery.",
    challenge:
      "Creators lacked a dedicated platform to monetize digital assets with secure file delivery, integrated local payments, and real-time buyer-seller communication — existing global marketplaces take heavy cuts and don't support Indonesian payment methods like QRIS and e-wallets.",
    solution:
      "Built a marketplace on Next.js 16 App Router with Supabase as the backend layer: PostgreSQL schemas guarded by Row Level Security policies, a database trigger that auto-provisions creator profiles on signup, Midtrans Snap checkout with SHA-512-verified idempotent webhooks, private storage buckets fronted by time-limited Signed URLs, realtime chat and notifications over Supabase channels, and Resend-delivered React email receipts — with most mutations handled by colocated Server Actions instead of a separate API layer.",
    impact:
      "Delivered a production-grade two-sided marketplace: server-side filtering and pagination, a creator wallet with earnings heatmap, timeline analytics, payout requests and CSV export, wishlist flows, follow/review systems, JSON-LD structured data, and skeleton loading states across every async boundary.",
    stack: ["Next.js 16", "TypeScript", "Supabase", "PostgreSQL", "Midtrans", "Resend", "Tailwind CSS"],
    role: "Full-Stack Developer",
    year: "2026",
    client: "Self-initiated",
    category: "Marketplace",
    timeline: "2026",
    features: [
      {
        title: "Product Marketplace",
        description: "Server-side filtered and paginated listings for UI kits, templates, and icons — computed in Postgres, not the client.",
        screenshot: "/image/assetra/marketplacepage.png",
        screenshotLabel: "Marketplace",
      },
      {
        title: "Product Detail & Purchase",
        description: "Rich product pages with previews, reviews, wishlist, and Midtrans Snap checkout in local payment methods.",
        screenshot: "/image/assetra/overviewpage.png",
        screenshotLabel: "Product overview",
      },
      {
        title: "Creator Wallet",
        description: "Earnings heatmap, timeline analytics, payout requests, and CSV export for sellers.",
        screenshot: "/image/assetra/walletpage.png",
        screenshotLabel: "Wallet",
      },
      {
        title: "Buyer Library",
        description: "Purchased assets with secure Signed-URL downloads that expire — no public file paths.",
        screenshot: "/image/assetra/librarypage.png",
        screenshotLabel: "Library",
      },
      {
        title: "Publish Flow",
        description: "Creators publish listings with metadata, pricing, and asset uploads through typed Server Actions.",
        screenshot: "/image/assetra/addproductpage.png",
        screenshotLabel: "Add product",
      },
      {
        title: "Account Settings",
        description: "Profile, payout details, notification preferences, and connected OAuth accounts in one place.",
        screenshot: "/image/assetra/settingspage.png",
        screenshotLabel: "Settings",
      },
    ],
    sourceUrl: "https://github.com/callmezaa/assetra-digital-product",
    demoUrl: "https://assetra-digital-product.vercel.app",
    type: "marketplace",
    featured: true,
    metrics: ["Midtrans Snap Payments", "SHA-512 Verified Webhooks", "RLS Data Isolation", "Signed-URL Delivery"],
    accent: {
      glow: "rgba(168, 85, 247, 0.14)",
      color: "#a855f7",
    },
    architecture: {
      monorepo: [
        { name: "app/", tech: "Next.js 16 App Router + Server Actions", description: "Route groups for marketplace, product/[id], seller & profile pages, dashboard (inventory, wallet, chat, settings), cart, library, and notifications — mutations live in colocated actions.ts files" },
        { name: "app/api/", tech: "Route Handlers (3 only)", description: "Just three raw HTTP endpoints where frameworks must meet the outside world: /api/marketplace (filtered listing), /api/download/[productId] (signed URL issuance), /api/webhook/midtrans (payment callback)" },
        { name: "components/", tech: "React + shadcn/ui + Recharts-style charts", description: "Feature components including EarningsHeatmap, EarningsTimeline, SalesChart, IncomeDonutChart, WalletHistoryTabs, PayoutRequestModal, CartDrawer, NotificationBell (realtime), and React Email templates" },
        { name: "database*.sql", tech: "Versioned SQL migrations", description: "Ordered scripts: core schema → performance indexes → storage RLS policies → secure download setup → chat system schema → audit logs" },
      ],
      decisions: [
        { decision: "Supabase BaaS over a custom Node/NestJS backend", reason: "Auth (email + Google/GitHub OAuth), Postgres, storage, and realtime channels from one platform — removes an entire server tier to build and secure" },
        { decision: "Row Level Security as the authorization layer", reason: "Ownership rules live as SQL policies (auth.uid() checks) so no API route can accidentally leak another user's products, orders, or chats" },
        { decision: "Server Actions over REST controllers", reason: "Mutations are typed functions imported next to their UI; only webhooks and file streaming need raw Route Handlers" },
        { decision: "Database trigger for profile provisioning", reason: "on_auth_user_created fires handle_new_user() (SECURITY DEFINER) to insert a profile row with a generated unique username — zero orphaned users" },
        { decision: "SHA-512 signature verification on every webhook", reason: "Midtrans callbacks are hashed against the server key before any state changes — forged settlement requests are rejected at the door" },
        { decision: "Idempotent webhook processing", reason: "Existing completed orders short-circuit early, so Midtrans retrying the same settlement event can never double-insert orders or re-send emails" },
        { decision: "Private buckets + Signed URLs for product files", reason: "Purchased assets never sit behind a public path — the download route verifies order ownership first, then redirects to an expiring Signed URL" },
        { decision: "Realtime via supabase_realtime publication", reason: "The notifications table is added to the publication so new sales/messages stream to clients without polling" },
      ],
      endpoints: [
        { method: "GET", path: "/api/marketplace", auth: false, rate: "Static gen + ISR", purpose: "Server-side filtered, paginated product listing computed in Postgres" },
        { method: "GET", path: "/api/download/[productId]", auth: true, rate: "Per-order check", purpose: "Verifies purchase ownership, then issues a time-limited Storage Signed URL" },
        { method: "POST", path: "/api/webhook/midtrans", auth: false, rate: "Signature-gated", purpose: "Payment callback — SHA-512 verify → idempotency check → insert orders, clean wishlist, notify sellers, email receipt" },
        { method: "POST", path: "Server Actions (~15)", auth: true, rate: "Session-bound", purpose: "Typed mutations for auth, cart checkout, product CRUD, chat messages, wallet payouts, and settings" },
      ],
      dataFlow: [
        "Signup hits Supabase Auth → on_auth_user_created trigger provisions a profiles row with a slugified unique username",
        "Creator uploads a product: binary to a private Storage bucket, metadata to products under RLS owner-only write policy",
        "Buyer browses /api/marketplace — filters, sorting, and pagination execute inside Postgres, not the client",
        "Checkout builds a Midtrans Snap transaction, smuggling productIds and userId through custom_field1/custom_field2",
        "Midtrans settles → POSTs the webhook → server recomputes SHA-512(order+status+amount+serverKey) and compares signatures",
        "Idempotency gate: an already-completed order for that user/product returns early — replays are harmless",
        "Orders insert as completed; purchased items are removed from the buyer's wishlist in the same flow",
        "Each seller receives a realtime notification row ('💰 New Sale!') streamed via the supabase_realtime publication",
        "Resend renders the ReceiptEmail React template and delivers it to the buyer's inbox",
        "Download requests hit /api/download/[productId] → ownership check → redirect to an expiring Signed URL — files are never publicly addressable",
      ],
      deployment: [
        "Single Vercel deployment serves the app and its three Route Handlers",
        "Supabase project hosts Postgres, Auth, Storage, and Realtime — schema applied via ordered SQL scripts in the SQL Editor",
        "Environment split: NEXT_PUBLIC_* keys for client Supabase access, service-role key reserved for privileged operations",
        "Midtrans runs sandbox-first; production flip requires swapping server/client keys",
        "Resend sender identity configured for receipt and welcome emails",
      ],
    },
    diagram: {
      frontend: { label: "FRONTEND (Next.js App Router)", tech: "React Server Components · Server Actions · Tailwind CSS · shadcn/ui · Framer Motion · Sonner toasts" },
      backend: { label: "BACKEND (Supabase)", tech: "PostgreSQL + RLS · Auth (email/OAuth) · Storage buckets · Realtime channels · Edge network" },
      arrow: { label: "Supabase JS client — every query passes RLS policies" },
      services: [
        { name: "PostgreSQL + RLS", description: "profiles, products, orders, wishlist, chat threads, notifications — authorization enforced at the row level" },
        { name: "Storage + Signed URLs", description: "Private asset bucket with expiring, ownership-checked download links" },
        { name: "Midtrans Snap", description: "QRIS, e-wallets, cards — settled events verified by SHA-512 webhook signature" },
        { name: "Resend", description: "React Email templates for receipts and welcome flows" },
      ],
    },
    codeSnippets: [
      {
        title: "Webhook Security — Signature + Idempotency",
        language: "typescript",
        code: `const hashString = \`\${order_id}\${status_code}\${gross_amount}\${serverKey}\`;
const expectedSignature = crypto
  .createHash('sha512').update(hashString).digest('hex');

if (signature_key !== expectedSignature) {
  return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
}

if (transaction_status === 'capture' || transaction_status === 'settlement') {
  // Replay protection: skip if this purchase was already fulfilled
  const { data: existingOrder } = await supabase
    .from('orders')
    .select('id')
    .eq('user_id', userId)
    .eq('product_id', products[0].id)
    .eq('status', 'completed')
    .single();

  if (existingOrder) {
    return NextResponse.json({ message: 'Order already processed' });
  }
  /* insert orders → clean wishlist → notify sellers → email receipt */
}`,
        reason: "Two-layer defense on the money path — the SHA-512 hash rejects forged callbacks, while the completed-order check makes Midtrans retries idempotent so fulfillment side effects run exactly once",
      },
      {
        title: "Profile Provisioning — Database Trigger",
        language: "sql",
        code: `CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, username)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'full_name',
    LOWER(REGEXP_REPLACE(new.raw_user_meta_data->>'full_name', '\\s+', '', 'g'))
      || floor(random() * 1000)::text
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();`,
        reason: "Every authenticated user gets a profile row with a collision-resistant username generated in-database — application code cannot forget this step, even across OAuth providers",
      },
      {
        title: "Authorization as Data — RLS Policies",
        language: "sql",
        code: `ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders   ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Products are viewable by everyone."
  ON products FOR SELECT USING (true);

CREATE POLICY "Users can update their own products."
  ON products FOR UPDATE USING (auth.uid() = user_id);

-- Orders are strictly private:
CREATE POLICY "Users can view their own orders."
  ON orders FOR SELECT USING (auth.uid() = user_id);`,
        reason: "Ownership lives in the database itself — even a buggy or malicious query can only ever touch rows the authenticated user owns, because policies evaluate per-request against auth.uid()",
      },
    ],
    siteMap: {
      userRoles: [
        { role: "Buyer", description: "Discovers and purchases digital assets", needs: "Filter the catalog fast, preview files before buying, pay with QRIS/e-wallets, and re-download purchases anytime from their library.", icon: "🛍️" },
        { role: "Creator", description: "Publishes and monetizes digital products", needs: "Upload assets with rich metadata, track earnings through heatmap/timeline analytics, manage inventory, request payouts, and answer buyer questions in realtime chat.", icon: "🎨" },
        { role: "Visitor", description: "Browses without an account", needs: "Explore the marketplace, inspect product detail pages with SEO-rich metadata, and understand trust signals before signing up.", icon: "👀" },
      ],
      userFlow: [
        { step: "Discover", detail: "Marketplace landing with server-rendered listings, category filters, search, and wishlist toggles for signed-in users" },
        { step: "Evaluate", detail: "Product page with gallery, specs, FAQ, reviews, live preview modal, and a Contact Seller button that opens a realtime chat thread" },
        { step: "Purchase", detail: "Cart drawer aggregates items; Server Action creates the Midtrans Snap token and redirects to checkout with metadata embedded" },
        { step: "Fulfillment", detail: "Verified webhook inserts completed orders, cleans wishlists, notifies each seller in realtime, and emails a React-rendered receipt" },
        { step: "Access", detail: "Library lists owned assets; downloads verify ownership then hand off to expiring Signed URLs" },
        { step: "Create", detail: "Creators publish via dashboard forms, toggle listing status, edit products, and watch the earnings heatmap and timeline update" },
        { step: "Withdraw", detail: "Wallet aggregates balances by month with donut/sales charts; PayoutRequestModal initiates withdrawal requests with CSV export for records" },
      ],
      siteArchitecture: [
        { section: "Marketplace", type: "Server-rendered catalog", description: "Filtered, paginated listings with skeleton loading states and optimistic wishlist buttons" },
        { section: "Product Detail", type: "SEO landing surface", description: "Dynamic metadata + JSON-LD, gallery lightbox, reviews, sticky buy action bar, live preview" },
        { section: "Seller / Profile", type: "Public creator pages", description: "/seller/[username] storefront with follow button; /profile/[username] identity page with avatar storage policies" },
        { section: "Dashboard", type: "Creator control center", description: "Inventory table with status toggles, create/edit forms with drag-drop uploads, activity log" },
        { section: "Chat", type: "Realtime messaging", description: "Thread list sidebar + window with Supabase realtime subscriptions, image attachments, unread tracking" },
        { section: "Wallet", type: "Earnings analytics", description: "Monthly totals, heatmap calendar, income donut, history tabs, payout requests, CSV export" },
        { section: "Library", type: "Owned assets", description: "Purchase history with quick-download actions routed through Signed URLs" },
        { section: "Notifications", type: "Realtime feed", description: "Bell dropdown + dedicated page backed by the realtime-published notifications table" },
        { section: "Settings", type: "Account management", description: "Profile, security, privacy, payout preferences, and notification controls" },
      ],
    },
  },
  {
    slug: "monetra",
    title: "Monetra — Personal Finance Tracker",
    summary:
      "A full-stack finance tracker pairing a Go (Gin) REST API with a React dashboard — budgets, goals, recurring automation, CSV/PDF reporting, and a deterministic month-over-month insight engine.",
    challenge:
      "Existing finance apps force a choice: consumer products are too locked-down and complex for casual users, while simple trackers lack the depth for meaningful budget analysis, goal pacing, or exports you can own.",
    solution:
      "Architected a clean REST API in Go on Gin with PGX against PostgreSQL — composite indexes tuned for aggregation-heavy report queries, JWT auth over bcrypt hashes plus Google OAuth sign-in, recurring-transaction materialization, and server-side CSV/PDF report streaming — paired with a React/Vite dashboard rendering cashflow trends through Recharts, budget alerts, goal contribution tracking, and a rule-based insight engine that compares months and flags category spikes.",
    impact:
      "Shipped a production-ready platform across two languages: 30+ typed endpoints behind one middleware chain, data isolation enforced by user-scoped queries, deterministic financial advice with zero LLM cost or latency, a Railway-hosted Go service, and a Vercel-deployed frontend with full dark mode.",
    stack: ["Go", "Gin", "PostgreSQL", "PGX", "React", "Vite", "Tailwind CSS", "Recharts"],
    role: "Full-Stack Developer",
    year: "2026",
    client: "Self-initiated",
    category: "Finance App",
    timeline: "2026",
    features: [
      {
        title: "Cashflow Dashboard",
        description: "Aggregated income-vs-expense overview with Recharts trends powered by a single Go aggregation endpoint.",
        screenshot: "/image/monetra/dashboard.png",
        screenshotLabel: "Dashboard",
      },
      {
        title: "Transactions",
        description: "Fast searchable ledger with categories, filters, and per-user data isolation on every query.",
        screenshot: "/image/monetra/transactions.png",
        screenshotLabel: "Transactions",
      },
      {
        title: "Budgets & Alerts",
        description: "Per-category budgets with pacing indicators that warn before overspending happens.",
        screenshot: "/image/monetra/budgets.png",
        screenshotLabel: "Budgets",
      },
      {
        title: "Savings Goals",
        description: "Goal tracking with contribution history and projected completion dates.",
        screenshot: "/image/monetra/goals.png",
        screenshotLabel: "Goals",
      },
      {
        title: "Reports & Exports",
        description: "Monthly, by-category, and summary reports with server-generated CSV/PDF downloads.",
        screenshot: "/image/monetra/reports.png",
        screenshotLabel: "Reports",
      },
      {
        title: "Recurring Automation",
        description: "Subscriptions and salaries materialize into real entries on a deterministic schedule.",
        screenshot: "/image/monetra/recurring.png",
        screenshotLabel: "Recurring",
      },
    ],
    sourceUrl: "https://github.com/callmezaa/monetra-financetrackerApp",
    demoUrl: "https://monetra-financetracker-app.vercel.app/",
    type: "finance",
    featured: true,
    metrics: ["Go + React Full Stack", "30+ REST Endpoints", "Insight Engine", "CSV/PDF Exports"],
    accent: {
      glow: "rgba(251, 146, 60, 0.14)",
      color: "#fb923c",
    },
    architecture: {
      monorepo: [
        { name: "backend/", tech: "Go + Gin + PGX + Dockerfile", description: "cmd/main.go bootstrap, config/database.go connection pool, 12 handler files grouped per domain (auth, transactions, categories, budgets, goals, recurring, reports, insights, notifications), JWT middleware, 6 model structs, and SQL migrations" },
        { name: "backend/routes/", tech: "routes.go", description: "Single route composition file — public group (register/login/Google OAuth) and a protected group behind AuthMiddleware, organized by resource" },
        { name: "frontend/", tech: "React + Vite + Recharts", description: "12 pages from marketing landing to Reports, AuthContext/ThemeContext providers, an axios instance with token injection, and ProtectedRoute guarding" },
      ],
      decisions: [
        { decision: "Go + Gin over Node.js for the API", reason: "Compiles to one static binary — tiny container footprint on small Railway instances with predictable latency under concurrent aggregation queries" },
        { decision: "PGX with hand-written SQL over an ORM", reason: "Report endpoints live or die on SUM/GROUP BY performance — explicit queries paired with composite indexes beat generated ORM SQL" },
        { decision: "Composite indexes on (user_id, transaction_date)", reason: "Every dashboard and report query filters by user and date range — indexes turn monthly aggregations into index scans instead of table scans" },
        { decision: "Deterministic insight engine over an LLM call", reason: "Month-over-month deltas and threshold spikes produce explainable, instant, zero-cost advice — no hallucinated financial guidance, no API bill" },
        { decision: "Recurring materialization as an explicit process endpoint", reason: "POST /recurring/process creates due transaction instances deterministically instead of hidden cron magic — easy to test and retry" },
        { decision: "Server-side CSV/PDF generation", reason: "Exports stream straight from query results so browsers download finished files without client-side data wrangling" },
        { decision: "Google OAuth alongside email/password", reason: "Reduces signup friction while bcrypt keeps credential accounts safe — both paths converge on the same JWT session" },
      ],
      endpoints: [
        { method: "POST", path: "/api/register · /api/login", auth: false, rate: "Public", purpose: "Credential signup/signin — bcrypt verification issues the JWT" },
        { method: "POST", path: "/api/auth/google", auth: false, rate: "Public", purpose: "Google identity exchange → same JWT session as password login" },
        { method: "GET", path: "/api/dashboard", auth: true, rate: "JWT", purpose: "Aggregated cashflow summary powering the overview page" },
        { method: "GET", path: "/api/reports/monthly|by-category|summary", auth: true, rate: "JWT", purpose: "Aggregation endpoints feeding Recharts visualizations" },
        { method: "GET", path: "/api/reports/export/csv|pdf", auth: true, rate: "JWT", purpose: "Server-generated export streams for records and taxes" },
        { method: "GET", path: "/api/insights", auth: true, rate: "JWT", purpose: "Statistical engine: month-over-month trend + category spike detection with advice strings" },
        { method: "POST", path: "/api/recurring/process", auth: true, rate: "JWT", purpose: "Materializes due recurring transactions into real entries" },
      ],
      dataFlow: [
        "Register/login verifies a bcrypt hash (or exchanges a Google identity) and issues a signed JWT",
        "AuthMiddleware validates the Bearer token on every protected route and injects userID into the request context",
        "Every query is user-scoped — transactions, budgets, goals all filter by the context user for horizontal isolation",
        "Dashboard aggregates current-month income vs expense in one round trip",
        "The insight engine pulls current and previous month expense totals plus per-category GROUP BY joins",
        "Categories with >10% month-over-month growth — or new categories spending above Rp 50k — are flagged as spikes",
        "Threshold rules translate spikes into plain-language advice rendered on the dashboard",
        "POST /recurring/process materializes due recurring definitions into dated transaction rows",
        "Export endpoints stream CSV/PDF built directly from report queries",
        "Recharts renders monthly trends, category donuts, and budget progress bars from those endpoints",
      ],
      deployment: [
        "Backend: Dockerized Go binary deployed to Railway via railway.json",
        "Frontend: Vercel static build with vercel.json rewrites proxying /api to the Railway service",
        "Database: PostgreSQL with migrations applied via psql before first boot",
        "Secrets (DB creds, JWT_SECRET, ALLOWED_ORIGIN) injected as environment variables — nothing hardcoded",
      ],
    },
    diagram: {
      frontend: { label: "FRONTEND (React SPA)", tech: "React 18 · Vite · Recharts · Tailwind CSS · axios + JWT interceptor · Context auth/theme" },
      backend: { label: "BACKEND (Go REST API)", tech: "Gin router · JWT middleware · PGX pool · 12 domain handlers · CSV/PDF streaming" },
      arrow: { label: "HTTPS JSON · Bearer token" },
      services: [
        { name: "PostgreSQL", description: "users, categories, transactions (+ budgets/goals/recurring) with composite report indexes" },
        { name: "Google OAuth", description: "Identity provider option converging on the same JWT session" },
        { name: "Railway", description: "Container host for the Go service" },
      ],
    },
    codeSnippets: [
      {
        title: "Insight Engine — Spike Detection",
        language: "go",
        code: `var spikes []CategoryInsight
for catID, curAmt := range curCats {
    if prevAmt, ok := prevCats[catID]; ok && prevAmt.Amount > 0 {
        increase := ((curAmt.Amount - prevAmt.Amount) / prevAmt.Amount) * 100
        if increase > 10 { // >10% month-over-month growth
            spikes = append(spikes, CategoryInsight{
                CategoryName: curAmt.CategoryName,
                Amount:       curAmt.Amount,
                IncreasePct:  increase,
            })
        }
    } else if curAmt.Amount > 50000 { // new category with real spend
        spikes = append(spikes, CategoryInsight{
            CategoryName: curAmt.CategoryName,
            Amount:       curAmt.Amount,
            IncreasePct:  100,
        })
    }
}

// Threshold rules turn spikes into advice:
if trend > 15 {
    advice = append(advice, fmt.Sprintf(
        "Spending jumped %.1f%% vs last month...", trend))
}`,
        reason: "Deterministic financial guidance — pure month-over-month math with explicit thresholds produces explainable insights with zero LLM cost, latency, or hallucination risk",
      },
      {
        title: "Aggregation Queries Tuned by Indexes",
        language: "sql",
        code: `-- Monthly expense total (index: idx_transactions_user_date)
SELECT COALESCE(SUM(amount), 0) FROM transactions
WHERE user_id = $1 AND type = 'expense'
  AND EXTRACT(MONTH FROM transaction_date) = $2
  AND EXTRACT(YEAR FROM transaction_date) = $3;

-- Per-category spend for the same window
SELECT c.id, c.name, COALESCE(SUM(t.amount), 0)
FROM categories c
LEFT JOIN transactions t ON t.category_id = c.id
WHERE c.user_id = $1 AND c.type = 'expense'
  AND EXTRACT(MONTH FROM t.transaction_date) = $2
  AND EXTRACT(YEAR FROM t.transaction_date) = $3
GROUP BY c.id, c.name;`,
        reason: "Hand-written aggregation SQL paired with composite (user_id, transaction_date) and (user_id, type) indexes keeps dashboard loads fast even as history grows",
      },
      {
        title: "Schema — Isolation Baked Into Constraints",
        language: "sql",
        code: `CREATE TABLE IF NOT EXISTS transactions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id)
        ON DELETE CASCADE,
    category_id INTEGER NOT NULL REFERENCES categories(id)
        ON DELETE RESTRICT,
    amount DECIMAL(15, 2) NOT NULL,
    type VARCHAR(20) NOT NULL
        CHECK (type IN ('income', 'expense')),
    transaction_date DATE NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_transactions_user_date
    ON transactions(user_id, transaction_date);
CREATE INDEX IF NOT EXISTS idx_transactions_user_type
    ON transactions(user_id, type);`,
        reason: "Foreign keys with CASCADE/RESTRICT encode data lifecycle rules at the schema level, while CHECK constraints reject invalid types before application code ever sees them",
      },
    ],
    siteMap: {
      userRoles: [
        { role: "Casual Tracker", description: "Logs income and expenses without ceremony", needs: "Add a transaction in seconds, see where money goes on a clean dashboard, and trust the numbers.", icon: "🧾" },
        { role: "Budgeter", description: "Sets monthly limits per category", needs: "Configure budgets with alerts before overspending and watch progress bars update as transactions land.", icon: "📊" },
        { role: "Goal Saver", description: "Puts money aside for targets", needs: "Create goals, contribute savings incrementally, and track pacing toward each target with recurring automation for steady habits.", icon: "🎯" },
      ],
      userFlow: [
        { step: "Onboard", detail: "Register with email/password or Google; JWT session persists across the SPA via axios interceptors" },
        { step: "Organize", detail: "Create income/expense categories that anchor every transaction, budget, and report" },
        { step: "Record", detail: "Log transactions with amount, type, category, date, and description — deletions cascade cleanly" },
        { step: "Automate", detail: "Define recurring bills or salary entries; the process endpoint materializes them when due, with a toggle to pause" },
        { step: "Constrain", detail: "Set category budgets that alert before overspend thresholds are crossed" },
        { step: "Progress", detail: "Fund goals incrementally through Add Saving contributions tracked against each target" },
        { step: "Review", detail: "Monthly/category/yearly reports render in Recharts; the insight engine narrates trends and flags spikes" },
        { step: "Export", detail: "Download CSV/PDF statements generated server-side from the same report queries" },
      ],
      siteArchitecture: [
        { section: "Landing", type: "Marketing page", description: "3D-branded hero, feature walkthroughs, and CTA into register/login flows" },
        { section: "Auth", type: "Dual-path entry", description: "Email/password forms plus Google OAuth button converging on one JWT session" },
        { section: "Dashboard", type: "Overview", description: "Cashflow summary cards and trend charts from the aggregated /dashboard endpoint" },
        { section: "Transactions · Categories", type: "CRUD tables", description: "Filterable lists with inline add/edit/delete and type-aware category pickers" },
        { section: "Budgets", type: "Limits + alerts", description: "Per-category monthly caps with progress visualization and overspend warnings" },
        { section: "Goals", type: "Savings tracker", description: "Target cards with contribution history and pacing indicators" },
        { section: "Recurring", type: "Automation panel", description: "Definition list with frequency controls, pause toggles, and manual process trigger" },
        { section: "Reports", type: "Analytics suite", description: "Monthly, by-category, and yearly views plus CSV/PDF export actions" },
        { section: "Settings", type: "Account center", description: "Profile editing, avatar upload, password change, notification preferences, theme toggle" },
      ],
    },
  },
  {
    slug: "pallete-studio",
    title: "Palette Studio — Color Extraction Toolkit",
    summary:
      "A zero-backend color workstation that extracts dominant palettes from any image via custom median-cut quantization in a Web Worker, then harmonizes, contrast-checks, visualizes in 3D, and exports production-ready tokens — images never leave the browser.",
    challenge:
      "Designers and developers juggle disjointed utilities — one tool extracts colors, another checks contrast, another exports tokens — while most upload sensitive screenshots or brand material to unknown servers just to get a palette.",
    solution:
      "Built a self-contained color ecosystem: hand-written median-cut quantization running off the main thread in a Web Worker, a harmony engine mapping complementary/analogous/triadic relationships on wheel and force-graph views, WCAG AA/AAA pairwise contrast analysis, mood classification, an interactive gradient physics playground, a Three.js DNA helix with bloom post-processing, a live UI preview gallery restyled by the extracted palette, and multi-format export — all state-driven by six Zustand stores with persisted history and base64-encoded shareable URLs.",
    impact:
      "Shipped 15+ features with zero network calls after page load: privacy by architecture, keyboard shortcuts and long-press interactions throughout, GSAP scroll storytelling on the landing page, and a command palette — proving complex creative tooling can live entirely client-side.",
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "Three.js", "GSAP", "Zustand"],
    role: "Full-Stack Developer & UI Engineer",
    year: "2026",
    client: "Self-initiated",
    category: "Design Tool",
    timeline: "2026",
    sourceUrl: "https://github.com/callmezaa/Pallete-studio",
    demoUrl: "https://pallete-studio-ten.vercel.app",
    type: "playground",
    featured: true,
    badge: "Playground",
    metrics: ["Median-cut Engine", "Web Worker Pipeline", "WCAG AA/AAA Checker", "Zero Backend"],
    accent: {
      glow: "rgba(236, 72, 153, 0.14)",
      color: "#ec4899",
    },
    architecture: {
      monorepo: [
        { name: "src/lib/", tech: "Pure TypeScript functions", description: "The entire color science layer as dependency-free modules: median-cut extraction, harmony math, WCAG relative luminance and contrast ratios, mood classification, gradient interpolation, export serializers, and color naming" },
        { name: "src/workers/", tech: "Web Worker", description: "color-worker.ts receives ImageData buffers and runs quantization off the main thread — large images never freeze the UI" },
        { name: "src/store/", tech: "Zustand × 6 + persist middleware", description: "Slices for palette, history (localStorage-persisted), upload, toast, UI state, and export format — no context provider tree" },
        { name: "src/components/", tech: "React 19 feature folders", description: "palette/ (cards, extractor, contrast panel, DNA helix), relationship/ (wheel + force graph), gradient/ (physics playground), story/ (animated reveal), preview/ (11 restyled UI demos), export/ panel" },
        { name: "src/app/", tech: "App Router routes", description: "Three routes only: / workspace, /history archive, /palette/[id] shared palettes decoded from base64 URL segments" },
      ],
      decisions: [
        { decision: "Hand-written median-cut over a color library", reason: "Full control over bucket splitting and dominant-color ordering — zero dependency weight for a function that is ~60 lines of pure math" },
        { decision: "Web Worker for pixel processing", reason: "Quantizing millions of pixels blocks the main thread; the worker keeps drag, pin, and scroll interactions at 60fps during extraction" },
        { decision: "Zero-backend architecture", reason: "Images are processed entirely in-browser — sensitive screenshots never leave the device, there is no server cost, and cold starts don't exist" },
        { decision: "Base64 palette URLs over a database", reason: "/palette/[id] encodes the full palette into the URL itself — shareable state with no persistence layer to run or pay for" },
        { decision: "Six focused Zustand stores over one global store", reason: "Palette manipulation, history, toasts, and UI flags re-render independently — selectors keep heavy canvases from redrawing on unrelated changes" },
        { decision: "GSAP ScrollTrigger + Framer Motion split", reason: "GSAP owns the landing page's scroll-driven storytelling timeline; Framer Motion handles in-app micro-interactions where React reconciliation matters" },
        { decision: "@react-three/fiber for the DNA helix", reason: "Declarative Three.js scene graph inside React with drei helpers and bloom post-processing — a memorable brand moment rendered from live palette data" },
      ],
      endpoints: [
        { method: "GET", path: "/palette/[id]", auth: false, rate: "Static", purpose: "Shared palette decoded from base64 URL segment — rendered fully client-side" },
        { method: "N/A", path: "No network calls", auth: false, rate: "None", purpose: "All computation local — pixels processed in-browser via Web Worker, nothing uploaded anywhere" },
      ],
      dataFlow: [
        "User drops an image → UploadZone reads it locally via FileReader, never a network request",
        "Canvas downsamples the bitmap into ImageData and transfers the buffer to the color worker",
        "The worker flattens RGBA tuples and median-cut splits buckets along their widest RGB channel until 5 colors remain",
        "Buckets average into hex + dominance-percentage results posted back to the main thread",
        "Zustand palette store updates → ColorCards render with copy formats (hex/rgb/hsl/oklch) and long-press quick-copy",
        "Mood classifier labels the palette; the harmony engine computes complementary/analogous/triadic partners for each swatch",
        "Relationship map draws wheel positions and force-graph links; ContrastPanel scores every pair against WCAG AA/AAA thresholds",
        "Gradient playground interpolates live stops onto canvas; DNA helix feeds palette hues into the Three.js scene",
        "Export panel serializes tokens to CSS variables, Tailwind config, JSON, SCSS, or design tokens; PNG strip renders to canvas",
        "History store persists palettes to localStorage; Share serializes state to base64 for /palette/[id] URLs",
      ],
      deployment: [
        "Fully static Next.js build on Vercel — no server functions in the output",
        "Worker bundled as a separate chunk and instantiated per session",
        "PWA manifest ships for installable offline use",
        "No environment secrets required — nothing to leak because nothing leaves the client",
      ],
    },
    diagram: {
      frontend: { label: "CLIENT (Next.js App Router)", tech: "React 19 · Zustand ×6 · Framer Motion · GSAP ScrollTrigger · Tailwind CSS v4 · shadcn/ui" },
      backend: { label: "BACKEND", tech: "None — 100% client-side computation, static hosting only" },
      arrow: { label: "Zero requests after load" },
      services: [
        { name: "Web Worker", description: "Off-thread median-cut quantization over ImageData buffers" },
        { name: "Three.js scene", description: "@react-three/fiber DNA helix with bloom post-processing and orbit controls" },
        { name: "localStorage", description: "Zustand persist middleware archiving palette history" },
      ],
    },
    codeSnippets: [
      {
        title: "Median-Cut Quantization Core",
        language: "typescript",
        code: `function quantize(pixels: RGB[], maxColors: number): Bucket[] {
  let buckets: RGB[][] = [pixels];

  while (buckets.length < maxColors) {
    // Always split the largest bucket
    const idx = buckets.reduce((max, b, i) =>
      b.length > buckets[max].length ? i : max, 0);
    const largest = buckets[idx];
    if (largest.length < 2) break;

    // Split along the widest RGB channel
    const range = findLargestChannelRange(largest);
    const sorted = [...largest].sort((a, b) =>
      a[range.channel] - b[range.channel]);
    const mid = Math.floor(sorted.length / 2);
    buckets[idx] = sorted.slice(0, mid);
    buckets.push(sorted.slice(mid));
  }

  return buckets.map((bucket) => ({
    color: averageColor(bucket),
    count: bucket.length, // → dominance percentage
  }));
}`,
        reason: "The extraction algorithm from first principles — iteratively splitting the most populous bucket along its widest channel yields perceptually dominant colors with zero dependencies",
      },
      {
        title: "WCAG Contrast — Relative Luminance",
        language: "typescript",
        code: `function linearize(channel: number): number {
  const c = channel / 255;
  return c <= 0.04045
    ? c / 12.92
    : Math.pow((c + 0.055) / 1.055, 2.4);
}

export function relativeLuminance(r: number, g: number, b: number) {
  return 0.2126 * linearize(r)
       + 0.7152 * linearize(g)
       + 0.0722 * linearize(b);
}

export function contrastRatio(c1: RGB, c2: RGB): number {
  const l1 = relativeLuminance(...c1);
  const l2 = relativeLuminance(...c2);
  return (Math.max(l1, l2) + 0.05)
       / (Math.min(l1, l2) + 0.05);
}`,
        reason: "Spec-accurate WCAG contrast per the sRGB linearization formula — powers the pairwise AA/AAA scoring panel and auto black/white text decisions across the UI",
      },
    ],
    siteMap: {
      userRoles: [
        { role: "Designer", description: "Builds brand and UI palettes from references", needs: "Extract honest dominant colors from photos or mockups, judge accessibility instantly, and explore harmonies without leaving one screen.", icon: "🎨" },
        { role: "Developer", description: "Wires palettes into codebases", needs: "Copy values in hex/rgb/hsl/oklch, export ready-to-paste CSS variables, Tailwind config, or design tokens, and re-share exact palettes via URL.", icon: "👨‍💻" },
        { role: "Color Explorer", description: "Learns color theory visually", needs: "See harmony relationships drawn on a wheel and force graph, watch moods classified, and play with gradients and 3D visualizations hands-on.", icon: "🔬" },
      ],
      userFlow: [
        { step: "Upload", detail: "Drag-and-drop zone accepts an image; pixels stay in-browser as the worker begins quantization immediately" },
        { step: "Extract", detail: "Five dominant colors return with dominance percentages, auto-generated names, and a mood classification badge" },
        { step: "Curate", detail: "Drag to reorder swatches, pin favorites, long-press for instant copy, and toggle between hex/rgb/hsl/oklch formats" },
        { step: "Analyze", detail: "Contrast panel scores every pair against AA/AAA while the relationship map plots complementary, analogous, and triadic partners on wheel and force-graph views" },
        { step: "Visualize", detail: "Gradient physics playground bends live stops; the DNA helix spins palette hues in 3D with bloom; eleven UI components restyle themselves to preview real usage" },
        { step: "Export & Share", detail: "Serialize to CSS variables, Tailwind, JSON, SCSS, design tokens, or a PNG strip — then share via base64 URL or save to history" },
        { step: "Revisit", detail: "History page restores any past palette with swipe-to-delete management and one-click reload into the workspace" },
      ],
      siteArchitecture: [
        { section: "Home / Hero", type: "GSAP scroll story", description: "Particle field and floating blobs with scroll-driven reveals funneling into the upload zone" },
        { section: "Workspace", type: "Extraction + curation", description: "Palette grid of draggable ColorCards with format toggles, pinning, and copy feedback toasts" },
        { section: "Contrast Panel", type: "Accessibility matrix", description: "Pairwise WCAG scoring with pass/fail badges at AA and AAA thresholds" },
        { section: "Relationship Map", type: "Dual visualization", description: "Color wheel view plus force-directed graph linking each swatch to its harmonic partners" },
        { section: "Gradient Physics", type: "Interactive playground", description: "Linear/radial/mesh types with draggable stops, angle control, and real-time canvas rendering" },
        { section: "DNA Helix", type: "3D brand moment", description: "@react-three/fiber double-helix scene with bloom post-processing, orbit controls, and PNG capture" },
        { section: "UI Preview", type: "Live component gallery", description: "Buttons, forms, navbar, dashboard demo, and theme toggle restyled by the active palette" },
        { section: "Story Mode", type: "Animated reveal", description: "Cinematic sequence presenting each extracted color with ambient background transitions" },
        { section: "History", type: "Local archive", description: "/history page listing persisted palettes with restore, share links, and swipe-to-delete" },
        { section: "Shared Palette", type: "URL-encoded state", description: "/palette/[id] decodes base64 state so recipients land directly on a fully-loaded workspace" },
      ],
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
    stack: ["React Native", "Expo", "TypeScript", "Firebase", "Firestore", "Midtrans"],
    role: "Mobile & Backend Developer",
    year: "2024",
    client: "PT BIT Indonesia",
    category: "Mobile POS",
    timeline: "2024",
    features: [
      {
        title: "Fast POS Transactions",
        description: "Product selection, quantities, and payment in under 5 seconds per operation — built for low-end devices.",
        screenshot: "/image/GotaniApp/transaksi.png",
        screenshotLabel: "Transaction",
      },
      {
        title: "Sales Reports",
        description: "Bar, line, and pie visualizations of transaction history with CSV/PDF export via expo-print.",
        screenshot: "/image/GotaniApp/laporan.png",
        screenshotLabel: "Reports",
      },
      {
        title: "Stock Management",
        description: "Inventory with expiry dates, supplier records, distribution logs, and automated movement history.",
        screenshot: "/image/GotaniApp/kelolaproduk.png",
        screenshotLabel: "Manage products",
      },
      {
        title: "Offline-First Ledger",
        description: "Pending transactions queue in AsyncStorage and sync to Firestore when connectivity returns.",
        screenshot: "/image/GotaniApp/beranda.png",
        screenshotLabel: "Home",
      },
    ],
    sourceUrl: "https://github.com/callmezaa/gotani-POS-application",
    type: "pos",
    badge: "Enterprise App",
    metrics: ["90% Error Reduction", "Dual-Role Auth", "Midtrans Payments", "5s Entry Time"],
    accent: {
      glow: "rgba(16, 185, 129, 0.14)",
      color: "#10b981",
    },
    architecture: {
      monorepo: [
        { name: "app/", tech: "Expo Router (file-based)", description: "Root layout, auth screens (login/register/forgot-password), splash screen, and main (tabs) group with 20+ screens for transactions, stock, reports, employees, payments, settings" },
        { name: "contexts/", tech: "React Context + mitt", description: "UserContext (dual-role auth state) and EmployeeContext (employee session) — wrapped around tab navigator for global access" },
        { name: "components/", tech: "React Native + Reanimated", description: "14 reusable components including RoleGuard, RoleBlockModal, TransactionCard, CalendarPicker, MonthPicker, CustomDrawer, and UI primitives" },
        { name: "utils/", tech: "TypeScript", description: "QRIS generator with CRC16 checksum, Cloudinary image upload helper, and mitt-based profile event emitter" },
        { name: "server/", tech: "Express 5 + Midtrans Client", description: "Standalone Node.js server for Midtrans Snap payment token generation and webhook callback handling" },
      ],
      decisions: [
        { decision: "Expo Router over React Navigation directly", reason: "File-based routing mirrors web conventions — screens map to files, eliminating manual navigation config for 20+ screens" },
        { decision: "Dual-role auth (Firebase Auth + Firestore lookup)", reason: "Admin uses Firebase Auth email/password; employees stored in Firestore subcollections under each admin, looked up via an admin UID index" },
        { decision: "React Context + mitt over Redux/Zustand", reason: "App has 2 global state concerns (auth role, employee) — Context is sufficient. mitt handles cross-tab events like profile updates without a store" },
        { decision: "Midtrans Snap over direct payment gateway integration", reason: "Snap provides QRIS, GoPay, OVO, ShopeePay, DANA in one iframe — no need to integrate each provider separately" },
        { decision: "Express server for Midtrans webhook", reason: "Midtrans requires a server-side endpoint for transaction callbacks — Express provides a minimal, deployable webhook handler" },
        { decision: "Firestore over PostgreSQL/SQLite", reason: "Real-time sync for multi-device access, serverless scaling, built-in security rules — ideal for cooperative with no dedicated IT team" },
        { decision: "AsyncStorage for session persistence", reason: "Lightweight key-value storage, no native module linking required — sufficient for caching auth tokens and offline queue" },
      ],
      endpoints: [
        { method: "POST", path: "/create-transaction", auth: true, rate: "N/A", purpose: "Generate Midtrans Snap token for online payment (QRIS, e-Wallet)" },
        { method: "POST", path: "/webhook", auth: false, rate: "N/A", purpose: "Midtrans payment status callback — updates transaction status in Firestore" },
      ],
      dataFlow: [
        "Admin login via Firebase Auth (email/password) → session persisted in AsyncStorage → UserContext detects role",
        "Employee login via Firestore lookup: searches users/{adminUid}/employees/{uid} → sets role='karyawan' in UserContext",
        "Transaction flow: select products → set quantities → choose payment method",
        "Cash payment: enter nominal → auto-calculate change → save to Firestore → decrement stock",
        "Online payment: call Express /create-transaction → get Snap token → open Midtrans SDK → webhook updates status",
        "QRIS payment: generate EMVCo payload via qrisGenerator.ts → display QR code → customer scans and pays",
        "Reports: query Firestore transaction history → render with react-native-chart-kit (bar, line, pie) → optional CSV/PDF export via expo-print",
        "Stock management: track inventory with expiry dates, supplier records, distribution logs, and automated stock movement history",
        "Offline queue: pending transactions stored in AsyncStorage → sync to Firestore when connection restores",
      ],
      deployment: [
        "Expo build: npx eas build --platform android → generates .aab for Play Store",
        "Express server: deployed to Railway/Render as a Node.js service on PORT 4000",
        "Firebase: production Firestore with security rules + Firebase Auth for admin authentication",
        "Midtrans: sandbox → production migration requires updating server key and enabling production mode",
        "Environment: MIDTRANS_CLIENT_KEY, MIDTRANS_SERVER_KEY, Firebase credentials via .env file",
      ],
    },
    diagram: {
      frontend: { label: "MOBILE APP (Expo Router)", tech: "React Native 0.76 · Expo SDK 52 · TypeScript 5 · Reanimated · Gesture Handler" },
      backend: { label: "EXPRESS SERVER", tech: "Express 5 · Midtrans Snap · dotenv · CORS" },
      arrow: { label: "HTTPS + Midtrans Snap Token" },
      services: [
        { name: "Firebase Auth", description: "Email/password authentication for admin users" },
        { name: "Firestore", description: "Real-time NoSQL DB — users, products, transactions, employees, suppliers, stock history" },
        { name: "Midtrans", description: "Snap payment gateway — QRIS, GoPay, OVO, ShopeePay, DANA, credit card" },
        { name: "Cloudinary", description: "Image upload for product photos and employee profile pictures" },
      ],
    },
    codeSnippets: [
      {
        title: "Dual-Role Authentication — UserContext",
        language: "typescript",
        code: `useEffect(() => {
  const auth = getAuth();
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        // Admin login — direct Firestore doc
        setRole(userDoc.data().role || "admin");
      } else {
        // Karyawan login — search admin subcollections
        const adminsSnap = await getDoc(doc(db, "admins", "index"));
        const adminUIDs = adminsSnap.data()?.uids || [];
        for (const adminUid of adminUIDs) {
          const empSnap = await getDoc(
            doc(db, \`users/\${adminUid}/employees\`, user.uid)
          );
          if (empSnap.exists()) {
            setRole("karyawan");
            setEmployee(empSnap.data());
            break;
          }
        }
      }
    }
  });
  return () => unsubscribe();
}, []);`,
        reason: "Dual-role authentication — admin users authenticate via Firebase Auth with docs in users/{uid}, while employees are stored in subcollections under each admin and discovered through an admin UID index"
      },
      {
        title: "Midtrans Payment Integration — Express Server",
        language: "javascript",
        code: `const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
});

app.post("/create-transaction", async (req, res) => {
  const { orderId, grossAmount, customerName } = req.body;
  try {
    const parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: grossAmount,
      },
      customer_details: {
        first_name: customerName || "Pelanggan",
      },
    };
    const transaction = await snap.createTransaction(parameter);
    res.json({
      token: transaction.token,
      redirect_url: transaction.redirect_url,
    });
  } catch (error) {
    res.status(500).json({ error: "Gagal membuat transaksi" });
  }
});

app.post("/webhook", (req, res) => {
  const payload = req.body;
  // TODO: Update payment status in Firebase via Admin SDK
  res.status(200).send("OK");
});`,
        reason: "Midtrans Snap integration with two endpoints — one to generate a payment token (which the mobile app uses to open the Snap payment page), and a webhook for async payment status callbacks"
      },
      {
        title: "QRIS Payment — CRC16 Generator",
        language: "typescript",
        code: `function crc16(payload: string) {
  let crc = 0xffff;
  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      if ((crc & 0x8000) !== 0)
        crc = (crc << 1) ^ 0x1021;
      else crc <<= 1;
    }
  }
  return (crc & 0xffff).toString(16)
    .toUpperCase().padStart(4, "0");
}

export function generateQRIS(total: number, paymentId: string) {
  const amount = total.toFixed(2);
  const payload =
    "000201" + "010212" +
    "29370016COM.EXAMPLE.QR01" +
    "52040000" + "5303360" +
    \`5405\${total}\` +
    "5802ID" + "5908TOKOKU" +
    "6007JAKARTA" + \`6212\${paymentId}\` +
    "6304";
  return payload + crc16(payload);
}`,
        reason: "QRIS (Indonesian QR payment standard) payload generation with CRC16-CCITT checksum — the payload follows EMVCo data element encoding for merchant, amount, currency, and a custom metadata field"
      },
      {
        title: "Role Guard — Access Control Component",
        language: "typescript",
        code: `type Role = "admin" | "karyawan" | "kasir" | "inventaris" | "manajer";

export function RoleGuard({
  allowedRoles,
  children,
  fallback,
}: {
  allowedRoles: Role[];
  children: ReactNode;
  fallback?: ReactNode;
}) {
  const { role, employee } = useUser();
  const userRole = role === "karyawan" ? employee?.role : role;
  const hasAccess = userRole && allowedRoles.includes(userRole as Role);

  if (!hasAccess) {
    return fallback ?? <RoleBlockModal />;
  }
  return <>{children}</>;
}

// Usage in screen:
<RoleGuard allowedRoles={["admin", "manajer"]}>
  <StockManagementScreen />
</RoleGuard>`,
        reason: "Declarative role-based access control — wraps screens and sections with allowedRoles array and shows a blocked modal when unauthorized, supporting 5 distinct user roles"
      },
    ],
    siteMap: {
      userRoles: [
        { role: "Admin (Pemilik Toko)", description: "Full access to all features — auth via Firebase email/password", needs: "Manage products, employees, suppliers, view all reports, configure store settings, and access all transactions with full CRUD capabilities.", icon: "👑" },
        { role: "Kasir", description: "Limited to transaction processing", needs: "Create new transactions, process cash/online payments, print receipts, and view limited transaction history — no access to stock or employee management.", icon: "💳" },
        { role: "Inventaris", description: "Stock and supply chain management", needs: "Manage product inventory, track stock with expiry dates, handle supplier records, process stock distribution, and view stock movement history.", icon: "📦" },
        { role: "Manajer", description: "Reports and team oversight", needs: "View all sales reports (omzet, best-selling products, transaction history), monitor employee transactions, and export data to CSV/PDF for analysis.", icon: "📊" },
      ],
      userFlow: [
        { step: "Splash Screen & Auth", detail: "App loads with branded splash + Poppins font loading → admin logs in via Firebase Auth or employee via Firestore subcollection lookup → session persisted in AsyncStorage" },
        { step: "Dashboard (Beranda)", detail: "Role-aware dashboard showing key metrics (today's sales, active products, pending transactions) with quick-action buttons for new transaction, add product, and stock check" },
        { step: "New Transaction", detail: "Search/browse products → set quantities → review cart → choose payment method: Cash (auto change calculation) or Online (Midtrans Snap with QRIS/GoPay/OVO)" },
        { step: "Payment Processing", detail: "Cash: enter amount tendered → auto-calculate change → save to Firestore → decrement stock. Online: generate Snap token via Express server → open Midtrans SDK → webhook updates status" },
        { step: "Receipt & Sharing", detail: "Digital receipt generated via expo-print → share as text via WhatsApp, Email, or other apps through Expo Sharing API" },
        { step: "Stock Management", detail: "Add/edit products with categories, prices, and images → track stock with expiry dates and supplier records → distribute stock to employees → view full stock movement history" },
        { step: "Reports & Analytics", detail: "5 report types: omzet per month (line chart), best-selling products (pie chart), products sold (detail with period filter), sales transactions (bar chart), employee transaction history (per-person filter)" },
        { step: "Employee Management", detail: "Admin adds employees with role (kasir/inventaris/manajer) → each employee has scoped access via RoleGuard → admin monitors all employee transactions" },
      ],
      siteArchitecture: [
        { section: "Auth", type: "Dual-role login", description: "Splash screen → Firebase Auth (admin) or Firestore lookup (employee) → role-based redirect to dashboard" },
        { section: "Dashboard", type: "Role-aware home", description: "Key metrics, quick-action buttons, role-scoped card visibility — kasir sees transactions, inventaris sees stock alerts" },
        { section: "Transaction", type: "POS terminal", description: "Product search, cart management, quantity adjustment, cash/online payment selection, auto change calculation" },
        { section: "Payment", type: "Midtrans Snap + QRIS", description: "Online: Snap token generation → Midtrans SDK. QRIS: EMVCo payload generation → QR code display → customer scan" },
        { section: "Products", type: "CRUD + categories", description: "Add/edit products with image upload (Cloudinary), categories, prices, stock quantities, and toggle active/inactive" },
        { section: "Stock", type: "Inventory management", description: "Stock history with movement log, expiry date tracking, supplier management, stock distribution to employees" },
        { section: "Reports", type: "5 chart types", description: "Omzet per bulan (line), produk terlaris (pie), produk terjual (detail), transaksi penjualan (bar), riwayat karyawan (filter)" },
        { section: "Employees", type: "Multi-role system", description: "Admin CRUD for employees with role assignment, RoleGuard component for declarative access control, per-employee transaction history" },
        { section: "Settings", type: "Store configuration", description: "Store profile (name, address, logo), receipt template customization, password change" },
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
