"use client";

import { useState, useMemo, useCallback } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight, ExternalLink, Eye } from "lucide-react";
import Image from "next/image";
import {
  CERTIFICATE_KEYS,
  certificatesMeta,
  type CertificateKind,
} from "@/app/data/certificates";
import { AnimatedNumber } from "@/components/motion/animated-number";
import { TextReveal } from "@/components/motion/text-reveal";
import { Reveal } from "@/components/motion/reveal/Reveal";
import { SpotlightCard } from "@/components/motion/hover/SpotlightCard";
import { TransitionLink } from "@/components/motion/transition/TransitionLink";
import { Button } from "@/components/ui/button";
import { CertificateLightbox } from "../ui/CertificateLightbox";

type Filter = "all" | CertificateKind;

export default function AchievementsPage() {
  const t = useTranslations("achievementsPage");
  const at = useTranslations("achievements");
  const ct = useTranslations("certificates");

  const certs = useMemo(() => CERTIFICATE_KEYS.map((key) => ({
    key,
    title: ct(`${key}.title`),
    description: ct(`${key}.description`),
    ...certificatesMeta[key],
  })), [ct]);

  const [filter, setFilter] = useState<Filter>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filters: { id: Filter; label: string; count: number }[] = [
    { id: "all", label: t("filterAll"), count: certs.length },
    {
      id: "certification",
      label: t("filterCertification"),
      count: certs.filter((c) => c.kind === "certification").length,
    },
    {
      id: "competition",
      label: t("filterCompetition"),
      count: certs.filter((c) => c.kind === "competition").length,
    },
    {
      id: "course",
      label: t("filterCourse"),
      count: certs.filter((c) => c.kind === "course").length,
    },
  ];

  const filtered = useMemo(
    () => (filter === "all" ? certs : certs.filter((c) => c.kind === filter)),
    [certs, filter]
  );

  const issuerCount = useMemo(
    () => new Set(certs.map((c) => c.issuer)).size,
    [certs]
  );
  const verifiableCount = useMemo(
    () => certs.filter((c) => c.url).length,
    [certs]
  );

  const stats = [
    { value: certs.length, label: t("statsCredentials") },
    { value: issuerCount, label: t("statsIssuers") },
    { value: verifiableCount, label: t("statsVerifiable") },
  ];

  const handleClose = useCallback(() => setLightboxIndex(null), []);
  const handlePrev = useCallback(() => setLightboxIndex((i) => (i ?? 0) - 1), []);
  const handleNext = useCallback(() => setLightboxIndex((i) => (i ?? 0) + 1), []);

  const kindLabel = (kind: CertificateKind) =>
    kind === "certification"
      ? t("filterCertification")
      : kind === "competition"
        ? t("filterCompetition")
        : t("filterCourse");

  return (
    <main id="main-content" className="min-h-dvh">
      <div className="mx-auto max-w-5xl px-6 pb-28 pt-32 md:px-8 md:pt-40 space-y-16 md:space-y-20">
        <TransitionLink
          href="/"
          className="inline-flex items-center gap-2 label text-muted-foreground hover:text-foreground transition-colors mb-2"
        >
          <ArrowLeft size={14} />
          {t("backHome")}
        </TransitionLink>

        {/* Hero */}
        <header className="space-y-6">
          <p className="label text-ink-muted">{t("kicker")}</p>
          <h1 className="display-xl text-balance">
            <TextReveal text={[t("line1"), t("line2")]} as="span" stagger={0.08} />
          </h1>
          <p className="body-lg text-ink-muted max-w-prose">{t("tagline")}</p>
        </header>

        {/* Stats */}
        <Reveal variant="rise">
          <div className="grid grid-cols-3 gap-px overflow-hidden rounded-[20px] bg-hairline shadow-1">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-1 bg-canvas-card px-4 py-7 text-center"
              >
                <span className="display-lg font-semibold text-ink tabular-nums">
                  <AnimatedNumber value={stat.value} duration={1} />
                </span>
                <span className="body-small text-ink-muted text-balance">{stat.label}</span>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2" role="group" aria-label={t("kicker")}>
          {filters.map((f) => (
            <Button
              key={f.id}
              onClick={() => setFilter(f.id)}
              variant={filter === f.id ? "secondary" : "ghost"}
              size="sm"
              aria-pressed={filter === f.id}
              className="rounded-full"
            >
              {f.label}
              <span className="ml-1.5 mono-sm text-ink-tertiary tabular-nums">{f.count}</span>
            </Button>
          ))}
        </div>

        {/* Gallery */}
        <motion.div layout className="grid gap-5 sm:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((cert, i) => (
              <motion.div
                key={cert.key}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                <SpotlightCard className="flex h-full flex-col overflow-hidden rounded-[20px] shadow-1 hover:shadow-2 bg-canvas-card transition-shadow duration-300">
                  <button
                    type="button"
                    onClick={() => setLightboxIndex(i)}
                    className="relative block w-full aspect-[16/10] overflow-hidden bg-canvas outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ink/40"
                    aria-label={`${cert.title} — ${at("viewDetails")}`}
                  >
                    <Image
                      src={cert.files[0]}
                      alt={cert.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 480px"
                      className="object-cover transition-transform duration-500 hover:scale-[1.03]"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-canvas/80 px-2.5 py-1 label text-ink backdrop-blur-sm">
                      {kindLabel(cert.kind)}
                    </span>
                  </button>
                  <div className="flex flex-1 flex-col gap-2 p-6">
                    <div className="flex items-start justify-between gap-2">
                      <h2 className="body-base font-semibold text-ink leading-snug">{cert.title}</h2>
                      {cert.url && (
                        <span className="shrink-0 inline-flex items-center gap-1 rounded-full bg-surface-soft px-2 py-0.5 mono-sm text-ink-tertiary">
                          <ExternalLink size={10} /> {at("verifiable")}
                        </span>
                      )}
                    </div>
                    <p className="label text-ink-muted">
                      {cert.issuer} · <span className="tabular-nums">{cert.year}</span>
                    </p>
                    <p className="body-small text-ink-muted leading-relaxed line-clamp-3">
                      {cert.description}
                    </p>
                    <div className="mt-auto pt-3">
                      <Button
                        onClick={() => setLightboxIndex(i)}
                        variant="ghost"
                        size="sm"
                        className="text-ink-muted"
                      >
                        <Eye size={12} data-icon="inline-start" /> {at("viewDetails")}
                      </Button>
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA */}
        <Reveal variant="rise">
          <div className="relative overflow-hidden rounded-[20px] bg-hairline shadow-1 p-8 text-center md:p-12 space-y-4">
            <p className="body-lg text-ink max-w-md mx-auto text-balance">{t("ctaText")}</p>
            <div className="flex justify-center pt-2">
              <TransitionLink href="/projects">
                <Button size="lg" className="btn-3d rounded-full">
                  {t("ctaButton")} <ArrowRight data-icon="inline-end" />
                </Button>
              </TransitionLink>
            </div>
          </div>
        </Reveal>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && filtered[lightboxIndex] && (
          <CertificateLightbox
            key={filtered[lightboxIndex].key}
            cert={filtered[lightboxIndex]}
            currentIndex={lightboxIndex}
            total={filtered.length}
            onClose={handleClose}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
