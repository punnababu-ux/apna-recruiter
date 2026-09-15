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

export const metadata: Metadata = {
  title: "Poneglyph",
  description: "Poneglyph Design System",
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
