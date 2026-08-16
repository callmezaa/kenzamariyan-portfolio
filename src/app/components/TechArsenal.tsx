"use client";

import { useState, useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "motion/react";
import { categories, type Category, type TechItem } from "../data/techArsenal";
import { getLocalizedTechArsenal } from "@/i18n/data";
import type { Locale } from "@/i18n/request";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";

const categoryLabelMap: Record<string, string> = {
  Frontend: "categories.frontend",
  Backend: "categories.backend",
  "Database & Infrastructure": "categories.databaseInfra",
};

export default function TechArsenal() {
  const t = useTranslations("techArsenal");
  const locale = useLocale();
  const techArsenal = useMemo(() => getLocalizedTechArsenal(locale as Locale), [locale]);
  const [activeCategory, setActiveCategory] = useState<Category>("Frontend");

  const categoryCounts = useMemo(() => categories.reduce<Record<string, number>>((acc, cat) => {
    acc[cat] = techArsenal.filter((t) => t.category === cat).length;
    return acc;
  }, {}), [techArsenal]);

  const filtered = techArsenal.filter((t) => t.category === activeCategory);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <Button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            variant={activeCategory === cat ? "secondary" : "ghost"}
            size="sm"
            aria-pressed={activeCategory === cat}
            className="rounded-full"
          >
            {t(categoryLabelMap[cat])}
            <span className="ml-1.5 mono-sm text-ink-tertiary">{categoryCounts[cat]}</span>
          </Button>
        ))}
      </div>

      <motion.div
        className="flex flex-wrap justify-center gap-2"
        key={activeCategory}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.03 } } }}
        initial="hidden"
        animate="visible"
      >
        {filtered.map((tech) => (
          <TechChip key={tech.name} tech={tech} masteryLabel={t('mastery')} />
        ))}
      </motion.div>
    </div>
  );
}

function TechChip({ tech, masteryLabel }: { tech: TechItem; masteryLabel: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 8 },
        visible: { opacity: 1, y: 0 },
      }}
    >
      <HoverCard>
        <HoverCardTrigger
          render={
            <Button variant="outline" size="sm" className="rounded-full" />
          }
        >
          <tech.icon size={14} />
          <span>{tech.name}</span>
        </HoverCardTrigger>
        <HoverCardContent
          side="top"
          align="center"
          sideOffset={8}
          className="w-64 rounded-xl p-4"
        >
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <tech.icon size={18} className="text-foreground" />
              <span className="body-base font-bold text-foreground">{tech.name}</span>
            </div>
            <p className="body-small text-muted-foreground leading-relaxed">{tech.description}</p>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="label text-muted-foreground">{masteryLabel}</span>
                <span className="mono-sm text-foreground">{tech.mastery}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full bg-foreground/80 transition-[width] duration-500"
                  style={{ width: `${tech.mastery}%` }}
                />
              </div>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </motion.div>
  );
}
