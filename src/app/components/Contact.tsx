"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Mail, MessageCircle, Briefcase, Code2, ChevronRight, X } from "lucide-react";
import { easeOut } from "../utils/animations";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

const contacts = [
  { icon: Mail, label: "kenzamariyan32@gmail.com", href: "mailto:kenzamariyan32@gmail.com" },
  { icon: MessageCircle, label: "085878221758", href: "https://wa.me/6285878221758" },
  { icon: Briefcase, label: "Ken Zamariyan", href: "https://www.linkedin.com/in/ken-zamariyan" },
  { icon: Code2, label: "callmezaa", href: "https://github.com/callmezaa" },
];

export default function Contact() {
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
                className="label text-ink-muted"
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
                className="body-base"
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
              <Dialog>
                <DialogTrigger
                  render={
                    <button className="group inline-flex w-full cursor-pointer items-center gap-4 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 p-4 transition-all duration-300 hover:shadow-md" />
                  }
                >
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
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
                      <p className="body-base font-bold text-ink">Get in Touch</p>
                      <p className="body-small text-ink-muted">
                        Let&rsquo;s start a conversation
                      </p>
                    </div>
                    <ChevronRight
                      size={16}
                      className="text-ink-muted transition-colors group-hover:text-ink"
                    />
                  </div>
                </DialogTrigger>
                <DialogContent
                  showCloseButton={false}
                  className="rounded-[20px] bg-popover/80 backdrop-blur-xl p-0 shadow-2xl shadow-black/20 border-0 sm:max-w-sm"
                >
                  <div className="flex items-center justify-between border-b border-border px-5 py-3">
                    <DialogTitle className="button-cap text-foreground">Let&rsquo;s Connect</DialogTitle>
                    <DialogClose className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer">
                      <X size={16} />
                    </DialogClose>
                  </div>
                  <div className="p-2">
                    {contacts.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 rounded-[12px] px-3 py-3 text-muted-foreground hover:bg-muted transition-colors"
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[12px] text-muted-foreground group-hover:text-foreground transition-colors">
                          <item.icon size={14} />
                        </div>
                        <span className="body-small flex-1 truncate">{item.label}</span>
                        <ChevronRight size={14} className="text-muted-foreground/30 group-hover:text-muted-foreground transition-colors" />
                      </a>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
