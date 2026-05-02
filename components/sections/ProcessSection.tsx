"use client";

import { useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { SectionHeader, SectionShell } from "@/components/sections/SectionShell";
import { cn } from "@/lib/utils";

type Step = {
  num: string;
  icon: string;
  title: string;
  description: string;
};

const STEPS: Step[] = [
  {
    num: "01",
    icon: "🔍",
    title: "Discovery & Research",
    description: "We dive deep into your brand, audience, and goals"
  },
  {
    num: "02",
    icon: "🧠",
    title: "AI-Powered Analysis",
    description: "Our AI tools analyze market trends and competitor strategies"
  },
  {
    num: "03",
    icon: "✨",
    title: "Creative Development",
    description: "We design and develop your solution with cutting-edge AI"
  },
  {
    num: "04",
    icon: "🔬",
    title: "Testing & Refinement",
    description: "Rigorous testing ensures perfection before launch"
  },
  {
    num: "05",
    icon: "🚀",
    title: "Launch & Support",
    description: "We deploy and provide ongoing optimization"
  }
];

export function ProcessSection() {
  const lineRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const isMobile = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(max-width: 640px)").matches;
  }, []);

  useEffect(() => {
    const line = lineRef.current;
    const container = containerRef.current;
    if (!line || !container) return;

    const ctx = gsap.context(() => {
      gsap.set(line, { scaleX: 0, transformOrigin: "0% 50%" });

      const io = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting) return;
          gsap.to(line, { scaleX: 1, duration: 1.1, ease: "power3.out" });
          io.disconnect();
        },
        { threshold: 0.35 }
      );

      io.observe(container);
      return () => io.disconnect();
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <SectionShell id="process">
      <div className="flex flex-col gap-10">
        <SectionHeader
          eyebrow="Process"
          title="A fast, focused pipeline"
          subtitle="A five-step timeline designed for speed, clarity, and premium results."
        />

        <div
          ref={containerRef}
          className={cn(
            "relative glass rounded-3xl border border-white/10 p-6 sm:p-8"
          )}
        >
          <div className="relative">
            <div
              className={cn(
                "absolute left-6 right-6 top-[38px] h-px bg-white/10",
                "hidden sm:block"
              )}
              aria-hidden="true"
            />
            <div
              ref={lineRef}
              className={cn(
                "absolute left-6 right-6 top-[38px] h-px",
                "hidden sm:block"
              )}
              style={{
                background:
                  "linear-gradient(90deg, rgba(99,102,241,0.0), rgba(99,102,241,0.95), rgba(6,182,212,0.8), rgba(236,72,153,0.65))"
              }}
              aria-hidden="true"
            />

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 sm:gap-5">
              {STEPS.map((s, idx) => (
                <motion.div
                  key={s.num}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-120px" }}
                  transition={{ duration: 0.55, delay: idx * 0.06 }}
                  className={cn(
                    "relative rounded-2xl p-5 sm:p-4",
                    "bg-white/0 border border-white/0 hover:border-white/10 hover:bg-white/5 transition-colors"
                  )}
                >
                  <div className="flex items-center justify-between sm:flex-col sm:items-start sm:gap-3">
                    <span className="text-xs tracking-[0.25em] text-white/55">
                      {s.num}
                    </span>
                    <span className="text-2xl" aria-hidden="true">
                      {s.icon}
                    </span>
                  </div>
                  <h3 className="mt-3 text-base font-bold text-white">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm text-white/70 leading-relaxed">
                    {s.description}
                  </p>
                  {isMobile && idx !== STEPS.length - 1 && (
                    <div
                      className="mt-4 h-px bg-white/10"
                      aria-hidden="true"
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

