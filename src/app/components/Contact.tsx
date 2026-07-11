"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Check, AlertTriangle, X, Calendar, Loader2 } from "lucide-react";
import Button from "./ui/Button";
import CopyEmail from "./ui/CopyEmail";
import { staggerContainer, staggerItem, easeOut } from "../utils/animations";

const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL || "";
const HAS_CALENDLY = !!process.env.NEXT_PUBLIC_CALENDLY_URL;

function CharCounter({ current, max }: { current: number; max: number }) {
  const remaining = max - current;
  const isClose = remaining < max * 0.1;
  return (
    <span className={`text-[10px] font-mono tabular-nums transition-colors duration-200 ${isClose ? "text-amber-400" : "text-zinc-600"}`}>
      {current}/{max}
    </span>
  );
}

type FormFields = "name" | "email" | "message";

function validate(field: FormFields, value: string): string {
  if (field === "name") return value.trim() ? "" : "Name is required";
  if (field === "email") {
    if (!value.trim()) return "Email is required";
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "" : "Please enter a valid email";
  }
  if (field === "message") {
    if (!value.trim()) return "Message is required";
    return value.trim().length < 10 ? "Message must be at least 10 characters" : "";
  }
  return "";
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    company: "",
  });

  const [touched, setTouched] = useState<Record<FormFields, boolean>>({ name: false, email: false, message: false });
  const [fieldErrors, setFieldErrors] = useState<Record<FormFields, string>>({ name: "", email: "", message: "" });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const [showScheduler, setShowScheduler] = useState(false);
  const [iframeLoading, setIframeLoading] = useState(true);
  const [showPlaceholderWarning, setShowPlaceholderWarning] = useState(!HAS_CALENDLY);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched[name as FormFields]) {
      setFieldErrors((prev) => ({ ...prev, [name]: validate(name as FormFields, value) }));
    }
  };

  const handleBlur = (field: FormFields) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setFieldErrors((prev) => ({ ...prev, [field]: validate(field, formData[field]) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched = { name: true, email: true, message: true };
    setTouched(allTouched);
    const errors = {
      name: validate("name", formData.name),
      email: validate("email", formData.email),
      message: validate("message", formData.message),
    };
    setFieldErrors(errors);
    const hasError = Object.values(errors).some(Boolean);
    if (hasError) {
      setErrorMessage("Please fix the highlighted fields before submitting.");
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
        setTouched({ name: false, email: false, message: false });
        setFieldErrors({ name: "", email: "", message: "" });
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
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col lg:grid lg:grid-cols-12 gap-10 lg:gap-16 items-start"
        >
          {/* LEFT COLUMN: Info & Scheduler Trigger */}
          <motion.div variants={staggerItem} className="lg:col-span-5 w-full space-y-8">
            <div className="space-y-4">
              <p className="micro-cap text-ink-muted">Get In Touch</p>
              <h2 className="display-xl leading-tight">
                Let&rsquo;s Build
                <br />
                Something Elite
              </h2>
              <p className="body-lg">
                Have an active product requirement, need an engineer to scale operations, or want to audit your UI architecture? Reach out below.
              </p>
            </div>

            {/* Info Stacks */}
            <div className="space-y-4 pt-2">
              {/* Availability */}
              <motion.div
                whileHover={{ y: -3 }}
                transition={{ duration: 0.25, ease: easeOut }}
                className="p-4 border border-hairline rounded-sm bg-canvas-card hover:shadow-sm transition-shadow duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-sm border border-hairline text-ink-muted">
                    <span className="relative flex h-2 w-2" aria-hidden="true">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ink-muted opacity-75" aria-hidden="true" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-ink" aria-hidden="true" />
                    </span>
                  </div>
                  <div>
                    <h4 className="micro-cap text-ink-muted">Availability</h4>
                    <p className="body-md text-ink font-semibold">Open for contracts & full-time roles</p>
                  </div>
                </div>
              </motion.div>

              {/* Email */}
              <motion.div
                whileHover={{ y: -3 }}
                transition={{ duration: 0.25, ease: easeOut }}
                className="p-4 border border-hairline rounded-sm bg-canvas-card hover:shadow-sm transition-shadow duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-sm border border-hairline text-ink-muted">
                    <Mail size={16} aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="micro-cap text-ink-muted">Email Inbox</h4>
                    <CopyEmail email="kenzamariyan32@gmail.com" />
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Contact Form */}
          <motion.div variants={staggerItem} className="lg:col-span-7 w-full">
            {/* Calendly - prominent above form */}
            <div className="mb-6">
              <motion.button
                onClick={() => setShowScheduler(true)}
                disabled={!HAS_CALENDLY}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.25, ease: easeOut }}
                title={HAS_CALENDLY ? "Book a 15-min discovery call" : "Configure NEXT_PUBLIC_CALENDLY_URL in .env.local"}
                className="inline-flex w-full items-center justify-center gap-3 rounded-sm border border-hairline bg-canvas-card px-6 py-4 button-cap text-ink cursor-pointer hover:bg-hairline hover:shadow-sm disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <Calendar size={18} aria-hidden="true" />
                <span>Schedule a 15-min Discovery Call</span>
                <span className="caption text-ink-muted px-2.5 py-1 rounded-sm border border-hairline">Book now</span>
              </motion.button>
            </div>
            <div className="rounded-sm border border-hairline bg-canvas-card p-6 md:p-8">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success-message"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center text-center py-16 space-y-5"
                  >
                    <motion.div
                      initial={{ scale: 0, rotate: -15 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                      className="h-12 w-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center"
                    >
                      <Check size={24} className="text-emerald-400" />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="space-y-2"
                    >
                      <h3 className="text-lg font-bold text-white font-display">Message Dispatched</h3>
                      <p className="body-small max-w-sm mx-auto">
                        Thank you for reaching out. I have received your operational parameters and will respond within 24 hours.
                      </p>
                    </motion.div>
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
                        <label htmlFor="name" className="micro-cap text-ink-muted">
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          onBlur={() => handleBlur("name")}
                          disabled={status === "loading"}
                          required
                          maxLength={80}
                          placeholder="John Doe…"
                          autoComplete="name"
                          aria-invalid={touched.name && fieldErrors.name ? true : undefined}
                          className={`
                            w-full rounded-md border bg-white/5 px-4 py-3
                            text-base text-white placeholder-zinc-600 outline-hidden
                            transition focus:ring-0
                            disabled:opacity-50
                            ${touched.name && fieldErrors.name ? "border-red-500/60 focus:border-red-500" : "border-hairline focus:border-ink focus:ring-1 focus:ring-inset focus:ring-ink/20"}
                          `}
                        />
                        <div className="flex justify-end min-h-[18px]">
                          {touched.name && fieldErrors.name ? (
                            <span className="text-[10px] text-red-400">{fieldErrors.name}</span>
                          ) : (
                            <CharCounter current={formData.name.length} max={80} />
                          )}
                        </div>
                      </div>

                      {/* Email */}
                      <div className="space-y-2">
                        <label htmlFor="email" className="micro-cap text-ink-muted">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          onBlur={() => handleBlur("email")}
                          disabled={status === "loading"}
                          required
                          maxLength={120}
                          placeholder="john@example.com…"
                          autoComplete="email"
                          aria-invalid={touched.email && fieldErrors.email ? true : undefined}
                          className={`
                            w-full rounded-md border bg-white/5 px-4 py-3
                            text-base text-white placeholder-zinc-600 outline-hidden
                            transition focus:ring-0
                            disabled:opacity-50
                            ${touched.email && fieldErrors.email ? "border-red-500/60 focus:border-red-500" : "border-hairline focus:border-ink focus:ring-1 focus:ring-inset focus:ring-ink/20"}
                          `}
                        />
                        <div className="flex justify-end min-h-[18px]">
                          {touched.email && fieldErrors.email ? (
                            <span className="text-[10px] text-red-400">{fieldErrors.email}</span>
                          ) : (
                            <CharCounter current={formData.email.length} max={120} />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <label htmlFor="message" className="micro-cap text-ink-muted">
                        Your Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        onBlur={() => handleBlur("message")}
                        disabled={status === "loading"}
                        required
                        maxLength={2000}
                          placeholder="Detail your requirements here…"
                        aria-invalid={touched.message && fieldErrors.message ? true : undefined}
                        className={`
                          w-full rounded-md border bg-white/5 px-4 py-3
                          text-base text-white placeholder-zinc-600 outline-hidden resize-none
                          transition focus:ring-0
                          disabled:opacity-50
                            ${touched.message && fieldErrors.message ? "border-red-500/60 focus:border-red-500" : "border-hairline focus:border-ink focus:ring-1 focus:ring-inset focus:ring-ink/20"}
                        `}
                      />
                      <div className="flex justify-end min-h-[18px]">
                        {touched.message && fieldErrors.message ? (
                          <span className="text-[10px] text-red-400">{fieldErrors.message}</span>
                        ) : (
                          <CharCounter current={formData.message.length} max={2000} />
                        )}
                      </div>
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
                      >
                        {status === "loading" ? (
                          <span className="inline-flex items-center gap-2">
                            <Loader2 size={14} className="animate-spin" />
                            Sending...
                          </span>
                        ) : (
                          "Send Message"
                        )}
                      </Button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
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
              style={{ overscrollBehavior: "contain" }}
            />
            
            {/* Modal box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-4xl h-full max-h-[85dvh] min-h-[350px] sm:min-h-[500px] overflow-hidden rounded-sm border border-hairline bg-canvas z-10 flex flex-col"
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
              <div className="flex-1 w-full bg-surface-tile-1 relative">
                {showPlaceholderWarning ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center space-y-6 bg-surface-tile-1">
                    <div className="h-12 w-12 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                      <Calendar size={22} className="text-indigo-400" />
                    </div>
                    <div className="space-y-2 max-w-md">
                      <h4 className="text-sm font-bold text-white font-display">Configure Your Booking Link</h4>
                      <p className="body-small">
                        Currently, this modal points to the placeholder URL: <code className="text-[10px] bg-white/5 px-1.5 py-0.5 rounded font-mono text-indigo-300">{CALENDLY_URL}</code> which returns a 404 error page.
                      </p>
                      <p className="text-xs text-zinc-500 leading-relaxed pt-2">
                        To connect your real calendar, set <code className="text-[10px] bg-white/5 px-1.5 py-0.5 rounded font-mono text-indigo-300">NEXT_PUBLIC_CALENDLY_URL</code> in your <span className="font-mono text-zinc-300">.env.local</span> file.
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
                      <div className="absolute inset-0 flex flex-col items-center justify-center space-y-3 bg-surface-tile-1">
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
