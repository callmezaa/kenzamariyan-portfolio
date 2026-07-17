"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Calendar, MapPin, Briefcase, Clock, Globe, Sparkles } from "lucide-react";
import { easeOut } from "../utils/animations";
import { projects } from "../data/projects";
import { techArsenal } from "../data/techArsenal";
import { AnimatedNumber } from "@/components/motion/animated-number";
import TechArsenal from "./TechArsenal";

const infoItems = [
  { icon: Calendar, label: "4+ Years Experience", desc: "Full-stack & mobile product engineering", badgeIcon: Clock, color: "#3B82F6" },
  { icon: MapPin, label: "Based in Indonesia", desc: "Remote-friendly, global timezone", badgeIcon: Globe, color: "#22C55E" },
  { icon: Briefcase, label: "Open to Freelance & Collaboration", desc: "Available for contracts & partnerships", badgeIcon: Sparkles, color: "#F59E0B" },
];

const formatThousands = (n: number) => Math.round(n).toLocaleString();

export default function About() {
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

  const stats = [
    { value: projects.length, label: "Projects Shipped", suffix: "+", reveal: "contracts · mobile · AI" },
    { value: 4, label: "Years Experience", reveal: "since 2020" },
    { value: techArsenal.length, label: "Technologies", reveal: "react → go" },
    { value: 1500, label: "Users Served", suffix: "+", format: formatThousands, reveal: "served worldwide" },
  ];

  return (
    <section id="about" className="bg-canvas py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <div className="grid items-center gap-10 md:grid-cols-12 md:gap-14 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, ease: easeOut }}
            className="space-y-6 md:col-span-7"
          >
            <p className="label text-ink-muted">About Me</p>
            <h2 className="display-xl text-balance">Building reliable digital products with clarity and purpose.</h2>
            <p className="body-base">Shipping production apps across web, mobile, and AI — from AI contract analyzers processing documents under{" "}
              <strong className="font-semibold text-ink tabular-nums">15 seconds</strong>
              {" "}to offline-first mobile POS serving{" "}
              <strong className="font-semibold text-ink tabular-nums">1,500+</strong>
              {" "}cooperative members. TypeScript, Go, Python, and PostgreSQL, end to end.</p>
          </motion.div>
          <div className="space-y-8 md:col-span-5">
            {infoItems.map((item, i) => (
              <motion.div key={item.label}
                whileHover={{ y: -2, transition: { duration: 0.3, ease: easeOut } }}
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.4, ease: easeOut, delay: i * 0.1 }}
                className="flex items-start gap-4 rounded-[14px] bg-canvas-card shadow-1 hover:shadow-2 p-5 transition-shadow duration-300"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface-soft"
                  style={{ color: item.color }}>
                  <item.icon size={18} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="body-base font-semibold text-ink">{item.label}</p>
                  <p className="body-small text-ink-muted mt-0.5">{item.desc}</p>
                </div>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-soft text-ink-tertiary">
                  <item.badgeIcon size={14} />
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Animated Stat Band */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5, ease: easeOut, delay: 0.1 }}
          className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-[20px] bg-hairline shadow-1 md:grid-cols-4"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              onMouseEnter={() => setHoveredStat(i)}
              onMouseLeave={() => setHoveredStat(null)}
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: easeOut, delay: reduceMotion ? 0 : 0.15 + i * 0.08 }}
              className="relative flex flex-col items-center gap-1 bg-canvas-card px-4 py-7 text-center cursor-default"
            >
              <p className="display-lg font-semibold text-ink tabular-nums">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} format={stat.format} duration={1.2} />
              </p>
              <div className="relative h-5 overflow-hidden">
                <motion.p
                  animate={{ y: hoveredStat === i ? -20 : 0, opacity: hoveredStat === i ? 0 : 1 }}
                  transition={{ duration: 0.2, ease: easeOut }}
                  className="body-small text-ink-muted text-balance"
                >
                  {stat.label}
                </motion.p>
                <motion.p
                  animate={{ y: hoveredStat === i ? 0 : 20, opacity: hoveredStat === i ? 1 : 0 }}
                  transition={{ duration: 0.2, ease: easeOut }}
                  className="body-small text-ink-tertiary text-balance absolute inset-0"
                >
                  {stat.reveal}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-20 pt-10 border-t border-hairline"
        >
          <p className="label text-ink-muted text-center mb-6">Technology Arsenal</p>
          <TechArsenal />
        </motion.div>
      </div>
    </section>
  );
}
