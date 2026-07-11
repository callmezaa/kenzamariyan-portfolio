"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useTheme } from "./ThemeProvider";

const sections = ["home", "about", "skills", "projects", "contact"];

export default function Navbar() {
  const { theme, toggle } = useTheme();
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const navHeight = useRef(80);

  useEffect(() => {
    const measure = () => {
      navHeight.current = headerRef.current?.offsetHeight ?? 80;
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    const threshold = navHeight.current;
    const observers: IntersectionObserver[] = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: `-${threshold}px 0px -50% 0px` }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!document.documentElement.style.getPropertyValue("--scrollbar-width")) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.documentElement.style.setProperty("--scrollbar-width", `${scrollbarWidth}px`);
    }
    document.body.classList.toggle("scroll-lock", menuOpen);
    return () => document.body.classList.remove("scroll-lock");
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const scrollToSection = (id: string) => {
    closeMenu();
    requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - navHeight.current - 20;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  };

  const capitalize = (s: string) => (s === "playground" ? "Playground" : s.charAt(0).toUpperCase() + s.slice(1));

  return (
    <header ref={headerRef} className="fixed top-0 left-0 w-full z-50 px-4 sm:px-6 py-4">
      <nav className="mx-auto max-w-6xl flex items-center justify-between">
        <Link href="#home" onClick={closeMenu} className="flex items-center gap-2 shrink-0">
          <Image src="/image/brand/logo-white.svg" alt="Ken Zamariyan" width={28} height={28} className="shrink-0" priority />
          <span className="button-cap text-ink hidden sm:inline">kenzamariyan</span>
        </Link>

        <div className="hidden md:flex items-center gap-0.5">
          {sections.map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              className={`micro-cap px-2.5 py-1.5 rounded-sm transition-colors cursor-pointer ${
                active === item
                  ? "text-ink"
                  : "text-ink-muted hover:text-ink"
              }`}
            >
              {capitalize(item)}
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a href="https://github.com/callmezaa" target="_blank" rel="me noopener noreferrer" className="text-ink-muted hover:text-ink transition-colors" aria-label="GitHub">
            <FaGithub size={18} />
          </a>
          <a href="https://www.linkedin.com/in/ken-zamariyan-10b140318/" target="_blank" rel="me noopener noreferrer" className="text-ink-muted hover:text-ink transition-colors" aria-label="LinkedIn">
            <FaLinkedin size={18} />
          </a>
          <button onClick={toggle} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-hairline text-ink-muted hover:text-ink hover:border-ink transition-all cursor-pointer">
            {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
          </button>
        </div>

        <button type="button" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-hairline text-ink-muted hover:text-ink transition-colors md:hidden">
          {menuOpen ? <X size={15} /> : <Menu size={15} />}
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-4 right-4 top-20 border border-hairline bg-canvas p-6 md:hidden z-30">
            <div className="flex flex-col gap-3">
              {sections.map((item, index) => (
                <motion.div key={item} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }}>
                  <button onClick={() => scrollToSection(item)}
                    className={`micro-cap flex h-11 w-full items-center justify-between rounded-lg px-4 transition-all cursor-pointer ${
                      active === item
                        ? "bg-canvas-card text-ink"
                        : "text-ink-muted hover:bg-canvas-card hover:text-ink"
                    }`}>
                    {capitalize(item)}
                  </button>
                </motion.div>
              ))}
              <div className="h-px bg-hairline my-2" />
              <button onClick={toggle}
                className="flex items-center justify-center gap-2 rounded-full border border-hairline px-4 py-2 micro-cap text-ink-muted hover:text-ink transition-colors cursor-pointer w-full">
                {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
                <span>{theme === "dark" ? "Light" : "Dark"} Mode</span>
              </button>
              <div className="flex items-center justify-around py-2">
                <a href="https://github.com/callmezaa" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-ink-muted hover:text-ink" onClick={closeMenu}>
                  <FaGithub size={18} /><span className="micro-cap">GitHub</span>
                </a>
                <a href="https://www.linkedin.com/in/ken-zamariyan-10b140318/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-ink-muted hover:text-ink" onClick={closeMenu}>
                  <FaLinkedin size={18} /><span className="micro-cap">LinkedIn</span>
                </a>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
