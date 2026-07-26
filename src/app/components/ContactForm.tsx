"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
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

interface ContactFormProps {
  onSuccess?: () => void;
  inline?: boolean;
}

export default function ContactForm({ onSuccess, inline }: ContactFormProps) {
  const t = useTranslations("contactForm");

  const formSchema = z.object({
    name: z.string().min(1, t('errors.nameRequired')).max(80, t('errors.nameTooLong')),
    email: z
      .string()
      .min(1, t('errors.emailRequired'))
      .email(t('errors.emailInvalid')),
    message: z
      .string()
      .min(1, t('errors.messageRequired'))
      .max(2000, t('errors.messageTooLong')),
    company: z.string().optional(),
  });

  type FormData = z.infer<typeof formSchema>;

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
      showToast({ status: "success", title: t('toastSuccessTitle'), description: t('toastSuccessDesc') });
      setTimeout(() => {
        setStatus("idle");
        onSuccess?.();
      }, 2000);
    } catch (e) {
      setStatus("error");
      const msg = e instanceof Error ? e.message : "Something went wrong";
      setErrorMessage(msg);
      showToast({ status: "error", title: t('toastErrorTitle'), description: t('toastErrorDesc', { message: msg }) });
    }
  }, [reset, showToast, onSuccess, t]);

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
          <Label htmlFor="name">{t('nameLabel')}</Label>
          <Input
            id="name"
            placeholder={t('namePlaceholder')}
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
          <Label htmlFor="email">{t('emailLabel')}</Label>
          <Input
            id="email"
            type="email"
            placeholder={t('emailPlaceholder')}
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
          <Label htmlFor="message">{t('messageLabel')}</Label>
          <Textarea
            id="message"
            placeholder={t('messagePlaceholder')}
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
          loadingText={t('sendingButton')}
          successText={t('successButton')}
          errorText={t('errorButton')}
        >
          {t('sendButton')}
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
