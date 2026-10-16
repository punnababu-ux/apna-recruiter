import type { Metadata, Viewport } from "next";
import { Geist_Mono, Inter, Playfair_Display } from "next/font/google";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { InkProvider } from "@/components/ui/ink-provider";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import "./globals.css";

// Inter · Apna body + heading typeface (replaced Figtree, Oct 2026, to match
// the Figma files). A variable font, so every weight the token scale uses
// (300–900) comes from one file. Exposed as `--font-sans-face`, which
// `--font-family-sans` in primitives.css reads; swap the face here and the
// whole system follows.
const inter = Inter({
  variable: "--font-sans-face",
  subsets: ["latin"],
  display: "swap",
});

// Playfair Display · the editorial serif (2026-10-17): hero headlines,
// section titles and pull quotes on the marketing pages, never UI. Read
// through `--font-family-editorial` (primitives.css). Variable, with italic
// for the one accented word a headline may carry.
const playfair = Playfair_Display({
  variable: "--font-editorial-face",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

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

// viewport-fit=cover lets bottom-fixed bars read the notch / home-indicator
// insets through env(safe-area-inset-*) — see the `pb-safe` utility.
export const viewport: Viewport = {
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full">
        <ThemeProvider>
          <TooltipProvider>{children}</TooltipProvider>
          <Toaster />
          <InkProvider />
        </ThemeProvider>
      </body>
    </html>
  );
}
