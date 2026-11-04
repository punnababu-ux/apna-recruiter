"use client"

/**
 * ChatInbox — Apna Chat's recruiter inbox (PRD FR-15), the Chats tab's page.
 *
 *   Filters  All · Urgent · AI screening · Shortlisted · Interview · Closed,
 *            with counts — the notification list's filter components
 *            (MobileChipRow on phones, Tabs from md) — and a job filter
 *            behind the funnel at the row's end
 *   Rows     ConversationRow in a ConversationList: avatar · name · time ·
 *            job and tier · last message · unread count · status. The
 *            filter bar gains its bottom line once the page scrolls (as the
 *            notification list's). No chats: an Empty with an icon
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
  ConversationList,
  ConversationRow,
  Badge,
  Button,
  Check,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  Filter,
  MessageCircle,
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

/** The candidate's messages after the recruiter's or the AI's last one. */
function unreadCount(t: ChatThread) {
  if (!t.unread) return 0
  let n = 0
  for (let i = t.messages.length - 1; i >= 0 && t.messages[i].from === "candidate"; i--) n++
  return Math.max(1, n)
}

/** Phones: true once the page has scrolled, so the sticky filter bar shows
 *  its bottom line only when rows pass beneath it (as the notification list). */
function useScrolledPast() {
  const [scrolled, setScrolled] = React.useState(false)
  React.useEffect(() => {
    const update = () => setScrolled(window.scrollY > 2)
    update()
    window.addEventListener("scroll", update, { passive: true })
    return () => window.removeEventListener("scroll", update)
  }, [])
  return scrolled
}

function JoinTopBar() {
  useFlushHeader()
  return null
}

export function ChatInbox() {
  const { threads } = useChats()
  const scrolled = useScrolledPast()
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
      <section
        className={cn(
          "sticky top-16 z-docked flex items-center gap-2 border-b bg-card pt-2 pr-2 pb-2 pl-4 transition-interactive md:static md:border-border md:py-3",
          scrolled ? "border-border" : "border-transparent"
        )}
      >
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
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <MessageCircle />
              </EmptyMedia>
              <EmptyTitle>{status === "urgent" ? "No one is waiting for a reply" : "No chats here yet"}</EmptyTitle>
              <EmptyDescription>
                {status === "urgent"
                  ? "Chats that need your answer show up here."
                  : "Candidates you message appear here."}
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <ConversationList label="Chats">
            {shown.map((t) => (
              <ConversationRow
                key={t.id}
                name={t.candidate.name}
                initial={t.candidate.initial}
                subtitle={`${t.job.title} · ${TIER_LABEL[t.job.tier]}`}
                preview={preview(t)}
                time={t.lastAt}
                unread={t.unread}
                unreadCount={unreadCount(t) || undefined}
                status={statusBadge(t)}
                render={<Link href={`/apnahire/chats/${t.id}`} />}
              />
            ))}
          </ConversationList>
        )}
      </section>
    </div>
  )
}
