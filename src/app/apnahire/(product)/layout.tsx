/**
 * /apnahire/(product) — product shell layout.
 *
 * Wraps every in-product Apna Hire surface (Dashboard, Talent Sourcing,
 * Assessments, Billing, etc.) in the persistent sidebar + inset container.
 *
 * The `(product)` segment is a route group so the path doesn't leak into
 * URLs — `/apnahire/dashboard` stays `/apnahire/dashboard`.
 */

import { cookies } from "next/headers"
import { ApnaHireSidebar } from "@/components/apnahire/app-sidebar"
import { ApnaHireTopBar } from "@/components/apnahire/top-bar"
import { SidebarInset, SidebarProvider } from "@apna/design-system"

export default async function ApnaHireProductLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar_state")?.value !== "false"

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <ApnaHireSidebar />
      <SidebarInset className="bg-muted">
        <ApnaHireTopBar />
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
