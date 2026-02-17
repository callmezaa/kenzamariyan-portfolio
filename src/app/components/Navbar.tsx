"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const sections = ["home", "about", "skills", "projects", "contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [hidden, setHidden] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const currentScroll = window.scrollY;

      // background blur trigger
      setScrolled(currentScroll > 40);

      // auto hide logic
      if (currentScroll > lastScroll && currentScroll > 120) {
        setHidden(true); // scroll down
      } else {
        setHidden(false); // scroll up
      }

      setLastScroll(currentScroll);

      // active section detection
      const current = sections.find((id) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= window.innerHeight * 0.35 && rect.bottom >= 0;
      });

      if (current) setActive(current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastScroll]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out
        ${hidden ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"}
        ${scrolled ? "bg-zinc-950/80 backdrop-blur-xl" : "bg-transparent"}
      `}
    >
      {/* top ambient line */}
      {scrolled && <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />}

      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between px-6 transition-all
          ${scrolled ? "h-14" : "h-16"}
        `}
      >
        {/* LEFT — Welcome */}
        <div className="flex flex-col leading-tight">
          <span className="text-[11px] uppercase tracking-widest text-zinc-500">Welcome</span>
          <Link href="#home" className="text-sm font-medium text-zinc-200 transition hover:text-white">
            Ken Zamariyan
            <span className="text-blue-400"> — </span>
            <span className="text-zinc-400">IT Generalist</span>
          </Link>
        </div>

        {/* CENTER — Navigation */}
        <ul className="hidden items-center gap-8 text-sm md:flex">
          {sections.map((item) => {
            const isActive = active === item;

            return (
              <li key={item} className="relative">
                <Link
                  href={`#${item}`}
                  className={`py-2 transition
                    ${isActive ? "text-white" : "text-zinc-400 hover:text-white"}
                  `}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}

                  {isActive && <span className="absolute -bottom-1 left-0 h-px w-full bg-blue-400" />}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* RIGHT — Status + CTA */}
        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1 text-xs text-zinc-300 backdrop-blur md:flex">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Available
          </div>

          <Link href="#contact" className="rounded-full bg-blue-600/90 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500">
            Contact
          </Link>
        </div>
      </nav>
    </header>
  );
}
