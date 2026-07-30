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
    slug: "koperasi-kpjmi",
    title: "KPJMI — Company Profile Koperasi Petani",
    summary:
      "Situs web perusahaan bergaya editorial premium untuk Koperasi Petani Jaya Makmur Indonesia (KPJMI), sebuah koperasi yang memberdayakan petani lokal di Banyumas melalui budidaya pepaya organik dan produk olahan.",
    challenge:
      "KPJMI, sebuah koperasi petani di Banyumas, Jawa Tengah, membutuhkan kehadiran digital modern yang mencerminkan produk organik premium mereka dan martabat para petani. Situs web koperasi yang ada seringkali ketinggalan zaman dan gagal mengomunikasikan positioning premium merek — sehingga sulit menarik mitra, pembeli, dan anggota baru.",
    solution:
      "Membangun SPA React 19 + TypeScript dengan Vite 8 dan Tailwind CSS v4, menampilkan tata letak editorial magazine-spread dengan hero full-bleed, image mask organik, floating glass quote card, timeline zigzag untuk visi & misi, showcase fotografi produk nyata (Permen Pepaya, Keripik, Sabun), galeri lightbox dengan Embla Carousel, bagian kontak terintegrasi WhatsApp, dan embed Google Maps langsung — semuanya dibungkus dalam sistem desain editorial Swiss premium.",
    impact:
      "Menghadirkan company profile yang responsif dan berperforma tinggi yang memposisikan KPJMI sebagai merek koperasi modern dan terpercaya. Memiliki 10+ bagian yang berbeda, animasi scroll-aware yang halus melalui Motion, navbar glass transparan/gelap, dan bahasa desain editorial yang konsisten dengan aksen merah merek (#B81104).",
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS"],
    role: "Pengembang Frontend & Desainer UI",
    year: "2026",
    sourceUrl: "https://github.com/callmezaa/koperasi-KPJMI",
    demoUrl: "https://koperasi-kpjmi.vercel.app",
    type: "company",
    metrics: ["React 19 + Vite 8", "Tailwind CSS v4", "Editorial Design", "Embla Lightbox"],
    accent: {
      glow: "rgba(184, 17, 4, 0.14)",
      color: "#B81104",
    },
    architecture: {
      monorepo: [
        { name: "src/components/", tech: "React 19 + Motion", description: "6 komponen layout (Navbar, Footer, Container, BackToTop, ScrollProgress, SectionDivider) dan 10 komponen seksi (Hero, About, VisionMission, BusinessUnits, Products, Gallery, Testimonials, FAQ, Contact, SectionHeader)" },
        { name: "src/data/", tech: "Modul TypeScript", description: "12 modul data statis (navigation, company, businessUnits, products, gallery, testimonials, faq, contact, statistics, values, timeline, partners, certifications)" },
        { name: "src/hooks/", tech: "TypeScript", description: "Custom hooks termasuk useCounter — IntersectionObserver untuk animasi counter statistik yang dipicu scroll" },
        { name: "src/utils/", tech: "TypeScript", description: "Utilitas cn() menggabungkan clsx + tailwind-merge untuk komposisi class tanpa konflik" },
      ],
      decisions: [
        { decision: "Vite 8 daripada Next.js", reason: "Company profile statis tidak butuh SSR/SSG — HMR instan Vite dan pipeline build sederhana lebih cepat untuk iterasi tanpa biaya server" },
        { decision: "React 19 + Motion daripada vanilla JS", reason: "Arsitektur komponen dengan animasi scroll-driven deklaratif (useScroll, useTransform, whileInView) untuk pengalaman editorial" },
        { decision: "Tailwind CSS v4 dengan @theme", reason: "Token desain kustom (brand-red, brand-lemon, font Satoshi/Outfit) dalam satu konfigurasi — tanpa preprocessor CSS" },
        { decision: "Embla Carousel daripada Swiper", reason: "Ringan (12KB), agnostik framework, kontrol penuh atas autoplay dan animasi progress bar kustom" },
        { decision: "Konversi WebP build-time dengan Sharp", reason: "WebP pra-konversi via script prebuild — tanpa overhead runtime, semua gambar dalam format modern" },
        { decision: "Modul data statis daripada CMS", reason: "Tanpa database atau API — konten di file TypeScript dengan type safety penuh, tanpa latensi runtime, muat halaman instan" },
        { decision: "IntersectionObserver untuk navigasi", reason: "API browser native dengan multiple threshold (0, 0.25, 0.5, 0.75) dan rootMargin untuk deteksi seksi aktif yang akurat" },
      ],
      endpoints: [
        { method: "GET", path: "/", auth: false, rate: "N/A", purpose: "Melayani entry point SPA statis — semua konten dibundel saat build" },
        { method: "N/A", path: "src/data/*.ts", auth: false, rate: "N/A", purpose: "Modul data statis diimpor saat build — tanpa dependensi API runtime" },
      ],
      dataFlow: [
        "Pengguna membuka koperasi-kpjmi.vercel.app → SPA Vite melayani index.html dengan CSS/JS terbundel",
        "App.tsx menyusun Navbar + 9 seksi + Footer dalam tata letak scroll linear",
        "Setiap seksi mengimpor datanya langsung dari src/data/*.ts saat build — tanpa permintaan jaringan",
        "ScrollProgress + Navbar menggunakan useScroll() untuk pelacakan progress scroll real-time",
        "IntersectionObserver Navbar menyoroti seksi aktif berdasarkan visibilitas viewport dengan multiple threshold",
        "Gambar galeri dimuat via Vite import.meta.glob — WebP sebagai preferensi, PNG fallback via <picture>",
        "Carousel Testimonials Embla berputar otomatis dengan progress bar kustom yang sinkron dengan timer autoplay",
        "Seksi Kontak menampilkan embed Google Maps iframe + tautan WhatsApp untuk pesan instan",
        "Semua animasi menghormati prefers-reduced-motion melalui hook useReducedMotion dari Motion"
      ],
      deployment: [
        "npm run build → prebuild (Sharp WebP conversion) → tsc -b + vite build",
        "Output statis di dist/ — tanpa runtime server, tanpa Node.js di produksi",
        "Di-deploy ke Vercel via push Git — hosting statis zero-config di edge network",
        "Vercel melayani dist/ terkompresi dengan HTTPS otomatis, HTTP/2, dan caching CDN global"
      ],
    },
    diagram: {
      frontend: { label: "FRONTEND (React SPA)", tech: "React 19 · Vite 8 · TypeScript 6 · Motion · Tailwind CSS v4 · Embla Carousel" },
      backend: { label: "BACKEND", tech: "Tidak ada — situs statis penuh, semua konten di src/data/" },
      arrow: { label: "Import data saat build" },
      services: [
        { name: "Vercel Edge Network", description: "Hosting statis · CDN Global · Zero-config · HTTPS · Deploy otomatis dari Git" },
        { name: "Embla Carousel", description: "12KB gzip · Autoplay · Breakpoint responsif · Dot + progress bar touch-friendly" },
        { name: "Google Maps Embed", description: "Iframe statis untuk lokasi kantor KPJMI di Banyumas" },
      ],
    },
    codeSnippets: [
      {
        title: "Hero Parallax — useScroll + useTransform",
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
        reason: "Parallaks scroll-driven dengan Motion useScroll + useTransform — background dan konten bergerak dengan kecepatan berbeda untuk efek kedalaman, dengan penghormatan penuh terhadap reduced-motion"
      },
      {
        title: "Navbar Glass Transisi + Seksi Aktif",
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

// Di komponen:
<motion.header
  animate={{ y: hidden ? -80 : 0 }}
  className={cn(
    "fixed top-0 left-0 right-0 z-50 transition-colors duration-300",
    scrolled
      ? "bg-white/80 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.08)]"
      : "bg-transparent"
  )}
>`,
        reason: "Navbar transparan-ke-glass dengan IntersectionObserver untuk pelacakan seksi aktif — rootMargin mengakomodasi tinggi navbar, multiple threshold mencegah jitter"
      },
      {
        title: "Embla Carousel — Progress Bar Autoplay",
        language: "typescript",
        code: `const [emblaRef, emblaApi] = useEmblaCarousel(
  { loop: true, align: "start" },
  [Autoplay({ delay: 4000, stopOnInteraction: false })]
);

const [progress, setProgress] = useState(0);
useEffect(() => {
  if (!emblaApi) return;
  const onTimer = setInterval(() => {
    setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
  }, 40);
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
        reason: "Carousel Embla autoplay dengan progress bar animasi kustom — 4s autoplay dibagi 100 langkah (40ms per langkah) untuk progress visual yang halus per slide"
      },
      {
        title: "Galeri Lightbox — AnimatePresence + Drag Dismiss",
        language: "typescript",
        code: `const images = Object.entries(
  import.meta.glob<{ default: string }>(
    "/src/assets/dokumentasi/*.png", { eager: true }
  )
);

// Grid animasi dengan filter kategori
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

// Overlay lightbox dengan drag untuk tutup
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
        reason: "Galeri gambar dengan Vite import.meta.glob untuk discovery aset, AnimatePresence popLayout untuk transisi filter halus, dan lightbox dengan drag-to-dismiss"
      },
    ],
    siteMap: {
      userRoles: [
        { role: "Petani & Anggota", description: "Anggota koperasi yang menjual hasil organik", needs: "Ingin menampilkan produk mereka, membangun kepercayaan dengan pembeli, dan menarik peluang kemitraan baru melalui kehadiran merek profesional.", icon: "👨‍🌾" },
        { role: "Pembeli Grosir", description: "Bisnis yang mencari produk pepaya organik", needs: "Perlu memverifikasi kualitas produk, memahami kapasitas produksi koperasi, dan mudah menghubungi melalui WhatsApp atau form kontak.", icon: "🛒" },
        { role: "Pengunjung Umum", description: "Publik yang tertarik dengan produk organik dan dampak sosial", needs: "Ingin belajar tentang praktik pertanian organik, kisah koperasi, dan cara mendukung petani lokal di Banyumas.", icon: "👤" },
        { role: "Pemerintah & Mitra", description: "Pemerintah daerah dan mitra institusi", needs: "Membutuhkan informasi transparan tentang operasi koperasi, sertifikasi, dan dampak komunitas untuk evaluasi kemitraan.", icon: "🤝" },
      ],
      userFlow: [
        { step: "Hero Parallax", detail: "Hero full-bleed dengan parallax scroll-driven, animasi teks reveal, dan tiga CTA: Jelajahi Profil, Hubungi Kami, dan tautan langsung WhatsApp" },
        { step: "Tentang & Statistik", detail: "Tata letak editorial magazine-spread dengan image mask organik, floating glass quote card, dan counter statistik animasi yang dipicu IntersectionObserver" },
        { step: "Visi, Misi & Timeline", detail: "Kartu visi glass terpusat, kartu misi timeline zigzag dengan animasi scroll staggered, dan banner komitmen di latar gambar" },
        { step: "Produksi & Unit Usaha", detail: "Kartu detail yang menampilkan empat unit bisnis dengan rincian per-item — pengguna dapat memahami ekosistem produk secara sekilas" },
        { step: "Showcase Produk", detail: "Fotografi produk nyata untuk Permen Pepaya, Keripik, dan Sabun dengan badge kategori dan CTA WhatsApp untuk pertanyaan" },
        { step: "Galeri dengan Lightbox", detail: "Foto dokumentasi dalam grid yang dapat difilter (AnimatePresence popLayout), dengan lightbox drag-to-dismiss dan pinch-to-zoom di mobile" },
        { step: "Carousel Testimoni", detail: "Carousel Embla autoplay dengan progress bar animasi, breakpoint responsif (1/2/3 slide), dan navigasi dot" },
        { step: "FAQ & Kontak", detail: "Akordion halus dengan AnimatePresence, embed Google Maps langsung, integrasi WhatsApp, dan form kontak untuk pertanyaan" },
      ],
      siteArchitecture: [
        { section: "Hero", type: "Parallax full-bleed", description: "Parallax background/konten scroll-driven dengan ambient glow overlay, tekstur noise, dan animasi headline reveal" },
        { section: "Tentang", type: "Editorial magazine-spread", description: "Image mask organik dengan clip-path, floating glass quote card, grid fitur, counter statistik animasi, kartu cerita" },
        { section: "Visi & Misi", type: "Timeline zigzag", description: "Kartu visi glass terpusat, kartu misi bergantian kiri/kanan dengan fade-in staggered, banner komitmen di latar gambar" },
        { section: "Unit Usaha", type: "Kartu detail", description: "Empat kartu unit bisnis (Pertanian Pepaya, Pengolahan, Peternakan, Perdagangan) dengan ikon, deskripsi, dan rincian per-unit" },
        { section: "Produk", type: "Katalog produk", description: "Tiga kartu produk (Opak, Permen, Sabun) dengan foto nyata, badge kategori, dan CTA WhatsApp" },
        { section: "Galeri", type: "Grid + lightbox", description: "Vite import.meta.glob untuk discovery aset, tab filter kategori dengan AnimatePresence popLayout, overlay drag-to-dismiss" },
        { section: "Testimoni", type: "Carousel Embla", description: "Autoplay dengan progress bar, 3 breakpoint responsif, navigasi dot, tombol previous/next" },
        { section: "FAQ", type: "Akordion", description: "8 item FAQ dengan AnimatePresence expand/collapse halus, aksen brand-red pada item aktif" },
        { section: "Kontak", type: "Google Maps + WhatsApp", description: "Embed Google Maps iframe langsung, tautan WhatsApp, info alamat/telepon/email, jam operasional" },
        { section: "Footer", type: "Footer gelap", description: "Logo merek, ikon media sosial (SVG), tautan navigasi, hak cipta dengan pemisah brand-red" },
      ],
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
    stack: ["React Native", "Expo", "TypeScript", "Firebase", "Firestore", "Midtrans"],
    role: "Pengembang Mobile & Backend",
    year: "2024",
    sourceUrl: "https://github.com/callmezaa/gotani-POS-application",
    type: "pos",
    featured: true,
    badge: "Enterprise App",
    metrics: ["90% Error Reduction", "Dual-Role Auth", "Midtrans Payments", "5s Entry Time"],
    accent: {
      glow: "rgba(16, 185, 129, 0.14)",
      color: "#10b981",
    },
    architecture: {
      monorepo: [
        { name: "app/", tech: "Expo Router (file-based)", description: "Root layout, layar auth (login/register/lupa-password), splash screen, dan grup (tabs) utama dengan 20+ layar untuk transaksi, stok, laporan, karyawan, pembayaran, pengaturan" },
        { name: "contexts/", tech: "React Context + mitt", description: "UserContext (state auth dual-role) dan EmployeeContext (sesi karyawan) — dibungkus di sekitar navigator tab untuk akses global" },
        { name: "components/", tech: "React Native + Reanimated", description: "14 komponen reusable termasuk RoleGuard, RoleBlockModal, TransactionCard, CalendarPicker, MonthPicker, CustomDrawer, dan primitif UI" },
        { name: "utils/", tech: "TypeScript", description: "Generator QRIS dengan CRC16 checksum, helper upload gambar Cloudinary, dan event emitter profil berbasis mitt" },
        { name: "server/", tech: "Express 5 + Midtrans Client", description: "Server Node.js mandiri untuk generasi token pembayaran Midtrans Snap dan penanganan webhook callback" },
      ],
      decisions: [
        { decision: "Expo Router daripada React Navigation manual", reason: "Routing berbasis file mirroring web — screen dipetakan ke file, menghilangkan konfigurasi navigasi manual untuk 20+ layar" },
        { decision: "Auth dual-role (Firebase Auth + Firestore lookup)", reason: "Admin menggunakan Firebase Auth email/password; karyawan disimpan di subkoleksi Firestore di bawah setiap admin, ditemukan melalui index UID admin" },
        { decision: "React Context + mitt daripada Redux/Zustand", reason: "Aplikasi hanya punya 2 state global (role auth, employee) — Context sudah cukup. mitt menangani event antar-tab seperti update profil tanpa store" },
        { decision: "Midtrans Snap daripada integrasi payment gateway langsung", reason: "Snap menyediakan QRIS, GoPay, OVO, ShopeePay, DANA dalam satu iframe — tidak perlu integrasi masing-masing provider secara terpisah" },
        { decision: "Server Express untuk webhook Midtrans", reason: "Midtrans membutuhkan endpoint server-side untuk callback transaksi — Express menyediakan webhook handler yang minimal dan dapat di-deploy" },
        { decision: "Firestore daripada PostgreSQL/SQLite", reason: "Sinkronisasi real-time untuk akses multi-perangkat, scaling serverless, security rules bawaan — ideal untuk koperasi tanpa tim IT khusus" },
        { decision: "AsyncStorage untuk persistensi sesi", reason: "Key-value storage ringan, tanpa link modul native — cukup untuk caching token auth dan antrean offline" },
      ],
      endpoints: [
        { method: "POST", path: "/create-transaction", auth: true, rate: "N/A", purpose: "Generate token Midtrans Snap untuk pembayaran online (QRIS, e-Wallet)" },
        { method: "POST", path: "/webhook", auth: false, rate: "N/A", purpose: "Callback status pembayaran Midtrans — update status transaksi di Firestore" },
      ],
      dataFlow: [
        "Login admin via Firebase Auth (email/password) → sesi di AsyncStorage → UserContext mendeteksi role",
        "Login karyawan via Firestore lookup: mencari users/{adminUid}/employees/{uid} → set role='karyawan' di UserContext",
        "Alur transaksi: pilih produk → atur jumlah → pilih metode bayar",
        "Pembayaran tunai: masukkan nominal → hitung kembalian otomatis → simpan ke Firestore → kurangi stok",
        "Pembayaran online: panggil Express /create-transaction → dapatkan Snap token → buka Midtrans SDK → webhook update status",
        "Pembayaran QRIS: generate payload EMVCo via qrisGenerator.ts → tampilkan QR code → pelanggan scan dan bayar",
        "Laporan: query riwayat transaksi Firestore → render dengan react-native-chart-kit (bar, line, pie) → ekspor CSV/PDF via expo-print",
        "Manajemen stok: lacak inventaris dengan tanggal kedaluwarsa, catatan supplier, log distribusi, dan riwayat pergerakan stok otomatis",
        "Antrean offline: transaksi tertunda disimpan di AsyncStorage → sinkron ke Firestore saat koneksi pulih",
      ],
      deployment: [
        "Build Expo: npx eas build --platform android → menghasilkan .aab untuk Play Store",
        "Server Express: di-deploy ke Railway/Render sebagai service Node.js di PORT 4000",
        "Firebase: Firestore production dengan security rules + Firebase Auth untuk autentikasi admin",
        "Midtrans: migrasi sandbox → production membutuhkan update server key dan mengaktifkan mode production",
        "Environment: MIDTRANS_CLIENT_KEY, MIDTRANS_SERVER_KEY, kredensial Firebase via file .env",
      ],
    },
    diagram: {
      frontend: { label: "MOBILE APP (Expo Router)", tech: "React Native 0.76 · Expo SDK 52 · TypeScript 5 · Reanimated · Gesture Handler" },
      backend: { label: "EXPRESS SERVER", tech: "Express 5 · Midtrans Snap · dotenv · CORS" },
      arrow: { label: "HTTPS + Midtrans Snap Token" },
      services: [
        { name: "Firebase Auth", description: "Autentikasi email/password untuk pengguna admin" },
        { name: "Firestore", description: "NoSQL DB real-time — users, produk, transaksi, karyawan, supplier, riwayat stok" },
        { name: "Midtrans", description: "Payment gateway Snap — QRIS, GoPay, OVO, ShopeePay, DANA, kartu kredit" },
        { name: "Cloudinary", description: "Upload gambar untuk foto produk dan foto profil karyawan" },
      ],
    },
    codeSnippets: [
      {
        title: "Autentikasi Dual-Role — UserContext",
        language: "typescript",
        code: `useEffect(() => {
  const auth = getAuth();
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        // Login Admin — Firestore doc langsung
        setRole(userDoc.data().role || "admin");
      } else {
        // Login Karyawan — cari subkoleksi admin
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
        reason: "Autentikasi dual-role — admin menggunakan Firebase Auth dengan dokumen di users/{uid}, sementara karyawan disimpan di subkoleksi setiap admin dan ditemukan melalui index UID admin"
      },
      {
        title: "Integrasi Pembayaran Midtrans — Server Express",
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
  // TODO: Update payment status di Firebase via Admin SDK
  res.status(200).send("OK");
});`,
        reason: "Integrasi Midtrans Snap dengan dua endpoint — satu untuk generate token pembayaran (digunakan mobile app untuk membuka halaman Snap), dan webhook untuk callback status pembayaran async"
      },
      {
        title: "Pembayaran QRIS — Generator CRC16",
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
        reason: "Generasi payload QRIS (standar pembayaran QR Indonesia) dengan CRC16-CCITT checksum — payload mengikuti encoding data element EMVCo untuk merchant, jumlah, mata uang, dan field metadata kustom"
      },
      {
        title: "Role Guard — Komponen Kontrol Akses",
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

// Penggunaan di layar:
<RoleGuard allowedRoles={["admin", "manajer"]}>
  <StockManagementScreen />
</RoleGuard>`,
        reason: "Kontrol akses berbasis peran deklaratif — membungkus layar dan bagian dengan array allowedRoles dan menampilkan modal blokir saat tidak berwenang, mendukung 5 peran pengguna"
      },
    ],
    siteMap: {
      userRoles: [
        { role: "Admin (Pemilik Toko)", description: "Akses penuh ke semua fitur — auth via Firebase email/password", needs: "Mengelola produk, karyawan, supplier, melihat semua laporan, mengonfigurasi pengaturan toko, dan mengakses semua transaksi dengan kemampuan CRUD penuh.", icon: "👑" },
        { role: "Kasir", description: "Terbatas pada pemrosesan transaksi", needs: "Membuat transaksi baru, memproses pembayaran tunai/online, mencetak struk, dan melihat riwayat transaksi terbatas — tanpa akses ke stok atau manajemen karyawan.", icon: "💳" },
        { role: "Inventaris", description: "Manajemen stok dan rantai pasok", needs: "Mengelola inventaris produk, melacak stok dengan tanggal kedaluwarsa, mengurus catatan supplier, memproses distribusi stok, dan melihat riwayat pergerakan stok.", icon: "📦" },
        { role: "Manajer", description: "Laporan dan pengawasan tim", needs: "Melihat semua laporan penjualan (omzet, produk terlaris, riwayat transaksi), memantau transaksi karyawan, dan mengekspor data ke CSV/PDF untuk analisis.", icon: "📊" },
      ],
      userFlow: [
        { step: "Splash Screen & Auth", detail: "Aplikasi dimuat dengan splash branded + loading font Poppins → admin login via Firebase Auth atau karyawan via Firestore subcollection lookup → sesi di AsyncStorage" },
        { step: "Dashboard (Beranda)", detail: "Dashboard sadar-role menampilkan metrik utama (penjualan hari ini, produk aktif, transaksi tertunda) dengan tombol aksi cepat untuk transaksi baru, tambah produk, dan cek stok" },
        { step: "Transaksi Baru", detail: "Cari/jelajahi produk → atur jumlah → review keranjang → pilih metode bayar: Tunai (hitung kembalian otomatis) atau Online (Midtrans Snap dengan QRIS/GoPay/OVO)" },
        { step: "Pemrosesan Pembayaran", detail: "Tunai: masukkan nominal dibayar → hitung kembalian otomatis → simpan ke Firestore → kurangi stok. Online: generate Snap token via Express server → buka Midtrans SDK → webhook update status" },
        { step: "Struk & Berbagi", detail: "Struk digital dihasilkan via expo-print → bagikan sebagai teks melalui WhatsApp, Email, atau aplikasi lain melalui Expo Sharing API" },
        { step: "Manajemen Stok", detail: "Tambah/edit produk dengan kategori, harga, dan gambar → lacak stok dengan tanggal kedaluwarsa dan catatan supplier → distribusikan stok ke karyawan → lihat riwayat pergerakan stok lengkap" },
        { step: "Laporan & Analitik", detail: "5 jenis laporan: omzet per bulan (line chart), produk terlaris (pie chart), produk terjual (detail dengan filter periode), transaksi penjualan (bar chart), riwayat transaksi karyawan (filter per orang)" },
        { step: "Manajemen Karyawan", detail: "Admin menambah karyawan dengan role (kasir/inventaris/manajer) → setiap karyawan memiliki akses terbatas via RoleGuard → admin memantau semua transaksi karyawan" },
      ],
      siteArchitecture: [
        { section: "Auth", type: "Login dual-role", description: "Splash screen → Firebase Auth (admin) atau Firestore lookup (karyawan) → redirect berbasis peran ke dashboard" },
        { section: "Dashboard", type: "Beranda sadar-role", description: "Metrik utama, tombol aksi cepat, visibilitas kartu berdasarkan peran — kasir melihat transaksi, inventaris melihat alert stok" },
        { section: "Transaksi", type: "Terminal POS", description: "Pencarian produk, manajemen keranjang, penyesuaian jumlah, pemilihan pembayaran tunai/online, hitung kembalian otomatis" },
        { section: "Pembayaran", type: "Midtrans Snap + QRIS", description: "Online: generasi Snap token → Midtrans SDK. QRIS: generasi payload EMVCo → tampilan QR code → scan pelanggan" },
        { section: "Produk", type: "CRUD + kategori", description: "Tambah/edit produk dengan upload gambar (Cloudinary), kategori, harga, jumlah stok, dan toggle aktif/non-aktif" },
        { section: "Stok", type: "Manajemen inventaris", description: "Riwayat stok dengan log pergerakan, pelacakan tanggal kedaluwarsa, manajemen supplier, distribusi stok ke karyawan" },
        { section: "Laporan", type: "5 jenis chart", description: "Omzet per bulan (line), produk terlaris (pie), produk terjual (detail), transaksi penjualan (bar), riwayat karyawan (filter)" },
        { section: "Karyawan", type: "Sistem multi-role", description: "CRUD admin untuk karyawan dengan penetapan peran, komponen RoleGuard untuk kontrol akses deklaratif, riwayat transaksi per karyawan" },
        { section: "Pengaturan", type: "Konfigurasi toko", description: "Profil toko (nama, alamat, logo), kustomisasi template struk, ubah password" },
        { section: "Server", type: "Webhook Express", description: "Server Node.js mandiri untuk generasi token Midtrans Snap dan callback status pembayaran" },
      ],
    },
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
