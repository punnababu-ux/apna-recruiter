import * as React from "react"
import Link from "next/link"
import { Layers, ArrowLeft } from "lucide-react"

import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
  Separator,
  Button,
} from "@apna/design-system"
import { DocsSidebar } from "@/components/design-system/docs-sidebar"
import { ThemeToggle } from "@/components/design-system/theme-toggle"

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
