"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { Briefcase, GraduationCap } from "lucide-react";
import type { Experience } from "@/app/data/experience";
import { appleSpring } from "@/app/utils/animations";

interface JourneyTimelineProps {
  experiences: Experience[];
  visuals?: ReactNode[];
}

export function JourneyTimeline({ experiences, visuals }: JourneyTimelineProps) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.75", "end 0.6"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 22 });

  return (
    <ol ref={ref} className="relative space-y-12 pl-10">
      <span
        aria-hidden="true"
        className="absolute left-[7px] top-1 bottom-1 w-px bg-hairline"
      />
      <motion.span
        aria-hidden="true"
        style={{ scaleY }}
        className="absolute left-[7px] top-1 bottom-1 w-px origin-top bg-gradient-to-b from-ink to-ink/30"
      />
      {experiences.map((exp, i) => (
        <li key={`${exp.year}-${exp.title}`} className="relative">
          <motion.span
            aria-hidden="true"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={appleSpring}
            className="absolute -left-10 top-1 flex h-4 w-4 items-center justify-center rounded-full border border-hairline bg-canvas-card"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-ink" />
          </motion.span>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className={
              visuals?.[i]
                ? "grid items-start gap-6 md:grid-cols-[1.2fr_0.8fr] md:gap-8"
                : undefined
            }
          >
            <div className="space-y-2 min-w-0">
            <div className="flex items-center gap-2">
              <span className="label rounded-full bg-surface-active px-2.5 py-0.5 text-ink tabular-nums">
                {exp.year}
              </span>
              <span className="flex items-center gap-1 label text-ink-tertiary">
                {exp.type === "work" ? (
                  <Briefcase size={11} />
                ) : (
                  <GraduationCap size={11} />
                )}
                {exp.type}
              </span>
            </div>
            <h3 className="body-lg font-semibold text-ink">{exp.title}</h3>
            <p className="body-small text-ink-muted">
              {exp.place} · {exp.location}
            </p>
            <p className="body-base text-ink-muted leading-relaxed max-w-prose">
              {exp.description}
            </p>
            </div>
            {visuals?.[i] ? (
              <div className="min-w-0">{visuals[i]}</div>
            ) : null}
          </motion.div>
        </li>
      ))}
    </ol>
  );
}
