"use client";

import { useEffect } from "react";
import { useReducedMotion } from "motion/react";
import { SECTION_IDS } from "@/lib/sections";

export function useKeyboardNavigation() {
  const reduced = useReducedMotion();

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) return;

      // Digit N jumps to the Nth section in page order. Only claim the key
      // when the section actually exists on the current page — otherwise
      // plain number typing (e.g. on /projects/[slug]) must pass through.
      if (!/^[1-9]$/.test(e.key)) return;
      const el = document.getElementById(SECTION_IDS[Number(e.key) - 1]);
      if (!el) return;

      e.preventDefault();
      el.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [reduced]);
}
