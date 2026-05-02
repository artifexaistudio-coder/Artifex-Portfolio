"use client";

import { useEffect, useRef, useState } from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";

// ─── Types ────────────────────────────────────────────────────────────────────
interface DustParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  color: string;
  phase: number;
  speed: number;
}

interface OrbState {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  rotation: number;
  scale: number;
}

// ─── Colour palette ───────────────────────────────────────────────────────────
const COLORS = [
  "rgba(99, 102, 241,",   // indigo
  "rgba(139, 92, 246,",   // violet
  "rgba(236, 72, 153,",   // pink
  "rgba(59, 130, 246,",   // blue
  "rgba(167, 139, 250,",  // light purple
  "rgba(192, 132, 252,",  // soft purple
];

function randomColor() {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}

// ─── Main canvas component ────────────────────────────────────────────────────
function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dustRef = useRef<DustParticle[]>([]);
  const orbRef = useRef<OrbState>({
    x: 0, y: 0,
    targetX: 0, targetY: 0,
    vx: 0, vy: 0,
    rotation: 0,
    scale: 1,
  });
  const mouseRef = useRef({ x: -999, y: -999 });
  const rafRef = useRef<number>(0);
  const scrollRef = useRef(0);
  const energyRef = useRef(0);
  const lastScrollRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ── Resize ────────────────────────────────────────────────────────────────
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // reset orb to right side
      orbRef.current.x = window.innerWidth * 0.82;
      orbRef.current.y = window.innerHeight * 0.45;
      orbRef.current.targetX = window.innerWidth * 0.82;
      orbRef.current.targetY = window.innerHeight * 0.45;
    };
    resize();
    window.addEventListener("resize", resize);

    // ── Init dust ─────────────────────────────────────────────────────────────
    const COUNT = 220;
    dustRef.current = Array.from({ length: COUNT }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: 0.8 + Math.random() * 2.5,
      opacity: 0.25 + Math.random() * 0.55,
      color: randomColor(),
      phase: Math.random() * Math.PI * 2,
      speed: 0.3 + Math.random() * 0.7,
    }));

    // ── Mouse ─────────────────────────────────────────────────────────────────
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      // orb does NOT follow cursor — position stays fixed
    };
    window.addEventListener("mousemove", onMouseMove);

    // ── Scroll energy ─────────────────────────────────────────────────────────
    const onScroll = () => { scrollRef.current = window.scrollY; };
    window.addEventListener("scroll", onScroll, { passive: true });

    // ── Draw gradient background ──────────────────────────────────────────────
    const drawBackground = () => {
      const w = canvas.width;
      const h = canvas.height;
      // Deep dark base
      ctx.fillStyle = "#050714";
      ctx.fillRect(0, 0, w, h);

      // Large nebula blobs using radial gradients
      const blobs = [
        { x: w * 0.15, y: h * 0.2,  r: w * 0.45, c1: "rgba(99,102,241,0.18)",  c2: "transparent" },
        { x: w * 0.85, y: h * 0.75, r: w * 0.4,  c1: "rgba(236,72,153,0.14)",  c2: "transparent" },
        { x: w * 0.5,  y: h * 0.5,  r: w * 0.55, c1: "rgba(139,92,246,0.10)",  c2: "transparent" },
        { x: w * 0.75, y: h * 0.15, r: w * 0.3,  c1: "rgba(59,130,246,0.12)",  c2: "transparent" },
        { x: w * 0.2,  y: h * 0.8,  r: w * 0.35, c1: "rgba(192,132,252,0.10)", c2: "transparent" },
      ];

      for (const b of blobs) {
        const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        grad.addColorStop(0, b.c1);
        grad.addColorStop(1, b.c2);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      }
    };

    // ── Animation loop ────────────────────────────────────────────────────────
    let t = 0;
    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);
      t += 0.012;

      const w = canvas.width;
      const h = canvas.height;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // scroll energy
      const dy = scrollRef.current - lastScrollRef.current;
      lastScrollRef.current = scrollRef.current;
      energyRef.current = Math.min(1, energyRef.current * 0.94 + Math.abs(dy) * 0.008);

      // ── Background (redrawn each frame so blobs can shift slowly) ──────────
      drawBackground();

      // ── Dust particles ──────────────────────────────────────────────────────
      for (const p of dustRef.current) {
        // gentle autonomous drift with sinusoidal sway
        p.x += p.vx + Math.sin(t * p.speed + p.phase) * 0.18;
        p.y += p.vy + Math.cos(t * p.speed * 0.7 + p.phase) * 0.12;

        // mouse repulsion / attraction
        const dxM = p.x - mx;
        const dyM = p.y - my;
        const distM = Math.sqrt(dxM * dxM + dyM * dyM);
        if (distM < 160) {
          const force = (160 - distM) / 160;
          p.vx += (dxM / distM) * force * 0.06;
          p.vy += (dyM / distM) * force * 0.06;
        }

        // scroll energy pushes them
        p.vy -= energyRef.current * 0.04;

        // damping
        p.vx *= 0.97;
        p.vy *= 0.97;

        // wrap edges
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        // draw glowing dot
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 3.5);
        const op = p.opacity * (0.85 + 0.15 * Math.sin(t * p.speed + p.phase));
        glow.addColorStop(0, `${p.color}${op})`);
        glow.addColorStop(0.4, `${p.color}${op * 0.4})`);
        glow.addColorStop(1, `${p.color}0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 3.5, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // solid core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${op})`;
        ctx.fill();
      }

      // ── Orb ─────────────────────────────────────────────────────────────────
      const orb = orbRef.current;
      // Fixed position — right side of hero empty space
      const fixedX = w * 0.80;
      const fixedY = h * 0.42;

      // Orb stays fixed, only gentle float bob
      orb.x = fixedX;
      orb.y = fixedY + Math.sin(t * 0.9) * 6;
      orb.rotation += 0.012;

      // Mouse proximity for interactive glow (no movement)
      const dxOrb = mx - fixedX;
      const dyOrb = my - fixedY;
      const distOrb = Math.sqrt(dxOrb * dxOrb + dyOrb * dyOrb);
      const proximity = Math.max(0, 1 - distOrb / 260); // 0..1 as mouse gets closer

      const ox = orb.x;
      const oy = orb.y;
      const R = 75; // orb radius — large and visible

      ctx.save();
      ctx.translate(ox, oy);

      // outer glow — brightens as mouse gets close
      const glowIntensity = 0.22 + proximity * 0.35;
      const outerGlow = ctx.createRadialGradient(0, 0, R * 0.5, 0, 0, R * 2.8);
      outerGlow.addColorStop(0, `rgba(99,102,241,${glowIntensity})`);
      outerGlow.addColorStop(0.5, `rgba(139,92,246,${glowIntensity * 0.45})`);
      outerGlow.addColorStop(1, "rgba(99,102,241,0)");
      ctx.beginPath();
      ctx.arc(0, 0, R * (2.8 + proximity * 0.5), 0, Math.PI * 2);
      ctx.fillStyle = outerGlow;
      ctx.fill();

      // core sphere gradient
      const sphereGrad = ctx.createRadialGradient(-R * 0.3, -R * 0.3, R * 0.05, 0, 0, R);
      sphereGrad.addColorStop(0, "rgba(167,139,250,0.95)");
      sphereGrad.addColorStop(0.4, "rgba(99,102,241,0.85)");
      sphereGrad.addColorStop(0.75, "rgba(59,130,246,0.75)");
      sphereGrad.addColorStop(1, "rgba(30,27,75,0.9)");
      ctx.beginPath();
      ctx.arc(0, 0, R, 0, Math.PI * 2);
      ctx.fillStyle = sphereGrad;
      ctx.fill();

      // specular highlight
      const specGrad = ctx.createRadialGradient(-R * 0.32, -R * 0.32, 0, -R * 0.32, -R * 0.32, R * 0.55);
      specGrad.addColorStop(0, "rgba(255,255,255,0.45)");
      specGrad.addColorStop(1, "rgba(255,255,255,0)");
      ctx.beginPath();
      ctx.arc(0, 0, R, 0, Math.PI * 2);
      ctx.fillStyle = specGrad;
      ctx.fill();

      // orbit ring 1 — indigo (spins faster on proximity)
      const ringSpeed = 1 + proximity * 2.5;
      ctx.save();
      ctx.rotate(orb.rotation * ringSpeed);
      ctx.scale(1, 0.32);
      ctx.beginPath();
      ctx.arc(0, 0, R * 1.55, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(99,102,241,0.75)";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();

      // orbit ring 2 — pink, different angle
      ctx.save();
      ctx.rotate(-orb.rotation * 0.7 * ringSpeed + 1.1);
      ctx.scale(0.32, 1);
      ctx.beginPath();
      ctx.arc(0, 0, R * 1.4, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(236,72,153,0.65)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();

      // orbit ring 3 — violet, tilted
      ctx.save();
      ctx.rotate(orb.rotation * 1.3 + 2.2);
      ctx.scale(0.5, 1.0);
      ctx.beginPath();
      ctx.arc(0, 0, R * 1.25, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(139,92,246,0.5)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();

      // orbiting dot on ring 1
      const dotAngle = orb.rotation * 2.5;
      const dotR = R * 1.55;
      ctx.beginPath();
      ctx.arc(Math.cos(dotAngle) * dotR, Math.sin(dotAngle) * dotR * 0.32, 4, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(167,139,250,0.95)";
      ctx.fill();

      // orbiting dot on ring 2
      const dotAngle2 = -orb.rotation * 1.8 + 1.1;
      ctx.save();
      ctx.rotate(-orb.rotation * 0.7 + 1.1);
      ctx.beginPath();
      ctx.arc(Math.cos(dotAngle2) * R * 1.4 * (1/0.32), Math.sin(dotAngle2) * R * 1.4, 3, 0, Math.PI * 2);
      ctx.restore();
      ctx.beginPath();
      ctx.arc(
        Math.cos(-orb.rotation * 1.8) * R * 1.4 * 0.32,
        Math.sin(-orb.rotation * 1.8) * R * 1.4,
        3, 0, Math.PI * 2
      );
      ctx.fillStyle = "rgba(236,72,153,0.9)";
      ctx.fill();

      ctx.restore();
    };

    animate();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: -10,
        pointerEvents: "none",
        display: "block",
      }}
    />
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────
export function LofiBackground() {
  const [isCoarse, setIsCoarse] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: none), (pointer: coarse)");
    setIsCoarse(mq.matches);
  }, []);

  if (isCoarse) return null;

  return (
    <ErrorBoundary
      fallback={
        <div
          className="fixed inset-0 -z-10 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(99,102,241,0.25) 0%, rgba(139,92,246,0.15) 30%, rgba(236,72,153,0.12) 60%, #050714 100%)"
          }}
        />
      }
    >
      <BackgroundCanvas />
    </ErrorBoundary>
  );
}
