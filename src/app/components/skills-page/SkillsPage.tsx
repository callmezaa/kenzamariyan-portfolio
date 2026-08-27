"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { AnimatePresence } from "motion/react";
import { ArrowRight } from "lucide-react";
import type { SkillCategory } from "@/app/data/skillsData";
import { Reveal } from "@/components/motion/reveal/Reveal";
import { TransitionLink } from "@/components/motion/transition/TransitionLink";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/app/components/page-hero/PageHero";
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
      <PageHero
        variant="grid"
        compact
        centered
        kicker={t("kicker")}
        lines={[t("line1"), t("line2")]}
        tagline={t("tagline")}
      />

      <div className="mx-auto max-w-6xl px-6 md:px-8 pb-28 pt-12 md:pt-16 space-y-16 md:space-y-20">

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

        {/* CTA — premium ambient chrome */}
        <Reveal variant="rise">
          <div className="relative overflow-hidden rounded-[32px] border border-white/[0.08] shadow-[0_20px_80px_-20px_rgba(0,0,0,0.6),0_8px_32px_rgba(0,0,0,0.4)] isolate">
            <Image
              src="/ambient_bg.jpg"
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 1152px"
              className="object-cover object-center"
              priority={false}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/5"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-60"
              style={{
                background:
                  "radial-gradient(ellipse 90% 70% at 50% 100%, rgba(255,255,255,0.06), transparent 60%)",
              }}
            />
            <div className="relative flex flex-col items-center gap-5 px-8 py-16 text-center md:px-16 md:py-20">
              <p className="body-lg max-w-md text-balance text-white [text-wrap:balance]">
                {t("ctaText")}
              </p>
              <div className="flex justify-center pt-3">
                <TransitionLink href="/projects">
                  <Button
                    size="lg"
                    className="rounded-full bg-white px-8 text-sm font-medium tracking-wide text-black shadow-[0_8px_24px_rgba(0,0,0,0.3)] transition-all hover:bg-zinc-100 hover:shadow-[0_12px_32px_rgba(0,0,0,0.4)]"
                  >
                    {t("ctaButton")} <ArrowRight size={14} data-icon="inline-end" />
                  </Button>
                </TransitionLink>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
