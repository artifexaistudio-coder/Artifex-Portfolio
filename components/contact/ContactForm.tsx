"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";
import { cn } from "@/lib/utils";

export type ContactFormValues = {
  name: string;
  email: string;
  phone: string;
  service: string;
  budget: number;
  timeline: string;
  message: string;
};

const SERVICE_OPTIONS = [
  "AI Interior Visualization",
  "Creative Ad Campaigns",
  "Web Development",
  "AI Agent Development",
  "App Building",
  "Not sure yet"
] as const;

const TIMELINES = ["ASAP", "1 month", "2–3 months", "Flexible"] as const;

function formatINR(value: number) {
  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(value);
  } catch {
    return `₹${Math.round(value).toLocaleString("en-IN")}`;
  }
}

type Props = {
  variant?: "full" | "compact";
  onSuccess?: () => void;
  className?: string;
};

export function ContactForm({ variant = "full", onSuccess, className }: Props) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<ContactFormValues>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "Not sure yet",
      budget: 100000,
      timeline: "Flexible",
      message: ""
    },
    mode: "onChange"
  });

  const messageLen = watch("message")?.length ?? 0;

  const onSubmit = async (data: ContactFormValues) => {
    if (!formspreeId) {
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.65 } });
      onSuccess?.();
      setTimeout(() => router.push("/thank-you"), 3000);
      return;
    }

    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append("name", data.name);
      fd.append("email", data.email);
      fd.append("phone", data.phone);
      fd.append("service", data.service);
      fd.append("budget", String(data.budget));
      fd.append("timeline", data.timeline);
      fd.append("message", data.message);
      const file = fileRef.current?.files?.[0];
      if (file) fd.append("attachment", file);

      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        body: fd,
        headers: { Accept: "application/json" }
      });

      if (!res.ok) throw new Error("Submit failed");

      confetti({ particleCount: 100, spread: 75, origin: { y: 0.65 } });
      onSuccess?.();
      setTimeout(() => router.push("/thank-you"), 3000);
    } catch {
      alert("Something went wrong. Please email hello@artifexai.studio directly.");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (!formspreeId && process.env.NODE_ENV === "development") {
      // eslint-disable-next-line no-console
      console.info(
        "Set NEXT_PUBLIC_FORMSPREE_FORM_ID in .env.local to enable Formspree submissions."
      );
    }
  }, [formspreeId]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("flex flex-col gap-4", className)}
      noValidate
    >
      <div className={cn("grid gap-4", variant === "full" ? "sm:grid-cols-2" : "grid-cols-1")}>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-white/70" htmlFor="cf-name">
            Name <span className="text-[#EC4899]">*</span>
          </label>
          <input
            id="cf-name"
            className={cn(
              "rounded-xl border bg-white/5 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-accent/60",
              errors.name ? "border-[#EC4899]/60" : "border-white/10"
            )}
            {...register("name", { required: "Name is required" })}
            aria-invalid={!!errors.name}
          />
          {errors.name && (
            <p className="text-xs text-[#EC4899]">{errors.name.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-white/70" htmlFor="cf-email">
            Email <span className="text-[#EC4899]">*</span>
          </label>
          <input
            id="cf-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            className={cn(
              "rounded-xl border bg-white/5 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-accent/60",
              errors.email ? "border-[#EC4899]/60" : "border-white/10"
            )}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email"
              }
            })}
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <p className="text-xs text-[#EC4899]">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm text-white/70" htmlFor="cf-phone">
          Phone <span className="text-white/40">(optional)</span>
        </label>
        <input
          id="cf-phone"
          type="tel"
          className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-accent/60"
          {...register("phone")}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm text-white/70" htmlFor="cf-service">
          Service interested in
        </label>
        <select
          id="cf-service"
          className="rounded-xl border border-white/10 bg-[#0F172A] px-4 py-3 text-white outline-none focus:ring-2 focus:ring-accent/60"
          {...register("service")}
        >
          {SERVICE_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-4">
          <label className="text-sm text-white/70" htmlFor="cf-budget">
            Project budget
          </label>
          <span className="text-sm font-semibold text-white">
            {watch("budget") >= 500000 ? "₹5,00,000+" : formatINR(watch("budget"))}
          </span>
        </div>
        <input
          id="cf-budget"
          type="range"
          min={5000}
          max={500000}
          step={5000}
          className="w-full accent-[#06B6D4]"
          {...register("budget", { valueAsNumber: true })}
        />
        <div className="flex justify-between text-xs text-white/50">
          <span>₹5,000</span>
          <span>₹5,00,000+</span>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm text-white/70" htmlFor="cf-timeline">
          Timeline
        </label>
        <select
          id="cf-timeline"
          className="rounded-xl border border-white/10 bg-[#0F172A] px-4 py-3 text-white outline-none focus:ring-2 focus:ring-accent/60"
          {...register("timeline")}
        >
          {TIMELINES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <label className="text-sm text-white/70" htmlFor="cf-message">
            Message <span className="text-[#EC4899]">*</span>
          </label>
          <span className="text-xs text-white/45">{messageLen} / 50 min</span>
        </div>
        <textarea
          id="cf-message"
          rows={variant === "compact" ? 4 : 6}
          className={cn(
            "min-h-[120px] rounded-xl border bg-white/5 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-accent/60",
            errors.message ? "border-[#EC4899]/60" : "border-white/10"
          )}
          {...register("message", {
            required: "Message is required",
            minLength: { value: 50, message: "Please write at least 50 characters" }
          })}
          aria-invalid={!!errors.message}
        />
        {messageLen > 0 && messageLen < 50 && (
          <p className="text-xs text-amber-300/90">
            {50 - messageLen} more characters needed
          </p>
        )}
        {errors.message && (
          <p className="text-xs text-[#EC4899]">{errors.message.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm text-white/70" htmlFor="cf-file">
          Reference files <span className="text-white/40">(optional)</span>
        </label>
        <input
          id="cf-file"
          ref={fileRef}
          type="file"
          className="text-sm text-white/70 file:mr-3 file:rounded-lg file:border-0 file:bg-white/10 file:px-3 file:py-2 file:text-white"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className={cn(
          "relative overflow-hidden rounded-xl px-6 py-3 font-semibold text-white",
          "bg-gradient-to-r from-primary to-secondary",
          "shadow-[0_0_30px_rgba(99,102,241,0.35)] transition-shadow hover:shadow-[0_0_50px_rgba(99,102,241,0.55)]",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/70",
          submitting && "opacity-70"
        )}
      >
        {submitting ? "Sending…" : "Send message"}
      </button>

      <p className="text-xs text-white/50">
        We typically reply within <span className="text-white/70">24 hours</span>. You’ll be redirected
        to a confirmation page after submit.
      </p>
    </form>
  );
}
