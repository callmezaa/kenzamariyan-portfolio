"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import GlowCard from "./ui/GlowCard";
import { seqHeader, seqLabel, seqTitle, seqDesc, staggerContainer, staggerItem } from "../utils/animations";
import { useReducedVariants } from "../utils/useReducedAnimation";

interface Certificate {
  title: string;
  issuer: string;
  year: string;
  description: string;
  files: string[];
  color: string;
  glowColor: string;
}

const certificates: Certificate[] = [
  {
    title: "Certified Programmer — Software Development",
    issuer: "BNSP (Badan Nasional Sertifikasi Profesi)",
    year: "2026",
    description:
      "Indonesian national professional certification validating competency in software development — including programming fundamentals, system design, and application architecture.",
    files: ["/image/Achievement/BNSP Certified Programmer - Software Development-1.png"],
    color: "#10b981",
    glowColor: "rgba(16, 185, 129, 0.08)",
  },
  {
    title: "AI Professional Certificate",
    issuer: "Google",
    year: "2026",
    description:
      "Comprehensive certification in artificial intelligence — covering ML workflows, Google AI tools, prompt engineering, and responsible AI deployment practices.",
    files: ["/image/Achievement/Google AI Professional Certificate-1.png"],
    color: "#3b82f6",
    glowColor: "rgba(59, 130, 246, 0.08)",
  },
  {
    title: "CMS For Developer II",
    issuer: "HubSpot Academy",
    year: "2026",
    description:
      "Advanced HubSpot CMS development certification — custom modules, serverless functions, HubDB integration, and marketplace app publishing.",
    files: ["/image/Achievement/HubSpot CMS For Developer II.png"],
    color: "#f97316",
    glowColor: "rgba(249, 115, 22, 0.08)",
  },
  {
    title: "Certified Full-Stack Developer",
    issuer: "micro1",
    year: "2026",
    description:
      "Industry-validated full-stack engineering certification assessing proficiency across frontend, backend, database, and cloud deployment technologies.",
    files: ["/image/Achievement/micro1 Certified Full-Stack Developer.jpg"],
    color: "#a855f7",
    glowColor: "rgba(168, 85, 247, 0.08)",
  },
  {
    title: "Top 100 — JuaraVibeCoding",
    issuer: "JuaraVibeCoding",
    year: "2026",
    description:
      "Recognized among the top 100 participants in a national coding competition, demonstrating strong algorithmic problem-solving and software engineering skills.",
    files: ["/image/Achievement/Top 100 JuaraVibeCoding Certificate of Achievement-1.png"],
    color: "#f59e0b",
    glowColor: "rgba(245, 158, 11, 0.08)",
  },
  {
    title: "Programming Fundamental",
    issuer: "Kementerian Pendidikan dan Kebudayaan (Nasional)",
    year: "2026",
    description:
      "Indonesian national certification in core programming concepts — algorithms, data structures, and object-oriented programming with practical assessments.",
    files: [
      "/image/Achievement/Sertifikat_KEN ZAMARIYAN_Programming Fundamental Nasional-1.png",
      "/image/Achievement/Sertifikat_KEN ZAMARIYAN_Programming Fundamental Nasional-2.png",
    ],
    color: "#06b6d4",
    glowColor: "rgba(6, 182, 212, 0.08)",
  },
  {
    title: "Intermediate Assistant Web Developer",
    issuer: "Kementerian Pendidikan dan Kebudayaan (Nasional)",
    year: "2026",
    description:
      "Indonesian national certification in intermediate web development — frontend frameworks, REST API integration, and relational database management.",
    files: [
      "/image/Achievement/Sertifikat_KEN ZAMARIYAN_Intermediate Assistant Web Developer Nasional-1.png",
      "/image/Achievement/Sertifikat_KEN ZAMARIYAN_Intermediate Assistant Web Developer Nasional-2.png",
    ],
    color: "#06b6d4",
    glowColor: "rgba(6, 182, 212, 0.08)",
  },
  {
    title: "Fundamental of Assistant Web Developer",
    issuer: "Kementerian Pendidikan dan Kebudayaan (Nasional)",
    year: "2026",
    description:
      "Indonesian national certification in foundational web development — HTML, CSS, JavaScript, responsive design, and basic front-end engineering.",
    files: [
      "/image/Achievement/Sertifikat_KEN ZAMARIYAN_Fundamental of Assistant Web Developer Nasional-1.png",
      "/image/Achievement/Sertifikat_KEN ZAMARIYAN_Fundamental of Assistant Web Developer Nasional-2.png",
    ],
    color: "#06b6d4",
    glowColor: "rgba(6, 182, 212, 0.08)",
  },
];

function CertificatePreview({ cert }: { cert: Certificate }) {
  const [page, setPage] = useState(0);
  const multi = cert.files.length > 1;

  return (
    <div className="relative w-full aspect-[16/10] overflow-hidden rounded-lg bg-zinc-900/50 group">
      <Image
        src={cert.files[page]}
        alt={cert.title}
        fill
        className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 33vw"
      />

      {multi && (
        <>
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="absolute left-1 top-1/2 -translate-y-1/2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-black/50 text-white/70 opacity-0 transition-opacity duration-200 hover:bg-black/70 hover:text-white group-hover:opacity-100 disabled:opacity-0 disabled:pointer-events-none"
          >
            <ChevronLeft size={14} />
          </button>
          <button
            onClick={() => setPage((p) => Math.min(cert.files.length - 1, p + 1))}
            disabled={page === cert.files.length - 1}
            className="absolute right-1 top-1/2 -translate-y-1/2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-black/50 text-white/70 opacity-0 transition-opacity duration-200 hover:bg-black/70 hover:text-white group-hover:opacity-100 disabled:opacity-0 disabled:pointer-events-none"
          >
            <ChevronRight size={14} />
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5">
            {cert.files.map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === page ? "w-4 bg-white" : "w-1.5 bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </>
      )}

      <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-white/5 pointer-events-none" />
    </div>
  );
}

export default function Achievements() {
  const { staggerContainer: container, staggerItem: item } = useReducedVariants();

  return (
    <section id="achievements" className="relative bg-canvas py-24 md:py-28 border-b border-white/5">
      <div className="relative mx-auto max-w-6xl px-6 md:px-8">
        {/* Section Header */}
        <motion.div
          variants={seqHeader}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16 max-w-2xl space-y-3"
        >
          <motion.p variants={seqLabel} className="text-xs font-semibold uppercase tracking-widest text-primary">
            Credentials
          </motion.p>
          <motion.h2 variants={seqTitle} className="display-lg tracking-tight text-white">
            Certifications & Recognition
          </motion.h2>
          <motion.p variants={seqDesc} className="body-base">
            Professional certifications and awards from national boards, industry leaders, and competitive events.
          </motion.p>
        </motion.div>

        {/* Certificate Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {certificates.map((cert) => (
            <motion.div key={cert.title} variants={item}>
              <GlowCard
                glowColor={cert.glowColor}
                radialSize={250}
                className="p-5 bg-surface-tile-1 border-white/10 hover:border-white/20 h-full flex flex-col"
              >
                {/* Certificate Preview */}
                <CertificatePreview cert={cert} />

                {/* Meta */}
                <div className="mt-4 space-y-1.5 flex-1">
                  <h3 className="text-sm font-semibold text-white font-display tracking-tight leading-snug">
                    {cert.title}
                  </h3>
                  <div className="flex items-center gap-2 text-[10px]">
                    <span className="font-medium text-zinc-400">{cert.issuer}</span>
                    <span className="text-zinc-600">·</span>
                    <span
                      className="font-semibold"
                      style={{ color: cert.color }}
                    >
                      {cert.year}
                    </span>
                  </div>
                  <p className="body-small pt-0.5 leading-relaxed">{cert.description}</p>
                </div>

                {/* Action */}
                <div className="pt-4 mt-auto border-t border-white/5">
                  <a
                    href={cert.files[0]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-press inline-flex items-center gap-1.5 text-[11px] font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    <ExternalLink size={12} />
                    <span>View Certificate</span>
                  </a>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
