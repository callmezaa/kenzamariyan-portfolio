"use client";

import { useMemo, type CSSProperties } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowRight, ArrowUpRight, GraduationCap } from "lucide-react";
import type { Experience } from "../data/experience";
import { PROJECT_CARD_IMAGES } from "@/app/data/projectImages";
import { Reveal } from "@/components/motion/reveal/Reveal";
import { TransitionLink } from "@/components/motion/transition/TransitionLink";
import { Button } from "@/components/ui/button";
import { JourneyTimeline } from "./about-page/JourneyTimeline";

interface ExperienceProps {
  experiences: Experience[];
}

/** Maps a place-name fragment to the shipped case study shown beside it. */
const ERA_MOCKUPS: [string, string][] = [
  ["ContractChill", "contract-chill"],
  ["BIT Indonesia", "gotani-pos"],
  ["KPJMI", "koperasi-kpjmi"],
];

export default function Experience({ experiences }: ExperienceProps) {
  const t = useTranslations("experience");

  const visuals = useMemo(() => experiences.map((exp) => {
    const slug = ERA_MOCKUPS.find(([needle]) => exp.place.includes(needle))?.[1];
    if (!slug || !PROJECT_CARD_IMAGES[slug]) {
      return (
        <div key={exp.title} className="flex aspect-[16/10] flex-col justify-between overflow-hidden rounded-[14px] border border-hairline bg-canvas-card p-5 shadow-1">
          <div className="flex items-center justify-between gap-2">
            <span
              className="about-icon-tile"
              style={{ "--tile-accent": "#22C55E" } as CSSProperties}
            >
              <GraduationCap size={18} strokeWidth={2} />
            </span>
            <span className="mono-sm text-ink-tertiary tabular-nums">{exp.year}</span>
          </div>
          <div className="space-y-1">
            <p className="body-base font-semibold text-ink">{exp.title}</p>
            <p className="body-small text-ink-muted">{exp.place} · {exp.location}</p>
          </div>
        </div>
      );
    }
    return (
      <TransitionLink
        key={slug}
        href={`/projects/${slug}`}
        className="group block overflow-hidden rounded-[14px] border border-hairline bg-canvas-card shadow-1 transition-shadow duration-300 hover:shadow-2"
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={PROJECT_CARD_IMAGES[slug]}
            alt={exp.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        </div>
        <div className="flex items-center justify-between gap-2 px-4 py-2.5">
          <span className="body-small font-medium text-ink truncate">{exp.place}</span>
          <ArrowUpRight size={16} className="shrink-0 text-ink-muted/50 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
        </div>
      </TransitionLink>
    );
  }), [experiences]);

  return (
    <section id="experience" className="bg-canvas py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <Reveal variant="mask" className="mb-10 md:mb-12 space-y-3">
          <p className="label text-ink-muted">{t("label")}</p>
          <h2 className="display-xl text-balance">{t("heading")}</h2>
        </Reveal>

        {experiences.length > 0 ? (
          <JourneyTimeline experiences={experiences} visuals={visuals} />
        ) : (
          <p className="body-base text-ink-muted text-center py-8">
            {t("empty")}
          </p>
        )}

        <Reveal className="mt-10 flex justify-center">
          <TransitionLink href="/experience">
            <Button variant="outline" size="lg" className="btn-3d-outline rounded-full">
              {t("moreLink")} <ArrowRight data-icon="inline-end" />
            </Button>
          </TransitionLink>
        </Reveal>
      </div>
    </section>
  );
}
