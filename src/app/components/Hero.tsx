"use client";

import Image from "next/image";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { Sparkle, Download } from "lucide-react";
import Button from "./ui/Button";
import Magnetic from "./ui/Magnetic";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const credibilityMetrics = [
  { value: "9", label: "Products Shipped", desc: "AI apps, mobile POS, dashboards & marketplaces" },
  { value: "6", label: "Technologies", desc: "React, Go, Python, PostgreSQL, Docker & Cloud" },
  { value: "5", label: "Industries Served", desc: "Agritech, fintech, legal-tech, e-commerce & productivity" },
  { value: "8+", label: "Production Deployments", desc: "GCP Cloud Run, Vercel, Docker, Supabase & Firebase" },
];

export default function Hero() {
  const reduced = useReducedMotion();

  return (
    <section id="home" className="relative overflow-hidden bg-canvas pt-36 pb-20 min-h-screen flex flex-col justify-between">
      {/* Background Layers */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
        {/* Base gradient - subtle warm dark */}
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/[0.08] via-transparent to-emerald-950/[0.06]" />

        {/* Hero gradient orbs */}
        <div className="absolute top-[5%] -left-[15%] h-[350px] w-[350px] rounded-full bg-indigo-500/12 blur-[120px]" />
        <div className="absolute top-[25%] -right-[12%] h-[280px] w-[280px] rounded-full bg-violet-500/10 blur-[100px]" />
        <div className="absolute -bottom-[5%] left-[35%] h-[250px] w-[250px] rounded-full bg-emerald-500/8 blur-[100px]" />

        {/* Subtle dot overlay */}
        <div className="absolute inset-0 mesh-grid opacity-20" />

        {/* Subtle radial vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#030303_80%)]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 md:px-8 w-full flex-1 flex flex-col justify-center z-10">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col lg:grid lg:grid-cols-12 gap-12 items-center"
        >
          {/* Text block */}
          <div className="lg:col-span-7 w-full space-y-8 text-left">
            {/* Role Badge */}
            <motion.div
              variants={item}
              className="inline-flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-3.5 py-1.5 text-xs font-medium tracking-tight text-primary-on-dark"
            >
              <Sparkle size={10} className="text-primary-on-dark" />
              <span>React + Go + AI</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={item}
              className="hero-display text-white"
            >
              I build products that work.{" "}
              <span className="text-glow">Web, mobile & AI</span>{" "}
              — shipped to production.
            </motion.h1>

            {/* Value Proposition */}
            <motion.p
              variants={item}
              className="text-base md:text-lg text-zinc-300 font-normal leading-relaxed w-full"
            >
              Full-stack developer building with React, Go, Python, and cloud infrastructure.{" "}
              From AI-powered contract analyzers to offline-first mobile POS systems —{" "}
              I ship products that work in production.
            </motion.p>

            {/* Call To Actions */}
            <motion.div
              variants={item}
              className="flex flex-row items-center gap-4 pt-2"
            >
              <Magnetic strength={0.3}>
                <Button variant="primary" href="#projects">
                  Explore Work
                </Button>
              </Magnetic>
              
              <Button
                variant="secondary"
                href="/CV_Ken_Zamariyan.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download
              >
                <span>Download CV</span>
                <Download size={16} className="text-zinc-400" />
              </Button>
            </motion.div>
          </div>

          {/* Portrait Block — Premium Circular Avatar */}
          <div className="lg:col-span-5 w-full flex justify-center lg:justify-end">
            <div className="flex flex-col items-center">
              <motion.div
                variants={item}
                className="relative flex items-center justify-center"
              >
                {/* Ambient glow halo */}
                <motion.div
                  animate={reduced ? { scale: 1 } : { scale: [1, 1.06, 1] }}
                  transition={reduced ? {} : { duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute h-[250px] w-[250px] lg:h-[330px] lg:w-[330px] rounded-full bg-indigo-500/15 blur-[60px] pointer-events-none"
                />

                {/* Gradient ring */}
                <div className="absolute h-[208px] w-[208px] lg:h-[272px] lg:w-[272px] rounded-full p-[1.5px] opacity-60">
                  <div className="h-full w-full rounded-full bg-gradient-to-br from-indigo-400 via-violet-500 to-emerald-400" />
                </div>

                {/* Avatar image */}
                <div className="relative h-[200px] w-[200px] lg:h-[260px] lg:w-[260px] overflow-hidden rounded-full border-[1.5px] border-white/10 shadow-2xl z-10 bg-zinc-900">
                  <Image
                    src="/image/profile/hero.jpeg"
                    alt="Ken Zamariyan"
                    fill
                    priority
                    sizes="(max-width: 1024px) 200px, 260px"
                    className="object-cover object-[center_60%]"
                  />
                  {/* Subtle bottom vignette for depth */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 pointer-events-none rounded-full" />
                </div>
              </motion.div>

              {/* Status badge */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="mt-4 lg:mt-5 flex items-center gap-1.5 lg:gap-2 rounded-full border border-white/10 bg-black/80 backdrop-blur-md px-3 py-1.5 lg:px-4 lg:py-2 shadow-xl"
              >
                <span className="relative flex h-1.5 w-1.5 lg:h-2 lg:w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 lg:h-2 lg:w-2 rounded-full bg-emerald-500" />
                </span>
                <span className="text-[10px] lg:text-[11px] font-semibold text-zinc-200 tracking-wide whitespace-nowrap">
                  Available for work
                </span>
              </motion.div>
            </div>
          </div>

        </motion.div>
      </div>

      {/* Credibility Strip */}
      <div className="relative border-t border-white/5 bg-black/40 backdrop-blur-xs py-8 z-10">
        <div className="mx-auto max-w-6xl px-6 md:px-8 w-full">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
            {credibilityMetrics.map((metric, i) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                className="space-y-1.5"
              >
                <div className="text-2xl font-bold tracking-tight text-white flex items-baseline gap-1 font-display">
                  <span>{metric.value}</span>
                  {i < 3 && <span className="text-primary text-lg">+</span>}
                </div>
                <div className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">{metric.label}</div>
                <div className="body-small text-zinc-500 line-clamp-2">{metric.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
