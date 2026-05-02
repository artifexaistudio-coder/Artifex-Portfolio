"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  beforeLabel: string;
  afterLabel: string;
  beforeClassName?: string;
  afterClassName?: string;
  className?: string;
};

export function BeforeAfterSlider({
  beforeLabel,
  afterLabel,
  beforeClassName,
  afterClassName,
  className
}: Props) {
  const id = useId();
  const [pct, setPct] = useState(50);

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-2xl border border-white/10 aspect-[16/10] select-none",
        className
      )}
    >
      <div
        className={cn("absolute inset-0 bg-gradient-to-br", afterClassName ?? "from-primary to-secondary")}
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-950"
        style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}
        aria-hidden
      >
        <div className={cn("absolute inset-0 bg-gradient-to-br opacity-90", beforeClassName)} />
      </div>

      <div className="absolute left-3 top-3 flex gap-2">
        <span className="rounded-full bg-black/40 px-3 py-1 text-xs font-semibold text-white/90 backdrop-blur">
          {beforeLabel}
        </span>
        <span className="rounded-full bg-black/40 px-3 py-1 text-xs font-semibold text-white/90 backdrop-blur">
          {afterLabel}
        </span>
      </div>

      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white/70 shadow-[0_0_20px_rgba(99,102,241,0.6)]"
        style={{ left: `${pct}%`, transform: "translateX(-50%)" }}
        aria-hidden
      />

      <input
        id={id}
        type="range"
        min={0}
        max={100}
        value={pct}
        onChange={(e) => setPct(Number(e.target.value))}
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        aria-label={`Compare before and after. Current position ${pct} percent`}
      />
    </div>
  );
}
