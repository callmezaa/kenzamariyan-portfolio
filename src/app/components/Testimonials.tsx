"use client";

import { motion } from "framer-motion";
import { Award, BookOpen, Medal, ExternalLink } from "lucide-react";
import GlowCard from "./ui/GlowCard";
import { seqHeader, seqLabel, seqTitle, seqDesc, staggerContainer, staggerItem } from "../utils/animations";
import { useReducedVariants } from "../utils/useReducedAnimation";

interface Achievement {
  icon: typeof Award;
  title: string;
  issuer: string;
  year: string;
  description: string;
  color: string;
  glowColor: string;
  href?: string;
}

const achievements: Achievement[] = [
  {
    icon: Award,
    title: "AI Contract Analysis",
    issuer: "Hackathon Winner",
    year: "2025",
    description:
      "Built ContractChill — an AI-powered legal document analyzer using Google Gemini. Awarded for innovation in legal-tech automation under 48 hours.",
    color: "text-indigo-400",
    glowColor: "rgba(99, 102, 241, 0.08)",
    href: "https://github.com/callmezaa/contract-chill",
  },
  {
    icon: BookOpen,
    title: "Full-Stack Engineering",
    issuer: "Professional Training",
    year: "2024",
    description:
      "Completed comprehensive training in modern full-stack development — covering React, Next.js, Go, Python, PostgreSQL, Docker, and cloud deployment workflows.",
    color: "text-emerald-400",
    glowColor: "rgba(16, 185, 129, 0.08)",
  },
  {
    icon: Medal,
    title: "Enterprise App Recognition",
    issuer: "Gotani Mobile POS",
    year: "2024",
    description:
      "Developed offline-first mobile POS system adopted by agricultural cooperatives. Recognized for reducing manual bookkeeping errors by 90% in rural operations.",
    color: "text-cyan-400",
    glowColor: "rgba(6, 182, 212, 0.08)",
  },
];

export default function Testimonials() {
  const { staggerContainer: container, staggerItem: item } = useReducedVariants();

  return (
    <section id="testimonials" className="relative bg-canvas py-24 md:py-28 border-b border-white/5">
      <div className="relative mx-auto max-w-6xl px-6 md:px-8">
        {/* Section Header */}
        <motion.div
          variants={seqHeader}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16 max-w-2xl space-y-3"
        >
          <motion.p variants={seqLabel} className="text-xs font-semibold uppercase tracking-widest text-primary">
            Credentials
          </motion.p>
          <motion.h2 variants={seqTitle} className="display-lg tracking-tight text-white">
            Achievements & Recognition
          </motion.h2>
          <motion.p variants={seqDesc} className="body-base">
            Awards, certificates, and notable milestones from real projects shipped to production.
          </motion.p>
        </motion.div>

        {/* Achievement Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-5 md:grid-cols-3"
        >
          {achievements.map((ach) => {
            const Icon = ach.icon;
            return (
              <motion.div key={ach.title} variants={item}>
                <GlowCard
                  glowColor={ach.glowColor}
                  radialSize={250}
                  className="p-6 bg-surface-tile-1 border-white/10 hover:border-white/20 h-full flex flex-col"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border"
                      style={{
                        backgroundColor: `${ach.color.replace("text-", "").replace("400", "")}18`,
                        borderColor: `${ach.color.replace("text-", "").replace("400", "")}25`,
                      }}
                    >
                      <Icon size={16} className={ach.color} />
                    </span>
                    <span className="rounded-full border border-white/5 bg-white/[0.03] px-2 py-0.5 text-[9px] font-medium text-zinc-500">
                      {ach.year}
                    </span>
                  </div>

                  <div className="space-y-1 flex-1">
                    <h3 className="text-sm font-semibold text-white font-display tracking-tight">{ach.title}</h3>
                    <p className="text-[10px] font-medium text-zinc-400 uppercase tracking-wider">{ach.issuer}</p>
                    <p className="body-small pt-1 leading-relaxed">{ach.description}</p>
                  </div>

                  {ach.href && (
                    <div className="pt-4 mt-auto border-t border-white/5">
                      <a
                        href={ach.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-press inline-flex items-center gap-1.5 text-[11px] font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
                      >
                        <ExternalLink size={12} />
                        <span>View Project</span>
                      </a>
                    </div>
                  )}
                </GlowCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
