import type { IconType } from "react-icons";
import {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss,
  SiGo, SiPython, SiFastapi, SiPostgresql, SiRedis, SiPrisma,
  SiDocker, SiGooglecloud, SiSupabase,
} from "react-icons/si";

export interface TechItem {
  name: string;
  icon: IconType;
  category: "Frontend" | "Mobile" | "Backend" | "AI & Infra";
  brandColor: string;
  brandColorDark?: string;
  mastery: number;
  description: string;
}

export const techArsenal: TechItem[] = [
  {
    name: "React",
    icon: SiReact,
    category: "Frontend",
    brandColor: "#61DAFB",
    mastery: 95,
    description: "Component-driven UI library",
  },
  {
    name: "Next.js",
    icon: SiNextdotjs,
    category: "Frontend",
    brandColor: "#000000",
    brandColorDark: "#FFFFFF",
    mastery: 90,
    description: "Full-stack React framework",
  },
  {
    name: "TypeScript",
    icon: SiTypescript,
    category: "Frontend",
    brandColor: "#3178C6",
    mastery: 92,
    description: "Type-safe JavaScript at scale",
  },
  {
    name: "Tailwind CSS",
    icon: SiTailwindcss,
    category: "Frontend",
    brandColor: "#38BDF8",
    mastery: 85,
    description: "Utility-first design system",
  },
  {
    name: "React Native",
    icon: SiReact,
    category: "Mobile",
    brandColor: "#61DAFB",
    mastery: 85,
    description: "Cross-platform mobile apps",
  },
  {
    name: "Go",
    icon: SiGo,
    category: "Backend",
    brandColor: "#00ADD8",
    mastery: 85,
    description: "High-performance microservices",
  },
  {
    name: "Python",
    icon: SiPython,
    category: "Backend",
    brandColor: "#3776AB",
    mastery: 80,
    description: "AI & automation backend",
  },
  {
    name: "FastAPI",
    icon: SiFastapi,
    category: "Backend",
    brandColor: "#009688",
    mastery: 78,
    description: "Async Python API framework",
  },
  {
    name: "PostgreSQL",
    icon: SiPostgresql,
    category: "Backend",
    brandColor: "#4169E1",
    mastery: 82,
    description: "Relational data at scale",
  },
  {
    name: "Redis",
    icon: SiRedis,
    category: "Backend",
    brandColor: "#FF4438",
    mastery: 70,
    description: "In-memory data caching",
  },
  {
    name: "Prisma",
    icon: SiPrisma,
    category: "Backend",
    brandColor: "#5B51D8",
    mastery: 80,
    description: "Type-safe database ORM",
  },
  {
    name: "Docker",
    icon: SiDocker,
    category: "AI & Infra",
    brandColor: "#2496ED",
    mastery: 75,
    description: "Containerized deployments",
  },
  {
    name: "Google Cloud",
    icon: SiGooglecloud,
    category: "AI & Infra",
    brandColor: "#4285F4",
    mastery: 72,
    description: "Cloud infrastructure & serverless",
  },
  {
    name: "Supabase",
    icon: SiSupabase,
    category: "AI & Infra",
    brandColor: "#3ECF8E",
    mastery: 75,
    description: "Open-source BaaS platform",
  },
];

export const categories = [
  "All",
  "Frontend",
  "Backend",
  "Mobile",
  "AI & Infra",
] as const;

export type Category = (typeof categories)[number];
