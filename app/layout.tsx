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
  title: "Ahmed Ashraf — Full-stack developer (web, mobile & AI)",
  description:
    "I design and ship production web and mobile apps end to end — from the database to the deployed product — with a specialty in AI integration. Real, live systems, not prototypes.",
  keywords: [
    "Ahmed Ashraf", "full-stack developer", "React", "Next.js", "React Native",
    "Node.js", "PostgreSQL", "AI integration", "Claude API", "MCP",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Ahmed Ashraf — Full-stack developer (web, mobile & AI)",
    description:
      "Production web and mobile apps, shipped end to end, with a specialty in AI integration.",
    url: siteUrl,
    siteName: "Ahmed Ashraf",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahmed Ashraf — Full-stack developer (web, mobile & AI)",
    description:
      "Production web and mobile apps, shipped end to end, with a specialty in AI integration.",
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
