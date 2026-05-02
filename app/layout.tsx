import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClientShell } from "@/components/layout/ClientShell";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter"
});

export const metadata: Metadata = {
  title: {
    default: "Artifex AI Studio",
    template: "%s | Artifex AI Studio"
  },
  description:
    "We help you start 'The Un-stoppable' phase of your company with AI agents, custom websites, and apps.",
  metadataBase: new URL("https://artifexai.studio")
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen antialiased">
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
