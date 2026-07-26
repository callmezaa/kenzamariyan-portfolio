"use client";

import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";

export function LanguageToggle() {
  const locale = useLocale();

  const toggleLocale = () => {
    const next = locale === "en" ? "id" : "en";
    document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=31536000; SameSite=Lax`;
    window.location.reload();
  };

  return (
    <Button
      onClick={toggleLocale}
      variant="ghost"
      size="icon-sm"
      className="rounded-full text-ink-muted hover:text-ink hover:bg-surface-hover font-mono text-xs font-semibold"
      aria-label={locale === "en" ? "Switch to Indonesian" : "Switch to English"}
    >
      {locale === "en" ? "ID" : "EN"}
    </Button>
  );
}
