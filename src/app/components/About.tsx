"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "motion/react";
import { Calendar, MapPin, Briefcase, Clock, Globe, Sparkles } from "lucide-react";
import { easeOut } from "../utils/animations";
import { projects } from "../data/projects";
import { techArsenal } from "../data/techArsenal";
import { AnimatedNumber } from "@/components/motion/animated-number";
import TechArsenal from "./TechArsenal";
import { Reveal } from "@/components/motion/reveal/Reveal";

export default function About() {
  const t = useTranslations("about");
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

  const infoItems = [
    { icon: Calendar, label: t("infoItems.experience.label"), desc: t("infoItems.experience.desc"), badgeIcon: Clock, color: "#3B82F6" },
    { icon: MapPin, label: t("infoItems.location.label"), desc: t("infoItems.location.desc"), badgeIcon: Globe, color: "#22C55E" },
    { icon: Briefcase, label: t("infoItems.freelance.label"), desc: t("infoItems.freelance.desc"), badgeIcon: Sparkles, color: "#F59E0B" },
  ];

  const stats: {
    value: number;
    label: string;
    suffix?: string;
    format?: (n: number) => string;
    reveal: string;
  }[] = [
    { value: projects.length, label: t("stats.projects.label"), suffix: "+", reveal: t("stats.projects.reveal") },
    { value: 2, label: t("stats.years.label"), reveal: t("stats.years.reveal") },
    { value: techArsenal.length, label: t("stats.technologies.label"), reveal: t("stats.technologies.reveal") },
    { value: 4, label: t("stats.opensource.label"), suffix: "+", reveal: t("stats.opensource.reveal") },
  ];

  return (
    <section id="about" className="bg-canvas py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <div className="grid items-center gap-10 md:grid-cols-12 md:gap-14 lg:gap-20">
          <Reveal variant="mask" className="space-y-6 md:col-span-7">
            <p className="label text-ink-muted">{t("label")}</p>
            <h2 className="display-xl text-balance">{t("heading")}</h2>
            <p className="body-base">{t.rich("description", {
              time: (chunks) => <strong className="font-semibold text-ink tabular-nums">{chunks}</strong>
            })}</p>
          </Reveal>
          <div className="space-y-8 md:col-span-5">
            {infoItems.map((item, i) => (
              <Reveal key={item.label} variant="fade" delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -2, transition: { duration: 0.3, ease: easeOut } }}
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
              </Reveal>
            ))}
          </div>
        </div>

        {/* Animated Stat Band */}
        <Reveal variant="rise" className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-[20px] bg-hairline shadow-1 md:grid-cols-4">
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
        </Reveal>

        <Reveal className="mt-20 pt-10 border-t border-hairline">
          <p className="label text-ink-muted text-center mb-6">{t("techArsenalLabel")}</p>
          <TechArsenal />
        </Reveal>
      </div>
    </section>
  );
}
