"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { ExternalLink, ChevronLeft, ChevronRight, X, Download } from "lucide-react";
import Image from "next/image";
import { easeOut } from "@/app/utils/animations";
import { Button } from "@/components/ui/button";

export interface LightboxCertificate {
  title: string;
  issuer: string;
  year: string;
  description: string;
  files: string[];
  url?: string;
}

interface CertificateLightboxProps {
  cert: LightboxCertificate;
  currentIndex: number;
  total: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export function CertificateLightbox({
  cert,
  currentIndex,
  total,
  onClose,
  onPrev,
  onNext,
}: CertificateLightboxProps) {
  const t = useTranslations("achievements");
  const [page, setPage] = useState(0);
  const multi = cert.files.length > 1;
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === total - 1;
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;
    const initial = panel?.querySelector<HTMLElement>(
      'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])',
    );
    initial?.focus();
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "ArrowLeft" && !isFirst) onPrev();
      if (e.key === "ArrowRight" && !isLast) onNext();
      if (e.key === "Tab" && panel) {
        const focusables = panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])',
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
      previouslyFocused?.focus?.();
    };
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
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="certificate-lightbox-title"
        initial={{ opacity: 0, scale: 0.95, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 8 }}
        transition={{ duration: 0.25, ease: easeOut }}
        onClick={(e) => e.stopPropagation()}
        className="flex w-full max-w-3xl flex-col overflow-hidden rounded-[20px] border border-hairline bg-canvas-glass backdrop-blur-xl shadow-3"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-hairline px-4 py-2.5 md:px-5 md:py-3">
          <div className="flex items-center gap-2">
            <Button
              onClick={onPrev}
              disabled={isFirst}
              variant="ghost"
              size="icon-sm"
              className="rounded-full text-ink-muted hover:text-ink disabled:opacity-0 disabled:pointer-events-none"
              aria-label="Previous certificate"
            >
              <ChevronLeft size={16} />
            </Button>
            <span className="body-small text-ink-muted">
              {currentIndex + 1} / {total}
            </span>
            <Button
              onClick={onNext}
              disabled={isLast}
              variant="ghost"
              size="icon-sm"
              className="rounded-full text-ink-muted hover:text-ink disabled:opacity-0 disabled:pointer-events-none"
              aria-label="Next certificate"
            >
              <ChevronRight size={16} />
            </Button>
          </div>
          <Button
            onClick={onClose}
            variant="ghost"
            size="icon-sm"
            className="rounded-full text-ink-muted hover:text-ink"
            aria-label="Close modal"
          >
            <X size={16} />
          </Button>
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
                    className={`h-1.5 w-1.5 md:h-2 md:w-2 rounded-full transition-colors cursor-pointer ${i === page ? "w-3 md:w-4 bg-ink" : "bg-surface-active"}`}
                    aria-label={`Go to page ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Info section */}
          <div className="flex w-full flex-col border-t border-hairline md:w-72 md:shrink-0 md:border-t-0 md:border-l">
            <div className="flex flex-1 flex-col gap-3 p-4 md:p-5">
              <div className="space-y-1">
                <h3 id="certificate-lightbox-title" className="body-small md:body-base font-bold text-ink leading-snug">{cert.title}</h3>
                <p className="body-small text-ink-muted leading-snug">
                  {cert.issuer} <span className="text-hairline">·</span> {cert.year}
                </p>
              </div>
              <p className="body-small text-ink-muted leading-relaxed">
                {cert.description}
              </p>
            </div>
            <div className="flex flex-col gap-2 border-t border-hairline p-4 md:p-5">
              <Button variant="outline" size="lg" className="rounded-full" nativeButton={false} render={<a href={cert.files[page]} download />}>
                <Download size={12} /> {t("download")}
              </Button>
              {cert.url && (
                <Button variant="outline" size="lg" className="rounded-full" nativeButton={false} render={<a href={cert.url} target="_blank" rel="noopener noreferrer" />}>
                  <ExternalLink size={12} /> {t("viewOriginal")}
                </Button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
