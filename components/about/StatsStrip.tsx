"use client";

import CountUp from "react-countup";

const STATS = [
  { label: "Projects shipped", end: 120, suffix: "+" },
  { label: "Clients served", end: 48, suffix: "+" },
  { label: "Avg. response time", end: 18, suffix: "h" }
];

export function StatsStrip() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {STATS.map((s) => (
        <div key={s.label} className="glass rounded-2xl border border-white/10 p-6 text-center">
          <p className="text-3xl font-extrabold text-white">
            <CountUp end={s.end} duration={1.4} suffix={s.suffix} />
          </p>
          <p className="mt-2 text-sm text-white/60">{s.label}</p>
        </div>
      ))}
    </div>
  );
}
