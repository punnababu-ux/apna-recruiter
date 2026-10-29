"use client"

/**
 * HelpMenu — the "?" in the job-posting header: contact hours, chat,
 * WhatsApp, training, HR best practices, then FAQ (the live employer site's menu).
 * A popover on desktop, a bottom sheet on phones, like the top bar's
 * profile menu.
 */

import * as React from "react"
import Image from "next/image"
import {
  Button,
  CalendarDays,
  Download,
  ExternalLink,
  HelpCircle,
  MessagesSquare,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Separator,
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
  WhatsApp,
} from "@apna/design-system"
import { useIsMobile } from "@/hooks/use-mobile"

const HELP_CENTRE = "https://employer-help-centre.apna.co/support/home"

/** The heading's clay object, from the shared set (public/images/company/values). */
function Clay({ name, size = "size-8" }: { name: string; size?: string }) {
  return (
    <Image
      src={`/images/company/values/${name}.png`}
      alt=""
      width={64}
      height={64}
      // As-is: a re-encode fringes the transparent edges (ValueArt).
      unoptimized
      className={`${size} shrink-0 object-contain`}
    />
  )
}

// shortcut: WhatsApp, training and HR best practices point to the help
// centre until product gives their real links.
const ROWS = [
  { label: "Chat with us", href: "/apnahire/support", icon: MessagesSquare, external: false },
  { label: "Chat on WhatsApp", href: HELP_CENTRE, icon: WhatsApp, external: true },
  { label: "Schedule training", href: HELP_CENTRE, icon: CalendarDays, external: true },
  { label: "HR best practices", href: HELP_CENTRE, icon: Download, external: false },
  { label: "FAQ", href: HELP_CENTRE, icon: HelpCircle, external: false },
]

function Row({ label, href, icon: Icon, external }: (typeof ROWS)[number]) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className="ink relative flex items-center gap-3 rounded-control px-2 py-2.5 text-sm text-foreground transition-interactive hover:bg-muted"
    >
      <Icon className="size-5 shrink-0" aria-hidden />
      <span className="flex-1">{label}</span>
      {external && <ExternalLink className="size-4 shrink-0 text-muted-foreground" aria-hidden />}
    </a>
  )
}

function HelpList() {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-3 px-2 py-1">
        <Clay name="dedicated-support" size="size-10" />
        <span className="flex flex-col">
          <span className="text-base font-semibold text-foreground">Contact us</span>
          <span className="text-xs text-muted-foreground">Mon to Sun · 9:00 AM – 7:00 PM</span>
        </span>
      </div>
      <Separator className="my-1" />
      {ROWS.map((r) => (
        <Row key={r.label} {...r} />
      ))}
    </div>
  )
}

export function HelpMenu() {
  const isMobile = useIsMobile()
  const trigger = (
    <Button type="button" variant="outline" size="icon-sm" aria-label="Help">
      <HelpCircle aria-hidden />
    </Button>
  )
  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger render={trigger} />
        {/* The system CloseBubble sits outside the sheet; no overflow-hidden. */}
        <SheetContent side="bottom" className="gap-2 rounded-t-2xl border-t-0 p-4 pb-safe-4">
          <SheetTitle className="sr-only">Help</SheetTitle>
          <HelpList />
        </SheetContent>
      </Sheet>
    )
  }
  return (
    <Popover>
      <PopoverTrigger render={trigger} />
      <PopoverContent align="end" className="w-72 p-2">
        <HelpList />
      </PopoverContent>
    </Popover>
  )
}
