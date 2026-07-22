"use client";

import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { StatefulButton } from "@/components/motion/button/stateful";
import {
  AnimatedToastStack,
  useAnimatedToastStack,
} from "@/components/motion/animated-toast-stack";

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

interface ContactFormProps {
  onSuccess?: () => void;
  inline?: boolean;
}

export default function ContactForm({ onSuccess, inline }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const { toasts, showToast, dismissToast } = useAnimatedToastStack({ limit: 3 });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", message: "", company: "" },
  });

  const onSubmit = useCallback(async (data: FormData) => {
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
      showToast({ status: "success", title: "Message sent!", description: "I'll get back to you soon." });
      setTimeout(() => {
        setStatus("idle");
        onSuccess?.();
      }, 2000);
    } catch (e) {
      setStatus("error");
      const msg = e instanceof Error ? e.message : "Something went wrong";
      setErrorMessage(msg);
      showToast({ status: "error", title: "Failed to send", description: msg });
    }
  }, [reset, showToast, onSuccess]);

  return (
    <>
      {!inline && (
        <AnimatedToastStack
          toasts={toasts}
          onDismiss={dismissToast}
          position="bottom-right"
          placement="fixed"
          maxVisible={3}
        />
      )}
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
            placeholder="Your name…"
            disabled={status === "loading"}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "name-error" : undefined}
            {...register("name")}
          />
          {errors.name && (
            <p id="name-error" role="alert" className="text-xs text-destructive">
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com…"
            disabled={status === "loading"}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "email-error" : undefined}
            {...register("email")}
          />
          {errors.email && (
            <p id="email-error" role="alert" className="text-xs text-destructive">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            placeholder="What are you building?…"
            rows={4}
            disabled={status === "loading"}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={errors.message ? "message-error" : undefined}
            {...register("message")}
          />
          {errors.message && (
            <p id="message-error" role="alert" className="text-xs text-destructive">
              {errors.message.message}
            </p>
          )}
        </div>

        <StatefulButton
          type="submit"
          state={status}
          variant="primary"
          size="md"
          className="w-full"
          loadingText="Sending..."
          successText="Sent!"
          errorText="Try again"
        >
          Send Message
        </StatefulButton>

        {status === "error" && (
          <p role="alert" className="text-xs text-destructive text-center">
            {errorMessage}
          </p>
        )}
      </form>
    </>
  );
}
