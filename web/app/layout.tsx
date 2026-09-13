import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://audit-doctor.vercel.app"),
  title: "Audit Doctor — 39 Production Readiness Checks & AI Agent Fixer Generator",
  description:
    "Comprehensive auditor & AI agent fixer generator for Next.js, React, Vite, Remix, Astro, Svelte, and Vue web applications.",
  icons: {
    icon: "/assets/logo.webp",
    shortcut: "/assets/logo.webp",
    apple: "/assets/logo.webp",
  },
  openGraph: {
    title: "Audit Doctor — 39 Production Readiness Checks & AI Agent Fixer Generator",
    description:
      "Audit modern web applications across 39 production readiness standards and command AI agents to fix findings.",
    url: "https://audit-doctor.vercel.app",
    siteName: "Audit Doctor",
    images: [
      {
        url: "/assets/og.png",
        width: 1200,
        height: 630,
        alt: "Audit Doctor — 39 Production Readiness Checks & AI Agent Fixer Generator",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Audit Doctor — 39 Production Readiness Checks & AI Agent Fixer Generator",
    description:
      "Audit modern web applications across 39 production readiness standards and command AI agents to fix findings.",
    images: ["/assets/og.png"],
    creator: "@devchauhann3",
  },
  alternates: {
    canonical: "./",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased min-h-screen selection:bg-white/20 selection:text-white font-sans">
        {children}
      </body>
    </html>
  );
}
