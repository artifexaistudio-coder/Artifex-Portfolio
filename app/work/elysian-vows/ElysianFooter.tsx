"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

/* ── CTA ── */
export function ElysianCTA() {
  return (
    <section
      className="relative py-40 px-6 sm:px-12 text-center overflow-hidden"
      id="elysian-contact"
      style={{ background: "#fdfbf7" }}
    >
      {/* Subtle floral background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle at 20% 50%, #c4b99a 0%, transparent 60%), radial-gradient(circle at 80% 50%, #c4b99a 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="elysian-label text-[10px] mb-8 block"
          style={{ color: "#9a8e70" }}
        >
          Your Journey Begins Here
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="elysian-heading text-5xl sm:text-6xl lg:text-7xl font-light mb-6"
          style={{ color: "#2a2a2a" }}
        >
          Create your{" "}
          <em className="elysian-serif-italic" style={{ color: "#c4b99a" }}>eternal</em> story.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-base mb-14 max-w-md mx-auto leading-relaxed"
          style={{ color: "rgba(42,42,42,0.6)" }}
        >
          Every great love story deserves an extraordinary celebration. Let us begin crafting yours.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <motion.a
            href="mailto:concierge@elysianvows.com"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="elysian-btn"
          >
            Inquire Now
          </motion.a>
          <a
            href="#elysian-weddings"
            className="elysian-label text-[10px] hover:text-[#c4b99a] transition-colors duration-500"
            style={{ color: "rgba(42,42,42,0.4)" }}
          >
            View Our Collections →
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Footer ── */
export function ElysianFooter() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="relative py-20 px-8 border-t overflow-hidden"
      style={{
        background: "rgba(253,251,247,0.75)",
        backdropFilter: "blur(24px) saturate(1.5)",
        WebkitBackdropFilter: "blur(24px) saturate(1.5)",
        borderColor: "rgba(196,185,154,0.15)",
      }}
    >
      {/* Subtle gold shimmer background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 100%, rgba(196,185,154,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-14">
        <div>
          <span className="elysian-heading text-2xl tracking-[0.2em]" style={{ color: "#2a2a2a" }}>ELYSIAN</span>
          <p className="mt-4 text-sm leading-relaxed max-w-xs" style={{ color: "rgba(42,42,42,0.5)" }}>
            Curating the world's most exquisite celebrations. From intimate vows to grand estates across five continents.
          </p>
        </div>
        <div>
          <span className="elysian-label text-[10px] mb-6 block" style={{ color: "#9a8e70" }}>Navigation</span>
          <ul className="space-y-3">
            {["Weddings", "The Curation", "Process", "Contact"].map((item) => (
              <li key={item}>
                <a
                  href={`#elysian-${item.toLowerCase().replace(" ", "-")}`}
                  className="elysian-label text-[10px] transition-colors duration-500"
                  style={{ color: "rgba(42,42,42,0.45)" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#c4b99a")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(42,42,42,0.45)")}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <span className="elysian-label text-[10px] mb-6 block" style={{ color: "#9a8e70" }}>Connect</span>
          <p className="text-sm" style={{ color: "rgba(42,42,42,0.55)" }}>concierge@elysianvows.com</p>
          <p className="mt-2 text-sm" style={{ color: "rgba(42,42,42,0.55)" }}>+44 20 7946 0958</p>
          <p className="mt-4 text-sm" style={{ color: "rgba(42,42,42,0.4)" }}>London · Paris · Mumbai · New York</p>
        </div>
      </div>

      <div
        className="relative z-10 pt-10 border-t flex flex-col sm:flex-row items-center justify-between gap-4"
        style={{ borderColor: "rgba(196,185,154,0.12)" }}
      >
        <p className="elysian-label text-[10px]" style={{ color: "rgba(42,42,42,0.3)" }}>
          © 2026 Elysian Vows. All rights reserved.
        </p>
        <p className="elysian-label text-[10px]" style={{ color: "rgba(42,42,42,0.3)" }}>
          A showcase project by{" "}
          <Link href="/" className="transition-colors" style={{ color: "#c4b99a" }}>
            Artifex AI Studio
          </Link>
        </p>
      </div>
    </motion.footer>
  );
}

/* ── Floating Inquiry Button ── */
export function FloatingInquiryButton() {
  const [visible, setVisible] = useState(false);

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
            href="#elysian-contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-3 px-5 py-3.5 shadow-2xl"
            style={{
              background: "#2a2a2a",
              color: "#c4b99a",
              border: "1px solid rgba(196,185,154,0.3)",
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#c4b99a" strokeWidth="1.5" className="flex-shrink-0">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            <span className="elysian-label text-[9px] tracking-[0.25em]" style={{ color: "#c4b99a" }}>
              Begin Your Journey
            </span>
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
