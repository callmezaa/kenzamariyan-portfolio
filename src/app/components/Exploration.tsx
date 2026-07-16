"use client";

import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { easeOut } from "../utils/animations";
import { Button } from "@/components/ui/button";
import { TiltCard } from "@/components/motion/tilt-card";
import { explorations } from "../data/explorations";

export default function Exploration() {
  const [active, setActive] = useState<number | null>(null);
  const open = active !== null;

  const close = useCallback(() => setActive(null), []);
  const prev = useCallback(
    () => setActive((i) => (i === null ? i : (i - 1 + explorations.length) % explorations.length)),
    [],
  );
  const next = useCallback(
    () => setActive((i) => (i === null ? i : (i + 1) % explorations.length)),
    [],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close, prev, next]);

  return (
    <section id="exploration" className="bg-canvas-alt py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: easeOut }}
          className="mb-12 max-w-2xl space-y-3"
        >
          <p className="label text-ink-muted">Exploration</p>
          <h2 className="display-xl text-balance">Things I&rsquo;ve been building</h2>
          <p className="body-base">
            A visual log of interfaces and experiments — screenshots of products
            and prototypes I&rsquo;ve designed and shipped.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {explorations.map((item, i) => (
            <motion.div
              key={item.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, ease: easeOut, delay: i * 0.05 }}
              className="h-full"
            >
              <TiltCard
                max={6}
                glare={true}
                className="h-full rounded-[14px] overflow-hidden shadow-1 hover:shadow-2 transition-shadow duration-300"
              >
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`View ${item.title}`}
                  className="group relative block w-full h-full text-left outline-none focus-visible:ring-2 focus-visible:ring-ink/40 rounded-[14px]"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-canvas">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    {item.tag && (
                      <span className="absolute left-3 top-3 rounded-full bg-canvas/80 px-2.5 py-1 label text-ink backdrop-blur-sm">
                        {item.tag}
                      </span>
                    )}
                    <div className="absolute inset-x-0 bottom-0 translate-y-2 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      <p className="body-base font-semibold text-white">{item.title}</p>
                      <p className="body-small text-white/70">{item.caption}</p>
                    </div>
                  </div>
                </button>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open && active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
            className="fixed inset-0 z-50 flex items-center justify-center bg-canvas/85 p-4 backdrop-blur-sm"
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={explorations[active].title}
              initial={{ opacity: 0, scale: 0.95, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 8 }}
              transition={{ duration: 0.25, ease: easeOut }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex w-full max-w-3xl flex-col overflow-hidden rounded-[20px] border border-hairline bg-canvas-glass shadow-3"
            >
              <div className="flex items-center justify-between border-b border-hairline px-5 py-3">
                <div className="flex items-center gap-2">
                  <Button
                    onClick={prev}
                    variant="ghost"
                    size="icon-sm"
                    className="rounded-full text-ink-muted hover:text-ink"
                    aria-label="Previous"
                  >
                    <span className="text-base leading-none">&larr;</span>
                  </Button>
                  <span className="body-small text-ink-muted">
                    {active + 1} / {explorations.length}
                  </span>
                  <Button
                    onClick={next}
                    variant="ghost"
                    size="icon-sm"
                    className="rounded-full text-ink-muted hover:text-ink"
                    aria-label="Next"
                  >
                    <span className="text-base leading-none">&rarr;</span>
                  </Button>
                </div>
                <Button
                  onClick={close}
                  variant="ghost"
                  size="icon-sm"
                  className="rounded-full text-ink-muted hover:text-ink"
                  aria-label="Close"
                >
                  <X size={16} />
                </Button>
              </div>

              <div className="relative flex items-center justify-center bg-canvas p-4 md:p-6">
                <div className="relative aspect-[4/3] w-full max-h-[70vh]">
                  <Image
                    src={explorations[active].image}
                    alt={explorations[active].title}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 60vw"
                    priority
                  />
                </div>
              </div>

              <div className="space-y-1 border-t border-hairline p-5">
                <div className="flex items-center gap-2">
                  <h3 className="body-base font-semibold text-ink">{explorations[active].title}</h3>
                  {explorations[active].tag && (
                    <span className="rounded-full bg-surface-soft px-2.5 py-0.5 label text-ink-tertiary">
                      {explorations[active].tag}
                    </span>
                  )}
                </div>
                <p className="body-small text-ink-muted">{explorations[active].caption}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
