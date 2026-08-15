"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion, useReducedMotion } from "motion/react";
import { LayoutGrid, List, ArrowRight } from "lucide-react";
import { getLocalizedProjects } from "@/i18n/data";
import type { Locale } from "@/i18n/request";
import { PROJECT_CARD_IMAGES } from "@/app/data/projectImages";
import { easeOut } from "../utils/animations";
import { Button } from "@/components/ui/button";
import { TiltCard } from "@/components/motion/tilt-card";
import { Reveal } from "@/components/motion/reveal/Reveal";
import { Magnetic } from "@/components/motion/hover/Magnetic";
import { TransitionLink } from "@/components/motion/transition/TransitionLink";

const CATEGORY_TABS = ["All", "Web App", "Mobile", "Playground"] as const;

type ViewMode = "grid" | "list";

export default function Projects() {
  const t = useTranslations("projects");
  const locale = useLocale();
  const [view, setView] = useState<ViewMode>("grid");
  const [activeTab, setActiveTab] = useState<string>("All");
  const reduceMotion = useReducedMotion();

  const PROJECT_CATEGORIES = useMemo(() => {
    const localized = getLocalizedProjects(locale as Locale);
    return {
      All: localized,
      "Web App": localized.filter((p) =>
        ["koperasi-kpjmi", "contract-chill", "interviewos", "assetra", "monetra"].includes(p.slug)
      ),
      Mobile: localized.filter((p) =>
        ["gotani-pos", "mercato", "nextalk"].includes(p.slug)
      ),
      Playground: localized.filter((p) =>
        ["pallete-studio"].includes(p.slug)
      ),
    } as const;
  }, [locale]);

  const visible = PROJECT_CATEGORIES[activeTab as keyof typeof PROJECT_CATEGORIES] ?? [];
  const empty = visible.length === 0;

  return (
    <section id="projects" className="bg-canvas-alt py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <Reveal variant="mask" className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-3">
            <p className="label text-ink-muted">{t('label')}</p>
            <h2 className="display-xl text-balance">{t('heading')}</h2>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div
              role="tablist"
              aria-label="Project categories"
              className="flex flex-wrap gap-1.5 rounded-full bg-surface-soft p-1"
            >
              {CATEGORY_TABS.map((tab) => {
                const active = activeTab === tab;
                const tabLabels: Record<string, string> = {
                  "All": t('tabAll'),
                  "Web App": t('tabWebApp'),
                  "Mobile": t('tabMobile'),
                  "Playground": t('tabPlayground'),
                };
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
                      {tabLabels[tab]}
                    </span>
                  </button>
                );
              })}
            </div>
            <div
              role="group"
              aria-label={t('viewMode')}
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
        </Reveal>

        {empty ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="body-base text-ink-muted">{t('emptyTitle')}</p>
            <p className="body-small text-ink-tertiary mt-1">{t('emptySubtitle')}</p>
          </div>
        ) : view === "grid" ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {visible.map((project, i) => (
              <Reveal key={project.slug} variant="rise" delay={i * 0.05} className="h-full">
                <TransitionLink href={`/projects/${project.slug}`} className="group block">
                  <TiltCard max={8} glare={true} className="rounded-[14px] overflow-hidden shadow-1 group-hover:shadow-2 transition-shadow duration-300">
                    <Image
                      src={PROJECT_CARD_IMAGES[project.slug]}
                      alt={project.title}
                      width={1200}
                      height={750}
                      className="w-full h-auto vt-project-image"
                      style={{ viewTransitionName: "vt-project-image" }}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </TiltCard>
                  <div className="mt-3">
                    <h3 className="body-base font-semibold text-ink group-hover:text-ink-muted transition-colors duration-200">{project.title}</h3>
                    <p className="body-small text-ink-muted mt-1">{project.stack.slice(0, 3).join(" · ")}</p>
                  </div>
                </TransitionLink>
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {visible.map((project, i) => (
              <Reveal key={project.slug} variant="rise" delay={i * 0.03}>
                <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.3, ease: easeOut }}>
                  <TransitionLink
                    href={`/projects/${project.slug}`}
                    className="flex items-center gap-3 p-4 rounded-[14px] bg-canvas-glass shadow-1 hover:shadow-2 transition-shadow duration-300"
                  >
                    <h3 className="body-base font-semibold text-ink truncate">{project.title}</h3>
                    <p className="body-small text-ink-muted truncate ml-auto">{project.stack.slice(0, 3).join(" · ")}</p>
                  </TransitionLink>
                </motion.div>
              </Reveal>
            ))}
          </div>
        )}

        <Reveal className="mt-10 text-center">
          <Magnetic>
            <Link href="/projects">
              <Button variant="outline" size="lg" className="rounded-full">
                {t('viewAll')} <ArrowRight data-icon="inline-end" />
              </Button>
            </Link>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
}
