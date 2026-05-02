import Link from "next/link";
import type { Metadata } from "next";
import { SERVICES_CONTENT, SERVICE_SLUGS } from "@/lib/data/services";

export const metadata: Metadata = {
  title: "Services",
  description: "Explore AI interior visualization, ad creatives, web development, AI agents, and app building."
};

export default function ServicesOverviewPage() {
  return (
    <main className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-24">
      <p className="text-xs tracking-[0.35em] text-white/55 uppercase">Services</p>
      <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold text-white">
        <span className="gradient-text">Capabilities</span> that ship
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-white/70">
        Pick a service to see pricing, process, portfolio highlights, case studies, and a ready-to-send contact
        flow.
      </p>

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {SERVICE_SLUGS.map((slug) => {
          const s = SERVICES_CONTENT[slug];
          return (
            <Link
              key={slug}
              href={`/services/${slug}`}
              className="group glass rounded-3xl border border-white/10 p-7 hover:border-white/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
            >
              <p className="text-xs text-white/50 uppercase tracking-[0.2em]">{slug.replace(/-/g, " ")}</p>
              <h2 className="mt-3 text-2xl font-extrabold text-white group-hover:text-accent transition-colors">
                {s.title}
              </h2>
              <p className="mt-3 text-white/70 leading-relaxed">{s.tagline}</p>
              <p className="mt-6 text-sm font-semibold text-accent">View details →</p>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
