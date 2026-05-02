import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const POSTS: Record<string, { title: string; body: string }> = {
  "ai-interior-design": {
    title: "How AI is transforming interior design sales",
    body:
      "Visualization is no longer a nice-to-have—it is the conversion layer. Teams that can generate credible options quickly win more qualified buyers, shorten sales cycles, and reduce costly rework. The best workflows combine generative breadth with human curation: tight mood boards, disciplined lighting, and brand-safe palettes."
  },
  "ad-creative-tips": {
    title: "10 tips for converting ad creatives (with AI in the loop)",
    body:
      "Start with one clear promise. Build a matrix of hooks. Generate variants, but enforce brand guardrails. Test one variable at a time. Keep platform specs native. Measure beyond CTR—track downstream conversion. Iterate weekly, not monthly."
  },
  "nextjs-performance": {
    title: "Next.js performance budgets that clients actually feel",
    body:
      "Ship fewer client-side waterfalls. Prefer streaming and smart caching. Treat images as first-class. Measure LCP on real devices. Performance is a product feature—especially for SEO and international audiences."
  }
};

export function generateStaticParams() {
  return Object.keys(POSTS).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const p = POSTS[params.slug];
  if (!p) return {};
  return { title: p.title };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const p = POSTS[params.slug];
  if (!p) notFound();

  return (
    <main className="mx-auto max-w-[820px] px-4 sm:px-6 lg:px-8 py-24">
      <Link href="/blog" className="text-sm text-accent hover:underline">
        ← Back to blog
      </Link>
      <h1 className="mt-6 text-4xl font-extrabold text-white">{p.title}</h1>
      <p className="mt-8 text-lg text-white/75 leading-relaxed whitespace-pre-wrap">{p.body}</p>
    </main>
  );
}
