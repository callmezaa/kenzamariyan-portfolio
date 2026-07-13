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
    <footer className="border-t border-hairline bg-canvas px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="caption text-ink-muted">
          &copy; 2026 Ken Zamariyan. All rights reserved.
        </p>
        <div className="flex items-center gap-3">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="flex h-8 w-8 items-center justify-center rounded-sm text-ink-muted transition-colors hover:bg-hairline/50 hover:text-ink"
            >
              <s.icon size={14} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
