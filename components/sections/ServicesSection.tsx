"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useMemo, useRef, type MouseEvent } from "react";
import { cn, clamp } from "@/lib/utils";
import { SectionHeader, SectionShell } from "@/components/sections/SectionShell";

type Service = {
  title: string;
  icon: string;
  description: string;
  href: string;
};

const SERVICES: Service[] = [
  {
    title: "AI Interior Visualization",
    icon: "🏠",
    description:
      "Transform spaces with photorealistic AI-powered interior design renders that help clients visualize their dream homes",
    href: "/services/interior-visualization"
  },
  {
    title: "Creative Ad Campaigns",
    icon: "🎨",
    description:
      "Data-driven AI creatives that convert and engage your audience across all digital platforms",
    href: "/services/ad-creatives"
  },
  {
    title: "Web Development",
    icon: "💻",
    description:
      "Cutting-edge websites and web apps built with modern frameworks like Next.js, React, and Tailwind",
    href: "/services/web-development"
  },
  {
    title: "AI Agent Development",
    icon: "🤖",
    description:
      "Intelligent automation and chatbots powered by advanced LLMs for customer service and workflow optimization",
    href: "/services/ai-agents"
  },
  {
    title: "App Building",
    icon: "📱",
    description:
      "Native and cross-platform mobile apps with seamless UX and powerful AI integration",
    href: "/services/app-development"
  }
];

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const ref = useRef<HTMLDivElement | null>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const sx = useSpring(mx, { stiffness: 220, damping: 18, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 220, damping: 18, mass: 0.5 });

  const rotateX = useTransform(sy, [-0.5, 0.5], [9, -9]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-11, 11]);

  const onMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    mx.set(clamp(px - 0.5, -0.5, 0.5));
    my.set(clamp(py - 0.5, -0.5, 0.5));
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const delay = useMemo(() => 0.06 * index, [index]);

  return (
    <Link
      href={service.href}
      className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 rounded-2xl"
    >
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.55, delay }}
        whileHover={{ scale: 1.05 }}
        className={cn(
          "relative glass rounded-2xl p-6 sm:p-7 h-full",
          "transition-transform duration-300",
          "border border-white/10 hover:border-white/20"
        )}
        style={{
          transformStyle: "preserve-3d",
          rotateX,
          rotateY
        }}
      >
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background:
              "linear-gradient(135deg, rgba(99,102,241,0.55), rgba(6,182,212,0.25), rgba(236,72,153,0.35))"
          }}
          aria-hidden="true"
        />
        <div className="relative">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl" aria-hidden="true">
                {service.icon}
              </span>
              <h3 className="text-lg font-bold text-white">{service.title}</h3>
            </div>
            <span className="text-xs text-white/55">0{index + 1}</span>
          </div>
          <p className="mt-4 text-sm sm:text-base text-white/70 leading-relaxed">
            {service.description}
          </p>
          <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent">
            <span>View service</span>
            <span aria-hidden="true">→</span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export function ServicesSection() {
  return (
    <SectionShell id="services">
      <div className="flex flex-col gap-10">
        <SectionHeader
          eyebrow="Services"
          title="Premium AI-first capabilities"
          subtitle="Tap a card to explore pricing, process, portfolio, and case studies for each service."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((service, idx) => (
            <ServiceCard key={service.title} service={service} index={idx} />
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
