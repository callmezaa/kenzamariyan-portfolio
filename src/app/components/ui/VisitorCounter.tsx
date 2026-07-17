"use client";

import { useEffect, useState, useRef } from "react";
import { CloudOff } from "lucide-react";
import CountUp from "./CountUp";
import EmptyState from "./EmptyState";
import { Skeleton } from "@/components/ui/skeleton";

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(true);
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
        try {
          const res = await fetch("/api/visitor");
          if (res.ok) {
            const data = await res.json();
            setCount(data.count);
            return;
          }
        } catch {}
        setHasError(true);
      } finally {
        setLoading(false);
      }
    };

    increment();
  }, []);

  if (loading) {
    return (
      <div className="inline-flex items-center gap-2 text-zinc-600">
        <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400/60 opacity-75" aria-hidden="true" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-indigo-400" aria-hidden="true" />
        </span>
        <Skeleton className="h-3 w-20 rounded-full" />
      </div>
    );
  }

  if (hasError || count === null) {
    return (
      <EmptyState
        icon={<CloudOff size={11} />}
        title="— offline"
        description="Visitor count unavailable"
      />
    );
  }

  return (
    <div className="inline-flex items-center gap-2 text-ink-muted" aria-live="polite">
      <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400/60 opacity-75" aria-hidden="true" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-indigo-400" aria-hidden="true" />
      </span>
      <span className="text-[11px] font-medium">
        <CountUp target={count} /> visitors
      </span>
    </div>
  );
}
