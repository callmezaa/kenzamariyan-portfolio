"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { type ReactNode } from "react";
import { SPRING_HOVER } from "@/lib/motion";
import { cn } from "@/lib/utils";

export interface ArrowSlideProps {
  children: ReactNode;
  className?: string;
  /** Override the default trailing arrow icon. */
  icon?: ReactNode;
}

/** Renders children with a trailing arrow that slides forward on hover. */
export function ArrowSlide({ children, className, icon }: ArrowSlideProps) {
  const reduce = useReducedMotion();
  return (
    <span className={cn("group inline-flex items-center gap-1.5", className)}>
      <span>{children}</span>
      <motion.span
        whileHover={reduce ? undefined : { x: 4 }}
        transition={SPRING_HOVER}
        className="inline-flex"
      >
        {icon ?? <ArrowRight size={14} />}
      </motion.span>
    </span>
  );
}
