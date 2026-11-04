"use client"

/**
 * ChatInbox — Apna Chat's recruiter inbox (PRD FR-15): the list pane of the
 * chat workspace (chat-workspace.tsx). Full width on phones, the w-96 left
 * pane from md, where it scrolls on its own and marks the open chat.
 *
 *   Header   Row of: "Chats" (md+; phones have it in the top bar) · a compact
 *            search field in the corner · Filters · Sort. Search matches the
 *            candidate name, job title and any message, case-insensitively,
 *            and the filter counts follow it. Sticky under the top bar on
 *            phones, with its bottom line once the page scrolls.
 *   Filters  One DropdownMenu with two groups of checkboxes: Status (Urgent,
 *            AI screening, Shortlisted, Interview, Closed, each with its
 *            count; the Urgent count lives here) and Job. None checked in a
 *            group means all. A count Badge on the button and a "Clear
 *            filters" item show once any filter is on.
 *   Sort     A radio group (chat-sort.ts): Urgent first (default), Newest,
 *            Unread first, Name (A-Z).
 *   Rows     ConversationRow in a ConversationList: avatar · name · time ·
 *            job and tier · last message · unread count · status, linking to
 *            /apnahire/chats/[id] (no scroll reset, so the list keeps its
 *            place). No chats: an Empty with an icon
 *
 * Only "Urgent: needs reply" is coloured: it is the one thing the
 * recruiter must act on (Von Restorff, AGENTS.md "Choice and emphasis");
 * every other status is a quiet secondary badge.
 */

import * as React from "react"
import Link from "next/link"
import {
  ArrowUpDown,
  ConversationList,
  ConversationRow,
  Badge,
  Button,
  CalendarCheck,
  CheckCircle2,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  Filter,
  Flame,
  Input,
  MessageCircle,
  Search,
  Sparkles,
  Star,
} from "@apna/design-system"
import { SORT_OPTIONS, sortThreads, type ChatSort } from "@/components/apnahire/chats/chat-sort"
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

type StatusFilter = Exclude<ThreadStatus, "active">

/** One glyph per status in the Filters menu. Urgent is a flame (heat, act
 *  now), Shortlisted a star, Closed a tick-in-circle (done). */
const STATUS_ICON: Record<StatusFilter, React.ComponentType<{ className?: string }>> = {
  urgent: Flame,
  "ai-screening": Sparkles,
  shortlisted: Star,
  interview: CalendarCheck,
  closed: CheckCircle2,
}

/** True when the query (already trimmed, lower-case) is in the candidate's
 *  name, the job title or any message. */
function matchesQuery(t: ChatThread, q: string) {
  if (!q) return true
  return (
    t.candidate.name.toLowerCase().includes(q) ||
    t.job.title.toLowerCase().includes(q) ||
    t.messages.some((m) => m.text.toLowerCase().includes(q))
  )
}

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

/** Adds or removes one value, as a new array. */
const toggle = <T,>(list: T[], value: T) => (list.includes(value) ? list.filter((v) => v !== value) : [...list, value])

export function ChatInbox({ activeId = null, className }: { activeId?: string | null; className?: string }) {
  const { threads } = useChats()
  const scrolled = useScrolledPast()
  const [statuses, setStatuses] = React.useState<StatusFilter[]>([])
  const [jobIds, setJobIds] = React.useState<string[]>([])
  const [sort, setSort] = React.useState<ChatSort>("urgent-first")
  const [searchQuery, setSearchQuery] = React.useState("")
  const query = searchQuery.trim()
  const filterCount = statuses.length + jobIds.length

  const jobs = React.useMemo(() => {
    const seen = new Map<string, string>()
    threads.forEach((t) => seen.set(t.job.id, t.job.title))
    return [...seen].map(([id, title]) => ({ id, title }))
  }, [threads])

  const q = query.toLowerCase()
  // The status counts follow the search and the job filter.
  const forJob = threads.filter((t) => (!jobIds.length || jobIds.includes(t.job.id)) && matchesQuery(t, q))
  const count = (s: StatusFilter) => forJob.filter((t) => t.status === s).length
  const shown = sortThreads(statuses.length ? forJob.filter((t) => statuses.includes(t.status as StatusFilter)) : forJob, sort)

  const clearFilters = () => {
    setStatuses([])
    setJobIds([])
  }

  const filtersMenu = (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="outline"
            size="icon"
            aria-label={filterCount ? `Filters, ${filterCount} on` : "Filters"}
            className="relative shrink-0 md:w-auto md:px-3"
          />
        }
      >
        <Filter aria-hidden />
        <span className="hidden md:inline">Filters</span>
        {filterCount > 0 && (
          <>
            <Badge variant="default" className="hidden h-5 min-w-5 px-1.5 text-2xs font-semibold md:inline-flex">
              {filterCount}
            </Badge>
            <Badge variant="count" size="dot" className="absolute top-1 right-1 ring-2 ring-card md:hidden" />
          </>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Status</DropdownMenuLabel>
          {STATUS_FILTERS.map((f) => {
            const Icon = STATUS_ICON[f.value]
            return (
              <DropdownMenuCheckboxItem
                key={f.value}
                checked={statuses.includes(f.value)}
                onCheckedChange={() => setStatuses((s) => toggle(s, f.value))}
              >
                <Icon aria-hidden />
                {f.label}
                <span className="ml-auto text-muted-foreground">{count(f.value)}</span>
              </DropdownMenuCheckboxItem>
            )
          })}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>Job</DropdownMenuLabel>
          {jobs.map((job) => (
            <DropdownMenuCheckboxItem
              key={job.id}
              checked={jobIds.includes(job.id)}
              onCheckedChange={() => setJobIds((j) => toggle(j, job.id))}
            >
              <span className="truncate">{job.title}</span>
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuGroup>
        {filterCount > 0 && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={clearFilters}>Clear filters</DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )

  const sortMenu = (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" size="icon" aria-label="Sort chats" className="shrink-0" />}>
        <ArrowUpDown aria-hidden />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Sort by</DropdownMenuLabel>
          <DropdownMenuRadioGroup value={sort} onValueChange={(v) => setSort(v as ChatSort)}>
            {SORT_OPTIONS.map((o) => (
              <DropdownMenuRadioItem key={o.value} value={o.value} className="whitespace-nowrap">
                {o.label}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )

  return (
    <div
      data-slot="chat-inbox"
      className={cn(
        "flex flex-1 flex-col md:min-h-0 md:w-96 md:flex-none md:shrink-0 md:border-r md:border-border md:bg-card",
        className
      )}
    >
      <JoinTopBar />
      {/* Sticky under the top bar on phones (joined to it); the pane's fixed
          header from md, where only the rows scroll. */}
      <section
        className={cn(
          "sticky top-16 z-docked flex items-center gap-2 border-b bg-card px-4 py-2 transition-interactive md:static md:shrink-0 md:border-border",
          scrolled ? "border-border" : "border-transparent"
        )}
      >
        <h2 className="text-h5 mr-1 hidden shrink-0 md:block">Chats</h2>
        <div className="relative min-w-0 flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
          <Input
            type="search"
            aria-label="Search chats"
            placeholder="Search"
            title="Search by name, job or message"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-card pl-9"
          />
        </div>
        {filtersMenu}
        {sortMenu}
      </section>

      <section className="bg-card md:min-h-0 md:flex-1 md:overflow-y-auto">
        {shown.length === 0 ? (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <MessageCircle />
              </EmptyMedia>
              <EmptyTitle>
                {query ? "No chats match your search" : filterCount ? "No chats match these filters" : "No chats here yet"}
              </EmptyTitle>
              <EmptyDescription>
                {query
                  ? `Nothing for \u201c${query}\u201d. Try a name, a job or a word from a message.`
                  : filterCount
                    ? "Clear a filter to see more chats."
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
                avatarSrc={t.candidate.photo}
                subtitle={`${t.job.title} · ${TIER_LABEL[t.job.tier]}`}
                preview={preview(t)}
                time={t.lastAt}
                unread={t.unread}
                unreadCount={unreadCount(t) || undefined}
                status={statusBadge(t)}
                active={t.id === activeId}
                // The open row: the accent fill plus a primary bar at its start.
                className={cn(t.id === activeId && "before:absolute before:inset-y-0 before:left-0 before:w-1 before:bg-primary")}
                render={<Link href={`/apnahire/chats/${t.id}`} scroll={false} />}
              />
            ))}
          </ConversationList>
        )}
      </section>
    </div>
  )
}
