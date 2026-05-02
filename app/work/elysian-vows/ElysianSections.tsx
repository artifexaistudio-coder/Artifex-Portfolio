"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-4 mb-5">
      <div className="w-8 h-[1px] bg-[#c4b99a]/50" />
      <span className="elysian-label text-[10px]" style={{ color: "#9a8e70" }}>{children}</span>
    </div>
  );
}

/* ── Wedding Stories — Auto Carousel (replaces broken horizontal scroll) ── */
const STORIES = [
  {
    title: "A Venetian Romance",
    location: "Venice, Italy",
    image: "/images/work/elysian-vows/gallery-4.png",
    desc: "A three-day celebration across the canals, merging classical Italian opulence with modern luxury.",
    guests: "280 guests",
    duration: "3 days",
  },
  {
    title: "The Golden Vow",
    location: "Udaipur, India",
    image: "/images/work/elysian-vows/gallery-1.png",
    desc: "A regal palace wedding bathed in gold leaf and marigold, celebrating timeless heritage in the City of Lakes.",
    guests: "450 guests",
    duration: "4 days",
  },
  {
    title: "Celestial Serenity",
    location: "Amalfi Coast, Italy",
    image: "/images/work/elysian-vows/hero.png",
    desc: "A minimalist cliffside ceremony at golden hour, with the Mediterranean as your witness.",
    guests: "80 guests",
    duration: "2 days",
  },
  {
    title: "Garden of Stars",
    location: "Provence, France",
    image: "/images/work/elysian-vows/gallery-4.png",
    desc: "An outdoor dinner under chandeliers and fairy lights, winding through ancient oaks at twilight.",
    guests: "200 guests",
    duration: "2 days",
  },
];

export function WeddingStories() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const paginate = (dir: number) => {
    setDirection(dir);
    setCurrent((prev) => {
      const next = prev + dir;
      if (next < 0) return STORIES.length - 1;
      if (next >= STORIES.length) return 0;
      return next;
    });
  };

  const s = STORIES[current];

  return (
    <section className="bg-white py-24 sm:py-32 px-6 sm:px-12" id="elysian-weddings">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-14">
          <div>
            <FadeIn><SectionLabel>Wedding Stories</SectionLabel></FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="elysian-heading text-4xl sm:text-6xl font-light" style={{ color: "#2a2a2a" }}>
                Legacy of <em className="elysian-serif-italic">Love</em>
              </h2>
            </FadeIn>
          </div>
          {/* Arrow controls */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => paginate(-1)}
              className="w-12 h-12 rounded-full border border-[#c4b99a]/30 flex items-center justify-center hover:border-[#c4b99a] hover:bg-[#c4b99a]/5 transition-all duration-500"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9a8e70" strokeWidth="1.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            </button>
            <button
              onClick={() => paginate(1)}
              className="w-12 h-12 rounded-full border border-[#c4b99a]/30 flex items-center justify-center hover:border-[#c4b99a] hover:bg-[#c4b99a]/5 transition-all duration-500"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9a8e70" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>

        {/* Main story card */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden rounded-sm shadow-xl">
          {/* Image */}
          <div className="relative h-[50vh] lg:h-[65vh] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Image src={s.image} alt={s.title} fill className="object-cover" />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current + "text"}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col justify-center p-10 sm:p-14 bg-[#fdfbf7]"
            >
              <span className="elysian-label text-[9px] mb-4" style={{ color: "#9a8e70" }}>{s.location}</span>
              <h3 className="elysian-heading text-3xl sm:text-4xl font-light mb-6" style={{ color: "#2a2a2a" }}>
                {s.title}
              </h3>
              <p className="text-sm leading-relaxed mb-8" style={{ color: "rgba(42,42,42,0.65)" }}>
                {s.desc}
              </p>
              <div className="flex gap-8 pt-8 border-t border-[#c4b99a]/15">
                <div>
                  <p className="elysian-heading text-2xl font-light" style={{ color: "#c4b99a" }}>{s.guests}</p>
                  <p className="elysian-label text-[9px] mt-1" style={{ color: "#9a8e70" }}>In Attendance</p>
                </div>
                <div>
                  <p className="elysian-heading text-2xl font-light" style={{ color: "#c4b99a" }}>{s.duration}</p>
                  <p className="elysian-label text-[9px] mt-1" style={{ color: "#9a8e70" }}>Celebration</p>
                </div>
              </div>

              {/* Dots */}
              <div className="flex items-center gap-2 mt-10">
                {STORIES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                    className="transition-all duration-500 rounded-full"
                    style={{
                      width: i === current ? "24px" : "8px",
                      height: "8px",
                      background: i === current ? "#c4b99a" : "rgba(196,185,154,0.25)",
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ── The Curation ── */
export function TheCuration() {
  return (
    <section className="py-24 sm:py-32 px-6 sm:px-12 bg-[#fdfbf7]" id="elysian-the-curation">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-end mb-20">
          <FadeIn>
            <SectionLabel>The Curation</SectionLabel>
            <h2 className="elysian-heading text-4xl sm:text-5xl lg:text-6xl font-light leading-tight" style={{ color: "#2a2a2a" }}>
              Where <em className="elysian-serif-italic text-[#c4b99a]">opulence</em><br />meets emotion.
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-base leading-relaxed" style={{ color: "rgba(42,42,42,0.65)" }}>
              We don't just plan events — we curate legacies. Every fabric, every flower, every note of music is chosen to tell your unique story with uncompromising elegance.
            </p>
          </FadeIn>
        </div>

        {/* Asymmetric gallery */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5">
          {/* Large left */}
          <FadeIn className="md:col-span-7">
            <div className="relative overflow-hidden rounded-sm" style={{ height: "70vh" }}>
              <Image
                src="/images/work/elysian-vows/gallery-2.png"
                alt="Luxury wedding ballroom"
                fill
                className="object-cover transition-transform duration-[1.2s] hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-8">
                <p className="elysian-label text-white/70 text-[9px] mb-1">The Grand Ballroom</p>
                <p className="elysian-heading text-xl text-white font-light">Opulent Receptions</p>
              </div>
            </div>
          </FadeIn>

          {/* Right column — two stacked */}
          <div className="md:col-span-5 flex flex-col gap-4 sm:gap-5">
            <FadeIn delay={0.15}>
              <div className="relative overflow-hidden rounded-sm" style={{ height: "34vh" }}>
                <Image
                  src="/images/work/elysian-vows/gallery-3.png"
                  alt="Outdoor evening wedding"
                  fill
                  className="object-cover transition-transform duration-[1.2s] hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                  <p className="elysian-label text-white/70 text-[9px] mb-1">Al Fresco Dining</p>
                  <p className="elysian-heading text-lg text-white font-light">Under the Stars</p>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.25}>
              <div className="relative overflow-hidden rounded-sm" style={{ height: "34vh" }}>
                <Image
                  src="/images/work/elysian-vows/gallery-1.png"
                  alt="Bridal suite"
                  fill
                  className="object-cover transition-transform duration-[1.2s] hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                  <p className="elysian-label text-white/70 text-[9px] mb-1">Bridal Preparation</p>
                  <p className="elysian-heading text-lg text-white font-light">The Couture Moment</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Process ── */
const STEPS = [
  { num: "01", title: "Inception", desc: "A private consultation to understand the soul of your celebration — your vision, values, and dreams." },
  { num: "02", title: "Design", desc: "Crafting the complete visual and sensory narrative — from colour palettes to floral philosophy." },
  { num: "03", title: "Curation", desc: "Selecting the world's finest artisans, venues, musicians, and culinary talents for your day." },
  { num: "04", title: "The Vow", desc: "Seamless, invisible execution so you experience only joy — every detail perfectly orchestrated." },
];

export function TheVowProcess() {
  return (
    <section className="py-24 sm:py-32 px-6 sm:px-12 bg-white" id="elysian-process">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20">
          <div>
            <FadeIn><SectionLabel>Our Methodology</SectionLabel></FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="elysian-heading text-4xl sm:text-5xl font-light leading-tight" style={{ color: "#2a2a2a" }}>
                The Path to <em className="elysian-serif-italic text-[#c4b99a]">Elysium</em>
              </h2>
            </FadeIn>
          </div>
          <FadeIn delay={0.2}>
            <p className="text-base leading-relaxed mt-4" style={{ color: "rgba(42,42,42,0.6)" }}>
              Our four-phase methodology ensures the magic of your initial vision is preserved and elevated through every stage of creation.
            </p>
          </FadeIn>
        </div>

        <div className="space-y-0">
          {STEPS.map((step, i) => (
            <FadeIn key={step.num} delay={i * 0.08}>
              <motion.div
                className="group grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-8 items-start py-10 border-t border-[#c4b99a]/15"
                whileHover={{ x: 8 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="elysian-heading text-3xl font-light italic sm:col-span-2" style={{ color: "rgba(196,185,154,0.35)" }}>
                  {step.num}
                </span>
                <h3
                  className="elysian-heading text-2xl sm:text-3xl font-light sm:col-span-3 group-hover:text-[#c4b99a] transition-colors duration-500"
                  style={{ color: "#2a2a2a" }}
                >
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed sm:col-span-7" style={{ color: "rgba(42,42,42,0.6)" }}>
                  {step.desc}
                </p>
              </motion.div>
            </FadeIn>
          ))}
          <div className="border-t border-[#c4b99a]/15" />
        </div>
      </div>
    </section>
  );
}

/* ── Testimonials ── */
const TESTIMONIALS = [
  {
    quote: "Elysian Vows didn't plan our wedding. They composed a symphony of moments we will carry for a lifetime. Every detail whispered luxury, every gesture breathed love.",
    author: "Isabelle & Charles Fontaine",
    location: "Château de Vaux, France",
  },
  {
    quote: "From the first consultation to the final dance, the team anticipated every desire before we even voiced it. It was the most extraordinary experience of our lives.",
    author: "Priya & Aryan Kapoor",
    location: "City Palace, Udaipur",
  },
  {
    quote: "We asked for a wedding. Elysian delivered a legend. Our guests still speak of it as the most beautiful event they have ever witnessed.",
    author: "Sofia & Alessandro Mancini",
    location: "Villa Cimbrone, Ravello",
  },
  {
    quote: "Three hundred guests from forty countries. One seamless, breathtaking day. We could not have imagined it possible without the Elysian team.",
    author: "Catherine & William Ashford",
    location: "Claridge's, London",
  },
];

export function ElysianTestimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const paginate = (dir: number) => {
    setDirection(dir);
    setCurrent((prev) => {
      const next = prev + dir;
      if (next < 0) return TESTIMONIALS.length - 1;
      if (next >= TESTIMONIALS.length) return 0;
      return next;
    });
  };

  const t = TESTIMONIALS[current];

  return (
    <section
      className="relative py-32 sm:py-44 px-6 sm:px-12 overflow-hidden"
      style={{ background: "#fdfbf7" }}
    >
      {/* Subtle background image */}
      <div className="absolute inset-0">
        <Image src="/images/work/elysian-vows/gallery-3.png" alt="" fill className="object-cover opacity-[0.06]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <FadeIn><SectionLabel>Client Words</SectionLabel></FadeIn>

        {/* Big quote mark */}
        <p className="elysian-heading text-8xl font-light mb-4" style={{ color: "rgba(196,185,154,0.2)", lineHeight: 1 }}>"</p>

        <div className="relative min-h-[180px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 40 : -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -40 : 40 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <blockquote
                className="elysian-heading text-xl sm:text-2xl lg:text-3xl font-light italic leading-snug"
                style={{ color: "#2a2a2a" }}
              >
                {t.quote}
              </blockquote>
              <div className="mt-10 mb-8 mx-auto max-w-[100px] h-[1px]" style={{ background: "linear-gradient(90deg, transparent, #c4b99a, transparent)" }} />
              <p className="elysian-label text-[11px] tracking-[0.25em]" style={{ color: "#c4b99a" }}>
                {t.author}
              </p>
              <p className="elysian-label text-[10px] mt-2" style={{ color: "rgba(42,42,42,0.4)" }}>
                {t.location}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mt-12">
          <button onClick={() => paginate(-1)} className="w-11 h-11 rounded-full border border-[#c4b99a]/25 flex items-center justify-center hover:border-[#c4b99a]/60 transition-all">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9a8e70" strokeWidth="1.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          </button>
          <div className="flex gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                className="rounded-full transition-all duration-500"
                style={{
                  width: i === current ? "20px" : "7px",
                  height: "7px",
                  background: i === current ? "#c4b99a" : "rgba(196,185,154,0.25)",
                }}
              />
            ))}
          </div>
          <button onClick={() => paginate(1)} className="w-11 h-11 rounded-full border border-[#c4b99a]/25 flex items-center justify-center hover:border-[#c4b99a]/60 transition-all">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9a8e70" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>
    </section>
  );
}

/* ── Instagram Feed ── */
const FEED = [
  { src: "/images/work/elysian-vows/hero.png",      caption: "When the aisle meets the sea.", likes: "12.4k" },
  { src: "/images/work/elysian-vows/gallery-1.png", caption: "The gown. The moment. Forever.", likes: "8.7k" },
  { src: "/images/work/elysian-vows/gallery-2.png", caption: "Gold, light, and a thousand roses.", likes: "15.2k" },
  { src: "/images/work/elysian-vows/gallery-3.png", caption: "Dinner under a thousand stars.", likes: "18.9k" },
  { src: "/images/work/elysian-vows/gallery-4.png", caption: "Every detail, deliberate.", likes: "9.3k" },
  { src: "/images/work/elysian-vows/hero.png",      caption: "Love, elevated.", likes: "11.1k" },
  { src: "/images/work/elysian-vows/gallery-2.png", caption: "The grandeur of a true celebration.", likes: "7.8k" },
  { src: "/images/work/elysian-vows/gallery-3.png", caption: "Begin your eternal story.", likes: "14.6k" },
  { src: "/images/work/elysian-vows/gallery-1.png", caption: "Crafted for the extraordinary.", likes: "10.2k" },
];

export function ElysianInstagram() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="py-24 sm:py-32 px-6 sm:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="flex items-end justify-between mb-12">
            <div>
              <SectionLabel>Follow Our Journey</SectionLabel>
              <h2 className="elysian-heading text-3xl sm:text-5xl font-light" style={{ color: "#2a2a2a" }}>
                <em className="elysian-serif-italic text-[#c4b99a]">@elysianvows</em>
              </h2>
            </div>
            <div className="hidden sm:block text-right">
              <p className="elysian-heading text-3xl font-light" style={{ color: "#2a2a2a" }}>284k</p>
              <p className="elysian-label text-[10px] mt-1" style={{ color: "#9a8e70" }}>Followers</p>
            </div>
          </div>
        </FadeIn>

        <div className="grid grid-cols-3 gap-1 sm:gap-2">
          {FEED.map((post, i) => (
            <FadeIn key={i} delay={i * 0.03}>
              <motion.div
                className="relative aspect-square overflow-hidden cursor-pointer"
                onHoverStart={() => setHovered(i)}
                onHoverEnd={() => setHovered(null)}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                <img
                  src={post.src}
                  alt={post.caption}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ transform: hovered === i ? "scale(1.08)" : "scale(1)", transition: "transform 0.8s cubic-bezier(0.22,1,0.36,1)" }}
                />
                <AnimatePresence>
                  {hovered === i && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4"
                      style={{ background: "rgba(253,251,247,0.75)", backdropFilter: "blur(4px)" }}
                    >
                      <div className="flex items-center gap-2">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="#c4b99a">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                        </svg>
                        <span className="elysian-label text-[10px]" style={{ color: "#9a8e70" }}>{post.likes}</span>
                      </div>
                      <p className="elysian-label text-[9px] text-center leading-relaxed" style={{ color: "rgba(42,42,42,0.7)" }}>
                        {post.caption}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <div className="mt-10 text-center">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="elysian-label text-[10px] inline-flex items-center gap-3 hover:text-[#c4b99a] transition-colors duration-500"
              style={{ color: "rgba(42,42,42,0.4)" }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg>
              Follow on Instagram
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ── Previous Events Gallery ── */
const EVENT_GALLERY = [
  {
    title: "The Fontaine Wedding",
    location: "Château de Vaux-le-Vicomte, France",
    date: "September 2024",
    image: "/images/work/elysian-vows/gallery-4.png",
    tag: "Grand Estate",
    guests: "320",
    desc: "A three-day celebration across the grand estate, merging classical French opulence with modern luxury florals.",
  },
  {
    title: "The Kapoor Celebration",
    location: "City Palace, Udaipur",
    date: "February 2024",
    image: "/images/work/elysian-vows/gallery-1.png",
    tag: "Palace Wedding",
    guests: "450",
    desc: "A regal four-day palace wedding bathed in gold leaf, marigold, and the romance of Rajasthan.",
  },
  {
    title: "An Evening in Provence",
    location: "Domaine de la Baume, France",
    date: "June 2024",
    image: "/images/work/elysian-vows/gallery-3.png",
    tag: "Garden Soirée",
    guests: "180",
    desc: "An outdoor dinner under crystal chandeliers and fairy lights, winding through 500-year-old oak trees.",
  },
  {
    title: "The Ashford Gala",
    location: "Claridge's Ballroom, London",
    date: "December 2023",
    image: "/images/work/elysian-vows/gallery-2.png",
    tag: "Black Tie",
    guests: "290",
    desc: "An intimate black-tie celebration in London's most iconic ballroom, adorned with white orchids and candlelight.",
  },
];

export function PreviousEventsWalkthrough() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="py-24 sm:py-32 px-6 sm:px-12 bg-white" id="elysian-events">
      <div className="max-w-7xl mx-auto">
        <FadeIn><SectionLabel>Previous Events</SectionLabel></FadeIn>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14">
          <FadeIn delay={0.1}>
            <h2 className="elysian-heading text-4xl sm:text-5xl font-light" style={{ color: "#2a2a2a" }}>
              A legacy of <em className="elysian-serif-italic text-[#c4b99a]">unforgettable</em> days
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="elysian-label text-[10px]" style={{ color: "#9a8e70" }}>
              {EVENT_GALLERY.length} Curated Events
            </p>
          </FadeIn>
        </div>

        {/* Scroll gallery — 2 cols on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {EVENT_GALLERY.map((ev, i) => (
            <FadeIn key={i} delay={i * 0.07}>
              <motion.div
                className="group relative overflow-hidden rounded-sm cursor-pointer"
                style={{ aspectRatio: "4/3" }}
                onHoverStart={() => setHovered(i)}
                onHoverEnd={() => setHovered(null)}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Image */}
                <img
                  src={ev.image}
                  alt={ev.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s]"
                  style={{ transform: hovered === i ? "scale(1.06)" : "scale(1)" }}
                />

                {/* Always-visible bottom gradient + label */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                {/* Tag badge */}
                <div
                  className="absolute top-4 left-4 px-3 py-1.5"
                  style={{
                    background: "rgba(253,251,247,0.88)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <span className="elysian-label text-[9px]" style={{ color: "#9a8e70" }}>{ev.tag}</span>
                </div>

                {/* Bottom info — always visible */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="elysian-label text-[9px] mb-2" style={{ color: "rgba(255,255,255,0.6)" }}>
                        {ev.location}
                      </p>
                      <h3 className="elysian-heading text-2xl sm:text-3xl font-light text-white">
                        {ev.title}
                      </h3>
                    </div>
                    <div className="text-right flex-shrink-0 ml-4">
                      <p className="elysian-heading text-2xl font-light" style={{ color: "#c4b99a" }}>
                        {ev.guests}
                      </p>
                      <p className="elysian-label text-[9px]" style={{ color: "rgba(255,255,255,0.5)" }}>
                        Guests
                      </p>
                    </div>
                  </div>

                  {/* Hover reveal description */}
                  <motion.p
                    animate={{ opacity: hovered === i ? 1 : 0, y: hovered === i ? 0 : 8 }}
                    transition={{ duration: 0.4 }}
                    className="text-sm mt-3 leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.7)" }}
                  >
                    {ev.desc}
                  </motion.p>

                  {/* Date */}
                  <motion.div
                    animate={{ opacity: hovered === i ? 1 : 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="flex items-center gap-2 mt-3"
                  >
                    <div className="w-4 h-[1px]" style={{ background: "#c4b99a" }} />
                    <span className="elysian-label text-[9px]" style={{ color: "#c4b99a" }}>{ev.date}</span>
                  </motion.div>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Back to Top Button ── */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show as soon as hero is scrolled past
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.85);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-8 left-8 z-50 flex flex-col items-center gap-2 group"
          aria-label="Back to top"
        >
          <div
            className="w-11 h-11 flex items-center justify-center border transition-all duration-500"
            style={{
              background: "rgba(253,251,247,0.85)",
              backdropFilter: "blur(12px)",
              borderColor: "rgba(196,185,154,0.3)",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLDivElement).style.background = "#c4b99a";
              (e.currentTarget as HTMLDivElement).style.borderColor = "#c4b99a";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLDivElement).style.background = "rgba(253,251,247,0.85)";
              (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(196,185,154,0.3)";
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9a8e70" strokeWidth="1.5">
              <path d="M12 19V5M5 12l7-7 7 7"/>
            </svg>
          </div>
          <span className="elysian-label text-[8px] opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ color: "#9a8e70" }}>
            Top
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ── Virtual Experience Section ── */
const VIRTUAL_ROOMS = [
  { id: 1, x: 15, y: 48, label: "The Grand Aisle",   sub: "40m floral canopy · rose petals",  img: "/images/work/elysian-vows/hero.png" },
  { id: 2, x: 38, y: 28, label: "Champagne Terrace", sub: "Sunset cocktails · harp duo",       img: "/images/work/elysian-vows/gallery-4.png" },
  { id: 3, x: 62, y: 55, label: "The Banquet Hall",  sub: "Crystal chandeliers · 30 tables",   img: "/images/work/elysian-vows/gallery-2.png" },
  { id: 4, x: 80, y: 35, label: "Bridal Pavilion",   sub: "Couture suite · gold leaf ceiling", img: "/images/work/elysian-vows/gallery-1.png" },
];

export function VirtualExperience() {
  const [activeRoom, setActiveRoom] = useState<number | null>(null);
  const [previewRoom, setPreviewRoom] = useState(0);

  return (
    <section className="py-24 sm:py-32 px-6 sm:px-12 bg-[#fdfbf7]" id="elysian-virtual">
      <div className="max-w-7xl mx-auto">
        <FadeIn><SectionLabel>Virtual Experience</SectionLabel></FadeIn>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-14">
          <FadeIn delay={0.1}>
            <h2 className="elysian-heading text-4xl sm:text-5xl font-light leading-tight" style={{ color: "#2a2a2a" }}>
              Step inside your <em className="elysian-serif-italic" style={{ color: "#c4b99a" }}>dream venue</em><br />before you decide
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-base leading-relaxed" style={{ color: "rgba(42,42,42,0.6)" }}>
              Hover over the glowing points to explore each space. We provide full immersive walkthroughs for every Elysian event — so you can feel your celebration before it begins.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <FadeIn delay={0.1} className="lg:col-span-2">
            <div className="relative overflow-hidden rounded-sm" style={{ aspectRatio: "4/3" }}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={previewRoom}
                  src={VIRTUAL_ROOMS[previewRoom].img}
                  alt="Venue tour"
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7 }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-black/25" />

              {VIRTUAL_ROOMS.map((room, i) => (
                <div key={room.id} className="absolute" style={{ left: `${room.x}%`, top: `${room.y}%` }}
                  onMouseEnter={() => { setActiveRoom(i); setPreviewRoom(i); }}
                  onMouseLeave={() => setActiveRoom(null)}
                >
                  <div className="relative cursor-pointer">
                    <motion.div
                      animate={{ scale: [1, 2.2, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ repeat: Infinity, duration: 2.2, delay: i * 0.55 }}
                      className="absolute inset-0 rounded-full"
                      style={{ background: "rgba(196,185,154,0.45)" }}
                    />
                    <motion.div
                      animate={{ scale: activeRoom === i ? 1.3 : 1 }}
                      transition={{ duration: 0.3 }}
                      className="w-4 h-4 rounded-full border-2 border-white/80 relative z-10 shadow-lg"
                      style={{ background: "#c4b99a" }}
                    />
                  </div>
                  <AnimatePresence>
                    {activeRoom === i && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        className="absolute bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap z-20"
                      >
                        <div className="px-4 py-3 text-center" style={{ background: "rgba(253,251,247,0.96)", backdropFilter: "blur(12px)", border: "1px solid rgba(196,185,154,0.3)" }}>
                          <p className="elysian-label text-[10px]" style={{ color: "#2a2a2a" }}>{room.label}</p>
                          <p className="elysian-label text-[9px] mt-0.5" style={{ color: "#9a8e70" }}>{room.sub}</p>
                        </div>
                        <div className="w-2 h-2 mx-auto -mt-1 rotate-45" style={{ background: "rgba(253,251,247,0.96)", border: "1px solid rgba(196,185,154,0.3)", borderTop: "none", borderLeft: "none" }} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              <div className="absolute top-4 left-4 px-4 py-2" style={{ background: "rgba(253,251,247,0.88)", backdropFilter: "blur(8px)" }}>
                <p className="elysian-label text-[9px]" style={{ color: "#9a8e70" }}>Château Elysian · Hover to explore</p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="flex flex-col justify-center h-full gap-0">
              <p className="elysian-label text-[10px] mb-6" style={{ color: "#9a8e70" }}>Explore the spaces</p>
              {VIRTUAL_ROOMS.map((room, i) => (
                <motion.div key={room.id}
                  className="flex items-center gap-4 py-5 border-b cursor-pointer"
                  style={{ borderColor: "rgba(196,185,154,0.12)" }}
                  onMouseEnter={() => { setActiveRoom(i); setPreviewRoom(i); }}
                  onMouseLeave={() => setActiveRoom(null)}
                  animate={{ x: activeRoom === i ? 8 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div className="w-2 h-2 rounded-full flex-shrink-0"
                    animate={{ background: activeRoom === i ? "#c4b99a" : "rgba(196,185,154,0.25)" }}
                    transition={{ duration: 0.3 }}
                  />
                  <div>
                    <p className="elysian-label text-[10px] transition-colors duration-300" style={{ color: activeRoom === i ? "#c4b99a" : "#2a2a2a" }}>{room.label}</p>
                    <p className="elysian-label text-[9px] mt-0.5" style={{ color: "rgba(42,42,42,0.4)" }}>{room.sub}</p>
                  </div>
                </motion.div>
              ))}
              <motion.a href="#elysian-contact" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                className="elysian-btn mt-8 text-center" style={{ fontSize: "0.6rem" }}>
                Request Full Walkthrough
              </motion.a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
