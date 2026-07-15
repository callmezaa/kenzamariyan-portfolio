"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Download, Send, X, ChevronDown } from "lucide-react";
import { SiLinkedin, SiGithub, SiGmail, SiWhatsapp, SiReact, SiTypescript, SiGo, SiNextdotjs, SiTailwindcss, SiPostgresql, SiDocker, SiPython } from "react-icons/si";
import { appleSpring } from "../utils/animations";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ShaderBackground } from "@/components/motion/shader-background";
import { TextReveal } from "@/components/motion/text-reveal";
import { Marquee } from "@/components/motion/marquee";
import { MagneticButton } from "@/components/motion/button/magnetic";
import { Loader } from "@/components/motion/loader";

const contactLinks = [
  { icon: SiLinkedin, label: "LinkedIn",  href: "https://www.linkedin.com/in/ken-zamariyan", color: "#0A66C2" },
  { icon: SiGithub,   label: "GitHub",    href: "https://github.com/callmezaa",              color: "#181717" },
  { icon: SiGmail,    label: "Email",     href: "mailto:kenzamariyan32@gmail.com",            color: "#EA4335" },
  { icon: SiWhatsapp, label: "WhatsApp",  href: "https://wa.me/6285878221758",                color: "#25D366" },
];

export default function Hero() {
  const [cvLoaded, setCvLoaded] = useState(false);

  const techStack = [
    { icon: SiReact, name: "React" },
    { icon: SiTypescript, name: "TypeScript" },
    { icon: SiGo, name: "Go" },
    { icon: SiNextdotjs, name: "Next.js" },
    { icon: SiTailwindcss, name: "Tailwind" },
    { icon: SiPostgresql, name: "PostgreSQL" },
    { icon: SiDocker, name: "Docker" },
    { icon: SiPython, name: "Python" },
  ];

  return (
    <>
      <section id="home" className="relative bg-canvas min-h-screen flex flex-col pt-32 md:pt-40 overflow-hidden">
        <ShaderBackground
          variant="mesh-gradient"
          className="absolute inset-0"
          colors={["#0a0a0f", "#1a1a2e", "#16213e", "#0f3460"]}
          distortion={0.6}
          swirl={0.3}
          speed={0.3}
        />
        <div className="relative mx-auto max-w-6xl px-6 md:px-8 w-full">
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7 w-full space-y-8 text-center lg:text-left">
              <TextReveal
                as="h1"
                text={["Products shipped.", "Problems solved.", "No fluff."]}
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
                className="body-base text-ink-muted max-w-xl mx-auto lg:mx-0"
              >
                Full-stack engineering across web, mobile, and AI.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...appleSpring, delay: 0.3 }}
                className="flex flex-wrap gap-3 justify-center lg:justify-start"
              >
                {/* Get in Touch Dialog */}
                <Dialog>
                  <DialogTrigger
                    render={
                      <MagneticButton variant="primary" size="md" strength={0.3} className="rounded-full shadow-sm" />
                    }
                  >
                    <Send data-icon="inline-start" />
                    Get in Touch
                  </DialogTrigger>
                  <DialogContent
                    showCloseButton={false}
                    className="rounded-[20px] bg-popover/80 backdrop-blur-xl p-0 shadow-2xl shadow-black/20 border-0 sm:max-w-sm"
                  >
                    <div className="flex items-center justify-between border-b border-border px-5 py-3">
                      <DialogTitle className="body-base font-bold text-foreground">Get in Touch</DialogTitle>
                      <DialogClose render={<Button variant="ghost" size="icon-sm" className="rounded-full" />}>
                        <X size={16} />
                      </DialogClose>
                    </div>
                    <div className="p-4 space-y-2">
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
                  </DialogContent>
                </Dialog>

                {/* Download CV Dialog */}
                <Dialog>
                  <DialogTrigger
                    render={
                      <MagneticButton variant="outline" size="md" strength={0.3} className="rounded-full" />
                    }
                  >
                    <Download data-icon="inline-start" />
                    Download CV
                  </DialogTrigger>
                  <DialogContent
                    showCloseButton={false}
                    className="rounded-[20px] bg-popover/80 backdrop-blur-xl p-0 shadow-2xl shadow-black/20 border-0 sm:max-w-3xl overflow-y-auto max-h-[85vh]"
                  >
                    <div className="flex items-center justify-between border-b border-border px-5 py-3">
                      <DialogTitle className="button-cap text-foreground">Curriculum Vitae</DialogTitle>
                      <DialogClose render={<Button variant="ghost" size="icon-sm" className="rounded-full" />}>
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
                        src="/Ken_Zamariyan_FullStack_Developer.pdf"
                        className="h-full w-full"
                        style={{ minHeight: "50vh" }}
                        onLoad={() => setCvLoaded(true)}
                      />
                    </div>
                    <div className="flex items-center justify-end border-t border-border px-5 py-3">
                      <a
                        href="/Ken_Zamariyan_FullStack_Developer.pdf"
                        download
                        className="button-cap inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                      >
                        <Download size={12} /> Download PDF
                      </a>
                    </div>
                  </DialogContent>
                </Dialog>
              </motion.div>
            </div>
            <div className="lg:col-span-5 w-full flex flex-col items-center lg:items-end">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.02 }}
                transition={{ ...appleSpring, delay: 0.2 }}
              >
                <div className="relative h-[180px] w-[180px] lg:h-[220px] lg:w-[220px] overflow-hidden rounded-[16px] shadow-lg shadow-black/50 ring-1 ring-black/10 dark:ring-white/10">
                  <Image src="/image/profile/profile-image.jpeg" alt="Ken Zamariyan" fill priority
                    sizes="(max-width: 1024px) 180px, 220px" className="object-cover object-[center_60%]" />
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...appleSpring, delay: 0.35 }}
                className="mt-2.5"
              >
                <p className="body-base font-semibold text-ink text-center">Ken Zamariyan</p>
                <p className="body-small text-ink-muted/70 text-center">Full-Stack Developer</p>
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
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown size={18} className="text-ink-muted/40" />
        </motion.div>
      </section>
    </>
  );
}
