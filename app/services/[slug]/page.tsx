import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailTemplate } from "@/components/services/ServiceDetailTemplate";
import { SERVICE_SLUGS, SERVICES_CONTENT, type ServiceSlug } from "@/lib/data/services";

export function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const data = SERVICES_CONTENT[params.slug as ServiceSlug];
  if (!data) return {};
  return {
    title: data.title,
    description: data.description
  };
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const data = SERVICES_CONTENT[params.slug as ServiceSlug];
  if (!data) notFound();
  return <ServiceDetailTemplate data={data} />;
}
