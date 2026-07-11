"use client";

import Link from "next/link";
import Image from "next/image";
import VisitorCounter from "./ui/VisitorCounter";

function FooterLink({ href, children, external }: { href: string; children: React.ReactNode; external?: boolean }) {
  const classes = "relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-ink after:transition-all after:duration-300 hover:after:w-full hover:text-ink transition-colors";

  if (external) {
    return (
      <a href={href} target="_blank" rel="me noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }
  return <Link href={href} className={classes}>{children}</Link>;
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-canvas text-ink-muted border-t border-hairline py-16 px-6">
      <div className="mx-auto max-w-6xl">
        
        {/* Brand statement + columns */}
        <div className="flex flex-col md:grid md:grid-cols-12 gap-10 pb-12 border-b border-hairline">
          
          {/* Brand Column (4 cols) */}
          <div className="md:col-span-4 w-full space-y-4">
            <Link href="#home" className="flex items-center gap-2">
              <Image
                src="/image/brand/logo-white.svg"
                alt="Ken Zamariyan"
                width={24}
                height={24}
                className="shrink-0"
              />
              <span className="button-cap text-ink">
                kenzamariyan
              </span>
            </Link>
            <p className="body-md">
              An elite Frontend & Mobile Product Engineer designing and building production-grade digital platforms. Committed to structural speed, readability, and design integrity.
            </p>
          </div>

          {/* Column 2: Navigation (2 cols) */}
          <div className="md:col-span-2 w-full">
            <h3 className="micro-cap text-ink mb-4">Navigation</h3>
            <ul className="flex flex-col caption space-y-2.5">
              <li><FooterLink href="#home">Home</FooterLink></li>
              <li><FooterLink href="#about">About</FooterLink></li>
              <li><FooterLink href="#projects">Projects</FooterLink></li>
              <li><FooterLink href="#skills">Skills</FooterLink></li>
              <li><FooterLink href="#contact">Contact</FooterLink></li>
            </ul>
          </div>

          {/* Column 3: Focus Areas (3 cols) */}
          <div className="md:col-span-3 w-full">
            <h3 className="micro-cap text-ink mb-4">Focus Areas</h3>
            <ul className="flex flex-col caption space-y-2.5 text-ink-muted">
              <li>Frontend Architectures</li>
              <li>Mobile Product Delivery</li>
              <li>Offline Data Workflows</li>
              <li>Interface Engineering</li>
              <li>Performance Audits</li>
            </ul>
          </div>

          {/* Column 4: Channels (3 cols) */}
          <div className="md:col-span-3 w-full">
            <h3 className="micro-cap text-ink mb-4">Connect</h3>
            <ul className="flex flex-col caption space-y-2.5">
              <li><FooterLink href="https://github.com/callmezaa" external>GitHub</FooterLink></li>
              <li><FooterLink href="https://www.linkedin.com/in/ken-zamariyan-10b140318/" external>LinkedIn</FooterLink></li>
            </ul>
          </div>

        </div>

        {/* Footer Legal Row */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-8 caption text-ink-muted">
          <p suppressHydrationWarning>
            Copyright © {currentYear} Ken Zamariyan. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <VisitorCounter />
            <span className="hover:text-ink transition-colors cursor-default">Built with Next.js & React</span>
            <span className="hover:text-ink transition-colors cursor-default">Designed in Jakarta, ID</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
