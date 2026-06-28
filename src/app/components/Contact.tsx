"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Check, AlertTriangle, X, Calendar } from "lucide-react";
import Button from "./ui/Button";
import GlowCard from "./ui/GlowCard";
import { slideLeft, slideRight } from "../utils/animations";

// TODO: Ganti URL di bawah dengan tautan Calendly/Cal.com Anda yang aktif
// Contoh: "https://calendly.com/kenzamariyan/15min" atau "https://cal.com/kenzamariyan/15min"
const CALENDLY_URL = "https://calendly.com/kenzamariyan32/15-minute-discovery-call";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    company: "", // Honeypot
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const [showScheduler, setShowScheduler] = useState(false);
  const [iframeLoading, setIframeLoading] = useState(true);
  const [showPlaceholderWarning, setShowPlaceholderWarning] = useState(CALENDLY_URL.includes("kenzamariyan/15min"));

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
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          company: formData.company,
        }),
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

  const handleCloseScheduler = () => {
    setShowScheduler(false);
    setIframeLoading(true);
    setShowPlaceholderWarning(CALENDLY_URL.includes("kenzamariyan/15min"));
  };

  return (
    <section
      id="contact"
      className="relative bg-canvas py-24 md:py-28 border-b border-white/5"
    >
      <div className="relative mx-auto max-w-6xl px-6 md:px-8">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-16 items-start">
          
          {/* LEFT COLUMN: Info & Scheduler Trigger */}
          <motion.div
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-5 w-full space-y-8"
          >
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">Get In Touch</p>
              <h2 className="display-lg tracking-tight text-white leading-tight">
                Let’s Build
                <br />
                Something Elite
              </h2>
              <p className="body-base">
                Have an active product requirement, need an engineer to scale operations, or want to audit your UI architecture? Reach out below.
              </p>
            </div>

            {/* Info Stacks */}
            <div className="space-y-4 pt-2">
              {/* Availability */}
              <GlowCard glowColor="rgba(16, 185, 129, 0.08)" radialSize={200} className="p-4 bg-zinc-950/40 border-white/10 hover:border-white/20">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-black text-emerald-400 border border-white/10">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider font-display">Availability</h4>
                    <p className="text-xs text-zinc-200 font-semibold">Open for contracts & full-time roles</p>
                  </div>
                </div>
              </GlowCard>

              {/* Email */}
              <GlowCard glowColor="rgba(99, 102, 241, 0.08)" radialSize={200} className="p-4 bg-zinc-950/40 border-white/10 hover:border-white/20">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-black text-indigo-400 border border-white/10">
                    <Mail size={16} />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider font-display">Email Inbox</h4>
                    <a href="mailto:kenzamariyan32@gmail.com" className="text-xs text-zinc-200 font-semibold hover:text-indigo-400 transition-colors">
                      kenzamariyan32@gmail.com
                    </a>
                  </div>
                </div>
              </GlowCard>
            </div>

            {/* Calendly Booking Trigger */}
            <div className="pt-2">
              <button
                onClick={() => setShowScheduler(true)}
                className="btn-press inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-xs font-semibold text-white hover:border-white/20 hover:bg-white/10 w-full sm:w-auto justify-center sm:justify-start cursor-pointer"
              >
                <span>Schedule a 15-min Call</span>
                <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded font-mono">Book now</span>
              </button>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Contact Form */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-7 w-full"
          >
            <div className="rounded-xl border border-white/10 bg-surface-tile-1 p-6 md:p-8">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success-message"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center text-center py-16 space-y-5"
                  >
                    <div className="h-12 w-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center">
                      <Check size={24} className="text-emerald-400" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-white font-display">Message Dispatched</h3>
                      <p className="body-small max-w-sm mx-auto">
                        Thank you for reaching out. I have received your operational parameters and will respond within 24 hours.
                      </p>
                    </div>
                    <button
                      onClick={() => setStatus("idle")}
                      className="text-xs text-primary-on-dark hover:text-white font-medium underline underline-offset-4 cursor-pointer"
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
                    aria-describedby={status === "error" ? "form-error" : undefined}
                  >
                    {/* Bot Honeypot */}
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
                        <label htmlFor="name" className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider font-display">
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
                          aria-invalid={status === "error" ? true : undefined}
                          className="
                            w-full rounded-md border border-white/5 bg-white/5 px-4 py-3
                            text-base text-white placeholder-zinc-600 outline-hidden
                            transition focus:border-indigo-500 focus:ring-0
                            disabled:opacity-50
                          "
                        />
                      </div>

                      {/* Email */}
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider font-display">
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
                          aria-invalid={status === "error" ? true : undefined}
                          className="
                            w-full rounded-md border border-white/5 bg-white/5 px-4 py-3
                            text-base text-white placeholder-zinc-600 outline-hidden
                            transition focus:border-indigo-500 focus:ring-0
                            disabled:opacity-50
                          "
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider font-display">
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
                        placeholder="Detail your requirements here..."
                        aria-invalid={status === "error" ? true : undefined}
                        className="
                          w-full rounded-md border border-white/5 bg-white/5 px-4 py-3
                          text-base text-white placeholder-zinc-600 outline-hidden resize-none
                          transition focus:border-indigo-500 focus:ring-0
                          disabled:opacity-50
                        "
                      />
                    </div>

                    {/* Error indicator */}
                    {status === "error" && errorMessage && (
                      <motion.div
                        id="form-error"
                        role="alert"
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-md border border-red-500/10 bg-red-500/5 p-4 text-xs text-red-400"
                      >
                        <AlertTriangle size={14} className="inline-block -mt-0.5 mr-1 shrink-0" /> {errorMessage}
                      </motion.div>
                    )}

                    {/* Submit Button */}
                    <div className="pt-2 flex justify-start">
                      <Button
                        type="submit"
                        disabled={status === "loading"}
                        className="btn-press cursor-pointer"
                      >
                        {status === "loading" ? "Dispatching..." : "Send Message"}
                      </Button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
          
        </div>
      </div>

      {/* Real Calendly Scheduler Modal */}
      <AnimatePresence>
        {showScheduler && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            {/* Modal overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseScheduler}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            
            {/* Modal box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-4xl h-full max-h-[85dvh] min-h-[500px] overflow-hidden rounded-2xl border border-white/10 bg-[#09090b] shadow-2xl z-10 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-zinc-950/50">
                <div>
                  <h3 className="text-sm font-bold text-white font-display">Schedule Discovery Call</h3>
                  <p className="text-[11px] text-zinc-500">Select an available slot on my calendar below.</p>
                </div>
                <button
                  onClick={handleCloseScheduler}
                  className="rounded-full p-1.5 hover:bg-white/5 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Iframe container */}
              <div className="flex-1 w-full bg-[#09090b] relative">
                {showPlaceholderWarning ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center space-y-6 bg-[#09090b]">
                    <div className="h-12 w-12 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                      <Calendar size={22} className="text-indigo-400" />
                    </div>
                    <div className="space-y-2 max-w-md">
                      <h4 className="text-sm font-bold text-white font-display">Configure Your Booking Link</h4>
                      <p className="body-small">
                        Currently, this modal points to the placeholder URL: <code className="text-[10px] bg-white/5 px-1.5 py-0.5 rounded font-mono text-indigo-300">{CALENDLY_URL}</code> which returns a 404 error page.
                      </p>
                      <p className="text-xs text-zinc-500 leading-relaxed pt-2">
                        To connect your real calendar, open <span className="font-mono text-zinc-300">src/app/components/Contact.tsx</span> and change the <code className="text-zinc-300">CALENDLY_URL</code> variable at the top of the file to your active link.
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={handleCloseScheduler}
                        className="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-semibold text-white hover:bg-white/10 transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => setShowPlaceholderWarning(false)}
                        className="rounded-full bg-indigo-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-indigo-500 transition-colors cursor-pointer"
                      >
                        Force Preview Anyway
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {iframeLoading && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center space-y-3 bg-[#09090b]">
                        <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
                        <p className="text-xs text-zinc-500">Connecting to calendar...</p>
                      </div>
                    )}
                    <iframe
                      src={`${CALENDLY_URL}?hide_landing_page_details=1&hide_gdpr_banner=1&background_color=09090b&text_color=ffffff&primary_color=6366f1`}
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      onLoad={() => setIframeLoading(false)}
                      className="w-full h-full"
                    />
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
