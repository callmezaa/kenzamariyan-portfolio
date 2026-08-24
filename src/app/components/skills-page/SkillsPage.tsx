"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { SkillCategory } from "@/app/data/skillsData";
import { TextReveal } from "@/components/motion/text-reveal";
import { Reveal } from "@/components/motion/reveal/Reveal";
import { TransitionLink } from "@/components/motion/transition/TransitionLink";
import { Button } from "@/components/ui/button";
import {
  SkillTileWall,
  SkillDetailPanel,
} from "./SkillTileWall";

interface SkillsPageProps {
  skills: SkillCategory[];
  related: Record<string, { slug: string; title: string }[]>;
}

export default function SkillsPage({ skills, related }: SkillsPageProps) {
  const t = useTranslations("skillsPage");
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  const activeEntry = (() => {
    for (const cat of skills) {
      const found = cat.skills.find((s) => s.name === activeSkill);
      if (found) return { ...found, categoryTitle: cat.title };
    }
    return null;
  })();

  return (
    <main id="main-content" className="min-h-dvh">
      <div className="mx-auto max-w-5xl px-6 pb-28 pt-32 md:px-8 md:pt-40 space-y-16 md:space-y-20">
        <TransitionLink
          href="/"
          className="inline-flex items-center gap-2 label text-muted-foreground hover:text-foreground transition-colors mb-2"
        >
          <ArrowLeft size={14} />
          {t("backHome")}
        </TransitionLink>

        {/* Hero */}
        <header className="space-y-6">
          <p className="label text-ink-muted">{t("kicker")}</p>
          <h1 className="display-xl text-balance">
            <TextReveal text={[t("line1"), t("line2")]} as="span" stagger={0.08} />
          </h1>
          <p className="body-lg text-ink-muted max-w-prose">{t("tagline")}</p>
        </header>

        {/* Tile wall */}
        <section aria-label={t("kicker")} className="space-y-12">
          <SkillTileWall
            skills={skills}
            activeSkill={activeSkill}
            onSelect={setActiveSkill}
            hint={t("hint")}
          />
        </section>

        {/* Detail panel */}
        <section aria-live="polite">
          <AnimatePresence mode="wait">
            {activeEntry && (
              <SkillDetailPanel
                key={activeEntry.name}
                skill={activeEntry}
                projects={related[activeEntry.name] ?? []}
              />
            )}
          </AnimatePresence>
        </section>

        {/* CTA */}
        <Reveal variant="rise">
          <div className="relative overflow-hidden rounded-[20px] bg-hairline shadow-1 p-8 text-center md:p-12 space-y-4">
            <p className="body-lg text-ink max-w-md mx-auto text-balance">{t("ctaText")}</p>
            <div className="flex justify-center pt-2">
              <TransitionLink href="/projects">
                <Button size="lg" className="btn-3d rounded-full">
                  {t("ctaButton")} <ArrowRight data-icon="inline-end" />
                </Button>
              </TransitionLink>
            </div>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
