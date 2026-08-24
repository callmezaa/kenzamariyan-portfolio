"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { appleSpring } from "@/app/utils/animations";

interface EraRailProps {
  eras: { id: string; year: string; title: string }[];
}

export function EraRail({ eras }: EraRailProps) {
  const [activeId, setActiveId] = useState(eras[0]?.id);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    for (const era of eras) {
      const el = document.getElementById(era.id);
      if (!el) continue;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(era.id);
        },
        { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    }
    return () => observers.forEach((o) => o.disconnect());
  }, [eras]);

  return (
    <nav aria-label="Eras" className="sticky top-32 hidden lg:flex flex-col gap-1">
      {eras.map((era) => {
        const isActive = activeId === era.id;
        return (
          <button
            key={era.id}
            type="button"
            onClick={() =>
              document
                .getElementById(era.id)
                ?.scrollIntoView({ behavior: "smooth", block: "center" })
            }
            aria-current={isActive ? "true" : undefined}
            className="group flex items-center gap-3 py-2 text-left outline-none focus-visible:ring-2 focus-visible:ring-ink/40 rounded-md"
          >
            <motion.span
              animate={{ scale: isActive ? 1 : 0.6 }}
              transition={appleSpring}
              className={`h-2.5 w-2.5 shrink-0 rounded-full border transition-colors ${
                isActive ? "bg-ink border-ink" : "bg-transparent border-ink-muted/40 group-hover:border-ink-muted"
              }`}
            />
            <span className="flex flex-col leading-tight">
              <span
                className={`mono-sm tabular-nums transition-colors ${
                  isActive ? "text-ink" : "text-ink-tertiary group-hover:text-ink-muted"
                }`}
              >
                {era.year}
              </span>
              <span
                className={`label transition-all duration-200 line-clamp-1 max-w-36 ${
                  isActive ? "text-ink-muted" : "text-ink-tertiary/70"
                }`}
              >
                {era.title}
              </span>
            </span>
          </button>
        );
      })}
    </nav>
  );
}
