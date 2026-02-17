"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function About() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section
      id="about"
      className="relative scroll-mt-24 overflow-hidden
                 bg-gradient-to-b from-zinc-950 via-zinc-950 to-black py-32"
    >
      {/* CONTINUATION glow from hero */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -top-32 left-1/2 h-[500px] w-[500px]
                        -translate-x-1/2 rounded-full bg-blue-500/10 blur-[160px]"
        />
        <div
          className="absolute bottom-0 right-0 h-72 w-72
                        rounded-full bg-blue-600/10 blur-[120px]"
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid gap-20 md:grid-cols-2">
          {/* LEFT — slide from left */}
          <motion.div
            initial={{ opacity: 0, x: -48 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1], // premium easing
            }}
            className="space-y-6"
          >
            <p className="text-sm uppercase tracking-widest text-blue-400">About Me</p>

            <h2 className="text-3xl md:text-4xl font-semibold leading-tight text-zinc-100">
              Building reliable digital products with
              <span className="text-blue-400"> clarity</span> and
              <span className="text-blue-400"> purpose</span>
            </h2>

            <p className="max-w-xl text-zinc-300 leading-relaxed">I am an IT Generalist with hands-on experience in developing web and mobile applications.</p>

            <p className="max-w-xl text-zinc-400 leading-relaxed">My work spans frontend development, backend integration, and mobile application development using modern, production-ready technologies.</p>
          </motion.div>

          {/* RIGHT — slide from right, staggered */}
          <div className="space-y-6">
            {[
              {
                title: "Clean Architecture",
                desc: "Well-structured, maintainable, and scalable codebases.",
              },
              {
                title: "Problem-Oriented",
                desc: "Technology as a tool to solve real business challenges.",
              },
              {
                title: "Web & Mobile Focus",
                desc: "Consistent experience across platforms and devices.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 48 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.2 + i * 0.12,
                }}
                className="group rounded-2xl border border-zinc-800/60
                           bg-zinc-900/40 p-6 backdrop-blur-xl
                           transition hover:border-blue-500/40
                           hover:bg-zinc-900/60"
              >
                <h3
                  className="mb-2 text-lg font-semibold text-zinc-100
                               transition group-hover:text-blue-400"
                >
                  {item.title}
                </h3>
                <p className="text-zinc-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
