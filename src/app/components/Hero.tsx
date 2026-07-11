"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Linkedin, Mail, MessageCircle, X } from "lucide-react";
import Button from "./ui/Button";
import { easeOut } from "../utils/animations";

const contactLinks = [
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/ken-zamariyan-10b140318/" },
  { icon: Mail, label: "Email", href: "mailto:kenzamariyan32@gmail.com" },
  { icon: MessageCircle, label: "WhatsApp", href: "https://wa.me/6285878221758" },
];

export default function Hero() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section id="home" className="relative bg-canvas min-h-screen flex flex-col pt-28 md:pt-36 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.03)_0%,transparent_50%)] pointer-events-none" />
        <div className="relative mx-auto max-w-6xl px-6 md:px-8 w-full">
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 w-full space-y-6">
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: easeOut }}
                className="display-xxl"
              >
                Products shipped. Problems solved. No fluff.
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4, ease: easeOut }}
                className="body-lg max-w-xl"
              >
                Full-stack engineering across web, mobile, and AI.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.4, ease: easeOut }}
                className="flex flex-wrap gap-3"
              >
                <Button variant="filled" onClick={() => setModalOpen(true)}>
                  Discuss a Project
                </Button>
                <Button variant="ghost" href="/Ken_Zamariyan_FullStack_Developer.pdf" download target="_blank" rel="noopener noreferrer">
                  <Download size={16} />
                  Download CV
                </Button>
              </motion.div>
            </div>
            <div className="lg:col-span-5 w-full flex justify-center lg:justify-end">
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.03 }}
                transition={{ delay: 0.3, duration: 0.5, ease: easeOut }}
              >
                <div className="relative h-[200px] w-[200px] lg:h-[260px] lg:w-[260px] overflow-hidden rounded-full bg-canvas-card border-[4px] border-black dark:border-white shadow-xl ring-[6px] ring-black/20 dark:ring-white/20">
                  <Image src="/image/profile/profile-image.jpeg" alt="Ken Zamariyan" fill priority
                    sizes="(max-width: 1024px) 200px, 260px" className="object-cover object-[center_60%]" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-canvas/60 backdrop-blur-sm"
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.25, ease: easeOut }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm border border-hairline bg-canvas p-6 rounded-sm"
            >
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-3 right-3 flex h-6 w-6 items-center justify-center rounded-full border border-hairline text-ink-muted hover:text-ink hover:border-ink transition-colors cursor-pointer"
              >
                <X size={12} />
              </button>

              <h3 className="body-md font-bold text-ink mb-1">Let&rsquo;s Discuss Your Project</h3>
              <p className="body-md text-ink-muted mb-6">Reach me through any of these channels.</p>

              <div className="space-y-2">
                {contactLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 border border-hairline rounded-sm bg-canvas-card text-ink hover:bg-hairline transition-colors"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-sm border border-hairline text-ink-muted">
                      <link.icon size={15} />
                    </div>
                    <span className="body-md font-bold text-ink">{link.label}</span>
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
