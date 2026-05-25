"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Magnetic from "./ui/Magnetic";

const sections = ["home", "about", "skills", "projects", "experience", "contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollRef = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentScroll = window.scrollY;
      setScrolled(currentScroll > 40);
      setHidden(currentScroll > lastScrollRef.current && currentScroll > 140 && !menuOpen);
      lastScrollRef.current = currentScroll;

      const current = sections.find((id) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= window.innerHeight * 0.36 && rect.bottom >= window.innerHeight * 0.2;
      });

      if (current) setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-out ${
        hidden ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
      } ${scrolled || menuOpen ? "border-b border-zinc-900 bg-zinc-950/85 backdrop-blur-xl" : "bg-transparent"}`}
    >
      {(scrolled || menuOpen) && (
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
      )}

      <nav className={`mx-auto flex max-w-6xl items-center justify-between px-6 transition-all duration-300 ${scrolled ? "h-14" : "h-20"}`}>
        <Link href="#home" onClick={closeMenu} className="group text-lg font-light tracking-tight text-zinc-200 transition duration-300 hover:text-white">
          ken<span className="font-semibold text-blue-400 transition duration-300 group-hover:text-blue-300">zamariyan.</span>
        </Link>

        <ul className="hidden items-center gap-8 text-xs font-semibold uppercase tracking-wider md:flex">
          {sections.map((item) => {
            const isActive = active === item;
            return (
              <li key={item} className="relative">
                <Link href={`#${item}`} className={`py-2 transition duration-300 ${isActive ? "text-zinc-100" : "text-zinc-400 hover:text-zinc-200"}`}>
                  {item}
                  {isActive && (
                    <motion.span
                      layoutId="activeSectionIndicator"
                      className="absolute -bottom-1.5 left-0 h-[1.5px] w-full bg-blue-500"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center md:flex">
          <Magnetic>
            <Link
              href="#contact"
              className="inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-2 text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/20"
            >
              Contact Me
            </Link>
          </Magnetic>
        </div>

        <button
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-zinc-800 bg-zinc-950/70 text-zinc-200 transition hover:border-blue-500/40 hover:text-white md:hidden"
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="border-t border-zinc-900 bg-zinc-950/95 px-6 pb-6 pt-3 md:hidden"
        >
          <div className="mx-auto grid max-w-6xl gap-2">
            {sections.map((item) => (
              <Link
                key={item}
                href={`#${item}`}
                onClick={closeMenu}
                className={`flex h-11 items-center justify-between rounded-xl px-4 text-sm font-semibold capitalize transition ${
                  active === item ? "bg-blue-500/10 text-blue-300" : "text-zinc-300 hover:bg-zinc-900 hover:text-white"
                }`}
              >
                {item}
                {active === item && <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </header>
  );
}
