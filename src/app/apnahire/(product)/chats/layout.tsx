/**
 * /apnahire/chats layout — wraps the inbox and every thread in ChatWorkspace:
 * from md the list pane stays beside the open thread; phones keep the
 * list-then-full-screen-thread flow.
 */

import { ChatWorkspace } from "@/components/apnahire/chats/chat-workspace"

export default function ChatsLayout({ children }: { children: React.ReactNode }) {
  return <ChatWorkspace>{children}</ChatWorkspace>
}
