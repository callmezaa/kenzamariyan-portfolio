"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "motion/react";
import { LayoutGrid, List, ArrowLeft, ArrowUpRight } from "lucide-react";
import { getLocalizedProjects } from "@/i18n/data";
import type { Locale } from "@/i18n/request";
import { PROJECT_CARD_IMAGES } from "@/app/data/projectImages";
import { easeOut } from "../utils/animations";
import { TiltCard } from "@/components/motion/tilt-card";
import { TransitionLink } from "@/components/motion/transition/TransitionLink";

type ViewMode = "grid" | "list";

export default function AllProjects() {
  const t = useTranslations("projects");
  const pd = useTranslations("projectDetail");
  const locale = useLocale();
  const projects = useMemo(() => getLocalizedProjects(locale as Locale), [locale]);
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
              <ArrowLeft size={12} /> {pd('backToProjects')}
            </Link>
            <h1 className="display-xl text-balance">{t('heading')}</h1>
          </div>
          <div
            role="group"
            aria-label={t('viewMode')}
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
              aria-label={t('gridView')}
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
              aria-label={t('listView')}
            >
              <List size={14} />
            </button>
          </div>
        </div>

        {view === "grid" ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, ease: easeOut, delay: i * 0.05 }}
              >
                <TransitionLink href={`/projects/${project.slug}`} className="group block">
                  <TiltCard max={8} glare={true} className="rounded-[14px] overflow-hidden shadow-1 group-hover:shadow-2 transition-shadow duration-300">
                    <Image
                      src={PROJECT_CARD_IMAGES[project.slug]}
                      alt={project.title}
                      width={1200}
                      height={750}
                      className="w-full h-auto"
                      style={{ viewTransitionName: `vt-${project.slug}` }}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </TiltCard>
                  <div className="mt-3">
                    <h3 className="body-base font-semibold text-ink group-hover:text-ink-muted transition-colors duration-200">{project.title}</h3>
                    <p className="body-small text-ink-muted mt-1">{project.stack.slice(0, 3).join(" · ")}</p>
                  </div>
                </TransitionLink>
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
                  <TransitionLink
                    href={`/projects/${project.slug}`}
                    className="group flex items-center gap-4 rounded-[14px] bg-canvas-glass p-3 shadow-1 transition-shadow duration-300 hover:shadow-2"
                  >
                    <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-[10px] bg-canvas-card sm:h-24 sm:w-40">
                      <Image
                        src={PROJECT_CARD_IMAGES[project.slug]}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 112px, 160px"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="body-base font-semibold text-ink truncate">{project.title}</h3>
                      <p className="body-small text-ink-muted mt-0.5 truncate">{project.stack.slice(0, 4).join(" · ")}</p>
                      <div className="mt-2 flex items-center gap-1.5">
                        {project.year && (
                          <span className="label text-ink-tertiary">{project.year}</span>
                        )}
                        {project.badge && (
                          <span className="label rounded-full bg-surface-soft px-2 py-0.5 text-ink-tertiary">{project.badge}</span>
                        )}
                      </div>
                    </div>
                    <ArrowUpRight size={18} className="shrink-0 text-ink-muted/50 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
                  </TransitionLink>
                </motion.div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
