"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionShell({
  id,
  children,
  className
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("py-20 sm:py-24", className)}>
      {children}
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs tracking-[0.35em] text-white/60 uppercase">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight">
        <span className="gradient-text">{title}</span>
      </h2>
      <p className="mt-4 text-base sm:text-lg text-white/70">{subtitle}</p>
    </div>
  );
}

