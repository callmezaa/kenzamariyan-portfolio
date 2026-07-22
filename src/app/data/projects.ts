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
}

export const techDescriptions: Record<string, string> = {
  React: "UI library for building component-based interfaces",
  "React 19": "Latest React with concurrent features & server components",
  TypeScript: "Typed JavaScript for scalable enterprise applications",
  "Node.js": "JavaScript runtime for server-side applications",
  Express: "Minimalist web framework for Node.js",
  "Google Gemini AI": "Google's multimodal AI for content generation & analysis",
  Firebase: "Google's platform for auth, database & serverless hosting",
  Docker: "Container platform for consistent deployment across environments",
  "Google Cloud Run": "Serverless container platform for auto-scaling APIs",
  "Next.js 16": "React framework with server components & App Router",
  "NestJS 11": "Progressive Node.js framework for scalable server-side apps",
  WebRTC: "Real-time peer-to-peer audio, video & data communication",
  "Socket.io": "Real-time bidirectional event-based communication library",
  "Monaco Editor": "VS Code's code editor for web-based IDE experiences",
  "OpenAI Whisper": "Speech-to-text AI model for accurate transcription",
  Prisma: "Type-safe ORM for Node.js with auto-generated queries",
  PostgreSQL: "Advanced open-source relational database system",
  "Tailwind CSS": "Utility-first CSS framework for rapid UI development",
  Supabase: "Open-source Firebase alternative with PostgreSQL & RLS",
  Midtrans: "Indonesian payment gateway for online transactions",
  Resend: "Email API for transactional emails with React templates",
  "React Native": "Cross-platform mobile framework using React",
  Expo: "Managed React Native framework for rapid mobile development",
  Firestore: "NoSQL document database with real-time synchronization",
  AsyncStorage: "Unencrypted persistent key-value storage for React Native",
  Go: "Statically typed compiled language for high-performance services",
  Gin: "Fast HTTP web framework for Go with minimal overhead",
  Fiber: "Express-inspired HTTP framework for Go",
  Vite: "Fast build tool and dev server for modern web projects",
  Recharts: "Composable charting library for React built on D3",
  "Gorilla WebSocket": "WebSocket implementation for Go applications",
  Redis: "In-memory data store for caching and real-time state",
  Cloudinary: "Cloud-based media management and transformation service",
  "Three.js": "WebGL library for 3D graphics rendering in the browser",
  GSAP: "High-performance animation library for complex timeline-based motion",
  Zustand: "Tiny, fast state-management library for React with persist middleware",
  "React Navigation": "Routing and navigation library for React Native apps",
  Axios: "Promise-based HTTP client for browser and Node.js",
  Reanimated: "High-performance animation library for React Native",
  Bcryptjs: "Password hashing library with bcrypt algorithm",
  JWT: "JSON Web Tokens for stateless authentication",
};

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
    demoUrl: "https://contract-chill-production.up.railway.app",
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

export const PROJECT_CATEGORIES: Record<string, Project[]> = {
  All: projects,
  "Web App": projects.filter((p) =>
    ["contract-chill", "interviewos", "assetra", "monetra"].includes(p.slug)
  ),
  Mobile: projects.filter((p) =>
    ["gotani-pos", "mercato", "nextalk"].includes(p.slug)
  ),
  Playground: projects.filter((p) =>
    ["pallete-studio"].includes(p.slug)
  ),
};

export const CATEGORY_TABS = ["All", "Web App", "Mobile", "Playground"] as const;
