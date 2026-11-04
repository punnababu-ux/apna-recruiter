import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle, MessageCircle } from "@apna/design-system"

/**
 * /apnahire/chats — Apna Chat, the recruiter's inbox: the phone bar's Chats
 * tab and the desktop sidebar's Chats item. The list itself is the layout's
 * (ChatWorkspace), so phones show only the list here; from md this is the
 * thread pane with nothing picked yet.
 */
export default function ChatsPage() {
  return (
    <main className="hidden flex-1 items-center justify-center p-6 md:flex">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <MessageCircle />
          </EmptyMedia>
          <EmptyTitle>Pick a chat</EmptyTitle>
          <EmptyDescription>Choose a candidate on the left to read the thread and reply.</EmptyDescription>
        </EmptyHeader>
      </Empty>
    </main>
  )
}
