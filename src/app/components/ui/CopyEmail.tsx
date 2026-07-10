"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Copy, Check } from "lucide-react";

interface CopyEmailProps {
  email: string;
  className?: string;
}

export default function CopyEmail({ email, className = "" }: CopyEmailProps) {
  const reduced = useReducedMotion();
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = email;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [email]);

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`btn-press inline-flex items-center gap-2 text-xs text-zinc-200 font-semibold hover:text-indigo-400 transition-colors text-left ${className}`}
    >
      <span>{email}</span>
      <span className="relative h-4 w-4 shrink-0">
        <AnimatePresence mode="wait">
          {copied ? (
            <motion.span
              key="check"
              initial={reduced ? {} : { opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduced ? {} : { opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center text-emerald-400"
            >
              <Check size={14} aria-hidden="true" />
            </motion.span>
          ) : (
            <motion.span
              key="copy"
              initial={reduced ? {} : { opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduced ? {} : { opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center text-zinc-500"
            >
              <Copy size={14} aria-hidden="true" />
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </button>
  );
}
