"use client";

import { useEffect, useState, useRef } from "react";
import CountUp from "./CountUp";

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const counted = useRef(false);

  useEffect(() => {
    if (counted.current) return;
    counted.current = true;

    const increment = async () => {
      try {
        const res = await fetch("/api/visitor", { method: "POST" });
        if (res.ok) {
          const data = await res.json();
          setCount(data.count);
        }
      } catch {
        const res = await fetch("/api/visitor");
        if (res.ok) {
          const data = await res.json();
          setCount(data.count);
        }
      }
    };

    increment();
  }, []);

  return (
    <div className="inline-flex items-center gap-2 text-zinc-600">
      <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400/60 opacity-75" aria-hidden="true" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-indigo-400" aria-hidden="true" />
      </span>
      <span className="text-[11px] font-medium">
        {count !== null ? (
          <span>
            <CountUp target={count} /> visitors
          </span>
        ) : (
          "— visitors"
        )}
      </span>
    </div>
  );
}
