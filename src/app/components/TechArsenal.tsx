"use client";

import { useState, useMemo, useCallback } from "react";
import { techArsenal, categories, type Category } from "../data/techArsenal";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";

export default function TechArsenal() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filtered = useMemo(
    () =>
      activeCategory === "All"
        ? techArsenal
        : techArsenal.filter((t) => t.category === activeCategory),
    [activeCategory],
  );

  const handleCategoryChange = useCallback((cat: Category) => {
    setActiveCategory(cat);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <Button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            variant={activeCategory === cat ? "secondary" : "ghost"}
            size="sm"
            className="rounded-full"
          >
            {cat}
          </Button>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-2" key={activeCategory}>
        {filtered.map((tech, i) => (
          <HoverCard key={tech.name}>
            <HoverCardTrigger
              render={
                <Button variant="outline" size="sm" className="rounded-full animate-in fade-in duration-300"
                  style={{
                    animationDelay: `${i * 30}ms`,
                    animationFillMode: "backwards",
                  }}
                />
              }
            >
              <tech.icon size={14} />
              <span>{tech.name}</span>
            </HoverCardTrigger>
            <HoverCardContent
              side="top"
              align="center"
              sideOffset={8}
              className="w-64 rounded-xl p-4"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2.5">
                  <tech.icon size={18} className="text-foreground" />
                  <span className="body-base font-bold text-foreground">{tech.name}</span>
                </div>
                <p className="body-small text-muted-foreground leading-relaxed">{tech.description}</p>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="label text-muted-foreground">Mastery</span>
                    <span className="mono-sm text-foreground">{tech.mastery}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-foreground/80 transition-all duration-500"
                      style={{ width: `${tech.mastery}%` }}
                    />
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        ))}
      </div>
    </div>
  );
}
