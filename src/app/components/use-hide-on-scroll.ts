"use client";

import { useEffect, useRef, useState } from "react";

const REVEAL_THRESHOLD = 80;
const DIRECTION_THRESHOLD = 10;

/**
 * Hide on scroll down, reveal on scroll up (or when near the top).
 * Shared by the top bar (logo + utility pill) and the dock.
 */
export function useHideOnScroll() {
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastScrollY.current;

      if (y < REVEAL_THRESHOLD) {
        setVisible(true);
      } else if (delta > DIRECTION_THRESHOLD) {
        setVisible(false);
      } else if (delta < -DIRECTION_THRESHOLD) {
        setVisible(true);
      }

      lastScrollY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return visible;
}
