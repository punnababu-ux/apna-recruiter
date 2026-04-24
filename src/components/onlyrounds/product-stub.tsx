/**
 * ProductStub — placeholder surface used by routes whose full template is
 * still in the build queue. Keeps the sidebar + shell testable without
 * shipping broken pages.
 */

import { PageHeader } from "@/components/onlyrounds/page-header"
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty"

export function ProductStub({
  title,
  description = "This surface hasn’t been built yet.",
}: {
  title: string
  description?: string
}) {
  return (
    <div className="flex min-h-svh flex-col">
      <PageHeader title={title} />
      <main className="flex flex-1 items-center justify-center px-6 py-6">
        <Empty className="max-w-md">
          <EmptyHeader>
            <EmptyTitle>Coming soon</EmptyTitle>
            <EmptyDescription>{description}</EmptyDescription>
          </EmptyHeader>
        </Empty>
      </main>
    </div>
  )
}
