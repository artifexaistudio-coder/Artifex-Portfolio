"use client";

import { useEffect, useState } from "react";

export type CursorPosition = {
  x: number;
  y: number;
};

export function useCursorPosition() {
  const [pos, setPos] = useState<CursorPosition>({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return pos;
}

