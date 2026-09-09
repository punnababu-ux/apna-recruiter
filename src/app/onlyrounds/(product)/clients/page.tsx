"use client"

/**
 * /onlyrounds/clients — Clients directory.
 *
 * Composition:
 *   PageHeader — title "Clients" + "Add client" CTA
 *   SearchFilterBar — search only (no filters)
 *   ClientsTable
 *   Dialog — ClientForm for adding a new client
 */

import { Plus } from "@apna/design-system"
import { useState } from "react"

import { ClientForm, type ClientFormValues } from "@/components/onlyrounds/client-form"
import { ClientsTable, type ClientRow } from "@/components/onlyrounds/clients-table"
import { PageHeader } from "@/components/onlyrounds/page-header"
import { Button } from "@/components/ui/button"
import { SearchFilterBar } from "@apna/design-system"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const SEED: ClientRow[] = [
  {
    id: "flipkart",
    name: "Flipkart",
    logo: "https://www.google.com/s2/favicons?domain=flipkart.com&sz=128",
    about: "Indian e-commerce marketplace headquartered in Bengaluru. Hires across product, engineering, and operations.",
    website: "https://flipkart.com",
    email: "talent@flipkart.com",
  },
  {
    id: "swiggy",
    name: "Swiggy",
    logo: "https://www.google.com/s2/favicons?domain=swiggy.com&sz=128",
    about: "Food delivery and quick-commerce platform operating across Indian cities.",
    website: "https://swiggy.com",
    email: "careers@swiggy.com",
  },
  {
    id: "amazon",
    name: "Amazon",
    logo: "https://www.google.com/s2/favicons?domain=amazon.com&sz=128",
    about: "Global marketplace and cloud infrastructure provider. India hubs in Bengaluru, Hyderabad, Chennai.",
    website: "https://amazon.in",
    email: "recruiting-in@amazon.com",
  },
]

export default function ClientsPage() {
  const [rows, setRows] = useState<ClientRow[]>(SEED)
  const [query, setQuery] = useState("")
  const [open, setOpen] = useState(false)

  const filtered = rows.filter((r) =>
    r.name.toLowerCase().includes(query.toLowerCase()),
  )

  const handleSubmit = (values: ClientFormValues) => {
    setRows((prev) => [
      {
        id: values.name.toLowerCase().replace(/\s+/g, "-"),
        name: values.name,
        logo: values.logo || undefined,
        about: values.about,
        website: values.website,
        email: values.email,
      },
      ...prev,
    ])
    setOpen(false)
  }

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col">
      <PageHeader
        variant="transparent"
        className="px-6 pt-4"
        title="Clients"
        actions={
          <Button size="sm" onClick={() => setOpen(true)}>
            <Plus className="size-3.5" />
            Add client
          </Button>
        }
      />

      <SearchFilterBar
        className="px-6 pt-3"
        placeholder="Search clients…"
        value={query}
        onChange={setQuery}
      />

      <main className="flex-1 px-6 py-4">
        <ClientsTable rows={filtered} />
      </main>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Add client</DialogTitle>
            <DialogDescription>
              Provide the basic info for the client. You can refine details later.
            </DialogDescription>
          </DialogHeader>
          <ClientForm
            onCancel={() => setOpen(false)}
            onSubmit={handleSubmit}
            submitLabel="Add client"
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}
