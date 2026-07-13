"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Linkedin, Mail, MessageCircle, X, Send } from "lucide-react";
import { easeOut } from "../utils/animations";

const contactLinks = [
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/ken-zamariyan" },
  { icon: Mail, label: "Email", href: "mailto:kenzamariyan32@gmail.com" },
  { icon: MessageCircle, label: "WhatsApp", href: "https://wa.me/6285878221758" },
];

function CVModal({ onClose }: { onClose: () => void }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-canvas/80 p-4 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 8 }}
        transition={{ duration: 0.25, ease: easeOut }}
        onClick={(e) => e.stopPropagation()}
        className="flex w-full max-w-3xl flex-col overflow-hidden rounded-sm border border-hairline bg-canvas-card"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-hairline px-5 py-3">
          <h3 className="button-cap text-ink">Curriculum Vitae</h3>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-sm text-ink-muted hover:text-ink transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

        {/* PDF Preview */}
        <div className="relative min-h-[50vh] md:min-h-[70vh]">
          {!loaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-hairline border-t-ink" />
            </div>
          )}
          <iframe
            src="/Ken_Zamariyan_FullStack_Developer.pdf"
            className="h-full w-full"
            style={{ minHeight: "50vh" }}
            onLoad={() => setLoaded(true)}
          />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end border-t border-hairline px-5 py-3">
          <a
            href="/Ken_Zamariyan_FullStack_Developer.pdf"
            download
            className="button-cap inline-flex items-center gap-2 rounded-sm border border-hairline px-4 py-2 text-ink-muted hover:border-ink hover:text-ink transition-colors"
          >
            <Download size={12} /> Download PDF
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  const [modalOpen, setModalOpen] = useState(false);
  const [cvModalOpen, setCvModalOpen] = useState(false);

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
                {/* Get in Touch */}
                <button
                  onClick={() => setModalOpen(true)}
                  className="group inline-flex cursor-pointer items-center gap-2 rounded-[32px] border border-hairline px-6 py-3 button-cap text-ink-muted transition-all duration-200 hover:border-ink hover:text-ink active:scale-[0.98]"
                >
                  <Send size={14} className="transition-transform duration-200 group-hover:-translate-y-0.5" />
                  Get in Touch
                </button>

                {/* Download CV */}
                <button
                  onClick={() => setCvModalOpen(true)}
                  className="group inline-flex cursor-pointer items-center gap-2 rounded-[32px] border border-hairline px-6 py-3 button-cap text-ink-muted transition-all duration-200 hover:border-ink hover:text-ink active:scale-[0.98]"
                >
                  <Download size={16} className="transition-transform duration-200 group-hover:-translate-y-0.5" />
                  Download CV
                </button>
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

      {/* Contact Modal */}
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

              <h3 className="body-md font-bold text-ink mb-1">Get in Touch</h3>
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

      {/* CV Preview Modal */}
      <AnimatePresence>
        {cvModalOpen && <CVModal onClose={() => setCvModalOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
