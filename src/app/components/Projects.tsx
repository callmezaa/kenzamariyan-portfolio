"use client";

import { motion } from "framer-motion";

const projects = [
  {
    title: "Gotani Mobile Application",
    description: "A mobile-based agriculture application that helps farmers manage products, monitor transactions, and access data efficiently through a simple and scalable mobile experience.",
    stack: ["React Native", "Firebase"],
    role: "Mobile & Backend Developer",
    year: "2024",
    link: "https://github.com/callmezaa/pointofsales-gotani.git",
  },
  {
    title: "Gotani Admin Dashboard",
    description: "A web-based admin dashboard to manage agricultural data, users, and transactions with a focus on clarity, performance, and operational efficiency.",
    stack: ["React", "Vite"],
    role: "Frontend Developer",
    year: "2024",
    link: "https://github.com/callmezaa/web-admin-gotani",
  },
  {
    title: "KPJMI Company Profile Website",
    description: "A company profile website for Koperasi Petani Jaya Makmur Indonesia, designed to improve brand presence, information accessibility, and public trust.",
    stack: ["HTML", "CSS", "JavaScript", "MySQL"],
    role: "Web Developer",
    year: "2023",
    link: "https://github.com/callmezaa/koperasi-merdekaa",
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="
        relative scroll-mt-24 overflow-hidden
        bg-linear-to-b from-zinc-950 via-zinc-950 to-black
        py-32
      "
    >
      {/* ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/4 h-105 w-105 -translate-x-1/2 rounded-full bg-blue-500/10 blur-[160px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        {/* HEADER */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: "easeOut" }} className="mb-20 max-w-xl space-y-3">
          <p className="text-sm uppercase tracking-widest text-blue-400">Selected Work</p>

          <h2 className="text-3xl md:text-4xl font-semibold text-zinc-100">
            Projects <span className="text-blue-400">Highlights</span>
          </h2>

          <p className="text-zinc-400 leading-relaxed">A curated selection of real-world projects that reflect my approach to building scalable and maintainable digital products.</p>
        </motion.div>

        {/* PROJECT LIST */}
        <div className="space-y-12">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
                delay: i * 0.1,
              }}
              className="
                group relative overflow-hidden
                rounded-3xl border border-zinc-800/60
                bg-zinc-900/40 p-10 backdrop-blur-xl
                transition hover:border-blue-500/40
              "
            >
              {/* hover glow */}
              <div
                className="
                  pointer-events-none absolute inset-0
                  rounded-3xl opacity-0
                  bg-linear-to-r from-blue-500/10 via-transparent to-transparent
                  transition group-hover:opacity-100
                "
              />

              <div className="relative grid gap-10 md:grid-cols-3">
                {/* LEFT CONTENT */}
                <div className="md:col-span-2 space-y-5">
                  <div className="flex flex-wrap items-center gap-4">
                    <h3 className="text-xl md:text-2xl font-semibold text-zinc-100">{project.title}</h3>

                    <span className="rounded-full border border-zinc-700/60 px-3 py-1 text-xs text-zinc-400">{project.year}</span>
                  </div>

                  <p className="max-w-2xl text-zinc-400 leading-relaxed">{project.description}</p>

                  <div className="flex flex-wrap gap-3">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="
                          rounded-full border border-zinc-700/60
                          bg-zinc-950/60 px-4 py-2
                          text-xs text-zinc-300
                        "
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* RIGHT META */}
                <div className="flex flex-col justify-between">
                  <p className="text-sm text-zinc-400">
                    <span className="text-zinc-200">Role:</span> {project.role}
                  </p>

                  <a
                    href={project.link}
                    className="
                      mt-6 inline-flex w-fit items-center gap-2
                      rounded-xl border border-zinc-700/60
                      px-5 py-2.5 text-sm text-zinc-300
                      transition
                      hover:border-blue-500/50
                      hover:text-white
                    "
                  >
                    View Project →
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
