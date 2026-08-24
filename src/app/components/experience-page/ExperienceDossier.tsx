"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Briefcase, GraduationCap, Building } from "lucide-react";
import Image from "next/image";
import type { Experience } from "@/app/data/experience";
import { appleSpring } from "@/app/utils/animations";
import { SpotlightCard } from "@/components/motion/hover/SpotlightCard";
import { TransitionLink } from "@/components/motion/transition/TransitionLink";
import { PROJECT_CARD_IMAGES } from "@/app/data/projectImages";

export interface EraProject {
  slug: string;
  title: string;
}

interface ExperienceDossierProps {
  era: Experience;
  index: number;
  projects: EraProject[];
  highlights: string[];
  defaultOpen: boolean;
}

const TYPE_ICON = {
  work: Briefcase,
  education: GraduationCap,
  organization: Building,
} as const;

export function ExperienceDossier({
  era,
  index,
  projects,
  highlights,
  defaultOpen,
}: ExperienceDossierProps) {
  const t = useTranslations("experiencePage");
  const [open, setOpen] = useState(defaultOpen);
  const TypeIcon = TYPE_ICON[era.type];
  const panelId = `era-panel-${index}`;

  return (
    <SpotlightCard
      className="scroll-mt-28 rounded-[20px] bg-canvas-glass backdrop-blur-sm shadow-1 transition-shadow duration-300 data-[open=true]:shadow-2 p-6 md:p-8"
      data-open={open}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full items-start justify-between gap-4 text-left outline-none focus-visible:ring-2 focus-visible:ring-ink/40 rounded-[14px]"
      >
        <div className="min-w-0 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="label rounded-full bg-surface-active px-2.5 py-0.5 text-ink tabular-nums">
              {era.year}
            </span>
            <span className="flex items-center gap-1 label rounded-full border border-hairline px-2.5 py-0.5 text-ink-tertiary">
              <TypeIcon size={11} />
              {era.type}
            </span>
          </div>
          <h3 className="body-lg font-semibold text-ink">{era.title}</h3>
          <p className="body-small text-ink-muted">
            {era.place} · {era.location}
          </p>
        </div>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={appleSpring}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-hairline text-ink-muted"
        >
          <ChevronDown size={14} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="space-y-6 pt-6 mt-6 border-t border-hairline">
              <p className="body-base text-ink-muted leading-relaxed max-w-prose">
                {era.description}
              </p>

              <div className="space-y-3">
                <p className="label text-ink-tertiary">{t("highlightsLabel")}</p>
                <ul className="space-y-2.5">
                  {highlights.map((h) => (
                    <li key={h} className="flex gap-3 body-small text-ink-muted leading-relaxed">
                      <span
                        aria-hidden="true"
                        className="mt-[7px] h-1 w-3 shrink-0 rounded-full bg-ink/40"
                      />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {era.tags.map((tag) => (
                  <span
                    key={tag}
                    className="mono-sm rounded-full bg-surface-soft px-2.5 py-1 text-ink-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {projects.length > 0 && (
                <div className="space-y-3">
                  <p className="label text-ink-tertiary">{t("shippedLabel")}</p>
                  <div className="flex gap-4 overflow-x-auto pb-2 snap-x [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {projects.map((p) => (
                      <TransitionLink
                        key={p.slug}
                        href={`/projects/${p.slug}`}
                        className="group w-48 shrink-0 snap-start"
                      >
                        <div className="relative overflow-hidden rounded-[12px] border border-hairline bg-canvas-card aspect-video">
                          <Image
                            src={PROJECT_CARD_IMAGES[p.slug]}
                            alt={p.title}
                            fill
                            sizes="192px"
                            className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                          />
                        </div>
                        <p className="mt-2 label text-ink group-hover:text-ink-muted transition-colors line-clamp-2">
                          {p.title}
                        </p>
                      </TransitionLink>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </SpotlightCard>
  );
}
