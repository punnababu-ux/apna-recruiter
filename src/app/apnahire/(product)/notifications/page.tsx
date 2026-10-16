import { NotificationList } from "@/components/apnahire/notifications/notification-list"

/**
 * /apnahire/notifications — the notification centre on phones, opened from
 * the bottom bar's bell; the top bar carries the "Notifications" title.
 * Desktop opens the same list in a side panel from the top bar
 * (NotificationsButton); landing here on desktop still works.
 */
export default function NotificationsPage() {
  return (
    // The panel's muted frame, so the page and the desktop panel match.
    <main className="flex flex-1 flex-col bg-muted">
      <NotificationList variant="page" />
    </main>
  )
}
