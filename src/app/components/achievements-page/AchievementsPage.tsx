"use client";

import { useState, useMemo, useCallback } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, ExternalLink, Eye } from "lucide-react";
import Image from "next/image";
import {
  CERTIFICATE_KEYS,
  certificatesMeta,
  type CertificateKind,
} from "@/app/data/certificates";
import { AnimatedNumber } from "@/components/motion/animated-number";
import { Reveal } from "@/components/motion/reveal/Reveal";
import { SpotlightCard } from "@/components/motion/hover/SpotlightCard";
import { TransitionLink } from "@/components/motion/transition/TransitionLink";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/app/components/page-hero/PageHero";
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
      <PageHero
        variant="grid"
        compact
        centered
        kicker={t("kicker")}
        lines={[t("line1"), t("line2")]}
        tagline={t("tagline")}
      />

      <div className="mx-auto max-w-6xl px-6 md:px-8 pb-28 pt-12 md:pt-16 space-y-16 md:space-y-20">

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

        {/* CTA — premium ambient chrome */}
        <Reveal variant="rise">
          <div className="relative overflow-hidden rounded-[32px] border border-white/[0.08] shadow-[0_20px_80px_-20px_rgba(0,0,0,0.6),0_8px_32px_rgba(0,0,0,0.4)] isolate">
            <Image
              src="/ambient_bg.jpg"
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 1152px"
              className="object-cover object-center"
              priority={false}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/5"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-60"
              style={{
                background:
                  "radial-gradient(ellipse 90% 70% at 50% 100%, rgba(255,255,255,0.06), transparent 60%)",
              }}
            />
            <div className="relative flex flex-col items-center gap-5 px-8 py-16 text-center md:px-16 md:py-20">
              <p className="body-lg max-w-md text-balance text-white [text-wrap:balance]">
                {t("ctaText")}
              </p>
              <div className="flex justify-center pt-3">
                <TransitionLink href="/projects">
                  <Button
                    size="lg"
                    className="rounded-full bg-white px-8 text-sm font-medium tracking-wide text-black shadow-[0_8px_24px_rgba(0,0,0,0.3)] transition-all hover:bg-zinc-100 hover:shadow-[0_12px_32px_rgba(0,0,0,0.4)]"
                  >
                    {t("ctaButton")} <ArrowRight size={14} data-icon="inline-end" />
                  </Button>
                </TransitionLink>
              </div>
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
