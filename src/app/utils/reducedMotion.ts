"use client";

/**
 * Checks whether the browser/system prefers reduced motion.
 * Safely defaults to false when running on the server.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
