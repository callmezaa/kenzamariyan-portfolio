"use client";

import { useTranslations } from "next-intl";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Experience } from "@/app/data/experience";
import { TextReveal } from "@/components/motion/text-reveal";
import { Reveal } from "@/components/motion/reveal/Reveal";
import { TransitionLink } from "@/components/motion/transition/TransitionLink";
import { Button } from "@/components/ui/button";
import Achievements from "../Achievements";
import { ExperienceDossier, type EraProject } from "./ExperienceDossier";
import { EraRail } from "./EraRail";

interface ExperiencePageProps {
  experiences: Experience[];
  eraProjects: Record<number, EraProject[]>;
}

export default function ExperiencePage({
  experiences,
  eraProjects,
}: ExperiencePageProps) {
  const t = useTranslations("experiencePage");

  const eras = experiences.map((exp, i) => ({
    id: `era-${i}`,
    year: exp.year,
    title: exp.title,
  }));

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

        {/* Dossiers + rail */}
        <section aria-label={t("kicker")} className="grid gap-10 lg:grid-cols-[176px_1fr] lg:gap-14">
          <EraRail eras={eras} />
          <div className="space-y-5 min-w-0">
            {experiences.map((era, i) => (
              <div key={`${era.year}-${era.title}`} id={eras[i].id}>
                <Reveal variant="rise">
                  <ExperienceDossier
                    era={era}
                    index={i}
                    projects={eraProjects[i] ?? []}
                    highlights={[0, 1, 2].map((n) => t(`eras.e${i + 1}h${n + 1}`))}
                    defaultOpen={i === 0}
                  />
                </Reveal>
              </div>
            ))}
          </div>
        </section>

        {/* Credentials */}
        <Achievements />

        {/* CTA */}
        <Reveal variant="rise">
          <div className="relative overflow-hidden rounded-[20px] bg-hairline shadow-1 p-8 text-center md:p-12 space-y-4 -mt-10">
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
