"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="w-8 h-[1px] bg-[#c4b99a]/40" />
      <span className="aura-label text-[#c4b99a]">{children}</span>
    </div>
  );
}

/* ── Philosophy ── */
export function PhilosophySection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

  return (
    <section ref={ref} className="relative bg-[#0c0b09] py-32 sm:py-40 px-6 sm:px-12 lg:px-24" id="aura-philosophy">
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Image */}
        <FadeUp className="order-2 lg:order-1">
          <div className="relative overflow-hidden rounded-lg aspect-[3/4]">
            <motion.div className="absolute inset-0" style={{ y: imgY }}>
              <Image
                src="/images/work/aura/gallery-1.png"
                alt="Spa-inspired luxury bathroom"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover scale-110"
                style={{ filter: "brightness(1.05) contrast(1.02)" }}
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0b09]/30 to-transparent" />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="aura-glass absolute bottom-12 right-12 rounded-xl p-6 aura-shimmer-border"
            >
              <p className="aura-heading text-3xl text-[#c4b99a] font-normal">47+</p>
              <p className="aura-body text-[11px] tracking-[0.2em] uppercase text-white/60 mt-1">Residences Designed</p>
            </motion.div>
          </div>
        </FadeUp>

        {/* Text */}
        <div className="order-1 lg:order-2">
          <FadeUp><SectionLabel>Philosophy</SectionLabel></FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="aura-heading text-3xl sm:text-4xl lg:text-5xl text-white font-normal leading-[1.15]">
              We don't design homes.<br />
              We design the <em className="italic text-[#c4b99a]">feeling</em> of home.
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="aura-body mt-8 text-base text-white/70 leading-[1.8] max-w-md font-normal">
              Every Aura project begins with a single question:{" "}
              <span className="text-white font-medium">How should this space make you feel?</span>{" "}
              From that emotional blueprint, we sculpt environments where every surface, shadow, and sightline is orchestrated with quiet precision.
            </p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <p className="aura-body mt-6 text-base text-white/55 leading-[1.8] max-w-md">
              Our work bridges the gap between raw architectural ambition and the intimate warmth of daily life — where grand gestures serve gentle routines.
            </p>
          </FadeUp>
          <FadeUp delay={0.4}>
            <div className="aura-divider mt-12 max-w-xs" />
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* ── Gallery ── */
const GALLERY = [
  {
    src: "/images/work/aura/gallery-1.png",
    alt: "Spa-inspired bathroom with marble bathtub",
    span: "md:col-span-2 md:row-span-2",
    label: "Serenity Suite",
    location: "Lonavala, Maharashtra",
    year: "2024",
  },
  {
    src: "/images/work/aura/gallery-2.png",
    alt: "Moody luxury kitchen",
    span: "",
    label: "Midnight Kitchen",
    location: "Bandra, Mumbai",
    year: "2023",
  },
  {
    src: "/images/work/aura/gallery-3.png",
    alt: "Ocean-view bedroom at sunset",
    span: "",
    label: "Horizon Bedroom",
    location: "Candolim, Goa",
    year: "2024",
  },
  {
    src: "/images/work/aura/gallery-4.png",
    alt: "Cantilevered villa at dusk",
    span: "md:col-span-2",
    label: "Cliffside Retreat",
    location: "Alibaug, Maharashtra",
    year: "2023",
  },
  {
    src: "/images/work/aura/hero.png",
    alt: "Double-height living room with mountain views",
    span: "md:col-span-1",
    label: "Mountain House",
    location: "Kasauli, Himachal Pradesh",
    year: "2024",
  },
];

export function GallerySection() {
  return (
    <section className="relative bg-[#0c0b09] py-32 sm:py-40 px-6 sm:px-12 lg:px-24" id="aura-work">
      <div className="mx-auto max-w-7xl">
        <FadeUp><SectionLabel>Selected Work</SectionLabel></FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="aura-heading text-3xl sm:text-5xl lg:text-6xl text-white font-normal mb-4">
            A curated collection
          </h2>
        </FadeUp>
        <FadeUp delay={0.15}>
          <p className="aura-body text-base text-white/55 mb-16 max-w-lg font-normal">
            Each project is a dialogue between ambition and restraint — bold architectural gestures grounded in tactile, human-scale warmth.
          </p>
        </FadeUp>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
          {GALLERY.map((img, i) => (
            <FadeUp key={img.src + i} delay={i * 0.08} className={img.span}>
              <motion.div
                className="group relative overflow-hidden rounded-lg h-full min-h-[300px] md:min-h-[350px]"
                whileHover={{ scale: 1.015 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-all duration-[1.2s] ease-out group-hover:scale-110"
                  style={{ filter: "brightness(1.02) contrast(1.03)" }}
                />

                {/* Always-visible label at bottom */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="aura-label text-[#c4b99a] mb-1">{img.label}</p>
                      <p className="aura-body text-xs text-white/60 font-normal">{img.location}</p>
                    </div>
                    <span className="aura-body text-[10px] text-white/35 tracking-widest">{img.year}</span>
                  </div>
                </div>

                {/* Hover overlay details */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Corner accent */}
                <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-6 h-[1px] bg-[#c4b99a]/60 mb-1" />
                  <div className="w-[1px] h-6 bg-[#c4b99a]/60" />
                </div>
              </motion.div>
            </FadeUp>
          ))}
        </div>

        {/* View more link */}
        <FadeUp delay={0.3}>
          <div className="mt-16 text-center">
            <a
              href="#aura-contact"
              className="aura-body inline-flex items-center gap-3 text-[11px] tracking-[0.25em] uppercase text-white/45 hover:text-[#c4b99a] transition-colors duration-500 font-medium"
            >
              <div className="w-8 h-[1px] bg-current" />
              Discuss Your Project
              <div className="w-8 h-[1px] bg-current" />
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ── Locations ── */
const LOCATIONS = [
  {
    city: "Mumbai",
    desc: "Our founding studio. From Bandra penthouses to South Mumbai heritage restorations.",
    image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&q=85",
    projects: "22 projects",
  },
  {
    city: "Goa",
    desc: "Coastal retreats and boutique villas where the ocean becomes part of the design.",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=85",
    projects: "14 projects",
  },
  {
    city: "Bangalore",
    desc: "Urban sanctuaries for a new generation of discerning homeowners.",
    image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=800&q=85",
    projects: "11 projects",
  },
];

export function LocationsSection() {
  return (
    <section className="relative bg-[#080706] py-32 sm:py-40 px-6 sm:px-12 lg:px-24">
      <div className="mx-auto max-w-7xl">
        <FadeUp><SectionLabel>Where We Work</SectionLabel></FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="aura-heading text-3xl sm:text-5xl text-white font-normal mb-16">
            Three cities, one <em className="italic text-[#c4b99a]">vision</em>
          </h2>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {LOCATIONS.map((loc, i) => (
            <FadeUp key={loc.city} delay={i * 0.1}>
              <motion.div
                className="group relative overflow-hidden rounded-lg aspect-[3/4]"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={loc.image}
                  alt={loc.city}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <p className="aura-body text-[10px] tracking-[0.3em] uppercase text-[#c4b99a]/70 mb-2 font-semibold">
                    {loc.projects}
                  </p>
                  <h3 className="aura-heading text-3xl text-white font-normal">{loc.city}</h3>
                  <p className="aura-body text-sm text-white/60 mt-3 leading-relaxed font-normal max-w-xs opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    {loc.desc}
                  </p>
                </div>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Video Section ── */
export function VideoSection() {
  const [playing, setPlaying] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 0.92]);

  return (
    <section ref={ref} className="relative bg-[#0c0b09] py-24 sm:py-32 px-6 sm:px-12 lg:px-24 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <FadeUp>
          <SectionLabel>Experience</SectionLabel>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="aura-heading text-3xl sm:text-5xl text-white font-normal mb-12 max-w-2xl">
            Feel the space before you <em className="italic text-[#c4b99a]">inhabit it</em>
          </h2>
        </FadeUp>

        {/* Video container */}
        <motion.div
          style={{ scale }}
          className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden group cursor-pointer"
          onClick={() => setPlaying(true)}
        >
          {/* Poster / thumbnail */}
          {!playing && (
            <>
              <img
                src="/images/work/aura/gallery-4.png"
                alt="Aura cinematic video"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-500" />

              {/* Gold shimmer overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#c4b99a]/5 via-transparent to-transparent" />

              {/* Play button */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <motion.div
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative"
                >
                  {/* Outer ring pulse */}
                  <motion.div
                    animate={{ scale: [1, 1.35, 1], opacity: [0.4, 0, 0.4] }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: "easeOut" }}
                    className="absolute inset-0 rounded-full border border-[#c4b99a]/40"
                  />
                  {/* Play circle */}
                  <div className="w-20 h-20 rounded-full bg-[#c4b99a]/10 backdrop-blur-sm border border-[#c4b99a]/40 flex items-center justify-center">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="#c4b99a" className="ml-1">
                      <polygon points="5,3 19,12 5,21" />
                    </svg>
                  </div>
                </motion.div>
              </motion.div>

              {/* Bottom text */}
              <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between">
                <div>
                  <p className="aura-label text-[#c4b99a]">Cliffside Retreat</p>
                  <p className="aura-body text-xs text-white/50 mt-1">Alibaug, Maharashtra · 2023</p>
                </div>
                <p className="aura-body text-xs text-white/40 tracking-widest">4:32</p>
              </div>
            </>
          )}

          {/* Actual video (plays on click — using a free Pexels luxury interior video) */}
          {playing && (
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/BcZkHDlq0oc?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1"
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          )}
        </motion.div>

        {/* Caption */}
        <FadeUp delay={0.2}>
          <p className="aura-body text-sm text-white/40 text-center mt-6 font-normal">
            A cinematic walkthrough of our Cliffside Retreat — crafted to let you inhabit the space before it exists.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}

/* ── Virtual Tour Section ── */
const HOTSPOTS = [
  { id: 1, x: 18, y: 55, label: "Master Bedroom", sub: "Ocean-facing · 420 sq ft" },
  { id: 2, x: 42, y: 35, label: "Living Atrium", sub: "Double height · Walnut & stone" },
  { id: 3, x: 65, y: 60, label: "Spa Bathroom", sub: "Marble finish · Rain shower" },
  { id: 4, x: 80, y: 40, label: "Sky Terrace", sub: "Infinity pool · 180° views" },
];

export function VirtualTourSection() {
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  return (
    <section className="relative bg-[#080706] py-24 sm:py-32 px-6 sm:px-12 lg:px-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
          <div>
            <FadeUp><SectionLabel>Virtual Tour</SectionLabel></FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="aura-heading text-3xl sm:text-5xl text-white font-normal leading-tight">
                Walk through every <em className="italic text-[#c4b99a]">room</em> before we build it
              </h2>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="aura-body mt-6 text-base text-white/60 leading-relaxed max-w-md">
                Hover over the hotspots to explore each space. We offer full immersive 3D walkthroughs for every Aura project — so you can feel your home before the first stone is laid.
              </p>
            </FadeUp>
            <FadeUp delay={0.3}>
              <motion.a
                href="#aura-contact"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="aura-btn-primary aura-body inline-block mt-8"
              >
                Request a Full Tour
              </motion.a>
            </FadeUp>
          </div>

          {/* Hotspot image */}
          <FadeUp delay={0.15}>
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden">
              <img
                src="/images/work/aura/hero.png"
                alt="Virtual tour"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30" />

              {/* Hotspots */}
              {HOTSPOTS.map((spot) => (
                <div
                  key={spot.id}
                  className="absolute"
                  style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                  onMouseEnter={() => setActiveHotspot(spot.id)}
                  onMouseLeave={() => setActiveHotspot(null)}
                >
                  {/* Pulsing dot */}
                  <div className="relative cursor-pointer">
                    <motion.div
                      animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ repeat: Infinity, duration: 2, ease: "easeOut", delay: spot.id * 0.4 }}
                      className="absolute inset-0 rounded-full bg-[#c4b99a]/40"
                    />
                    <div className="w-4 h-4 rounded-full bg-[#c4b99a] border-2 border-white/60 shadow-lg relative z-10" />
                  </div>

                  {/* Tooltip */}
                  <AnimatePresence>
                    {activeHotspot === spot.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        className="absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap z-20"
                      >
                        <div className="bg-[#0c0b09]/90 backdrop-blur-md border border-[#c4b99a]/20 rounded-xl px-4 py-3 text-center">
                          <p className="aura-body text-xs font-semibold text-white">{spot.label}</p>
                          <p className="aura-body text-[10px] text-white/50 mt-0.5">{spot.sub}</p>
                        </div>
                        {/* Arrow */}
                        <div className="w-2 h-2 bg-[#0c0b09]/90 border-r border-b border-[#c4b99a]/20 rotate-45 mx-auto -mt-1" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              {/* Corner label */}
              <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/10">
                <p className="aura-label text-[#c4b99a] text-[9px]">Serenity Suite · Lonavala</p>
              </div>

              {/* Hover hint */}
              <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/10">
                <p className="aura-body text-[10px] text-white/50">Hover hotspots to explore</p>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* ── Instagram Feed Section ── */
const FEED = [
  { src: "/images/work/aura/gallery-1.png", caption: "Serenity in every corner.", likes: "2.4k" },
  { src: "/images/work/aura/gallery-2.png", caption: "Midnight kitchen, Bandra.", likes: "1.8k" },
  { src: "/images/work/aura/gallery-3.png", caption: "Where the ocean meets design.", likes: "3.1k" },
  { src: "/images/work/aura/gallery-4.png", caption: "Cliffside at golden hour.", likes: "4.2k" },
  { src: "/images/work/aura/hero.png", caption: "Spaces that breathe.", likes: "5.6k" },
  { src: "/images/work/aura/gallery-1.png", caption: "Stone, wood, and light.", likes: "2.9k" },
  { src: "/images/work/aura/gallery-3.png", caption: "The art of living well.", likes: "1.5k" },
  { src: "/images/work/aura/gallery-2.png", caption: "Every detail, deliberate.", likes: "3.3k" },
  { src: "/images/work/aura/gallery-4.png", caption: "Architecture as emotion.", likes: "2.7k" },
];

export function InstagramFeedSection() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="relative bg-[#0c0b09] py-24 sm:py-32 px-6 sm:px-12 lg:px-24">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <FadeUp>
          <div className="flex items-end justify-between mb-12">
            <div>
              <SectionLabel>Follow Our Journey</SectionLabel>
              <h2 className="aura-heading text-3xl sm:text-5xl text-white font-normal">
                <em className="italic text-[#c4b99a]">@auradesign</em>.studio
              </h2>
            </div>
            <div className="hidden sm:block text-right">
              <p className="aura-heading text-3xl text-white font-light">48.2k</p>
              <p className="aura-label text-white/40 mt-1">Followers</p>
            </div>
          </div>
        </FadeUp>

        {/* 3×3 grid */}
        <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5">
          {FEED.map((post, i) => (
            <FadeUp key={i} delay={i * 0.04}>
              <motion.div
                className="relative aspect-square overflow-hidden rounded-sm cursor-pointer"
                onHoverStart={() => setHovered(i)}
                onHoverEnd={() => setHovered(null)}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                <img
                  src={post.src}
                  alt={post.caption}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
                  style={{ transform: hovered === i ? "scale(1.08)" : "scale(1)" }}
                />

                {/* Hover overlay */}
                <AnimatePresence>
                  {hovered === i && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 bg-black/55 flex flex-col items-center justify-center gap-2 p-4"
                    >
                      {/* Heart + likes */}
                      <div className="flex items-center gap-2">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="#c4b99a">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                        </svg>
                        <span className="aura-body text-sm text-white font-medium">{post.likes}</span>
                      </div>
                      <p className="aura-body text-[11px] text-white/70 text-center leading-relaxed">
                        {post.caption}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </FadeUp>
          ))}
        </div>

        {/* Follow CTA */}
        <FadeUp delay={0.3}>
          <div className="mt-10 text-center">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="aura-body inline-flex items-center gap-3 text-[11px] tracking-[0.25em] uppercase text-white/45 hover:text-[#c4b99a] transition-colors duration-500 font-medium"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
              </svg>
              Follow on Instagram
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
