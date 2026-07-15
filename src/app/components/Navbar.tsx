"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useTheme } from "./ThemeProvider";
import { Button } from "@/components/ui/button";
import { Drawer } from "@/components/motion/drawer";
import { ThemeToggle } from "@/components/motion/theme-toggle";
import { Tooltip } from "@/components/motion/tooltip";

const sections = ["home", "projects", "about", "skills", "experience", "achievements", "contact"];

export default function Navbar() {
  const { theme } = useTheme();
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
    <header ref={headerRef} className={`fixed top-0 left-0 w-full z-50 px-4 sm:px-6 py-3 transition-all duration-500 ${
      scrolled
        ? "bg-canvas-glass backdrop-blur-xl shadow-lg shadow-black/20"
        : "bg-transparent"
    }`}>
      <nav className="mx-auto max-w-6xl flex items-center justify-between">
        <Link href="#home" onClick={closeMenu} className="flex items-center gap-2 shrink-0">
          <Image src="/image/brand/logo-white.svg" alt="Ken Zamariyan" width={28} height={28} className="shrink-0" priority />
          <span className="button-cap text-ink hidden sm:inline">kenzamariyan</span>
        </Link>

        <div className="hidden md:flex items-center gap-0.5">
          {sections.map((item) => (
            <Button
              key={item}
              onClick={() => scrollToSection(item)}
              variant="ghost"
              size="sm"
              className={`rounded-full ${
                active === item
                  ? "text-ink bg-white/10"
                  : "text-ink-muted hover:text-ink hover:bg-white/5"
              }`}
            >
              {capitalize(item)}
            </Button>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-1 rounded-full border border-hairline/50 px-3 py-1">
          <Tooltip content="GitHub" side="bottom">
            <Button variant="ghost" size="icon-sm" className="rounded-full text-ink-muted hover:text-ink hover:bg-white/5" nativeButton={false} render={<a href="https://github.com/callmezaa" target="_blank" rel="me noopener noreferrer" aria-label="GitHub" />}>
              <FaGithub size={16} />
            </Button>
          </Tooltip>
          <Tooltip content="LinkedIn" side="bottom">
            <Button variant="ghost" size="icon-sm" className="rounded-full text-ink-muted hover:text-ink hover:bg-white/5" nativeButton={false} render={<a href="https://www.linkedin.com/in/ken-zamariyan-10b140318/" target="_blank" rel="me noopener noreferrer" aria-label="LinkedIn" />}>
              <FaLinkedin size={16} />
            </Button>
          </Tooltip>
          <Tooltip content={theme === "dark" ? "Light mode" : "Dark mode"} side="bottom">
            <ThemeToggle variant="rectangle" start="bottom-up" iconClassName="h-4 w-4" className="rounded-full p-1.5" />
          </Tooltip>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle variant="rectangle" start="bottom-up" iconClassName="h-4 w-4" className="rounded-full p-1.5" />
          <Button type="button" variant="ghost" size="icon-sm" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
            className="rounded-full text-ink-muted hover:text-ink hover:bg-white/5">
            {menuOpen ? <X size={15} /> : <Menu size={15} />}
          </Button>
        </div>
      </nav>

      <Drawer
        open={menuOpen}
        onOpenChange={setMenuOpen}
        side="right"
        className="w-72 p-6 gap-4"
        ariaLabel="Navigation menu"
      >
        <div className="flex flex-col gap-2">
          {sections.map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              className={`flex h-11 items-center rounded-full px-4 text-sm font-medium transition-colors ${
                active === item
                  ? "bg-white/10 text-ink"
                  : "text-ink-muted hover:text-ink hover:bg-white/5"
              }`}
            >
              {capitalize(item)}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4 pt-3 border-t border-white/10">
          <a href="https://github.com/callmezaa" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-ink-muted hover:text-ink" onClick={closeMenu}>
            <FaGithub size={18} /><span className="label">GitHub</span>
          </a>
          <a href="https://www.linkedin.com/in/ken-zamariyan-10b140318/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-ink-muted hover:text-ink" onClick={closeMenu}>
            <FaLinkedin size={18} /><span className="label">LinkedIn</span>
          </a>
        </div>
      </Drawer>
    </header>
  );
}
