"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { easeOut } from "../utils/animations";

interface Certificate {
  title: string;
  issuer: string;
  year: string;
  description: string;
  files: string[];
}

const certificates: Certificate[] = [
  {
    title: "Certified Programmer — Software Development",
    issuer: "BNSP (Badan Nasional Sertifikasi Profesi)",
    year: "2026",
    description: "Indonesian national professional certification validating competency in software development — including programming fundamentals, system design, and application architecture.",
    files: ["/image/Achievement/BNSP Certified Programmer - Software Development-1.png"],
  },
  {
    title: "AI Professional Certificate",
    issuer: "Google",
    year: "2026",
    description: "Comprehensive certification in artificial intelligence — covering ML workflows, Google AI tools, prompt engineering, and responsible AI deployment practices.",
    files: ["/image/Achievement/Google AI Professional Certificate-1.png"],
  },
  {
    title: "CMS For Developer II",
    issuer: "HubSpot Academy",
    year: "2026",
    description: "Advanced HubSpot CMS development certification — custom modules, serverless functions, HubDB integration, and marketplace app publishing.",
    files: ["/image/Achievement/HubSpot CMS For Developer II.png"],
  },
  {
    title: "Certified Full-Stack Developer",
    issuer: "micro1",
    year: "2026",
    description: "Industry-validated full-stack engineering certification assessing proficiency across frontend, backend, database, and cloud deployment technologies.",
    files: ["/image/Achievement/micro1 Certified Full-Stack Developer.jpg"],
  },
  {
    title: "Top 100 — JuaraVibeCoding",
    issuer: "JuaraVibeCoding",
    year: "2026",
    description: "Recognized among the top 100 participants in a national coding competition, demonstrating strong algorithmic problem-solving and software engineering skills.",
    files: ["/image/Achievement/Top 100 JuaraVibeCoding Certificate of Achievement-1.png"],
  },
  {
    title: "Programming Fundamental",
    issuer: "Kementerian Pendidikan dan Kebudayaan (Nasional)",
    year: "2026",
    description: "Indonesian national certification in core programming concepts — algorithms, data structures, and object-oriented programming with practical assessments.",
    files: [
      "/image/Achievement/Sertifikat_KEN ZAMARIYAN_Programming Fundamental Nasional-1.png",
      "/image/Achievement/Sertifikat_KEN ZAMARIYAN_Programming Fundamental Nasional-2.png",
    ],
  },
  {
    title: "Intermediate Assistant Web Developer",
    issuer: "Kementerian Pendidikan dan Kebudayaan (Nasional)",
    year: "2026",
    description: "Indonesian national certification in intermediate web development — frontend frameworks, REST API integration, and relational database management.",
    files: [
      "/image/Achievement/Sertifikat_KEN ZAMARIYAN_Intermediate Assistant Web Developer Nasional-1.png",
      "/image/Achievement/Sertifikat_KEN ZAMARIYAN_Intermediate Assistant Web Developer Nasional-2.png",
    ],
  },
  {
    title: "Fundamental of Assistant Web Developer",
    issuer: "Kementerian Pendidikan dan Kebudayaan (Nasional)",
    year: "2026",
    description: "Indonesian national certification in foundational web development — HTML, CSS, JavaScript, responsive design, and basic front-end engineering.",
    files: [
      "/image/Achievement/Sertifikat_KEN ZAMARIYAN_Fundamental of Assistant Web Developer Nasional-1.png",
      "/image/Achievement/Sertifikat_KEN ZAMARIYAN_Fundamental of Assistant Web Developer Nasional-2.png",
    ],
  },
  {
    title: "Front-End & Back-End Development",
    issuer: "Kementerian Pendidikan dan Kebudayaan (Nasional)",
    year: "2026",
    description: "Indonesian national certification in full-stack web development — covering frontend frameworks, backend APIs, database integration, and production deployment workflows.",
    files: [
      "/image/Achievement/Sertifikat_KEN ZAMARIYAN_Front-End  Back-End Development - Nasional-1.png",
      "/image/Achievement/Sertifikat_KEN ZAMARIYAN_Front-End  Back-End Development - Nasional-2.png",
    ],
  },
];

function CertificatePreview({ cert, files }: { cert: Certificate; files: string[] }) {
  const [page, setPage] = useState(0);
  const multi = files.length > 1;

  return (
    <div className="relative w-full aspect-[16/10] overflow-hidden rounded-sm bg-canvas-card group">
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3, ease: easeOut }}
        className="relative w-full h-full"
      >
        <Image
          src={files[page]}
          alt={cert.title}
          fill
          className="object-contain p-2"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </motion.div>
      {multi && (
        <>
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="absolute left-1 top-1/2 -translate-y-1/2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-canvas/50 text-ink-muted opacity-0 transition-opacity group-hover:opacity-100 disabled:opacity-0 disabled:pointer-events-none cursor-pointer"
          >
            <ChevronLeft size={14} />
          </button>
          <button
            onClick={() => setPage((p) => Math.min(files.length - 1, p + 1))}
            disabled={page === files.length - 1}
            className="absolute right-1 top-1/2 -translate-y-1/2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-canvas/50 text-ink-muted opacity-0 transition-opacity group-hover:opacity-100 disabled:opacity-0 disabled:pointer-events-none cursor-pointer"
          >
            <ChevronRight size={14} />
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
            {files.map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer ${i === page ? "bg-ink w-3" : "bg-hairline"}`}
              />
            ))}
          </div>
        </>
      )}
      <div className="absolute inset-0 rounded-sm ring-1 ring-inset ring-hairline pointer-events-none" />
    </div>
  );
}

export default function Achievements() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? certificates : certificates.slice(0, 3);
  const hidden = certificates.length - 3;

  return (
    <section id="achievements" className="bg-canvas py-24 md:py-28 border-b border-hairline">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <div className="mb-12 max-w-2xl space-y-3">
          <p className="micro-cap text-ink-muted">Credentials</p>
          <h2 className="display-xl">Certifications & Recognition</h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {visible.map((cert, i) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
                transition={{ duration: 0.3, ease: easeOut, delay: i * 0.03 }}
              >
                <motion.div
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.25, ease: easeOut }}
                  className="p-5 border border-hairline rounded-sm bg-canvas-card h-full flex flex-col hover:shadow-md transition-shadow duration-300"
                >
                  <CertificatePreview cert={cert} files={cert.files} />
                  <div className="mt-4 space-y-1.5 flex-1">
                    <h3 className="body-md font-bold text-ink">{cert.title}</h3>
                    <div className="flex items-center gap-2 caption text-ink-muted">
                      <span>{cert.issuer}</span>
                      <span className="text-hairline">·</span>
                      <span>{cert.year}</span>
                    </div>
                  </div>
                  <div className="pt-4 mt-auto border-t border-hairline">
                    <a
                      href={cert.files[0]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="button-cap text-ink-muted hover:text-ink transition-colors inline-flex items-center gap-1"
                    >
                      View Certificate <ExternalLink size={12} />
                    </a>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <button
            onClick={() => setShowAll((v) => !v)}
            className="inline-flex items-center gap-2 rounded-pill border border-hairline px-6 py-3 button-cap text-ink-muted hover:text-ink hover:border-ink transition-colors cursor-pointer"
          >
            {showAll ? "Show Less" : `View All (+${hidden})`}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
