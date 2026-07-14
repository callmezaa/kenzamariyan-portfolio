"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ChevronLeft, ChevronRight, X, Download, Eye } from "lucide-react";
import { easeOut } from "../utils/animations";

interface Certificate {
  title: string;
  issuer: string;
  year: string;
  description: string;
  files: string[];
  url?: string;
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
    <div className="relative w-full aspect-[16/10] overflow-hidden rounded-t-[14px] bg-canvas-card group">
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
            className="absolute left-1 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 md:h-7 md:w-7 items-center justify-center rounded-full bg-canvas/50 text-ink-muted md:opacity-0 md:group-hover:opacity-100 transition-opacity disabled:opacity-0 disabled:pointer-events-none cursor-pointer"
          >
            <ChevronLeft size={14} />
          </button>
          <button
            onClick={() => setPage((p) => Math.min(files.length - 1, p + 1))}
            disabled={page === files.length - 1}
            className="absolute right-1 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 md:h-7 md:w-7 items-center justify-center rounded-full bg-canvas/50 text-ink-muted md:opacity-0 md:group-hover:opacity-100 transition-opacity disabled:opacity-0 disabled:pointer-events-none cursor-pointer"
          >
            <ChevronRight size={14} />
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 md:gap-1.5 z-10 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
            {files.map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`w-2 h-2 md:w-1.5 md:h-1.5 rounded-full transition-all cursor-pointer ${i === page ? "bg-ink w-4 md:w-3" : "bg-hairline"}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function CertificateModal({
  cert,
  currentIndex,
  total,
  onClose,
  onPrev,
  onNext,
}: {
  cert: Certificate;
  currentIndex: number;
  total: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const [page, setPage] = useState(0);
  const multi = cert.files.length > 1;
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === total - 1;

  useEffect(() => {
    setPage(0);
  }, [currentIndex]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && !isFirst) onPrev();
      if (e.key === "ArrowRight" && !isLast) onNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onPrev, onNext, isFirst, isLast]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-canvas/80 p-4 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 8 }}
        transition={{ duration: 0.25, ease: easeOut }}
        onClick={(e) => e.stopPropagation()}
        className="flex w-full max-w-3xl flex-col overflow-hidden rounded-[20px] border border-white/10 bg-canvas-glass backdrop-blur-xl shadow-2xl shadow-black/80"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-hairline px-4 py-2.5 md:px-5 md:py-3">
          <div className="flex items-center gap-2">
            <button
              onClick={onPrev}
              disabled={isFirst}
              className="flex h-8 w-8 items-center justify-center rounded-sm text-ink-muted hover:text-ink disabled:opacity-0 disabled:pointer-events-none transition-colors cursor-pointer"
              aria-label="Previous certificate"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="caption text-ink-muted">
              {currentIndex + 1} / {total}
            </span>
            <button
              onClick={onNext}
              disabled={isLast}
              className="flex h-8 w-8 items-center justify-center rounded-sm text-ink-muted hover:text-ink disabled:opacity-0 disabled:pointer-events-none transition-colors cursor-pointer"
              aria-label="Next certificate"
            >
              <ChevronRight size={16} />
            </button>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-sm text-ink-muted hover:text-ink transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col overflow-y-auto md:flex-row">
          {/* Image section */}
          <div className="relative flex items-start justify-center bg-canvas">
            <div className="relative aspect-[3/4] w-full max-h-[50vh] md:max-h-[75vh] md:min-h-[60vh]">
              <Image
                src={cert.files[page]}
                alt={cert.title}
                fill
                className="object-contain p-4 md:p-6"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
            {multi && (
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex gap-1.5 md:gap-2">
                {cert.files.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i)}
                    className={`h-1.5 w-1.5 md:h-2 md:w-2 rounded-full transition-all cursor-pointer ${i === page ? "w-3 md:w-4 bg-ink" : "bg-hairline"}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Info section */}
          <div className="flex w-full flex-col border-t border-hairline md:w-72 md:shrink-0 md:border-t-0 md:border-l">
            <div className="flex flex-1 flex-col gap-3 p-4 md:p-5">
              <div className="space-y-1">
                <h3 className="body-sm md:body-md font-bold text-ink leading-snug">{cert.title}</h3>
                <p className="caption text-ink-muted leading-snug">
                  {cert.issuer} <span className="text-hairline">·</span> {cert.year}
                </p>
              </div>
              <p className="caption text-ink-muted leading-relaxed">
                {cert.description}
              </p>
            </div>
            <div className="flex flex-col gap-2 border-t border-hairline p-4 md:p-5">
              <a
                href={cert.files[page]}
                download
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 px-4 py-2 button-cap text-ink-muted hover:text-ink hover:border-ink transition-colors"
              >
                <Download size={12} /> Download
              </a>
              {cert.url && (
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 px-4 py-2 button-cap text-ink-muted hover:text-ink hover:border-ink transition-colors"
                >
                  <ExternalLink size={12} /> View Original
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Achievements() {
  const [showAll, setShowAll] = useState(false);
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const visible = showAll ? certificates : certificates.slice(0, 3);
  const hidden = certificates.length - 3;

  return (
    <section id="achievements" className="bg-canvas py-24 md:py-28">
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
                  transition={{ duration: 0.3, ease: easeOut }}
                  className="rounded-[14px] overflow-hidden shadow-lg shadow-black/30 hover:shadow-xl hover:shadow-black/50 bg-canvas-card h-full flex flex-col transition-shadow duration-300"
                >
                  <CertificatePreview cert={cert} files={cert.files} />
                  <div className="p-5 space-y-2 flex-1">
                    <h3 className="body-base font-semibold text-ink">{cert.title}</h3>
                    <div className="flex items-center gap-2 body-small text-ink-tertiary">
                      <span>{cert.issuer}</span>
                      <span className="text-hairline">·</span>
                      <span>{cert.year}</span>
                    </div>
                  </div>
                  <div className="px-5 pb-5">
                    <button
                      onClick={() => setModalIndex(i)}
                      className="mono-sm text-ink-muted hover:text-ink transition-colors inline-flex items-center gap-1.5 cursor-pointer group"
                    >
                      View Details <Eye size={12} className="transition-transform group-hover:translate-x-0.5" />
                    </button>
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

      <AnimatePresence>
        {modalIndex !== null && (
          <CertificateModal
            cert={certificates[modalIndex]}
            currentIndex={modalIndex}
            total={certificates.length}
            onClose={() => setModalIndex(null)}
            onPrev={() => setModalIndex((i) => i! - 1)}
            onNext={() => setModalIndex((i) => i! + 1)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
