"use client";

import { motion } from "framer-motion";
import {
  SiTypescript, SiReact, SiNextdotjs, SiTailwindcss, SiFirebase,
  SiGo, SiExpress, SiPostgresql, SiRedis, SiDocker, SiGooglecloud, SiPrisma, SiSupabase
} from "react-icons/si";
import { staggerContainer, staggerItem } from "../utils/animations";

const skillCategories = [
  {
    title: "Frontend Architecture",
    icons: [SiReact, SiNextdotjs, SiTypescript, SiTailwindcss],
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    title: "Mobile Platform",
    icons: [SiReact, SiTypescript, SiFirebase],
    items: ["React Native", "Expo", "Firebase", "Offline-first"],
  },
  {
    title: "Backend & Database",
    icons: [SiGo, SiExpress, SiPostgresql, SiRedis],
    items: ["Go (Gin & Fiber)", "Node.js/Express", "PostgreSQL", "Redis", "FastAPI"],
  },
  {
    title: "Infrastructure & AI",
    icons: [SiDocker, SiGooglecloud, SiPrisma, SiSupabase],
    items: ["Docker", "Google Cloud Run", "Prisma", "Supabase", "Gemini/OpenAI API"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="relative bg-canvas py-24 md:py-28 border-b border-hairline">
      <div className="relative mx-auto max-w-6xl px-6 md:px-8">
        <div className="mb-16 max-w-2xl space-y-3">
          <p className="micro-cap text-ink-muted">Capabilities</p>
          <h2 className="display-xl">Expertise Ecosystem</h2>
          <p className="body-lg">A comprehensive mapping of my engineering domains, showcasing the technical depth and workflows I use to launch digital products.</p>
        </div>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="grid gap-6 md:grid-cols-2">
          {skillCategories.map((cat) => (
            <motion.div key={cat.title} variants={staggerItem}
              className="p-6 md:p-8 border border-hairline rounded-sm bg-canvas-card">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="button-cap text-ink">{cat.title}</h3>
                  <div className="flex gap-2 text-ink-muted">
                    {cat.icons.map((Icon, i) => <Icon key={i} size={16} />)}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <span key={item} className="rounded-sm border border-hairline px-3 py-1.5 body-md text-ink-muted">{item}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
