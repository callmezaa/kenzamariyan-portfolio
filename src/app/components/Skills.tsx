"use client";

import { motion } from "framer-motion";
import { SiHtml5, SiCss3, SiJavascript, SiTypescript, SiReact, SiNextdotjs, SiTailwindcss, SiFirebase, SiGit, SiFigma } from "react-icons/si";

const skillGroups = [
  {
    title: "Frontend",
    items: [
      { name: "HTML", icon: SiHtml5 },
      { name: "CSS", icon: SiCss3 },
      { name: "JavaScript", icon: SiJavascript },
      { name: "TypeScript", icon: SiTypescript },
      { name: "React", icon: SiReact },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "Tailwind CSS", icon: SiTailwindcss },
    ],
  },
  {
    title: "Mobile",
    items: [{ name: "React Native", icon: SiReact }],
  },
  {
    title: "Backend & Data",
    items: [{ name: "Firebase", icon: SiFirebase }],
  },
  {
    title: "Tools & Others",
    items: [
      { name: "Git", icon: SiGit },
      { name: "UI/UX Basics", icon: SiFigma },
    ],
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative scroll-mt-24 overflow-hidden
                 bg-linear-to-b from-zinc-950 via-zinc-950 to-black py-32"
    >
      {/* ambient continuation */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/3 top-1/3 h-96 w-96 rounded-full bg-blue-500/10 blur-[160px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        {/* HEADER */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: "easeOut" }} className="mb-16 max-w-xl space-y-3">
          <p className="text-sm uppercase tracking-widest text-blue-400">Capabilities</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-zinc-100">
            Skills <span className="text-blue-400">Stack</span>
          </h2>
          <p className="text-zinc-400 leading-relaxed">A curated set of technologies I use to craft reliable and scalable digital products.</p>
        </motion.div>

        {/* SKILL GROUPS */}
        <div className="grid gap-8 md:grid-cols-2">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                ease: "easeOut",
                delay: i * 0.1,
              }}
              className="rounded-2xl border border-zinc-800/60
                         bg-zinc-900/40 p-6 backdrop-blur-xl
                         hover:border-blue-500/40 transition"
            >
              <h3 className="mb-5 text-lg font-semibold text-zinc-200">{group.title}</h3>

              <div className="flex flex-wrap gap-4">
                {group.items.map(({ name, icon: Icon }) => (
                  <div
                    key={name}
                    className="group flex items-center gap-3
                               rounded-xl border border-zinc-700/60
                               bg-zinc-950/60 px-4 py-3
                               transition hover:border-blue-500/50"
                  >
                    <Icon
                      size={20}
                      className="text-zinc-400 transition
                                 group-hover:text-blue-400
                                 group-hover:scale-110"
                    />
                    <span className="text-sm text-zinc-300 group-hover:text-white">{name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
