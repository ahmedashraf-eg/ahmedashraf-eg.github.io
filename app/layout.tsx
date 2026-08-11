import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

// Self-hosted so the build never depends on Google Fonts being reachable.
// Variable file covers the 200–800 range the design uses.
const manrope = localFont({
  src: "./fonts/manrope-variable.woff2",
  weight: "200 800",
  variable: "--font-manrope",
  display: "swap",
});

// Set NEXT_PUBLIC_SITE_URL once you own a domain. Otherwise production builds
// use the GitHub Pages address, and dev uses localhost.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NODE_ENV === "production"
    ? "https://ahmedashraf-eg.github.io"
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Ahmed Ashraf — AI automation engineer (LLM workflows & integrations)",
  description:
    "I design, ship and operate production AI automation — LLM workflows, agent systems and the integrations around them — end to end, with a person in the loop where it matters. Real, live systems, not prototypes.",
  keywords: [
    "Ahmed Ashraf", "AI automation engineer", "workflow automation", "AI agents",
    "Claude API", "MCP", "Model Context Protocol", "Make.com", "Python", "FastAPI",
    "webhooks", "PostgreSQL", "Next.js", "React Native",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Ahmed Ashraf — AI automation engineer (LLM workflows & integrations)",
    description:
      "Production AI automation — LLM workflows, agent systems and integrations, shipped end to end and running in production.",
    url: siteUrl,
    siteName: "Ahmed Ashraf",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahmed Ashraf — AI automation engineer (LLM workflows & integrations)",
    description:
      "Production AI automation — LLM workflows, agent systems and integrations, shipped end to end and running in production.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={manrope.variable}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
