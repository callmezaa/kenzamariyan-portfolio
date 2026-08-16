"use client";

import { useMemo } from "react";
import { motion } from "motion/react";
import { useTranslations, useLocale } from "next-intl";
import { getLocalizedExperience } from "@/i18n/data";
import type { Locale } from "@/i18n/request";
import { BouncyAccordion } from "@/components/motion/bouncy-accordion";
import { Reveal } from "@/components/motion/reveal/Reveal";
import { Briefcase, GraduationCap, Building } from "lucide-react";
import { appleSpring } from "../utils/animations";

export default function Experience() {
  const t = useTranslations("experience");
  const locale = useLocale();

  const experiences = useMemo(() => getLocalizedExperience(locale as Locale), [locale]);

  const items = useMemo(() => experiences.map((exp) => ({
    id: `${exp.title}-${exp.year}`,
    title: `${exp.year} · ${exp.title}`,
    description: (
      <div className="space-y-3 py-2">
        <div className="flex items-center gap-2 body-small text-ink-muted">
          <span>{exp.place}</span>
          <span>·</span>
          <span>{exp.location}</span>
          <span className="ml-auto rounded-full bg-surface-active px-2 py-0.5 text-[10px] font-medium">
            {t(`filter${exp.type.charAt(0).toUpperCase() + exp.type.slice(1)}`)}
          </span>
        </div>
        <p className="body-base text-ink-muted leading-relaxed">{exp.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {exp.tags.map((tag) => (
            <span key={tag} className="mono-sm rounded-full bg-surface-soft px-2.5 py-1 text-ink-muted">{tag}</span>
          ))}
        </div>
      </div>
    ),
    icon: exp.type === "work" ? <Briefcase className="h-4 w-4" /> :
          exp.type === "education" ? <GraduationCap className="h-4 w-4" /> :
          <Building className="h-4 w-4" />,
  })), [experiences, t]);

  return (
    <section id="experience" className="bg-canvas-alt py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <Reveal variant="mask" className="mb-12 space-y-3">
          <p className="label text-ink-muted">{t("label")}</p>
          <h2 className="display-xl text-balance">{t("heading")}</h2>
        </Reveal>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={appleSpring}
        >
          {items.length > 0 ? (
            <BouncyAccordion
              items={items}
              defaultValue={null}
              collapsible
            />
          ) : (
            <p className="body-base text-ink-muted text-center py-8">
              {t("empty")}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
