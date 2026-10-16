"use client"

/**
 * NotificationList — the recruiter's notification centre, one component for
 * both homes: the phone page (/apnahire/notifications, reached from the
 * bottom bar's bell) and the desktop side panel (the top bar's bell).
 *
 *   Header   title · "Mark all as read"
 *   Filters  All · Applications · Unread, with counts — the jobs page's
 *            filter components (MobileChipRow on phones, Tabs from md)
 *   Groups   Today · Yesterday · Earlier this week
 *   Row      kind icon · title · time · body; unread rows are tinted with a
 *            dot; new applications carry "View profile" and "Call"
 *
 * Tapping a row marks it read (useNotifications, shared with the bell
 * badges).
 *
 * Visual language = the order summary panel's: white card sections on a
 * muted frame; rows are 16px semibold titles with muted text. Gutter: the
 * panel's 20px (px-5); the phone page's 16px (px-4), in line with the top
 * bar's title.
 *   panel  SheetPanelHeader ("Notifications" · ⋮ · close), divider, Tabs
 *   page   no title (the phone top bar says "Notifications"): the filter
 *          chips with ⋮ fixed at the row's end
 * "Mark all as read" lives in the ⋮ menu: a rare, bulk action, behind a
 * deliberate second tap, in the place WhatsApp-style apps put it.
 */

import * as React from "react"
import Link from "next/link"
import {
  AlertTriangle,
  BriefcaseBusiness,
  Button,
  Check,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  MoreVertical,
  Separator,
  SheetPanelHeader,
  Database,
  FileText,
  Phone,
  Sparkles,
  Tabs,
  TabsList,
  TabsTrigger,
  User,
  type IconComponent,
} from "@apna/design-system"
import { MobileChipRow } from "@/components/apnahire/mobile-chip-row"
import { useFlushHeader } from "@/hooks/use-flush-header"
import {
  NOTIFICATION_GROUPS,
  type NotificationKind,
  type RecruiterNotification,
} from "@/content/notifications"
import { useNotifications } from "@/hooks/apnahire/use-notifications"
import { cn } from "@/lib/utils"

type Filter = "all" | "applications" | "unread"

const KIND_ICON: Record<NotificationKind, IconComponent> = {
  application: User,
  ai: Sparkles,
  summary: FileText,
  action: AlertTriangle,
  expired: BriefcaseBusiness,
  credits: Database,
}

function NotificationRow({
  n,
  onRead,
  gutter,
}: {
  n: RecruiterNotification
  onRead: (id: string) => void
  gutter: string
}) {
  const Icon = KIND_ICON[n.kind]
  return (
    <li
      onClick={() => n.unread && onRead(n.id)}
      className={cn(
        "flex gap-3 border-b border-border py-4 transition-interactive last:border-b-0",
        gutter,
        n.unread ? "bg-accent/40" : "bg-card"
      )}
    >
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <Icon className="size-5" aria-hidden />
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex items-start justify-between gap-3">
          <p className="text-base font-semibold text-foreground">{n.title}</p>
          <span className="flex shrink-0 items-center gap-1.5 text-xs whitespace-nowrap text-muted-foreground">
            {n.time}
            {n.unread && (
              <>
                <span className="size-2 rounded-full bg-primary" aria-hidden />
                <span className="sr-only">Unread</span>
              </>
            )}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">{n.body}</p>
        {n.candidate && (
          <div className="flex flex-wrap gap-2 pt-2">
            <Button
              size="sm"
              variant="outline"
              nativeButton={false}
              render={<Link href="/apnahire/jobs?tab=active" />}
            >
              View profile
            </Button>
            <Button size="sm" variant="outline" nativeButton={false} render={<a href={`tel:${n.candidate.phone}`} />}>
              <Phone className="size-4" aria-hidden />
              Call
            </Button>
          </div>
        )}
      </div>
    </li>
  )
}

function JoinTopBar() {
  useFlushHeader()
  return null
}

/** Phones page: true once the list has scrolled, so the sticky chip bar
 *  shows its bottom line only when rows pass beneath it (at rest the grey
 *  day band below already separates it). */
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

export function NotificationList({ variant }: { variant: "panel" | "page" }) {
  const scrolled = useScrolledPast()
  const { notifications, unreadCount, markRead, markAllRead } = useNotifications()
  const [filter, setFilter] = React.useState<Filter>("all")

  const counts: Record<Filter, number> = {
    all: notifications.length,
    applications: notifications.filter((n) => n.kind === "application").length,
    unread: unreadCount,
  }
  const shown = notifications.filter((n) =>
    filter === "applications" ? n.kind === "application" : filter === "unread" ? n.unread : true
  )

  // The panel's 20px gutter; the phone page's 16px, in line with the top bar.
  const gutter = variant === "panel" ? "px-5" : "px-4"

  const filterItems: { value: Filter; label: string }[] = [
    { value: "all", label: `All (${counts.all})` },
    { value: "applications", label: `Applications (${counts.applications})` },
    { value: "unread", label: `Unread (${counts.unread})` },
  ]

  // The list's actions; one item today, room for more (settings, clear read).
  const menu = (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" size="icon-sm" aria-label="Notification actions" className="shrink-0 text-muted-foreground" />
        }
      >
        <MoreVertical className="size-5" aria-hidden />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="whitespace-nowrap" disabled={unreadCount === 0} onClick={markAllRead}>
          <Check className="size-3.5" />
          Mark all as read
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )

  return (
    <div data-slot="notification-list" className="flex flex-col gap-3">
      {variant === "page" && <JoinTopBar />}
      {/* 1 — Header + filters: the order summary's first card. */}
      {variant === "panel" ? (
        <section className="flex flex-col gap-4 bg-card py-5 shadow-card">
          <SheetPanelHeader title="Notifications" action={menu} />
          <Separator />
          {/* The jobs page's filter component: Tabs, `default` variant (the
              one for a white surface; `inverted` is for grey canvases). */}
          <div className="px-5">
            <Tabs value={filter} onValueChange={(v) => setFilter(v as Filter)}>
              <TabsList>
                {filterItems.map((item) => (
                  <TabsTrigger key={item.value} value={item.value}>
                    {item.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </section>
      ) : (
        // Phones: the jobs page's chip row, scrolling beside a fixed ⋮
        // (Tabs from md, if the page is opened on a wide screen). Like the
        // jobs chips once stuck: a white bar joined to the top bar (which
        // drops its own line, useFlushHeader), sticky under it, one line
        // below; 8px above the chips and 12px below (the scroller adds 4px
        // under them, hence pt-2 pb-2).
        <section className={cn("sticky top-16 z-docked flex items-center gap-2 border-b bg-card transition-interactive", scrolled ? "border-border" : "border-transparent", "pt-2 pr-2 pb-2 pl-4 md:static md:border-b-0 md:py-3 md:shadow-card")}>
          <div className="min-w-0 flex-1">
            <MobileChipRow items={filterItems} value={filter} onValueChange={setFilter} gutter="page-start" />
            <Tabs className="hidden md:flex" value={filter} onValueChange={(v) => setFilter(v as Filter)}>
              <TabsList>
                {filterItems.map((item) => (
                  <TabsTrigger key={item.value} value={item.value}>
                    {item.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
          {menu}
        </section>
      )}

      {/* 2 — The list, one card, grouped by day. On the phone page no
          shadow: its top edge drew a line above the first day band. */}
      <section className={cn("bg-card", variant === "page" ? "md:shadow-card" : "shadow-card")}>
        {shown.length === 0 ? (
          <p className={cn("py-10 text-center text-sm text-muted-foreground", gutter)}>
            {filter === "unread" ? "You're all caught up." : "Nothing here yet."}
          </p>
        ) : (
          NOTIFICATION_GROUPS.map((group) => {
            const items = shown.filter((n) => n.group === group.id)
            if (items.length === 0) return null
            return (
              <section key={group.id} aria-label={group.label}>
                <h3 className={cn("text-overline border-b border-border bg-muted py-2 text-muted-foreground", gutter)}>
                  {group.label}
                </h3>
                <ul>
                  {items.map((n) => (
                    <NotificationRow key={n.id} n={n} onRead={markRead} gutter={gutter} />
                  ))}
                </ul>
              </section>
            )
          })
        )}
      </section>
    </div>
  )
}
