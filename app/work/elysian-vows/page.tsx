"use client";

import { useEffect, useState } from "react";
import "./elysian.css";
import { ElysianNav, ElysianHero, ElysianStats, ElysianAwardsStrip } from "./ElysianHero";
import { WeddingStories, TheCuration, TheVowProcess, ElysianTestimonials, ElysianInstagram, PreviousEventsWalkthrough, VirtualExperience, BackToTop } from "./ElysianSections";
import { ElysianCTA, ElysianFooter, FloatingInquiryButton } from "./ElysianFooter";

export default function ElysianPage() {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <main
      className={`elysian-page overflow-x-hidden min-h-screen ${entered ? "elysian-page-enter" : "opacity-0"}`}
    >
      {/* Bloom overlay */}
      <div className="elysian-bloom" aria-hidden="true" />

      {/* Floating nav */}
      <ElysianNav />

      {/* Floating inquiry button */}
      <FloatingInquiryButton />

      {/* Back to top */}
      <BackToTop />

      {/* ── Sections ── */}
      <ElysianHero />
      <ElysianStats />
      <ElysianAwardsStrip />
      <WeddingStories />
      <TheCuration />
      <PreviousEventsWalkthrough />
      <VirtualExperience />
      <TheVowProcess />
      <ElysianTestimonials />
      <ElysianInstagram />
      <ElysianCTA />
      <ElysianFooter />
    </main>
  );
}
