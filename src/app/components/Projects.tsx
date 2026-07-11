"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { projects } from "../data/projects";
import { easeOut } from "../utils/animations";

const featured = projects.filter((p) => ["contract-chill", "interviewos", "assetra"].includes(p.slug));

const projectImages: Record<string, string> = {
  "contract-chill": "/image/contract-chill/screenshot/mockup.png",
  interviewos: "/image/interviewOS/mockup.png",
  assetra: "/image/assetra/mockup.png",
};

export default function Projects() {
  return (
    <section id="projects" className="bg-canvas py-24 md:py-28 border-b border-hairline">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: easeOut }}
          className="mb-12 space-y-3"
        >
          <p className="micro-cap text-ink-muted">Selected Work</p>
          <h2 className="display-xl">Projects That Ship</h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: easeOut, delay: i * 0.1 }}
            >
              <Link
                href={`/projects/${project.slug}`}
                className="group block relative w-full aspect-[4/3] overflow-hidden rounded-sm border border-hairline bg-canvas-card"
              >
                <Image
                  src={projectImages[project.slug] || projectImages[project.slug]}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-top transition-opacity duration-300 group-hover:opacity-80"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-canvas to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="body-md font-bold text-ink mb-1">{project.title}</h3>
                  <p className="caption text-ink-muted">{project.stack.slice(0, 3).join(" · ")}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
