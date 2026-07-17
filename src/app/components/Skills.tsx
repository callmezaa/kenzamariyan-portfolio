"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { SiGithub } from "react-icons/si";
import { skillsData } from "../data/skillsData";
import { staggerContainer, staggerItem, easeOut } from "../utils/animations";
import { Tooltip } from "@/components/motion/tooltip";
import { AnimatedNumber } from "@/components/motion/animated-number";
import { Button } from "@/components/ui/button";
import GitHubSection from "./GitHubSection";

const TABS = ["All", ...skillsData.map((c) => c.title)];

export default function Skills() {
  const [activeTab, setActiveTab] = useState("All");
  const reduceMotion = useReducedMotion();

  const visible =
    activeTab === "All"
      ? skillsData
      : skillsData.filter((c) => c.title === activeTab);

  return (
    <section id="skills" className="bg-canvas-alt py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <div className="mb-10 max-w-2xl space-y-3">
          <p className="label text-ink-muted">Capabilities</p>
          <h2 className="display-xl text-balance">What I can deliver for you</h2>
          <p className="body-base">
            Grouped by outcome, not just tools — the engineering domains I use
            to launch reliable digital products.
          </p>
        </div>

        {/* Interactive tab filter */}
        <div
          role="tablist"
          aria-label="Skill categories"
          className="mb-10 flex flex-wrap gap-1.5 rounded-full bg-surface-soft p-1"
        >
          {TABS.map((tab) => {
            const active = activeTab === tab;
            return (
              <button
                key={tab}
                role="tab"
                aria-selected={active}
                aria-pressed={active}
                onClick={() => setActiveTab(tab)}
                className="relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ink/40"
              >
                {active && (
                  <motion.span
                    layoutId="skill-tab"
                    className="absolute inset-0 rounded-full bg-canvas-card shadow-1"
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 380, damping: 30, mass: 0.7 }
                    }
                  />
                )}
                <span
                  className={`relative z-10 ${
                    active ? "text-ink" : "text-ink-muted hover:text-ink"
                  }`}
                >
                  {tab}
                </span>
              </button>
            );
          })}
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 md:grid-cols-2"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((cat) => (
              <SkillCard key={cat.title} category={cat} />
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: easeOut }}
          className="mt-14"
        >
          <div className="rounded-[14px] bg-canvas-glass backdrop-blur-sm shadow-1 p-6 md:p-8">
            <div className="flex items-center justify-between mb-4">
              <p className="label text-ink-muted">Open Source</p>
              <motion.a
                href="https://github.com/callmezaa"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                className="inline-flex items-center gap-2 rounded-full border border-hairline px-4 py-1.5 body-small text-ink-muted hover:text-ink hover:border-ink/20 transition-colors"
              >
                <SiGithub size={14} />
                View GitHub
              </motion.a>
            </div>
            <GitHubSection />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SkillCard({ category }: { category: (typeof skillsData)[number] }) {
  return (
    <motion.div
      variants={staggerItem}
      layout
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.3, ease: easeOut }}
      className="h-full"
    >
      <motion.div
        whileHover={{ y: -2 }}
        transition={{ duration: 0.3, ease: easeOut }}
        className="flex h-full rounded-[14px] bg-canvas-glass backdrop-blur-sm shadow-1 p-6 transition-shadow duration-300 hover:shadow-2"
      >
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
      </motion.div>
    </motion.div>
  );
}

function SkillRow({
  skill,
  index,
}: {
  skill: (typeof skillsData)[number]["skills"][number];
  index: number;
}) {
  return (
    <div className="group flex cursor-default items-center gap-2 py-1">
      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-lg bg-surface-soft p-1">
        {skill.icon ? (
          <skill.icon
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
          content={`${skill.mastery}% · ${skill.years} yr${skill.years > 1 ? "s" : ""} experience`}
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
          <span className="mono-sm text-ink-tertiary">{skill.years} yr</span>
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
