import * as React from "react"
import Link from "next/link"
import type { Metadata } from "next"
import { Layers, ArrowLeft } from "@apna/design-system"

import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
  Separator,
  Button,
} from "@apna/design-system"
import { DocsSidebar } from "@/components/design-system/docs-sidebar"
import { ThemeToggle } from "@/components/design-system/theme-toggle"

// This whole subtree is internal tooling, not the public product — it should
// read as "Poneglyph", not "apna for employers". A nested layout's own
// `title.template` replaces the parent's for everything under it, so this
// is the one override needed; individual doc pages just set a short title.
export const metadata: Metadata = {
  title: {
    template: "%s · Poneglyph",
    default: "Poneglyph Design System",
  },
  description: "Poneglyph — apna's design system. Tokens, components, and usage docs.",
  robots: { index: false, follow: false },
}

export default function DesignSystemLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-background text-foreground font-body">
        <DocsSidebar />
        <SidebarInset className="flex flex-1 flex-col overflow-hidden">
          {/* Top Bar */}
          <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center justify-between border-b border-border bg-card/80 px-4 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <SidebarTrigger />
              <Separator orientation="vertical" className="h-4" />
              <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
                <Layers className="size-3.5 text-primary" />
                <span>Poneglyph Design System</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button
                variant="outline"
                size="xs"
                render={
                  <Link href="/apnahire/jobs">
                    <ArrowLeft className="mr-1 size-3.5" />
                    Back to Apna Hire Product
                  </Link>
                }
              />
            </div>
          </header>

          {/* Main Content Area */}
          <main className="flex-1 overflow-y-auto p-6 md:p-8 max-w-7xl w-full mx-auto">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
