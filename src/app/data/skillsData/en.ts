import type { IconType } from "react-icons";
import {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss,
  SiGo, SiExpress, SiPostgresql, SiRedis,
  SiDocker, SiGooglecloud, SiPrisma, SiSupabase,
  SiFirebase, SiExpo, SiNodedotjs, SiFastapi,
  SiMongodb, SiGit,
} from "react-icons/si";

export interface SkillItem {
  name: string;
  icon?: IconType;
  brandColor?: string;
  mastery: number;
  years: number;
}

export interface SkillCategory {
  title: string;
  tagline: string;
  skills: SkillItem[];
}

export const skillsDataEn: SkillCategory[] = [
  {
    title: "Interfaces that convert",
    tagline: "Production web apps with crisp UX and fast loads.",
    skills: [
      { name: "React", icon: SiReact, brandColor: "#61DAFB", mastery: 95, years: 4 },
      { name: "Next.js", icon: SiNextdotjs, mastery: 90, years: 4 },
      { name: "TypeScript", icon: SiTypescript, brandColor: "#3178C6", mastery: 92, years: 4 },
      { name: "Tailwind CSS", icon: SiTailwindcss, brandColor: "#38BDF8", mastery: 85, years: 3 },
      { name: "Framer Motion", mastery: 70, years: 3 },
    ],
  },
  {
    title: "Apps that work offline",
    tagline: "Mobile products that stay reliable without signal.",
    skills: [
      { name: "React Native", icon: SiReact, brandColor: "#61DAFB", mastery: 85, years: 3 },
      { name: "Expo", icon: SiExpo, mastery: 80, years: 3 },
      { name: "Firebase", icon: SiFirebase, brandColor: "#FFCA28", mastery: 75, years: 3 },
      { name: "Offline-first", mastery: 78, years: 2 },
    ],
  },
  {
    title: "Systems that scale",
    tagline: "APIs and data layers built for real traffic.",
    skills: [
      { name: "Go (Gin & Fiber)", icon: SiGo, brandColor: "#00ADD8", mastery: 85, years: 2 },
      { name: "Node.js", icon: SiNodedotjs, brandColor: "#5FA04E", mastery: 82, years: 4 },
      { name: "Express", icon: SiExpress, brandColor: "#000000", mastery: 78, years: 4 },
      { name: "PostgreSQL", icon: SiPostgresql, brandColor: "#4169E1", mastery: 82, years: 3 },
      { name: "Redis", icon: SiRedis, brandColor: "#FF4438", mastery: 70, years: 2 },
      { name: "MongoDB", icon: SiMongodb, brandColor: "#47A248", mastery: 72, years: 2 },
      { name: "REST API", mastery: 85, years: 4 },
      { name: "JWT Auth", mastery: 78, years: 3 },
    ],
  },
  {
    title: "Ship & automate with AI",
    tagline: "Containers, cloud, and AI wired into the workflow.",
    skills: [
      { name: "Docker", icon: SiDocker, brandColor: "#2496ED", mastery: 75, years: 3 },
      { name: "Google Cloud", icon: SiGooglecloud, brandColor: "#4285F4", mastery: 72, years: 2 },
      { name: "Prisma", icon: SiPrisma, brandColor: "#5B51D8", mastery: 80, years: 3 },
      { name: "Supabase", icon: SiSupabase, brandColor: "#3ECF8E", mastery: 75, years: 2 },
      { name: "Git", icon: SiGit, brandColor: "#F05032", mastery: 90, years: 5 },
      { name: "Gemini / OpenAI API", mastery: 68, years: 2 },
    ],
  },
];
