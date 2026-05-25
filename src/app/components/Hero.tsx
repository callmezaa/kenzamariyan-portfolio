"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Magnetic from "./ui/Magnetic";

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
      <motion.div variants={container} initial="hidden" animate="show" className="relative mx-auto grid max-w-6xl items-center gap-16 px-6 pt-32 md:grid-cols-[1.2fr_0.8fr] min-h-[calc(100vh-80px)]">
        {/* ================= TEXT ================= */}
        <motion.div variants={container} className="space-y-8">
          <motion.div variants={item} className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-blue-300">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
            Available for collaboration
          </motion.div>

          <motion.h1 variants={item} className="text-[clamp(2.7rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-tight">
            Frontend & Mobile
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-zinc-200 bg-clip-text text-transparent">Developer</span>
          </motion.h1>

          <motion.p variants={item} className="max-w-xl text-base md:text-lg leading-relaxed text-zinc-400">
            I build practical React, Next.js, and React Native products with clean interfaces, Firebase-backed workflows, and maintainable frontend architecture.
          </motion.p>

          {/* Action CTAs */}
          <motion.div variants={item} className="flex flex-wrap gap-6 items-center">
            <Magnetic>
              <a 
                href="#projects" 
                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition duration-300 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/20"
              >
                View Projects
              </a>
            </Magnetic>

            <Magnetic>
              <a 
                href="/CV_Ken_Zamariyan.pdf" 
                target="_blank" 
                rel="noopener noreferrer" 
                download
                className="group inline-flex items-center gap-2 px-4 py-3 font-semibold text-zinc-400 transition duration-300 hover:text-blue-400"
              >
                <span>Download CV</span>
                <span className="relative">
                  <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  {/* Subtle minimalist underline */}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-blue-400 transition-all duration-300 group-hover:w-full" />
                </span>
              </a>
            </Magnetic>
          </motion.div>
        </motion.div>

        {/* ================= IMAGE ================= */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: "easeOut" }} className="relative mx-auto flex flex-col items-center">
          {/* aura */}
          <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute -inset-12 rounded-full bg-blue-500/5 blur-3xl" />

          {/* avatar with frosted ring */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative flex h-[280px] w-[280px] items-center justify-center rounded-full border border-white/10 bg-white/5 p-3 backdrop-blur-md transition duration-500 hover:border-blue-500/30 hover:shadow-[0_0_50px_rgba(59,130,246,0.15)] md:h-[320px] md:w-[320px]"
          >
            <div className="relative h-full w-full overflow-hidden rounded-full ring-1 ring-white/10">
              <Image src="/image/profile/hero.jpeg" alt="Ken Zamariyan" fill priority className="object-cover object-[50%_60%]" />
              <span className="absolute bottom-4 right-4 h-3.5 w-3.5 rounded-full bg-emerald-400 ring-2 ring-zinc-950" />
            </div>
          </motion.div>

          {/* floating badges with staggered floating keyframes and frosted glass */}
          <motion.span 
            animate={{ y: [0, -10, 0] }} 
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} 
            className="absolute -left-4 top-16 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-zinc-300 backdrop-blur-xl shadow-lg"
          >
            Next.js
          </motion.span>

          <motion.span 
            animate={{ y: [0, 10, 0] }} 
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }} 
            className="absolute -right-4 top-32 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-zinc-300 backdrop-blur-xl shadow-lg"
          >
            React Native
          </motion.span>

          <motion.span 
            animate={{ y: [0, -8, 0] }} 
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }} 
            className="absolute left-8 bottom-16 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-zinc-300 backdrop-blur-xl shadow-lg"
          >
            Firebase
          </motion.span>
        </motion.div>
      </motion.div>
    </section>
  );
}
