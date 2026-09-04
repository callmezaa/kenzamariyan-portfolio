"use client";

import Image from "next/image";
import { Reveal } from "@/components/motion/reveal/Reveal";
import type { Project } from "../../data/projects";

type Feature = NonNullable<Project["features"]>[number];

export function FeatureZigzag({ features }: { features: Feature[] }) {
  return (
    <div className="space-y-12 md:space-y-16">
      {features.map((feature, i) => {
        const flipped = i % 2 === 1;
        return (
          <div
            key={feature.title}
            className="grid items-center gap-6 md:grid-cols-2 md:gap-10"
          >
            <Reveal
              variant="rise"
              className={flipped ? "md:order-2" : undefined}
            >
              <div className="group overflow-hidden rounded-[14px] border border-border bg-canvas-card">
                <Image
                  src={feature.screenshot}
                  alt={feature.screenshotLabel}
                  width={880}
                  height={550}
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 560px"
                  className="block h-auto w-full transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                />
              </div>
            </Reveal>
            <Reveal
              variant="rise"
              delay={0.08}
              className={flipped ? "md:order-1" : undefined}
            >
              <div className="space-y-2">
                <p className="mono-sm tabular-nums text-ink-tertiary">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="text-balance text-xl font-semibold tracking-[-0.01em] text-foreground md:text-2xl">
                  {feature.title}
                </h3>
                <p className="body-base leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </Reveal>
          </div>
        );
      })}
    </div>
  );
}
