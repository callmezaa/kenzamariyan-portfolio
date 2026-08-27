"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { ArrowRight, Mail } from "lucide-react";
import type { TechItem } from "@/app/data/techArsenal";
import type { Experience } from "@/app/data/experience";
import { Reveal } from "@/components/motion/reveal/Reveal";
import { SpotlightCard } from "@/components/motion/hover/SpotlightCard";
import { TransitionLink } from "@/components/motion/transition/TransitionLink";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/app/components/page-hero/PageHero";
import TechArsenal from "../TechArsenal";
import { JourneyTimeline } from "./JourneyTimeline";

interface AboutPageProps {
  techArsenal: TechItem[];
  experiences: Experience[];
}

export default function AboutPage({ techArsenal, experiences }: AboutPageProps) {
  const t = useTranslations("aboutPage");

  const values = [
    { title: t("values.v1t"), desc: t("values.v1d") },
    { title: t("values.v2t"), desc: t("values.v2d") },
    { title: t("values.v3t"), desc: t("values.v3d") },
    { title: t("values.v4t"), desc: t("values.v4d") },
  ];

  return (
    <main id="main-content" className="min-h-dvh">
      <PageHero
        variant="grid"
        compact
        centered
        kicker={t("hero.kicker")}
        lines={[t("hero.line1"), t("hero.line2")]}
        tagline={t("hero.tagline")}
      />

      <div className="mx-auto max-w-6xl px-6 md:px-8 pb-28 pt-12 md:pt-16 space-y-24 md:space-y-32">
        {/* Story */}
        <section aria-labelledby="story-heading" className="space-y-6">
          <Reveal variant="mask" className="space-y-3">
            <p className="label text-ink-muted">{t("story.label")}</p>
            <h2 id="story-heading" className="display-lg text-balance">{t("story.heading")}</h2>
          </Reveal>
          <div className="space-y-5 max-w-prose">
            {[t("story.p1"), t("story.p2"), t("story.p3")].map((p, i) => (
              <Reveal key={i} variant="fade" delay={i * 0.08}>
                <p className="body-base text-ink-muted leading-relaxed first:text-ink first:body-lg">
                  {p}
                </p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Journey */}
        <section aria-labelledby="journey-heading" className="space-y-10">
          <Reveal variant="mask" className="space-y-3">
            <p className="label text-ink-muted">{t("journey.label")}</p>
            <h2 id="journey-heading" className="display-lg text-balance">{t("journey.heading")}</h2>
          </Reveal>
          <JourneyTimeline experiences={experiences} />
        </section>

        {/* Values */}
        <section aria-labelledby="values-heading" className="space-y-8">
          <Reveal variant="mask" className="space-y-3">
            <p className="label text-ink-muted">{t("values.label")}</p>
            <h2 id="values-heading" className="display-lg text-balance">{t("values.heading")}</h2>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {values.map((v, i) => (
              <Reveal key={v.title} variant="rise" delay={i * 0.06} className="h-full">
                <SpotlightCard className="h-full rounded-[14px] bg-canvas-glass backdrop-blur-sm shadow-1 p-6 transition-shadow duration-300 hover:shadow-2">
                  <div className="space-y-2">
                    <h3 className="button-cap text-ink">
                      <span className="mono-sm text-ink-tertiary mr-2 tabular-nums">0{i + 1}</span>
                      {v.title}
                    </h3>
                    <p className="body-small text-ink-muted leading-relaxed">{v.desc}</p>
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Arsenal */}
        <section aria-labelledby="arsenal-heading" className="space-y-8">
          <Reveal variant="mask" className="space-y-3">
            <p className="label text-ink-muted">{t("arsenal.label")}</p>
            <h2 id="arsenal-heading" className="display-lg text-balance">{t("arsenal.heading")}</h2>
          </Reveal>
          <TechArsenal items={techArsenal} />
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
                {t("cta.text")}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
                <TransitionLink href="/projects">
                  <Button
                    size="lg"
                    className="rounded-full bg-white px-8 text-sm font-medium tracking-wide text-black shadow-[0_8px_24px_rgba(0,0,0,0.3)] transition-all hover:bg-zinc-100 hover:shadow-[0_12px_32px_rgba(0,0,0,0.4)]"
                  >
                    {t("cta.button")} <ArrowRight size={14} data-icon="inline-end" />
                  </Button>
                </TransitionLink>
                <TransitionLink href="/#contact">
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-full border-white/20 bg-white/10 px-8 text-sm font-medium tracking-wide text-white backdrop-blur hover:bg-white/15 hover:text-white"
                  >
                    <Mail size={14} data-icon="inline-start" /> {t("cta.contactButton")}
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
