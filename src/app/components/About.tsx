"use client";

import { motion } from "framer-motion";
import { SiReact, SiNextdotjs, SiGo, SiPython, SiFastapi, SiPostgresql, SiDocker, SiGooglecloud, SiTypescript } from "react-icons/si";
import GlowCard from "./ui/GlowCard";
import { fadeUp, slideLeft, slideRight, staggerContainer, staggerItem, sectionHeader } from "../utils/animations";


export default function About() {
  return (
    <section id="about" className="relative bg-canvas py-24 md:py-28 border-b border-white/5">
      <div className="relative mx-auto max-w-6xl px-6 md:px-8">
        <div className="grid items-center gap-14 md:grid-cols-2 md:gap-20">
          
          {/* Left Column Text details */}
          <motion.div
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6 text-white"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">About Me</p>
            <h2 className="display-lg tracking-tight text-white">
              Building reliable digital products with
              <span className="text-primary-on-dark"> clarity</span> and
              <span className="text-primary-on-dark"> purpose</span>.
            </h2>
            
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="w-full text-lg font-normal leading-relaxed text-zinc-300"
            >
              I build full-stack products across web, mobile, and AI layers — using TypeScript, Go, Python, and PostgreSQL. My work spans AI contract analysis, mobile POS systems, e-commerce platforms, real-time messaging, and productivity tools.
            </motion.p>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="w-full text-sm leading-relaxed text-zinc-500"
            >
              From containerized backends on Google Cloud Run to offline-first React Native apps serving rural cooperatives — I focus on shipping reliable, maintainable systems that solve real problems.
            </motion.p>
          </motion.div>
          <div className="relative flex items-center justify-center overflow-hidden rounded-lg md:min-h-[440px]">
            {/* Animated gradient background */}
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-[100%] bg-[conic-gradient(from_0deg,#6366f1,#8b5cf6,#06b6d4,#10b981,#6366f1)] opacity-[0.15] blur-3xl"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/20 via-zinc-950 to-emerald-950/20 rounded-lg border border-white/5" />
            <div className="absolute inset-0 mesh-grid opacity-[0.15] rounded-lg" />
            
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative z-10 w-full space-y-4 px-6 md:px-8"
            >
              {[
                {
                  title: "Full-Stack Engineering",
                  desc: "I build across the entire stack — React/Next.js frontends, Node.js & Go APIs, Python AI services, and PostgreSQL databases.",
                },
                {
                  title: "AI-Powered Products",
                  desc: "I integrate Google Gemini & OpenAI APIs into production apps — from contract analysis to AI chat assistants and smart productivity features.",
                },
                {
                  title: "Multi-Platform Delivery",
                  desc: "I ship responsive web apps, React Native mobile experiences, and Dockerized backends deployed on cloud infrastructure.",
                },
              ].map((item) => (
                <motion.div
                  key={item.title}
                  variants={staggerItem}
                >
                  <GlowCard
                    glowColor="rgba(99, 102, 241, 0.08)"
                    radialSize={220}
                    className="p-5 border-white/10 bg-black/60 hover:bg-zinc-900/40 hover:border-white/20"
                  >
                    <h3 className="mb-1 text-sm font-semibold text-white transition duration-200 group-hover:text-primary-on-dark">{item.title}</h3>
                    <p className="body-small">{item.desc}</p>
                  </GlowCard>
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>

        {/* Credibility / Collaborations & Stack Strip */}
        <motion.div
          variants={sectionHeader}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-20 pt-10 border-t border-white/5"
        >
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest text-center mb-6">
            Trusted Frameworks & Client Collaborations
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-75 hover:opacity-100 transition-opacity duration-500">
            <span className="flex items-center gap-3 opacity-75 hover:opacity-100 transition-opacity" title="React & Next.js">
              <SiReact size={22} />
              <SiNextdotjs size={20} />
            </span>
            <SiGo size={24} className="opacity-75 hover:opacity-100 transition-opacity" title="Go (Gin & Fiber)" />
            <span className="flex items-center gap-3 opacity-75 hover:opacity-100 transition-opacity" title="Python (FastAPI)">
              <SiPython size={22} />
              <SiFastapi size={20} />
            </span>
            <SiPostgresql size={22} className="opacity-75 hover:opacity-100 transition-opacity" title="PostgreSQL" />
            <span className="flex items-center gap-3 opacity-75 hover:opacity-100 transition-opacity" title="Docker & GCP">
              <SiDocker size={24} />
              <SiGooglecloud size={20} />
            </span>
            <SiTypescript size={22} className="opacity-75 hover:opacity-100 transition-opacity" title="TypeScript" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
