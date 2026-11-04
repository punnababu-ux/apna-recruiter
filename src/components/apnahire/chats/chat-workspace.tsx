"use client"

/**
 * ChatWorkspace — the Chats section's layout: the list pane beside the open
 * thread (WhatsApp Web, Front). It lives in chats/layout.tsx, so the list
 * stays mounted (and keeps its scroll, search and filters) while the thread
 * beside it changes.
 *
 *   Desktop (md+)  Two panes under the 64px top bar: the list (w-96) and the
 *                  page (the thread, or the "Pick a chat" Empty). The root is
 *                  absolutely placed in the shell's inset (`top-16 bottom-0`),
 *                  so it is exactly the viewport minus the top bar with no
 *                  calc or arbitrary value; each pane scrolls on its own.
 *   Phones         The phone flow, unchanged: /apnahire/chats shows the list
 *                  full width, /apnahire/chats/[id] the full-screen thread.
 */

import * as React from "react"
import { usePathname } from "next/navigation"
import { ChatInbox } from "@/components/apnahire/chats/chat-inbox"
import { cn } from "@/lib/utils"

/** The open chat's id from the path, or null on the list. */
function openChatId(pathname: string) {
  const id = /^\/apnahire\/chats\/([^/]+)/.exec(pathname)?.[1]
  return id ? decodeURIComponent(id) : null
}

export function ChatWorkspace({ children }: { children: React.ReactNode }) {
  const activeId = openChatId(usePathname())
  return (
    <div
      data-slot="chat-workspace"
      className="flex flex-1 flex-col bg-muted md:absolute md:inset-x-0 md:top-16 md:bottom-0 md:flex-row md:overflow-hidden md:rounded-b-xl"
    >
      <ChatInbox activeId={activeId} className={cn(activeId && "max-md:hidden")} />
      <div className={cn("flex min-w-0 flex-1 flex-col md:min-h-0 md:overflow-hidden", !activeId && "max-md:hidden")}>
        {children}
      </div>
    </div>
  )
}
