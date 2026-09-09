"use client"

/**
 * ClientsTable — tabular list of client/company records.
 *
 * Columns: logo, name, about (truncated description), website, email, actions.
 * Header row uses a muted surface to distinguish it from the body. Each column
 * supports click-to-sort (asc → desc → none) via `SortableTableHead`, and
 * drag-resizable widths via the right-edge handle. Sort + width state is kept
 * locally here; lift it up if the caller needs to persist.
 */

import { ExternalLink, Mail, MoreVertical } from "@apna/design-system"
import { useMemo, useState } from "react"

import { ClientLogo } from "@/components/onlyrounds/shared"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SortableTableHead,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  type SortDirection,
} from "@/components/ui/table"

export type ClientRow = {
  id: string
  name: string
  logo?: string
  about: string
  website: string
  email: string
}

type SortKey = "name" | "about" | "website" | "email"

type ColumnWidths = Record<SortKey | "logo" | "actions", number>

const MIN_WIDTH = 80
const DEFAULT_WIDTHS: ColumnWidths = {
  logo: 56,
  name: 180,
  about: 320,
  website: 200,
  email: 220,
  actions: 56,
}

export function ClientsTable({ rows }: { rows: ClientRow[] }) {
  const [sortKey, setSortKey] = useState<SortKey | null>(null)
  const [sortDir, setSortDir] = useState<SortDirection>(null)
  const [widths, setWidths] = useState<ColumnWidths>(DEFAULT_WIDTHS)

  const sorted = useMemo(() => {
    if (!sortKey || !sortDir) return rows
    const copy = [...rows]
    copy.sort((a, b) => {
      const av = a[sortKey].toLowerCase()
      const bv = b[sortKey].toLowerCase()
      if (av < bv) return sortDir === "asc" ? -1 : 1
      if (av > bv) return sortDir === "asc" ? 1 : -1
      return 0
    })
    return copy
  }, [rows, sortKey, sortDir])

  const setSort = (key: SortKey) => (next: SortDirection) => {
    if (!next) {
      setSortKey(null)
      setSortDir(null)
      return
    }
    setSortKey(key)
    setSortDir(next)
  }

  const resize = (key: keyof ColumnWidths) => (delta: number) => {
    setWidths((prev) => ({
      ...prev,
      [key]: Math.max(MIN_WIDTH, prev[key] + delta),
    }))
  }

  const sortFor = (key: SortKey): SortDirection =>
    sortKey === key ? sortDir : null

  if (rows.length === 0) {
    return (
      <div className="flex min-h-64 items-center justify-center rounded-lg border border-dashed border-border bg-card p-8 text-sm text-muted-foreground">
        No clients yet. Add your first client to start posting jobs.
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      <Table className="table-fixed">
        <colgroup>
          <col style={{ width: widths.logo }} />
          <col style={{ width: widths.name }} />
          <col style={{ width: widths.about }} />
          <col style={{ width: widths.website }} />
          <col style={{ width: widths.email }} />
          <col style={{ width: widths.actions }} />
        </colgroup>
        <TableHeader>
          <TableRow>
            <TableHead />
            <SortableTableHead
              sort={sortFor("name")}
              onSortChange={setSort("name")}
              resizable
              onResize={resize("name")}
            >
              Client
            </SortableTableHead>
            <SortableTableHead
              sort={sortFor("about")}
              onSortChange={setSort("about")}
              resizable
              onResize={resize("about")}
            >
              About
            </SortableTableHead>
            <SortableTableHead
              sort={sortFor("website")}
              onSortChange={setSort("website")}
              resizable
              onResize={resize("website")}
            >
              Website
            </SortableTableHead>
            <SortableTableHead
              sort={sortFor("email")}
              onSortChange={setSort("email")}
              resizable
              onResize={resize("email")}
            >
              Email
            </SortableTableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {sorted.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                <ClientLogo name={row.name} src={row.logo} />
              </TableCell>
              <TableCell className="truncate font-medium">{row.name}</TableCell>
              <TableCell className="truncate text-muted-foreground">
                {row.about}
              </TableCell>
              <TableCell className="truncate">
                <a
                  href={row.website}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-foreground hover:underline"
                >
                  <ExternalLink className="size-3 shrink-0" aria-hidden />
                  <span className="truncate">{displayHost(row.website)}</span>
                </a>
              </TableCell>
              <TableCell className="truncate">
                <a
                  href={`mailto:${row.email}`}
                  className="inline-flex items-center gap-1 text-sm text-foreground hover:underline"
                >
                  <Mail className="size-3 shrink-0" aria-hidden />
                  <span className="truncate">{row.email}</span>
                </a>
              </TableCell>
              <TableCell>
                <RowActions />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function RowActions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Row actions"
            className="text-muted-foreground"
          >
            <MoreVertical className="size-4" />
          </Button>
        }
      />
      <DropdownMenuContent align="end">
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>View jobs</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive">Remove</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function displayHost(url: string): string {
  try {
    return new URL(url).host.replace(/^www\./, "")
  } catch {
    return url
  }
}
