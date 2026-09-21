import type { Metadata } from "next";
import { Figtree, Geist_Mono } from "next/font/google";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import "./globals.css";

// Figtree · Apna brand body + heading typeface.
// Exposed via `--font-geist-sans` (legacy variable name retained so the
// semantic layer in primitives.css keeps working without edits elsewhere).
const figtree = Figtree({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

// Inter was loaded here for /apnahire, which now inherits Figtree like every
// other surface. Dropped rather than left dangling — an unused next/font entry
// still ships its @font-face. Re-add it here if Inter ever becomes the global
// typeface, and point `--font-family-sans` at it in primitives.css.

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// The site-wide default. `/design-system` (internal docs, not the public
// product) overrides this with its own title template in its own layout —
// Next lets a nested layout replace the parent's template for everything
// under it. Every other page just sets a short `title: "..."` and gets the
// " · apna for employers" suffix for free.
//
// metadataBase turns every relative `openGraph.images` URL below (and in
// per-page metadata) into an absolute one — required for OG/Twitter cards,
// which don't resolve relative URLs. employer.apna.co is the real production
// host this app is standing in for.
export const metadata: Metadata = {
  metadataBase: new URL("https://employer.apna.co"),
  title: {
    template: "%s · apna for employers",
    default: "apna for employers — Hire top talent, faster",
  },
  description:
    "India's largest AI-native early talent platform. Post jobs, search 6 crore+ candidates, and hire faster with apna.",
  openGraph: {
    siteName: "apna for employers",
    type: "website",
    images: [{ url: "/apna-logo.svg" }],
  },
  twitter: {
    card: "summary",
    images: [{ url: "/apna-logo.svg" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${figtree.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full">
        <ThemeProvider>
          <TooltipProvider>{children}</TooltipProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
