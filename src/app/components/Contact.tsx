"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { easeOut } from "../utils/animations";
import { Reveal } from "@/components/motion/reveal/Reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import ContactForm from "./ContactForm";

export default function Contact() {
  const t = useTranslations("contact");
  return (
    <section id="contact" className="bg-canvas py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <div className="relative overflow-hidden rounded-[24px] border border-white/10 shadow-3 isolate">
          <Image
            src="/ambient_bg.jpg"
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 1152px"
            className="object-cover object-center"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/15"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-60"
            style={{
              background:
                "radial-gradient(ellipse 90% 70% at 50% 100%, rgba(255,255,255,0.08), transparent 60%)",
            }}
          />
          <div className="relative flex flex-col items-start gap-10 p-6 md:p-10 lg:grid lg:grid-cols-12 lg:gap-12">
            {/* Left: Text */}
            <div className="w-full space-y-6 lg:col-span-5">
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, ease: easeOut }}
                className="label text-white/60"
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
                  className="display-xl leading-tight text-balance text-white"
                />
                <TextReveal
                  as="h2"
                  text={[t('heading2')]}
                  split="word"
                  stagger={0.08}
                  blur={8}
                  yOffset="20%"
                  whileInView
                  className="display-xl leading-tight text-balance text-white"
                >
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                    className="inline-block h-[0.85em] w-[3px] bg-white ml-1 align-middle"
                  />
                </TextReveal>
              </div>
              <Reveal variant="rise" delay={0.2}>
                <p className="body-base text-white/70">{t('description')}</p>
              </Reveal>
            </div>

            {/* Right: Form */}
            <Reveal className="w-full lg:col-span-7">
              <div className="rounded-[16px] bg-canvas-card p-6 shadow-2 md:p-8">
                <ContactForm />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
