"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Magnetic from "./ui/Magnetic";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    company: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage("Please fill in all fields.");
      setStatus("error");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "", company: "" });
      } else {
        setErrorMessage(result.error || "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch {
      setErrorMessage("Failed to send message. Please check your connection.");
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="
        relative scroll-mt-24 overflow-hidden
        bg-gradient-to-b from-zinc-950 via-zinc-950 to-black
        py-24 md:py-32
      "
    >
      {/* ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-500/5 blur-[160px]" />
        <div className="absolute bottom-0 right-20 h-64 w-64 rounded-full bg-blue-600/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid gap-16 lg:grid-cols-12 items-start">
          
          {/* LEFT COLUMN: Info & Socials */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-5 space-y-8"
          >
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-widest text-blue-400">Get In Touch</p>
              <h2 className="text-3xl md:text-4xl font-semibold text-zinc-100 leading-tight">
                Let’s Start a <br className="hidden md:inline" />
                <span className="text-blue-400">Conversation</span>
              </h2>
              <p className="text-zinc-400 leading-relaxed max-w-md">
                Have a project in mind, need a developer to join your team, or just want to connect? Send a message and let&apos;s make it happen.
              </p>
            </div>

            {/* Info Items */}
            <div className="space-y-6 pt-4">
              {/* Availability */}
              <div className="flex items-center gap-4 p-4 rounded-2xl border border-zinc-900 bg-zinc-900/20 backdrop-blur">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                </div>
                <div>
                  <h4 className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Availability</h4>
                  <p className="text-sm text-zinc-200 font-medium">Open for freelance and full-time positions</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-4 p-4 rounded-2xl border border-zinc-900 bg-zinc-900/20 backdrop-blur">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 text-lg">
                  ✉
                </div>
                <div>
                  <h4 className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Email</h4>
                  <a href="mailto:kenzamariyan32@gmail.com" className="text-sm text-zinc-200 font-medium hover:text-blue-400 transition">
                    kenzamariyan32@gmail.com
                  </a>
                </div>
              </div>

              {/* Socials */}
              <div className="flex items-center gap-4 p-4 rounded-2xl border border-zinc-900 bg-zinc-900/20 backdrop-blur">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-500/10 text-zinc-400 text-lg">
                  👥
                </div>
                <div>
                  <h4 className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Follow Me</h4>
                  <div className="flex gap-4 mt-0.5">
                    <a
                      href="https://github.com/callmezaa"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-zinc-200 font-medium hover:text-blue-400 transition"
                    >
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Interactive Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7"
          >
            <div className="rounded-3xl border border-zinc-900 bg-zinc-900/30 p-8 md:p-10 backdrop-blur-xl relative overflow-hidden">
              
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success-message"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center text-center py-16 space-y-6"
                  >
                    <div className="h-16 w-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center text-emerald-400 text-3xl">
                      ✓
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-zinc-100">Message Sent Successfully!</h3>
                      <p className="text-zinc-400 text-sm max-w-sm mx-auto">
                        Thank you for reaching out! I&apos;ve received your message and will get back to you as soon as possible.
                      </p>
                    </div>
                    <button
                      onClick={() => setStatus("idle")}
                      className="text-xs text-blue-400 hover:text-blue-300 font-medium underline underline-offset-4"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="contact-form"
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    aria-live="polite"
                  >
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      tabIndex={-1}
                      autoComplete="off"
                      className="hidden"
                      aria-hidden="true"
                    />
                    <div className="grid gap-6 sm:grid-cols-2">
                      {/* Name */}
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          disabled={status === "loading"}
                          required
                          maxLength={80}
                          placeholder="John Doe"
                          className="
                            w-full rounded-xl border border-zinc-800 bg-zinc-950/60 px-4 py-3
                            text-sm text-zinc-200 placeholder-zinc-600 outline-hidden
                            transition focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50
                            disabled:opacity-50
                          "
                        />
                      </div>

                      {/* Email */}
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          disabled={status === "loading"}
                          required
                          maxLength={120}
                          placeholder="john@example.com"
                          className="
                            w-full rounded-xl border border-zinc-800 bg-zinc-950/60 px-4 py-3
                            text-sm text-zinc-200 placeholder-zinc-600 outline-hidden
                            transition focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50
                            disabled:opacity-50
                          "
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                        Your Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        disabled={status === "loading"}
                        required
                        maxLength={2000}
                        placeholder="Hello, I would like to build..."
                        className="
                          w-full rounded-xl border border-zinc-800 bg-zinc-950/60 px-4 py-3
                          text-sm text-zinc-200 placeholder-zinc-600 outline-hidden resize-none
                          transition focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50
                          disabled:opacity-50
                        "
                      />
                    </div>

                    {/* Error display */}
                    {status === "error" && errorMessage && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-xs text-red-400"
                      >
                        ⚠️ {errorMessage}
                      </motion.div>
                    )}

                    {/* Submit Button */}
                    <div className="pt-2">
                      <Magnetic>
                        <button
                          type="submit"
                          disabled={status === "loading"}
                          className="
                            inline-flex items-center justify-center gap-2
                            rounded-xl bg-blue-600 px-8 py-3
                            text-sm font-semibold text-white transition
                            hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/20
                            disabled:bg-blue-600/50 disabled:cursor-not-allowed
                          "
                        >
                          {status === "loading" ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                              </svg>
                              Sending...
                            </>
                          ) : (
                            "Send Message"
                          )}
                        </button>
                      </Magnetic>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
