"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { easeOut } from "../utils/animations";
import { Reveal } from "@/components/motion/reveal/Reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import ContactForm from "./ContactForm";

export default function Contact() {
  const t = useTranslations("contact");
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
                {t('label')}
              </motion.p>
              <div className="space-y-1">
                <TextReveal
                  as="h2"
                  text={[t('heading1')]}
                  split="word"
                  stagger={0.08}
                  blur={8}
                  yOffset="20%"
                  whileInView
                  className="display-xl leading-tight text-balance text-ink"
                />
                <TextReveal
                  as="h2"
                  text={[t('heading2')]}
                  split="word"
                  stagger={0.08}
                  blur={8}
                  yOffset="20%"
                  whileInView
                  className="display-xl leading-tight text-balance text-ink"
                >
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                    className="inline-block h-[0.85em] w-[3px] bg-ink ml-1 align-middle"
                  />
                </TextReveal>
              </div>
              <Reveal variant="rise" delay={0.2}>
                <p className="body-base">{t('description')}</p>
              </Reveal>
            </div>

            {/* Right: Form */}
            <Reveal className="w-full lg:col-span-7 lg:pl-8 lg:self-center">
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
