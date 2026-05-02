"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { CustomCursor } from "@/components/CustomCursor";
import { Navigation } from "@/components/Navigation";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ContactModalProvider } from "@/components/providers/ContactModalContext";
import { ContactModal } from "@/components/ContactModal";
import { ChatWidget } from "@/components/ChatWidget";
import { BackToTop } from "@/components/BackToTop";

const AppBackground = dynamic(
  () => import("@/components/LofiBackground").then((m) => m.AppBackground),
  { ssr: false }
);

export function ClientShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isShowcase = pathname.startsWith("/work/");

  if (isShowcase) {
    return (
      <ContactModalProvider>
        <div className="relative min-h-screen">
          <div className="relative z-[1]">{children}</div>
          <ContactModal />
        </div>
      </ContactModalProvider>
    );
  }

  return (
    <ContactModalProvider>
      <div className="relative min-h-screen">
        <AppBackground />
        <CustomCursor />
        <Navigation />
        <div className="relative z-[1]">{children}</div>
        <SiteFooter />
        <ContactModal />
        <ChatWidget />
        <BackToTop />
      </div>
    </ContactModalProvider>
  );
}
