"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Briefcase } from "lucide-react";
import { SiReact, SiNextdotjs, SiGo, SiPython, SiFastapi, SiPostgresql, SiDocker, SiGooglecloud, SiTypescript } from "react-icons/si";
import { easeOut } from "../utils/animations";

const infoItems = [
  { icon: Calendar, label: "4+ Years Experience", desc: "Full-stack & mobile product engineering" },
  { icon: MapPin, label: "Based in Indonesia", desc: "Remote-friendly, global timezone" },
  { icon: Briefcase, label: "Open to Freelance & Collaboration", desc: "Available for contracts & partnerships" },
];

const techStack = [
  { name: "React", icon: SiReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "Go", icon: SiGo },
  { name: "Python", icon: SiPython },
  { name: "FastAPI", icon: SiFastapi },
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "Docker", icon: SiDocker },
  { name: "Google Cloud", icon: SiGooglecloud },
  { name: "TypeScript", icon: SiTypescript },
];

export default function About() {
  return (
    <section id="about" className="bg-canvas py-24 md:py-28 border-b border-hairline">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, ease: easeOut }}
            className="space-y-6"
          >
            <p className="micro-cap text-ink-muted">About Me</p>
            <h2 className="display-xl">Building reliable digital products with clarity and purpose.</h2>
            <p className="body-lg">Shipping production apps across web, mobile, and AI — from AI contract analyzers processing documents under 15 seconds to offline-first mobile POS serving 1,500+ cooperative members. TypeScript, Go, Python, and PostgreSQL, end to end.</p>
          </motion.div>
          <div className="space-y-8">
            {infoItems.map((item, i) => (
              <motion.div key={item.label}
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.4, ease: easeOut, delay: i * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-hairline text-ink-muted">
                  <item.icon size={18} />
                </div>
                <div>
                  <p className="body-md font-bold text-ink">{item.label}</p>
                  <p className="body-md text-ink-muted">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-20 pt-10 border-t border-hairline"
        >
          <p className="micro-cap text-ink-muted text-center mb-6">Technology Arsenal</p>
          <div className="flex flex-wrap justify-center gap-0.5">
            {techStack.map((tech, i) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, ease: easeOut, delay: i * 0.03 }}
              >
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2, ease: easeOut }}
                  className="flex flex-col items-center justify-center gap-1 w-[72px] h-[72px] border border-hairline bg-canvas-card hover:bg-canvas hover:shadow-md transition-colors duration-200"
                >
                  <tech.icon size={20} className="text-ink-muted" />
                  <span className="caption text-ink-muted leading-none">{tech.name}</span>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
