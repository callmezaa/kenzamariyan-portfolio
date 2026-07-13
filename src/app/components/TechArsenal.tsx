"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { techArsenal, categories, type TechItem, type Category } from "../data/techArsenal";
import { easeOut } from "../utils/animations";

export default function TechArsenal() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkTheme = () =>
      setIsDark(document.documentElement.getAttribute("data-theme") !== "light");
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  const filtered = useMemo(
    () =>
      activeCategory === "All"
        ? techArsenal
        : techArsenal.filter((t) => t.category === activeCategory),
    [activeCategory],
  );

  const handleCategoryChange = useCallback((cat: Category) => {
    setActiveCategory(cat);
    setExpanded(null);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`rounded-sm border px-4 py-1.5 text-sm transition-colors duration-200 ${
              activeCategory === cat
                ? "border-ink text-ink"
                : "border-hairline text-ink-muted hover:border-ink/50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((tech, i) => (
            <TechCard
              key={tech.name}
              tech={tech}
              index={i}
              isExpanded={expanded === tech.name}
              isDark={isDark}
              onClick={() =>
                setExpanded((prev) => (prev === tech.name ? null : tech.name))
              }
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function TechCard({
  tech,
  index,
  isExpanded,
  isDark,
  onClick,
}: {
  tech: TechItem;
  index: number;
  isExpanded: boolean;
  isDark: boolean;
  onClick: () => void;
}) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const brandColor =
    tech.brandColorDark && isDark ? tech.brandColorDark : tech.brandColor;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      setRotate({
        x: ((y - centerY) / centerY) * -8,
        y: ((x - centerX) / centerX) * 8,
      });
    },
    [],
  );

  const handleMouseLeave = useCallback(() => {
    setRotate({ x: 0, y: 0 });
    setIsHovered(false);
  }, []);

  const r = 20;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (tech.mastery / 100) * circumference;

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ duration: 0.3, delay: index * 0.04, ease: easeOut }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className="relative cursor-pointer"
      style={{ perspective: "400px" }}
    >
      <motion.div
        animate={{ rotateX: rotate.x, rotateY: rotate.y }}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
      >
        <motion.div
          animate={{
            y: isHovered ? -4 : 0,
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ duration: 0.2, ease: easeOut }}
          className="flex min-w-[100px] flex-col items-center gap-1.5 rounded-sm border border-hairline bg-canvas-card p-4"
          style={{
            boxShadow: isHovered
              ? `0 0 24px ${brandColor}40, 0 4px 12px rgba(0,0,0,0.2)`
              : "0 0 0 transparent",
            transition: "box-shadow 0.25s ease-out",
          }}
        >
          <div className="relative flex h-12 w-12 items-center justify-center">
            <svg
              className="absolute inset-0 h-full w-full -rotate-90"
              viewBox="0 0 48 48"
            >
              <circle
                cx="24"
                cy="24"
                r={r}
                fill="none"
                stroke="var(--theme-hairline)"
                strokeWidth="2.5"
              />
              <circle
                cx="24"
                cy="24"
                r={r}
                fill="none"
                stroke={brandColor}
                strokeWidth="2.5"
                strokeDasharray={circumference}
                strokeDashoffset={isHovered ? offset : circumference}
                strokeLinecap="round"
                style={{
                  transition:
                    "stroke-dashoffset 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                  filter: isHovered ? `drop-shadow(0 0 3px ${brandColor}80)` : undefined,
                }}
              />
            </svg>
            <tech.icon
              size={24}
              style={{
                color: isHovered ? brandColor : undefined,
                transition: "color 0.2s ease-out",
                filter: isHovered ? `drop-shadow(0 0 4px ${brandColor}40)` : undefined,
              }}
            />
          </div>

          <span className="caption leading-none text-ink-muted text-center">
            {tech.name}
          </span>
        </motion.div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: -8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -8, height: 0 }}
              transition={{ duration: 0.2, ease: easeOut }}
            >
              <div
                className="space-y-2 rounded-sm border border-hairline border-t-0 bg-canvas-card p-3"
                style={{
                  boxShadow: `inset 0 1px 0 ${brandColor}20`,
                }}
              >
                <p className="caption text-ink-muted">{tech.description}</p>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-hairline">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${tech.mastery}%`,
                        background: brandColor,
                        transition: "width 0.4s ease-out",
                      }}
                    />
                  </div>
                  <span
                    className="micro-cap"
                    style={{ color: brandColor }}
                  >
                    {tech.mastery}%
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
