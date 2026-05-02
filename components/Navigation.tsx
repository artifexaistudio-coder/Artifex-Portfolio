"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useContactModal } from "@/components/providers/ContactModalContext";

type NavItem = { label: string; href: string; match?: string[] };

const NAV: NavItem[] = [
  { label: "Home", href: "/", match: ["/"] },
  { label: "Services", href: "/services", match: ["/services"] },
  { label: "Portfolio", href: "/portfolio", match: ["/portfolio"] },
  { label: "Process", href: "/#process", match: [] },
  { label: "Pricing", href: "/pricing", match: ["/pricing"] },
  { label: "About", href: "/about", match: ["/about"] },
  { label: "Contact", href: "/contact", match: ["/contact"] }
];

function scrollToHash(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const { openContact } = useContactModal();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const headerClass = useMemo(
    () =>
      cn(
        "fixed top-0 left-0 right-0 z-50",
        "transition-colors duration-300",
        isScrolled ? "bg-white/5 backdrop-blur-xl border-b border-white/10" : "bg-transparent"
      ),
    [isScrolled]
  );

  const isActive = (item: NavItem) => {
    if (item.href.startsWith("/#")) return pathname === "/" && false;
    if (item.match?.length) {
      return item.match.some((m) => pathname === m || pathname.startsWith(`${m}/`));
    }
    return pathname === item.href;
  };

  const onNavClick = (e: React.MouseEvent, href: string) => {
    if (href === "/#process") {
      e.preventDefault();
      if (pathname === "/") scrollToHash("process");
      else router.push("/#process");
      setIsOpen(false);
    }
  };

  return (
    <header className={headerClass}>
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 rounded-lg"
            aria-label="Artifex AI home"
          >
            <span className="font-semibold tracking-tight text-white">
              Artifex <span className="text-white/70">AI</span>
            </span>
            <span className="hidden sm:inline text-xs text-white/50 group-hover:text-white/70 transition-colors">
              Studio
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
            {NAV.map((item) => {
              const active = isActive(item);
              if (item.href === "/#process") {
                return (
                  <Link
                    key={item.href}
                    href="/#process"
                    onClick={(e) => onNavClick(e, item.href)}
                    className={cn(
                      "text-sm px-3 py-2 rounded-lg transition-colors",
                      active
                        ? "text-white bg-white/10"
                        : "text-white/70 hover:text-white hover:bg-white/5"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              }
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm px-3 py-2 rounded-lg transition-colors",
                    active
                      ? "text-white bg-white/10"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <button
              type="button"
              onClick={openContact}
              className={cn(
                "ml-2 rounded-xl px-4 py-2 text-sm font-semibold text-white",
                "bg-gradient-to-r from-primary to-secondary",
                "shadow-[0_0_30px_rgba(99,102,241,0.35)] hover:shadow-[0_0_45px_rgba(99,102,241,0.55)]",
                "transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
              )}
            >
              Start Project
            </button>
          </nav>

          <button
            type="button"
            className="lg:hidden inline-flex items-center justify-center rounded-xl p-2 glass focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <div className="relative h-5 w-6">
              <span
                className={cn(
                  "absolute left-0 top-1 h-0.5 w-6 bg-white transition-transform duration-200",
                  isOpen && "translate-y-2 rotate-45"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-2.5 h-0.5 w-6 bg-white transition-opacity duration-200",
                  isOpen && "opacity-0"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-4 h-0.5 w-6 bg-white transition-transform duration-200",
                  isOpen && "-translate-y-3 -rotate-45"
                )}
              />
            </div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="lg:hidden fixed inset-y-0 right-0 z-[60] w-[min(92vw,360px)] border-l border-white/10 bg-[#0F172A]/95 backdrop-blur-xl shadow-2xl"
          >
            <div className="p-4 flex flex-col gap-2 pt-20">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    if (item.href === "/#process") {
                      onNavClick(e, item.href);
                    } else {
                      setIsOpen(false);
                    }
                  }}
                  className="rounded-xl px-4 py-3 glass text-white/80 hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  openContact();
                }}
                className="rounded-xl px-4 py-3 text-sm font-semibold text-white bg-gradient-to-r from-primary to-secondary"
              >
                Start Project
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isOpen && (
        <button
          type="button"
          aria-label="Close menu overlay"
          className="lg:hidden fixed inset-0 z-[55] bg-black/60"
          onClick={() => setIsOpen(false)}
        />
      )}
    </header>
  );
}
