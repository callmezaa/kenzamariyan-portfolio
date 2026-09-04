"use client";

import Image from "next/image";
import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTranslations } from "next-intl";import { ExternalLink, ChevronLeft, ChevronRight, Eye, ArrowRight } from "lucide-react";
import { easeOut } from "../utils/animations";
import {
  CERTIFICATE_KEYS,
  certificatesMeta,
  type CertificateKind,
} from "@/app/data/certificates";
import { Reveal } from "@/components/motion/reveal/Reveal";
import { SpotlightCard } from "@/components/motion/hover/SpotlightCard";
import { ArrowSlide } from "@/components/motion/hover/ArrowSlide";
import { Button } from "@/components/ui/button";
import { TransitionLink } from "@/components/motion/transition/TransitionLink";
import { CertificateLightbox } from "./ui/CertificateLightbox";

function CertificatePreview({ cert, files }: { cert: { title: string }; files: string[] }) {
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
          <Button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            variant="ghost"
            size="icon-sm"
            className="absolute left-1 top-1/2 -translate-y-1/2 z-10 rounded-full bg-canvas/50 text-ink-muted md:opacity-0 md:group-hover:opacity-100 disabled:opacity-0 disabled:pointer-events-none"
          >
            <ChevronLeft size={14} />
          </Button>
          <Button
            onClick={() => setPage((p) => Math.min(files.length - 1, p + 1))}
            disabled={page === files.length - 1}
            variant="ghost"
            size="icon-sm"
            className="absolute right-1 top-1/2 -translate-y-1/2 z-10 rounded-full bg-canvas/50 text-ink-muted md:opacity-0 md:group-hover:opacity-100 disabled:opacity-0 disabled:pointer-events-none"
          >
            <ChevronRight size={14} />
          </Button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 md:gap-1.5 z-10 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
            {files.map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`w-2 h-2 md:w-1.5 md:h-1.5 rounded-full transition-colors cursor-pointer ${i === page ? "bg-ink w-4 md:w-3" : "bg-hairline"}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function Achievements() {
  const t = useTranslations("achievements");
  const ct = useTranslations("certificates");
  const [modalIndex, setModalIndex] = useState<number | null>(null);

  const certs = useMemo(() => CERTIFICATE_KEYS.map((key) => ({
    ...certificatesMeta[key],
    key,
    title: ct(`${key}.title`),
    description: ct(`${key}.description`),
  })), [ct]);

  const visible = certs.slice(0, 3);

  const handleModalClose = useCallback(() => setModalIndex(null), []);
  const handleModalPrev = useCallback(
    () => setModalIndex((i) => (i ?? 0) - 1),
    [],
  );
  const handleModalNext = useCallback(
    () => setModalIndex((i) => (i ?? 0) + 1),
    [],
  );

  return (
    <section id="achievements" className="bg-canvas py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <div className="panel-3d rounded-[20px] bg-canvas-glass backdrop-blur-xl p-6 md:p-10">
        <Reveal variant="mask" className="mb-10 md:mb-12 max-w-2xl space-y-3">
          <p className="label text-ink-muted">{t("label")}</p>
          <h2 className="display-xl text-balance">{t("heading")}</h2>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((cert, i) => (
            <Reveal key={cert.title} variant="rise" delay={i * 0.03} className="h-full">
              <SpotlightCard className="rounded-[14px] overflow-hidden shadow-1 hover:shadow-2 bg-canvas-card h-full flex flex-col transition-shadow duration-300">
                <CertificatePreview cert={cert} files={cert.files} />
                <div className="p-5 space-y-2 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="body-base font-semibold text-ink">{cert.title}</h3>
                    {cert.url && (
                      <span className="shrink-0 inline-flex items-center gap-1 rounded-full bg-surface-soft px-2 py-0.5 mono-sm text-ink-tertiary">
                        <ExternalLink size={10} /> {t("verifiable")}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 body-small text-ink-muted">
                    <span>{cert.issuer}</span>
                    <span className="text-hairline">·</span>
                    <span>{cert.year}</span>
                  </div>
                </div>
                <div className="px-5 pb-5">
                  <Button
                    onClick={() => setModalIndex(i)}
                    variant="ghost"
                    size="sm"
                    className="text-ink-muted"
                  >
                    <ArrowSlide icon={<Eye size={12} />}>{t("viewDetails")}</ArrowSlide>
                  </Button>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 flex justify-center">
          <TransitionLink href="/achievements">
            <Button variant="outline" size="lg" className="btn-3d-outline rounded-full">
              {t("moreLink")} <ArrowRight data-icon="inline-end" />
            </Button>
          </TransitionLink>
        </Reveal>
        </div>
      </div>

      <AnimatePresence>
        {modalIndex !== null && (
          <CertificateLightbox
            key={modalIndex}
            cert={certs[modalIndex]}
            currentIndex={modalIndex}
            total={certs.length}
            onClose={handleModalClose}
            onPrev={handleModalPrev}
            onNext={handleModalNext}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

export type { CertificateKind };
