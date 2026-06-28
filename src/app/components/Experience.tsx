"use client";

import { motion } from "framer-motion";
import { experiences, type ExperienceType } from "../data/experience";
import GlowCard from "./ui/GlowCard";
import { sectionHeader, slideLeft } from "../utils/animations";

const typeLabels: Record<ExperienceType, string> = {
  work: "Professional",
  education: "Academic",
  organization: "Leadership",
};

const badgeColors: Record<ExperienceType, string> = {
  work: "border-indigo-500/20 bg-indigo-500/5 text-indigo-300",
  education: "border-emerald-500/20 bg-emerald-500/5 text-emerald-300",
  organization: "border-cyan-500/20 bg-cyan-500/5 text-cyan-300",
};

export default function Experience() {
  return (
    <section id="experience" className="relative bg-canvas py-24 md:py-28 border-b border-white/5">
      <div className="relative mx-auto max-w-6xl px-6 md:px-8">
        
        {/* Section Header */}
        <motion.div
          variants={sectionHeader}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16 max-w-2xl space-y-3"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">Career Journey</p>
          <h2 className="display-lg tracking-tight text-white">
            Professional Timeline
          </h2>
          <p className="body-base">
            A timeline of full-stack projects across AI, fintech, e-commerce, agritech, and productivity — from freelance delivery to hackathon wins.
          </p>
        </motion.div>

        {/* Release-Log Style Timeline */}
        <div className="relative space-y-10 md:space-y-12 pl-6 sm:pl-8 ml-2 sm:ml-4">
          
          {/* Continuous timeline line */}
          <div className="absolute left-[3px] sm:left-[4px] top-0 bottom-0 w-px bg-white/10 pointer-events-none" />
          
          {experiences.map((exp, index) => {
            return (
              <motion.div
                key={`${exp.title}-${index}`}
                variants={slideLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="relative group"
              >
                {/* Timeline Node Dot */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-6 flex h-5 w-5 items-center justify-center">
                  <div className="h-3 w-3 rounded-full bg-zinc-800 border border-white/20 transition-all duration-300 group-hover:bg-primary group-hover:scale-150 group-hover:border-primary-on-dark" />
                </div>

                <div className="grid md:grid-cols-12 gap-4 items-start">
                  
                  {/* Left Column: Date & Badge (3 cols) */}
                  <div className="md:col-span-3 space-y-1">
                    <span className="font-mono text-xs font-semibold text-zinc-400 block">{exp.year}</span>
                    <span className={`inline-block rounded-md border px-2 py-0.5 text-[9px] font-bold tracking-wider uppercase ${badgeColors[exp.type]}`}>
                      {typeLabels[exp.type]}
                    </span>
                  </div>

                  {/* Right Column: Card Details (9 cols) */}
                  <div className="md:col-span-9">
                    <GlowCard
                      glowColor="rgba(99, 102, 241, 0.06)"
                      radialSize={350}
                      className="p-5 md:p-6 bg-surface-tile-1 border-white/10 hover:border-white/20"
                    >
                      <div className="space-y-3">
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <h3 className="text-[15px] sm:text-[17px] font-bold text-white tracking-tight font-display group-hover:text-primary-on-dark transition-colors duration-200">
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
                  
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
