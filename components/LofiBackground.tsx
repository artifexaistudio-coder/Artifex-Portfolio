"use client";

import dynamic from "next/dynamic";

const LofiBackground = dynamic(
  () => import("@/components/three/LofiBackgroundScene").then((m) => m.LofiBackground),
  { ssr: false }
);

export function AppBackground() {
  return <LofiBackground />;
}

