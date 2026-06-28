"use client";

import { useEffect, useState, useRef } from "react";
import { useReducedMotion } from "framer-motion";

interface CountUpProps {
  target: number;
  prefix?: string;
  suffix?: string;
  delay?: number;
  duration?: number;
}

export default function CountUp({
  target,
  prefix = "",
  suffix = "",
  delay = 0,
  duration = 700,
}: CountUpProps) {
  const reduced = useReducedMotion();
  const [count, setCount] = useState(reduced ? target : 0);
  const [started, setStarted] = useState(reduced);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setStarted(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, reduced]);

  useEffect(() => {
    if (!started) return;
    const startTime = Date.now();
    let raf: number;
    function tick() {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    }
    tick();
    return () => cancelAnimationFrame(raf);
  }, [started, target, duration]);

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  );
}
