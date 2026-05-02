"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";

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

/* ── Services ── */
const SERVICES = [
  { num: "01", title: "Architectural Design", desc: "Bespoke residential and commercial structures that merge form with landscape, light, and living.", detail: "Villa · Penthouse · Commercial" },
  { num: "02", title: "Interior Curation", desc: "Thoughtful selection of materials, furniture, and art to create spaces that breathe with intention.", detail: "Material · Furniture · Art" },
  { num: "03", title: "Landscape Integration", desc: "Seamless transitions between built environment and nature, where gardens become rooms.", detail: "Garden · Terrace · Courtyard" },
  { num: "04", title: "Renovation & Restoration", desc: "Breathing new life into heritage properties while preserving their soul and character.", detail: "Heritage · Adaptive · Revival" },
];

export function ServicesSection() {
  return (
    <section className="relative bg-[#0c0b09] py-32 sm:py-40 px-6 sm:px-12 lg:px-24">
      <div className="mx-auto max-w-6xl">
        <FadeUp><SectionLabel>Capabilities</SectionLabel></FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="aura-heading text-3xl sm:text-5xl text-white font-normal mb-20 max-w-2xl">
            From vision to <em className="italic text-[#c4b99a]">reality</em>
          </h2>
        </FadeUp>
        <div className="space-y-0">
          {SERVICES.map((s, i) => (
            <FadeUp key={s.num} delay={i * 0.08}>
              <motion.div
                className="group relative border-t border-white/[0.08] py-10 sm:py-12 grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-8 items-start"
                whileHover={{ x: 12 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="aura-body text-xs text-white/40 tracking-widest sm:col-span-1 pt-1 font-medium">{s.num}</span>
                <h3 className="aura-heading text-xl sm:text-2xl lg:text-3xl font-normal text-white group-hover:text-[#c4b99a] transition-colors duration-700 sm:col-span-4">{s.title}</h3>
                <p className="aura-body text-sm text-white/60 leading-relaxed sm:col-span-5 font-normal">{s.desc}</p>
                <span className="aura-body text-[10px] tracking-[0.15em] uppercase text-white/30 sm:col-span-2 pt-1 font-medium">{s.detail}</span>
              </motion.div>
            </FadeUp>
          ))}
          <div className="border-t border-white/[0.08]" />
        </div>
      </div>
    </section>
  );
}

/* ── Process ── */
const PROCESS = [
  { title: "Discovery", desc: "Deep listening sessions to understand your vision, lifestyle, and aspirations." },
  { title: "Concept", desc: "Translating emotion into spatial narratives through sketches and moodboards." },
  { title: "Design Development", desc: "Refining every detail — materials, lighting, furniture, and flow." },
  { title: "Realization", desc: "Meticulous project management from groundbreak to final styling." },
];

export function ProcessSection() {
  return (
    <section className="relative bg-[#0c0b09] py-32 sm:py-40 px-6 sm:px-12 lg:px-24" id="aura-process">
      <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        <div>
          <FadeUp><SectionLabel>Our Process</SectionLabel></FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="aura-heading text-3xl sm:text-5xl text-white font-normal leading-tight">
              Every great space begins with a{" "}
              <em className="italic text-[#c4b99a]">conversation</em>
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="aura-body mt-8 text-base text-white/60 leading-[1.8] max-w-md font-normal">
              Our four-phase methodology ensures that the magic of the initial vision is preserved through every stage of creation.
            </p>
          </FadeUp>
        </div>
        <div className="relative pl-10">
          <div className="aura-timeline-line" />
          <div className="space-y-12">
            {PROCESS.map((step, i) => (
              <FadeUp key={step.title} delay={i * 0.12}>
                <div className="relative flex gap-6 items-start">
                  <div className="aura-timeline-dot mt-2" />
                  <div>
                    <span className="aura-body text-[10px] tracking-[0.3em] uppercase text-[#c4b99a]/70 font-semibold">Phase {i + 1}</span>
                    <h3 className="aura-heading text-xl sm:text-2xl text-white font-normal mt-2">{step.title}</h3>
                    <p className="aura-body text-sm text-white/55 leading-relaxed mt-3 max-w-sm font-normal">{step.desc}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Testimonials ── */
const TESTIMONIALS = [
  { quote: "Aura didn't just design our home — they understood who we are and translated that into every corner, every surface, every beam of light.", author: "Priya & Arjun Mehta", location: "Hillside Residence, Lonavala" },
  { quote: "Working with Aura felt like a deeply personal journey. They listened to our dreams and created a space that surpassed every expectation we had.", author: "Rahul Kapoor", location: "Penthouse, South Mumbai" },
  { quote: "The attention to detail is extraordinary. Every material, every angle, every play of light — nothing was accidental. It's architecture with soul.", author: "Ananya & Siddharth Rao", location: "Lakeside Villa, Udaipur" },
  { quote: "Aura transformed our dated heritage home into a modern sanctuary while respecting its original character. We fall in love with it every single day.", author: "The Sharma Family", location: "Heritage Restoration, Jaipur" },
  { quote: "From our first meeting to move-in day, Aura made the entire process feel effortless. The result is a home that truly breathes with us.", author: "Dr. Meera Iyer", location: "Coastal Retreat, Goa" },
];

const slideVariants = {
  enter: (d: number) => ({ x: d > 0 ? 300 : -300, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (d: number) => ({ x: d > 0 ? -300 : 300, opacity: 0 }),
};

export function TestimonialSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const paginate = useCallback((dir: number) => {
    setDirection(dir);
    setCurrent((prev) => {
      const next = prev + dir;
      if (next < 0) return TESTIMONIALS.length - 1;
      if (next >= TESTIMONIALS.length) return 0;
      return next;
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => paginate(1), 6000);
    return () => clearInterval(interval);
  }, [paginate]);

  const t = TESTIMONIALS[current];

  return (
    <section className="relative bg-[#0c0b09] overflow-hidden">
      <div className="absolute inset-0">
        <Image src="/images/work/aura/gallery-4.png" alt="" fill sizes="100vw" className="object-cover opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c0b09] via-[#0c0b09]/80 to-[#0c0b09]" />
      </div>
      <div className="relative z-10 py-32 sm:py-44 px-6 sm:px-12 lg:px-24">
        <div className="mx-auto max-w-4xl">
          <FadeUp><SectionLabel>Client Words</SectionLabel></FadeUp>
          <div className="aura-heading text-6xl sm:text-8xl text-[#c4b99a]/25 mb-6 text-center">"</div>
          <div className="relative min-h-[200px] sm:min-h-[240px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="text-center"
              >
                <blockquote className="aura-heading text-xl sm:text-2xl lg:text-3xl font-normal text-white/90 leading-snug italic">{t.quote}</blockquote>
                <div className="aura-divider mt-10 mb-8 mx-auto max-w-[120px]" />
                <p className="aura-body text-sm text-[#c4b99a] tracking-[0.2em] uppercase font-semibold">{t.author}</p>
                <p className="aura-body text-xs text-white/50 mt-2 font-medium">{t.location}</p>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex items-center justify-center gap-8 mt-12">
            <button onClick={() => paginate(-1)} aria-label="Previous" className="group w-12 h-12 rounded-full border border-white/15 flex items-center justify-center hover:border-[#c4b99a]/50 hover:bg-[#c4b99a]/5 transition-all duration-500">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/50 group-hover:text-[#c4b99a] transition-colors"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            </button>
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button key={i} onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }} className={`w-2 h-2 rounded-full transition-all duration-500 ${i === current ? "bg-[#c4b99a] w-6" : "bg-white/20 hover:bg-white/40"}`} />
              ))}
            </div>
            <button onClick={() => paginate(1)} aria-label="Next" className="group w-12 h-12 rounded-full border border-white/15 flex items-center justify-center hover:border-[#c4b99a]/50 hover:bg-[#c4b99a]/5 transition-all duration-500">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/50 group-hover:text-[#c4b99a] transition-colors"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── CTA ── */
export function CTASection() {
  return (
    <section className="relative bg-[#0c0b09] py-32 sm:py-44 px-6 sm:px-12 lg:px-24" id="aura-contact">
      <div className="mx-auto max-w-4xl text-center">
        <FadeUp><SectionLabel>Begin Your Journey</SectionLabel></FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="aura-heading text-3xl sm:text-5xl lg:text-6xl text-white font-normal leading-tight">
            Ready to create something{" "}
            <em className="italic text-[#c4b99a]">extraordinary</em>?
          </h2>
        </FadeUp>
        <FadeUp delay={0.2}>
          <p className="aura-body mt-6 text-base text-white/60 max-w-md mx-auto leading-relaxed font-normal">
            Every great space begins with a conversation. Let's start yours.
          </p>
        </FadeUp>
        <FadeUp delay={0.3}>
          <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-5">
            <motion.a
              href="mailto:hello@auradesign.studio"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="aura-btn-primary aura-body"
            >
              Schedule Consultation
            </motion.a>
            <motion.a
              href="#aura-work"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="aura-body px-10 py-4 rounded-full text-white/50 text-xs tracking-[0.2em] uppercase hover:text-white transition-colors duration-500 font-medium"
            >
              View All Projects
            </motion.a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ── Footer ── */
export function AuraFooter() {
  return (
    <footer className="bg-[#080706] border-t border-white/[0.06] py-20 px-6 sm:px-12 lg:px-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div>
            <span className="aura-heading text-3xl tracking-[0.1em] text-white font-normal">AURA</span>
            <p className="aura-body text-sm text-white/45 mt-4 leading-relaxed max-w-xs font-normal">
              Where architecture meets emotion. Crafting singular living experiences since 2019.
            </p>
          </div>
          <div>
            <p className="aura-body text-[10px] tracking-[0.3em] uppercase text-white/50 mb-4 font-semibold">Navigation</p>
            {["Work", "Philosophy", "Process", "Contact"].map((item) => (
              <a key={item} href={`#aura-${item.toLowerCase()}`} className="aura-body block text-sm text-white/55 hover:text-[#c4b99a] transition-colors duration-500 py-1.5 font-normal">{item}</a>
            ))}
          </div>
          <div>
            <p className="aura-body text-[10px] tracking-[0.3em] uppercase text-white/50 mb-4 font-semibold">Connect</p>
            <p className="aura-body text-sm text-white/55 font-normal">hello@auradesign.studio</p>
            <p className="aura-body text-sm text-white/55 mt-2 font-normal">+91 98765 43210</p>
            <p className="aura-body text-sm text-white/45 mt-4 font-normal">Mumbai · Goa · Bangalore</p>
          </div>
        </div>
        <div className="aura-divider mb-8" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="aura-body text-[11px] text-white/35 tracking-wide font-medium">© 2026 Aura Design Studio. All rights reserved.</p>
          <p className="aura-body text-[11px] text-white/35 tracking-wide font-medium">
            A showcase project by{" "}
            <Link href="/" className="text-[#c4b99a]/60 hover:text-[#c4b99a] transition-colors">Artifex AI Studio</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ── Floating Book Button ── */
export function FloatingBookButton() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-8 right-8 z-50"
        >
          <motion.a
            href="#aura-contact"
            onHoverStart={() => setExpanded(true)}
            onHoverEnd={() => setExpanded(false)}
            className="flex items-center gap-3 bg-[#c4b99a] text-[#0c0b09] rounded-full px-5 py-3.5 shadow-2xl shadow-black/50 overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.3 }}
          >
            {/* Calendar icon */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            <AnimatePresence>
              {expanded && (
                <motion.span
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "auto", opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="aura-body text-[11px] tracking-[0.2em] uppercase font-semibold whitespace-nowrap overflow-hidden"
                >
                  Book Consultation
                </motion.span>
              )}
            </AnimatePresence>
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
