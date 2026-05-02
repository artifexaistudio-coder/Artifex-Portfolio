"use client";

import { useEffect, useState } from "react";
import "./aura.css";
import { AuraNav, HeroSection, MarqueeSection, StatsSection, AwardsStrip } from "./AuraHero";
import { PhilosophySection, GallerySection, LocationsSection, VideoSection, VirtualTourSection, InstagramFeedSection } from "./AuraSections";
import {
  ServicesSection,
  ProcessSection,
  TestimonialSection,
  CTASection,
  AuraFooter,
  FloatingBookButton,
} from "./AuraLower";

export default function AuraPage() {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    // Tiny delay so the animation always fires after mount
    const t = setTimeout(() => setEntered(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <main
      className={`aura-page bg-[#0c0b09] text-white overflow-x-hidden ${entered ? "aura-page-enter" : "opacity-0"}`}
    >
      {/* Film grain overlay */}
      <div className="aura-grain" aria-hidden="true" />

      {/* Floating nav */}
      <AuraNav />

      {/* Floating book button */}
      <FloatingBookButton />

      {/* ── Sections ── */}
      <HeroSection />
      <MarqueeSection />
      <StatsSection />
      <AwardsStrip />
      <PhilosophySection />
      <GallerySection />
      <VideoSection />
      <VirtualTourSection />
      <LocationsSection />
      <InstagramFeedSection />
      <ServicesSection />
      <ProcessSection />
      <TestimonialSection />
      <CTASection />
      <AuraFooter />
    </main>
  );
}
