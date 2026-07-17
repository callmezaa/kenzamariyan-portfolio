"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { easeOut } from "../utils/animations";

const CELL = 12;
const GAP = 3;
const LABEL_W = 32;

const LEVEL_CLASS = [
  "bg-ink/[0.08]",
  "bg-ink/[0.25]",
  "bg-ink/[0.45]",
  "bg-ink/[0.65]",
  "bg-ink",
];

const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

interface DayData {
  date: string;
  count: number;
  level: number;
}

interface WeekData {
  days: DayData[];
}

export default function GitHubSection() {
  const [data, setData] = useState<{ total: number; weeks: WeekData[] } | null>(null);
  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number } | null>(null);
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/github-contributions")
      .then((r) => r.json())
      .then((d) => {
        setData(d);
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  const monthLabels: { label: string; x: number }[] = [];
  if (data?.weeks) {
    let prevMonth = -1;
    data.weeks.forEach((w, wi) => {
      if (w.days.length === 0) return;
      const month = new Date(w.days[0].date).getMonth();
      if (month !== prevMonth) {
        monthLabels.push({ label: MONTHS[month], x: wi * (CELL + GAP) });
        prevMonth = month;
      }
    });
  }

  return (
    <div ref={ref} className="relative">
      {loaded && data ? (
        <div className="overflow-x-auto hide-scrollbar pb-2">
          <svg width={LABEL_W + data.weeks.length * (CELL + GAP) + 4} height={7 * (CELL + GAP) + 20 + 24}>
            {monthLabels.map((m) => (
              <text
                key={`${m.label}-${m.x}`}
                x={LABEL_W + m.x}
                y={12}
                className="fill-ink-tertiary text-[10px]"
                fontFamily="var(--font-mono)"
              >
                {m.label}
              </text>
            ))}

            {DAY_LABELS.map((label, di) => (
              label ? (
                <text
                  key={label}
                  x={0}
                  y={20 + di * (CELL + GAP) + CELL - 1}
                  className="fill-ink-tertiary text-[10px]"
                  fontFamily="var(--font-mono)"
                >
                  {label}
                </text>
              ) : null
            ))}

            {data.weeks.map((w, wi) =>
              w.days.map((d, di) => (
                <motion.rect
                  key={`${wi}-${di}`}
                  x={LABEL_W + wi * (CELL + GAP)}
                  y={20 + di * (CELL + GAP)}
                  width={CELL}
                  height={CELL}
                  rx={3}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.3,
                    ease: easeOut,
                    delay: (wi * 7 + di) * 0.002,
                  }}
                  className={LEVEL_CLASS[d.level]}
                  onMouseEnter={(e) => {
                    const rect = (e.target as SVGElement).getBoundingClientRect();
                    setTooltip({
                      text: `${d.count} contribution${d.count !== 1 ? "s" : ""} on ${new Date(d.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`,
                      x: rect.left + rect.width / 2,
                      y: rect.top - 8,
                    });
                  }}
                  onMouseLeave={() => setTooltip(null)}
                />
              ))
            )}
          </svg>

          {tooltip && (
            <div
              className="fixed z-50 pointer-events-none px-2.5 py-1.5 rounded-md bg-ink text-canvas text-[11px] font-mono whitespace-nowrap shadow-2"
              style={{ left: tooltip.x, top: tooltip.y, transform: "translate(-50%, -100%)" }}
            >
              {tooltip.text}
            </div>
          )}
        </div>
      ) : loaded ? (
        <div className="flex items-center justify-center h-[140px]">
          <p className="body-small text-ink-tertiary">No contribution data available.</p>
        </div>
      ) : (
        <div className="flex items-center justify-center h-[140px]">
          <div className="flex gap-1">
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 rounded-sm bg-ink/[0.08] animate-pulse"
                style={{ animationDelay: `${i * 0.05}s` }}
              />
            ))}
          </div>
        </div>
      )}

      {data && (
        <p className="body-small text-ink-muted mt-4">
          <strong className="font-semibold text-ink tabular-nums">{data.total.toLocaleString()}</strong> contributions in the last year
        </p>
      )}
    </div>
  );
}
