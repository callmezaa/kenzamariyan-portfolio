import {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss,
  SiGo, SiExpress, SiPostgresql, SiRedis,
  SiDocker, SiGooglecloud, SiPrisma, SiSupabase,
  SiFirebase, SiExpo, SiNodedotjs, SiFastapi,
  SiMongodb, SiGit,
} from "react-icons/si";
import type { SkillCategory } from "./en";

export const skillsDataId: SkillCategory[] = [
  {
    title: "Antarmuka yang Konversi",
    tagline: "Aplikasi web produksi dengan UX tajam dan muatan cepat.",
    skills: [
      { name: "React", icon: SiReact, brandColor: "#61DAFB", mastery: 95, years: 2 },
      { name: "Next.js", icon: SiNextdotjs, mastery: 90, years: 2 },
      { name: "TypeScript", icon: SiTypescript, brandColor: "#3178C6", mastery: 92, years: 2 },
      { name: "Tailwind CSS", icon: SiTailwindcss, brandColor: "#38BDF8", mastery: 85, years: 2 },
      { name: "Framer Motion", mastery: 70, years: 2 },
    ],
  },
  {
    title: "Aplikasi yang Bekerja Offline",
    tagline: "Produk mobile yang tetap andal tanpa sinyal.",
    skills: [
      { name: "React Native", icon: SiReact, brandColor: "#61DAFB", mastery: 85, years: 2 },
      { name: "Expo", icon: SiExpo, mastery: 80, years: 2 },
      { name: "Firebase", icon: SiFirebase, brandColor: "#FFCA28", mastery: 75, years: 2 },
      { name: "Offline-first", mastery: 78, years: 2 },
    ],
  },
  {
    title: "Sistem yang Berskala",
    tagline: "API dan lapisan data yang dibangun untuk lalu lintas nyata.",
    skills: [
      { name: "Go (Gin & Fiber)", icon: SiGo, brandColor: "#00ADD8", mastery: 85, years: 2 },
      { name: "Node.js", icon: SiNodedotjs, brandColor: "#5FA04E", mastery: 82, years: 2 },
      { name: "Express", icon: SiExpress, brandColor: "#000000", mastery: 78, years: 2 },
      { name: "PostgreSQL", icon: SiPostgresql, brandColor: "#4169E1", mastery: 82, years: 2 },
      { name: "Redis", icon: SiRedis, brandColor: "#FF4438", mastery: 70, years: 2 },
      { name: "MongoDB", icon: SiMongodb, brandColor: "#47A248", mastery: 72, years: 2 },
      { name: "REST API", mastery: 85, years: 2 },
      { name: "JWT Auth", mastery: 78, years: 2 },
    ],
  },
  {
    title: "Kirim & Otomatiskan dengan AI",
    tagline: "Kontainer, cloud, dan AI terintegrasi dalam alur kerja.",
    skills: [
      { name: "Docker", icon: SiDocker, brandColor: "#2496ED", mastery: 75, years: 2 },
      { name: "Google Cloud", icon: SiGooglecloud, brandColor: "#4285F4", mastery: 72, years: 2 },
      { name: "Prisma", icon: SiPrisma, brandColor: "#5B51D8", mastery: 80, years: 2 },
      { name: "Supabase", icon: SiSupabase, brandColor: "#3ECF8E", mastery: 75, years: 2 },
      { name: "Git", icon: SiGit, brandColor: "#F05032", mastery: 90, years: 2 },
      { name: "Gemini / OpenAI API", mastery: 68, years: 2 },
    ],
  },
];
