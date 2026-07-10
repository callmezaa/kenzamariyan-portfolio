"use client";

import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { MouseEvent, ReactNode } from "react";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  radialSize?: number;
}

export default function GlowCard({
  children,
  className = "",
  glowColor = "rgba(99, 102, 241, 0.12)", // Default Indigo glow
  radialSize = 300,
}: GlowCardProps) {
  const reduced = useReducedMotion();

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springX = useSpring(mouseX, { stiffness: 350, damping: 40 });
  const springY = useSpring(mouseY, { stiffness: 350, damping: 40 });

  const xPct = useTransform(springX, (val) => `${val * 100}%`);
  const yPct = useTransform(springY, (val) => `${val * 100}%`);

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    if (reduced) return;
    const { currentTarget, clientX, clientY } = event;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();

    mouseX.set((clientX - left) / width);
    mouseY.set((clientY - top) / height);
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className={`group relative overflow-hidden rounded-md border border-white/10 bg-canvas-card transition-all duration-300 hover:-translate-y-1 hover:border-white/20 ${className}`}
    >
      {/* Background Radial Glow */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{
          background: `radial-gradient(${radialSize}px circle at var(--gx) var(--gy), ${glowColor}, transparent 80%)`,
          "--gx": xPct,
          "--gy": yPct,
        }}
      />

      {/* Light border glow accent */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{
          background: `radial-gradient(${radialSize / 1.5}px circle at var(--gx) var(--gy), rgba(255, 255, 255, 0.08), transparent 80%)`,
          "--gx": xPct,
          "--gy": yPct,
        }}
      />

      {/* Content wrapper */}
      <div className="relative z-20 h-full w-full">
        {children}
      </div>
    </div>
  );
}
