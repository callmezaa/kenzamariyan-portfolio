"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { EASE_OUT } from "@/lib/motion";
import { useTheme } from "./ThemeProvider";
import { useHideOnScroll } from "./use-hide-on-scroll";

export function FloatingLogo() {
  const reduce = useReducedMotion();
  const { theme } = useTheme();
  const visible = useHideOnScroll();

  return (
    <motion.a
      href="#home"
      initial={reduce ? false : { opacity: 0, y: -8 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -24 }}
      transition={{ duration: reduce ? 0 : 0.3, ease: EASE_OUT }}
      className="fixed top-6 left-6 z-50 flex items-center gap-2.5"
    >
      <Image
        src={theme === "dark" ? "/image/brand/logo-white.svg" : "/image/brand/logo-black.svg"}
        alt="Ken Zamariyan"
        width={30}
        height={30}
        className="shrink-0 rounded-md"
        priority
      />
      <span className="text-sm font-medium text-ink">
        Hola, I&apos;m <span className="text-ink-muted">ken!</span>
      </span>
    </motion.a>
  );
}
