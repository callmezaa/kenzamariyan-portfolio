"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { useRef, type ReactNode } from "react";
import { SPRING_HOVER, SPRING_MOUSE } from "@/lib/motion";
import { useHoverCapable } from "@/lib/hooks/use-hover-capable";
import { cn } from "@/lib/utils";

export interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
}

/**
 * Card with a cursor-follow spotlight, smart lift, and (dark mode) border glow.
 * All cursor-follow is disabled on touch devices and reduced motion.
 */
export function SpotlightCard({ children, className }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const canHover = useHoverCapable();
  const enabled = !reduce && canHover;

  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const smx = useSpring(mx, SPRING_MOUSE);
  const smy = useSpring(my, SPRING_MOUSE);
  const glow = useMotionTemplate`radial-gradient(180px circle at ${smx}% ${smy}%, rgba(255,255,255,0.09), transparent 65%)`;
  const borderGlow = useMotionTemplate`radial-gradient(60px circle at ${smx}% ${smy}%, rgba(255,255,255,0.18), transparent 70%)`;

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || !enabled) return;
    const rect = el.getBoundingClientRect();
    mx.set(((e.clientX - rect.left) / rect.width) * 100);
    my.set(((e.clientY - rect.top) / rect.height) * 100);
  };
  const onLeave = () => {
    mx.set(50);
    my.set(50);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={enabled ? { y: -3 } : undefined}
      transition={SPRING_HOVER}
      className={cn("group relative", className)}
    >
      {children}
      {enabled ? (
        <motion.div
          aria-hidden
          style={{ background: glow }}
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      ) : null}
      {enabled ? (
        <motion.div
          aria-hidden
          style={{ background: borderGlow }}
          className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 hidden dark:block"
        />
      ) : null}
    </motion.div>
  );
}
