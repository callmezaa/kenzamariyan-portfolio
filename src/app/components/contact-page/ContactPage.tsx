"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowLeft, ArrowUpRight, Check, Copy, Mail, MessageCircle, Users } from "lucide-react";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { TextReveal } from "@/components/motion/text-reveal";
import { Reveal } from "@/components/motion/reveal/Reveal";
import { SpotlightCard } from "@/components/motion/hover/SpotlightCard";
import { Tooltip } from "@/components/motion/tooltip";
import { TransitionLink } from "@/components/motion/transition/TransitionLink";
import { Button } from "@/components/ui/button";
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
    <span className="display-lg font-semibold text-ink tabular-nums tracking-tight">
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
      <div className="mx-auto max-w-5xl px-6 pb-28 pt-32 md:px-8 md:pt-40 space-y-14 md:space-y-20">
        <TransitionLink
          href="/"
          className="inline-flex items-center gap-2 label text-muted-foreground hover:text-foreground transition-colors mb-2"
        >
          <ArrowLeft size={14} />
          {t("backHome")}
        </TransitionLink>

        {/* Hero */}
        <header className="space-y-6">
          <p className="label text-ink-muted">{t("kicker")}</p>
          <h1 className="display-xl text-balance">
            <TextReveal text={[t("line1"), t("line2")]} as="span" stagger={0.08} />
          </h1>
          <p className="body-lg text-ink-muted max-w-prose">{t("tagline")}</p>
        </header>

        <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-12 items-start">
          {/* Left: status + channels */}
          <div className="space-y-5 order-2 lg:order-1">
            {/* Availability */}
            <Reveal variant="rise">
              <SpotlightCard className="rounded-[20px] bg-canvas-glass backdrop-blur-sm shadow-1 p-6 space-y-3">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60 opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  </span>
                  <p className="body-base font-semibold text-ink">{t("availableBadge")}</p>
                </div>
                <p className="body-small text-ink-muted">{t("responseLine")}</p>
                <div className="flex items-center justify-between border-t border-hairline pt-4 mt-2">
                  <div className="space-y-0.5">
                    <p className="label text-ink-tertiary">{t("localTimeLabel")}</p>
                    <LocalTimeClock />
                  </div>
                  <Users size={18} className="text-ink-tertiary/50" aria-hidden="true" />
                </div>
                <p className="body-small text-ink-tertiary">{t("locationLabel")}</p>
              </SpotlightCard>
            </Reveal>

            {/* Channels */}
            <Reveal variant="rise" delay={0.08}>
              <div className="space-y-3">
                <p className="label text-ink-tertiary">{t("channelsLabel")}</p>
                <div className="space-y-2.5">
                  {channels.map((ch) => (
                    <SpotlightCard
                      key={ch.label}
                      className="rounded-[14px] bg-canvas-card shadow-1 hover:shadow-2 transition-shadow duration-300"
                    >
                      <a
                        href={ch.href}
                        target={ch.href.startsWith("mailto:") ? undefined : "_blank"}
                        rel={ch.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                        className="group flex items-center gap-4 p-4 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ink/40 rounded-[14px]"
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface-soft text-ink-muted group-hover:text-ink transition-colors">
                          {ch.icon}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block body-small font-semibold text-ink">{ch.label}</span>
                          <span className="block mono-sm text-ink-tertiary truncate">{ch.value} · {ch.desc}</span>
                        </span>
                        <ArrowUpRight
                          size={16}
                          className="shrink-0 text-ink-muted/50 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
                        />
                      </a>
                    </SpotlightCard>
                  ))}
                </div>

                <Tooltip id="tip-copy-email" content={copied ? t("copiedFeedback") : t("copyTooltip")} side="bottom">
                  <Button
                    onClick={copyEmail}
                    variant={copied ? "secondary" : "outline"}
                    size="lg"
                    className="w-full btn-3d-outline rounded-full"
                  >
                    {copied ? <Check size={14} data-icon="inline-start" /> : <Copy size={14} data-icon="inline-start" />}
                    {EMAIL}
                  </Button>
                </Tooltip>
              </div>
            </Reveal>
          </div>

          {/* Right: form */}
          <Reveal variant="rise" delay={0.05} className="order-1 lg:order-2">
            <div className="rounded-[20px] border border-hairline bg-canvas-glass backdrop-blur-sm shadow-1 p-6 md:p-8">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </main>
  );
}
