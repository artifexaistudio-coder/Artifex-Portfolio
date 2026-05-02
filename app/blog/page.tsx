import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on AI, design, and growth from Artifex AI Studio."
};

const POSTS = [
  {
    slug: "ai-interior-design",
    title: "How AI is transforming interior design sales",
    excerpt: "Why visualization speed is now a competitive moat for developers and designers."
  },
  {
    slug: "ad-creative-tips",
    title: "10 tips for converting ad creatives (with AI in the loop)",
    excerpt: "A practical checklist for hooks, variants, and testing discipline."
  },
  {
    slug: "nextjs-performance",
    title: "Next.js performance budgets that clients actually feel",
    excerpt: "LCP, CLS, and the product metrics they influence."
  }
];

export default function BlogPage() {
  return (
    <main className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-24">
      <p className="text-xs tracking-[0.35em] text-white/55 uppercase">Blog</p>
      <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold text-white">Insights</h1>
      <p className="mt-4 max-w-2xl text-lg text-white/70">Practical essays—placeholder routes for now.</p>

      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {POSTS.map((p) => (
          <article key={p.slug} className="glass rounded-3xl border border-white/10 p-6">
            <h2 className="text-lg font-extrabold text-white">{p.title}</h2>
            <p className="mt-3 text-sm text-white/70 leading-relaxed">{p.excerpt}</p>
            <Link href={`/blog/${p.slug}`} className="mt-4 inline-block text-sm font-semibold text-accent hover:underline">
              Read more →
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}
