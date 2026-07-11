"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import type { Project } from "../data/projects";
import { easeOut } from "../utils/animations";

const projectImages: Record<string, string> = {
  "contract-chill": "/image/contract-chill/screenshot/mockup.png",
  interviewos: "/image/interviewOS/mockup.png",
  assetra: "/image/assetra/mockup.png",
  gotani: "/image/gotani/mockup.png",
  monetra: "/image/monetra/mockup.png",
  mercato: "/image/mercato/mockup.png",
};

interface ProjectDetailProps {
  project: Project;
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  const heroSrc = projectImages[project.slug] || projectImages[project.slug];

  return (
    <div className="min-h-screen bg-canvas pt-28 md:pt-36">
      <div className="mx-auto max-w-4xl px-6 md:px-8 pb-24">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 micro-cap text-ink-muted hover:text-ink transition-colors mb-8"
        >
          <ArrowLeft size={14} />
          Back to Projects
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easeOut }}
          className="space-y-16"
        >
          <div className="space-y-6">
            <div className="relative w-full aspect-[16/9] overflow-hidden rounded-sm border border-hairline bg-canvas-card">
              <Image
                src={heroSrc}
                alt={project.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 896px"
                className="object-cover object-top"
              />
            </div>

            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                {project.badge && (
                  <span className="micro-cap px-2.5 py-1 rounded-sm border border-hairline text-ink-muted">{project.badge}</span>
                )}
                <span className="caption text-ink-muted">{project.year}</span>
                <span className="caption text-ink-muted">·</span>
                <span className="caption text-ink-muted">{project.role}</span>
              </div>
              <h1 className="display-xl">{project.title}</h1>
              <p className="body-lg">{project.summary}</p>
            </div>
          </div>

          <div className="space-y-12">
            <section className="space-y-3">
              <h2 className="button-cap text-ink">Challenge</h2>
              <p className="body-lg text-ink-muted">{project.challenge}</p>
            </section>

            <section className="space-y-3">
              <h2 className="button-cap text-ink">Solution</h2>
              <p className="body-lg text-ink-muted">{project.solution}</p>
            </section>

            <section className="space-y-3">
              <h2 className="button-cap text-ink">Impact</h2>
              <p className="body-lg text-ink-muted">{project.impact}</p>
            </section>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span key={tech} className="micro-cap px-3 py-1.5 rounded-sm border border-hairline text-ink-muted">
                {tech}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 pt-4 border-t border-hairline">
            <a
              href={project.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-pill border border-ink px-5 py-2.5 button-cap text-ink hover:bg-canvas-card transition-colors"
            >
              <Github size={16} />
              Source Code
            </a>
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-pill border border-ink bg-ink px-5 py-2.5 button-cap text-canvas hover:opacity-90 transition-opacity"
              >
                <ExternalLink size={16} />
                Live Demo
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
