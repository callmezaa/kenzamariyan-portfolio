"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { SkillCategory } from "@/app/data/skillsData";
import { ICONS, type IconName } from "@/app/data/icons";
import { PROJECT_CARD_IMAGES } from "@/app/data/projectImages";
import { easeOut } from "@/app/utils/animations";
import { SpotlightCard } from "@/components/motion/hover/SpotlightCard";
import { TransitionLink } from "@/components/motion/transition/TransitionLink";

type TileEntry = {
  name: string;
  icon?: IconName;
  brandColor?: string;
  mastery: number;
  years: number;
  categoryTitle: string;
};

interface SkillTileWallProps {
  skills: SkillCategory[];
  activeSkill: string | null;
  onSelect: (name: string | null) => void;
  hint: string;
}

export function SkillTileWall({ skills, activeSkill, onSelect, hint }: SkillTileWallProps) {
  return (
    <div className="space-y-10">
      {skills.map((cat) => (
        <div key={cat.title} className="space-y-4">
          <div className="flex items-baseline justify-between gap-4">
            <div>
              <h2 className="button-cap text-ink">{cat.title}</h2>
              <p className="body-small text-ink-muted mt-0.5">{cat.tagline}</p>
            </div>
            <span className="mono-sm text-ink-tertiary tabular-nums shrink-0">
              {String(cat.skills.length).padStart(2, "0")}
            </span>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
            {cat.skills.map((skill, i) => (
              <Tile
                key={skill.name}
                skill={{ ...skill, categoryTitle: cat.title }}
                index={i}
                isActive={activeSkill === skill.name}
                onSelect={onSelect}
              />
            ))}
          </div>
        </div>
      ))}
      <p className="text-center label text-ink-tertiary">{hint}</p>
    </div>
  );
}

function Tile({
  skill,
  index,
  isActive,
  onSelect,
}: {
  skill: TileEntry;
  index: number;
  isActive: boolean;
  onSelect: (name: string | null) => void;
}) {
  const Icon = skill.icon ? ICONS[skill.icon] : null;

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(isActive ? null : skill.name)}
      aria-pressed={isActive}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, ease: easeOut, delay: (index % 8) * 0.04 }}
      whileHover={{ y: -3 }}
      className={`group relative flex flex-col items-center justify-center gap-2 rounded-[14px] border bg-canvas-card p-3 pt-4 text-center transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ink/40 ${
        isActive
          ? "border-ink ring-1 ring-ink"
          : "border-hairline hover:border-ink/30 hover:bg-surface-hover"
      }`}
    >
      <span className="flex h-9 w-9 items-center justify-center">
        {Icon ? (
          <Icon
            size={26}
            style={{ color: skill.brandColor ?? undefined }}
            className="transition-transform duration-200 group-hover:scale-110"
          />
        ) : (
          <span className="display-lg font-semibold text-ink-muted">
            {skill.name.charAt(0)}
          </span>
        )}
      </span>
      <span className="label leading-tight text-ink-muted group-hover:text-ink transition-colors line-clamp-2">
        {skill.name}
      </span>
      <span className="mono-sm tabular-nums text-ink-tertiary">{skill.mastery}</span>
    </motion.button>
  );
}

interface DetailPanelProps {
  skill: TileEntry;
  projects: { slug: string; title: string }[];
}

export function SkillDetailPanel({ skill, projects }: DetailPanelProps) {
  const t = useTranslations("skillsPage");
  const st = useTranslations("skills");
  const ref = useRef<HTMLDivElement>(null);
  const Icon = skill.icon ? ICONS[skill.icon] : null;

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: easeOut }}
    >
      <SpotlightCard className="rounded-[20px] bg-canvas-glass backdrop-blur-sm shadow-2 p-7 md:p-10">
        <div className="grid gap-10 md:grid-cols-[auto_1fr] md:gap-12">
          {/* Identity + mastery */}
          <div className="space-y-5 md:w-56">
              <span className="flex h-14 w-14 items-center justify-center rounded-[16px] border border-hairline bg-canvas-card">
                {Icon ? (
                  <Icon size={30} style={{ color: skill.brandColor ?? undefined }} />
                ) : (
                  <span className="display-lg font-semibold text-ink-muted">
                    {skill.name.charAt(0)}
                  </span>
                )}
              </span>
            <div>
              <h3 className="text-xl font-semibold tracking-tight text-ink">{skill.name}</h3>
              <p className="label text-ink-tertiary mt-1">{skill.categoryTitle}</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-baseline gap-1.5">
                <span className="display-lg font-semibold text-ink tabular-nums">
                  {skill.mastery}
                </span>
                <span className="mono-sm text-ink-tertiary">% {t("masteryLabel")}</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-surface-hover">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.mastery}%` }}
                  transition={{ duration: 0.7, ease: easeOut, delay: 0.15 }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: skill.brandColor ?? "var(--theme-ink)" }}
                />
              </div>
              <p className="mono-sm text-ink-tertiary tabular-nums">
                {skill.years} {skill.years === 1 ? st("years") : st("yearsPlural")}
              </p>
            </div>
          </div>

          {/* Related projects */}
          <div className="min-w-0 space-y-4">
            <h4 className="button-cap text-ink">{t("relatedHeading")}</h4>
            {projects.length > 0 ? (
              <div className="flex gap-4 overflow-x-auto pb-2 snap-x [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {projects.map((p) => (
                  <TransitionLink
                    key={p.slug}
                    href={`/projects/${p.slug}`}
                    className="group w-52 shrink-0 snap-start"
                  >
                    <div className="relative overflow-hidden rounded-[14px] border border-hairline bg-canvas-card aspect-video">
                      <Image
                        src={PROJECT_CARD_IMAGES[p.slug]}
                        alt={p.title}
                        fill
                        sizes="208px"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                      />
                      <span className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-canvas/80 text-ink backdrop-blur-sm transition-opacity opacity-0 group-hover:opacity-100">
                        <ArrowUpRight size={12} />
                      </span>
                    </div>
                    <p className="mt-2 body-small font-medium text-ink group-hover:text-ink-muted transition-colors line-clamp-2">
                      {p.title}
                    </p>
                  </TransitionLink>
                ))}
              </div>
            ) : (
              <div className="rounded-[14px] border border-dashed border-hairline px-5 py-6">
                <p className="body-small text-ink-tertiary">{t("emptyRelated")}</p>
              </div>
            )}
          </div>
        </div>
      </SpotlightCard>
    </motion.div>
  );
}
