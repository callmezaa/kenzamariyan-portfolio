"use client";

import Link from "next/link";
import { Calendar } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-canvas text-zinc-500 border-t border-white/5 py-16 px-6">
      <div className="mx-auto max-w-6xl">
        
        {/* Brand statement + columns */}
        <div className="flex flex-col md:grid md:grid-cols-12 gap-10 pb-12 border-b border-white/5">
          
          {/* Brand Column (4 cols) */}
          <div className="md:col-span-4 w-full space-y-4">
            <Link href="#home" className="text-sm font-bold text-white tracking-tight font-display flex items-center gap-1.5">
              <span>kenzamariyan</span>
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            </Link>
            <p className="body-small">
              An elite Frontend & Mobile Product Engineer designing and building production-grade digital platforms. Committed to structural speed, readability, and design integrity.
            </p>
          </div>

          {/* Column 2: Navigation (2 cols) */}
          <div className="md:col-span-2 w-full">
            <h3 className="text-[10px] font-bold text-zinc-300 uppercase tracking-widest mb-4 font-display">Navigation</h3>
            <ul className="flex flex-col text-xs space-y-2.5 font-medium">
              <li><Link href="#home" className="relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full hover:text-white transition-colors">Home</Link></li>
              <li><Link href="#about" className="relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full hover:text-white transition-colors">About</Link></li>
              <li><Link href="#projects" className="relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full hover:text-white transition-colors">Projects</Link></li>
              <li><Link href="#skills" className="relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full hover:text-white transition-colors">Skills</Link></li>
              <li><Link href="#experience" className="relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full hover:text-white transition-colors">Experience</Link></li>
              <li><Link href="#contact" className="relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Column 3: Focus Areas (3 cols) */}
          <div className="md:col-span-3 w-full">
            <h3 className="text-[10px] font-bold text-zinc-300 uppercase tracking-widest mb-4 font-display">Focus Areas</h3>
            <ul className="flex flex-col text-xs space-y-2.5 font-medium text-zinc-400">
              <li>Frontend Architectures</li>
              <li>Mobile Product Delivery</li>
              <li>Offline Data Workflows</li>
              <li>Interface Engineering</li>
              <li>Performance Audits</li>
            </ul>
          </div>

          {/* Column 4: Channels (3 cols) */}
          <div className="md:col-span-3 w-full">
            <h3 className="text-[10px] font-bold text-zinc-300 uppercase tracking-widest mb-4 font-display">Connect</h3>
            <ul className="flex flex-col text-xs space-y-2.5 font-medium">
              <li>
                <a
                  href="https://github.com/callmezaa"
                  target="_blank"
                  rel="me noopener noreferrer"
                  className="relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full hover:text-white transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/ken-zamariyan-10b140318/"
                  target="_blank"
                  rel="me noopener noreferrer"
                  className="relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://calendly.com/kenzamariyan32/15-minute-discovery-call"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full hover:text-white transition-colors inline-flex items-center gap-1.5"
                >
                  <Calendar size={14} />
                  <span>Book a Call</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Legal Row */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-8 text-[11px] font-normal text-zinc-500">
          <p suppressHydrationWarning>
            Copyright © {currentYear} Ken Zamariyan. All rights reserved.
          </p>
          <div className="flex gap-6">
            <span className="hover:text-zinc-400 transition-colors cursor-default">Built with Next.js & React</span>
            <span className="hover:text-zinc-400 transition-colors cursor-default">Designed in Jakarta, ID</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
