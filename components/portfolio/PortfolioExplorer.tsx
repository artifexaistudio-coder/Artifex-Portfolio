"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { PROJECTS, type ProjectCategory } from "@/lib/data/projects";

const FILTERS: Array<"All" | ProjectCategory> = [
  "All",
  "AI Agents",
  "AI Receptionist",
  "Custom Website Building",
  "App Building"
];

function Badge({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold text-white/80 bg-white/5 border border-white/10">
      {children}
    </span>
  );
}

type Props = {
  showHeaderLink?: boolean;
  showSort?: boolean;
  embedded?: boolean;
};

export function PortfolioExplorer({ showHeaderLink = true, showSort = true, embedded = false }: Props) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"title" | "category">("title");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = PROJECTS.filter((p) => {
      const catOk = filter === "All" || p.category === filter;
      const searchOk =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tech.toLowerCase().includes(q);
      return catOk && searchOk;
    });
    list = [...list].sort((a, b) => a[sort].localeCompare(b[sort]));
    return list;
  }, [filter, query, sort]);

  return (
    <div className="flex flex-col gap-10">
      {!embedded && (
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs tracking-[0.35em] text-white/55 uppercase">Portfolio</p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-white">Selected work</h2>
            <p className="mt-3 text-white/65 max-w-2xl">
              Filter, search, and open full case studies. Every project includes challenge, solution, metrics, and
              gallery.
            </p>
          </div>
          {showHeaderLink && (
            <Link
              href="/portfolio"
              className="inline-flex self-start rounded-xl px-5 py-3 text-sm font-semibold text-white bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            >
              Dedicated portfolio page →
            </Link>
          )}
        </div>
      )}
      {embedded && showHeaderLink && (
        <div className="flex justify-end">
          <Link
            href="/portfolio"
            className="inline-flex rounded-xl px-5 py-3 text-sm font-semibold text-white bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
          >
            View all projects →
          </Link>
        </div>
      )}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-full px-4 py-2 text-xs font-semibold border transition-colors",
                filter === f
                  ? "bg-white/10 border-white/20 text-white"
                  : "bg-transparent border-white/10 text-white/65 hover:text-white"
              )}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          {showSort && (
            <label className="text-sm text-white/55 flex items-center gap-2">
              Sort
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as "title" | "category")}
                className="rounded-xl border border-white/10 bg-[#0F172A] px-3 py-2 text-white text-sm outline-none focus:ring-2 focus:ring-accent/60"
              >
                <option value="title">By title</option>
                <option value="category">By category</option>
              </select>
            </label>
          )}
          <label className="w-full lg:max-w-sm">
            <span className="sr-only">Search projects</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects…"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-accent/60"
            />
          </label>
        </div>
      </div>

      <AnimatePresence mode="popLayout">
        <motion.div
          key={`${filter}-${query}-${sort}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {filtered.map((p, idx) => (
            <Link
              key={p.slug}
              href={`/portfolio/${p.slug}`}
              className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 rounded-2xl"
            >
              <motion.article
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.55, delay: idx * 0.02 }}
                className="glass rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-colors h-full"
              >
                {/* ── Card image ── */}
                <div className="relative h-44 overflow-hidden">
                  {p.image ? (
                    <>
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* subtle dark overlay so text below stays readable */}
                      <div className="absolute inset-0 bg-black/25" aria-hidden="true" />
                    </>
                  ) : (
                    /* fallback gradient if no image */
                    <>
                      <div className={cn("absolute inset-0 bg-gradient-to-br", p.gradient, "opacity-80")} />
                      <div
                        className="absolute inset-0 opacity-60"
                        style={{
                          background:
                            "radial-gradient(circle at 25% 20%, rgba(255,255,255,0.20), transparent 60%), radial-gradient(circle at 70% 80%, rgba(0,0,0,0.25), transparent 55%)"
                        }}
                        aria-hidden="true"
                      />
                    </>
                  )}
                </div>

                <div className="p-6 sm:p-7">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-lg font-bold text-white">{p.title}</h3>
                    <span className="text-xs text-white/55">Open</span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <Badge>{p.category}</Badge>
                    <Badge>{p.tech}</Badge>
                  </div>

                  <p className="mt-4 text-sm sm:text-base text-white/70 leading-relaxed">
                    <span className="text-white/80 font-semibold">Result:</span> {p.result}
                  </p>

                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                    <span>Case study</span>
                    <span aria-hidden="true">→</span>
                  </div>
                </div>
              </motion.article>
            </Link>
          ))}
        </motion.div>
      </AnimatePresence>

      {filtered.length === 0 && (
        <p className="text-center text-white/60 py-10">No projects match your filters.</p>
      )}
    </div>
  );
}
