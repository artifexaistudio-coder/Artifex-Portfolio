"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import type { ServiceContent } from "@/lib/data/services";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { ContactForm } from "@/components/contact/ContactForm";
import { cn } from "@/lib/utils";

function Breadcrumbs({ title }: { title: string }) {
  return (
    <nav className="text-sm text-white/55" aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2">
        <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
        <li aria-hidden>/</li>
        <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
        <li aria-hidden>/</li>
        <li className="text-white/80">{title}</li>
      </ol>
    </nav>
  );
}

function PricingCard({ tier, idx }: { tier: ServiceContent["pricing"][number]; idx: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: idx * 0.06 }}
      className={cn(
        "glass rounded-2xl border p-6",
        tier.name === "Pro"
          ? "border-accent/40 shadow-[0_0_40px_rgba(6,182,212,0.15)]"
          : "border-white/10"
      )}
    >
      <p className="text-xs tracking-[0.25em] text-white/50 uppercase">{tier.name}</p>
      <p className="mt-3 text-3xl font-extrabold text-white">{tier.price}</p>
      <p className="mt-2 text-sm text-white/65">{tier.description}</p>
      <ul className="mt-4 space-y-2 text-sm text-white/75">
        {tier.features.map((f) => (
          <li key={f} className="flex gap-2">
            <span className="text-accent">✓</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

/* ── Aura Demo Section ── */
function AuraDemoSection() {
  return (
    <section className="mt-16">
      {/* Header */}
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Live Demo Project</h2>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-widest uppercase bg-accent/10 text-accent border border-accent/20">
              Demo
            </span>
          </div>
          <p className="text-white/65">
            A real website we built to showcase our web development capabilities.
          </p>
        </div>
      </div>

      {/* Demo Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-8 glass rounded-3xl border border-white/10 overflow-hidden hover:border-white/20 transition-colors group"
      >
        {/* Preview image */}
        <div className="relative w-full h-64 sm:h-80 overflow-hidden">
          <img
            src="/images/work/aura/hero.png"
            alt="Aura — Luxury Architecture & Interiors website"
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Floating label */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-full text-[10px] font-semibold tracking-widest uppercase bg-black/50 backdrop-blur-sm text-white/70 border border-white/10">
              Hypothetical Client
            </span>
            <span className="px-3 py-1.5 rounded-full text-[10px] font-semibold tracking-widest uppercase bg-accent/20 backdrop-blur-sm text-accent border border-accent/20">
              Live Demo
            </span>
          </div>

          {/* Bottom overlay text */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <p className="text-xs tracking-[0.3em] uppercase text-white/50 mb-1">Luxury Real Estate · Web Development</p>
            <h3 className="text-2xl sm:text-3xl font-light tracking-wide text-white" style={{ fontFamily: "Georgia, serif" }}>
              AURA — Architecture & Interiors
            </h3>
          </div>
        </div>

        {/* Card body */}
        <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Description */}
          <div className="lg:col-span-2">
            <p className="text-white/70 leading-relaxed">
              A fully immersive, luxury real estate website built for a hypothetical high-end architecture studio.
              This demo showcases our ability to deliver premium digital experiences — from parallax hero
              animations and interactive galleries to smooth scroll-based transitions and a floating booking system.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Next.js 14", "Framer Motion", "Tailwind CSS", "TypeScript", "Parallax Scrolling", "Custom Animations"].map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-full text-xs text-white/65 bg-white/5 border border-white/10">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Stats + CTA */}
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Sections", value: "9" },
                { label: "Animations", value: "30+" },
                { label: "Performance", value: "98/100" },
                { label: "Responsive", value: "✓" },
              ].map((s) => (
                <div key={s.label} className="glass rounded-xl border border-white/10 p-3 text-center">
                  <p className="text-lg font-bold text-white">{s.value}</p>
                  <p className="text-[10px] text-white/45 uppercase tracking-wider mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>

            <Link
              href="/work/aura"
              className="mt-2 flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 font-semibold text-sm text-white bg-gradient-to-r from-primary to-secondary shadow-[0_0_30px_rgba(99,102,241,0.3)] hover:shadow-[0_0_50px_rgba(99,102,241,0.5)] transition-shadow"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
              View Live Demo
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Disclaimer */}
      <p className="mt-4 text-xs text-white/35 text-center">
        * This is a demonstration project built by Artifex AI Studio to showcase our web development capabilities.
        Aura Design Studio is a fictional brand created for this demo.
      </p>
    </section>
  );
}

export function ServiceDetailTemplate({ data }: { data: ServiceContent }) {
  const showBeforeAfter = data.slug === "interior-visualization";
  const isWebDev = data.slug === "custom-website-building";

  return (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pb-24 pt-28">
      <Breadcrumbs title={data.title} />

      <section className="mt-8 grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-xs tracking-[0.35em] text-white/55 uppercase">Service</p>
          <h1 className="mt-3 text-4xl sm:text-5xl font-extrabold tracking-tight">
            <span className="gradient-text">{data.title}</span>
          </h1>
          <p className="mt-3 text-lg text-white/70">{data.tagline}</p>
          <p className="mt-5 text-base text-white/70 leading-relaxed">{data.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-xl px-6 py-3 font-semibold text-white bg-gradient-to-r from-primary to-secondary shadow-[0_0_30px_rgba(99,102,241,0.35)] hover:shadow-[0_0_50px_rgba(99,102,241,0.55)] transition-shadow"
            >
              Book a call
            </Link>
            <Link href="/" className="rounded-xl px-6 py-3 font-semibold text-white/90 glass hover:text-white transition-colors">
              Back to home
            </Link>
          </div>
        </div>

        <div className="glass rounded-3xl border border-white/10 p-6">
          <p className="text-sm font-semibold text-white">What you get</p>
          <ul className="mt-4 space-y-3">
            {data.features.map((f) => (
              <li key={f} className="flex gap-3 text-sm text-white/75">
                <span className="text-accent">▹</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">What we offer</h2>
        <p className="mt-2 text-white/65">A complete delivery playbook—built for clarity, speed, and measurable outcomes.</p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {data.features.map((f, i) => (
            <motion.div
              key={f}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="glass rounded-2xl border border-white/10 p-5"
            >
              <p className="text-sm text-white/85">{f}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Our process</h2>
        <div className="mt-8 grid gap-4 lg:grid-cols-5">
          {data.process.map((s, idx) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.05 }}
              className="glass rounded-2xl border border-white/10 p-5"
            >
              <p className="text-xs tracking-[0.25em] text-white/45">{s.step}</p>
              <p className="mt-2 font-bold text-white">{s.title}</p>
              <p className="mt-2 text-sm text-white/65 leading-relaxed">{s.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Aura Demo — only on web development page ── */}
      {isWebDev && <AuraDemoSection />}

      <section className="mt-16">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Portfolio highlights</h2>
            <p className="mt-2 text-white/65">Representative outcomes—tailored to this service.</p>
          </div>
          <Link href="/portfolio" className="text-sm font-semibold text-accent hover:underline">View full portfolio →</Link>
        </div>
        <div className="mt-8">
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 3200, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            spaceBetween={16}
            slidesPerView={1.1}
            breakpoints={{ 640: { slidesPerView: 1.6 }, 1024: { slidesPerView: 3 } }}
          >
            {data.portfolio.map((p) => (
              <SwiperSlide key={p.title}>
                <div className="glass rounded-2xl overflow-hidden border border-white/10">
                  <div className={cn("h-36 bg-gradient-to-br", p.gradient)} />
                  <div className="p-5">
                    <p className="font-bold text-white">{p.title}</p>
                    {p.metric && <p className="mt-2 text-sm text-white/65">{p.metric}</p>}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Pricing packages</h2>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {data.pricing.map((tier, idx) => (
            <PricingCard key={tier.name} tier={tier} idx={idx} />
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Case studies</h2>
        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          {data.caseStudies.map((cs) => (
            <div key={cs.title} className="glass rounded-3xl border border-white/10 p-6">
              <p className="font-bold text-white">{cs.title}</p>
              <p className="mt-2 text-sm text-white/65">{cs.outcome}</p>
              <div className="mt-4">
                {showBeforeAfter ? (
                  <BeforeAfterSlider
                    beforeLabel={cs.beforeLabel}
                    afterLabel={cs.afterLabel}
                    beforeClassName={cs.beforeGradient}
                    afterClassName={cs.afterGradient}
                  />
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <div className={cn("h-40 rounded-2xl bg-gradient-to-br", cs.beforeGradient)} />
                    <div className={cn("h-40 rounded-2xl bg-gradient-to-br", cs.afterGradient)} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Client testimonials</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {data.testimonials.map((t) => (
            <blockquote key={t.quote} className="glass rounded-2xl border border-white/10 p-6">
              <p className="text-white/80 leading-relaxed">"{t.quote}"</p>
              <footer className="mt-4 text-sm text-white/55">
                — {t.author}, <span className="text-white/70">{t.role}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="mt-16 glass rounded-3xl border border-white/10 p-6 sm:p-10">
        <h2 className="text-2xl font-extrabold text-white">Ready to start?</h2>
        <p className="mt-2 text-white/65">Tell us what you need—we'll respond with a clear plan, timeline, and estimate.</p>
        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <ContactForm variant="compact" />
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm font-semibold text-white">Prefer email?</p>
            <a href="mailto:contact@artifexai.studio" className="mt-2 inline-block text-accent hover:underline">
              contact@artifexai.studio
            </a>
            <p className="mt-6 text-sm text-white/65">
              Typical response time: <span className="text-white">24 hours</span>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
