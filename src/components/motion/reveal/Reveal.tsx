"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { type ReactNode } from "react";
import { EASE_OUT, DURATION_MED, DURATION_SLOW } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { revealVariants, type RevealVariant } from "./variants";

export interface RevealProps {
  children: ReactNode;
  variant?: RevealVariant;
  /** Delay in seconds before the reveal starts. */
  delay?: number;
  /** Animation duration in seconds. mask defaults to DURATION_SLOW (0.6). */
  duration?: number;
  /** Portion of the element that must be visible to trigger. */
  amount?: number;
  className?: string;
}

export function Reveal({
  children,
  variant = "rise",
  delay = 0,
  duration,
  amount = 0.3,
  className,
}: RevealProps) {
  const reduce = useReducedMotion();
  const v = reduce
    ? ({ hidden: { opacity: 0 }, visible: { opacity: 1 } } as Variants)
    : revealVariants[variant];

  return (
    <motion.div
      variants={v}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      transition={{ duration: duration ?? (variant === "mask" ? DURATION_SLOW : DURATION_MED), ease: EASE_OUT, delay }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
