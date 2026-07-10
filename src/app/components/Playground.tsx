"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Sparkle, SwatchBook, Github } from "lucide-react";
import GlowCard from "./ui/GlowCard";
import { seqHeader, seqLabel, seqTitle, seqDesc } from "../utils/animations";
import { useReducedVariants } from "../utils/useReducedAnimation";

interface Experiment {
  title: string;
  desc: string;
  tags: string[];
  icon: typeof Sparkle;
  accent: string;
  glowColor: string;
  href?: string;
  githubUrl?: string;
  comingSoon?: boolean;
}

const experiments: Experiment[] = [
  {
    title: "Palette Studio",
    desc: "Extract dominant colors from any image — explore harmonies, gradients, contrast ratios, and 3D visualizations. A premium color toolkit for designers.",
    tags: ["Next.js", "Three.js", "TypeScript"],
    icon: SwatchBook,
    accent: "#f59e0b",
    glowColor: "rgba(245, 158, 11, 0.08)",
    href: "https://pallete-studio-ten.vercel.app",
    githubUrl: "https://github.com/callmezaa/Pallete-studio",
  },
];

function Ticker({ accent }: { accent: string }) {
  const [frame, setFrame] = useState(0);
  const bars = [12, 24, 38, 52, 30, 44, 18, 36, 48, 22, 40, 28];

  useEffect(() => {
    const interval = setInterval(() => setFrame((f) => (f + 1) % bars.length), 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-end gap-[2px] h-8">
      {bars.map((h, i) => {
        const active = (frame + i) % bars.length < 3;
        return (
          <span
            key={i}
            className="w-full rounded-t-xs transition-all duration-300"
            style={{
              height: `${h * 0.5 + (active ? 12 : 0)}%`,
              backgroundColor: active ? accent : "rgba(255,255,255,0.04)",
            }}
          />
        );
      })}
    </div>
  );
}

function ExperimentCard({ exp, index }: { exp: Experiment; index: number }) {
  const Icon = exp.icon;

  return (
    <GlowCard
      glowColor={exp.glowColor}
      radialSize={280}
      className="p-6 md:p-7 bg-surface-tile-1 border-white/10 hover:border-white/20 h-full flex flex-col justify-between"
    >
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border"
            style={{
              backgroundColor: `${exp.accent}12`,
              borderColor: `${exp.accent}20`,
            }}
          >
            <Icon size={16} style={{ color: exp.accent }} aria-hidden="true" />
          </span>
          {exp.comingSoon && (
            <span className="shrink-0 rounded-full border border-white/5 bg-white/[0.03] px-2.5 py-0.5 text-[9px] font-medium text-zinc-500">
              Coming Soon
            </span>
          )}
        </div>

        <div className="space-y-1.5">
          <h3 className="text-sm font-semibold text-white font-display tracking-tight">
            {exp.title}
          </h3>
          <p className="body-small leading-relaxed">
            {exp.desc}
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <Ticker accent={exp.accent} />

        <div className="flex flex-wrap gap-1.5">
          {exp.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-white/5 bg-white/[0.03] px-2 py-0.5 text-[9px] font-medium text-zinc-500"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-white/5">
          {exp.href && !exp.comingSoon ? (
            <div className="flex items-center gap-3">
              <a
                href={exp.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-press inline-flex items-center gap-1.5 text-[11px] font-semibold transition-colors"
                style={{ color: exp.accent }}
              >
                <span>Live Demo</span>
              <ExternalLink size={12} aria-hidden="true" />
            </a>
            {exp.githubUrl && (
              <a
                href={exp.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-press inline-flex items-center gap-1.5 text-[11px] font-medium text-zinc-500 transition-colors hover:text-white"
              >
                <Github size={12} aria-hidden="true" />
                  <span>Source</span>
                </a>
              )}
            </div>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-zinc-600">
              <Sparkle size={12} aria-hidden="true" /> On the workbench
            </span>
          )}
        </div>
      </div>
    </GlowCard>
  );
}

export default function Playground() {
  const { staggerContainer: container, flipCard } = useReducedVariants();

  return (
    <section id="playground" className="relative bg-canvas py-24 md:py-28 border-b border-white/5">
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
            Experiments
          </motion.p>
          <motion.h2 variants={seqTitle} className="display-lg tracking-tight text-white">
            Playground
          </motion.h2>
          <motion.p variants={seqDesc} className="body-base">
            Tiny curiosities and side quests — where I explore ideas outside the
            constraints of production code.
          </motion.p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-5 md:grid-cols-2 lg:grid-cols-4"
        >
          {experiments.map((exp, i) => (
            <motion.div key={exp.title} variants={flipCard}>
              <ExperimentCard exp={exp} index={i} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
