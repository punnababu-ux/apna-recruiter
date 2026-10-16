"use client"

/**
 * NotificationsButton — the desktop top bar's bell (phones use the bottom
 * bar's Notifications tab and a full page instead). The unread count sits
 * on the bell; the list opens in a right side panel, not a popover:
 * notifications here are actions (call a candidate, view a profile), the
 * list is long and grouped, and a panel keeps the page in view while the
 * recruiter works through it.
 */

import { Badge, Bell, Button, Sheet, SheetPanel, SheetTrigger } from "@apna/design-system"
import { NotificationList } from "@/components/apnahire/notifications/notification-list"
import { useNotifications } from "@/hooks/apnahire/use-notifications"

export function NotificationsButton() {
  const { unreadCount } = useNotifications()
  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            className="relative"
            aria-label={unreadCount ? `Notifications, ${unreadCount} unread` : "Notifications"}
          />
        }
      >
        <Bell className="size-4" aria-hidden />
        {unreadCount > 0 && (
          <Badge variant="count" size="count" className="absolute -top-1.5 -right-1.5 ring-2 ring-background">
            {unreadCount}
          </Badge>
        )}
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
