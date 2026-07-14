"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Download, Linkedin, Mail, MessageCircle, Send, X } from "lucide-react";
import { appleSpring } from "../utils/animations";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const contactLinks = [
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/ken-zamariyan" },
  { icon: Mail, label: "Email", href: "mailto:kenzamariyan32@gmail.com" },
  { icon: MessageCircle, label: "WhatsApp", href: "https://wa.me/6285878221758" },
];

export default function Hero() {
  const [cvLoaded, setCvLoaded] = useState(false);

  return (
    <>
      <section id="home" className="relative bg-canvas min-h-screen flex flex-col pt-32 md:pt-40 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.02)_0%,transparent_50%)] pointer-events-none" />
        <div className="relative mx-auto max-w-6xl px-6 md:px-8 w-full">
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7 w-full space-y-8">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={appleSpring}
                className="display-hero"
              >
                Products shipped. Problems solved. No fluff.
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...appleSpring, delay: 0.15 }}
                className="body-base text-ink-muted max-w-xl"
              >
                Full-stack engineering across web, mobile, and AI.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...appleSpring, delay: 0.3 }}
                className="flex flex-wrap gap-3"
              >
                {/* Get in Touch Dialog */}
                <Dialog>
                  <DialogTrigger
                    render={
                      <Button variant="outline" size="lg" className="rounded-full group" />
                    }
                  >
                    <Send size={14} className="transition-transform duration-200 group-hover:-translate-y-0.5" />
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
                          className="flex items-center gap-3 rounded-full border border-border bg-muted/50 p-3 text-foreground hover:bg-muted transition-colors"
                        >
                          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground">
                            <link.icon size={15} />
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
                      <Button variant="outline" size="lg" className="rounded-full group" />
                    }
                  >
                    <Download size={14} className="transition-transform duration-200 group-hover:-translate-y-0.5" />
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
                          <div className="h-6 w-6 animate-spin rounded-full border-2 border-ink/10 border-t-ink" />
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
            <div className="lg:col-span-5 w-full flex justify-center lg:justify-end">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.02 }}
                transition={{ ...appleSpring, delay: 0.2 }}
              >
                <div className="relative h-[180px] w-[180px] lg:h-[220px] lg:w-[220px] overflow-hidden rounded-[16px] shadow-lg shadow-black/50">
                  <Image src="/image/profile/profile-image.jpeg" alt="Ken Zamariyan" fill priority
                    sizes="(max-width: 1024px) 180px, 220px" className="object-cover object-[center_60%]" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
