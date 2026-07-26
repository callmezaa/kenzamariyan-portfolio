"use client";

import { useTranslations } from "next-intl";
import { Mail, MessageCircle, Briefcase, Code2 } from "lucide-react";

export default function Footer() {
  const t = useTranslations("footer");

  const socials = [
    { icon: Mail, href: "mailto:kenzamariyan32@gmail.com", label: t("email") },
    { icon: MessageCircle, href: "https://wa.me/6285878221758", label: t("whatsapp") },
    { icon: Briefcase, href: "https://www.linkedin.com/in/ken-zamariyan", label: t("linkedin") },
    { icon: Code2, href: "https://github.com/callmezaa", label: t("github") },
  ];

  return (
    <footer className="px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 md:flex-row md:justify-between">
        <p className="body-small text-ink-muted text-center md:text-left">
          {t("copyright", { year: "2026" })}
        </p>
        <div className="flex items-center gap-2">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-soft text-ink-muted transition-colors hover:bg-surface-active hover:text-ink"
            >
              <s.icon size={14} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
