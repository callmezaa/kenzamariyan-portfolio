"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MessageCircle, Briefcase, Code2, X, ChevronRight } from "lucide-react";
import { easeOut } from "../utils/animations";

const contacts = [
  { icon: Mail, label: "kenzamariyan32@gmail.com", href: "mailto:kenzamariyan32@gmail.com" },
  { icon: MessageCircle, label: "085878221758", href: "https://wa.me/6285878221758" },
  { icon: Briefcase, label: "Ken Zamariyan", href: "https://www.linkedin.com/in/ken-zamariyan" },
  { icon: Code2, label: "callmezaa", href: "https://github.com/callmezaa" },
];

function ContactModal({ onClose }: { onClose: () => void }) {
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
        className="w-full max-w-sm rounded-[20px] border border-white/10 bg-canvas-glass backdrop-blur-xl shadow-2xl shadow-black/80"
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
          <h3 className="button-cap text-ink">Let&rsquo;s Connect</h3>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-ink-muted hover:text-ink transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>
        <div className="p-2">
          {contacts.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-[12px] px-3 py-3 text-ink-muted hover:bg-white/5 transition-colors"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[12px] text-ink-muted group-hover:text-ink transition-colors">
                <item.icon size={14} />
              </div>
              <span className="caption flex-1 truncate">{item.label}</span>
              <ChevronRight size={14} className="text-ink-muted/30 group-hover:text-ink-muted transition-colors" />
            </a>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Contact() {
  const [showModal, setShowModal] = useState(false);

  return (
    <section id="contact" className="bg-canvas-alt py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <div className="rounded-[20px] bg-canvas-glass backdrop-blur-xl shadow-lg shadow-black/30 p-8 md:p-12">
          <div className="flex flex-col items-start gap-10 lg:grid lg:grid-cols-12 lg:gap-16">
            {/* Left: Text */}
            <div className="w-full space-y-6 lg:col-span-5">
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, ease: easeOut }}
                className="micro-cap text-ink-muted"
              >
                Get In Touch
              </motion.p>
              <div className="space-y-1">
                <motion.h2
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease: easeOut }}
                  className="display-xl leading-tight text-ink"
                >
                  Let&rsquo;s Build
                </motion.h2>
                <motion.h2
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease: easeOut, delay: 0.1 }}
                  className="display-xl leading-tight text-ink"
                >
                  Something Elite
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                    className="inline-block h-[0.85em] w-[3px] bg-ink ml-1 align-middle"
                  />
                </motion.h2>
              </div>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: easeOut, delay: 0.2 }}
                className="body-lg"
              >
                Have an active product requirement, need an engineer to scale
                operations, or want to audit your UI architecture? Reach out
                below.
              </motion.p>
            </div>

            {/* Right: Photo + Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: easeOut, delay: 0.15 }}
              className="w-full lg:col-span-7 lg:pl-8 lg:self-center"
            >
              <button
                onClick={() => setShowModal(true)}
                className="group inline-flex w-full cursor-pointer items-center gap-4 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 p-4 transition-all duration-300 hover:shadow-md"
              >
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-1 ring-hairline">
                  <Image
                    src="/image/profile/profile-image.jpeg"
                    alt="Ken Zamariyan"
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div className="flex flex-1 items-center justify-between">
                  <div className="text-left">
                    <p className="body-md font-bold text-ink">Get in Touch</p>
                    <p className="caption text-ink-muted">
                      Let&rsquo;s start a conversation
                    </p>
                  </div>
                  <ChevronRight
                    size={16}
                    className="text-ink-muted transition-colors group-hover:text-ink"
                  />
                </div>
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showModal && <ContactModal onClose={() => setShowModal(false)} />}
      </AnimatePresence>
    </section>
  );
}
