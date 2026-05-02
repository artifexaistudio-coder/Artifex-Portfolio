import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Thank you",
  description: "Thanks for contacting Artifex AI Studio."
};

export default function ThankYouPage() {
  return (
    <main className="mx-auto max-w-[720px] px-4 sm:px-6 lg:px-8 py-28 text-center">
      <p className="text-xs tracking-[0.35em] text-white/55 uppercase">Received</p>
      <h1 className="mt-4 text-4xl font-extrabold text-white">Thank you!</h1>
      <p className="mt-4 text-lg text-white/70">
        Your message is in. We typically reply within <span className="text-white font-semibold">24 hours</span>.
      </p>
      <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/"
          className="rounded-xl px-6 py-3 font-semibold text-white bg-gradient-to-r from-primary to-secondary"
        >
          Back to home
        </Link>
        <Link href="/portfolio" className="rounded-xl px-6 py-3 font-semibold text-white/90 glass">
          Explore portfolio
        </Link>
      </div>
    </main>
  );
}
