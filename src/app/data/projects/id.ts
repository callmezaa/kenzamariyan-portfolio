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
    role: "Pengembang Full-Stack",
    year: "2025",
    client: "Hackathon",
    category: "Aplikasi Web",
    timeline: "2026",
    features: [
      {
        title: "Analisis AI Instan",
        description: "Unggah kontrak sebagai PDF, DOCX, atau TXT dan dapatkan analisis terstruktur dalam waktu kurang dari 15 detik — skor risiko, deteksi red flag, rincian klausul kunci, dan terjemahan istilah hukum ke bahasa awam.",
        screenshot: "/image/contract-chill/screenshot/analysizpage.png",
        screenshotLabel: "Laporan analisis",
      },
      {
        title: "4 Persona AI",
        description: "Teman Santai, Pengacara Galak, Mentor Korporat, dan Senior Freelancer — empat gaya bahasa berbeda yang menjelaskan kontrak yang sama, dari santai hingga galak.",
        screenshot: "/image/contract-chill/screenshot/livedemopage.png",
        screenshotLabel: "Demo langsung persona",
      },
      {
        title: "Generator Kontrak",
        description: "Susun kontrak baru dan skrip negosiasi dari nol dengan nada yang bisa disesuaikan — Ramah, Tegas, atau Keras.",
        screenshot: "/image/contract-chill/screenshot/contractgeneratorpage.png",
        screenshotLabel: "Generator kontrak",
      },
      {
        title: "Panduan Cara Kerja",
        description: "Panduan langkah demi langkah yang mengantar pengguna baru dari unggah file hingga memahami kontrak mereka dalam hitungan menit.",
        screenshot: "/image/contract-chill/screenshot/howitsworkpage.png",
        screenshotLabel: "Cara kerja",
      },
      {
        title: "Riwayat Analisis",
        description: "Setiap analisis tersimpan di Firestore — kunjungi kembali kontrak lama, bandingkan skor risiko, dan ekspor laporan PDF premium kapan saja.",
        screenshot: "/image/contract-chill/screenshot/historypage.png",
        screenshotLabel: "Riwayat",
      },
      {
        title: "Autentikasi Aman",
        description: "Firebase Auth dengan login Google dan email, API dengan rate limit, dan isolasi data per pengguna sejak hari pertama.",
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
        { name: "client/", tech: "React 19 + Vite 8 + TypeScript 6", description: "SPA dengan TanStack Query, Firebase Web SDK, i18next, dukungan PWA, dan pustaka komponen motion kustom" },
        { name: "server/", tech: "Express 5 + Firebase Admin", description: "REST API dengan upload Multer, rate limiting, keamanan Helmet/CORS, validasi Zod, dan integrasi Gemini AI" },
        { name: "shared/", tech: "@chill/shared types", description: "Tipe TypeScript bersama (AnalysisResult, RedFlag, Persona, RiskLevel) yang digunakan oleh client dan server" },
      ],
      decisions: [
        { decision: "Express 5 daripada Next.js API Routes", reason: "Fleksibilitas monorepo — scaling independen, paket tipe bersama, pemisahan kepentingan antara SPA dan API" },
        { decision: "Firestore daripada PostgreSQL", reason: "Sinkronisasi real-time untuk riwayat analisis, scaling serverless, tanpa overhead migrasi — ideal untuk prototyping cepat" },
        { decision: "Build Docker multi-stage", reason: "Build 5-layer menghasilkan image produksi yang minimal, memastikan lingkungan dev/prod yang konsisten" },
        { decision: "pdf-parse + fallback OCR Tesseract.js", reason: "Menangani PDF digital dan hasil scan dengan mulus — OCR hanya aktif jika teks yang diekstrak < 50 karakter" },
        { decision: "Gemini 2.5 Flash", reason: "Inferensi cepat (<15 detik), kemampuan output JSON terstruktur, hemat biaya untuk anggaran hackathon" },
        { decision: "Firebase Auth", reason: "Google + Email/Password langsung tersedia, tanpa manajemen sesi server-side, terintegrasi dengan Firestore" },
        { decision: "npm workspaces", reason: "Monorepo tanpa overhead Lerna/Nx, tipe bersama lintas client/server dengan konfigurasi minimal" },
      ],
      endpoints: [
        { method: "POST", path: "/api/analyze", auth: true, rate: "5/hr", purpose: "Upload kontrak + analisis AI" },
        { method: "POST", path: "/api/chat", auth: true, rate: "20/hr", purpose: "Tanya jawab lanjutan tentang kontrak yang dianalisis" },
        { method: "POST", path: "/api/generate-script", auth: true, rate: "20/hr", purpose: "Menghasilkan skrip negosiasi" },
        { method: "POST", path: "/api/generate-contract", auth: true, rate: "20/hr", purpose: "Menghasilkan draf kontrak" },
        { method: "POST", path: "/api/upload-photo", auth: true, rate: "None", purpose: "Upload foto profil" },
      ],
      dataFlow: [
        "Pengguna mengunggah kontrak (PDF/DOCX/TXT) melalui Dashboard",
        "Multer menerima file (penyimpanan memory, batas 10MB)",
        "Middleware Firebase Auth memverifikasi token Bearer",
        "Rate limiter memeriksa (5 req/jam per IP untuk analisis)",
        "Ekstraksi teks: pdf-parse → jika <50 karakter → fallback OCR (Tesseract.js, timeout 120 detik)",
        "Simpan file ke /uploads/ dengan nama file UUID",
        "Panggilan Gemini API dengan prompt persona + teks kontrak",
        "Parsing JSON dengan logika retry (2x pada 503, jeda 2 detik)",
        "Kembalikan AnalysisResult + fileUrl ke client",
        "Client menghitung skor risiko → merender analisis",
        "Simpan ke Firestore: analyses/{docId}",
      ],
      deployment: [
        "Tahap 1 (deps): npm ci — menginstal semua dependensi workspace",
        "Tahap 2 (shared): tsc — mengompilasi tipe @chill/shared",
        "Tahap 3 (client): vite build — React SPA produksi",
        "Tahap 4 (server): tsc — mengompilasi Express API",
        "Tahap 5 (runner): node:20-alpine — user non-root (uid 1001), PORT 8080",
        "Express melayani client/dist/ sebagai file statis di produksi",
        "Auto-deploy dari push GitHub melalui Railway",
      ],
    },
    diagram: {
      frontend: { label: "FRONTEND (React SPA)", tech: "React 19 · Vite 8 · TanStack Query · Firebase Web SDK · i18next · PWA" },
      backend: { label: "BACKEND (Express 5 API)", tech: "Multer · Rate Limiting · Helmet/CORS · Firebase Admin · Zod Validation" },
      arrow: { label: "axios + Firebase ID Token" },
      services: [
        { name: "Gemini AI API", description: "gemini-2.5-flash · JSON terstruktur · Prompt persona" },
        { name: "Firestore", description: "analyses/{docId} · userId, fileName, persona, result, fileUrl" },
      ],
    },
    aiPipeline: {
      personas: [
        { name: "Teman Santai", tone: "Santai, akrab, 'teman nongkrong'", example: "Gila sih bro, klausul ini bahaya banget — kamu bisa rugi gede kalau tanda tangan gini.", icon: "😎" },
        { name: "Pengacara Galak", tone: "Galak, protektif, suka menegur", example: "WANPRESTASI! Klausul ini JELAS merugikan kamu. Jangan berani tanda tangan tanpa negosiasi!", icon: "⚖️" },
        { name: "Mentor Korporat", tone: "Strategis, profesional, seimbang", example: "Pertimbangkan untuk menegosiasikan pasal ini — ada ruang untuk win-win solution.", icon: "👔" },
        { name: "Senior Freelancer", tone: "Praktis, cerdas, empatik", example: "Gue dulu kena tipu gini juga. Ini yang harus kamu lakuin sebelum tanda tangan...", icon: "🧑‍💻" },
      ],
      riskFormula: { high: 35, medium: 15, cap: 100 },
      extractionFlow: [
        { step: "Upload PDF", detail: "pdf-parse mengekstrak teks dari PDF digital" },
        { step: "Fallback OCR", detail: "Jika teks yang diekstrak < 50 karakter, Tesseract.js aktif dengan model ind+eng, timeout 120 detik" },
        { step: "Dukungan TXT", detail: "Pembacaan UTF-8 langsung untuk file teks biasa" },
        { step: "Routing Persona", detail: "Teks kontrak + prompt persona dikirim ke Gemini 2.5 Flash" },
        { step: "Parsing JSON", detail: "Ekstraksi regex {…} dari respons, di-parse ke AnalysisResult" },
        { step: "Logika Retry", detail: "Hingga 2 kali retry pada 503 (Service Unavailable) dengan jeda 2 detik" },
      ],
      outputSchema: [
        { field: "summary", type: "string", description: "Ringkasan kontrak singkat dalam gaya persona" },
        { field: "redFlags[]", type: "RedFlag[]", description: "Bendera risiko dengan klausul, tingkat risiko, penjelasan, dan skrip negosiasi yang disarankan" },
        { field: "negotiationSuggestions", type: "string[]", description: "Tips negosiasi strategis" },
        { field: "clauses[]", type: "Clause[]", description: "6-8 rincian klausul kunci dengan penjelasan bahasa sederhana" },
        { field: "jargons[]", type: "Jargon[]", description: "3-5 definisi istilah hukum yang diterjemahkan ke bahasa sederhana" },
        { field: "personaExplanation", type: "string", description: "Kata penutup persona + penyangkalan hukum (disclaimer)" },
      ],
    },
    codeSnippets: [
      {
        title: "Layanan Gemini — Konstruksi Prompt Persona",
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
        reason: "Mendemonstrasikan integrasi AI terstruktur dengan prompt engineering berbasis persona dan ekstraksi JSON yang andal",
      },
      {
        title: "Middleware Auth — Verifikasi Token Firebase",
        language: "typescript",
        code: `export const authMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token tidak tersedia' });
  }
  try {
    const idToken = authHeader.split('Bearer ')[1];
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = { uid: decodedToken.uid, email: decodedToken.email! };
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token tidak valid' });
  }
};`,
        reason: "Menunjukkan autentikasi kelas enterprise dengan Firebase Admin SDK — ekstraksi token, verifikasi, dan injeksi konteks pengguna",
      },
      {
        title: "Algoritma Skor Risiko",
        language: "typescript",
        code: `const calculateRiskScore = (redFlags: RedFlag[]) => {
  if (!redFlags || redFlags.length === 0) return 0;
  const highRiskCount = redFlags.filter(f => f.risk === 'High').length;
  const mediumRiskCount = redFlags.filter(f => f.risk === 'Medium').length;
  let score = (highRiskCount * 35) + (mediumRiskCount * 15);
  return Math.min(score, 100);
};

// Ambang batas: 0-29% Aman (hijau) | 30-59% Sedang (kuning) | 60-100% Risiko Tinggi (merah)`,
        reason: "Perhitungan risiko sisi client — mendemonstrasikan algoritma skor berbobot dengan batas aman",
      },
      {
        title: "Rate Limiting — Konfigurasi Dual Limiter",
        language: "typescript",
        code: `const analyzeLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 jam
  max: 5, // 5 permintaan per jam per IP
  message: { error: 'Terlalu banyak permintaan analisis. Coba lagi dalam satu jam.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const chatLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 20, // 20 permintaan per jam per IP
  message: { error: 'Terlalu banyak permintaan. Mohon pelan-pelan.' },
});

// Terapkan per-route: router.post('/analyze', authMiddleware, analyzeLimiter, controller.analyze);`,
        reason: "Melindungi free tier Gemini API dari penyalahgunaan — mendemonstrasikan strategi rate limiting yang siap produksi",
      },
      {
        title: "Penanganan Error — Pola AppError + asyncHandler",
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

// Global handler di index.ts:
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.message,
      code: err.code,
    });
  }
  res.status(500).json({ error: 'Terjadi kesalahan internal server' });
});`,
        reason: "Pola penanganan error yang bersih — kelas error kustom, pembungkus async, dan global handler untuk respons API yang konsisten",
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
    client: "KPJMI — Koperasi Petani Jaya Makmur",
    category: "Profil Perusahaan",
    timeline: "2026",
    features: [
      {
        title: "Tata Letak Majalah Editorial",
        description: "Hero full-bleed, image mask organik, dan kartu kutipan kaca dalam sistem desain editorial Swiss premium.",
        screenshot: "/image/koperasi-kpjmi/homepage.png",
        screenshotLabel: "Beranda",
      },
      {
        title: "Timeline Visi & Misi",
        description: "Kartu misi zigzag dengan animasi scroll staggered dan banner komitmen di atas gambar.",
        screenshot: "/image/koperasi-kpjmi/visidanmisi.png",
        screenshotLabel: "Visi dan misi",
      },
      {
        title: "Showcase Produk",
        description: "Foto asli Permen Pepaya, Keripik, dan Sabun dengan badge kategori dan CTA WhatsApp.",
        screenshot: "/image/koperasi-kpjmi/product.png",
        screenshotLabel: "Produk",
      },
      {
        title: "Lightbox Galeri",
        description: "Grid foto dengan filter dan lightbox Embla — autoplay dan overlay drag-to-dismiss.",
        screenshot: "/image/koperasi-kpjmi/gallery.png",
        screenshotLabel: "Galeri",
      },
      {
        title: "Kontak & Lokasi",
        description: "Bagian kontak terintegrasi WhatsApp dengan embed Google Maps langsung untuk kantor Banyumas.",
        screenshot: "/image/koperasi-kpjmi/contact.png",
        screenshotLabel: "Kontak",
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
    slug: "interviewos",
    title: "InterviewOS — Platform Wawancara Bertenaga AI",
    summary:
      "Platform wawancara teknis real-time kelas produksi yang menggabungkan panggilan video WebRTC P2P, pengeditan kode tersinkronisasi, whiteboard kolaboratif, perekaman layar, dan transkripsi suara-ke-teks langsung ke dalam satu sistem operasi untuk perekrutan.",
    challenge:
      "Wawancara teknis terfragmentasi di berbagai platform seperti Zoom, CoderPad, Loom, dan lembar evaluasi manual — menciptakan gesekan, perpindahan konteks, dan pengalaman kandidat yang tidak konsisten bagi tim engineering.",
    solution:
      "Mengarsitektur monorepo full-stack (frontend Next.js 16 + backend NestJS 11 + shared types) yang menampilkan video WebRTC P2P dengan sinyal Socket.io yang dijaga identitas JWT dan pengecekan keanggotaan database, Monaco Editor tersinkronisasi dengan riwayat revisi ter-throttle, whiteboard kolaboratif, perekaman MediaRecorder dengan storage adapter pluggable, serta lapisan AI Gemini 2.5 Flash untuk transkripsi langsung, generate soal coding otomatis, dan penilaian wawancara terstruktur — semuanya dibungkus sistem desain gelap terinspirasi Apple dengan auth berbasis cookie, 2FA, OAuth, dan rate limiting per-route.",
    impact:
      "Menghadirkan platform komprehensif yang mengintegrasikan WebRTC, pengeditan kolaboratif, transkripsi AI langsung, logging proctoring, dan bank soal komunitas dengan vote dan bookmark — diperkuat proteksi flood per-socket dan ownership guard, didukung unit test Vitest/Jest, E2E Playwright, monitoring Sentry, dan analitik PostHog.",
    stack: ["Next.js 16", "React 19", "NestJS 11", "TypeScript", "WebRTC", "Socket.io", "Monaco Editor", "Google Gemini AI", "Prisma", "PostgreSQL", "Redis", "Zustand"],
    role: "Pengembang Full-Stack & Arsitek Sistem",
    year: "2026",
    client: "Inisiatif mandiri — Open Source",
    category: "Platform Wawancara",
    timeline: "2026",
    features: [
      {
        title: "Ruang Wawancara Real-time",
        description: "Grid video WebRTC P2P dengan whiteboard kolaboratif, drawer chat, dan gelombang suara live dalam satu workspace.",
        screenshot: "/image/interviewOS/interviewroom.png",
        screenshotLabel: "Ruang wawancara",
      },
      {
        title: "Editor Kode Tersinkron",
        description: "Monaco Editor yang tersinkron antar peserta dengan riwayat revisi throttled dan eksekusi kode Wandbox.",
        screenshot: "/image/interviewOS/featuressection.png",
        screenshotLabel: "Fitur",
      },
      {
        title: "Dashboard Penjadwalan",
        description: "Wawancara mendatang dan lampau, feed aktivitas, dan aksi cepat dengan error boundary terinstrumentasi Sentry.",
        screenshot: "/image/interviewOS/dashboardpage.png",
        screenshotLabel: "Dashboard",
      },
      {
        title: "Autentikasi Aman",
        description: "Auth JWT berbasis cookie dengan 2FA, provider OAuth, sesi perangkat, dan rate limit per route.",
        screenshot: "/image/interviewOS/loginpage.png",
        screenshotLabel: "Login",
      },
    ],
    sourceUrl: "https://github.com/callmezaa/InterviewOS",
    demoUrl: "https://interviewos-dev.vercel.app",
    type: "interviewos",
    featured: true,
    badge: "Open Source",
    metrics: ["P2P WebRTC Video", "Kode + Whiteboard Tersinkron", "Transkripsi Gemini Live", "Auth JWT + 2FA"],
    accent: {
      glow: "rgba(0, 102, 204, 0.14)",
      color: "#0066cc",
    },
    architecture: {
      monorepo: [
        { name: "apps/frontend/", tech: "Next.js 16 + React 19 + Zustand", description: "UI App Router dengan Monaco Editor, socket.io-client, custom hooks (useWebRTC, useInterviewRoom, useRecording, useFocusTrap), 7 Zustand store, highlighting Shiki, serta instrumentasi Sentry + PostHog" },
        { name: "apps/backend/", tech: "NestJS 11 + Prisma + PostgreSQL", description: "REST API (/api/*) plus Socket.io RealtimeGateway — autentikasi Passport JWT dengan 2FA/OAuth, rate limit @nestjs/throttler, pengecekan OwnershipGuard, dan folder fitur modular (auth, interview, realtime, media, ai, questions, integrations)" },
        { name: "apps/shared/", tech: "@interviewos/shared", description: "Tipe TypeScript bersama dan peta compiler/bahasa yang dikonsumsi frontend dan backend — contoh COMPILER_MAP yang merutekan bahasa ke id compiler Wandbox" },
      ],
      decisions: [
        { decision: "Socket.io gateway self-hosted daripada SaaS realtime", reason: "Kontrol penuh atas signaling, otorisasi ruangan, dan skema event dalam satu proses NestJS — tanpa biaya per-menit vendor untuk menit video" },
        { decision: "Identitas dari JWT terverifikasi, bukan payload klien", reason: "join-room mencocokkan userId klaim dengan sub JWT dan membaca role dari database — payload palsu tidak akan pernah bisa menyamar sebagai peer lain" },
        { decision: "Gerbang keanggotaan database sebelum masuk ruangan", reason: "Lookup Participant pada composite unique (userId, interviewId) memastikan hanya kandidat/interviewer terjadwal yang menerima state ruangan atau sinyal" },
        { decision: "Rate limiter per-socket (40 event/detik)", reason: "grantAccess() menjadi gerbang semua handler tulis/siar — satu sliding window ringan berfungsi ganda sebagai proteksi flood dan otorisasi berbasis ruangan" },
        { decision: "Gemini 2.5 Flash multimodal untuk STT alih-alih pipeline Whisper terpisah", reason: "Chunk audio mentah dikirim inline sebagai base64 ke model yang sama untuk evaluasi dan generate soal — satu API key, satu integrasi, fallback mock tanpa key" },
        { decision: "Checkpoint riwayat kode ter-throttle (interval 5 detik, batas 500)", reason: "Ketukan tombol tersimpan instan untuk pemulihan crash sementara snapshot revisi tetap terbatas — timeline yang bisa diputar ulang tanpa membengkakkan database" },
        { decision: "Adapter Redis pub/sub di balik env flag", reason: "REDIS_URL mengalihkan Socket.io ke adapter Redis untuk fan-out multi-instance; bila kosong, fallback ke adapter in-memory membuat dev lokal sederhana" },
        { decision: "Storage factory (local/S3/GCS) untuk rekaman", reason: "Blob MediaRecorder diunggah melalui interface StorageFactory — target deployment bisa menukar object storage tanpa menyentuh kode fitur" },
      ],
      endpoints: [
        { method: "POST", path: "/api/auth/register", auth: false, rate: "3/menit", purpose: "Buat akun, terbitkan cookie httpOnly access + refresh, catat device session" },
        { method: "POST", path: "/api/auth/login", auth: false, rate: "5/menit", purpose: "Login — mengembalikan token tantangan 2FA saat two-factor aktif" },
        { method: "POST", path: "/api/auth/refresh", auth: false, rate: "None", purpose: "Rotasi refresh token dan terbitkan ulang access token" },
        { method: "DELETE", path: "/api/auth/sessions/:id", auth: true, rate: "None", purpose: "Cabut session perangkat tertentu (daftar via GET /sessions)" },
        { method: "POST", path: "/api/interviews", auth: true, rate: "Throttled", purpose: "Jadwalkan wawancara dengan template, email kandidat, dan pola recurrence opsional" },
        { method: "PATCH", path: "/api/interviews/:id/reschedule", auth: true, rate: "OwnershipGuard", purpose: "Jadwal ulang — decorator ownership memverifikasi interviewer pemohon" },
        { method: "POST", path: "/api/interviews/:id/evaluate", auth: true, rate: "5/menit", purpose: "Generate laporan evaluasi AI dari kode akhir + transkrip" },
        { method: "POST", path: "/api/interviews/run-code", auth: true, rate: "10/menit", purpose: "Eksekusi kode di sandbox Wandbox via COMPILER_MAP shared" },
      ],
      dataFlow: [
        "Login menyetel cookie httpOnly access/refresh; metadata perangkat (UA, IP, OS) disimpan sebagai baris Session untuk pencabutan nanti",
        "Klien membuka koneksi Socket.io dengan JWT via handshake.auth atau cookie — token invalid langsung diputus",
        "join-room memverifikasi subjek JWT, lalu mengonfirmasi keanggotaan lewat tabel Participant sebelum socket diterima",
        "Joiner menerima state ruangan: peer terhubung, codeContent, bahasa, bentuk whiteboard, dan riwayat kode",
        "Pesan offer/answer/ICE WebRTC direlay peer-to-peer melalui pasangan event webrtc-signal",
        "Setiap code-change disiarkan ke peer dan disimpan ke Interview.codeContent; snapshot di-throttle ke codeHistory tiap 5 detik (maks 500)",
        "Level mikrofon disampling lokal dan direlay sebagai puncak audio-level untuk menggerakkan gelombang pembicara live",
        "Chunk audio dialirkan ke transkripsi multimodal Gemini 2.5 Flash; segmen disiarkan ke ruangan dan ditambahkan ke Interview.transcript",
        "Event tab/fokus di-throttle sisi klien, direlay sebagai proctoring-event, disimpan ke proctoringLogs, dan bisa dianotasi alasan dari kandidat",
        "Rekaman berhenti → file .webm diunggah melalui storage adapter (local/S3/GCS) → URL, ukuran, durasi disimpan ke interview",
        "Endpoint evaluate mengirim kode akhir + entri transkrip terakhir ke Gemini → skor terstruktur {score, technicalRating, communicationRating, review} disimpan sebagai feedback",
      ],
      deployment: [
        "Infrastruktur lokal: npm run db:up menjalankan PostgreSQL + Redis via docker-compose",
        "npm run db:migrate menjalankan prisma migrate + generate di workspace backend",
        "Script workspace root menjalankan kedua app secara konkuren — Next.js (:3000) dan NestJS (:3001)",
        "CI via GitHub Actions: ci.yml (lint/typecheck/unit), preview.yml (preview PR), deploy.yml (produksi)",
        "Backend dikirim ke Railway melalui nixpacks.toml + Dockerfile; frontend deploy ke Vercel",
        "REDIS_URL mengaktifkan adapter Socket.io Redis untuk scaling horizontal; selain itu adapter in-memory",
      ],
    },
    diagram: {
      frontend: { label: "FRONTEND (Next.js App Router)", tech: "Next.js 16 · React 19 · Monaco Editor · socket.io-client · Zustand 5 · Tailwind CSS v4 · Shiki" },
      backend: { label: "BACKEND (NestJS 11 API + Gateway)", tech: "REST /api/* · Socket.io RealtimeGateway · Passport JWT + 2FA · @nestjs/throttler · Prisma ORM" },
      arrow: { label: "HTTPS REST · WebSocket signaling, ketukan tombol & transkrip" },
      services: [
        { name: "PostgreSQL", description: "Skema terkelola Prisma — users, interviews, participants, bank soal, template, organisasi, integrasi" },
        { name: "Redis", description: "Adapter pub/sub Socket.io untuk fan-out multi-instance (opsional via REDIS_URL)" },
        { name: "Gemini 2.5 Flash", description: "Transkripsi audio multimodal · evaluasi terstruktur · generate soal" },
        { name: "Wandbox Sandbox", description: "Endpoint eksekusi kode remote yang dirutekan COMPILER_MAP shared" },
      ],
    },
    codeSnippets: [
      {
        title: "Otorisasi Ruangan — Identitas JWT + Gerbang Keanggotaan",
        language: "typescript",
        code: `@SubscribeMessage('join-room')
async handleJoinRoom(@ConnectedSocket() client: Socket, data: JoinRoomDto) {
  // Jangan percai payload — identitas datang dari JWT terverifikasi.
  const user = client.data.user;
  if (!user?.sub || !user.role) return client.disconnect(true);
  if (data.userId && data.userId !== user.sub) {
    this.logger.warn(\`Join ditolak: klaim \${data.userId} != JWT \${user.sub}\`);
    return client.disconnect(true);
  }

  // Hanya peserta terjadwal boleh masuk ruangan.
  const participant = await this.prisma.participant.findUnique({
    where: { userId_interviewId: { userId: user.sub, interviewId: data.interviewId } },
    select: { role: true, user: { select: { name: true } } },
  });
  if (!participant) {
    return client.emit('join-error', { message: 'Bukan peserta wawancara ini' });
  }

  await client.join(data.interviewId);
  this.socketUserDetails.set(client.id, {
    userId: user.sub,
    userName: participant.user?.name,
    userRole: participant.role, // role dari DB, bukan dari klien
  });
}`,
        reason: "Penguatan otorisasi ruangan — identitas dicocokkan dengan JWT terverifikasi dan keanggotaan ditegakkan dari database, sehingga payload palsu tidak akan pernah bisa masuk wawancara orang lain",
      },
      {
        title: "Proteksi Flood — Sliding Window grantAccess()",
        language: "typescript",
        code: `private grantAccess(client: Socket, interviewId: string): boolean {
  // Socket hanya boleh bertindak pada ruangan yang benar-benar dimasuki.
  if (this.socketRooms.get(client.id) !== interviewId) return false;

  const now = Date.now();
  let entry = this.rateLimits.get(client.id);
  if (!entry || now - entry.windowStart >= RATE_LIMIT_WINDOW_MS) {
    entry = { windowStart: now, count: 0 };
    this.rateLimits.set(client.id, entry);
  }
  entry.count++;
  return entry.count <= RATE_LIMIT_MAX_EVENTS; // 40 event/detik
}

// Semua handler tulis/siar menjadi gerbang padanya:
@SubscribeMessage('code-change')
handleCodeChange(client: Socket, data: CodeChangeDto) {
  if (!this.grantAccess(client, data.interviewId)) return;
  /* siarkan + simpan */
}`,
        reason: "Satu sliding window berbasis Map memberikan otorisasi berbasis ruangan sekaligus kontrol flood — tanpa dependensi rate-limit eksternal di layer WebSocket",
      },
      {
        title: "Riwayat Revisi Terbatas — Checkpoint Ter-throttle",
        language: "typescript",
        code: `client.to(interviewId).emit('code-updated', codeContent);

await this.prisma.interview.update({
  where: { id: interviewId },
  data: { codeContent }, // persistensi instan untuk pemulihan crash
});

const now = Date.now();
const lastSave = this.lastHistoryTimes.get(interviewId) ?? 0;
if (now - lastSave > 5000) {           // snapshot maksimal tiap 5 detik
  this.lastHistoryTimes.set(interviewId, now);
  const history = interview.codeHistory ?? [];
  if (history.length < 500) {          // batas keras per interview
    history.push({ codeContent, language, timestamp: new Date().toISOString() });
    await this.prisma.interview.update({
      where: { id: interviewId },
      data: { codeHistory: history },
    });
  }
}`,
        reason: "Ketukan tombol live langsung tersimpan sementara snapshot revisi tetap throttled dan terbatas — timeline kode yang bisa diputar ulang tanpa pernah membengkakkan database",
      },
      {
        title: "Transkripsi Multimodal Gemini",
        language: "typescript",
        code: `async transcribeAudioStream(chunk: Buffer, mimeType = 'audio/webm') {
  if (!this.hasValidKey()) {
    return 'Segmen transkripsi mock.'; // fallback dev yang graceful
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
        reason: "Speech-to-text tanpa hosting model Whisper terpisah — chunk audio mentah dikirim inline ke endpoint multimodal Gemini 2.5 Flash, dengan fallback mock saat API key tidak dikonfigurasi",
      },
    ],
    siteMap: {
      userRoles: [
        { role: "Interviewer", description: "Menjadwalkan dan memimpin wawancara teknis live", needs: "Menyiapkan sesi dari template kurasi atau soal hasil generate AI, memantau sinyal proctoring secara live, dan mengakhiri dengan laporan evaluasi terstruktur.", icon: "🧑‍💼" },
        { role: "Kandidat", description: "Mengikuti wawancara coding yang diundang langsung dari browser", needs: "Masuk ruangan dari undangan tanpa instalasi apa pun, menulis kode di editor yang familiar, dan menjelaskan solusi lewat suara, chat, dan whiteboard.", icon: "👨‍💻" },
        { role: "Reviewer", description: "Mengevaluasi sesi yang telah selesai secara asinkron", needs: "Memutar ulang rekaman, membaca transkrip, memeriksa log proctoring dan skor AI, lalu membagikan temuan lewat tautan token aman.", icon: "🔍" },
      ],
      userFlow: [
        { step: "Penjadwalan", detail: "Interviewer memilih template atau generate soal berdasarkan role/level/difficulty; sesi bisa berulang harian, mingguan, dua mingguan, atau bulanan sebagai seri terkelola" },
        { step: "Undangan", detail: "Email kandidat melampirkannya sebagai participant CANDIDATE; autentikasi mencakup email/password, OAuth Google/GitHub, dan magic login token" },
        { step: "Gabung", detail: "Handshake socket ter-autentikasi JWT plus pengecekan keanggotaan database; joiner menerima peers, kode, bahasa, dan state whiteboard dalam satu snapshot" },
        { step: "Sesi Live", detail: "Video P2P dengan sinkronisasi status mute, editing Monaco dengan remote cursor, menggambar whiteboard dengan presence kursor, chat, dan gelombang suara" },
        { step: "Proctoring", detail: "Perpindahan tab dan hilangnya fokus mengalir ke ruangan dan tersimpan sebagai log; kandidat dapat melampirkan alasan yang terikat pada event yang ditandai" },
        { step: "Penutupan", detail: "Rekaman .webm diunggah melalui storage adapter sementara transkrip telah terakumulasi segmen demi segmen selama panggilan" },
        { step: "Review", detail: "Evaluasi AI menghasilkan skor, rating teknikal/komunikasi, dan tinjauan tertulis; share token membuka laporan read-only untuk keputusan hiring asinkron" },
      ],
      siteArchitecture: [
        { section: "Dashboard", type: "Ringkasan + analitik", description: "Wawancara mendatang dan lampau, feed aktivitas, dan aksi cepat dengan error boundary ber-instrumentasi Sentry" },
        { section: "Penjadwalan", type: "CRUD + engine recurrence", description: "Buat, jadwal ulang, batalkan; baris RecurringPattern mematerialisasi seri DAILY/WEEKLY/BIWEEKLY/MONTHLY dengan batas kemunculan" },
        { section: "Ruang Wawancara", type: "Workspace real-time", description: "Grid video, editor Monaco dengan pemilih bahasa dan test runner, canvas whiteboard, drawer chat, dan strip gelombang suara" },
        { section: "Bank Soal", type: "Komunitas + kurasi", description: "Kategori, tag, filter difficulty, vote naik/turun, bookmark, penghitung view dan usage, plus generate AI" },
        { section: "Template", type: "Kit wawancara reusable", description: "Starter code + test case per kategori stack (FRONTEND/BACKEND/DSA) dengan statistik vote dan usage" },
        { section: "Review & Feedback", type: "Laporan pasca-sesi", description: "Dashboard evaluasi AI, pembaca transkrip, pemutaran rekaman, dan tautan share-token" },
        { section: "Integrasi", type: "Routing notifikasi", description: "Provider Slack, Discord, dan webhook generik dengan aktivasi per-user dan pembatasan tipe notifikasi" },
        { section: "Pengaturan", type: "Profil & keamanan", description: "Unggah avatar, ubah password, setup 2FA dengan backup code, manajemen sesi aktif, dan preferensi notifikasi" },
      ],
    },
  },
  {
    slug: "assetra",
    title: "Assetra — Pasar Aset Digital",
    summary:
      "Marketplace aset digital full-stack tempat kreator menjual kit UI, template, dan ikon — dengan pembayaran Midtrans terverifikasi end-to-end, isolasi data Row Level Security, chat pembeli-penjual real-time, dan pengiriman file via Signed URL.",
    challenge:
      "Kreator tidak memiliki platform khusus untuk memonetisasi aset digital dengan pengiriman file yang aman, pembayaran lokal yang terintegrasi, dan komunikasi pembeli-penjual secara real-time — marketplace global memotong komisi besar dan tidak mendukung metode pembayaran Indonesia seperti QRIS dan e-wallet.",
    solution:
      "Membangun marketplace di atas Next.js 16 App Router dengan Supabase sebagai layer backend: skema PostgreSQL yang dijaga kebijakan Row Level Security, trigger database yang otomatis menyediakan profil kreator saat signup, checkout Midtrans Snap dengan webhook idempoten terverifikasi SHA-512, storage bucket privat dengan Signed URL berkala-waktu, chat dan notifikasi real-time lewat channel Supabase, serta struk email React via Resend — dengan mayoritas mutasi ditangani Server Actions berkolokasi alih-alih layer API terpisah.",
    impact:
      "Menghadirkan marketplace dua arah kelas produksi: server-side filtering dan paginasi, dompet kreator dengan heatmap pendapatan, analitik timeline, permintaan payout, dan ekspor CSV, alur wishlist, sistem follow/review, data terstruktur JSON-LD, serta skeleton loading states di setiap batas asinkron.",
    stack: ["Next.js 16", "TypeScript", "Supabase", "PostgreSQL", "Midtrans", "Resend", "Tailwind CSS"],
    role: "Pengembang Full-Stack",
    year: "2026",
    client: "Inisiatif mandiri",
    category: "Marketplace",
    timeline: "2026",
    features: [
      {
        title: "Marketplace Produk",
        description: "Listing terfilter dan paginated untuk UI kit, template, dan ikon — dihitung di Postgres, bukan di client.",
        screenshot: "/image/assetra/marketplacepage.png",
        screenshotLabel: "Marketplace",
      },
      {
        title: "Detail & Pembelian Produk",
        description: "Halaman produk kaya dengan pratinjau, ulasan, wishlist, dan checkout Midtrans Snap.",
        screenshot: "/image/assetra/overviewpage.png",
        screenshotLabel: "Ikhtisar produk",
      },
      {
        title: "Dompet Kreator",
        description: "Heatmap pendapatan, analitik timeline, permintaan payout, dan ekspor CSV untuk penjual.",
        screenshot: "/image/assetra/walletpage.png",
        screenshotLabel: "Dompet",
      },
      {
        title: "Perpustakaan Pembeli",
        description: "Aset yang dibeli dengan unduhan Signed-URL aman yang kedaluwarsa — tanpa path file publik.",
        screenshot: "/image/assetra/librarypage.png",
        screenshotLabel: "Perpustakaan",
      },
      {
        title: "Alur Penerbitan",
        description: "Kreator menerbitkan listing dengan metadata, harga, dan unggahan aset lewat Server Actions bertipe.",
        screenshot: "/image/assetra/addproductpage.png",
        screenshotLabel: "Tambah produk",
      },
      {
        title: "Pengaturan Akun",
        description: "Profil, detail payout, preferensi notifikasi, dan akun OAuth terhubung dalam satu tempat.",
        screenshot: "/image/assetra/settingspage.png",
        screenshotLabel: "Pengaturan",
      },
    ],
    sourceUrl: "https://github.com/callmezaa/assetra-digital-product",
    demoUrl: "https://assetra-digital-product.vercel.app",
    type: "marketplace",
    featured: true,
    metrics: ["Pembayaran Midtrans Snap", "Webhook Terverifikasi SHA-512", "Isolasi Data RLS", "Pengiriman Signed-URL"],
    accent: {
      glow: "rgba(168, 85, 247, 0.14)",
      color: "#a855f7",
    },
    architecture: {
      monorepo: [
        { name: "app/", tech: "Next.js 16 App Router + Server Actions", description: "Route group untuk marketplace, product/[id], halaman seller & profil, dashboard (inventori, wallet, chat, settings), cart, library, dan notifikasi — mutasi tinggal di file actions.ts yang berkolokasi" },
        { name: "app/api/", tech: "Route Handler (hanya 3)", description: "Hanya tiga endpoint HTTP mentah di mana framework harus bertemu dunia luar: /api/marketplace (listing terfilter), /api/download/[productId] (penerbitan Signed URL), /api/webhook/midtrans (callback pembayaran)" },
        { name: "components/", tech: "React + shadcn/ui + chart", description: "Komponen fitur termasuk EarningsHeatmap, EarningsTimeline, SalesChart, IncomeDonutChart, WalletHistoryTabs, PayoutRequestModal, CartDrawer, NotificationBell (realtime), dan template React Email" },
        { name: "database*.sql", tech: "Migrasi SQL terversi", description: "Script berurutan: skema inti → indeks performa → kebijakan RLS storage → setup secure download → skema sistem chat → audit log" },
      ],
      decisions: [
        { decision: "Supabase BaaS alih-alih backend Node/NestJS custom", reason: "Auth (email + OAuth Google/GitHub), Postgres, storage, dan channel realtime dari satu platform — menghilangkan satu tier server penuh untuk dibangun dan diamankan" },
        { decision: "Row Level Security sebagai layer otorisasi", reason: "Aturan kepemilikan hidup sebagai policy SQL (pengecekan auth.uid()) sehingga tidak ada API route yang bisa membocorkan produk, pesanan, atau chat pengguna lain secara tak sengaja" },
        { decision: "Server Actions alih-alih controller REST", reason: "Mutasi adalah fungsi bertipe yang diimpor tepat di samping UI-nya; hanya webhook dan streaming file yang butuh Route Handler mentah" },
        { decision: "Trigger database untuk provisioning profil", reason: "on_auth_user_created menjalankan handle_new_user() (SECURITY DEFINER) untuk menyisipkan baris profil dengan username unik hasil generate — nol pengguna yatim" },
        { decision: "Verifikasi signature SHA-512 di setiap webhook", reason: "Callback Midtrans di-hash terhadap server key sebelum ada perubahan state — permintaan settlement palsu ditolak di pintu" },
        { decision: "Pemrosesan webhook idempoten", reason: "Pesanan yang sudah completed short-circuit lebih awal, jadi Midtrans mengulang event settlement yang sama tidak akan pernah menyisipkan pesanan ganda atau mengirim ulang email" },
        { decision: "Bucket privat + Signed URL untuk file produk", reason: "Aset hasil pembelian tidak pernah berada di path publik — route download memverifikasi kepemilikan pesanan dulu, baru redirect ke Signed URL yang kedaluwarsa" },
        { decision: "Realtime via publikasi supabase_realtime", reason: "Tabel notifications didaftarkan ke publikasi sehingga penjualan/pesan baru mengalir ke klien tanpa polling" },
      ],
      endpoints: [
        { method: "GET", path: "/api/marketplace", auth: false, rate: "Static gen + ISR", purpose: "Listing produk terfilter dan terpaginasi yang dihitung di dalam Postgres" },
        { method: "GET", path: "/api/download/[productId]", auth: true, rate: "Cek per-order", purpose: "Memverifikasi kepemilikan pembelian, lalu menerbitkan Storage Signed URL berkala" },
        { method: "POST", path: "/api/webhook/midtrans", auth: false, rate: "Gerbang signature", purpose: "Callback pembayaran — verifikasi SHA-512 → cek idempotensi → insert pesanan, bersihkan wishlist, notifikasi seller, email struk" },
        { method: "POST", path: "Server Actions (~15)", auth: true, rate: "Terikat sesi", purpose: "Mutasi bertipe untuk auth, checkout cart, CRUD produk, pesan chat, payout wallet, dan settings" },
      ],
      dataFlow: [
        "Signup menuju Supabase Auth → trigger on_auth_user_created menyediakan baris profiles dengan username unik",
        "Kreator mengunggah produk: biner ke bucket Storage privat, metadata ke products di bawah policy tulis owner-only RLS",
        "Pembeli menjelajah /api/marketplace — filter, sorting, dan paginasi dieksekusi di Postgres, bukan di klien",
        "Checkout membangun transaksi Midtrans Snap, menyertakan productIds dan userId melalui custom_field1/custom_field2",
        "Midtrans settle → POST webhook → server menghitung ulang SHA-512(order+status+amount+serverKey) dan membandingkan signature",
        "Gerbang idempotensi: pesanan completed untuk user/produk tersebut kembali lebih awal — replay jadi tidak berbahaya",
        "Orders disisipkan sebagai completed; item yang dibeli dibersihkan dari wishlist pembeli dalam alur yang sama",
        "Setiap seller menerima baris notifikasi realtime ('💰 New Sale!') yang dialirkan via publikasi supabase_realtime",
        "Resend me-render template ReceiptEmail berbasis React dan mengirimkannya ke inbox pembeli",
        "Permintaan download menuju /api/download/[productId] → cek kepemilikan → redirect ke Signed URL yang kedaluwarsa — file tidak pernah bisa dialamatkan publik",
      ],
      deployment: [
        "Satu deployment Vercel melayani app dan ketiga Route Handler-nya",
        "Project Supabase menampung Postgres, Auth, Storage, dan Realtime — skema diterapkan via script SQL berurutan di SQL Editor",
        "Pemisahan environment: key NEXT_PUBLIC_* untuk akses Supabase sisi klien, service-role key dicadangkan untuk operasi privilese",
        "Midtrans berjalan sandbox-first; migrasi produksi hanya menukar server/client key",
        "Identitas sender Resend dikonfigurasi untuk email struk dan welcome",
      ],
    },
    diagram: {
      frontend: { label: "FRONTEND (Next.js App Router)", tech: "React Server Components · Server Actions · Tailwind CSS · shadcn/ui · Framer Motion · toast Sonner" },
      backend: { label: "BACKEND (Supabase)", tech: "PostgreSQL + RLS · Auth (email/OAuth) · Storage bucket · Channel Realtime · Edge network" },
      arrow: { label: "Supabase JS client — setiap query melewati policy RLS" },
      services: [
        { name: "PostgreSQL + RLS", description: "profiles, products, orders, wishlist, thread chat, notifications — otorisasi ditegakkan di level baris" },
        { name: "Storage + Signed URLs", description: "Bucket aset privat dengan link unduhan ownership-checked yang kedaluwarsa" },
        { name: "Midtrans Snap", description: "QRIS, e-wallet, kartu — event settlement diverifikasi signature webhook SHA-512" },
        { name: "Resend", description: "Template React Email untuk struk dan alur welcome" },
      ],
    },
    codeSnippets: [
      {
        title: "Keamanan Webhook — Signature + Idempotensi",
        language: "typescript",
        code: `const hashString = \`\${order_id}\${status_code}\${gross_amount}\${serverKey}\`;
const expectedSignature = crypto
  .createHash('sha512').update(hashString).digest('hex');

if (signature_key !== expectedSignature) {
  return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
}

if (transaction_status === 'capture' || transaction_status === 'settlement') {
  // Proteksi replay: lewati jika pembelian ini sudah terpenuhi
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
  /* insert orders → bersihkan wishlist → notifikasi seller → email struk */
}`,
        reason: "Pertahanan dua lapis di jalur uang — hash SHA-512 menolak callback palsu, sementara pengecekan pesanan-completed membuat retry Midtrans menjadi idempoten sehingga efek fulfillment berjalan tepat sekali",
      },
      {
        title: "Provisioning Profil — Database Trigger",
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
        reason: "Setiap user terautentikasi mendapat baris profil dengan username tahan-bentrok yang digenerate in-database — kode aplikasi tidak mungkin melupakan langkah ini, bahkan lintas provider OAuth",
      },
      {
        title: "Otorisasi sebagai Data — Policy RLS",
        language: "sql",
        code: `ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders   ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Products are viewable by everyone."
  ON products FOR SELECT USING (true);

CREATE POLICY "Users can update their own products."
  ON products FOR UPDATE USING (auth.uid() = user_id);

-- Orders benar-benar privat:
CREATE POLICY "Users can view their own orders."
  ON orders FOR SELECT USING (auth.uid() = user_id);`,
        reason: "Kepemilikan hidup di dalam database itu sendiri — query yang buggy ataupun jahat hanya akan bisa menyentuh baris milik user yang terautentikasi, karena policy dievaluasi per-request terhadap auth.uid()",
      },
    ],
    siteMap: {
      userRoles: [
        { role: "Pembeli", description: "Menemukan dan membeli aset digital", needs: "Menyaring katalog dengan cepat, melihat pratinjau file sebelum membeli, membayar dengan QRIS/e-wallet, dan mengunduh ulang pembelian kapan saja dari library.", icon: "🛍️" },
        { role: "Kreator", description: "Menerbitkan dan memonetisasi produk digital", needs: "Mengunggah aset dengan metadata lengkap, memantau pendapatan lewat analitik heatmap/timeline, mengelola inventori, meminta payout, dan menjawab pertanyaan pembeli di chat real-time.", icon: "🎨" },
        { role: "Pengunjung", description: "Menjelajah tanpa akun", needs: "Melihat-lihat marketplace, memeriksa halaman detail produk dengan metadata SEO kaya, dan memahami sinyal kepercayaan sebelum mendaftar.", icon: "👀" },
      ],
      userFlow: [
        { step: "Menemukan", detail: "Landing marketplace dengan listing server-rendered, filter kategori, pencarian, dan toggle wishlist untuk user yang login" },
        { step: "Evaluasi", detail: "Halaman produk dengan galeri, spesifikasi, FAQ, review, modal live preview, dan tombol Hubungi Penjual yang membuka thread chat real-time" },
        { step: "Pembelian", detail: "Cart drawer mengagregasi item; Server Action membuat token Midtrans Snap dan mengarahkan ke checkout dengan metadata tertanam" },
        { step: "Fulfillment", detail: "Webhook terverifikasi menyisipkan pesanan completed, membersihkan wishlist, memberi notifikasi ke setiap seller secara realtime, serta mengirim struk hasil render React" },
        { step: "Akses", detail: "Library menampilkan aset milik; unduhan memverifikasi kepemilikan lalu beralih ke Signed URL yang kedaluwarsa" },
        { step: "Berkarya", detail: "Kreator menerbitkan lewat form dashboard, mengubah status listing, mengedit produk, dan menyaksikan heatmap serta timeline pendapatan ter-update" },
        { step: "Penarikan", detail: "Wallet mengagregasi saldo per bulan dengan chart donut/penjualan; PayoutRequestModal memulai permintaan penarikan dengan ekspor CSV untuk catatan" },
      ],
      siteArchitecture: [
        { section: "Marketplace", type: "Katalog server-rendered", description: "Listing terfilter dan terpaginasi dengan skeleton loading states dan tombol wishlist optimistis" },
        { section: "Detail Produk", type: "Surface landing SEO", description: "Metadata dinamis + JSON-LD, lightbox galeri, review, sticky buy action bar, live preview" },
        { section: "Seller / Profil", type: "Halaman publik kreator", description: "/seller/[username] etalase dengan tombol follow; /profile/[username] halaman identitas dengan storage policy avatar" },
        { section: "Dashboard", type: "Pusat kendali kreator", description: "Tabel inventori dengan toggle status, form create/edit dengan unggahan drag-drop, log aktivitas" },
        { section: "Chat", type: "Pesan real-time", description: "Sidebar daftar thread + jendela chat dengan subscription realtime Supabase, lampiran gambar, pelacakan unread" },
        { section: "Wallet", type: "Analitik pendapatan", description: "Total bulanan, kalender heatmap, donut income, history tabs, permintaan payout, ekspor CSV" },
        { section: "Library", type: "Aset dimiliki", description: "Riwayat pembelian dengan aksi quick-download yang dirutekan melalui Signed URL" },
        { section: "Notifikasi", type: "Feed real-time", description: "Dropdown bell + halaman khusus yang didukung tabel notifications yang dipublikasikan realtime" },
        { section: "Settings", type: "Manajemen akun", description: "Profil, keamanan, privasi, preferensi payout, dan kontrol notifikasi" },
      ],
    },
  },
  {
    slug: "monetra",
    title: "Monetra — Pelacak Keuangan Pribadi",
    summary:
      "Pelacak keuangan full-stack yang memadukan REST API Go (Gin) dengan dashboard React — anggaran, tujuan menabung, otomatisasi transaksi berulang, laporan CSV/PDF, dan insight engine deterministik bulan-ke-bulan.",
    challenge:
      "Aplikasi keuangan yang ada memaksa pilihan: produk konsumer terlalu terkunci dan rumit untuk pengguna biasa, sementara tracker sederhana tidak punya kedalaman untuk analisis anggaran yang bermakna, pacing tujuan, atau ekspor data yang bisa Anda miliki.",
    solution:
      "Mengarsitektur REST API bersih di Go dengan Gin dan PGX di atas PostgreSQL — composite index yang dioptimalkan untuk query agregasi laporan, auth JWT di atas hash bcrypt plus login Google OAuth, materialisasi transaksi berulang, dan streaming laporan CSV/PDF server-side — dipasangkan dengan dashboard React/Vite yang merender tren arus kas lewat Recharts, peringatan anggaran, pelacakan kontribusi tujuan, dan insight engine berbasis aturan yang membandingkan bulanan serta menandai lonjakan kategori.",
    impact:
      "Mengirim platform siap produksi dalam dua bahasa: 30+ endpoint bertipe di balik satu rantai middleware, isolasi data yang ditegakkan query ber-scope user, saran keuangan deterministik tanpa biaya maupun latensi LLM, layanan Go di-host Railway, dan frontend deploy Vercel dengan dark mode penuh.",
    stack: ["Go", "Gin", "PostgreSQL", "PGX", "React", "Vite", "Tailwind CSS", "Recharts"],
    role: "Pengembang Full-Stack",
    year: "2026",
    client: "Inisiatif mandiri",
    category: "Aplikasi Keuangan",
    timeline: "2026",
    features: [
      {
        title: "Dashboard Arus Kas",
        description: "Ikhtisar pemasukan vs pengeluaran dengan tren Recharts dari satu endpoint agregasi Go.",
        screenshot: "/image/monetra/dashboard.png",
        screenshotLabel: "Dashboard",
      },
      {
        title: "Transaksi",
        description: "Buku kas cepat yang bisa dicari dengan kategori, filter, dan isolasi data per pengguna di setiap query.",
        screenshot: "/image/monetra/transactions.png",
        screenshotLabel: "Transaksi",
      },
      {
        title: "Anggaran & Peringatan",
        description: "Anggaran per kategori dengan indikator pacing yang memperingatkan sebelum kebobolan.",
        screenshot: "/image/monetra/budgets.png",
        screenshotLabel: "Anggaran",
      },
      {
        title: "Target Menabung",
        description: "Pelacakan target dengan riwayat kontribusi dan proyeksi tanggal tercapai.",
        screenshot: "/image/monetra/goals.png",
        screenshotLabel: "Target",
      },
      {
        title: "Laporan & Ekspor",
        description: "Laporan bulanan, per kategori, dan ringkasan dengan unduhan CSV/PDF dari server.",
        screenshot: "/image/monetra/reports.png",
        screenshotLabel: "Laporan",
      },
      {
        title: "Otomatisasi Rutin",
        description: "Langganan dan gaji menjadi entri nyata sesuai jadwal yang deterministik.",
        screenshot: "/image/monetra/recurring.png",
        screenshotLabel: "Rutin",
      },
    ],
    sourceUrl: "https://github.com/callmezaa/monetra-financetrackerApp",
    demoUrl: "https://monetra-financetracker-app.vercel.app/",
    type: "finance",
    featured: true,
    metrics: ["Go + React Full Stack", "30+ Endpoint REST", "Insight Engine", "Ekspor CSV/PDF"],
    accent: {
      glow: "rgba(251, 146, 60, 0.14)",
      color: "#fb923c",
    },
    architecture: {
      monorepo: [
        { name: "backend/", tech: "Go + Gin + PGX + Dockerfile", description: "Bootstrap cmd/main.go, pool koneksi config/database.go, 12 file handler per domain (auth, transactions, categories, budgets, goals, recurring, reports, insights, notifications), middleware JWT, 6 struct model, dan migrasi SQL" },
        { name: "backend/routes/", tech: "routes.go", description: "Satu file komposisi route — grup publik (register/login/OAuth Google) dan grup protected di balik AuthMiddleware, terorganisir per resource" },
        { name: "frontend/", tech: "React + Vite + Recharts", description: "12 halaman dari landing marketing hingga Reports, provider AuthContext/ThemeContext, instance axios dengan injeksi token, dan guarding ProtectedRoute" },
      ],
      decisions: [
        { decision: "Go + Gin alih-alih Node.js untuk API", reason: "Terkompilasi menjadi satu binary statis — footprint container kecil di instance Railway kecil dengan latensi prediktabel di bawah query agregasi konkuren" },
        { decision: "PGX dengan SQL tulisan tangan alih-alih ORM", reason: "Endpoint laporan hidup-mati di performa SUM/GROUP BY — query eksplisit dipasangkan composite index mengalahkan SQL hasil generate ORM" },
        { decision: "Composite index pada (user_id, transaction_date)", reason: "Semua query dashboard dan laporan memfilter per user dan rentang tanggal — index menjadikan agregasi bulanan index scan alih-alih table scan" },
        { decision: "Insight engine deterministik alih-alih panggilan LLM", reason: "Delta bulan-ke-bulan dan spike berbasis threshold menghasilkan saran yang bisa dijelaskan, instan, tanpa biaya — tanpa guidance finansial halusinatif, tanpa tagihan API" },
        { decision: "Materialisasi recurring sebagai endpoint proses eksplisit", reason: "POST /recurring/process membuat instance transaksi jatuh tempo secara deterministik alih-alih sihir cron tersembunyi — mudah dites dan di-retry" },
        { decision: "Generasi CSV/PDF server-side", reason: "Ekspor mengalir langsung dari hasil query sehingga browser mengunduh file jadi tanpa pengolahan data sisi klien" },
        { decision: "Google OAuth di samping email/password", reason: "Mengurangi gesekan signup sementara bcrypt menjaga akun kredensial aman — kedua jalur konvergen ke sesi JWT yang sama" },
      ],
      endpoints: [
        { method: "POST", path: "/api/register · /api/login", auth: false, rate: "Publik", purpose: "Signup/signin kredensial — verifikasi bcrypt menerbitkan JWT" },
        { method: "POST", path: "/api/auth/google", auth: false, rate: "Publik", purpose: "Pertukaran identitas Google → sesi JWT yang sama dengan login password" },
        { method: "GET", path: "/api/dashboard", auth: true, rate: "JWT", purpose: "Ringkasan arus kas teragregasi untuk halaman overview" },
        { method: "GET", path: "/api/reports/monthly|by-category|summary", auth: true, rate: "JWT", purpose: "Endpoint agregasi yang memberi makan visualisasi Recharts" },
        { method: "GET", path: "/api/reports/export/csv|pdf", auth: true, rate: "JWT", purpose: "Stream ekspor hasil generate server untuk catatan dan pajak" },
        { method: "GET", path: "/api/insights", auth: true, rate: "JWT", purpose: "Engine statistik: tren bulan-ke-bulan + deteksi spike kategori dengan string saran" },
        { method: "POST", path: "/api/recurring/process", auth: true, rate: "JWT", purpose: "Mematerialisasi transaksi berulang yang jatuh tempo menjadi entri nyata" },
      ],
      dataFlow: [
        "Register/login memverifikasi hash bcrypt (atau menukar identitas Google) dan menerbitkan JWT bertanda tangan",
        "AuthMiddleware memvalidasi Bearer token di setiap route protected dan menyuntikkan userID ke context request",
        "Setiap query ber-scope user — transactions, budgets, goals semuanya memfilter berdasarkan user context untuk isolasi horizontal",
        "Dashboard mengagregasi income vs expense bulan berjalan dalam satu round trip",
        "Insight engine menarik total expense bulan berjalan dan sebelumnya plus join GROUP BY per kategori",
        "Kategori dengan pertumbuhan >10% bulan-ke-bulan — atau kategori baru dengan belanja di atas Rp 50rb — ditandai sebagai spike",
        "Aturan threshold menerjemahkan spike menjadi saran bahasa natural yang dirender di dashboard",
        "POST /recurring/process mematerialisasi definisi recurring yang jatuh tempo menjadi baris transaksi bertanggal",
        "Endpoint ekspor mengalirkan CSV/PDF yang dibangun langsung dari query laporan",
        "Recharts merender tren bulanan, donut kategori, dan progress bar anggaran dari endpoint-endpoint tersebut",
      ],
      deployment: [
        "Backend: binary Go ter-Docker deploy ke Railway via railway.json",
        "Frontend: build statis Vercel dengan rewrite vercel.json yang mem-proxies /api ke layanan Railway",
        "Database: PostgreSQL dengan migrasi diterapkan via psql sebelum boot pertama",
        "Secrets (kredensial DB, JWT_SECRET, ALLOWED_ORIGIN) disuntikkan sebagai environment variable — tidak ada yang hardcoded",
      ],
    },
    diagram: {
      frontend: { label: "FRONTEND (React SPA)", tech: "React 18 · Vite · Recharts · Tailwind CSS · axios + interceptor JWT · Context auth/theme" },
      backend: { label: "BACKEND (Go REST API)", tech: "Router Gin · middleware JWT · pool PGX · 12 handler domain · streaming CSV/PDF" },
      arrow: { label: "HTTPS JSON · Bearer token" },
      services: [
        { name: "PostgreSQL", description: "users, categories, transactions (+ budgets/goals/recurring) dengan composite index untuk laporan" },
        { name: "Google OAuth", description: "Opsi identity provider yang konvergen ke sesi JWT yang sama" },
        { name: "Railway", description: "Host container untuk layanan Go" },
      ],
    },
    codeSnippets: [
      {
        title: "Insight Engine — Deteksi Spike",
        language: "go",
        code: `var spikes []CategoryInsight
for catID, curAmt := range curCats {
    if prevAmt, ok := prevCats[catID]; ok && prevAmt.Amount > 0 {
        increase := ((curAmt.Amount - prevAmt.Amount) / prevAmt.Amount) * 100
        if increase > 10 { // pertumbuhan >10% bulan-ke-bulan
            spikes = append(spikes, CategoryInsight{
                CategoryName: curAmt.CategoryName,
                Amount:       curAmt.Amount,
                IncreasePct:  increase,
            })
        }
    } else if curAmt.Amount > 50000 { // kategori baru dengan belanja nyata
        spikes = append(spikes, CategoryInsight{
            CategoryName: curAmt.CategoryName,
            Amount:       curAmt.Amount,
            IncreasePct:  100,
        })
    }
}

// Aturan threshold mengubah spike menjadi saran:
if trend > 15 {
    advice = append(advice, fmt.Sprintf(
        "Pengeluaran naik %.1f%% dibanding bulan lalu...", trend))
}`,
        reason: "Guidance finansial deterministik — matematika murni bulan-ke-bulan dengan threshold eksplisit menghasilkan insight yang bisa dijelaskan tanpa biaya, latensi, maupun risiko halusinasi LLM",
      },
      {
        title: "Query Agregasi yang Dioptimalkan Index",
        language: "sql",
        code: `-- Total expense bulanan (index: idx_transactions_user_date)
SELECT COALESCE(SUM(amount), 0) FROM transactions
WHERE user_id = $1 AND type = 'expense'
  AND EXTRACT(MONTH FROM transaction_date) = $2
  AND EXTRACT(YEAR FROM transaction_date) = $3;

-- Belanja per kategori pada window yang sama
SELECT c.id, c.name, COALESCE(SUM(t.amount), 0)
FROM categories c
LEFT JOIN transactions t ON t.category_id = c.id
WHERE c.user_id = $1 AND c.type = 'expense'
  AND EXTRACT(MONTH FROM t.transaction_date) = $2
  AND EXTRACT(YEAR FROM t.transaction_date) = $3
GROUP BY c.id, c.name;`,
        reason: "SQL agregasi tulisan tangan dipadukan composite index (user_id, transaction_date) dan (user_id, type) menjaga load dashboard tetap cepat meski riwayat membesar",
      },
      {
        title: "Skema — Isolasi Tertanam di Constraint",
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
        reason: "Foreign key dengan CASCADE/RESTRICT mengkodekan aturan siklus hidup data di level skema, sementara constraint CHECK menolak tipe invalid sebelum kode aplikasi sempat melihatnya",
      },
    ],
    siteMap: {
      userRoles: [
        { role: "Pencatat Kasual", description: "Mencatat income dan expense tanpa basa-basi", needs: "Menambah transaksi dalam hitungan detik, melihat ke mana uang mengalir di dashboard yang bersih, dan memercayai angkanya.", icon: "🧾" },
        { role: "Penyusun Anggaran", description: "Menetapkan batas bulanan per kategori", needs: "Mengonfigurasi anggaran dengan peringatan sebelum overspend dan menyaksikan progress bar ter-update saat transaksi masuk.", icon: "📊" },
        { role: "Penabung Tujuan", description: "Menyisihkan uang untuk target tertentu", needs: "Membuat tujuan, berkontribusi tabungan secara bertahap, dan memantau pacing menuju tiap target dengan otomatisasi recurring untuk kebiasaan konsisten.", icon: "🎯" },
      ],
      userFlow: [
        { step: "Onboarding", detail: "Registrasi dengan email/password atau Google; sesi JWT bertahan di seluruh SPA via interceptor axios" },
        { step: "Organisasi", detail: "Membuat kategori income/expense yang menjadi jangkar setiap transaksi, anggaran, dan laporan" },
        { step: "Pencatatan", detail: "Mencatat transaksi dengan jumlah, tipe, kategori, tanggal, dan deskripsi — penghapusan cascade dengan rapi" },
        { step: "Otomatisasi", detail: "Mendefinisikan tagihan atau gaji berulang; endpoint proses mematerialisasikannya saat jatuh tempo, dengan toggle untuk pause" },
        { step: "Pembatasan", detail: "Menetapkan anggaran kategori yang memperingatkan sebelum ambang overspend terlewati" },
        { step: "Progres", detail: "Mendanai tujuan secara bertahap lewat kontribusi Add Saving yang terlacak terhadap tiap target" },
        { step: "Review", detail: "Laporan bulanan/per-kategori/tahunan dirender di Recharts; insight engine menarasikan tren dan menandai lonjakan" },
        { step: "Ekspor", detail: "Mengunduh statement CSV/PDF yang digenerate server-side dari query laporan yang sama" },
      ],
      siteArchitecture: [
        { section: "Landing", type: "Halaman marketing", description: "Hero ber-branding 3D, walkthrough fitur, dan CTA menuju alur register/login" },
        { section: "Auth", type: "Dua jalur masuk", description: "Form email/password plus tombol Google OAuth yang konvergen ke satu sesi JWT" },
        { section: "Dashboard", type: "Overview", description: "Kartu ringkasan arus kas dan chart tren dari endpoint /dashboard teragregasi" },
        { section: "Transactions · Categories", type: "Tabel CRUD", description: "Daftar dengan filter, tambah/edit/inline delete, dan pemilih kategori sadar-tipe" },
        { section: "Budgets", type: "Batas + alert", description: "Cap bulanan per kategori dengan visualisasi progres dan peringatan overspend" },
        { section: "Goals", type: "Pelacak tabungan", description: "Kartu target dengan riwayat kontribusi dan indikator pacing" },
        { section: "Recurring", type: "Panel otomatisasi", description: "Daftar definisi dengan kontrol frekuensi, toggle pause, dan trigger proses manual" },
        { section: "Reports", type: "Suite analitik", description: "Tampilan bulanan, per-kategori, dan tahunan plus aksi ekspor CSV/PDF" },
        { section: "Settings", type: "Pusat akun", description: "Edit profil, unggah avatar, ganti password, preferensi notifikasi, toggle tema" },
      ],
    },
  },
  {
    slug: "pallete-studio",
    title: "Palette Studio — Toolkit Ekstraksi Warna",
    summary:
      "Workstation warna tanpa backend yang mengekstrak palet dominan dari gambar apa pun lewat kuantisasi median-cut kustom di Web Worker, lalu mengharmonisasi, memeriksa kontras, memvisualisasikan dalam 3D, dan mengekspor token siap produksi — gambar tidak pernah meninggalkan browser.",
    challenge:
      "Desainer dan pengembang berpindah-pindah antar utilitas yang terpisah — satu alat mengekstrak warna, satu lagi memeriksa kontras, satu lagi mengekspor token — sementara kebanyakan mengunggah screenshot sensitif atau materi brand ke server tak dikenal hanya untuk mendapatkan sebuah palet.",
    solution:
      "Membangun ekosistem warna mandiri: kuantisasi median-cut tulisan tangan yang berjalan off main thread di Web Worker, engine harmoni yang memetakan relasi komplementer/analog/triadik pada tampilan wheel dan force-graph, analisis kontras berpasangan WCAG AA/AAA, klasifikasi mood, playground fisika gradien interaktif, heliks DNA Three.js dengan post-processing bloom, galeri preview UI live yang bergaya sesuai palet hasil ekstraksi, dan ekspor multi-format — seluruhnya digerakkan oleh enam Zustand store dengan riwayat persisten dan URL shareable ber-enkode base64.",
    impact:
      "Mengirim 15+ fitur dengan nol network call setelah halaman termuat: privasi by architecture, shortcut keyboard dan interaksi long-press di seluruh aplikasi, storytelling scroll GSAP pada landing page, dan command palette — membuktikan tooling kreatif kompleks bisa hidup sepenuhnya client-side.",
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "Three.js", "GSAP", "Zustand"],
    role: "Pengembang Full-Stack & Insinyur UI",
    year: "2026",
    client: "Inisiatif mandiri",
    category: "Perkakas Desain",
    timeline: "2026",
    sourceUrl: "https://github.com/callmezaa/Pallete-studio",
    demoUrl: "https://pallete-studio-ten.vercel.app",
    type: "playground",
    featured: true,
    badge: "Playground",
    metrics: ["Engine Median-cut", "Pipeline Web Worker", "Pemeriksa WCAG AA/AAA", "Nol Backend"],
    accent: {
      glow: "rgba(236, 72, 153, 0.14)",
      color: "#ec4899",
    },
    architecture: {
      monorepo: [
        { name: "src/lib/", tech: "Fungsi TypeScript murni", description: "Seluruh layer sains warna sebagai modul bebas-dependensi: ekstraksi median-cut, matematika harmoni, luminans relatif dan rasio kontras WCAG, klasifikasi mood, interpolasi gradien, serializer ekspor, dan penamaan warna" },
        { name: "src/workers/", tech: "Web Worker", description: "color-worker.ts menerima buffer ImageData dan menjalankan kuantisasi off the main thread — gambar besar tidak pernah membekukan UI" },
        { name: "src/store/", tech: "Zustand × 6 + persist middleware", description: "Slice untuk palette, history (persisten di localStorage), upload, toast, state UI, dan format ekspor — tanpa pohon context provider" },
        { name: "src/components/", tech: "Folder fitur React 19", description: "palette/ (kartu, extractor, panel kontras, heliks DNA), relationship/ (wheel + force graph), gradient/ (playground fisika), story/ (reveal animasi), preview/ (11 demo UI bergaya ulang), panel export/" },
        { name: "src/app/", tech: "Route App Router", description: "Hanya tiga route: / workspace, /history arsip, /palette/[id] palet bersama yang didekode dari segmen URL base64" },
      ],
      decisions: [
        { decision: "Median-cut tulisan tangan alih-alih library warna", reason: "Kontrol penuh atas pembagian bucket dan urutan warna dominan — nol bobot dependensi untuk fungsi yang hanya ~60 baris matematika murni" },
        { decision: "Web Worker untuk pemrosesan piksel", reason: "Mengkuantisasi jutaan piksel memblokir main thread; worker menjaga interaksi drag, pin, dan scroll tetap 60fps selama ekstraksi" },
        { decision: "Arsitektur zero-backend", reason: "Gambar diproses sepenuhnya di browser — screenshot sensitif tidak pernah meninggalkan perangkat, tidak ada biaya server, dan cold start tidak ada" },
        { decision: "URL palet base64 alih-alih database", reason: "/palette/[id] mengenkode seluruh palet ke dalam URL itu sendiri — state yang bisa dibagikan tanpa layer persistensi untuk dijalankan atau dibayar" },
        { decision: "Enam Zustand store fokus alih-alih satu store global", reason: "Manipulasi palet, riwayat, toast, dan flag UI me-render secara independen — selector menjaga canvas berat agar tidak digambar ulang oleh perubahan tak terkait" },
        { decision: "Pemisahan GSAP ScrollTrigger + Framer Motion", reason: "GSAP memiliki timeline storytelling scroll-driven di landing page; Framer Motion menangani micro-interaction in-app di mana rekonsiliasi React penting" },
        { decision: "@react-three/fiber untuk heliks DNA", reason: "Scene graph Three.js deklaratif di dalam React dengan helper drei dan post-processing bloom — momen brand yang berkesan dirender dari data palet live" },
      ],
      endpoints: [
        { method: "GET", path: "/palette/[id]", auth: false, rate: "Static", purpose: "Palet bersama didekode dari segmen URL base64 — dirender sepenuhnya client-side" },
        { method: "N/A", path: "Tanpa network call", auth: false, rate: "None", purpose: "Semua komputasi lokal — piksel diproses in-browser via Web Worker, tidak ada yang diunggah ke mana pun" },
      ],
      dataFlow: [
        "User menjatuhkan gambar → UploadZone membacanya secara lokal via FileReader, bukan network request",
        "Canvas men-downsample bitmap menjadi ImageData dan mentransfer buffer ke color worker",
        "Worker meratakan tuple RGBA dan median-cut membelah bucket sepanjang channel RGB terlebar hingga 5 warna tersisa",
        "Bucket dirata-rata menjadi hasil hex + persentase dominasi yang dikirim balik ke main thread",
        "Zustand palette store ter-update → ColorCards dirender dengan format copy (hex/rgb/hsl/oklch) dan quick-copy long-press",
        "Klasifikasi mood melabeli palet; engine harmoni menghitung pasangan komplementer/analog/triadik untuk setiap swatch",
        "Relationship map menggambar posisi wheel dan tautan force-graph; ContrastPanel menskor setiap pasangan terhadap ambang AA/AAA",
        "Playground gradien menginterpolasi stop live ke canvas; heliks DNA menyuntikkan hue palet ke scene Three.js",
        "Panel ekspor menserialisasi token ke CSS variables, config Tailwind, JSON, SCSS, atau design tokens; strip PNG dirender ke canvas",
        "History store mempersistenkan palet ke localStorage; Share menserialisasi state ke base64 untuk URL /palette/[id]",
      ],
      deployment: [
        "Build Next.js statis penuh di Vercel — tidak ada server function di output",
        "Worker di-bundle sebagai chunk terpisah dan diinstansiasi per sesi",
        "Manifest PWA disertakan untuk penggunaan offline yang dapat diinstal",
        "Tidak butuh environment secret — tidak ada yang bisa bocor karena tidak ada yang meninggalkan klien",
      ],
    },
    diagram: {
      frontend: { label: "CLIENT (Next.js App Router)", tech: "React 19 · Zustand ×6 · Framer Motion · GSAP ScrollTrigger · Tailwind CSS v4 · shadcn/ui" },
      backend: { label: "BACKEND", tech: "None — 100% komputasi client-side, hosting statis saja" },
      arrow: { label: "Nol request setelah load" },
      services: [
        { name: "Web Worker", description: "Kuantisasi median-cut off-thread atas buffer ImageData" },
        { name: "Three.js scene", description: "Heliks DNA @react-three/fiber dengan post-processing bloom dan orbit controls" },
        { name: "localStorage", description: "Persist middleware Zustand yang mengarsipkan riwayat palet" },
      ],
    },
    codeSnippets: [
      {
        title: "Inti Kuantisasi Median-Cut",
        language: "typescript",
        code: `function quantize(pixels: RGB[], maxColors: number): Bucket[] {
  let buckets: RGB[][] = [pixels];

  while (buckets.length < maxColors) {
    // Selalu belahkan bucket terbesar
    const idx = buckets.reduce((max, b, i) =>
      b.length > buckets[max].length ? i : max, 0);
    const largest = buckets[idx];
    if (largest.length < 2) break;

    // Belah sepanjang channel RGB terlebar
    const range = findLargestChannelRange(largest);
    const sorted = [...largest].sort((a, b) =>
      a[range.channel] - b[range.channel]);
    const mid = Math.floor(sorted.length / 2);
    buckets[idx] = sorted.slice(0, mid);
    buckets.push(sorted.slice(mid));
  }

  return buckets.map((bucket) => ({
    color: averageColor(bucket),
    count: bucket.length, // → persentase dominasi
  }));
}`,
        reason: "Algoritma ekstraksi dari prinsip pertama — membelah bucket terpadat secara iteratif sepanjang channel terlebarnya menghasilkan warna dominan yang perceptual tanpa satu pun dependensi",
      },
      {
        title: "Kontras WCAG — Luminans Relatif",
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
        reason: "Kontras WCAG akurat-spesifikasi sesuai formula linearisasi sRGB — menggerakkan panel skoring AA/AAA berpasangan dan keputusan teks hitam/putih otomatis di seluruh UI",
      },
    ],
    siteMap: {
      userRoles: [
        { role: "Desainer", description: "Membangun palet brand dan UI dari referensi", needs: "Mengekstrak warna dominan yang jujur dari foto atau mockup, menilai aksesibilitas seketika, dan menjelajahi harmoni tanpa meninggalkan satu layar.", icon: "🎨" },
        { role: "Developer", description: "Menerapkan palet ke dalam codebase", needs: "Menyalin nilai dalam hex/rgb/hsl/oklch, mengekspor CSS variables, config Tailwind, atau design tokens siap-tempel, dan berbagi palet persis via URL.", icon: "👨‍💻" },
        { role: "Penjelajah Warna", description: "Belajar teori warna secara visual", needs: "Melihat relasi harmoni tergambar pada wheel dan force graph, menyaksikan mood diklasifikasi, dan bermain dengan gradien serta visualisasi 3D secara langsung.", icon: "🔬" },
      ],
      userFlow: [
        { step: "Unggah", detail: "Zona drag-and-drop menerima gambar; piksel tetap di browser saat worker langsung memulai kuantisasi" },
        { step: "Ekstraksi", detail: "Lima warna dominan kembali dengan persentase dominasi, nama hasil generate otomatis, dan badge klasifikasi mood" },
        { step: "Kurasi", detail: "Drag untuk mengurutkan swatch, pin favorit, long-press untuk copy instan, dan toggle antara format hex/rgb/hsl/oklch" },
        { step: "Analisis", detail: "Panel kontras menskor setiap pasangan terhadap AA/AAA sementara peta relasi memplot pasangan komplementer, analog, dan triadik pada wheel dan force-graph" },
        { step: "Visualisasi", detail: "Playground fisika gradien membengkokkan stop live; heliks DNA memutar hue palet dalam 3D dengan bloom; sebelas komponen UI bergaya ulang untuk pratinjau penggunaan nyata" },
        { step: "Ekspor & Bagikan", detail: "Serialisasi ke CSS variables, Tailwind, JSON, SCSS, design tokens, atau strip PNG — lalu bagikan via URL base64 atau simpan ke riwayat" },
        { step: "Kembali", detail: "Halaman history memulihkan palet lampau dengan manajemen swipe-to-delete dan reload satu klik ke workspace" },
      ],
      siteArchitecture: [
        { section: "Home / Hero", type: "Scroll story GSAP", description: "Particle field dan floating blobs dengan reveal scroll-driven yang bermuara ke zona unggah" },
        { section: "Workspace", type: "Ekstraksi + kurasi", description: "Grid palet berisi ColorCard draggable dengan toggle format, pinning, dan toast feedback copy" },
        { section: "Panel Kontras", type: "Matriks aksesibilitas", description: "Skoring WCAG berpasangan dengan badge pass/fail di ambang AA dan AAA" },
        { section: "Peta Relasi", type: "Visualisasi ganda", description: "Tampilan color wheel plus force-directed graph yang menghubungkan setiap swatch dengan pasangan harmonisnya" },
        { section: "Fisika Gradien", type: "Playground interaktif", description: "Tipe linear/radial/mesh dengan stop draggable, kontrol sudut, dan rendering canvas real-time" },
        { section: "Heliks DNA", type: "Momen brand 3D", description: "Scene double-helix @react-three/fiber dengan post-processing bloom, orbit controls, dan capture PNG" },
        { section: "Preview UI", type: "Galeri komponen live", description: "Button, form, navbar, demo dashboard, dan theme toggle yang bergaya ulang oleh palet aktif" },
        { section: "Mode Story", type: "Reveal animasi", description: "Sekuens sinematik yang menyajikan tiap warna hasil ekstraksi dengan transisi latar ambient" },
        { section: "History", type: "Arsip lokal", description: "Halaman /history yang menampilkan palet persisten dengan restore, share link, dan swipe-to-delete" },
        { section: "Palet Bersama", type: "State ber-enkode URL", description: "/palette/[id] mendekode state base64 sehingga penerima mendarat langsung di workspace yang termuat penuh" },
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
    client: "PT BIT Indonesia",
    category: "POS Mobile",
    timeline: "2024",
    features: [
      {
        title: "Transaksi POS Cepat",
        description: "Pilih produk, atur jumlah, dan bayar dalam waktu kurang dari 5 detik per operasi — dioptimalkan untuk perangkat kelas bawah.",
        screenshot: "/image/GotaniApp/transaksi.png",
        screenshotLabel: "Transaksi",
      },
      {
        title: "Laporan Penjualan",
        description: "Visualisasi bar, line, dan pie dari riwayat transaksi dengan ekspor CSV/PDF via expo-print.",
        screenshot: "/image/GotaniApp/laporan.png",
        screenshotLabel: "Laporan",
      },
      {
        title: "Manajemen Stok",
        description: "Inventaris dengan tanggal kedaluwarsa, data supplier, log distribusi, dan riwayat pergerakan stok otomatis.",
        screenshot: "/image/GotaniApp/kelolaproduk.png",
        screenshotLabel: "Kelola produk",
      },
      {
        title: "Buku Kas Offline-First",
        description: "Transaksi tertunda antre di AsyncStorage dan tersinkron ke Firestore saat koneksi kembali.",
        screenshot: "/image/GotaniApp/beranda.png",
        screenshotLabel: "Beranda",
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
]
