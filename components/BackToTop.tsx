"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={cn(
        "fixed bottom-24 left-5 z-[80] rounded-full glass px-4 py-2 text-sm text-white/80 hover:text-white",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
      )}
      aria-label="Back to top"
    >
      ↑ Top
    </button>
  );
}
