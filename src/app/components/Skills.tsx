"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import type { SkillCategory, SkillItem } from "../data/skillsData";
import { ICONS } from "../data/icons";
import { easeOut } from "../utils/animations";
import { Tooltip } from "@/components/motion/tooltip";
import { AnimatedNumber } from "@/components/motion/animated-number";
import { Reveal } from "@/components/motion/reveal/Reveal";
import { SpotlightCard } from "@/components/motion/hover/SpotlightCard";
import { TransitionLink } from "@/components/motion/transition/TransitionLink";
import { Button } from "@/components/ui/button";

export default function Skills({ skills }: { skills: SkillCategory[] }) {
  const t = useTranslations("skills");

  return (
    <section id="skills" className="bg-canvas py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <div className="panel-3d rounded-[20px] bg-canvas-glass backdrop-blur-xl p-6 md:p-10">
        <Reveal variant="rise" className="mb-10 md:mb-12 max-w-2xl space-y-3">
          <p className="label text-ink-muted">{t("label")}</p>
          <h2 className="display-xl text-balance">{t("heading")}</h2>
          <p className="body-base">{t("description")}</p>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2">
          {skills.map((cat) => (
            <SkillCard key={cat.title} category={cat} />
          ))}
        </div>

        <Reveal className="mt-10 flex justify-center">
          <TransitionLink href="/skills">
            <Button variant="outline" size="lg" className="btn-3d-outline rounded-full">
              {t("moreLink")} <ArrowRight data-icon="inline-end" />
            </Button>
          </TransitionLink>
        </Reveal>
        </div>
      </div>
    </section>
  );
}

function SkillCard({ category }: { category: SkillCategory }) {
  return (
    <Reveal variant="scale" className="h-full">
      <SpotlightCard className="flex h-full rounded-[14px] bg-canvas-glass backdrop-blur-sm shadow-1 p-6 transition-shadow duration-300 hover:shadow-2">
        <div className="flex w-full flex-col gap-5">
          <div>
            <h3 className="button-cap text-ink">{category.title}</h3>
            <p className="body-small text-ink-muted mt-1">{category.tagline}</p>
          </div>

          <div className="h-px bg-hairline" />

          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            {category.skills.map((skill, i) => (
              <SkillRow key={skill.name} skill={skill} index={i} />
            ))}
          </div>
        </div>
      </SpotlightCard>
    </Reveal>
  );
}

function SkillRow({
  skill,
  index,
}: {
  skill: SkillItem;
  index: number;
}) {
  const t = useTranslations("skills");
  const yearsLabel = skill.years === 1 ? t("years") : t("yearsPlural");
  const Icon = skill.icon ? ICONS[skill.icon] : null;
  return (
    <div className="group flex cursor-default items-center gap-2 py-1">
      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-lg bg-surface-soft p-1">
        {Icon ? (
          <Icon
            size={12}
            className="transition-colors duration-200 group-hover:text-ink"
            style={{
              color: skill.brandColor ?? undefined,
            }}
          />
        ) : (
          <span className="h-1.5 w-1.5 rounded-full bg-ink-muted" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <Tooltip
          content={`${skill.mastery}% · ${skill.years} ${yearsLabel} experience`}
          side="right"
          delay={300}
        >
          <span className="mono-sm text-ink-muted transition-colors duration-200 group-hover:text-ink">
            {skill.name}
          </span>
        </Tooltip>
        <div className="mt-1 flex items-center gap-2">
          <div className="h-[3px] flex-1 overflow-hidden rounded-full bg-surface-hover">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.mastery}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: easeOut, delay: index * 0.05 }}
              className="h-full rounded-full bg-ink"
            />
          </div>
          <span className="mono-sm text-ink-tertiary">{skill.years} {yearsLabel}</span>
          <AnimatedNumber
            value={skill.mastery}
            duration={0.6}
            format={(n) => `${Math.round(n)}%`}
            className="mono-sm text-ink-muted"
          />
        </div>
      </div>
    </div>
  );
}
