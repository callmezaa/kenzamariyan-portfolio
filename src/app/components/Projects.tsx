"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { LayoutGrid, List, ArrowRight } from "lucide-react";
import { PROJECT_CATEGORIES, CATEGORY_TABS } from "../data/projects";
import { easeOut } from "../utils/animations";
import { Button } from "@/components/ui/button";
import { TiltCard } from "@/components/motion/tilt-card";

const projectImages: Record<string, string> = {
  "contract-chill": "/image/contract-chill/screenshot/mockup.png",
  interviewos: "/image/interviewOS/mockup-v2.png",
  assetra: "/image/assetra/mockup-v2.png",
  "gotani-pos": "/image/GotaniApp/mockup-v2.png",
  mercato: "/image/mercato/mockup.png",
  monetra: "/image/monetra/mockup-v2.png",
  nextalk: "/image/nextalkApp/mockup-v2.png",
  "pallete-studio": "/image/PalleteStudio/mockup.png",
};

type ViewMode = "grid" | "list";

export default function Projects() {
  const [view, setView] = useState<ViewMode>("grid");
  const [activeTab, setActiveTab] = useState<string>("All");
  const reduceMotion = useReducedMotion();

  const visible = PROJECT_CATEGORIES[activeTab] ?? [];
  const empty = visible.length === 0;

  return (
    <section id="projects" className="bg-canvas-alt py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: easeOut }}
          className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4"
        >
          <div className="space-y-3">
            <p className="label text-ink-muted">Selected Work</p>
            <h2 className="display-xl text-balance">Projects That Ship</h2>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div
              role="tablist"
              aria-label="Project categories"
              className="flex flex-wrap gap-1.5 rounded-full bg-surface-soft p-1"
            >
              {CATEGORY_TABS.map((tab) => {
                const active = activeTab === tab;
                return (
                  <button
                    key={tab}
                    role="tab"
                    aria-selected={active}
                    aria-pressed={active}
                    onClick={() => setActiveTab(tab)}
                    className="relative rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ink/40"
                  >
                    {active && (
                      <motion.span
                        layoutId="project-tab"
                        className="absolute inset-0 rounded-full bg-canvas-card shadow-1"
                        transition={
                          reduceMotion
                            ? { duration: 0 }
                            : { type: "spring", stiffness: 380, damping: 30, mass: 0.7 }
                        }
                      />
                    )}
                    <span
                      className={`relative z-10 ${
                        active ? "text-ink" : "text-ink-muted hover:text-ink"
                      }`}
                    >
                      {tab}
                    </span>
                  </button>
                );
              })}
            </div>
            <div
              role="group"
              aria-label="View mode"
              className="flex rounded-full bg-surface-soft p-1"
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
        </motion.div>

        {empty ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="body-base text-ink-muted">No projects yet in this category.</p>
            <p className="body-small text-ink-tertiary mt-1">Coming soon.</p>
          </div>
        ) : view === "grid" ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {visible.map((project, i) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, ease: easeOut, delay: i * 0.05 }}
              >
                <Link href={`/projects/${project.slug}`} className="group block">
                  <TiltCard max={8} glare={true} className="rounded-[14px] overflow-hidden shadow-1 group-hover:shadow-2 transition-shadow duration-300">
                    <Image
                      src={projectImages[project.slug] || projectImages[project.slug]}
                      alt={project.title}
                      width={1200}
                      height={750}
                      className="w-full h-auto"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </TiltCard>
                  <div className="mt-3">
                    <h3 className="body-base font-semibold text-ink group-hover:text-ink-muted transition-colors duration-200">{project.title}</h3>
                    <p className="body-small text-ink-muted mt-1">{project.stack.slice(0, 3).join(" · ")}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {visible.map((project, i) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, ease: easeOut, delay: i * 0.03 }}
              >
                <motion.div
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.3, ease: easeOut }}
                >
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

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <Link href="/projects">
            <Button variant="outline" size="lg" className="rounded-full">
              View All Projects <ArrowRight data-icon="inline-end" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
