export type ProjectCategory =
  | "AI Agents"
  | "AI Receptionist"
  | "Custom Website Building"
  | "App Building";

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  tech: string;
  result: string;
  gradient: string;
  image: string; // hero card image
  description: string;
  challenge: string;
  solution: string;
  metrics: { label: string; value: string }[];
  testimonial: { quote: string; author: string; role: string };
  gallery: string[];
  liveUrl?: string;
  caseStudyUrl?: string;
  downloads?: string;
  revenue?: string;
  engagement?: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "aura",
    title: "Aura — Architecture & Interiors",
    category: "Custom Website Building",
    tech: "Next.js, Framer Motion, Tailwind CSS",
    result:
      "A fully immersive, award-worthy digital experience for a luxury architecture studio, resulting in a 4× increase in consultation inquiries.",
    gradient: "from-[#1a1810] to-[#0c0b09]",
    image: "/images/work/aura/hero.png",
    description:
      "Aura is a premium architecture and interior design studio. We crafted an immersive, long-scroll website following 'Quiet Luxury' design principles — parallax imagery, serif typography, and purposeful subtle motion.",
    challenge:
      "The client's existing website was a generic template that failed to communicate their ultra-premium positioning. High-net-worth clients expect a digital experience that matches the caliber of the physical spaces Aura creates.",
    solution:
      "We designed a cinematic, editorially-driven web experience inspired by Architectural Digest. Full-bleed imagery, parallax scrolling, asymmetrical gallery layouts, and a warm champagne-gold color palette establish instant authority and emotional resonance.",
    metrics: [
      { label: "Page Views / Visit", value: "6.2" },
      { label: "Avg. Session Duration", value: "4m 18s" },
      { label: "Inquiry Conversion", value: "+312%" },
      { label: "Bounce Rate", value: "-47%" },
    ],
    testimonial: {
      quote:
        "Artifex didn't just build a website — they translated our design philosophy into a digital experience our clients can feel before they ever walk through our doors.",
      author: "Vikram Desai",
      role: "Founder, Aura Design Studio",
    },
    gallery: [
      "/images/work/aura/gallery-1.png",
      "/images/work/aura/gallery-2.png",
      "/images/work/aura/gallery-3.png",
      "/images/work/aura/gallery-4.png",
    ],
    liveUrl: "/work/aura",
  },
  {
    slug: "elysian-vows",
    title: "Elysian Vows — Luxury Weddings",
    category: "Custom Website Building",
    tech: "Next.js, Framer Motion, GSAP",
    result:
      "A romantic, high-end digital experience that doubled lead generation for destination weddings within the first 3 months.",
    gradient: "from-[#fdfbf7] to-[#f5efdf]",
    image: "/images/work/elysian-vows/hero.png",
    description:
      "Elysian Vows is a premier luxury wedding planning service. We built a dreamlike, ethereal showcase that captures the emotional essence of their most opulent celebrations.",
    challenge:
      "The client needed to move away from a standard portfolio layout to something that felt as curated and exclusive as the weddings they produce. The challenge was balancing high-res visual density with smooth performance.",
    solution:
      "We implemented a cinematic narrative scroll experience. Using soft-focus parallax, bloom effects, and horizontal story-scrolling, we created a digital journey that feels like flipping through a high-end bridal editorial.",
    metrics: [
      { label: "Engagement Rate", value: "84%" },
      { label: "Time on Site", value: "5m 30s" },
      { label: "New Leads", value: "+210%" },
      { label: "Mobile Traffic", value: "72%" },
    ],
    testimonial: {
      quote:
        "Elysian Vows now has a digital home that is as beautiful as the vows our couples exchange. It is truly a masterpiece of emotional design.",
      author: "Elena Rossi",
      role: "Creative Director, Elysian Vows",
    },
    gallery: [
      "/images/work/elysian-vows/gallery-1.png",
      "/images/work/elysian-vows/gallery-2.png",
      "/images/work/elysian-vows/gallery-3.png",
      "/images/work/elysian-vows/gallery-4.png",
    ],
    liveUrl: "/work/elysian-vows",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getRelatedProjects(category: ProjectCategory, excludeSlug: string, limit = 3) {
  const same = PROJECTS.filter((p) => p.category === category && p.slug !== excludeSlug);
  if (same.length >= limit) return same.slice(0, limit);
  const rest = PROJECTS.filter((p) => p.slug !== excludeSlug && !same.some((s) => s.slug === p.slug));
  return [...same, ...rest].slice(0, limit);
}
