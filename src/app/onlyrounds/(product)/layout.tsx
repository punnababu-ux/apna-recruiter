/**
 * /onlyrounds/(product) — product shell layout.
 *
 * Wraps every in-product surface (Jobs, Clients, History, Credits, Job
 * detail, Create Job, etc.) in the persistent sidebar + inset container.
 * The `(product)` segment is a route group so the path doesn't leak into
 * URLs — `/onlyrounds/jobs` stays `/onlyrounds/jobs`.
 */

import { OnlyRoundsSidebar } from "@/components/onlyrounds/app-sidebar"
import { ProductTopBar } from "@/components/onlyrounds/product-top-bar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export default function OnlyRoundsProductLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <OnlyRoundsSidebar />
      <SidebarInset className="bg-muted">
        <ProductTopBar />
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
