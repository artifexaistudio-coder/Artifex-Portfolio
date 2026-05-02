import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { IconLink, LinkedInIcon, TwitterIcon, InstagramIcon } from "@/components/sections/ContactAside";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Artifex AI Studio in Hyderabad. Book a project or ask a question."
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-24">
      <p className="text-xs tracking-[0.35em] text-white/55 uppercase">Contact</p>
      <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold text-white">Let&apos;s talk</h1>
      <p className="mt-4 max-w-2xl text-lg text-white/70">
        Share your goals—we’ll respond with next steps, timeline, and pricing guidance.
      </p>

      <div className="mt-12 grid gap-10 lg:grid-cols-2">
        <div className="glass rounded-3xl border border-white/10 p-6 sm:p-8">
          <ContactForm variant="full" />
        </div>

        <aside className="space-y-6">
          <div className="glass rounded-3xl border border-white/10 p-6">
            <h2 className="text-lg font-extrabold text-white">Studio</h2>
            <p className="mt-2 text-sm text-white/70">Hyderabad, India</p>
            <p className="mt-4 text-sm text-white/70">
              Email:{" "}
              <a className="text-accent hover:underline" href="mailto:contact@artifexai.studio">
                contact@artifexai.studio
              </a>
            </p>
            <p className="mt-2 text-sm text-white/70">Hours: Mon–Sat, 10:00–19:00 IST</p>
            <div className="mt-6 flex gap-3">
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
          </div>

          <div className="glass rounded-3xl border border-white/10 overflow-hidden">
            <div className="aspect-video w-full bg-white/5">
              <iframe
                title="Hyderabad map"
                className="h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243646.90504353027!2d78.243232!3d17.4126086!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99daeaebddfb%3A0xca903c4e2c4e4e4e!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              />
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
