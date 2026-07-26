"use client";

import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { useTranslations, useLocale } from "next-intl";
import { getLocalizedExperience } from "@/i18n/data";
import type { ExperienceType } from "../data/experience";
import type { Locale } from "@/i18n/request";
import { BouncyAccordion } from "@/components/motion/bouncy-accordion";
import { Briefcase, GraduationCap, Building } from "lucide-react";
import { appleSpring } from "../utils/animations";
import { Button } from "@/components/ui/button";

export default function Experience() {
  const t = useTranslations("experience");
  const locale = useLocale();
  const [activeFilter, setActiveFilter] = useState<ExperienceType | "all">("all");

  const filters = useMemo(() => [
    { label: t("filterAll"), value: "all" as const },
    { label: t("filterWork"), value: "work" as const },
    { label: t("filterEducation"), value: "education" as const },
    { label: t("filterOrganization"), value: "organization" as const },
  ], [t]);

  const experiences = useMemo(() => getLocalizedExperience(locale as Locale), [locale]);

  const items = useMemo(() => {
    const filtered =
      activeFilter === "all"
        ? experiences
        : experiences.filter((e) => e.type === activeFilter);
    return filtered.map((exp) => ({
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
    }));
  }, [activeFilter, t, experiences]);

  return (
    <section id="experience" className="bg-canvas-alt py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 space-y-3"
        >
          <p className="label text-ink-muted">{t("label")}</p>
          <h2 className="display-xl text-balance">{t("heading")}</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 flex flex-wrap gap-2"
        >
          {filters.map((f) => (
            <Button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              variant={activeFilter === f.value ? "default" : "secondary"}
              size="sm"
              aria-pressed={activeFilter === f.value}
              className="rounded-full"
            >
              {f.label}
            </Button>
          ))}
        </motion.div>

        <motion.div
          key={activeFilter}
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
