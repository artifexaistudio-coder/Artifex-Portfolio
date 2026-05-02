"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

/* ── Nav ── */
export function ElysianNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 w-full z-50 px-8 py-5 transition-all duration-700"
      style={{
        background: scrolled ? "rgba(253,251,247,0.92)" : "rgba(0,0,0,0.15)",
        backdropFilter: "blur(20px) saturate(1.4)",
        WebkitBackdropFilter: "blur(20px) saturate(1.4)",
        borderBottom: scrolled ? "1px solid rgba(196,185,154,0.15)" : "1px solid rgba(255,255,255,0.08)",
        boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.06)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <span className="elysian-heading text-xl tracking-[0.25em]" style={{ color: scrolled ? "#2a2a2a" : "#fff" }}>
          ELYSIAN VOWS
        </span>
        <div className="hidden md:flex items-center gap-10">
          {["Weddings", "The Curation", "Process", "Contact"].map((item) => (
            <a
              key={item}
              href={`#elysian-${item.toLowerCase().replace(" ", "-")}`}
              className="elysian-label text-[10px] transition-colors duration-300"
              style={{ color: scrolled ? "#9a8e70" : "rgba(255,255,255,0.75)" }}
            >
              {item}
            </a>
          ))}
        </div>
        <Link
          href="/"
          className="elysian-label text-[10px] border-l pl-8 ml-2 transition-colors duration-300"
          style={{
            borderColor: scrolled ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.2)",
            color: scrolled ? "#9a8e70" : "rgba(255,255,255,0.5)",
          }}
        >
          Artifex
        </Link>
      </div>
    </motion.nav>
  );
}

/* ── Hero ── */
export function ElysianHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Much gentler parallax — less travel = smoother feel
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  // Remove contentY — it fights with browser scroll and causes jerk

  return (
    <section
      ref={ref}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
    >
      {/* Background parallax — uses will-change for GPU compositing */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y, willChange: "transform" }}
      >
        <img
          src="/images/work/elysian-vows/hero.png"
          alt="Luxury wedding ceremony at sunset"
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.72) saturate(1.05)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />
      </motion.div>

      {/* Content — NO transform, only opacity fade */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-5xl w-full"
        style={{ opacity }}
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="elysian-label text-white/80 mb-8 block tracking-[0.5em]"
        >
          The Art of Celebration
        </motion.span>

        <motion.h1
          className="elysian-heading text-white font-light leading-[0.9]"
          style={{ fontSize: "clamp(4rem, 12vw, 9rem)" }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          Ethereal{" "}
          <em className="elysian-serif-italic font-normal" style={{ color: "#f5efdf" }}>
            Moments
          </em>
        </motion.h1>

        <motion.p
          className="elysian-heading text-lg sm:text-xl text-white/80 mt-8 font-light italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
        >
          Crafting timeless vows into opulent realities.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <a
            href="#elysian-contact"
            className="elysian-btn"
            style={{ color: "white", borderColor: "rgba(255,255,255,0.5)" }}
          >
            Begin Your Journey
          </a>
          <a
            href="#elysian-weddings"
            className="elysian-label text-[10px] text-white/60 hover:text-white transition-colors"
          >
            View Our Work ↓
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
        style={{ opacity }}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        <div className="w-[1px] h-14 bg-gradient-to-b from-transparent via-white/50 to-transparent" />
        <span className="elysian-label text-[9px] text-white/40 tracking-[0.4em]">Scroll</span>
      </motion.div>
    </section>
  );
}

/* ── Stats Bar ── */
function useCountUp(target: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

function StatItem({ value, suffix, label, delay }: { value: number; suffix: string; label: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true); }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const count = useCountUp(value, 1800, started);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className="text-center py-12 px-6 border-r border-[#c4b99a]/15 last:border-r-0 flex-1"
    >
      <p className="elysian-heading text-4xl sm:text-5xl font-light" style={{ color: "#2a2a2a" }}>
        {count}<span style={{ color: "#c4b99a" }}>{suffix}</span>
      </p>
      <p className="elysian-label text-[10px] mt-3" style={{ color: "#9a8e70" }}>{label}</p>
    </motion.div>
  );
}

export function ElysianStats() {
  return (
    <section className="bg-white border-y border-[#c4b99a]/15">
      <div className="max-w-5xl mx-auto flex flex-wrap sm:flex-nowrap divide-y sm:divide-y-0 divide-[#c4b99a]/10">
        <StatItem value={247}  suffix="+"  label="Weddings Curated"     delay={0}    />
        <StatItem value={32}   suffix=""   label="Countries"            delay={0.1}  />
        <StatItem value={15}   suffix="+"  label="Years of Excellence"  delay={0.2}  />
        <StatItem value={100}  suffix="%"  label="Bespoke Experiences"  delay={0.3}  />
      </div>
    </section>
  );
}

/* ── Awards Marquee ── */
const AWARDS = [
  "Vogue Weddings — Top Planner 2024",
  "Harper's Bazaar Bride — Best Luxury Studio",
  "Condé Nast Traveller — Wedding of the Year",
  "The Knot — Hall of Fame",
  "Martha Stewart Weddings — Editor's Pick",
  "Tatler — Most Exclusive Planner",
  "Brides Magazine — Top 10 Global",
];

export function ElysianAwardsStrip() {
  const text = AWARDS.join("   ·   ") + "   ·   ";
  return (
    <section className="bg-[#fdfbf7] py-4 overflow-hidden border-b border-[#c4b99a]/10">
      <div className="elysian-awards-marquee whitespace-nowrap">
        <span className="elysian-label text-[10px] tracking-[0.3em]" style={{ color: "#c4b99a" }}>
          {text}{text}{text}
        </span>
      </div>
    </section>
  );
}
