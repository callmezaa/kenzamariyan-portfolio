"use client";

import { useTranslations } from "next-intl";
import { ArrowLeft, ArrowRight, Mail } from "lucide-react";
import type { TechItem } from "@/app/data/techArsenal";
import type { Experience } from "@/app/data/experience";
import { TextReveal } from "@/components/motion/text-reveal";
import { Reveal } from "@/components/motion/reveal/Reveal";
import { SpotlightCard } from "@/components/motion/hover/SpotlightCard";
import { Marquee } from "@/components/motion/marquee";
import { TransitionLink } from "@/components/motion/transition/TransitionLink";
import { Button } from "@/components/ui/button";
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

  const interests = [t("beyond.i1"), t("beyond.i2"), t("beyond.i3"), t("beyond.i4"), t("beyond.i5"), t("beyond.i6")];

  return (
    <main id="main-content" className="min-h-dvh">
      <div className="mx-auto max-w-3xl px-6 pb-28 pt-32 md:px-8 md:pt-40 space-y-28 md:space-y-36">
        <TransitionLink
          href="/"
          className="inline-flex items-center gap-2 label text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft size={14} />
          {t("backHome")}
        </TransitionLink>

        {/* Hero */}
        <header className="space-y-6">
          <p className="label text-ink-muted">{t("hero.kicker")}</p>
          <h1 className="display-xl text-balance">
            <TextReveal text={[t("hero.line1"), t("hero.line2")]} as="span" stagger={0.08} />
          </h1>
          <p className="body-lg text-ink-muted max-w-prose">{t("hero.tagline")}</p>
        </header>

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

        {/* Beyond */}
        <section aria-labelledby="beyond-heading" className="space-y-8">
          <Reveal variant="mask" className="space-y-3">
            <p className="label text-ink-muted">{t("beyond.label")}</p>
            <h2 id="beyond-heading" className="display-lg text-balance">{t("beyond.heading")}</h2>
          </Reveal>
          <Reveal variant="fade">
            <Marquee pauseOnHover fade speed={40}>
              {interests.map((item) => (
                <span
                  key={item}
                  className="label rounded-full border border-hairline bg-canvas-card px-5 py-2.5 text-ink-muted"
                >
                  {item}
                </span>
              ))}
            </Marquee>
          </Reveal>
        </section>

        {/* Arsenal */}
        <section aria-labelledby="arsenal-heading" className="space-y-8">
          <Reveal variant="mask" className="space-y-3">
            <p className="label text-ink-muted">{t("arsenal.label")}</p>
            <h2 id="arsenal-heading" className="display-lg text-balance">{t("arsenal.heading")}</h2>
          </Reveal>
          <TechArsenal items={techArsenal} />
        </section>

        {/* CTA */}
        <Reveal variant="rise">
          <div className="relative overflow-hidden rounded-[20px] bg-hairline shadow-1 p-8 text-center md:p-12 space-y-4">
            <p className="body-lg text-ink max-w-md mx-auto text-balance">{t("cta.text")}</p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <TransitionLink href="/projects">
                <Button size="lg" className="btn-3d rounded-full">
                  {t("cta.button")} <ArrowRight data-icon="inline-end" />
                </Button>
              </TransitionLink>
              <TransitionLink href="/#contact">
                <Button variant="outline" size="lg" className="btn-3d-outline rounded-full">
                  <Mail data-icon="inline-start" /> {t("cta.contactButton")}
                </Button>
              </TransitionLink>
            </div>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
