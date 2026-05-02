"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const INTERACTIVE_SELECTOR = "a,button,[role='button'],input,textarea,select,label";

function useIsCoarsePointer() {
  const [isCoarse, setIsCoarse] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: none), (pointer: coarse)");
    const update = () => setIsCoarse(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  return isCoarse;
}

export function CustomCursor() {
  const isCoarse = useIsCoarsePointer();
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const dotX = useSpring(x, { stiffness: 1000, damping: 60, mass: 0.2 });
  const dotY = useSpring(y, { stiffness: 1000, damping: 60, mass: 0.2 });
  const ringX = useSpring(x, { stiffness: 300, damping: 30, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 300, damping: 30, mass: 0.6 });

  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isCoarse) return;

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setIsVisible(true);
    };
    const onLeave = () => setIsVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("blur", onLeave);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("blur", onLeave);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [isCoarse, x, y]);

  useEffect(() => {
    if (isCoarse) return;

    const onOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const hit = target.closest(INTERACTIVE_SELECTOR);
      setIsHoveringInteractive(Boolean(hit));
    };
    window.addEventListener("pointerover", onOver, { passive: true });
    return () => window.removeEventListener("pointerover", onOver);
  }, [isCoarse]);

  const ringSize = useMemo(() => (isHoveringInteractive ? 40 : 26), [
    isHoveringInteractive
  ]);
  const dotSize = 12;

  if (isCoarse) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[100] mix-blend-difference"
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      <motion.div
        className="absolute rounded-full bg-white"
        style={{
          width: dotSize,
          height: dotSize,
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%"
        }}
      />
      <motion.div
        className="absolute rounded-full border border-white/70"
        style={{
          width: ringSize,
          height: ringSize,
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%"
        }}
      />
    </div>
  );
}

