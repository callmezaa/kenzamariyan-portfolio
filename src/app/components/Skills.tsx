"use client";

import { motion } from "framer-motion";
import {
  SiTypescript, SiReact, SiNextdotjs, SiTailwindcss, SiFirebase,
  SiGo, SiExpress, SiPostgresql, SiRedis, SiDocker, SiGooglecloud, SiPrisma, SiSupabase
} from "react-icons/si";
import type { IconType } from "react-icons";
import { staggerContainer, staggerItem, easeOut } from "../utils/animations";

interface SkillIcon {
  icon: IconType;
  label: string;
}

const skillCategories: {
  title: string;
  icons: SkillIcon[];
  items: string[];
}[] = [
  {
    title: "Frontend Architecture",
    icons: [
      { icon: SiReact, label: "React" },
      { icon: SiNextdotjs, label: "Next.js" },
      { icon: SiTypescript, label: "TypeScript" },
      { icon: SiTailwindcss, label: "Tailwind" },
    ],
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    title: "Mobile Platform",
    icons: [
      { icon: SiReact, label: "React Native" },
      { icon: SiTypescript, label: "TypeScript" },
      { icon: SiFirebase, label: "Firebase" },
    ],
    items: ["React Native", "Expo", "Firebase", "Offline-first"],
  },
  {
    title: "Backend & Database",
    icons: [
      { icon: SiGo, label: "Go" },
      { icon: SiExpress, label: "Express" },
      { icon: SiPostgresql, label: "PostgreSQL" },
      { icon: SiRedis, label: "Redis" },
    ],
    items: ["Go (Gin & Fiber)", "Node.js/Express", "PostgreSQL", "Redis", "FastAPI"],
  },
  {
    title: "Infrastructure & AI",
    icons: [
      { icon: SiDocker, label: "Docker" },
      { icon: SiGooglecloud, label: "GCP" },
      { icon: SiPrisma, label: "Prisma" },
      { icon: SiSupabase, label: "Supabase" },
    ],
    items: ["Docker", "Google Cloud Run", "Prisma", "Supabase", "Gemini/OpenAI API"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="bg-canvas py-24 md:py-28 border-b border-hairline">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <div className="mb-16 max-w-2xl space-y-3">
          <p className="micro-cap text-ink-muted">Capabilities</p>
          <h2 className="display-xl">Expertise Ecosystem</h2>
          <p className="body-lg">A comprehensive mapping of my engineering domains, showcasing the technical depth and workflows I use to launch digital products.</p>
        </div>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="grid gap-6 md:grid-cols-2">
          {skillCategories.map((cat) => (
            <motion.div key={cat.title} variants={staggerItem}>
              <motion.div
                whileHover={{ y: -3 }}
                transition={{ duration: 0.25, ease: easeOut }}
                className="p-6 md:p-8 border border-hairline rounded-sm bg-canvas-card hover:shadow-md transition-shadow duration-300"
              >
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <h3 className="button-cap text-ink">{cat.title}</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.icons.map((item) => (
                        <span key={item.label} className="flex items-center gap-1 rounded-sm border border-hairline px-2 py-1 caption text-ink-muted">
                          <item.icon size={12} />
                          {item.label}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cat.items.map((item, i) => (
                      <motion.span
                        key={item}
                        initial={{ opacity: 0, y: 6 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.2, ease: easeOut, delay: i * 0.02 }}
                        whileHover={{ y: -2 }}
                        className="inline-block rounded-sm border border-hairline px-3 py-1.5 body-md text-ink-muted hover:border-ink hover:text-ink transition-colors duration-200"
                      >
                        {item}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
