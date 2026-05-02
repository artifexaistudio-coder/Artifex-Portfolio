"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

/* ── Nav ── */
export function AuraNav() {
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
      transition={{ delay: 1.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`aura-nav fixed top-4 left-1/2 -translate-x-1/2 z-50 px-8 py-3 rounded-full flex items-center gap-8 ${
        scrolled ? "scrolled" : ""
      }`}
    >
      <span className="aura-heading text-lg tracking-[0.15em] text-white font-normal">AURA</span>
      <div className="hidden sm:flex items-center gap-6">
        {["Work", "Philosophy", "Process", "Contact"].map((item) => (
          <a
            key={item}
            href={`#aura-${item.toLowerCase()}`}
            className="aura-body text-[11px] tracking-[0.2em] uppercase text-white/60 hover:text-[#c4b99a] transition-colors duration-500 font-medium"
          >
            {item}
          </a>
        ))}
      </div>
      <Link
        href="/"
        className="aura-body text-[10px] tracking-[0.15em] uppercase text-white/40 hover:text-[#c4b99a] transition-colors duration-500 border-l border-white/10 pl-6 ml-2 font-medium"
      >
        Artifex
      </Link>
    </motion.nav>
  );
}

/* ── Hero ── */
export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  const headingWords = ["Spaces", "that", "breathe"];

  return (
    <section ref={ref} className="relative h-[120vh] w-full overflow-hidden" id="aura-hero">
      {/* Parallax background — lighter overlays for sharper image */}
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        <img
          src="/images/work/aura/hero.png"
          alt="Aura — Luxury double-height living room with mountain views"
          className="w-full h-full object-cover"
          style={{ filter: "brightness(1.08) contrast(1.05) saturate(1.1)" }}
        />
        {/* Much lighter overlay — let the image breathe */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-[#0c0b09]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 flex h-screen flex-col justify-end pb-24 px-6 sm:px-12 lg:px-24"
        style={{ opacity }}
      >
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex items-center gap-4 mb-8"
        >
          <div className="w-12 h-[1px] bg-[#c4b99a]" />
          <span className="aura-label text-[#c4b99a] font-semibold">Architecture & Interiors</span>
        </motion.div>

        {/* Heading */}
        <h1 className="aura-heading text-5xl sm:text-7xl lg:text-[7rem] xl:text-[8.5rem] leading-[0.9] text-white max-w-5xl">
          {headingWords.map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.15, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className={`inline-block mr-[0.3em] ${
                word === "breathe" ? "italic font-normal text-[#c4b99a]" : "font-light"
              }`}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="aura-body mt-8 text-base sm:text-lg text-white/80 max-w-lg leading-relaxed font-normal"
        >
          Crafting residences where light, material, and landscape converge into
          singular living experiences.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mt-10 flex items-center gap-6"
        >
          <a
            href="#aura-work"
            className="aura-btn-primary aura-body text-[11px] tracking-[0.2em]"
          >
            View Our Work
          </a>
          <a
            href="#aura-contact"
            className="aura-body text-[11px] tracking-[0.2em] uppercase text-white/50 hover:text-[#c4b99a] transition-colors duration-500 font-medium"
          >
            Begin a Project →
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="mt-14 flex items-center gap-4"
        >
          <div className="relative w-[1px] h-16 overflow-hidden">
            <motion.div
              animate={{ y: ["-100%", "100%"] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              className="absolute w-full h-1/2 bg-gradient-to-b from-transparent via-[#c4b99a] to-transparent"
            />
          </div>
          <span className="aura-body text-[10px] tracking-[0.3em] uppercase text-white/50 font-medium">
            Scroll to discover
          </span>
        </motion.div>
      </motion.div>

      {/* Year badge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-24 right-12 z-10 hidden lg:block"
      >
        <span className="aura-body text-[11px] tracking-[0.25em] text-white/40 uppercase font-medium">
          Est. 2019
        </span>
      </motion.div>
    </section>
  );
}

/* ── Marquee ── */
export function MarqueeSection() {
  const text = "Architecture · Interiors · Landscape · Renovation · Curation · ";
  return (
    <section className="relative bg-[#0c0b09] py-6 overflow-hidden border-y border-white/5">
      <div className="aura-marquee whitespace-nowrap">
        <span className="aura-heading text-6xl sm:text-8xl font-light text-white/[0.04] tracking-wide">
          {text}{text}{text}{text}
        </span>
      </div>
    </section>
  );
}

/* ── Animated Stats Bar ── */
function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
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
  const isInView = useInView(ref);
  const [started, setStarted] = useState(false);
  useEffect(() => { if (isInView && !started) setStarted(true); }, [isInView, started]);
  const count = useCountUp(value, 1800, started);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="text-center px-8 py-10 border-r border-white/[0.06] last:border-r-0 flex-1"
    >
      <p className="aura-heading text-4xl sm:text-5xl lg:text-6xl text-white font-light">
        {count}<span className="text-[#c4b99a]">{suffix}</span>
      </p>
      <p className="aura-label text-white/45 mt-3">{label}</p>
    </motion.div>
  );
}

function useInView(ref: React.RefObject<HTMLElement | null>) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref]);
  return inView;
}

export function StatsSection() {
  return (
    <section className="bg-[#0c0b09] border-b border-white/[0.06]">
      <div className="mx-auto max-w-6xl flex flex-wrap sm:flex-nowrap divide-y sm:divide-y-0 divide-white/[0.06]">
        <StatItem value={47}  suffix="+"  label="Residences Completed"  delay={0}    />
        <StatItem value={12}  suffix=""   label="Cities Across India"    delay={0.1}  />
        <StatItem value={8}   suffix="+"  label="Years of Mastery"       delay={0.2}  />
        <StatItem value={100} suffix="%"  label="Client Satisfaction"    delay={0.3}  />
      </div>
    </section>
  );
}

/* ── Awards Strip ── */
const AWARDS = [
  "AD100 India 2024",
  "Elle Decor Grand Prix",
  "Architectural Digest — Best Studio",
  "FX International Interior Design Awards",
  "Dezeen Awards Longlist",
  "Wallpaper* Design Award",
  "JK Cement — Architecture Excellence",
  "Surface Design Show — Winner",
];

export function AwardsStrip() {
  const text = AWARDS.join("  ·  ") + "  ·  ";
  return (
    <section className="bg-[#080706] py-5 overflow-hidden border-b border-white/[0.04]">
      <div className="aura-awards-marquee whitespace-nowrap">
        <span className="aura-body text-[11px] tracking-[0.25em] uppercase text-[#c4b99a]/50 font-medium">
          {text}{text}{text}
        </span>
      </div>
    </section>
  );
}
