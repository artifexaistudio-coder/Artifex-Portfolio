import type { Metadata } from "next";
import Link from "next/link";
import { StatsStrip } from "@/components/about/StatsStrip";

export const metadata: Metadata = {
  title: "About",
  description: "Meet the Artifex AI Studio team, mission, and story."
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-24">
      <p className="text-xs tracking-[0.35em] text-white/55 uppercase">About</p>
      <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold text-white">
        Built for <span className="gradient-text">AI-native</span> creative work
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-white/70">
        Artifex AI Studio is an AI-first agency based in Hyderabad—pairing craft with automation to ship faster
        without sacrificing taste.
      </p>

      <section className="mt-14">
        <h2 className="text-2xl font-extrabold text-white">Team</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {[
            { name: "You", role: "Founder & Creative Director", bio: "Leads product vision, client delivery, and creative direction." },
            { name: "Sidhanth", role: "Engineering & AI", bio: "Owns technical architecture, agents, and performance." }
          ].map((m) => (
            <div key={m.name} className="glass rounded-3xl border border-white/10 p-6">
              <div className="h-40 rounded-2xl bg-gradient-to-br from-primary/40 to-secondary/30 border border-white/10" />
              <h3 className="mt-4 text-xl font-bold text-white">{m.name}</h3>
              <p className="text-sm text-accent">{m.role}</p>
              <p className="mt-3 text-sm text-white/70 leading-relaxed">{m.bio}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-extrabold text-white">Mission & values</h2>
        <ul className="mt-4 space-y-3 text-white/75">
          <li>— Ship with clarity: measurable outcomes, transparent timelines.</li>
          <li>— Taste matters: AI accelerates, humans curate.</li>
          <li>— Security & trust: especially for agents and client data.</li>
        </ul>
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-extrabold text-white">Timeline</h2>
        <div className="mt-6 space-y-4">
          {[
            { y: "2023", t: "Studio founded in Hyderabad" },
            { y: "2024", t: "Scaled agent + web delivery for SaaS and real estate" },
            { y: "2025", t: "Expanded ad creative pipelines + app launches" },
            { y: "2026", t: "Full-stack AI creative partner for global clients" }
          ].map((row) => (
            <div key={row.y} className="flex gap-4 glass rounded-2xl border border-white/10 p-4">
              <span className="text-sm font-extrabold text-accent w-16">{row.y}</span>
              <p className="text-sm text-white/75">{row.t}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-extrabold text-white">Proof</h2>
        <div className="mt-6">
          <StatsStrip />
        </div>
      </section>

      <section className="mt-14 glass rounded-3xl border border-white/10 p-8">
        <h2 className="text-xl font-extrabold text-white">Awards & certifications</h2>
        <p className="mt-3 text-white/70">
          Google Cloud / partner ecosystem certifications (placeholder), design awards submissions (placeholder).
        </p>
      </section>

      <div className="mt-14">
        <Link
          href="/contact"
          className="inline-flex rounded-xl px-6 py-3 font-semibold text-white bg-gradient-to-r from-primary to-secondary"
        >
          Schedule a consultation
        </Link>
      </div>
    </main>
  );
}
