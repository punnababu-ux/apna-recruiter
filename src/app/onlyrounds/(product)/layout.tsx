/**
 * /onlyrounds/(product) — product shell layout.
 *
 * Wraps every in-product surface (Jobs, Clients, History, Credits, Job
 * detail, Create Job, etc.) in the persistent sidebar + inset container.
 * The `(product)` segment is a route group so the path doesn't leak into
 * URLs — `/onlyrounds/jobs` stays `/onlyrounds/jobs`.
 */

import { cookies } from "next/headers"
import { OnlyRoundsSidebar } from "@/components/onlyrounds/app-sidebar"
import { ProductTopBar } from "@/components/onlyrounds/product-top-bar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export default async function OnlyRoundsProductLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar_state")?.value !== "false"

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <OnlyRoundsSidebar />
      <SidebarInset className="bg-muted">
        <ProductTopBar />
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
