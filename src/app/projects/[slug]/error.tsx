"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "motion/react";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { SPRING_PRESS } from "@/lib/ease";
import { useHoverCapable } from "@/lib/hooks/use-hover-capable";
import { NotFoundStage } from "@/components/motion/not-found/shared";

export default function ProjectError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("error");
  const reduce = useReducedMotion();
  const canHover = useHoverCapable();
  const whileTap = reduce ? undefined : { scale: 0.96 };
  const whileHover = reduce || !canHover ? undefined : { scale: 1.02 };

  useEffect(() => {
    // Surface the failure for observability tooling without crashing the tree.
    console.error("[project page] render error");
  }, []);

  return (
    <main id="main-content" className="min-h-dvh bg-canvas pt-28 md:pt-36">
      <div className="mx-auto max-w-4xl px-6 md:px-8 pb-24">
        <NotFoundStage className="min-h-[60dvh]">
          <p
            aria-hidden
            className="font-mono font-bold leading-none tracking-tighter text-muted-foreground/40 [font-size:clamp(5rem,18vw,11rem)] tabular-nums"
          >
            500
          </p>

          <div className="flex flex-col items-center gap-2">
            <p className="text-lg font-semibold text-foreground">{t("title")}</p>
            <p className="max-w-sm text-sm text-muted-foreground">
              {t("description")}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <motion.button
              onClick={reset}
              whileTap={whileTap}
              whileHover={whileHover}
              transition={SPRING_PRESS}
              className="inline-flex h-11 select-none items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 cursor-pointer"
            >
              <RotateCcw size={16} />
              {t("retry")}
            </motion.button>
            <motion.a
              href="/#projects"
              whileTap={whileTap}
              whileHover={whileHover}
              transition={SPRING_PRESS}
              className="inline-flex h-11 select-none items-center justify-center gap-2 rounded-full border border-border bg-card px-6 text-sm font-medium text-foreground transition-colors hover:bg-primary/5"
            >
              <ArrowLeft size={16} />
              {t("backToProjects")}
            </motion.a>
          </div>
        </NotFoundStage>
      </div>
    </main>
  );
}
