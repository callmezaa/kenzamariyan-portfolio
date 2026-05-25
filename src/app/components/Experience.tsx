"use client";

import { motion } from "framer-motion";
import { experiences, type ExperienceType } from "../data/experience";

const typeMeta: Record<ExperienceType, { label: string; color: string; dot: string }> = {
  work: {
    label: "Work",
    color: "border-blue-500/30 bg-blue-500/10 text-blue-300",
    dot: "bg-blue-400",
  },
  education: {
    label: "Education",
    color: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
    dot: "bg-emerald-400",
  },
  organization: {
    label: "Organization",
    color: "border-violet-500/30 bg-violet-500/10 text-violet-300",
    dot: "bg-violet-400",
  },
};

export default function Experience() {
  return (
    <section id="experience" className="relative scroll-mt-24 overflow-hidden bg-gradient-to-b from-zinc-950 via-zinc-950 to-black py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-1/4 top-1/3 h-96 w-96 rounded-full bg-blue-500/5 blur-[160px]" />
        <div className="absolute left-1/4 bottom-1/3 h-64 w-64 rounded-full bg-blue-600/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-14 max-w-xl space-y-3 md:mb-20"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-blue-400">Career Journey</p>
          <h2 className="text-3xl font-semibold text-zinc-100 md:text-4xl">
            Experience & <span className="text-blue-400">Education</span>
          </h2>
          <p className="leading-relaxed text-zinc-400">A concise timeline of project ownership, freelance work, and academic foundation.</p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-4 top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-zinc-700/60 to-transparent md:left-1/2 md:block" />
          <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-transparent via-zinc-700/60 to-transparent md:hidden" />

          <div className="space-y-8 md:space-y-10">
            {experiences.map((exp, index) => {
              const isLeft = index % 2 === 0;
              const meta = typeMeta[exp.type];

              return (
                <motion.div
                  key={`${exp.title}-${index}`}
                  initial={{ opacity: 0, x: isLeft ? -28 : 28, y: 10 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.04 }}
                  className={`relative flex items-start gap-6 md:gap-0 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  <div
                    className={`group relative ml-12 flex-1 rounded-2xl border border-zinc-800/60 bg-zinc-900/30 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:bg-zinc-900/50 md:ml-0 ${
                      isLeft ? "md:mr-8" : "md:ml-8"
                    }`}
                  >
                    <div className="relative space-y-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium tracking-wide ${meta.color}`}>{meta.label}</span>
                        <span className="font-mono text-xs text-zinc-500">{exp.year}</span>
                      </div>

                      <h3 className="text-base font-semibold text-zinc-100 transition-colors duration-300 group-hover:text-blue-400 md:text-lg">{exp.title}</h3>

                      <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-400">
                        <span className="font-medium text-zinc-300">{exp.place}</span>
                        <span className="text-zinc-700">/</span>
                        <span>{exp.location}</span>
                      </div>

                      <p className="text-sm leading-relaxed text-zinc-500">{exp.description}</p>

                      <div className="flex flex-wrap gap-2 pt-1">
                        {exp.tags.map((tag) => (
                          <span key={tag} className="rounded-md border border-zinc-800/80 bg-zinc-950/60 px-2.5 py-1 text-[11px] text-zinc-400">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="absolute left-4 top-6 hidden items-center justify-center md:left-1/2 md:flex">
                    <div className={`z-10 h-3.5 w-3.5 -translate-x-1/2 rounded-full ring-4 ring-zinc-950 ${meta.dot}`} />
                  </div>
                  <div className="absolute left-4 top-6 flex items-center justify-center md:hidden">
                    <div className={`z-10 h-3 w-3 -translate-x-1/2 rounded-full ring-4 ring-zinc-950 ${meta.dot}`} />
                  </div>
                  <div className="hidden flex-1 md:block" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
