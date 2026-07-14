"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { experiences, type ExperienceType } from "../data/experience";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { appleSpring } from "../utils/animations";

const filters: { label: string; value: ExperienceType | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Work", value: "work" },
  { label: "Education", value: "education" },
  { label: "Organization", value: "organization" },
];

const typeColors: Record<ExperienceType, string> = {
  work: "bg-primary/10 text-primary",
  education: "bg-chart-2/10 text-chart-2",
  organization: "bg-chart-3/10 text-chart-3",
};

export default function Experience() {
  const [activeFilter, setActiveFilter] = useState<ExperienceType | "all">("all");

  const filtered =
    activeFilter === "all"
      ? experiences
      : experiences.filter((e) => e.type === activeFilter);

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
          <p className="label text-ink-muted">Career</p>
          <h2 className="display-xl">Experience & Education</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 flex flex-wrap gap-2"
        >
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 cursor-pointer ${
                activeFilter === f.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        <motion.div
          key={activeFilter}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={appleSpring}
        >
          <Accordion className="rounded-xl border bg-card shadow-sm">
            {filtered.map((exp) => (
              <AccordionItem key={`${exp.title}-${exp.year}`} value={`${exp.title}-${exp.year}`}>
                <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-muted/50 data-open:border-b">
                  <div className="flex flex-1 flex-col items-start gap-1 text-left sm:flex-row sm:items-center sm:gap-4">
                    <span className="mono-sm text-muted-foreground shrink-0">{exp.year}</span>
                    <span className="text-foreground font-medium">{exp.title}</span>
                    <span className="body-small text-muted-foreground">{exp.place}</span>
                    <span className={`ml-auto rounded-full px-2 py-0.5 text-[10px] font-medium ${typeColors[exp.type]}`}>
                      {exp.type}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-5">
                  <div className="space-y-4 py-2">
                    <div className="flex items-center gap-2 body-small text-muted-foreground">
                      <span>{exp.location}</span>
                    </div>
                    <p className="body-base text-muted-foreground leading-relaxed">
                      {exp.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {exp.tags.map((tag) => (
                        <span
                          key={tag}
                          className="mono-sm rounded-full bg-muted px-2.5 py-1 text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
