"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { User, Sparkle, FolderKanban, Briefcase, MessageCircle, Beaker, Mail } from "lucide-react";

interface DockItem {
  id: string;
  label: string;
  icon: typeof User;
}

const dockItems: DockItem[] = [
  { id: "about", label: "About", icon: User },
  { id: "skills", label: "Skills", icon: Sparkle },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "achievements", label: "Achievements", icon: MessageCircle },
  { id: "playground", label: "Playground", icon: Beaker },
  { id: "contact", label: "Contact", icon: Mail },
];

export default function FloatingDock() {
  const reduced = useReducedMotion();
  const [activeSection, setActiveSection] = useState("about");
  const [dockVisible, setDockVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      const hero = document.getElementById("home");
      if (hero) {
        setDockVisible(hero.getBoundingClientRect().bottom < 0);
      }

      let current = "about";
      let minDist = Infinity;
      const center = window.innerHeight * 0.3;

      for (let i = 0; i < dockItems.length; i++) {
        const el = document.getElementById(dockItems[i].id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        const dist = Math.abs(top - center);
        if (dist < minDist) {
          minDist = dist;
          current = dockItems[i].id;
        }
      }

      setActiveSection(current);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
  }

  return (
    <AnimatePresence>
      {dockVisible && (
        <motion.nav
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: reduced ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 pointer-events-none"
        >
          <div className="pointer-events-auto glass-panel flex items-center gap-0.5 rounded-2xl px-2.5 py-2 shadow-2xl shadow-black/60">
            {dockItems.map(({ id, label, icon: Icon }) => {
              const isActive = activeSection === id;
              return (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  aria-label={label}
                  className={`btn-press relative flex flex-col items-center gap-0.5 rounded-xl px-2.5 py-2 text-[10px] font-medium transition-all duration-200 sm:px-3 ${
                    isActive
                      ? "text-white"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  <Icon size={16} />
                  <span className="hidden sm:inline">{label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="dock-active"
                      className="absolute -bottom-px left-1/2 h-[3px] w-5 -translate-x-1/2 rounded-full bg-primary"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
