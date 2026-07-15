"use client";

import { motion } from "framer-motion";
import { skillsData } from "../data/skillsData";
import { staggerContainer, staggerItem, easeOut } from "../utils/animations";
import { Tooltip } from "@/components/motion/tooltip";
import { AnimatedNumber } from "@/components/motion/animated-number";

export default function Skills() {
  return (
    <section id="skills" className="bg-canvas-alt py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <div className="mb-16 max-w-2xl space-y-3">
          <p className="label text-ink-muted">Capabilities</p>
          <h2 className="display-xl">Expertise Ecosystem</h2>
          <p className="body-base">
            A comprehensive mapping of my engineering domains, showcasing the
            technical depth and workflows I use to launch digital products.
          </p>
        </div>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 md:grid-cols-2"
        >
          {skillsData.map((cat) => (
            <SkillCard key={cat.title} category={cat} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function SkillCard({ category }: { category: (typeof skillsData)[number] }) {
  return (
    <motion.div variants={staggerItem} className="h-full">
      <motion.div
        whileHover={{ y: -2 }}
        transition={{ duration: 0.3, ease: easeOut }}
        className="flex h-full rounded-[14px] bg-canvas-glass backdrop-blur-sm shadow-lg shadow-black/30 p-6 transition-shadow duration-300 hover:shadow-xl"
      >
        <div className="flex w-full flex-col gap-5">
          <h3 className="button-cap text-ink">{category.title}</h3>

          <div className="h-px bg-white/5" />

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
      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-lg bg-white/5 p-1">
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
        <Tooltip content={`${skill.mastery}%`} side="right" delay={300}>
          <span className="mono-sm text-ink-muted transition-colors duration-200 group-hover:text-ink">
            {skill.name}
          </span>
        </Tooltip>
        <div className="mt-1 flex items-center gap-2">
          <div className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/10">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.mastery}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: easeOut, delay: index * 0.05 }}
              className="h-full rounded-full bg-ink"
            />
          </div>
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
