"use client"

/**
 * NotificationsButton — the top bar's bell. The unread count sits on the
 * bell. Phones open the notification centre as a full-screen page (the
 * bottom bar's slot went to Chats, 2026-11-04); from md the list opens in a
 * right side panel, not a popover:
 * notifications here are actions (call a candidate, view a profile), the
 * list is long and grouped, and a panel keeps the page in view while the
 * recruiter works through it.
 */

import Link from "next/link"
import { Badge, Bell, Button, Sheet, SheetPanel, SheetTrigger } from "@apna/design-system"
import { NotificationList } from "@/components/apnahire/notifications/notification-list"
import { useNotifications } from "@/hooks/apnahire/use-notifications"
import { useIsMobile } from "@/hooks/use-mobile"

export function NotificationsButton() {
  const { unreadCount } = useNotifications()
  const isMobile = useIsMobile()
  const label = unreadCount ? `Notifications, ${unreadCount} unread` : "Notifications"
  const bell = (
    <>
      <Bell className="size-4" aria-hidden />
      {unreadCount > 0 && (
        <Badge variant="count" size="count" className="absolute -top-1.5 -right-1.5 ring-2 ring-background">
          {unreadCount}
        </Badge>
      )}
    </>
  )
  if (isMobile) {
    return (
      <Button
        variant="outline"
        size="icon-sm"
        className="relative"
        aria-label={label}
        nativeButton={false}
        render={<Link href="/apnahire/notifications" />}
      >
        {bell}
      </Button>
    )
  }
  return (
    <Sheet>
      <SheetTrigger render={<Button type="button" variant="outline" size="icon-sm" className="relative" aria-label={label} />}>
        {bell}
      </SheetTrigger>
      {/* The app's side panel (SheetPanel), as the order summary uses. */}
      <SheetPanel>
        <div className="min-h-0 flex-1 overflow-y-auto">
          <NotificationList variant="panel" />
        </div>
      </SheetPanel>
    </Sheet>
  )
}
