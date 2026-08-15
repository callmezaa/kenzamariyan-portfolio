import type { Variants } from "motion/react";

export type RevealVariant = "fade" | "rise" | "mask" | "scale";

/** Per-variant hidden/visible states. Reduced motion handled by Reveal.tsx. */
export const revealVariants: Record<RevealVariant, Variants> = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  rise: {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  },
  mask: {
    hidden: { clipPath: "inset(0 0 100% 0)" },
    visible: { clipPath: "inset(0 0 0% 0)" },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.96 },
    visible: { opacity: 1, scale: 1 },
  },
};
