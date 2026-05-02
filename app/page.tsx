"use client";

import dynamic from "next/dynamic";
import { HeroSectionFallback } from "@/components/sections/HeroSectionFallback";

const HeroSection = dynamic(() => import("@/components/sections/HeroSection"), {
  ssr: false,
  loading: () => <HeroSectionFallback />
});

const ServicesSection = dynamic(
  () => import("@/components/sections/ServicesSection").then((m) => m.ServicesSection),
  { ssr: false }
);
const PortfolioSection = dynamic(
  () => import("@/components/sections/PortfolioSection").then((m) => m.PortfolioSection),
  { ssr: false }
);
const ProcessSection = dynamic(
  () => import("@/components/sections/ProcessSection").then((m) => m.ProcessSection),
  { ssr: false }
);
const ContactSection = dynamic(
  () => import("@/components/sections/ContactSection").then((m) => m.ContactSection),
  { ssr: false }
);

export default function HomePage() {
  return (
    <main className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
      <section id="home" className="min-h-screen">
        <HeroSection />
      </section>

      <ServicesSection />
      <ProcessSection />
      <ContactSection />
    </main>
  );
}
