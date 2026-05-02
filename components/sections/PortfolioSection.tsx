"use client";

import { SectionHeader, SectionShell } from "@/components/sections/SectionShell";
import { PortfolioExplorer } from "@/components/portfolio/PortfolioExplorer";

export function PortfolioSection() {
  return (
    <SectionShell id="portfolio">
      <div className="flex flex-col gap-10">
        <SectionHeader
          eyebrow="Portfolio"
          title="Proof, not promises"
          subtitle="Filter by category or search—every card opens a full case study."
        />
        <PortfolioExplorer embedded showHeaderLink />
      </div>
    </SectionShell>
  );
}
