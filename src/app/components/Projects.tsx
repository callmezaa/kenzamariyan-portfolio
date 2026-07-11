"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { LayoutGrid, List } from "lucide-react";
import { projects } from "../data/projects";
import { easeOut } from "../utils/animations";

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
    <section id="projects" className="bg-canvas py-24 md:py-28 border-b border-hairline">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: easeOut }}
          className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4"
        >
          <div className="space-y-3">
            <p className="micro-cap text-ink-muted">Selected Work</p>
            <h2 className="display-xl">Projects That Ship</h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setView("grid")}
              className={`flex h-8 w-8 items-center justify-center rounded-sm border transition-colors cursor-pointer ${
                view === "grid" ? "border-ink text-ink" : "border-hairline text-ink-muted hover:text-ink hover:border-ink"
              }`}
              aria-label="Grid view"
            >
              <LayoutGrid size={14} />
            </button>
            <button
              onClick={() => setView("list")}
              className={`flex h-8 w-8 items-center justify-center rounded-sm border transition-colors cursor-pointer ${
                view === "list" ? "border-ink text-ink" : "border-hairline text-ink-muted hover:text-ink hover:border-ink"
              }`}
              aria-label="List view"
            >
              <List size={14} />
            </button>
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
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3, ease: easeOut }}
                >
                  <Link
                    href={`/projects/${project.slug}`}
                    className="block"
                  >
                    <div className="w-full rounded-sm border border-hairline bg-canvas overflow-hidden">
                      <motion.div
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.4, ease: easeOut }}
                      >
                        <Image
                          src={projectImages[project.slug] || projectImages[project.slug]}
                          alt={project.title}
                          width={1200}
                          height={750}
                          className="w-full h-auto block"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </motion.div>
                    </div>
                    <div className="mt-4 space-y-1.5">
                      <h3 className="body-md font-bold text-ink">{project.title}</h3>
                      <p className="caption text-ink-muted">{project.stack.slice(0, 3).join(" · ")}</p>
                      <div className="flex items-center gap-2 caption text-ink-muted pt-0.5">
                        <span>{project.year}</span>
                        {project.badge && (
                          <>
                            <span className="text-hairline">·</span>
                            <span className="micro-cap px-1.5 py-0.5 rounded-sm border border-hairline text-ink-muted">{project.badge}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
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
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.2, ease: easeOut }}
                >
                  <Link
                    href={`/projects/${project.slug}`}
                    className="flex items-center gap-5 p-4 border border-hairline rounded-sm bg-canvas-card hover:bg-canvas-card/50 transition-colors duration-200"
                  >
                    <div className="relative w-20 h-14 shrink-0 overflow-hidden rounded-sm bg-canvas border border-hairline">
                      <Image
                        src={projectImages[project.slug] || projectImages[project.slug]}
                        alt={project.title}
                        fill
                        sizes="80px"
                        className="object-contain"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="body-md font-bold text-ink truncate">{project.title}</h3>
                      <p className="caption text-ink-muted truncate">{project.stack.slice(0, 3).join(" · ")}</p>
                    </div>
                    <span className="caption text-ink-muted shrink-0 hidden sm:inline">{project.year}</span>
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
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 rounded-pill border border-hairline px-6 py-3 button-cap text-ink-muted hover:text-ink hover:border-ink transition-colors cursor-pointer"
            >
              View All (+{remaining})
            </button>
          ) : (
            <button
              onClick={() => setShowAll(false)}
              className="inline-flex items-center gap-2 rounded-pill border border-hairline px-6 py-3 button-cap text-ink-muted hover:text-ink hover:border-ink transition-colors cursor-pointer"
            >
              Show Less
            </button>
          )}
        </motion.div>
      </div>
    </section>
  );
}
