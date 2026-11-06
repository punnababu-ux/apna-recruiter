"use client"

import { CalendarDays, Mail, MessageCircle, PhoneIncoming, PhoneOutgoing, Voicemail } from "@apna/design-system"
import type { DrawerCandidate } from "@/components/onlyrounds/candidate-drawer/types"

// ── Timeline tab ──────────────────────────────────────────────────────────

const CHANNEL_ICON = {
  call: PhoneOutgoing,
  sms: MessageCircle,
  email: Mail,
  whatsapp: MessageCircle,
  voicemail: Voicemail,
} as const

export function TimelineTab({ candidate }: { candidate: DrawerCandidate }) {
  const items = candidate.communication ?? []
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
        <CalendarDays className="size-8 text-muted-foreground" />
        <div>
          <p className="text-sm font-medium">No communication yet</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Call attempts, messages, and replies will appear here.
          </p>
        </div>
      </div>
    )
  }
  return (
    <ol className="relative flex flex-col gap-3 pl-5">
      <span className="absolute top-1 bottom-1 left-1.5 w-px bg-border" />
      {items.map((e) => {
        let Icon = CHANNEL_ICON[e.channel]
        if (e.channel === "call" && e.direction === "in") Icon = PhoneIncoming
        return (
          <li key={e.id} className="relative flex flex-col gap-0.5">
            <span className="absolute top-0.5 -left-[18px] flex size-4 items-center justify-center rounded-full border border-border bg-card"> {/* token-lint-ignore: timeline-icon-alignment */}
              <Icon className="size-2.5 text-muted-foreground" />
            </span>
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-sm font-medium">{e.title}</span>
              <span className="shrink-0 text-xs text-muted-foreground">
                {e.timestamp}
              </span>
            </div>
            {e.detail && (
              <p className="text-xs text-muted-foreground">{e.detail}</p>
            )}
            {e.duration && (
              <p className="text-2xs text-muted-foreground">
                Duration · {e.duration}
              </p>
            )}
          </li>
        )
      })}
    </ol>
  )
}
