"use client";

import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section
      id="contact"
      className="
        relative scroll-mt-24 overflow-hidden
        bg-linear-to-b from-zinc-950 via-zinc-950 to-black
        py-32
      "
    >
      {/* ambient background continuation */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-125 w-125 -translate-x-1/2 rounded-full bg-blue-500/10 blur-[160px]" />
        <div className="absolute bottom-0 right-20 h-64 w-64 rounded-full bg-blue-600/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="
            mx-auto max-w-xl
            rounded-3xl border border-zinc-800/60
            bg-zinc-900/50 p-12 text-center
            backdrop-blur-xl
          "
        >
          {/* header */}
          <p className="text-sm uppercase tracking-widest text-blue-400">Get In Touch</p>

          <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-zinc-100">
            Let’s Work <span className="text-blue-400">Together</span>
          </h2>

          <p className="mt-5 text-zinc-400 leading-relaxed">Have a project in mind or need a developer to bring your ideas to life? I’m open to collaborations, freelance work, and long-term opportunities.</p>

          {/* actions */}
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="mailto:kenzamariyan32@gmail.com"
              className="
                inline-flex items-center justify-center
                rounded-xl bg-blue-600
                px-8 py-3 font-medium text-white
                transition
                hover:bg-blue-500
                hover:shadow-lg hover:shadow-blue-500/20
              "
            >
              Email Me
            </a>

            <a
              href="https://github.com/callmezaa"
              target="_blank"
              className="
                inline-flex items-center justify-center
                rounded-xl border border-zinc-700/60
                px-8 py-3 font-medium text-zinc-300
                transition
                hover:border-blue-500/50
                hover:text-white
              "
            >
              GitHub
            </a>
          </div>

          {/* availability */}
          <p className="mt-8 text-xs tracking-wide text-zinc-500">Available for freelance, contract, or full-time opportunities</p>
        </motion.div>
      </div>
    </section>
  );
}
