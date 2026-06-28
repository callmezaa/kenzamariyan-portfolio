"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SiTypescript, SiReact, SiNextdotjs, SiTailwindcss, SiFirebase, SiGo, SiExpress, SiPostgresql, SiRedis, SiDocker, SiGooglecloud, SiPrisma, SiSupabase } from "react-icons/si";
import { Sparkle } from "lucide-react";
import GlowCard from "./ui/GlowCard";
import { sectionHeader, staggerContainer, staggerItem } from "../utils/animations";

function useIsVisible(threshold = 0.3) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible] as const;
}

export default function Skills() {
  const reduced = useReducedMotion();
  const [gridRef, isVisible] = useIsVisible(0.3);

  // Card 1: Frontend State Toggle
  const [optimizeMode, setOptimizeMode] = useState(false);
  
  // Card 3: Backend Database Latency — only runs when skills section is visible
  const [latency, setLatency] = useState(18);
  useEffect(() => {
    if (!isVisible || reduced) return;
    const interval = setInterval(() => {
      setLatency(Math.floor(14 + Math.random() * 8));
    }, 3000);
    return () => clearInterval(interval);
  }, [isVisible, reduced]);

  // Card 2: Mobile POS Log Queue — simulated real-time transactions
  const products = ["Agriculture Supply", "Harvest Seed Stock", "Organic Fertilizer", "Rice Paddy 50kg", "Corn Feed 25kg", "Palm Oil Crude", "Coffee Beans Arabica", "Cocoa Pods Wet"];
  const amounts = ["$340.00", "$1,250.00", "$85.50", "$670.00", "$210.00", "$1,890.00", "$45.00", "$920.00"];
  const [txQueue, setTxQueue] = useState([
    { id: 9482, desc: "Agriculture Supply", amount: "$340.00" },
    { id: 9481, desc: "Harvest Seed Stock", amount: "$1,250.00" },
  ]);
  const txCounter = useRef(9483);

  useEffect(() => {
    if (!isVisible || reduced) return;
    const interval = setInterval(() => {
      const idx = Math.floor(Math.random() * products.length);
      setTxQueue((prev) => {
        const next = [{ id: txCounter.current, desc: products[idx], amount: amounts[idx] }, ...prev];
        return next.slice(0, 3);
      });
      txCounter.current += 1;
    }, 5000 + Math.random() * 3000);
    return () => clearInterval(interval);
  }, [isVisible, reduced]);

  return (
    <section
      id="skills"
      className="relative bg-canvas py-24 md:py-28 border-b border-white/5"
    >
      <div className="relative mx-auto max-w-6xl px-6 md:px-8">
        
        {/* Section Header */}
        <motion.div
          variants={sectionHeader}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16 max-w-2xl space-y-3"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">Capabilities</p>
          <h2 className="display-lg tracking-tight text-white">
            Expertise Ecosystem
          </h2>
          <p className="body-base">A comprehensive mapping of my engineering domains, showcasing the technical depth and workflows I use to launch digital products.</p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          ref={gridRef}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 md:grid-cols-2"
        >
          
          {/* Card 1: Frontend Architecture */}
          <motion.div variants={staggerItem}>
            <GlowCard glowColor="rgba(99, 102, 241, 0.08)" className="h-full p-6 md:p-8 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Frontend Architecture</h3>
                  <div className="flex gap-1.5">
                    <SiReact className="text-zinc-500 hover:text-indigo-400 transition-colors" size={16} />
                    <SiNextdotjs className="text-zinc-500 hover:text-white transition-colors" size={16} />
                    <SiTypescript className="text-zinc-500 hover:text-blue-400 transition-colors" size={16} />
                    <SiTailwindcss className="text-zinc-500 hover:text-cyan-400 transition-colors" size={16} />
                  </div>
                </div>
                <p className="body-small">
                  Engineering lightning-fast web layers utilizing modular components, server component boundaries, and strict TypeScript types.
                </p>
                <div className="pt-1.5 flex items-center gap-1.5 text-[10px] text-zinc-500 font-medium">
                  <Sparkle size={10} className="text-indigo-400/80 shrink-0" />
                  <span>Impact:</span>
                  <span>Reduces page load times, boosting SEO ranking and user retention.</span>
                </div>
              </div>

              {/* Interactive Widget: Component State Simulator */}
              <div className="mt-8 rounded-lg border border-white/5 bg-black/60 p-4 space-y-3">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-zinc-500">component/PerformanceDashboard.tsx</span>
                  <button 
                    onClick={() => setOptimizeMode(!optimizeMode)}
                    className="rounded bg-white/5 border border-white/10 px-2 py-0.5 text-[9px] text-zinc-300 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                  >
                    {optimizeMode ? "Optimized" : "Standard Mode"}
                  </button>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-zinc-500">
                  <span>Render Latency:</span>
                  <span className={optimizeMode ? "text-emerald-400 font-semibold" : "text-yellow-500 font-semibold"}>
                    {optimizeMode ? "1.2ms" : "8.4ms"}
                  </span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
                  <motion.div 
                    animate={{ width: optimizeMode ? "15%" : "80%" }}
                    transition={{ type: "spring", stiffness: 100 }}
                    className={`h-full rounded-full ${optimizeMode ? "bg-emerald-500" : "bg-yellow-500"}`} 
                  />
                </div>
              </div>
            </GlowCard>
          </motion.div>

          {/* Card 2: Mobile Platform Development */}
          <motion.div
            variants={staggerItem}
          >
            <GlowCard glowColor="rgba(16, 185, 129, 0.06)" className="h-full p-6 md:p-8 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Mobile Platform</h3>
                  <div className="flex gap-1.5">
                    <SiReact className="text-zinc-500 hover:text-emerald-400 transition-colors" size={16} />
                    <SiTypescript className="text-zinc-500 hover:text-blue-400 transition-colors" size={16} />
                    <SiFirebase className="text-zinc-500 hover:text-amber-500 transition-colors" size={16} />
                  </div>
                </div>
                <p className="body-small">
                  Building cross-platform mobile apps using React Native and Expo. Experienced in offline-first architectures, real-time messaging, e-commerce flows, and AI-powered productivity tools.
                </p>
                <div className="pt-1.5 flex items-center gap-1.5 text-[10px] text-zinc-500 font-medium">
                  <Sparkle size={10} className="text-emerald-400/80 shrink-0" />
                  <span>Impact:</span>
                  <span>Shipping React Native apps across POS, e-commerce, messaging, and productivity domains.</span>
                </div>
              </div>

              {/* Interactive Widget: Mobile POS Log Queue */}
              <div className="mt-8 rounded-lg border border-white/5 bg-black/60 p-4 font-mono text-[10px] space-y-2.5">
                <div className="flex justify-between text-zinc-500 text-[9px] border-b border-white/5 pb-1.5">
                  <span>Gotani POS Queue</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Sync Active
                  </span>
                </div>
                {txQueue.map((tx) => (
                  <motion.div
                    key={tx.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex justify-between"
                  >
                    <span className="text-zinc-400">TX #{tx.id}: {tx.desc}</span>
                    <span className={tx.amount === "$1,890.00" || tx.amount === "$920.00" ? "text-emerald-400 font-semibold" : "text-zinc-400"}>
                      {tx.amount}
                    </span>
                  </motion.div>
                ))}
              </div>
            </GlowCard>
          </motion.div>

          {/* Card 3: Backend & Data Integration */}
          <motion.div
            variants={staggerItem}
          >
            <GlowCard glowColor="rgba(6, 182, 212, 0.06)" className="h-full p-6 md:p-8 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Backend & Database</h3>
                  <div className="flex gap-1.5">
                    <SiGo className="text-zinc-500 hover:text-cyan-400 transition-colors" size={16} />
                    <SiExpress className="text-zinc-500 hover:text-green-400 transition-colors" size={16} />
                    <SiPostgresql className="text-zinc-500 hover:text-blue-400 transition-colors" size={16} />
                    <SiRedis className="text-zinc-500 hover:text-red-400 transition-colors" size={16} />
                  </div>
                </div>
                <p className="body-small">
                  Building REST APIs and real-time backends with Node.js/Express, Go (Gin & Fiber), and FastAPI. Using PostgreSQL, Firestore, Redis, and Prisma for data and caching layers.
                </p>
                <div className="pt-1.5 flex items-center gap-1.5 text-[10px] text-zinc-500 font-medium">
                  <Sparkle size={10} className="text-cyan-400/80 shrink-0" />
                  <span>Impact:</span>
                  <span>Delivering full-stack systems with Go, Python, and Node.js across 6 production projects.</span>
                </div>
              </div>

              {/* Interactive Widget: Real-time DB Latency */}
              <div className="mt-8 rounded-lg border border-white/5 bg-black/60 p-4 space-y-4">
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="text-zinc-500">Firestore Read/Write Node</span>
                  <span className="text-cyan-400 font-semibold">{latency}ms</span>
                </div>
                <div className="flex items-end justify-between h-8 gap-[3px] pt-1">
                  {[22, 18, 30, 24, 15, 27, latency].map((val, idx) => (
                    <motion.div
                      key={idx}
                      className="flex-1 rounded-t-xs bg-cyan-500/20 hover:bg-cyan-500/50 transition-colors"
                      animate={{ height: `${(val / 40) * 100}%` }}
                      transition={{ type: "spring", stiffness: 200 }}
                      style={{ minHeight: "4px" }}
                    />
                  ))}
                </div>
              </div>
            </GlowCard>
          </motion.div>

          {/* Card 4: Tooling & Delivery */}
          <motion.div
            variants={staggerItem}
          >
            <GlowCard glowColor="rgba(245, 158, 11, 0.06)" className="h-full p-6 md:p-8 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Infrastructure & AI</h3>
                  <div className="flex gap-1.5">
                    <SiDocker className="text-zinc-500 hover:text-blue-400 transition-colors" size={16} />
                    <SiGooglecloud className="text-zinc-500 hover:text-red-400 transition-colors" size={16} />
                    <SiPrisma className="text-zinc-500 hover:text-green-400 transition-colors" size={16} />
                    <SiSupabase className="text-zinc-500 hover:text-emerald-400 transition-colors" size={16} />
                  </div>
                </div>
                <p className="body-small">
                  Containerizing apps with Docker, deploying on Google Cloud Run, integrating AI via Google Gemini & OpenAI APIs. CI/CD pipelines, Prisma ORM, and Supabase for backend-as-a-service.
                </p>
                <div className="pt-1.5 flex items-center gap-1.5 text-[10px] text-zinc-500 font-medium">
                  <Sparkle size={10} className="text-amber-400/80 shrink-0" />
                  <span>Impact:</span>
                  <span>Shipping production apps with Docker, Cloud Run, and AI-powered features users love.</span>
                </div>
              </div>

              {/* Interactive Widget: AI Integration Demo */}
              <div className="mt-8 rounded-lg border border-white/5 bg-black/60 p-4 font-mono text-[9px] text-zinc-500 space-y-1.5">
                <div className="text-[10px] font-semibold text-indigo-300 flex items-center gap-1.5 mb-1">
                  <Sparkle size={10} /> AI Integration
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-zinc-600">&gt;</span>
                  <div>
                    <span className="text-zinc-400">gemini.analyze(contract.pdf)</span>
                    <div className="text-emerald-400 flex items-center gap-1.5 pt-0.5">
                      <span className="h-1 w-1 rounded-full bg-emerald-400 animate-pulse" />
                      4 red flags detected. Negotiation script ready.
                    </div>
                  </div>
                </div>
              </div>
            </GlowCard>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
