"use client";

import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";
import { TextReveal } from "@/components/motion/text-reveal";
import { Reveal } from "@/components/motion/reveal/Reveal";
import { TransitionLink } from "@/components/motion/transition/TransitionLink";

type BackdropVariant = "glow" | "grid";

interface PageHeroProps {
  /** `glow`: dark stage with purple/blue corner light. `grid`: hairline
   *  grid + monochrome ambient blobs, matching the home hero. */
  variant?: BackdropVariant;
  kicker: string;
  lines: string[];
  tagline?: string;
  backHref?: string;
  backLabel?: string;
  compact?: boolean;
  centered?: boolean;
  children?: ReactNode;
}

/**
 * Shared hero shell for full pages. Two backdrop variants:
 * - `grid` follows the theme like the home landing hero.
 * - `glow` is a permanent dark stage; its copy is pinned to light tones.
 */
export function PageHero({
  variant = "glow",
  kicker,
  lines,
  tagline,
  backHref = "/",
  backLabel,
  compact = false,
  centered = false,
  children,
}: PageHeroProps) {
  const isGlow = variant === "glow";

  return (
    <header className="relative overflow-hidden">
      {/* Backdrop */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        {isGlow ? (
          <>
            <div className="absolute inset-0 bg-[#08080a]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_58%_62%_at_15%_-12%,rgba(118,89,235,0.34),transparent_66%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_52%_58%_at_85%_-10%,rgba(56,128,246,0.30),transparent_66%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_48%_at_50%_-6%,rgba(140,122,248,0.17),transparent_62%)]" />
          </>
        ) : (
          <>
            <div className="hero-grid-bg" />
            <div
              className="mesh-blob"
              style={{ width: 560, height: 560, top: "-10%", right: "-6%", background: "var(--ambient)" }}
            />
            <div
              className="mesh-blob"
              style={{ width: 420, height: 420, top: "22%", left: "-8%", background: "var(--ambient-strong)" }}
            />
          </>
        )}
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-b from-transparent to-canvas" />
      </div>

      {/* Content */}
      <div
        className={`relative mx-auto max-w-5xl w-full px-4 sm:px-6 md:px-8 ${
          compact ? "pt-20 pb-8 sm:pt-24 sm:pb-10 md:pt-32 md:pb-12 space-y-4" : "pt-28 pb-10 sm:pt-32 sm:pb-14 md:pt-40 md:pb-20 space-y-6"
        } ${centered ? "text-center items-center flex flex-col" : ""}`}
      >
        {backLabel && (
          <TransitionLink
            href={backHref}
            className={`inline-flex items-center gap-2 label transition-colors mb-2 ${
              isGlow ? "text-zinc-500 hover:text-zinc-200" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <ArrowLeft size={14} />
            {backLabel}
          </TransitionLink>
        )}
        <p className={`label ${isGlow ? "text-zinc-500" : "text-ink-muted"} ${centered ? "mx-auto" : ""}`}>{kicker}</p>
        <h1
          className={`display-xl text-balance ${centered ? "mx-auto" : ""}`}
          style={isGlow ? { color: "#fafafa" } : undefined}
        >
          <TextReveal text={lines} as="span" stagger={0.08} />
        </h1>
        {tagline && (
          <Reveal variant="fade" delay={0.15} className={`min-w-0 ${centered ? "mx-auto flex w-full max-w-prose justify-center" : ""}`}>
            <p className={`body-lg max-w-prose break-words ${isGlow ? "text-zinc-400" : "text-ink-muted"} ${centered ? "mx-auto text-center text-pretty" : ""}`}>
              {tagline}
            </p>
          </Reveal>
        )}
        {children && <div className={centered ? "flex justify-center w-full" : ""}>{children}</div>}
      </div>
    </header>
  );
}
