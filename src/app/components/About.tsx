"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Briefcase } from "lucide-react";
import { easeOut } from "../utils/animations";
import TechArsenal from "./TechArsenal";

const infoItems = [
  { icon: Calendar, label: "4+ Years Experience", desc: "Full-stack & mobile product engineering" },
  { icon: MapPin, label: "Based in Indonesia", desc: "Remote-friendly, global timezone" },
  { icon: Briefcase, label: "Open to Freelance & Collaboration", desc: "Available for contracts & partnerships" },
];

export default function About() {
  return (
    <section id="about" className="bg-canvas py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <div className="grid items-center gap-10 md:grid-cols-12 md:gap-14 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, ease: easeOut }}
            className="space-y-6 md:col-span-7"
          >
            <p className="label text-ink-muted">About Me</p>
            <h2 className="display-xl">Building reliable digital products with clarity and purpose.</h2>
            <p className="body-base">Shipping production apps across web, mobile, and AI — from AI contract analyzers processing documents under 15 seconds to offline-first mobile POS serving 1,500+ cooperative members. TypeScript, Go, Python, and PostgreSQL, end to end.</p>
          </motion.div>
          <div className="space-y-8 md:col-span-5">
            {infoItems.map((item, i) => (
              <motion.div key={item.label}
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.4, ease: easeOut, delay: i * 0.1 }}
                className="flex items-start gap-4 rounded-[14px] bg-canvas-card shadow-lg shadow-black/30 p-5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-ink-muted">
                  <item.icon size={18} />
                </div>
                <div>
                  <p className="body-base font-semibold text-ink">{item.label}</p>
                  <p className="body-small text-ink-muted mt-0.5">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-20 pt-10 border-t border-white/5"
        >
          <p className="label text-ink-muted text-center mb-6">Technology Arsenal</p>
          <TechArsenal />
        </motion.div>
      </div>
    </section>
  );
}
