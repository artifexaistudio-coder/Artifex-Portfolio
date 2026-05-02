import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetail } from "@/components/portfolio/ProjectDetail";
import { PROJECTS, getProjectBySlug } from "@/lib/data/projects";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const p = getProjectBySlug(params.slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.description
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();
  return <ProjectDetail project={project} />;
}
