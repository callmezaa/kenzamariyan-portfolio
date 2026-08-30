"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowUpRight, Check, Copy, Mail, MessageCircle, Users } from "lucide-react";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { Reveal } from "@/components/motion/reveal/Reveal";
import { SpotlightCard } from "@/components/motion/hover/SpotlightCard";
import { Tooltip } from "@/components/motion/tooltip";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/app/components/page-hero/PageHero";
import ContactForm from "../ContactForm";

const EMAIL = "kenzamariyan32@gmail.com";

const TIMEZONE = "Asia/Jakarta";

function LocalTimeClock() {
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: TIMEZONE,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="text-[22px] font-semibold leading-none tracking-tight text-ink tabular-nums sm:text-2xl md:text-3xl">
      {time}
    </span>
  );
}

export default function ContactPage() {
  const t = useTranslations("contactPage");
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      if (copyTimer.current) clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — no-op */
    }
  };

  useEffect(
    () => () => {
      if (copyTimer.current) clearTimeout(copyTimer.current);
    },
    []
  );

  const channels = [
    {
      icon: <Mail size={16} />,
      label: "Email",
      desc: t("emailDesc"),
      value: EMAIL,
      href: `mailto:${EMAIL}`,
    },
    {
      icon: <MessageCircle size={16} />,
      label: "WhatsApp",
      desc: t("whatsappDesc"),
      value: "+62 858-7822-1758",
      href: "https://wa.me/6285878221758",
    },
    {
      icon: <SiLinkedin size={15} />,
      label: "LinkedIn",
      desc: t("linkedinDesc"),
      value: "ken-zamariyan",
      href: "https://www.linkedin.com/in/ken-zamariyan-10b140318/",
    },
    {
      icon: <SiGithub size={15} />,
      label: "GitHub",
      desc: t("githubDesc"),
      value: "@callmezaa",
      href: "https://github.com/callmezaa",
    },
  ];

  return (
    <main id="main-content" className="min-h-dvh">
      <PageHero
        variant="grid"
        compact
        centered
        kicker={t("kicker")}
        lines={[t("line1"), t("line2")]}
        tagline={t("tagline")}
      />

      <div className="mx-auto max-w-6xl px-4 pb-20 pt-8 sm:px-6 sm:pb-28 sm:pt-12 md:px-8 md:pt-16">

        <div className="grid items-start gap-8 sm:gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-12">
          {/* Left: status + channels */}
          <div className="order-2 min-w-0 space-y-5 lg:order-1">
            {/* Availability */}
            <Reveal variant="rise">
              <SpotlightCard className="rounded-[20px] bg-canvas-glass p-5 shadow-1 backdrop-blur-sm space-y-3 sm:p-6">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-2.5 w-2.5 shrink-0" aria-hidden="true">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60 opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  </span>
                  <p className="body-base min-w-0 font-semibold text-ink">{t("availableBadge")}</p>
                </div>
                <p className="body-small text-ink-muted">{t("responseLine")}</p>
                <div className="flex items-center justify-between gap-3 border-t border-hairline pt-4 mt-2">
                  <div className="min-w-0 space-y-0.5">
                    <p className="label text-ink-tertiary">{t("localTimeLabel")}</p>
                    <LocalTimeClock />
                  </div>
                  <Users size={18} className="shrink-0 text-ink-tertiary/50" aria-hidden="true" />
                </div>
                <p className="body-small break-words text-ink-tertiary">{t("locationLabel")}</p>
              </SpotlightCard>
            </Reveal>

            {/* Channels */}
            <Reveal variant="rise" delay={0.08} className="min-w-0">
              <div className="space-y-3">
                <p className="label text-ink-tertiary">{t("channelsLabel")}</p>
                <div className="space-y-2.5">
                  {channels.map((ch) => (
                    <SpotlightCard
                      key={ch.label}
                      className="min-w-0 rounded-[14px] bg-canvas-card shadow-1 hover:shadow-2 transition-shadow duration-300"
                    >
                      <a
                        href={ch.href}
                        target={ch.href.startsWith("mailto:") ? undefined : "_blank"}
                        rel={ch.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                        className="group flex items-center gap-3 p-4 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ink/40 rounded-[14px] sm:gap-4"
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface-soft text-ink-muted group-hover:text-ink transition-colors">
                          {ch.icon}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block body-small font-semibold text-ink">{ch.label}</span>
                          <span className="block truncate mono-sm text-ink-tertiary">
                            <span className="hidden sm:inline">{ch.value} · {ch.desc}</span>
                            <span className="sm:hidden">{ch.value}</span>
                          </span>
                          <span className="block truncate mono-sm text-ink-tertiary text-xs leading-tight sm:hidden">
                            {ch.desc}
                          </span>
                        </span>
                        <ArrowUpRight
                          size={16}
                          className="shrink-0 text-ink-muted/50 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
                        />
                      </a>
                    </SpotlightCard>
                  ))}
                </div>

                <Tooltip
                  id="tip-copy-email"
                  content={copied ? t("copiedFeedback") : t("copyTooltip")}
                  side="bottom"
                  wrapperClassName="flex w-full"
                >
                  <Button
                    onClick={copyEmail}
                    variant={copied ? "secondary" : "outline"}
                    size="lg"
                    className="btn-3d-outline w-full min-w-0 max-w-full overflow-hidden rounded-full text-xs sm:text-sm"
                  >
                    {copied ? (
                      <Check size={14} data-icon="inline-start" className="shrink-0" />
                    ) : (
                      <Copy size={14} data-icon="inline-start" className="shrink-0" />
                    )}
                    <span className="min-w-0 truncate">{EMAIL}</span>
                  </Button>
                </Tooltip>
              </div>
            </Reveal>
          </div>

          {/* Right: form */}
          <Reveal variant="rise" delay={0.05} className="order-1 min-w-0 lg:order-2">
            <div className="rounded-[20px] border border-hairline bg-canvas-glass p-5 shadow-1 backdrop-blur-sm sm:p-6 md:p-8">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </main>
  );
}
