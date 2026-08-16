"use client";

import { useTranslations } from "next-intl";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { motion, useReducedMotion } from "motion/react";
import { EASE_OUT } from "@/lib/motion";
import { useTheme } from "./ThemeProvider";
import { ThemeToggle } from "@/components/motion/theme-toggle";
import { Tooltip } from "@/components/motion/tooltip";
import { LanguageToggle } from "./LanguageToggle";
import { useHideOnScroll } from "./use-hide-on-scroll";

export function UtilityPill() {
  const t = useTranslations("common");
  const { theme } = useTheme();
  const reduce = useReducedMotion();
  const visible = useHideOnScroll();

  return (
    <motion.div
      initial={false}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -24 }}
      transition={{ duration: reduce ? 0 : 0.3, ease: EASE_OUT }}
      className="fixed top-6 right-6 z-50 flex items-center gap-1 rounded-full border border-hairline/50 bg-canvas-glass px-3 py-1 shadow-1 backdrop-blur-xl"
    >
      <div className="hidden md:flex items-center gap-1">
        <Tooltip content={t("gitHub")} side="bottom">
          <a
            href="https://github.com/callmezaa"
            target="_blank"
            rel="me noopener noreferrer"
            aria-label={t("gitHub")}
            className="flex size-7 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-surface-hover hover:text-ink"
          >
            <FaGithub size={16} />
          </a>
        </Tooltip>
        <Tooltip content={t("linkedin")} side="bottom">
          <a
            href="https://www.linkedin.com/in/ken-zamariyan-10b140318/"
            target="_blank"
            rel="me noopener noreferrer"
            aria-label={t("linkedin")}
            className="flex size-7 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-surface-hover hover:text-ink"
          >
            <FaLinkedin size={16} />
          </a>
        </Tooltip>
      </div>
      <LanguageToggle />
      <Tooltip content={theme === "dark" ? t("lightMode") : t("darkMode")} side="bottom">
        <ThemeToggle
          variant="rectangle"
          start="bottom-up"
          iconClassName="h-4 w-4"
          className="rounded-full p-1.5"
        />
      </Tooltip>
    </motion.div>
  );
}
