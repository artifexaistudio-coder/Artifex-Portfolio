"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { HeroIllustration } from "@/components/sections/HeroIllustration";

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function HeroSection() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] mt-24">
      <div
        className={cn(
          "relative overflow-hidden rounded-3xl border border-white/10",
          "bg-gradient-to-br from-primary/10 via-dark to-secondary/10"
        )}
      >
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(circle at 30% 20%, rgba(236,72,153,0.18), transparent 55%), radial-gradient(circle at 70% 60%, rgba(6,182,212,0.12), transparent 60%), radial-gradient(circle at 55% 90%, rgba(99,102,241,0.16), transparent 55%)"
          }}
          aria-hidden="true"
        />
        <div className="absolute inset-0" aria-hidden="true" />

        <div className="relative z-10 min-h-[calc(100vh-4rem)] flex items-center px-6 sm:px-10 py-16">
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Text */}
            <div className="w-full max-w-3xl">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-xs tracking-[0.35em] text-white/60 uppercase"
              >
                Artifex AI Studio
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.05 }}
                className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight"
              >
                <span className="text-white">Where AI Helps You Start </span>
                <span className="gradient-text">"The Un-stoppable"</span>
                <span className="text-white"> Phase</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.12 }}
                className="mt-5 max-w-2xl text-base sm:text-lg text-white/70"
              >
                Transform your company with intelligent AI agents, AI receptionists, and custom-built websites and applications.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.18 }}
                className="mt-10 flex flex-col sm:flex-row gap-3"
              >
                <button
                  type="button"
                  onClick={() => scrollToId("services")}
                  className={cn(
                    "rounded-xl px-6 py-3 font-semibold text-white text-left sm:text-center",
                    "bg-gradient-to-r from-primary to-secondary",
                    "shadow-[0_0_30px_rgba(99,102,241,0.35)] hover:shadow-[0_0_50px_rgba(99,102,241,0.6)]",
                    "transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
                  )}
                  aria-label="View Services"
                >
                  View Services
                </button>
                <button
                  type="button"
                  onClick={() => scrollToId("contact")}
                  className="rounded-xl px-6 py-3 font-semibold text-white/90 glass hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
                  aria-label="Start your project"
                >
                  Start Your Project
                </button>
              </motion.div>

              <div className="mt-10 flex flex-wrap gap-2">
                {["AI Agents", "AI Receptionist", "Custom Website Building", "App Building"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/70"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* Right Column: Illustration Animation */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full flex justify-center lg:justify-end"
            >
              <HeroIllustration />
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
}
