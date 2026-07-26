import type { Locale } from "@/i18n/request";
import { projectsEn } from "./en";
import { projectsId } from "./id";

export type { Project, ProjectType } from "./en";

export const projects = projectsEn;

export function getProjects(locale: Locale) {
  return locale === "id" ? projectsId : projectsEn;
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

export const PROJECT_CATEGORIES: Record<string, typeof projects> = {
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
