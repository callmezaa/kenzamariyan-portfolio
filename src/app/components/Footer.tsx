"use client";

import { Mail, MessageCircle, Briefcase, Code2 } from "lucide-react";

const socials = [
  { icon: Mail, href: "mailto:kenzamariyan32@gmail.com", label: "Email" },
  { icon: MessageCircle, href: "https://wa.me/6285878221758", label: "WhatsApp" },
  { icon: Briefcase, href: "https://www.linkedin.com/in/ken-zamariyan", label: "LinkedIn" },
  { icon: Code2, href: "https://github.com/callmezaa", label: "GitHub" },
];

export default function Footer() {
  return (
    <footer className="px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="body-small text-ink-tertiary">
          &copy; 2026 Ken Zamariyan. All rights reserved.
        </p>
        <div className="flex items-center gap-2">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-ink-muted transition-all hover:bg-white/10 hover:text-ink"
            >
              <s.icon size={14} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
