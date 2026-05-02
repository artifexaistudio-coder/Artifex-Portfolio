import Link from "next/link";

const links = [
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" }
];

export function SiteFooter() {
  return (
    <footer className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-10 text-sm text-white/60">
      <div className="glass rounded-2xl px-6 py-6 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-white/80 font-semibold">Artifex AI Studio</p>
          <p className="mt-1">© {new Date().getFullYear()} Artifex AI Studio. All rights reserved.</p>
        </div>
        <nav className="flex flex-wrap gap-x-4 gap-y-2" aria-label="Footer">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-white/60 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 rounded"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
