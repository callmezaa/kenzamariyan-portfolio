"use client";

import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import {
  Home,
  LayoutGrid,
  User,
  Code,
  Briefcase,
  Trophy,
  Mail,
} from "lucide-react";
import { MagneticDock } from "@/components/ui/magnetic-dock";
import { EASE_OUT } from "@/lib/motion";
import { SECTION_IDS } from "@/lib/sections";
import { useHideOnScroll } from "./use-hide-on-scroll";

const DOCK_HEIGHT = 72;

/** Dock omits exploration to stay compact — hotkey `7` still reaches it. */
const DOCK_SECTIONS = SECTION_IDS.filter(
  (id): id is Exclude<(typeof SECTION_IDS)[number], "exploration"> =>
    id !== "exploration"
);

type SectionId = (typeof DOCK_SECTIONS)[number];

/** Sections that are full pages instead of home-page anchors. */
const PAGE_ROUTES: Partial<Record<SectionId, string>> = {
  projects: "/projects",
  about: "/about",
  skills: "/skills",
  experience: "/experience",
  achievements: "/achievements",
  contact: "/contact",
};

const SECTION_ICONS: Record<SectionId, React.ReactNode> = {
  home: <Home size={22} />,
  projects: <LayoutGrid size={22} />,
  about: <User size={22} />,
  skills: <Code size={22} />,
  experience: <Briefcase size={22} />,
  achievements: <Trophy size={22} />,
  contact: <Mail size={22} />,
};

export function DockNav() {
  const t = useTranslations("navbar");
  const reduce = useReducedMotion();
  const router = useRouter();
  const pathname = usePathname();
  const [active, setActive] = useState<SectionId>("home");
  const visible = useHideOnScroll();

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    DOCK_SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: `-${DOCK_HEIGHT}px 0px -50% 0px`, threshold: 0 },
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollToSection = useCallback(
    (id: string) => {
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        // Section lives on the home page — navigate there if we're elsewhere.
        if (!el) {
          router.push(`/#${id}`);
          return;
        }
        const top =
          el.getBoundingClientRect().top + window.scrollY - DOCK_HEIGHT - 20;
        window.scrollTo({ top, behavior: "smooth" });
      });
    },
    [router],
  );

  // Route-backed sections are "active" when their page is open.
  const activeRouteItem = DOCK_SECTIONS.find((id) => PAGE_ROUTES[id] === pathname);
  const effectiveActive: SectionId = activeRouteItem ?? active;

  const items = DOCK_SECTIONS.map((id) => ({
    id,
    label: t(id),
    icon: SECTION_ICONS[id],
    isActive: effectiveActive === id,
    onClick: () =>
      PAGE_ROUTES[id] ? router.push(PAGE_ROUTES[id]!) : scrollToSection(id),
  }));

  return (
    <motion.div
      initial={false}
      animate={{
        opacity: visible ? 1 : 0,
        y: visible ? 0 : 20,
      }}
      transition={{ duration: reduce ? 0 : 0.3, ease: EASE_OUT }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
    >
      <MagneticDock
        items={items}
        iconSize={22}
        maxScale={1.4}
        magneticDistance={120}
        showLabels
        position="bottom"
        variant="glass"
      />
    </motion.div>
  );
}
