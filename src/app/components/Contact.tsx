"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, Loader2, Check } from "lucide-react";
import { easeOut } from "../utils/animations";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  name: z.string().min(1, "Name is required").max(80, "Name is too long"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),
  message: z
    .string()
    .min(1, "Message is required")
    .max(2000, "Message is too long"),
  company: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", message: "", company: "" },
  });

  const onSubmit = useCallback(
    async (data: FormData) => {
      if (data.company) return;
      setStatus("loading");
      setErrorMessage("");
      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        const body = await res.json();
        if (!res.ok) throw new Error(body.error || "Failed to send");
        setStatus("success");
        reset();
      } catch (e) {
        setStatus("error");
        setErrorMessage(e instanceof Error ? e.message : "Something went wrong");
      }
    },
    [reset],
  );

  return (
    <section id="contact" className="bg-canvas-alt py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <div className="rounded-[20px] bg-canvas-glass backdrop-blur-xl shadow-lg shadow-black/30 p-8 md:p-12">
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
                  className="display-xl leading-tight text-ink"
                >
                  Let&rsquo;s Build
                </motion.h2>
                <motion.h2
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease: easeOut, delay: 0.1 }}
                  className="display-xl leading-tight text-ink"
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
              {status === "success" ? (
                <div className="flex flex-col items-center gap-4 py-10 text-center animate-in fade-in duration-300">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground/10">
                    <Check size={24} className="text-foreground" />
                  </div>
                  <div className="space-y-1">
                    <p className="body-base font-bold text-ink">Message sent!</p>
                    <p className="body-small text-ink-muted">
                      I&rsquo;ll get back to you soon.
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setStatus("idle")}
                  >
                    Send another
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <input
                    type="text"
                    {...register("company")}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <div className="space-y-1.5">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      disabled={status === "loading"}
                      aria-invalid={errors.name ? true : undefined}
                      {...register("name")}
                    />
                    {errors.name && (
                      <p className="text-xs text-destructive">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      disabled={status === "loading"}
                      aria-invalid={errors.email ? true : undefined}
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="text-xs text-destructive">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="What are you building?"
                      rows={4}
                      disabled={status === "loading"}
                      aria-invalid={errors.message ? true : undefined}
                      {...register("message")}
                    />
                    {errors.message && (
                      <p className="text-xs text-destructive">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 size={14} className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={14} />
                        Send Message
                      </>
                    )}
                  </Button>

                  {status === "error" && (
                    <p className="text-xs text-destructive text-center">
                      {errorMessage}
                    </p>
                  )}
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
