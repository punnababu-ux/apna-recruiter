"use client"

/**
 * /apnahire/chats/[id] — one Apna Chat thread, opened from the inbox. A
 * drill-down: full screen on phones, with its own header (ChatThread); from
 * md the thread pane beside the list (chats/layout.tsx). Keyed by id, so a
 * draft never carries over to another chat.
 */

import { use } from "react"
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle, MessageCircle } from "@apna/design-system"
import { ChatThread } from "@/components/apnahire/chats/chat-thread"
import { useChats } from "@/hooks/apnahire/use-chats"

export default function ChatThreadPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { threads } = useChats()
  const thread = threads.find((t) => t.id === id)
  if (!thread) {
    return (
      <main className="flex flex-1 items-center justify-center p-6 md:min-h-0">
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <MessageCircle />
            </EmptyMedia>
            <EmptyTitle>This chat is not available</EmptyTitle>
            <EmptyDescription>It may have been removed. Go back to your chats to pick another.</EmptyDescription>
          </EmptyHeader>
        </Empty>
      </main>
    )
  }
  return (
    <main className="flex flex-1 flex-col md:min-h-0">
      <ChatThread key={thread.id} thread={thread} />
    </main>
  )
}
