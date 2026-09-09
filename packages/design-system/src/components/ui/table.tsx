"use client"

import { ArrowDown, ArrowUp, ArrowUpDown } from "@/icons/icons"
import * as React from "react"

import { cn } from "@/lib/utils"

function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto"
    >
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  )
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("bg-muted/60 [&_tr]:border-b", className)}
      {...props}
    />
  )
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  )
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
        className
      )}
      {...props}
    />
  )
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "border-b transition-colors hover:bg-muted/50 has-aria-expanded:bg-muted/50 data-[state=selected]:bg-muted",
        className
      )}
      {...props}
    />
  )
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "h-10 px-2 text-left align-middle font-medium whitespace-nowrap text-foreground [&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    />
  )
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    />
  )
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("mt-4 text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

export type SortDirection = "asc" | "desc" | null

function SortableTableHead({
  children,
  sort = null,
  onSortChange,
  resizable = false,
  onResize,
  className,
  ...props
}: {
  children: React.ReactNode
  sort?: SortDirection
  onSortChange?: (next: SortDirection) => void
  resizable?: boolean
  onResize?: (delta: number) => void
} & Omit<React.ComponentProps<"th">, "children">) {
  const lastXRef = React.useRef<number | null>(null)

  const handlePointerDown = (e: React.PointerEvent<HTMLSpanElement>) => {
    e.preventDefault()
    e.stopPropagation()
    lastXRef.current = e.clientX
    const handleMove = (ev: PointerEvent) => {
      if (lastXRef.current == null) return
      const delta = ev.clientX - lastXRef.current
      lastXRef.current = ev.clientX
      onResize?.(delta)
    }
    const handleUp = () => {
      lastXRef.current = null
      window.removeEventListener("pointermove", handleMove)
      window.removeEventListener("pointerup", handleUp)
      document.body.style.cursor = ""
    }
    document.body.style.cursor = "col-resize"
    window.addEventListener("pointermove", handleMove)
    window.addEventListener("pointerup", handleUp)
  }

  const nextSort = (): SortDirection => {
    if (sort === "asc") return "desc"
    if (sort === "desc") return null
    return "asc"
  }

  return (
    <TableHead
      className={cn("relative select-none", className)}
      aria-sort={
        sort === "asc" ? "ascending" : sort === "desc" ? "descending" : "none"
      }
      {...props}
    >
      {onSortChange ? (
        <button
          type="button"
          onClick={() => onSortChange(nextSort())}
          className="group/sort inline-flex items-center gap-1.5 text-left font-medium text-foreground hover:text-foreground"
        >
          {children}
          <SortIcon direction={sort} />
        </button>
      ) : (
        children
      )}
      {resizable ? (
        <span
          role="separator"
          aria-orientation="vertical"
          aria-label="Resize column"
          onPointerDown={handlePointerDown}
          onDoubleClick={(e) => e.stopPropagation()}
          className="group/resize absolute top-0 right-0 bottom-0 z-10 flex w-3 cursor-col-resize touch-none items-center justify-center"
        >
          <span
            aria-hidden
            className="h-4 w-px bg-border transition-all group-hover/resize:h-full group-hover/resize:w-0.5 group-hover/resize:bg-primary"
          />
        </span>
      ) : null}
    </TableHead>
  )
}

function SortIcon({ direction }: { direction: SortDirection }) {
  if (direction === "asc") {
    return <ArrowUp className="size-3.5 text-foreground" aria-hidden />
  }
  if (direction === "desc") {
    return <ArrowDown className="size-3.5 text-foreground" aria-hidden />
  }
  return (
    <ArrowUpDown
      className="size-3.5 text-muted-foreground/60 group-hover/sort:text-muted-foreground"
      aria-hidden
    />
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  SortableTableHead,
}
