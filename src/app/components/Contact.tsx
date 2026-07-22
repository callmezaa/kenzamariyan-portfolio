"use client";

import { motion } from "motion/react";
import { easeOut } from "../utils/animations";
import ContactForm from "./ContactForm";

export default function Contact() {
  return (
    <section id="contact" className="bg-canvas-alt py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
          <div className="rounded-[20px] bg-canvas-glass backdrop-blur-xl shadow-1 p-8 md:p-12">
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
                  className="display-xl leading-tight text-balance text-ink"
                >
                  Let&rsquo;s Build
                </motion.h2>
                <motion.h2
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease: easeOut, delay: 0.1 }}
                  className="display-xl leading-tight text-balance text-ink"
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

            {/* Right: Form */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: easeOut, delay: 0.15 }}
              className="w-full lg:col-span-7 lg:pl-8 lg:self-center"
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
