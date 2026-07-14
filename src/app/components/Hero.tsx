"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Linkedin, Mail, MessageCircle, X, Send } from "lucide-react";
import { appleSpring } from "../utils/animations";

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
        transition={appleSpring}
        onClick={(e) => e.stopPropagation()}
        className="flex w-full max-w-3xl flex-col overflow-hidden rounded-[20px] border border-white/10 bg-canvas-glass backdrop-blur-xl shadow-2xl shadow-black/80"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-3 backdrop-blur-xl">
          <h3 className="button-cap text-ink">Curriculum Vitae</h3>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-ink-muted hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

        {/* PDF Preview */}
        <div className="relative min-h-[50vh] md:min-h-[70vh]">
          {!loaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/10 border-t-ink" />
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
        <div className="flex items-center justify-end border-t border-white/10 px-5 py-3">
          <a
            href="/Ken_Zamariyan_FullStack_Developer.pdf"
            download
            className="button-cap inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-ink-muted hover:bg-white/10 hover:border-white/20 hover:text-ink transition-colors"
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
                <button
                  onClick={() => setModalOpen(true)}
                  className="group inline-flex cursor-pointer items-center gap-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 px-7 py-3.5 button-cap text-ink-muted transition-all duration-200 hover:bg-white/10 hover:border-white/20 hover:text-ink active:scale-[0.98]"
                >
                  <Send size={14} className="transition-transform duration-200 group-hover:-translate-y-0.5" />
                  Get in Touch
                </button>
                <button
                  onClick={() => setCvModalOpen(true)}
                  className="group inline-flex cursor-pointer items-center gap-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 px-7 py-3.5 button-cap text-ink-muted transition-all duration-200 hover:bg-white/10 hover:border-white/20 hover:text-ink active:scale-[0.98]"
                >
                  <Download size={14} className="transition-transform duration-200 group-hover:-translate-y-0.5" />
                  Download CV
                </button>
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
              transition={appleSpring}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm border border-white/10 bg-canvas-glass backdrop-blur-xl p-6 rounded-[20px] shadow-2xl shadow-black/80"
            >
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-3 right-3 flex h-6 w-6 items-center justify-center rounded-full border border-white/10 text-ink-muted hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X size={12} />
              </button>

              <h3 className="body-base font-bold text-ink mb-1">Get in Touch</h3>
              <p className="body-base text-ink-muted mb-6">Reach me through any of these channels.</p>

              <div className="space-y-2">
                {contactLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 border border-white/10 rounded-full bg-white/5 text-ink hover:bg-white/10 transition-colors"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-ink-muted">
                      <link.icon size={15} />
                    </div>
                    <span className="body-base font-bold text-ink">{link.label}</span>
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
