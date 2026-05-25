"use client";

import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { projects, type Project, type ProjectType } from "../data/projects";
import Magnetic from "./ui/Magnetic";

function ProjectPreview({ type }: { type: ProjectType }) {
  if (type === "mobile") {
    return (
      <div className="relative mx-auto h-[220px] w-[120px] rounded-[28px] border-4 border-zinc-800 bg-zinc-950 p-2 shadow-2xl transition group-hover:border-emerald-500/35">
        <div className="absolute left-1/2 top-1 h-2 w-14 -translate-x-1/2 rounded-full bg-zinc-800" />
        <div className="flex h-full flex-col justify-between overflow-hidden rounded-[20px] bg-zinc-900 p-2 text-[6px]">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-1.5 pt-1">
            <span className="text-[7px] font-semibold tracking-wide text-emerald-400">gotani.</span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </div>
          <div className="my-auto space-y-2.5">
            <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-1.5">
              <div className="mb-1 flex justify-between text-[4.5px] font-medium text-zinc-500">
                <span>Sales Stats</span>
                <span className="font-bold text-emerald-400">+14.2%</span>
              </div>
              <div className="flex h-9 items-end gap-[2px]">
                {[35, 58, 88, 48, 74].map((height) => (
                  <span key={height} className="w-2.5 rounded-t bg-emerald-500/60" style={{ height: `${height}%` }} />
                ))}
              </div>
            </div>
            <div className="space-y-1">
              {["Fresh produce", "Inventory sync"].map((label) => (
                <div key={label} className="rounded-md border border-zinc-800 bg-zinc-950/60 p-1">
                  <div className="h-1 w-3/4 rounded bg-zinc-700" />
                  <div className="mt-1 h-0.5 w-1/2 rounded bg-zinc-800" />
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-around border-t border-zinc-800 pt-1 text-[5px] font-mono text-zinc-500">
            <span className="text-emerald-400">Home</span>
            <span>POS</span>
            <span>Data</span>
          </div>
        </div>
      </div>
    );
  }

  const isDashboard = type === "dashboard";

  return (
    <div className={`relative mx-auto h-[152px] w-[230px] overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 shadow-2xl transition ${isDashboard ? "group-hover:border-cyan-500/35" : "group-hover:border-amber-500/35"}`}>
      <div className="flex items-center gap-2 border-b border-zinc-800 bg-zinc-900 px-2.5 py-1.5">
        <div className="flex gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-red-500/70" />
          <span className="h-1.5 w-1.5 rounded-full bg-yellow-500/70" />
          <span className="h-1.5 w-1.5 rounded-full bg-green-500/70" />
        </div>
        <div className="flex h-3 flex-1 items-center rounded border border-zinc-800 bg-zinc-950 px-2 font-mono text-[4px] text-zinc-500">
          {isDashboard ? "admin.gotani.com/dashboard" : "kpjmi.or.id"}
        </div>
      </div>

      {isDashboard ? (
        <div className="flex h-full gap-2 bg-zinc-900 p-2.5 text-[4.5px]">
          <div className="w-12 space-y-1 border-r border-zinc-800 pr-1.5 text-zinc-500">
            <div className="rounded border border-zinc-800 bg-zinc-950 px-1 py-0.5 font-semibold text-blue-400">Dashboard</div>
            <div className="px-1 py-0.5">Products</div>
            <div className="px-1 py-0.5">Farmers</div>
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <div className="grid grid-cols-2 gap-1.5">
              <div className="rounded-md border border-zinc-800 bg-zinc-950 p-1">
                <span className="text-[3px] text-zinc-500">Orders</span>
                <div className="mt-0.5 text-[6px] font-semibold text-blue-400">1,280</div>
              </div>
              <div className="rounded-md border border-zinc-800 bg-zinc-950 p-1">
                <span className="text-[3px] text-zinc-500">Revenue</span>
                <div className="mt-0.5 text-[6px] font-semibold text-emerald-400">$8.4k</div>
              </div>
            </div>
            <div className="flex-1 rounded-md border border-zinc-800 bg-zinc-950 p-1.5">
              <svg viewBox="0 0 100 40" className="h-full w-full text-blue-500/20">
                <path d="M0,40 Q12,15 25,28 T50,8 T75,32 T100,12 L100,40 L0,40 Z" fill="currentColor" />
                <path d="M0,40 Q12,15 25,28 T50,8 T75,32 T100,12" fill="none" stroke="rgb(96 165 250)" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex h-full flex-col justify-between bg-zinc-950 p-2.5 text-[4.5px]">
          <div className="flex items-center justify-between border-b border-zinc-900 pb-1.5">
            <span className="font-bold tracking-wider text-blue-400">KPJMI CO.</span>
            <div className="flex gap-2 text-[3.5px] font-medium text-zinc-500">
              <span>Home</span>
              <span>Program</span>
              <span>Contact</span>
            </div>
          </div>
          <div className="mx-auto max-w-[160px] space-y-1.5 text-center">
            <h4 className="text-[7.5px] font-bold leading-tight tracking-wide text-zinc-100">Koperasi Petani Jaya Makmur Indonesia</h4>
            <p className="text-[4px] leading-relaxed text-zinc-400">Digital presence for a local agriculture cooperative.</p>
            <div className="mx-auto flex h-2.5 w-12 items-center justify-center rounded bg-blue-600 text-[3px] font-medium text-white">Contact</div>
          </div>
          <div className="flex justify-between border-t border-zinc-900 pt-1 text-[3.5px] text-zinc-600">
            <span>2023 KPJMI</span>
            <span>Jaya Makmur</span>
          </div>
        </div>
      )}
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, active: false });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setSpotlight({ x: e.clientX - rect.left, y: e.clientY - rect.top, active: true });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setSpotlight((prev) => ({ ...prev, active: false }))}
      className={`group relative overflow-hidden rounded-2xl border border-zinc-900 bg-zinc-950/30 p-6 backdrop-blur-xl transition-all duration-300 hover:bg-zinc-950/55 md:p-8 ${project.accent.border} ${project.accent.shadow} hover:shadow-2xl`}
    >
      {spotlight.active && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-px rounded-2xl"
          style={{
            background: `radial-gradient(340px circle at ${spotlight.x}px ${spotlight.y}px, ${project.accent.glow}, transparent 80%)`,
          }}
        />
      )}

      <div className="relative grid items-center gap-8 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-7">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className={`text-xl font-bold text-zinc-100 transition md:text-2xl ${project.accent.text}`}>{project.title}</h3>
            <span className="rounded-full border border-zinc-800 bg-zinc-950/70 px-3 py-1 text-xs font-semibold text-zinc-400">{project.year}</span>
          </div>

          <p className="max-w-2xl text-sm leading-relaxed text-zinc-300 md:text-base">{project.summary}</p>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["Challenge", project.challenge],
              ["Solution", project.solution],
              ["Outcome", project.impact],
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl border border-zinc-900 bg-black/20 p-4">
                <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-zinc-500">{label}</p>
                <p className="text-xs leading-relaxed text-zinc-400">{value}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {project.metrics.map((metric) => (
              <span key={metric} className="rounded-full border border-zinc-800 bg-zinc-950/70 px-3 py-1 text-[11px] font-medium text-zinc-400">
                {metric}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-sm">
            <p className="text-zinc-500">
              <span className="font-bold text-zinc-300">Role:</span> {project.role}
            </p>
            <div className="flex flex-wrap gap-3">
              <Magnetic>
                <a
                  href={project.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-950/60 px-5 py-2.5 text-xs font-semibold text-zinc-300 transition-all duration-300 md:text-sm ${project.accent.button}`}
                >
                  Source Code
                  <ExternalLink aria-hidden="true" size={14} />
                </a>
              </Magnetic>
              {project.demoUrl && (
                <Magnetic>
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-blue-500 md:text-sm">
                    Live Demo
                    <ExternalLink aria-hidden="true" size={14} />
                  </a>
                </Magnetic>
              )}
            </div>
          </div>
        </div>

        <div className="relative flex min-h-[170px] select-none items-center justify-center lg:col-span-5">
          <div aria-hidden="true" className="absolute h-36 w-56 rounded-full opacity-0 blur-[70px] transition-opacity duration-500 group-hover:opacity-40" style={{ background: project.accent.glow }} />
          <ProjectPreview type={project.type} />
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative scroll-mt-24 overflow-hidden bg-gradient-to-b from-zinc-950 via-zinc-950 to-black py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/4 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-blue-500/5 blur-[160px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-14 max-w-2xl space-y-3 md:mb-20"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-blue-400">Selected Work</p>
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-100 md:text-4xl">
            Project <span className="text-blue-400">Case Studies</span>
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-zinc-400 md:text-base">
            A focused look at the product problems I worked on, the technical ownership I took, and the outcomes each project was designed to support.
          </p>
        </motion.div>

        <div className="space-y-8 md:space-y-10">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
