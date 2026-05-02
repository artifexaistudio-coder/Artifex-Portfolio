"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-[85] flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="w-[min(92vw,360px)] glass rounded-2xl border border-white/10 p-4 shadow-2xl"
            role="dialog"
            aria-label="Chat"
          >
            <p className="text-sm font-semibold text-white">Artifex Assistant</p>
            <p className="mt-2 text-sm text-white/70">
              Hi! Tell us about your project—our team replies within 24 hours. For urgent work, email{" "}
              <a className="text-accent underline" href="mailto:contact@artifexai.studio">
                contact@artifexai.studio
              </a>
              .
            </p>
            <a
              href="https://wa.me/919000000000"
              target="_blank"
              rel="noreferrer"
              className={cn(
                "mt-4 inline-flex w-full justify-center rounded-xl px-4 py-2 text-sm font-semibold text-white",
                "bg-gradient-to-r from-primary to-secondary"
              )}
            >
              WhatsApp us
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "h-14 w-14 rounded-full shadow-[0_0_30px_rgba(99,102,241,0.45)]",
          "bg-gradient-to-r from-primary to-secondary text-white font-bold",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
        )}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? "×" : "💬"}
      </button>
    </div>
  );
}
