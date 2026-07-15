"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { LayoutGrid, List } from "lucide-react";
import { projects } from "../data/projects";
import { easeOut } from "../utils/animations";
import { Button } from "@/components/ui/button";

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
            <h2 className="display-xl">Projects That Ship</h2>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => setView("grid")}
              variant="ghost"
              size="icon-sm"
              className={`rounded-full transition-all ${
                view === "grid" ? "text-ink bg-white/10" : "text-ink-muted hover:text-ink hover:bg-white/5"
              }`}
              aria-label="Grid view"
            >
              <LayoutGrid size={14} />
            </Button>
            <Button
              onClick={() => setView("list")}
              variant="ghost"
              size="icon-sm"
              className={`rounded-full transition-all ${
                view === "list" ? "text-ink bg-white/10" : "text-ink-muted hover:text-ink hover:bg-white/5"
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
              >
                <Link href={`/projects/${project.slug}`} className="block">
                  <motion.div
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.3, ease: easeOut }}
                    className="rounded-[14px] overflow-hidden shadow-lg shadow-black/40 hover:shadow-xl hover:shadow-black/60 transition-shadow duration-300"
                  >
                    <div className="overflow-hidden">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3, ease: easeOut }}
                      >
                        <Image
                          src={projectImages[project.slug] || projectImages[project.slug]}
                          alt={project.title}
                          width={1200}
                          height={750}
                          className="w-full h-auto"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                  <div className="mt-5 space-y-2">
                    <h3 className="display-lg">{project.title}</h3>
                    <p className="body-small text-ink-muted">{project.stack.slice(0, 3).join(" · ")}</p>
                    <div className="flex items-center gap-2 body-small text-ink-tertiary">
                      <span>{project.year}</span>
                      {project.badge && (
                        <>
                          <span className="text-hairline">·</span>
                          <span className="mono-sm px-3 py-0.5 rounded-full bg-white/5 text-ink-muted">{project.badge}</span>
                        </>
                      )}
                    </div>
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
                    className="flex items-center gap-5 p-4 rounded-[14px] bg-canvas-glass shadow-lg shadow-black/40 hover:shadow-xl hover:shadow-black/60 transition-shadow duration-300"
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
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="body-base font-semibold text-ink">{project.title}</h3>
                      <p className="body-small text-ink-muted mt-0.5">{project.stack.slice(0, 3).join(" · ")}</p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      {project.badge && (
                        <span className="mono-sm px-3 py-0.5 rounded-full bg-white/5 text-ink-muted hidden sm:inline">
                          {project.badge}
                        </span>
                      )}
                      <span className="body-small text-ink-tertiary">{project.year}</span>
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
