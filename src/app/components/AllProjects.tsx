"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import { LayoutGrid, List, ArrowLeft } from "lucide-react";
import { projects } from "../data/projects";
import { easeOut } from "../utils/animations";
import { TiltCard } from "@/components/motion/tilt-card";

const projectImages: Record<string, string> = {
  "contract-chill": "/image/contract-chill/screenshot/mockup.png",
  interviewos: "/image/interviewOS/mockup.png",
  assetra: "/image/assetra/mockup.png",
  "gotani-pos": "/image/GotaniApp/mockup.png",
  monetra: "/image/monetra/mockup.png",
  nextalk: "/image/nextalkApp/mockup.png",
};

type ViewMode = "grid" | "list";

export default function AllProjects() {
  const [view, setView] = useState<ViewMode>("grid");

  return (
    <section className="bg-canvas-alt min-h-dvh py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <div className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-3">
            <Link
              href="/#projects"
              className="label text-ink-muted hover:text-ink transition-colors inline-flex items-center gap-1"
            >
              <ArrowLeft size={12} /> Back to Home
            </Link>
            <h1 className="display-xl text-balance">All Projects</h1>
          </div>
          <div
            role="group"
            aria-label="View mode"
            className="flex rounded-full bg-surface-soft p-1 self-start"
          >
            <button
              onClick={() => setView("grid")}
              aria-pressed={view === "grid"}
              className={`rounded-full p-2 transition-colors ${
                view === "grid"
                  ? "bg-canvas-card text-ink shadow-1"
                  : "text-ink-muted hover:text-ink"
              }`}
              aria-label="Grid view"
            >
              <LayoutGrid size={14} />
            </button>
            <button
              onClick={() => setView("list")}
              aria-pressed={view === "list"}
              className={`rounded-full p-2 transition-colors ${
                view === "list"
                  ? "bg-canvas-card text-ink shadow-1"
                  : "text-ink-muted hover:text-ink"
              }`}
              aria-label="List view"
            >
              <List size={14} />
            </button>
          </div>
        </div>

        {view === "grid" ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, ease: easeOut, delay: i * 0.05 }}
                className="h-full"
              >
                <TiltCard max={8} glare={true} className="h-full rounded-[14px] overflow-hidden shadow-1 hover:shadow-2 transition-shadow duration-300">
                  <Link href={`/projects/${project.slug}`} className="flex flex-col h-full">
                    <div className="relative overflow-hidden">
                      <Image
                        src={projectImages[project.slug]}
                        alt={project.title}
                        width={1200}
                        height={750}
                        className="w-full h-auto"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-6 pt-5">
                      <h3 className="display-lg">{project.title}</h3>
                      <p className="body-small text-ink-muted mt-2">{project.stack.slice(0, 3).join(" · ")}</p>
                    </div>
                  </Link>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {projects.map((project, i) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, ease: easeOut, delay: i * 0.03 }}
              >
                <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.3, ease: easeOut }}>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="flex items-center gap-3 p-4 rounded-[14px] bg-canvas-glass shadow-1 hover:shadow-2 transition-shadow duration-300"
                  >
                    <h3 className="body-base font-semibold text-ink truncate">{project.title}</h3>
                    <p className="body-small text-ink-muted truncate ml-auto">{project.stack.slice(0, 3).join(" · ")}</p>
                  </Link>
                </motion.div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
