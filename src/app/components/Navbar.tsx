"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Magnetic from "./ui/Magnetic";
import { useTheme } from "./ThemeProvider";

const sections = ["home", "about", "skills", "projects", "experience", "achievements", "playground", "contact"];

export default function Navbar() {
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const headerRef = useRef<HTMLElement>(null);
  const navHeight = useRef(0);

  useEffect(() => {
    const measure = () => {
      navHeight.current = headerRef.current?.offsetHeight ?? 80;
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const currentScroll = window.scrollY;
      setScrolled(currentScroll > 50);

      // Calculate page scroll progress
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? Math.min(currentScroll / docHeight, 1) : 0);

      // Track active section — threshold = nav height + small buffer
      const threshold = navHeight.current + 20;
      const current = sections.find((id) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= threshold && rect.bottom >= threshold;
      });

      if (current) setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent background scroll when mobile menu is open — uses CSS class with scrollbar compensation
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Measure scrollbar width once and set CSS variable
    if (!document.documentElement.style.getPropertyValue("--scrollbar-width")) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.documentElement.style.setProperty("--scrollbar-width", `${scrollbarWidth}px`);
    }

    document.body.classList.toggle("scroll-lock", menuOpen);
    return () => {
      document.body.classList.remove("scroll-lock");
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 via-violet-500 to-emerald-500 z-[60] origin-left"
        style={{ scaleX: progress }}
      />
      <header
  ref={headerRef}
  className="fixed top-0 left-0 w-full z-50 px-4 sm:px-6 py-4 transition-all duration-300"
>
        <nav
          className={`mx-auto max-w-5xl rounded-lg border transition-all duration-300 px-6 py-3 flex items-center justify-between ${
            scrolled || menuOpen
              ? "border-white/10 bg-black/70 backdrop-blur-xl shadow-elevated-soft"
              : "border-white/5 bg-black/30 backdrop-blur-md"
          }`}
        >
          {/* Logo Brand */}
          <Magnetic strength={0.2}>
            <Link
              href="#home"
              onClick={closeMenu}
              className="flex items-center gap-2"
            >
              <Image
                src="/image/brand/logo-white.svg"
                alt="Ken Zamariyan"
                width={28}
                height={28}
                className="shrink-0"
                priority
              />
              <span className="text-sm font-semibold tracking-tight text-white hidden sm:inline">
                kenzamariyan
              </span>
            </Link>
          </Magnetic>

          {/* Desktop CTA / Socials */}
          <div className="hidden md:flex items-center gap-5">
            <a
              href="https://github.com/callmezaa"
              target="_blank"
              rel="me noopener noreferrer"
              className="text-zinc-300 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <FaGithub size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/ken-zamariyan-10b140318/"
              target="_blank"
              rel="me noopener noreferrer"
              className="text-zinc-300 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={18} />
            </a>

            {/* Theme Toggle */}
            <button
              onClick={toggle}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              className="relative flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-300 transition-all duration-300 hover:bg-white/10 hover:text-white cursor-pointer"
            >
              <motion.span
                key={theme}
                initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="absolute"
              >
                {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
              </motion.span>
            </button>
            
            <div className="h-4 w-px bg-white/10" />

            <Magnetic strength={0.15}>
              <Link
                href="#contact"
                className="btn-press inline-flex items-center justify-center rounded-full bg-white px-5 py-2 text-sm font-semibold text-black hover:bg-zinc-200 transition-colors"
              >
                Contact
              </Link>
            </Magnetic>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen ? "true" : "false"}
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-200 transition-colors hover:bg-white/10 md:hidden"
          >
            {menuOpen ? <X size={15} /> : <Menu size={15} />}
          </button>
        </nav>

        {/* Mobile Navigation Drawer Overlay */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-4 right-4 top-20 border border-white/10 bg-black/95 backdrop-blur-2xl rounded-lg p-6 md:hidden z-30 shadow-elevated-strong"
            >
              <div className="flex flex-col gap-3">
                {sections.map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={`#${item}`}
                      onClick={closeMenu}
                      className={`flex h-11 items-center justify-between rounded-lg px-4 text-sm font-medium capitalize transition-all ${
                        active === item
                          ? "bg-white/10 text-white"
                          : "text-zinc-300 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {item}
                      {active === item && <span className="h-1.5 w-1.5 rounded-full bg-primary" />}
                    </Link>
                  </motion.div>
                ))}
                
                <div className="h-px bg-white/5 my-2" />

                <div className="flex items-center justify-center gap-4 py-2">
                  <button
                    onClick={toggle}
                    aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                    className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-zinc-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
                    <span>{theme === "dark" ? "Light" : "Dark"} Mode</span>
                  </button>
                </div>

                <div className="flex items-center justify-around py-2">
                  <a
                    href="https://github.com/callmezaa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-zinc-300 hover:text-white"
                    onClick={closeMenu}
                  >
                    <FaGithub size={18} />
                    <span className="text-xs">GitHub</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/ken-zamariyan-10b140318/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-zinc-300 hover:text-white"
                    onClick={closeMenu}
                  >
                    <FaLinkedin size={18} />
                    <span className="text-xs">LinkedIn</span>
                  </a>
                </div>

                <Link
                  href="#contact"
                  onClick={closeMenu}
                  className="mt-2 flex h-11 items-center justify-center rounded-full bg-white text-sm font-semibold text-black hover:bg-zinc-200 transition-colors"
                >
                  Contact Me
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
