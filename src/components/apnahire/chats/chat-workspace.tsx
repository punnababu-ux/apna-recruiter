"use client"

/**
 * ChatWorkspace — the Chats section's layout: the list pane beside the open
 * thread (WhatsApp Web, Front). It lives in chats/layout.tsx, so the list
 * stays mounted (and keeps its scroll, search and filters) while the thread
 * beside it changes.
 *
 *   Header band    From md all three panes share one h-16 band and one h-14
 *                  sub-row (chat-bands.ts), so the bars read as one line.
 *
 *   Desktop (md+)  Two panes under the 64px top bar: the list (w-72, w-80
 *                  from xl) and the page (the thread, or the "Pick a chat"
 *                  Empty). From xl a third pane, the candidate profile
 *                  (CandidateProfilePanel, w-80), sits at the right for the
 *                  open chat, under a "Candidate" band; below xl the thread header's Profile button
 *                  opens it in a side panel. The root is
 *                  absolutely placed in the shell's inset (`top-16 bottom-0`),
 *                  so it is exactly the viewport minus the top bar with no
 *                  calc or arbitrary value; each pane scrolls on its own.
 *   Phones         The phone flow, unchanged: /apnahire/chats shows the list
 *                  full width, /apnahire/chats/[id] the full-screen thread.
 */

import * as React from "react"
import { usePathname } from "next/navigation"
import { CandidateProfilePanel } from "@/components/apnahire/chats/candidate-profile-panel"
import { BAND } from "@/components/apnahire/chats/chat-bands"
import { ChatInbox } from "@/components/apnahire/chats/chat-inbox"
import { useChats } from "@/hooks/apnahire/use-chats"
import { cn } from "@/lib/utils"

/** The open chat's id from the path, or null on the list. */
function openChatId(pathname: string) {
  const id = /^\/apnahire\/chats\/([^/]+)/.exec(pathname)?.[1]
  return id ? decodeURIComponent(id) : null
}

export function ChatWorkspace({ children }: { children: React.ReactNode }) {
  const activeId = openChatId(usePathname())
  const { threads } = useChats()
  const active = activeId ? threads.find((t) => t.id === activeId) : undefined
  return (
    <div
      data-slot="chat-workspace"
      className="flex flex-1 flex-col bg-muted md:absolute md:inset-x-0 md:top-16 md:bottom-0 md:flex-row md:overflow-hidden md:rounded-b-xl"
    >
      <ChatInbox activeId={activeId} className={cn(activeId && "max-md:hidden")} />
      <div className={cn("flex min-w-0 flex-1 flex-col md:min-h-0 md:overflow-hidden", !activeId && "max-md:hidden")}>
        {children}
      </div>
      {active && (
        <aside
          aria-label="Candidate profile"
          className="hidden min-h-0 flex-col border-l border-border bg-card xl:flex xl:w-80 xl:shrink-0"
        >
          <div className={cn("flex items-center", BAND)}>
            <h2 className="text-h5">Candidate</h2>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto">
            <CandidateProfilePanel key={active.id} thread={active} />
          </div>
        </aside>
      )}
    </div>
  )
}
