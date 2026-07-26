"use client";

import { motion } from "motion/react";
import { NumberTicker } from "@/components/motion/number-ticker";
import { staggerContainer, staggerItem } from "@/app/utils/animations";

interface MetricCardsProps {
  metrics: string[];
  accent: { glow: string; color: string };
}

export default function MetricCards({ metrics, accent }: MetricCardsProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-3"
    >
      {metrics.map((metric, i) => {
        const match = metric.match(/^([<>\d.]+)\s*(.*)$/);
        const number = match ? parseFloat(match[1].replace(/[<>]/g, "")) : null;
        const prefix = match && match[1].startsWith("<") ? "< " : undefined;
        const label = match ? match[2] : metric;

        return (
          <motion.div
            key={`${metric}-${i}`}
            variants={staggerItem}
            className="group relative rounded-xl border border-hairline bg-canvas-card overflow-hidden"
          >
            {/* Accent top line */}
            <div
              className="absolute top-0 inset-x-0 h-px"
              style={{ background: `linear-gradient(90deg, transparent, ${accent.color}, transparent)` }}
            />

            <div className="p-4 md:p-5 text-center space-y-2">
              {number !== null ? (
                <div className="font-mono text-2xl md:text-3xl font-semibold tracking-tight" style={{ color: accent.color }}>
                  <NumberTicker value={number} prefix={prefix} duration={0.8} stagger={0.05} />
                </div>
              ) : (
                <div className="font-mono text-2xl md:text-3xl font-semibold tracking-tight text-ink">
                  {metric.split(" ")[0]}
                </div>
              )}
              <p className="text-xs font-medium tracking-wide uppercase text-ink-muted">{label}</p>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
