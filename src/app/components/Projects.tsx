"use client";

import { ExternalLink, Sparkle, FileText, AlertTriangle, Award, Lock, Github } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { projects, type Project, type ProjectType } from "../data/projects";
import GlowCard from "./ui/GlowCard";
import Button from "./ui/Button";
import { useState, useEffect } from "react";
import { sectionHeader, seqHeader, seqLabel, seqTitle, seqDesc, fadeUp, staggerContainer, staggerItem, slideLeft, slideRight } from "../utils/animations";

function ProjectPreview({ type }: { type: ProjectType }) {
  const reduced = useReducedMotion();
  const [salesCount, setSalesCount] = useState(1280);
  const [orderPulse, setOrderPulse] = useState(false);

  // Auto-update stats to simulate real-time POS transaction intake
  useEffect(() => {
    if (type !== "mobile" && type !== "dashboard" && type !== "messaging" || reduced) return;
    const interval = setInterval(() => {
      setSalesCount((prev) => prev + 1);
      setOrderPulse(true);
      setTimeout(() => setOrderPulse(false), 800);
    }, 4500);
    return () => clearInterval(interval);
  }, [type, reduced]);

  // AI / Fullstack mockup (browser + AI badge)
  if (type === "ai" || type === "fullstack") {
    const isAi = type === "ai";
    return (
      <div className="relative mx-auto w-full max-w-[520px] aspect-[3/2] overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950 product-shadow transition-all duration-300 hover:scale-105 select-none">
        <div className="flex items-center gap-1.5 border-b border-zinc-800 bg-zinc-900 px-3.5 py-2">
          <div className="flex gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500/60" />
            <span className="h-1.5 w-1.5 rounded-full bg-yellow-500/60" />
            <span className="h-1.5 w-1.5 rounded-full bg-green-500/60" />
          </div>
          <div className="flex h-3.5 flex-1 items-center rounded border border-zinc-850 bg-zinc-950 px-2 font-mono text-[4.5px] text-zinc-500">
            {isAi ? "contractchill.app/analyze" : "assetra.marketplace"}
          </div>
          {isAi && (
            <span className="flex items-center gap-1 rounded bg-indigo-500/10 px-1.5 py-0.5 text-[4.5px] font-bold text-indigo-400">
              <Sparkle size={8} /> AI
            </span>
          )}
        </div>
        <div className="flex h-[calc(100%-22px)] gap-2 bg-zinc-900 p-2.5 text-[5px]">
          {/* Left: Document viewer */}
          <div className="flex-1 space-y-1.5 rounded border border-zinc-800 bg-zinc-950 p-2">
            <div className="flex items-center gap-1 border-b border-zinc-800 pb-1 text-[4px] text-zinc-500">
              <FileText size={8} /> contract.pdf
            </div>
            {[60, 90, 75, 85, 50, 70].map((w, i) => (
              <div key={i} className={`h-1 rounded-full bg-zinc-800`} style={{ width: `${w}%` }} />
            ))}
          </div>
          {/* Right: AI analysis panel */}
          <div className="w-24 space-y-1.5">
            <div className="rounded border border-red-500/20 bg-red-500/5 p-1.5">
              <div className="flex items-center gap-1 text-[4px] font-bold text-red-400 mb-0.5">
                <AlertTriangle size={7} /> High Risk
              </div>
              <div className="h-1 rounded-full bg-red-500/30 w-full" />
              <div className="h-1 rounded-full bg-red-500/30 w-3/4 mt-0.5" />
            </div>
            <div className="rounded border border-emerald-500/20 bg-emerald-500/5 p-1.5">
              <div className="text-[4px] font-bold text-emerald-400 mb-0.5">AI Summary</div>
              <div className="h-1 rounded-full bg-emerald-500/30 w-full" />
              <div className="h-1 rounded-full bg-emerald-500/30 w-2/3 mt-0.5" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Mobile phone mockup (mobile + messaging types)
  if (type === "mobile" || type === "messaging") {
    const isMessaging = type === "messaging";
    return (
      <div className="relative mx-auto w-[150px] md:w-[200px] aspect-[130/250] rounded-[32px] border-4 border-zinc-800 bg-zinc-950 p-2 product-shadow transition-all duration-300 hover:scale-105 select-none">
        <div className="absolute left-1/2 top-2 h-2.5 w-12 -translate-x-1/2 rounded-full bg-zinc-800" />
        
        <div className="flex h-full flex-col justify-between overflow-hidden rounded-[24px] bg-zinc-900 p-2.5 text-[6px] text-zinc-300">
          {isMessaging ? (
            <>
              <div className="flex items-center justify-between border-b border-zinc-800 pb-1.5 pt-1">
                <span className="text-[7.5px] font-semibold tracking-tight text-white font-display">NexTalk</span>
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
              </div>
              <div className="my-auto space-y-2">
                {["Alex: Hey! Check this out", "You: Looks great!", "Sarah: Meeting at 3?"].map((msg, i) => (
                  <div key={i} className={`flex ${i === 1 ? "justify-end" : "justify-start"}`}>
                    <div className={`rounded-lg px-2 py-1 ${i === 1 ? "bg-blue-500/20" : "bg-zinc-800"}`}>
                      <span className="text-[5px]">{msg}</span>
                    </div>
                  </div>
                ))}
                <div className="flex items-center gap-1 rounded-full bg-blue-500/10 px-2 py-0.5 text-[4px] text-blue-400">
                  <Sparkle size={7} /> NexBot AI online
                </div>
              </div>
              <div className="flex justify-around border-t border-zinc-800 pt-1.5 text-[5px] text-zinc-500">
                <span className="text-blue-400">Chat</span>
                <span>Groups</span>
                <span>Story</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between border-b border-zinc-800 pb-1.5 pt-1">
                <span className="text-[7.5px] font-semibold tracking-tight text-white font-display">
                  {type === "mobile" ? "gotani.pos" : "app"}
                </span>
                <span className={`h-1.5 w-1.5 rounded-full bg-emerald-500 ${orderPulse ? "scale-150 animate-ping" : "scale-100"}`} />
              </div>
              
              <div className="my-auto space-y-2.5">
                <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-1.5">
                  <div className="mb-1 flex justify-between text-[5px] font-medium text-zinc-500">
                    <span>TX Ledger</span>
                    <span className="font-bold text-emerald-400">+{salesCount - 1270}</span>
                  </div>
                  <div className="flex h-12 items-end gap-[2px]">
                    {[30, 48, 88, 64, 82].map((height, i) => (
                      <motion.span 
                        key={i} 
                        className="w-full rounded-t-[1px] bg-emerald-500/60" 
                        animate={{ height: `${height}%` }}
                        transition={{ type: "spring", stiffness: 100, delay: i * 0.05 }}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="space-y-1">
                  {["Fresh Produce", "Transaction Sync"].map((label, idx) => (
                    <div key={label} className="rounded-md border border-zinc-800 bg-zinc-950/60 p-1.5 flex justify-between items-center">
                      <div className="space-y-0.5">
                        <div className="h-1 w-10 rounded-xs bg-zinc-700" />
                        <div className="h-0.5 w-6 rounded-xs bg-zinc-800" />
                      </div>
                      <span className={`h-1 w-1 rounded-full ${idx === 0 ? "bg-indigo-400" : "bg-emerald-400"}`} />
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-around border-t border-zinc-800 pt-1.5 text-[5px] font-mono text-zinc-500">
                <span className="text-emerald-400">POS Grid</span>
                <span>Ledger</span>
                <span>Profile</span>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  const isDashboard = type === "dashboard";

  // Browser Mockup
  return (
    <div className="relative mx-auto w-full max-w-[520px] aspect-[3/2] overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950 product-shadow transition-all duration-300 hover:scale-105 select-none">
      {/* Window Controls Header */}
      <div className="flex items-center gap-1.5 border-b border-zinc-800 bg-zinc-900 px-3.5 py-2">
        <div className="flex gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-red-500/60" />
          <span className="h-1.5 w-1.5 rounded-full bg-yellow-500/60" />
          <span className="h-1.5 w-1.5 rounded-full bg-green-500/60" />
        </div>
        <div className="flex h-3.5 flex-1 items-center rounded border border-zinc-850 bg-zinc-950 px-2 font-mono text-[4.5px] text-zinc-500">
          {isDashboard ? "admin.gotani.com/dashboard" : "kpjmi.or.id/portal"}
        </div>
      </div>

      {isDashboard ? (
        // Dashboard Content
        <div className="flex h-[calc(100%-22px)] gap-2 bg-zinc-900 p-2.5 text-[5px] text-zinc-400">
          <div className="w-12 space-y-1.5 border-r border-zinc-800 pr-1.5 text-zinc-500">
            <div className="rounded bg-zinc-800 px-1 py-0.5 font-semibold text-white">Hub</div>
            <div className="px-1 py-0.5">Transactions</div>
            <div className="px-1 py-0.5">Inventory</div>
          </div>
          <div className="flex flex-1 flex-col gap-1.5">
            <div className="grid grid-cols-2 gap-1.5">
              <div className="rounded border border-zinc-800 bg-zinc-950 p-1 flex items-center justify-between">
                <div>
                  <span className="text-[3px] text-zinc-500">POS Sales</span>
                  <div className="mt-0.5 text-[5.5px] font-bold text-indigo-400">{salesCount}</div>
                </div>
                <span className="h-1 w-1 rounded-full bg-indigo-500" />
              </div>
              <div className="rounded border border-zinc-800 bg-zinc-950 p-1 flex items-center justify-between">
                <div>
                  <span className="text-[3px] text-zinc-500">Billing Sync</span>
                  <div className="mt-0.5 text-[5.5px] font-bold text-white">$12.4k</div>
                </div>
                <span className="h-1 w-1 rounded-full bg-emerald-500" />
              </div>
            </div>
            <div className="flex-1 rounded border border-zinc-800 bg-zinc-950 p-1.5 relative overflow-hidden">
              <svg viewBox="0 0 100 40" className="h-full w-full text-indigo-500/10">
                <path d="M0,40 Q15,18 30,30 T60,12 T85,28 T100,10 L100,40 L0,40 Z" fill="currentColor" />
                <motion.path 
                  d="M0,40 Q15,18 30,30 T60,12 T85,28 T100,10" 
                  fill="none" 
                  stroke="rgb(99, 102, 241)" 
                  strokeWidth="1.5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
              </svg>
            </div>
          </div>
        </div>
      ) : (
        // Company Profile Content
        <div className="flex h-[calc(100%-22px)] flex-col justify-between bg-zinc-950 p-2.5 text-[5px] text-zinc-400">
          <div className="flex items-center justify-between border-b border-zinc-900 pb-1.5">
            <span className="font-semibold tracking-tight text-white font-display">KPJMI</span>
            <div className="flex gap-2 text-[4px] font-normal text-zinc-500">
              <span>Overview</span>
              <span>Announcements</span>
              <span>Inquiries</span>
            </div>
          </div>
          <div className="mx-auto max-w-[180px] space-y-1.5 text-center">
            <h4 className="text-[7.5px] font-semibold leading-tight tracking-tight text-white font-display">Agricultural Cooperatives Network</h4>
            <p className="text-[4px] leading-relaxed text-zinc-500">Direct member reports, pricing indexes, and dynamic announcement boards.</p>
            <div className="mx-auto flex h-3 w-14 items-center justify-center rounded-full bg-cyan-600 text-[3.5px] font-medium text-white hover:bg-cyan-500 cursor-pointer">Explore Portal</div>
          </div>
          <div className="flex justify-between border-t border-zinc-900 pt-1 text-[3.5px] text-zinc-500">
            <span>© KPJMI Indonesia</span>
            <span>Ledger Active</span>
          </div>
        </div>
      )}
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const isEven = index % 2 === 0;

  return (
    <GlowCard
      glowColor={project.accent.glow}
      radialSize={400}
      className="p-6 md:p-10 bg-surface-tile-1 border-white/10 hover:border-white/20"
    >
      <div className="relative grid items-center gap-10 lg:grid-cols-12">
        {/* Project copy */}
        <div className={`space-y-6 lg:col-span-7 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight font-display">{project.title}</h3>
              <span
                className="rounded-full border px-3 py-1 text-[11px] font-medium"
                style={{
                  backgroundColor: `${project.accent.color}14`,
                  borderColor: `${project.accent.color}25`,
                  color: project.accent.color,
                }}
              >
                {project.year}
              </span>
              {project.badge === "Hackathon" && (
                <span className="inline-flex items-center gap-1 rounded-full border border-indigo-500/15 bg-indigo-500/10 px-2.5 py-0.5 text-[10px] font-medium text-indigo-400">
                  <Award size={12} /> Hackathon
                </span>
              )}
              {project.badge === "Enterprise App" && (
              <span className="rounded-full border border-yellow-500/10 bg-yellow-500/5 px-2.5 py-0.5 text-[10px] font-medium text-yellow-500/80">
                Enterprise App
              </span>
            )}
          </div>

          <p className="max-w-2xl body-base">{project.summary}</p>

          {/* Structured Detail Grid */}
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["Challenge", project.challenge],
              ["Solution", project.solution],
              ["Impact", project.impact],
            ].map(([label, value]) => (
              <div key={label} className="rounded-lg border p-4 space-y-1" style={{ backgroundColor: `${project.accent.color}08`, borderColor: `${project.accent.color}15` }}>
                <p className="text-[9px] font-bold uppercase tracking-wider font-display" style={{ color: project.accent.color }}>{label}</p>
                <p className="body-small">{value}</p>
              </div>
            ))}
          </div>

          {/* Metrics highlights */}
          <div className="flex flex-wrap gap-4 py-1.5">
            {project.metrics.map((metric) => (
              <div key={metric} className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: project.accent.color }} />
                <span className="text-xs font-semibold text-white font-mono">{metric}</span>
              </div>
            ))}
          </div>

          {/* Tech Badges */}
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span key={tech} className="rounded-md border border-white/5 bg-white/5 px-2.5 py-1 text-[10px] font-medium text-zinc-400">
                {tech}
              </span>
            ))}
          </div>

          {/* Details & CTAs */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-white/5">
            <p className="text-xs text-zinc-500 font-normal">
              <span className="font-semibold" style={{ color: project.accent.color }}>Role:</span> {project.role}
            </p>
            <div className="flex flex-wrap gap-3 items-center">
              <Button
                variant="ghost"
                href={project.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Source Code
                <ExternalLink size={14} />
              </Button>
              {project.demoUrl ? (
                <Button
                  variant="primary"
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Live Demo
                  <ExternalLink size={14} />
                </Button>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/5 bg-white/2 px-4 py-2 text-xs font-semibold text-zinc-500 cursor-default select-none">
                  <Lock size={12} /> Private Production
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Visual Mockup Showcase */}
        <div className={`relative flex select-none items-center justify-center py-6 lg:py-10 lg:col-span-5 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 via-transparent to-emerald-500/5 blur-xl pointer-events-none" />
          <ProjectPreview type={project.type} />
        </div>
      </div>
    </GlowCard>
  );
}

function ProjectMiniCard({ project }: { project: Project }) {
  return (
    <GlowCard
      glowColor={project.accent.glow}
      radialSize={250}
      className="p-5 bg-surface-tile-1 border-white/10 hover:border-white/20 h-full"
    >
      <div className="flex flex-col h-full gap-3">
          {/* Header: Title + Year */}
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-sm font-semibold text-white font-display leading-snug">{project.title}</h3>
            <span
              className="shrink-0 rounded-full border px-2 py-0.5 text-[9px] font-medium"
              style={{
                backgroundColor: `${project.accent.color}1a`,
                borderColor: `${project.accent.color}30`,
                color: project.accent.color,
              }}
            >
              {project.year}
            </span>
          </div>

          {/* Short description */}
          <p className="body-base line-clamp-2">
            {project.summary}
          </p>

          {/* Tech badges */}
          <div className="flex flex-wrap gap-1.5">
            {project.stack.slice(0, 4).map((tech) => (
              <span key={tech} className="rounded border border-white/5 bg-white/[0.03] px-1.5 py-0.5 text-[9px] font-medium text-zinc-500">
                {tech}
              </span>
            ))}
            {project.stack.length > 4 && (
              <span className="rounded border border-white/5 bg-white/[0.03] px-1.5 py-0.5 text-[9px] font-medium text-zinc-600">
                +{project.stack.length - 4}
              </span>
            )}
          </div>

          {/* Links */}
          <div className="flex items-center gap-3 pt-1 mt-auto border-t border-white/5">
            <a
              href={project.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[10px] font-medium text-zinc-400 hover:text-white transition-colors"
            >
              <Github size={11} /> Source
            </a>
            {project.demoUrl ? (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[10px] font-medium text-zinc-400 hover:text-white transition-colors"
              >
                <ExternalLink size={11} /> Live
              </a>
            ) : (
              <span className="inline-flex items-center gap-1 text-[10px] font-medium text-zinc-600">
                <Lock size={11} /> Private
              </span>
            )}
          </div>
        </div>
      </GlowCard>
  );
}

export default function Projects() {
  const featuredProjects = projects.filter((p) => p.featured);
  const moreProjects = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="relative bg-canvas py-24 md:py-28 border-b border-white/5">
      <div className="relative mx-auto max-w-6xl px-6 md:px-8">
        
        {/* Section Header */}
        <motion.div
          variants={seqHeader}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16 max-w-2xl space-y-3"
        >
          <motion.p variants={seqLabel} className="text-xs font-semibold uppercase tracking-widest text-primary">Selected Work</motion.p>
          <motion.h2 variants={seqTitle} className="display-lg tracking-tight text-white">
            Signature Case Studies
          </motion.h2>
          <motion.p variants={seqDesc} className="body-base">
            A detailed breakdown of product applications designed and built to optimize operational efficiency and workflow delivery.
          </motion.p>
        </motion.div>

        {/* Featured Project Cards */}
        <div className="space-y-10 md:space-y-12">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={index % 2 === 0 ? slideLeft : slideRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <ProjectCard project={project} index={index} />
            </motion.div>
          ))}
        </div>

        {/* More Projects Section */}
        {moreProjects.length > 0 && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-20 pt-14 border-t border-white/5"
          >
            <div className="mb-8 max-w-2xl space-y-2">
              <h3 className="display-md tracking-tight text-white">
                More Projects
              </h3>
              <p className="body-base">
                Additional work across mobile apps, dashboards, and web portals.
              </p>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid gap-4 md:grid-cols-2"
            >
              {moreProjects.map((project) => (
                <motion.div key={project.title} variants={staggerItem}>
                  <ProjectMiniCard project={project} />
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-10 text-center"
            >
              <Button
                variant="ghost"
                href="https://github.com/callmezaa"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={14} />
                <span>View All on GitHub</span>
              </Button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
