import type { Metadata } from "next";
import { PortfolioExplorer } from "@/components/portfolio/PortfolioExplorer";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Case studies across interior visualization, ads, web, AI agents, and apps."
};

export default function PortfolioPage() {
  return (
    <main className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-24">
      <PortfolioExplorer showHeaderLink={false} />
    </main>
  );
}
