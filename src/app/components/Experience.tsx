"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Users, type LucideIcon } from "lucide-react";
import { experiences, type ExperienceType } from "../data/experience";
import GlowCard from "./ui/GlowCard";
import { seqHeader, seqLabel, seqTitle, seqDesc, timelineItem, timelineDot, timelineCard } from "../utils/animations";

const typeConfig: Record<ExperienceType, { label: string; icon: LucideIcon; border: string; bg: string; text: string; glow: string; dot: string; ring: string }> = {
  work: {
    label: "Professional",
    icon: Briefcase,
    border: "border-indigo-500/20",
    bg: "bg-indigo-500/5",
    text: "text-indigo-300",
    glow: "rgba(99, 102, 241, 0.08)",
    dot: "bg-indigo-400",
    ring: "ring-indigo-500/30",
  },
  education: {
    label: "Academic",
    icon: GraduationCap,
    border: "border-emerald-500/20",
    bg: "bg-emerald-500/5",
    text: "text-emerald-300",
    glow: "rgba(16, 185, 129, 0.08)",
    dot: "bg-emerald-400",
    ring: "ring-emerald-500/30",
  },
  organization: {
    label: "Leadership",
    icon: Users,
    border: "border-cyan-500/20",
    bg: "bg-cyan-500/5",
    text: "text-cyan-300",
    glow: "rgba(6, 182, 212, 0.08)",
    dot: "bg-cyan-400",
    ring: "ring-cyan-500/30",
  },
};

export default function Experience() {
  return (
    <section id="experience" className="relative bg-canvas py-24 md:py-28 border-b border-white/5">
      <div className="relative mx-auto max-w-6xl px-6 md:px-8">
        
        {/* Section Header */}
        <motion.div
          variants={seqHeader}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16 max-w-2xl space-y-3"
        >
          <motion.p variants={seqLabel} className="text-xs font-semibold uppercase tracking-widest text-primary">Career Journey</motion.p>
          <motion.h2 variants={seqTitle} className="display-lg tracking-tight text-white">
            Professional Timeline
          </motion.h2>
          <motion.p variants={seqDesc} className="body-base">
            A timeline of full-stack projects across AI, fintech, e-commerce, agritech, and productivity — from freelance delivery to hackathon wins.
          </motion.p>
        </motion.div>

        {/* Release-Log Style Timeline */}
        <div className="relative space-y-10 md:space-y-12">
          
          {/* Continuous timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-white/10 pointer-events-none" />
          
          {experiences.map((exp, index) => {
            const cfg = typeConfig[exp.type];
            const Icon = cfg.icon;
            return (
              <motion.div
                key={`${exp.title}-${index}`}
                variants={timelineItem}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="relative pl-8 group"
              >
                {/* Timeline Node Dot — reveals first */}
                <motion.div variants={timelineDot} className="absolute left-4 -translate-x-1/2 top-6 flex h-5 w-5 items-center justify-center">
                  <div className={`h-3 w-3 rounded-full ${cfg.dot} ring-2 ${cfg.ring} transition-all duration-300 group-hover:scale-[2]`} />
                </motion.div>

                <motion.div variants={timelineCard} className="grid md:grid-cols-12 gap-4 items-start">
                   
                  {/* Left Column: Icon + Date + Badge (3 cols) */}
                  <div className="md:col-span-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className={`flex h-6 w-6 items-center justify-center rounded-md ${cfg.bg} ${cfg.border} border`}>
                        <Icon size={13} className={cfg.text} aria-hidden="true" />
                      </span>
                      <span className="font-mono text-xs font-semibold text-zinc-400">{exp.year}</span>
                    </div>
                    <span className={`inline-block rounded-md border px-2 py-0.5 text-[9px] font-bold tracking-wider uppercase ${cfg.border} ${cfg.bg} ${cfg.text}`}>
                      {cfg.label}
                    </span>
                  </div>

                  {/* Right Column: Card Details (9 cols) */}
                  <div className="md:col-span-9">
                    <GlowCard
                      glowColor={cfg.glow}
                      radialSize={350}
                      className="p-5 md:p-6 bg-surface-tile-1 border-white/10 transition-all duration-300 hover:translate-x-1 hover:shadow-[0_0_24px_rgba(255,255,255,0.03)] hover:border-white/20"
                    >
                      <div className="space-y-3">
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <h3 className="text-[15px] sm:text-[17px] font-bold text-white tracking-tight font-display transition-colors duration-200">
                            {exp.title}
                          </h3>
                          <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-medium">
                            <span>{exp.place}</span>
                            <span className="text-zinc-700">/</span>
                            <span className="text-zinc-500 text-[11px] font-normal">{exp.location}</span>
                          </div>
                        </div>

                        <p className="body-small">
                          {exp.description}
                        </p>

                        {/* Tech Tags */}
                        <div className="flex flex-wrap gap-1.5 pt-1.5 border-t border-white/5">
                          {exp.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded bg-white/5 px-2 py-0.5 text-[10px] font-normal text-zinc-400 border border-white/5"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </GlowCard>
                  </div>
                  
                </motion.div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
