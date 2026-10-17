"use client"

/**
 * MomentCarousel — the Lounge hero's rotating product moments (from the
 * prototype's hero): one card at a time on a softly tilted backing card,
 * each with its icon on a suite gradient, its title and tags; dots below
 * to jump. Advances every 4s; pauses on hover and stays put with reduced
 * motion.
 */

import * as React from "react"
import { Badge, Briefcase, Card, Mic, Users, WhatsApp } from "@apna/design-system"
import { ILLUSTRATION_TONE, type IllustrationTone } from "@/components/marketing/product-illustrations"
import { cn } from "@/lib/utils"

const ICONS = { mic: Mic, briefcase: Briefcase, users: Users, whatsapp: WhatsApp } as const
const TONES: IllustrationTone[] = ["plum", "green", "gold", "sky"]

export interface Moment {
  icon: keyof typeof ICONS
  title: string
  tags: readonly string[]
}

export function MomentCarousel({ moments }: { moments: readonly Moment[] }) {
  const [index, setIndex] = React.useState(0)
  const [paused, setPaused] = React.useState(false)

  React.useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const id = window.setInterval(() => setIndex((i) => (i + 1) % moments.length), 4000)
    return () => window.clearInterval(id)
  }, [paused, moments.length])

  const moment = moments[index]
  const Icon = ICONS[moment.icon]

  return (
    <div
      className="relative flex w-full flex-col items-center gap-6"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      <div className="relative w-full max-w-md">
        {/* The backing card, tilted, so the front one reads as a stack. */}
        <div
          aria-hidden
          className="absolute inset-4 -rotate-3 rounded-card border border-card/60 bg-card/40 shadow-card"
        />
        <Card
          key={index}
          padding="lg"
          aria-live="polite"
          className="relative min-h-64 animate-in items-center justify-center gap-5 text-center shadow-elevated fade-in duration-large sm:p-10"
        >
          <span
            className={cn(
              "flex size-16 items-center justify-center rounded-full",
              ILLUSTRATION_TONE[TONES[index % TONES.length]],
            )}
          >
            <Icon className="size-7 text-foreground" aria-hidden />
          </span>
          <p className="text-h4 text-balance text-foreground">{moment.title}</p>
          <div className="flex flex-wrap justify-center gap-2">
            {moment.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </Card>
      </div>
      <div className="flex gap-2" role="tablist" aria-label="Lounge moments">
        {moments.map((m, i) => (
          <button
            key={m.title}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={m.title}
            onClick={() => setIndex(i)}
            className={cn(
              "h-2 rounded-full transition-interactive",
              i === index ? "w-6 bg-foreground" : "w-2 bg-border hover:bg-muted-foreground",
            )}
          />
        ))}
      </div>
    </div>
  )
}
