import { ChatInbox } from "@/components/apnahire/chats/chat-inbox"

/**
 * /apnahire/chats — Apna Chat, the recruiter's inbox: the phone bar's Chats
 * tab and the desktop sidebar's Chats item. The top bar carries the "Chats"
 * title on phones.
 */
export default function ChatsPage() {
  return (
    <main className="flex flex-1 flex-col bg-muted">
      <ChatInbox />
    </main>
  )
}
