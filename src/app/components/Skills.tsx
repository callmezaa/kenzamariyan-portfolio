"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { 
  SiHtml5, 
  SiCss3, 
  SiJavascript, 
  SiTypescript, 
  SiReact, 
  SiNextdotjs, 
  SiTailwindcss, 
  SiFirebase, 
  SiGit, 
  SiFigma 
} from "react-icons/si";

// Define brand specifications for each tech badge
const skillGroups = [
  {
    title: "Frontend",
    items: [
      { name: "HTML", icon: SiHtml5, glow: "rgba(227, 79, 38, 0.15)", iconColor: "group-hover/badge:text-[#e34f26]", borderHover: "hover:border-[#e34f26]/30" },
      { name: "CSS", icon: SiCss3, glow: "rgba(21, 114, 182, 0.15)", iconColor: "group-hover/badge:text-[#1572b6]", borderHover: "hover:border-[#1572b6]/30" },
      { name: "JavaScript", icon: SiJavascript, glow: "rgba(247, 223, 30, 0.12)", iconColor: "group-hover/badge:text-[#f7df1e]", borderHover: "hover:border-[#f7df1e]/30" },
      { name: "TypeScript", icon: SiTypescript, glow: "rgba(49, 120, 198, 0.15)", iconColor: "group-hover/badge:text-[#3178c6]", borderHover: "hover:border-[#3178c6]/30" },
      { name: "React", icon: SiReact, glow: "rgba(97, 218, 251, 0.15)", iconColor: "group-hover/badge:text-[#61dafb]", borderHover: "hover:border-[#61dafb]/30" },
      { name: "Next.js", icon: SiNextdotjs, glow: "rgba(255, 255, 255, 0.12)", iconColor: "group-hover/badge:text-white", borderHover: "hover:border-white/30" },
      { name: "Tailwind CSS", icon: SiTailwindcss, glow: "rgba(56, 189, 248, 0.15)", iconColor: "group-hover/badge:text-[#38bdf8]", borderHover: "hover:border-[#38bdf8]/30" },
    ],
  },
  {
    title: "Mobile",
    items: [
      { name: "React Native", icon: SiReact, glow: "rgba(97, 218, 251, 0.15)", iconColor: "group-hover/badge:text-[#61dafb]", borderHover: "hover:border-[#61dafb]/30" },
    ],
  },
  {
    title: "Backend & Data",
    items: [
      { name: "Firebase", icon: SiFirebase, glow: "rgba(255, 202, 40, 0.15)", iconColor: "group-hover/badge:text-[#ffca28]", borderHover: "hover:border-[#ffca28]/30" },
    ],
  },
  {
    title: "Tools & Others",
    items: [
      { name: "Git", icon: SiGit, glow: "rgba(240, 80, 50, 0.15)", iconColor: "group-hover/badge:text-[#f05032]", borderHover: "hover:border-[#f05032]/30" },
      { name: "UI/UX Basics", icon: SiFigma, glow: "rgba(242, 78, 30, 0.15)", iconColor: "group-hover/badge:text-[#f24e1e]", borderHover: "hover:border-[#f24e1e]/30" },
    ],
  },
];

// Interactive 3D Parallax Tilt & Spotlight Card Wrapper
function InteractiveSkillsCard({ title, children }: { title: string; children: React.ReactNode }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, active: false });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setSpotlight({ x, y, active: true });

    // Calculate dynamic 3D tilt coordinates (Max 8 degrees tilt)
    const rotateX = ((y / rect.height) - 0.5) * -8;
    const rotateY = ((x / rect.width) - 0.5) * 8;

    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setSpotlight((prev) => ({ ...prev, active: false }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)",
      }}
      className="group relative overflow-hidden rounded-2xl border border-zinc-900 bg-zinc-950/40 p-6 backdrop-blur-xl transition duration-500 hover:border-zinc-800 md:p-8"
    >
      {/* Dynamic Cursor Spotlight Border Glow */}
      {spotlight.active && (
        <div
          className="pointer-events-none absolute -inset-px rounded-3xl transition duration-500 opacity-100"
          style={{
            background: `radial-gradient(220px circle at ${spotlight.x}px ${spotlight.y}px, rgba(59, 130, 246, 0.15), transparent 80%)`,
          }}
        />
      )}

      {/* Dynamic Background Spotlight Radial Flare */}
      {spotlight.active && (
        <div
          className="pointer-events-none absolute -inset-px rounded-3xl transition duration-500 opacity-100 z-0"
          style={{
            background: `radial-gradient(350px circle at ${spotlight.x}px ${spotlight.y}px, rgba(59, 130, 246, 0.04), transparent 80%)`,
          }}
        />
      )}

      <div className="relative z-10">
        <h3 className="mb-6 text-base font-bold text-zinc-300 uppercase tracking-wider">{title}</h3>
        {children}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative scroll-mt-24 overflow-hidden bg-gradient-to-b from-zinc-950 via-zinc-950 to-black py-24 md:py-32"
    >
      {/* ambient glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/3 top-1/3 h-96 w-96 rounded-full bg-blue-500/5 blur-[160px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        
        {/* HEADER */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.8, ease: "easeOut" }} 
          className="mb-16 max-w-xl space-y-3"
        >
          <p className="text-xs uppercase tracking-widest font-bold text-blue-400">Capabilities</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-zinc-100 tracking-tight">
            Skills <span className="text-blue-400">Stack</span>
          </h2>
          <p className="text-zinc-400 leading-relaxed max-w-sm">A curated set of technologies I use to craft reliable and scalable digital products.</p>
        </motion.div>

        {/* INTERACTIVE SKILL GROUPS */}
        <div className="grid gap-8 md:grid-cols-2">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
                delay: i * 0.15,
              }}
            >
              <InteractiveSkillsCard title={group.title}>
                <div className="flex flex-wrap gap-4">
                  {group.items.map(({ name, icon: Icon, glow, iconColor, borderHover }) => (
                    <div
                      key={name}
                      style={{
                        // Apply inline styling variables for Framer/CSS transition hover glow colors
                        "--brand-glow": glow,
                      } as React.CSSProperties}
                      className={`
                        group/badge flex items-center gap-3
                        rounded-xl border border-zinc-900 bg-zinc-950/70 px-4 py-3
                        transition-all duration-300 
                        ${borderHover}
                        hover:bg-[var(--brand-glow)] hover:shadow-[0_0_20px_var(--brand-glow)]
                      `}
                    >
                      <Icon
                        size={20}
                        className={`text-zinc-500 transition duration-300 group-hover/badge:scale-110 ${iconColor}`}
                      />
                      <span className="text-sm font-medium text-zinc-400 transition duration-300 group-hover/badge:text-white">
                        {name}
                      </span>
                    </div>
                  ))}
                </div>
              </InteractiveSkillsCard>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
