import type { IconType } from "react-icons";
import {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss,
  SiGo, SiExpress, SiPostgresql, SiRedis,
  SiDocker, SiGooglecloud, SiPrisma, SiSupabase,
  SiFirebase, SiExpo, SiNodedotjs, SiFastapi,
} from "react-icons/si";

export interface SkillItem {
  name: string;
  icon?: IconType;
  brandColor?: string;
  mastery: number;
}

export interface SkillCategory {
  title: string;
  skills: SkillItem[];
}

export const skillsData: SkillCategory[] = [
  {
    title: "Frontend Architecture",
    skills: [
      { name: "React", icon: SiReact, brandColor: "#61DAFB", mastery: 95 },
      { name: "Next.js", icon: SiNextdotjs, mastery: 90 },
      { name: "TypeScript", icon: SiTypescript, brandColor: "#3178C6", mastery: 92 },
      { name: "Tailwind CSS", icon: SiTailwindcss, brandColor: "#38BDF8", mastery: 85 },
      { name: "Framer Motion", mastery: 70 },
    ],
  },
  {
    title: "Mobile Platform",
    skills: [
      { name: "React Native", icon: SiReact, brandColor: "#61DAFB", mastery: 85 },
      { name: "Expo", icon: SiExpo, mastery: 80 },
      { name: "Firebase", icon: SiFirebase, brandColor: "#FFCA28", mastery: 75 },
      { name: "Offline-first", mastery: 78 },
    ],
  },
  {
    title: "Backend & Database",
    skills: [
      { name: "Go (Gin & Fiber)", icon: SiGo, brandColor: "#00ADD8", mastery: 85 },
      { name: "Node.js / Express", icon: SiNodedotjs, brandColor: "#5FA04E", mastery: 80 },
      { name: "PostgreSQL", icon: SiPostgresql, brandColor: "#4169E1", mastery: 82 },
      { name: "Redis", icon: SiRedis, brandColor: "#FF4438", mastery: 70 },
      { name: "FastAPI", icon: SiFastapi, brandColor: "#009688", mastery: 78 },
    ],
  },
  {
    title: "Infrastructure & AI",
    skills: [
      { name: "Docker", icon: SiDocker, brandColor: "#2496ED", mastery: 75 },
      { name: "Google Cloud", icon: SiGooglecloud, brandColor: "#4285F4", mastery: 72 },
      { name: "Prisma", icon: SiPrisma, brandColor: "#5B51D8", mastery: 80 },
      { name: "Supabase", icon: SiSupabase, brandColor: "#3ECF8E", mastery: 75 },
      { name: "Gemini / OpenAI API", mastery: 68 },
    ],
  },
];
