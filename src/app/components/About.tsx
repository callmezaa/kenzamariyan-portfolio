"use client";

import { useState, type CSSProperties } from "react";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "motion/react";
import { Calendar, MapPin, Briefcase, ArrowRight } from "lucide-react";
import { easeOut } from "../utils/animations";
import { AnimatedNumber } from "@/components/motion/animated-number";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal/Reveal";
import { SpotlightCard } from "@/components/motion/hover/SpotlightCard";
import { TransitionLink } from "@/components/motion/transition/TransitionLink";

interface AboutProps {
  projectCount: number;
  techArsenalCount: number;
}

export default function About({ projectCount, techArsenalCount }: AboutProps) {
  const t = useTranslations("about");
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

  const infoItems = [
    { icon: Calendar, label: t("infoItems.experience.label"), desc: t("infoItems.experience.desc"), color: "#3B82F6" },
    { icon: MapPin, label: t("infoItems.location.label"), desc: t("infoItems.location.desc"), color: "#22C55E" },
    { icon: Briefcase, label: t("infoItems.freelance.label"), desc: t("infoItems.freelance.desc"), color: "#F59E0B" },
  ];

  const stats: {
    value: number;
    label: string;
    suffix?: string;
    format?: (n: number) => string;
    reveal: string;
    color: string;
  }[] = [
    { value: projectCount, label: t("stats.projects.label"), suffix: "+", reveal: t("stats.projects.reveal"), color: "#3B82F6" },
    { value: 2, label: t("stats.years.label"), reveal: t("stats.years.reveal"), color: "#F59E0B" },
    { value: techArsenalCount, label: t("stats.technologies.label"), reveal: t("stats.technologies.reveal"), color: "#22C55E" },
    { value: 4, label: t("stats.opensource.label"), suffix: "+", reveal: t("stats.opensource.reveal"), color: "#A855F7" },
  ];

  return (
    <section id="about" className="bg-canvas py-16 md:py-24">
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
                <SpotlightCard className="flex items-center gap-4 rounded-[14px] bg-canvas-card shadow-1 hover:shadow-2 p-5 transition-shadow duration-300">
                  <div className="about-icon-tile"
                    style={{ "--tile-accent": item.color } as CSSProperties}>
                    <item.icon size={18} strokeWidth={2} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="body-base font-semibold text-ink">{item.label}</p>
                    <p className="body-small text-ink-muted mt-0.5">{item.desc}</p>
                  </div>
                </SpotlightCard>
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
              style={{ "--stat-accent": stat.color } as CSSProperties}
              className="group relative flex flex-col items-center gap-1 bg-canvas-card px-4 py-7 text-center cursor-default transition-colors duration-150 ease-out hover:bg-surface-hover"
            >
              <span
                aria-hidden="true"
                className="absolute top-3 left-1/2 h-[2px] w-8 -translate-x-1/2 rounded-full opacity-30 transition-opacity duration-150 ease-out group-hover:opacity-100"
                style={{ background: stat.color }}
              />
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

        <Reveal className="mt-10 flex justify-center">
          <TransitionLink href="/about">
            <Button variant="outline" size="lg" className="btn-3d-outline rounded-full">
              {t("moreLink")} <ArrowRight data-icon="inline-end" />
            </Button>
          </TransitionLink>
        </Reveal>
      </div>
    </section>
  );
}
