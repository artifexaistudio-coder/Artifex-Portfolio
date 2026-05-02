"use client";

import { cn } from "@/lib/utils";

export function HeroSectionFallback() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden rounded-3xl mt-24 glass">
      <div
        className={cn(
          "absolute inset-0",
          "bg-gradient-to-br from-primary/30 via-dark to-secondary/25"
        )}
        aria-hidden="true"
      />
      <div
        className="absolute -inset-24 opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 30% 20%, rgba(236,72,153,0.22), transparent 55%), radial-gradient(circle at 70% 60%, rgba(6,182,212,0.18), transparent 60%), radial-gradient(circle at 55% 90%, rgba(99,102,241,0.18), transparent 55%)"
        }}
        aria-hidden="true"
      />
      <div className="relative z-10 text-center px-6 py-20">
        <p className="text-xs tracking-[0.35em] text-white/60 uppercase">
          Artifex AI Studio
        </p>
        <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
          <span className="gradient-text">Where AI Meets</span>{" "}
          <span className="text-white">Creative Excellence</span>
        </h1>
        <p className="mt-5 max-w-2xl mx-auto text-base sm:text-lg text-white/70">
          Transform your vision into reality with AI-powered design, development,
          and marketing solutions
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="#portfolio"
            className="rounded-xl px-6 py-3 font-semibold text-white bg-gradient-to-r from-primary to-secondary shadow-[0_0_30px_rgba(99,102,241,0.35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
          >
            Explore Our Work
          </a>
          <a
            href="#contact"
            className="rounded-xl px-6 py-3 font-semibold text-white/90 glass hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
          >
            Start Your Project
          </a>
        </div>
      </div>
    </div>
  );
}

