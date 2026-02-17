"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen scroll-mt-24 overflow-hidden bg-gradient-to-b from-blue-950/40 via-zinc-950 to-zinc-950">
      {/* ================= BACKGROUND ================= */}
      <div className="pointer-events-none absolute inset-0">
        {/* glow */}
        <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-blue-500/20 blur-[180px]" />

        {/* noise */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4"/></filter><rect width="100%" height="100%" filter="url(%23n)"/></svg>\')',
          }}
        />

        {/* fade to next section */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-zinc-950" />
      </div>

      {/* ================= CONTENT ================= */}
      <motion.div variants={container} initial="hidden" animate="show" className="relative mx-auto grid max-w-6xl items-center gap-20 px-6 pt-32 md:grid-cols-[1.2fr_0.8fr]">
        {/* ================= TEXT ================= */}
        <motion.div variants={container} className="space-y-10">
          <motion.div variants={item} className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1 text-sm text-blue-300">
            <span className="h-2 w-2 rounded-full bg-blue-400" />
            Available for collaboration
          </motion.div>

          <motion.h1 variants={item} className="text-[clamp(2.8rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-tight">
            IT Generalist
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-zinc-200 bg-clip-text text-transparent">Web & Mobile Developer</span>
          </motion.h1>

          <motion.p variants={item} className="max-w-xl text-lg leading-relaxed text-zinc-400">
            I design and build modern web and mobile applications with a strong focus on clean architecture, performance, and long-term maintainability.
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap gap-4">
            <a href="#projects" className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-500">
              View Projects
            </a>

            <a href="#contact" className="rounded-xl border border-zinc-700 px-6 py-3 font-medium text-zinc-300 transition hover:bg-zinc-800 hover:text-white">
              Contact Me
            </a>
          </motion.div>
        </motion.div>

        {/* ================= IMAGE ================= */}
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: "easeOut" }} className="relative mx-auto flex flex-col items-center">
          {/* aura */}
          <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute -inset-12 rounded-full bg-blue-500/10 blur-3xl" />

          {/* avatar */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative flex h-[260px] w-[260px] items-center justify-center rounded-full bg-gradient-to-b from-blue-500/40 via-blue-500/10 to-transparent p-[2px] md:h-[300px] md:w-[300px]"
          >
            <div className="flex h-full w-full items-center justify-center rounded-full bg-zinc-950">
              <div className="relative h-[92%] w-[92%] overflow-hidden rounded-full">
                <Image src="/image/profile/hero.jpeg" alt="Ken Zamariyan" fill priority className="object-cover object-[50%_60%]" />
                <span className="absolute bottom-4 right-4 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-zinc-950" />
              </div>
            </div>
          </motion.div>

          {/* name */}
          <div className="mt-6 text-center">
            <p className="text-sm font-semibold tracking-wide text-white">Ken Zamariyan</p>
            <p className="mt-1 text-xs tracking-wide text-zinc-400">IT Generalist · Web & Mobile Developer</p>
          </div>

          {/* floating badges */}
          <motion.span animate={{ y: [0, -6, 0] }} transition={{ duration: 3, repeat: Infinity }} className="absolute -left-6 top-16 rounded-lg border border-zinc-800 bg-zinc-900/70 px-3 py-1 text-xs text-zinc-300 backdrop-blur">
            Next.js
          </motion.span>

          <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 3.5, repeat: Infinity }} className="absolute -right-6 top-32 rounded-lg border border-zinc-800 bg-zinc-900/70 px-3 py-1 text-xs text-zinc-300 backdrop-blur">
            React Native
          </motion.span>

          <motion.span animate={{ y: [0, -4, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute left-4 bottom-24 rounded-lg border border-zinc-800 bg-zinc-900/70 px-3 py-1 text-xs text-zinc-300 backdrop-blur">
            Firebase
          </motion.span>
        </motion.div>
      </motion.div>
    </section>
  );
}
