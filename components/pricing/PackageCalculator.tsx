"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Line = { id: string; label: string; price: number };

const LINES: Line[] = [
  { id: "interior", label: "AI Interior Visualization", price: 12000 },
  { id: "ads", label: "Creative Ad Campaigns", price: 18000 },
  { id: "web", label: "Web Development (Pro tier anchor)", price: 75000 },
  { id: "agents", label: "AI Agent Development (Pro tier anchor)", price: 35000 },
  { id: "apps", label: "App Building (Pro tier anchor)", price: 150000 }
];

function formatINR(n: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(
    n
  );
}

export function PackageCalculator() {
  const [selected, setSelected] = useState<Record<string, boolean>>({});

  const total = useMemo(() => {
    return LINES.filter((l) => selected[l.id]).reduce((sum, l) => sum + l.price, 0);
  }, [selected]);

  const toggle = (id: string) => setSelected((s) => ({ ...s, [id]: !s[id] }));

  return (
    <div className="glass rounded-3xl border border-white/10 p-6 sm:p-8">
      <h2 className="text-xl font-extrabold text-white">Package builder</h2>
      <p className="mt-2 text-sm text-white/65">Select services to see a ballpark total (anchors from Pro tiers).</p>

      <div className="mt-6 space-y-3">
        {LINES.map((l) => (
          <button
            key={l.id}
            type="button"
            onClick={() => toggle(l.id)}
            className={cn(
              "w-full flex items-center justify-between gap-4 rounded-2xl border px-4 py-3 text-left transition-colors",
              selected[l.id] ? "border-accent/50 bg-white/5" : "border-white/10 hover:border-white/20"
            )}
          >
            <span className="text-sm text-white/85">{l.label}</span>
            <span className="text-sm font-semibold text-white">{formatINR(l.price)}</span>
          </button>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs text-white/55 uppercase tracking-[0.2em]">Estimated total</p>
          <p className="text-3xl font-extrabold text-white">{formatINR(total)}</p>
        </div>
        <Link
          href="/contact"
          className="inline-flex justify-center rounded-xl px-6 py-3 font-semibold text-white bg-gradient-to-r from-primary to-secondary"
        >
          Get a precise quote
        </Link>
      </div>
    </div>
  );
}
