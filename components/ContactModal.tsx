"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useContactModal } from "@/components/providers/ContactModalContext";
import { ContactForm } from "@/components/contact/ContactForm";

export function ContactModal() {
  const { open, closeContact } = useContactModal();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            aria-label="Close contact form"
            onClick={closeContact}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 16, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative z-10 w-full max-w-lg glass rounded-3xl border border-white/10 p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 id="contact-modal-title" className="text-xl font-extrabold text-white">
                  Start your project
                </h2>
                <p className="mt-1 text-sm text-white/65">
                  Tell us what you’re building—we’ll reply within 24 hours.
                </p>
              </div>
              <button
                type="button"
                onClick={closeContact}
                className="rounded-xl px-3 py-2 text-sm text-white/70 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
              >
                Close
              </button>
            </div>

            <div className="mt-6">
              <ContactForm
                variant="compact"
                onSuccess={closeContact}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
