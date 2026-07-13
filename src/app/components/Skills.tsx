"use client";

import { motion } from "framer-motion";
import { skillsData } from "../data/skillsData";
import { staggerContainer, staggerItem, easeOut } from "../utils/animations";

export default function Skills() {
  return (
    <section id="skills" className="border-b border-hairline bg-canvas py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <div className="mb-16 max-w-2xl space-y-3">
          <p className="micro-cap text-ink-muted">Capabilities</p>
          <h2 className="display-xl">Expertise Ecosystem</h2>
          <p className="body-lg">
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
        whileHover={{ y: -3 }}
        transition={{ duration: 0.25, ease: easeOut }}
        className="flex h-full rounded-sm border border-hairline bg-canvas-card p-8 transition-shadow duration-300 hover:shadow-lg"
      >
        <div className="flex w-full flex-col gap-6">
          <h3 className="button-cap text-ink">{category.title}</h3>

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
    <div className="group flex cursor-default items-center gap-2 py-0.5">
      <div className="flex h-4 w-4 shrink-0 items-center justify-center">
        {skill.icon ? (
          <skill.icon
            size={14}
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
        <span className="caption text-ink-muted transition-colors duration-200 group-hover:text-ink">
          {skill.name}
        </span>
        <div className="mt-0.5 h-[2px] overflow-hidden rounded-full bg-hairline">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${skill.mastery}%` }}
            transition={{ duration: 0.6, ease: easeOut, delay: index * 0.05 }}
            className="h-full rounded-full bg-ink"
          />
        </div>
      </div>
    </div>
  );
}
