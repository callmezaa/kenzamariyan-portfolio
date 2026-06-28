"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
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
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out coordinate tracking
  const springX = useSpring(mouseX, { stiffness: 350, damping: 40 });
  const springY = useSpring(mouseY, { stiffness: 350, damping: 40 });

  const xPx = useTransform(springX, (val) => `${val}px`);
  const yPx = useTransform(springY, (val) => `${val}px`);

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    const { currentTarget, clientX, clientY } = event;
    const { left, top } = currentTarget.getBoundingClientRect();
    
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className={`group relative overflow-hidden rounded-md border border-white/10 bg-canvas-card transition-colors duration-300 hover:border-white/20 ${className}`}
    >
      {/* Background Radial Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{
          background: `radial-gradient(${radialSize}px circle at var(--x) var(--y), ${glowColor}, transparent 80%)`,
          "--x": xPx,
          "--y": yPx,
        }}
      />
      
      {/* Light border glow accent */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{
          background: `radial-gradient(${radialSize / 1.5}px circle at var(--x) var(--y), rgba(255, 255, 255, 0.08), transparent 80%)`,
          "--x": xPx,
          "--y": yPx,
        }}
      />

      {/* Content wrapper */}
      <div className="relative z-20 h-full w-full">
        {children}
      </div>
    </div>
  );
}
