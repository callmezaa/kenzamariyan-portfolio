"use client";

import { useEffect } from "react";
import { useReducedMotion } from "framer-motion";

const sections = ["home", "about", "skills", "projects", "experience", "achievements", "playground", "contact"];

export function useKeyboardNavigation() {
  const reduced = useReducedMotion();

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) return;

      const num = Number(e.key);
      if (num >= 1 && num <= sections.length) {
        e.preventDefault();
        const el = document.getElementById(sections[num - 1]);
        el?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [reduced]);
}
