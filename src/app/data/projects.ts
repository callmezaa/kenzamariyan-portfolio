export type ProjectType = "mobile" | "dashboard" | "company" | "ai" | "fullstack" | "messaging" | "marketplace" | "pos" | "finance" | "chat" | "interviewos";

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
}

export const projects: Project[] = [
  {
    slug: "contract-chill",
    title: "ContractChill — AI Contract Analyzer",
    summary:
      "An AI-powered legal document analyzer and generator that detects red flags, translates legal jargon into plain English, and drafts negotiation scripts — built for freelancers and small businesses.",
    challenge:
      "Freelancers and small business owners often sign contracts containing unfair clauses, unlimited liability, and IP traps because they lack the legal expertise or budget to consult a lawyer for every agreement.",
    solution:
      "Built a full-stack app using Google Gemini AI to scan PDF/DOCX contracts, identify high-risk clauses, generate risk scores, provide interactive chat with 4 distinct AI personas (Chill Friend, Angry Lawyer, Corporate Mentor, Freelancer Senior), and auto-draft negotiation scripts.",
    impact:
      "Processes contracts under 15 seconds with 4 AI personas, deployed on Google Cloud Run with Docker, featuring Firebase Auth, Firestore storage, and a premium PDF report export system.",
    stack: ["React", "TypeScript", "Node.js", "Express", "Google Gemini AI", "Firebase", "Docker", "Google Cloud Run"],
    role: "Full-Stack Developer & AI Engineer",
    year: "2025",
    sourceUrl: "https://github.com/callmezaa/contract-chill",
    demoUrl: "https://contract-chill-884974546946.asia-southeast1.run.app",
    type: "ai",
    featured: true,
    badge: "Hackathon",
    metrics: ["< 15s Analysis", "4 AI Personas", "PDF/DOCX Support", "Cloud Run Deployed"],
    accent: {
      glow: "rgba(99, 102, 241, 0.14)",
      color: "#6366f1",
    },
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
    type: "finance",
    featured: true,
    metrics: ["Go + React Full Stack", "AI Spending Insights", "JWT Auth", "Recurring Transactions"],
    accent: {
      glow: "rgba(251, 146, 60, 0.14)",
      color: "#fb923c",
    },
  },
  {
    slug: "gotani-dashboard",
    title: "Gotani Operations Dashboard",
    summary:
      "A responsive operations control center to monitor live transactions, audit logs, and manage product inventory catalogs for agricultural supply-chain management.",
    challenge:
      "Cooperative managers lacked visual telemetry on mobile sales, inventory changes, and ledger history, leading to operational delays and poor decision-making.",
    solution:
      "Developed an interactive dashboard panel using React and Vite, featuring reactive data tables, multi-column search, SVG analytics charts, and real-time billing sync from the mobile POS system.",
    impact:
      "Established centralized data visibility for cooperative managers, reducing catalog update times and providing real-time clarity on daily billing and inventory flow.",
    stack: ["React", "Vite", "Tailwind CSS", "Firebase", "REST API"],
    role: "Lead Frontend Developer",
    year: "2024",
    sourceUrl: "https://github.com/callmezaa/web-admin-gotani",
    type: "dashboard",
    badge: "Enterprise App",
    metrics: ["Real-time Billing Sync", "Interactive Catalog", "Zero Lag Data Tables"],
    accent: {
      glow: "rgba(99, 102, 241, 0.14)",
      color: "#6366f1",
    },
  },
  {
    slug: "mercato",
    title: "Mercato — E-Commerce Boutique App",
    summary:
      "A flagship mobile e-commerce platform built with React Native, featuring a cinematic design language, geometric consistency, and robust full-stack architecture with Express.js and PostgreSQL.",
    challenge:
      "Most mobile e-commerce apps prioritize function over form, resulting in generic interfaces that fail to create an emotional connection with users during the shopping experience.",
    solution:
      "Designed and built a boutique e-commerce experience with React Native and Expo, featuring animated onboarding, skeleton shimmer loaders, digital e-receipt with perforated borders, wishlist grid, and secure checkout with JWT authentication.",
    impact:
      "Delivered a premium mobile shopping experience across the full purchase lifecycle — from onboarding and product discovery to checkout, payment success, and order history — all running on an Express.js + Prisma + PostgreSQL backend.",
    stack: ["React Native", "Expo", "Node.js", "Express", "PostgreSQL", "Prisma", "JWT"],
    role: "Full-Stack Mobile Developer",
    year: "2025",
    sourceUrl: "https://github.com/callmezaa/mercato-ecommerceApp",
    type: "mobile",
    badge: "Enterprise App",
    metrics: ["Cinematic UI/UX", "Prisma ORM", "JWT Auth", "Digital E-Receipt"],
    accent: {
      glow: "rgba(236, 72, 153, 0.14)",
      color: "#ec4899",
    },
  },
  {
    slug: "architect-ai",
    title: "Architect AI — Productivity Suite",
    summary:
      "A premium full-stack productivity ecosystem with FastAPI backend and React Native mobile frontend, featuring AI-powered task prioritization, deep work modes, and performance analytics.",
    challenge:
      "Knowledge workers struggle with task prioritization and focus in an age of constant digital distractions, lacking a cohesive system that combines AI-driven planning with distraction-free execution.",
    solution:
      "Built a FastAPI backend with PostgreSQL and OpenAI integration, paired with a React Native (Expo) mobile app featuring glassmorphic UI, Reanimated 4 micro-animations, AI smart chat, focus timer, and bilingual support (English & Bahasa Indonesia).",
    impact:
      "Created an end-to-end productivity ecosystem with intelligent task management, behavior-based AI prioritization, haptic feedback, and comprehensive performance analytics across mobile surfaces.",
    stack: ["FastAPI", "Python", "React Native", "Expo", "PostgreSQL", "OpenAI", "Redis"],
    role: "Full-Stack Developer & AI Engineer",
    year: "2026",
    sourceUrl: "https://github.com/callmezaa/architect-productivityApp",
    type: "mobile",
    badge: "Enterprise App",
    metrics: ["AI Task Prioritization", "Deep Work Timer", "Bilingual i18n", "Glassmorphic UI"],
    accent: {
      glow: "rgba(34, 211, 238, 0.14)",
      color: "#22d3ee",
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
  {
    slug: "kpjmi",
    title: "KPJMI Cooperative Web Portal",
    summary:
      "A company profile and dynamic content portal for an agricultural cooperative, built to display credentials, public reports, and program information.",
    challenge:
      "An agricultural cooperative required a secure, readable digital presence to share announcements and build credibility with corporate partners and members.",
    solution:
      "Implemented a performant static webpage architecture with a MySQL-driven dynamic content workflow and responsive grid interfaces for accessibility across devices.",
    impact:
      "Successfully reached over 1,500 cooperative members, improving organizational transparency and facilitating corporate partnership outreach.",
    stack: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    role: "Web Developer",
    year: "2023",
    sourceUrl: "https://github.com/callmezaa/KPJMI-websiteprofile",
    type: "company",
    badge: "Enterprise App",
    metrics: ["1,500+ Members Reached", "Dynamic Content", "Responsive Design"],
    accent: {
      glow: "rgba(6, 182, 212, 0.14)",
      color: "#06b6d4",
    },
  },
];
