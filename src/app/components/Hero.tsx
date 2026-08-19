"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { Download, Send, X, ChevronDown } from "lucide-react";
import { SiReact, SiTypescript, SiGo, SiNextdotjs, SiTailwindcss, SiPostgresql, SiDocker, SiPython, SiExpress, SiNodedotjs, SiMongodb, SiGit, SiLinkedin, SiGithub, SiGmail, SiWhatsapp } from "react-icons/si";
import { appleSpring } from "../utils/animations";

import {
  CenterMorphModal,
  CenterMorphModalTrigger,
  CenterMorphModalContent,
} from "@/components/motion/center-morph-modal";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TextReveal } from "@/components/motion/text-reveal";
import { Marquee } from "@/components/motion/marquee";
import { Loader } from "@/components/motion/loader";
import ContactForm from "./ContactForm";

export default function Hero() {
  const t = useTranslations("hero");
  const [cvLoaded, setCvLoaded] = useState(false);
  const reduceMotion = useReducedMotion();

  const contactLinks = [
    { icon: SiLinkedin, label: t("contactLinks.linkedin"),  href: "https://www.linkedin.com/in/ken-zamariyan", color: "#0A66C2" },
    { icon: SiGithub,   label: t("contactLinks.github"),    href: "https://github.com/callmezaa",              color: "#181717" },
    { icon: SiGmail,    label: t("contactLinks.email"),     href: "mailto:kenzamariyan32@gmail.com",            color: "#EA4335" },
    { icon: SiWhatsapp, label: t("contactLinks.whatsapp"),  href: "https://wa.me/6285878221758",                color: "#25D366" },
  ];

  const techStack = [
    { icon: SiReact, name: t("techStack.react") },
    { icon: SiTypescript, name: t("techStack.typescript") },
    { icon: SiGo, name: t("techStack.go") },
    { icon: SiNextdotjs, name: t("techStack.nextjs") },
    { icon: SiTailwindcss, name: t("techStack.tailwind") },
    { icon: SiPostgresql, name: t("techStack.postgresql") },
    { icon: SiExpress, name: t("techStack.express") },
    { icon: SiNodedotjs, name: t("techStack.nodejs") },
    { icon: SiMongodb, name: t("techStack.mongodb") },
    { icon: SiDocker, name: t("techStack.docker") },
    { icon: SiPython, name: t("techStack.python") },
    { icon: SiGit, name: t("techStack.git") },
  ];

  return (
    <>
      <section id="home" className="relative bg-canvas min-h-dvh flex flex-col pt-32 md:pt-40 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.015)_0%,transparent_60%)] pointer-events-none" />
        <div className="relative mx-auto max-w-6xl px-6 md:px-8 w-full">
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7 w-full space-y-8 text-center lg:text-left">
              <TextReveal
                as="h1"
                text={[t("headlines.0"), t("headlines.1"), t("headlines.2")]}
                className="display-hero"
                split="word"
                stagger={0.08}
                blur={8}
                yOffset="20%"
              />
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...appleSpring, delay: 0.15 }}
                className="body-base text-ink-muted max-w-xl mx-auto lg:mx-0 text-wrap-pretty"
              >
                {t("subheadline")}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...appleSpring, delay: 0.3 }}
                className="flex flex-wrap gap-3 justify-center lg:justify-start"
              >
                {/* Get in Touch Modal */}
                <CenterMorphModal>
                  <CenterMorphModalTrigger>
                    <Button variant="default" size="lg" className="btn-3d rounded-full shadow-sm" suppressHydrationWarning>
                      <Send data-icon="inline-start" />
                      {t("getInTouch")}
                    </Button>
                  </CenterMorphModalTrigger>
                  <CenterMorphModalContent
                    ariaLabel={t("getInTouch")}
                    className="max-w-sm"
                  >
                    <div className="px-5 pt-5 pb-3 space-y-1">
                      <h2 className="body-base font-bold text-ink">{t("modalTitle")}</h2>
                      <p className="body-small text-ink-muted">{t("reachMe")}</p>
                    </div>
                    <div className="px-5 pb-5 space-y-2">
                      {contactLinks.map((link) => (
                        <a
                          key={link.label}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 rounded-full bg-muted/50 p-3 text-foreground hover:bg-muted transition-colors"
                        >
                          <div
                            className="flex h-8 w-8 items-center justify-center rounded-full text-white"
                            style={{ backgroundColor: link.color }}
                          >
                            <link.icon size={14} />
                          </div>
                          <span className="body-base font-bold text-foreground">{link.label}</span>
                        </a>
                      ))}
                    </div>
                  </CenterMorphModalContent>
                </CenterMorphModal>

                {/* Download CV Dialog */}
                <Dialog>
                  <DialogTrigger
                    render={
                      <Button variant="outline" size="lg" className="rounded-full" suppressHydrationWarning />
                    }
                  >
                    <Download data-icon="inline-start" />
                    {t("downloadCv")}
                  </DialogTrigger>
                  <DialogContent
                    showCloseButton={false}
                    className="rounded-[20px] bg-popover/80 backdrop-blur-xl p-0 shadow-2 border-0 sm:max-w-3xl overflow-y-auto max-h-[85vh]"
                  >
                    <div className="flex items-center justify-between border-b border-border px-5 py-3">
                      <DialogTitle className="button-cap text-foreground">{t("cvTitle")}</DialogTitle>
                      <DialogClose render={<Button variant="ghost" size="icon-sm" className="rounded-full" aria-label="Close" />}>
                        <X size={16} />
                      </DialogClose>
                    </div>
                    <div className="relative min-h-[50vh] md:min-h-[70vh]">
                      {!cvLoaded && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Loader variant="spinner" size={24} />
                        </div>
                      )}
                      <iframe
                        src="/CV-KENZAMARIYAN.pdf"
                        className="h-full w-full"
                        style={{ minHeight: "50vh" }}
                        onLoad={() => setCvLoaded(true)}
                      />
                    </div>
                    <div className="flex items-center justify-end border-t border-border px-5 py-3">
                      <a
                        href="/CV-KENZAMARIYAN.pdf"
                        download
                        className="button-cap inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                      >
                        <Download size={12} /> {t("downloadPdf")}
                      </a>
                    </div>
                  </DialogContent>
                </Dialog>
              </motion.div>
            </div>
            <div className="lg:col-span-5 w-full flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.02, transition: { type: "spring", stiffness: 140, damping: 20, mass: 0.6 } }}
                transition={{ ...appleSpring, delay: 0.2 }}
                className="relative group"
              >
                <div className="relative h-[180px] w-[180px] lg:h-[220px] lg:w-[220px] overflow-hidden rounded-[16px] shadow-2 outline outline-1 outline-white/10 dark:outline-black/10 transition-shadow duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:shadow-3">
                  <Image src="/image/profile/profile-image.jpeg" alt={t("name")} fill priority
                    sizes="(max-width: 1024px) 180px, 220px"
                    className="object-cover object-[center_60%] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]" />
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...appleSpring, delay: 0.35 }}
                className="mt-2.5 w-full"
              >
                <p className="body-base font-semibold text-ink text-center">{t("name")}</p>
                <p className="body-small text-ink-muted text-center">{t("role")}</p>
              </motion.div>
            </div>
          </div>

          {/* Tech Stack Marquee */}
          <div className="mt-16 md:mt-24 pb-8">
            <Marquee speed={25} fade={true}>
              {techStack.map((tech) => (
                <div key={tech.name} className="flex items-center gap-2 mx-4 shrink-0">
                  <tech.icon size={16} className="text-ink-muted/30" />
                  <span className="mono-sm text-ink-muted/30 whitespace-nowrap">{tech.name}</span>
                </div>
              ))}
            </Marquee>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 touch-none"
          animate={reduceMotion ? undefined : { y: [0, 6, 0] }}
          transition={reduceMotion ? undefined : { repeat: Infinity, duration: 2, ease: "easeInOut" }}
          aria-hidden="true"
        >
          <span className="label text-ink-muted/40">{t("scroll")}</span>
          <ChevronDown size={18} className="text-ink-muted/40" />
        </motion.div>
      </section>
    </>
  );
}
