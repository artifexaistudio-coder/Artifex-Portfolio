import type { Metadata } from "next";
import Link from "next/link";
import { PackageCalculator } from "@/components/pricing/PackageCalculator";
import { SERVICES_CONTENT, SERVICE_SLUGS } from "@/lib/data/services";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Compare service packages and build a custom estimate."
};

export default function PricingPage() {
  return (
    <main className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-24">
      <p className="text-xs tracking-[0.35em] text-white/55 uppercase">Pricing</p>
      <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold text-white">
        Transparent <span className="gradient-text">packages</span>
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-white/70">
        Every engagement starts with scope. Use the table for orientation—then we’ll tailor a proposal.
      </p>

      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        <PackageCalculator />

        <div className="glass rounded-3xl border border-white/10 p-6 sm:p-8">
          <h2 className="text-xl font-extrabold text-white">Compare services</h2>
          <div className="mt-4 space-y-3 text-sm text-white/75">
            {SERVICE_SLUGS.map((slug) => {
              const s = SERVICES_CONTENT[slug];
              const starter = s.pricing[0];
              return (
                <div key={slug} className="flex items-start justify-between gap-4 border-b border-white/10 pb-3">
                  <div>
                    <p className="font-semibold text-white">{s.title}</p>
                    <p className="text-xs text-white/55">{starter.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-extrabold text-white">{starter.price}</p>
                    <Link href={`/services/${slug}`} className="text-xs text-accent hover:underline">
                      Details
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <section className="mt-14 glass rounded-3xl border border-white/10 p-8">
        <h2 className="text-xl font-extrabold text-white">FAQ</h2>
        <div className="mt-4 space-y-4 text-sm text-white/75">
          <p>
            <span className="text-white font-semibold">Do you work globally?</span> Yes—async-first, with overlap
            hours for calls.
          </p>
          <p>
            <span className="text-white font-semibold">How do deposits work?</span> Typically 40% kickoff / 30%
            milestone / 30% launch (varies by scope).
          </p>
          <p>
            <span className="text-white font-semibold">Can you sign an NDA?</span> Yes—standard mutual NDA available.
          </p>
        </div>
      </section>

      <div className="mt-10">
        <Link
          href="/contact"
          className="inline-flex rounded-xl px-6 py-3 font-semibold text-white bg-gradient-to-r from-primary to-secondary"
        >
          Schedule a free consultation
        </Link>
      </div>
    </main>
  );
}
