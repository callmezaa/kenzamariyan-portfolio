"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import { LayoutGrid, List } from "lucide-react";
import { projects } from "../data/projects";
import { easeOut } from "../utils/animations";
import { Button } from "@/components/ui/button";
import { TiltCard } from "@/components/motion/tilt-card";

const showcase = projects.filter((p) => ["contract-chill", "interviewos", "assetra"].includes(p.slug));

const projectImages: Record<string, string> = {
  "contract-chill": "/image/contract-chill/screenshot/mockup.png",
  interviewos: "/image/interviewOS/mockup.png",
  assetra: "/image/assetra/mockup.png",
  "gotani-pos": "/image/GotaniApp/mockup.png",
  monetra: "/image/monetra/mockup.png",
  nextalk: "/image/nextalkApp/mockup.png",
};

type ViewMode = "grid" | "list";

export default function Projects() {
  const [view, setView] = useState<ViewMode>("grid");
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? projects : showcase;
  const remaining = projects.length - showcase.length;

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
          <div className="flex items-center gap-2">
            <Button
              onClick={() => setView("grid")}
              variant="ghost"
              size="icon-sm"
              aria-pressed={view === "grid"}
              className={`rounded-full transition-colors ${
                view === "grid" ? "text-ink bg-surface-active" : "text-ink-muted hover:text-ink hover:bg-surface-hover"
              }`}
              aria-label="Grid view"
            >
              <LayoutGrid size={14} />
            </Button>
            <Button
              onClick={() => setView("list")}
              variant="ghost"
              size="icon-sm"
              aria-pressed={view === "list"}
              className={`rounded-full transition-colors ${
                view === "list" ? "text-ink bg-surface-active" : "text-ink-muted hover:text-ink hover:bg-surface-hover"
              }`}
              aria-label="List view"
            >
              <List size={14} />
            </Button>
          </div>
        </motion.div>

        {view === "grid" ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {visible.map((project, i) => (
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
                        src={projectImages[project.slug] || projectImages[project.slug]}
                        alt={project.title}
                        width={1200}
                        height={750}
                        className="w-full h-auto"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      {project.featured && (
                        <span className="absolute left-3 top-3 rounded-full bg-foreground/90 px-2.5 py-1 label text-background backdrop-blur-sm">
                          Featured
                        </span>
                      )}
                    </div>
                    <div className="mt-5 space-y-2 px-2 pb-2 flex-1 flex flex-col">
                      <h3 className="display-lg">{project.title}</h3>
                      <p className="body-small text-ink-muted">{project.stack.slice(0, 3).join(" · ")}</p>
                      {project.metrics.length > 0 && (
                        <div className="flex flex-wrap gap-x-2 gap-y-1">
                          {project.metrics.slice(0, 3).map((m) => (
                            <span key={m} className="mono-sm text-ink-tertiary">
                              {m}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="flex items-center gap-2 body-small text-ink-muted mt-auto pt-1">
                        <span>{project.year}</span>
                        {project.badge && (
                          <>
                            <span className="text-hairline">·</span>
                            <span className="mono-sm px-3 py-0.5 rounded-full bg-surface-soft text-ink-muted">{project.badge}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </Link>
                </TiltCard>
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
                    className="flex items-center gap-5 p-4 rounded-[14px] bg-canvas-glass shadow-1 hover:shadow-2 transition-shadow duration-300"
                  >
                    <div className="relative w-20 h-14 shrink-0 overflow-hidden rounded-[10px] bg-canvas">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3, ease: easeOut }}
                        className="w-full h-full"
                      >
                        <Image
                          src={projectImages[project.slug] || projectImages[project.slug]}
                          alt={project.title}
                          fill
                          sizes="80px"
                          className="object-contain"
                        />
                      </motion.div>
                      {project.featured && (
                        <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-foreground ring-2 ring-canvas-glass" aria-label="Featured project" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="body-base font-semibold text-ink truncate">{project.title}</h3>
                        {project.featured && (
                          <span className="label shrink-0 text-ink-tertiary">Featured</span>
                        )}
                      </div>
                      <p className="body-small text-ink-muted mt-0.5 truncate">{project.stack.slice(0, 3).join(" · ")}</p>
                      {project.metrics.length > 0 && (
                        <p className="mono-sm text-ink-tertiary mt-1 truncate">{project.metrics.slice(0, 2).join(" · ")}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      {project.badge && (
                        <span className="mono-sm px-3 py-0.5 rounded-full bg-surface-soft text-ink-muted hidden sm:inline">
                          {project.badge}
                        </span>
                      )}
                      <span className="body-small text-ink-muted">{project.year}</span>
                    </div>
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
          {!showAll ? (
            <Button
              onClick={() => setShowAll(true)}
              variant="outline"
              size="lg"
              className="rounded-full"
            >
              View All (+{remaining})
            </Button>
          ) : (
            <Button
              onClick={() => setShowAll(false)}
              variant="outline"
              size="lg"
              className="rounded-full"
            >
              Show Less
            </Button>
          )}
        </motion.div>
      </div>
    </section>
  );
}
