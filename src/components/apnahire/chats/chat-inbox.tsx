"use client"

/**
 * ChatInbox — Apna Chat's recruiter inbox (PRD FR-15), the Chats tab's page.
 *
 *   Filters  All · Urgent · AI screening · Shortlisted · Interview · Closed,
 *            with counts — the notification list's filter components
 *            (MobileChipRow on phones, Tabs from md) — and a job filter
 *            behind the funnel at the row's end
 *   Row      avatar · name · time · job and tier · last message · status
 *
 * Urgent threads show first, then the rest by recency (the mock list's
 * order). Only "Urgent: needs reply" is coloured: it is the one thing the
 * recruiter must act on (Von Restorff, AGENTS.md "Choice and emphasis");
 * every other status is a quiet secondary badge.
 *
 * Tapping a row opens the thread (/apnahire/chats/[id]), a drill-down with
 * its own header on phones.
 */

import * as React from "react"
import Link from "next/link"
import {
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  Check,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Filter,
  Tabs,
  TabsList,
  TabsTrigger,
} from "@apna/design-system"
import { MobileChipRow } from "@/components/apnahire/mobile-chip-row"
import { useFlushHeader } from "@/hooks/use-flush-header"
import { useChats } from "@/hooks/apnahire/use-chats"
import {
  AI_NAME,
  CLOSED_LABEL,
  STATUS_FILTERS,
  TIER_LABEL,
  type ChatThread,
  type ThreadStatus,
} from "@/content/chats"
import { cn } from "@/lib/utils"

type StatusFilter = "all" | Exclude<ThreadStatus, "active">

const STATUS_LABEL: Record<Exclude<ThreadStatus, "active" | "closed">, string> = {
  urgent: "Urgent: needs reply",
  "ai-screening": "AI screening",
  shortlisted: "Shortlisted",
  interview: "Interview",
}

function statusBadge(t: ChatThread) {
  if (t.status === "active") return null
  const label = t.status === "closed" ? CLOSED_LABEL[t.closedReason ?? "not-a-fit"] : STATUS_LABEL[t.status]
  return <Badge variant={t.status === "urgent" ? "destructive" : "secondary"}>{label}</Badge>
}

/** The last message, with who sent it when it wasn't the candidate. */
function preview(t: ChatThread) {
  const last = t.messages[t.messages.length - 1]
  if (!last) return ""
  if (last.from === "ai") return `${AI_NAME}: ${last.text}`
  if (last.from === "recruiter") return `You: ${last.text}`
  return last.text
}

function ThreadRow({ t }: { t: ChatThread }) {
  return (
    <li className="border-b border-border last:border-b-0">
      <Link
        href={`/apnahire/chats/${t.id}`}
        className={cn(
          "ink relative flex gap-3 px-4 py-4 transition-interactive",
          t.unread ? "bg-accent/40" : "bg-card"
        )}
      >
        <Avatar className="size-10 shrink-0">
          <AvatarFallback className="bg-muted text-sm font-semibold text-muted-foreground">
            {t.candidate.initial}
          </AvatarFallback>
        </Avatar>
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <div className="flex items-start justify-between gap-3">
            <p className="truncate text-base font-semibold text-foreground">{t.candidate.name}</p>
            <span className="flex shrink-0 items-center gap-1.5 text-xs whitespace-nowrap text-muted-foreground">
              {t.lastAt}
              {t.unread && (
                <>
                  <span className="size-2 rounded-full bg-primary" aria-hidden />
                  <span className="sr-only">Unread</span>
                </>
              )}
            </span>
          </div>
          <p className="truncate text-xs text-muted-foreground">
            {t.job.title} · {TIER_LABEL[t.job.tier]}
          </p>
          <p className={cn("line-clamp-1 text-sm", t.unread ? "text-foreground" : "text-muted-foreground")}>
            {preview(t)}
          </p>
          {statusBadge(t) && <div className="flex pt-1">{statusBadge(t)}</div>}
        </div>
      </Link>
    </li>
  )
}

function JoinTopBar() {
  useFlushHeader()
  return null
}

export function ChatInbox() {
  const { threads } = useChats()
  const [status, setStatus] = React.useState<StatusFilter>("all")
  const [jobId, setJobId] = React.useState<string | null>(null)

  const jobs = React.useMemo(() => {
    const seen = new Map<string, string>()
    threads.forEach((t) => seen.set(t.job.id, t.job.title))
    return [...seen].map(([id, title]) => ({ id, title }))
  }, [threads])

  const forJob = jobId ? threads.filter((t) => t.job.id === jobId) : threads
  const count = (s: StatusFilter) => (s === "all" ? forJob.length : forJob.filter((t) => t.status === s).length)
  const filterItems: { value: StatusFilter; label: string }[] = [
    { value: "all", label: `All (${count("all")})` },
    ...STATUS_FILTERS.map((f) => ({ value: f.value, label: `${f.label} (${count(f.value)})` })),
  ]

  const shown = (status === "all" ? forJob : forJob.filter((t) => t.status === status))
    .slice()
    .sort((a, b) => Number(b.status === "urgent") - Number(a.status === "urgent"))

  const jobMenu = (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label={jobId ? "Filter by job, 1 selected" : "Filter by job"}
            className="relative shrink-0 text-muted-foreground"
          />
        }
      >
        <Filter className="size-5" aria-hidden />
        {jobId && (
          <Badge variant="count" size="dot" className="absolute top-0.5 right-0.5 ring-2 ring-card">
            <span className="sr-only">Job filter on</span>
          </Badge>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {[{ id: null, title: "All jobs" }, ...jobs].map((job) => (
          <DropdownMenuItem key={job.id ?? "all"} className="whitespace-nowrap" onClick={() => setJobId(job.id)}>
            <Check className={cn("size-3.5", jobId !== job.id && "invisible")} />
            {job.title}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )

  return (
    <div data-slot="chat-inbox" className="flex flex-col">
      <JoinTopBar />
      {/* The notification page's filter bar: chips beside a fixed control,
          a white bar joined to the top bar on phones; Tabs from md. */}
      <section className="sticky top-16 z-docked flex items-center gap-2 border-b border-border bg-card pt-2 pr-2 pb-2 pl-4 md:static md:py-3">
        <div className="min-w-0 flex-1">
          <MobileChipRow items={filterItems} value={status} onValueChange={setStatus} gutter="page-start" />
          <Tabs className="hidden md:flex" value={status} onValueChange={(v) => setStatus(v as StatusFilter)}>
            <TabsList>
              {filterItems.map((item) => (
                <TabsTrigger key={item.value} value={item.value}>
                  {item.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
        {jobMenu}
      </section>

      <section className="bg-card">
        {shown.length === 0 ? (
          <p className="px-4 py-10 text-center text-sm text-muted-foreground">
            {status === "urgent" ? "No one is waiting for a reply." : "No chats here yet."}
          </p>
        ) : (
          <ul>
            {shown.map((t) => (
              <ThreadRow key={t.id} t={t} />
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
