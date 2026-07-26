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
            className="rounded-xl border border-border bg-canvas-card p-4 text-center space-y-1"
            style={{ boxShadow: `0 0 20px ${accent.glow}` }}
          >
            {number !== null ? (
              <div className="display-lg" style={{ color: accent.color }}>
                <NumberTicker value={number} prefix={prefix} duration={0.8} stagger={0.05} />
              </div>
            ) : (
              <div className="display-lg text-foreground">{metric.split(" ")[0]}</div>
            )}
            <p className="body-small text-muted-foreground">{label}</p>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
