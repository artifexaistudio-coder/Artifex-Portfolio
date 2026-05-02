"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SectionHeader, SectionShell } from "@/components/sections/SectionShell";
import { ContactForm } from "@/components/contact/ContactForm";
import { IconLink, LinkedInIcon, TwitterIcon, InstagramIcon } from "@/components/sections/ContactAside";

export function ContactSection() {
  return (
    <SectionShell id="contact" className="pb-28">
      <div className="flex flex-col gap-10">
        <SectionHeader
          eyebrow="Contact"
          title="Start a project"
          subtitle="Tell us what you’re building. We’ll respond fast with a clear next step."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.55 }}
            className="glass rounded-3xl border border-white/10 p-6 sm:p-8"
          >
            <ContactForm variant="full" />
            <p className="mt-4 text-sm text-white/55">
              Want the full experience?{" "}
              <Link href="/contact" className="text-accent hover:underline font-semibold">
                Open the contact page
              </Link>
              .
            </p>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="glass rounded-3xl border border-white/10 p-6 sm:p-8"
            aria-label="Contact information"
          >
            <h3 className="text-2xl font-extrabold tracking-tight text-white">
              Let&apos;s Build Something Amazing
            </h3>
            <p className="mt-3 text-white/70">
              Prefer email? Reach out anytime—we’ll reply quickly with a clear plan.
            </p>

            <div className="mt-8 space-y-4 text-sm">
              <div>
                <p className="text-white/55">Email</p>
                <a
                  href="mailto:hello@artifexai.studio"
                  className="text-white hover:text-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 rounded"
                >
                  hello@artifexai.studio
                </a>
              </div>
              <div>
                <p className="text-white/55">Location</p>
                <p className="text-white">Hyderabad, India</p>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-3 text-white/80">
              <IconLink href="https://linkedin.com" label="LinkedIn">
                <LinkedInIcon />
              </IconLink>
              <IconLink href="https://x.com" label="Twitter / X">
                <TwitterIcon />
              </IconLink>
              <IconLink href="https://instagram.com" label="Instagram">
                <InstagramIcon />
              </IconLink>
            </div>
          </motion.aside>
        </div>
      </div>
    </SectionShell>
  );
}
