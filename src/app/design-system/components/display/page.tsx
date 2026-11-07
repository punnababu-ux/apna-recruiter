"use client"

import * as React from "react"
import {
  Avatar,
  AvatarFallback,
  Badge,
  Skeleton,
  Spinner,
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  Button,
  MetricCard,
  ChatBubble,
  ChatFileCard,
  ChatAttachmentTray,
  ChatChoice,
  ChatDayDivider,
  ChatNotice,
  ChatUnreadDivider,
  ChatMessageList,
  ConversationRow,
  ConversationList,
  ShieldAlert,
} from "@apna/design-system"
import { User, Plus, Briefcase, Users, CalendarCheck, TrendingUp } from "@apna/design-system"

/** A size-7 sender avatar for the ChatBubble demo; the ring keeps its edge on the wallpaper. */
function senderAvatar(initial: string) {
  return (
    <Avatar className="size-7 ring-2 ring-card">
      <AvatarFallback className="bg-accent text-xs text-accent-foreground">{initial}</AvatarFallback>
    </Avatar>
  )
}

export default function DisplayComponentsPage() {
  return (
    <div className="space-y-10">
      <div>
        <div className="flex items-center gap-2">
          <Badge variant="outline">Components</Badge>
          <Badge variant="success">Category 3</Badge>
        </div>
        <h1 className="text-2xl font-bold font-heading text-foreground mt-2">
          3. Data Display
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Avatars, status badges, loading skeletons, spinners, dividers, and empty states.
        </p>
      </div>

      <div className="rounded-xl border border-border bg-card p-4 font-mono text-xs text-muted-foreground">
        <code>{'import { Avatar, Badge, Skeleton, Spinner, Separator, Empty } from "@apna/design-system"'}</code>
      </div>

      {/* Badges */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-border/60 pb-2">
          <h2 className="text-base font-semibold text-foreground font-heading">
            Status Badges & Chips
          </h2>
          <Badge variant="outline" size="sm" className="font-mono">2 Sizes · 7 Variants</Badge>
        </div>

        {/* Default Size */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-foreground font-heading">Default Size (`size=&quot;default&quot;`)</span>
            <code className="text-2xs font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded">h-5 px-2 py-0.5 text-xs</code>
          </div>
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Badge variant="default">Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="info">Info</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="destructive">Destructive</Badge>
          </div>
        </div>

        {/* Small Size */}
        <div className="space-y-2 pt-4 border-t border-border/40">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-foreground font-heading">Small Size (`size=&quot;sm&quot;`)</span>
            <code className="text-2xs font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded">h-4 px-1.5 py-0 text-2xs</code>
          </div>
          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            <Badge variant="default" size="sm">Default</Badge>
            <Badge variant="secondary" size="sm">Secondary</Badge>
            <Badge variant="outline" size="sm">Outline</Badge>
            <Badge variant="info" size="sm">Info</Badge>
            <Badge variant="success" size="sm">Success</Badge>
            <Badge variant="warning" size="sm">Warning</Badge>
            <Badge variant="destructive" size="sm">Destructive</Badge>
          </div>
        </div>
      </div>

      {/* Metric / Stat Summary Cards */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="text-base font-semibold text-foreground font-heading border-b border-border/60 pb-2">
          Metric & Stat Summary Cards
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            label="Active Postings"
            value="166"
            icon={<Briefcase />}
            trend="+12% this mo"
            trendVariant="success"
          />
          <MetricCard
            label="Candidates Screened"
            value="143"
            icon={<Users />}
            trend="Across active roles"
            trendVariant="neutral"
          />
          <MetricCard
            label="Interviews Today"
            value="23"
            icon={<CalendarCheck />}
            trend="6 pending feedback"
            trendVariant="warning"
          />
          <MetricCard
            label="Offer Conversion"
            value="88%"
            icon={<TrendingUp />}
            trend="High conversion"
            trendVariant="success"
          />
        </div>
      </div>

      {/* Avatars */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="text-base font-semibold text-foreground font-heading border-b border-border/60 pb-2">
          Avatars
        </h2>
        <div className="flex items-center gap-4">
          <Avatar className="size-8">
            <AvatarFallback>PB</AvatarFallback>
          </Avatar>
          <Avatar className="size-10">
            <AvatarFallback className="bg-cta-primary text-primary-foreground font-bold">AK</AvatarFallback>
          </Avatar>
          <Avatar className="size-12">
            <AvatarFallback className="bg-success-subtle text-success-subtle-foreground font-bold">JD</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Skeletons & Spinners */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="text-base font-semibold text-foreground font-heading border-b border-border/60 pb-2">
          Loading Skeletons & Spinners
        </h2>
        <div className="flex items-center gap-6">
          <Spinner className="size-5 text-primary" />
          <Spinner className="size-8 text-muted-foreground" />
          <div className="space-y-2 flex-1 max-w-sm">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      </div>

      {/* Empty States */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="text-base font-semibold text-foreground font-heading border-b border-border/60 pb-2">
          Empty States
        </h2>
        <Empty className="py-8 border border-dashed border-border rounded-lg">
          <EmptyHeader>
            <User className="size-8 text-muted-foreground mx-auto" />
            <EmptyTitle>No Candidates Found</EmptyTitle>
            <EmptyDescription>Try adjusting your search criteria or invite candidates directly.</EmptyDescription>
          </EmptyHeader>
          <Button variant="outline" size="sm" className="mt-2">
            <Plus className="mr-1 size-3.5" />
            Add Candidate
          </Button>
        </Empty>
      </div>

      {/* Chat bubbles */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="text-base font-semibold text-foreground font-heading border-b border-border/60 pb-2">
          Chat Messages
        </h2>
        <ChatMessageList className="chat-wallpaper max-w-xl rounded-lg p-4">
          <ChatDayDivider>Today</ChatDayDivider>
          <ChatNotice icon={<ShieldAlert />} tone="warning">
            Apna never asks for money. Report any request for payment.
          </ChatNotice>
          <ChatBubble
            variant="assistant"
            label="Apna Assistant for Alok Singh, PixelVeda Studios"
            time="10:40 am"
            status="read"
          >
            Hi! Alok at PixelVeda Studios is hiring a Delivery Executive. Are you interested?
          </ChatBubble>
          <ChatChoice time="10:41 am">Interested</ChatChoice>
          <ChatBubble variant="incoming" groupPosition="first" time="10:41 am" avatar={senderAvatar("R")} senderName="Ravi">
            Is the job in Pune?
          </ChatBubble>
          <ChatBubble variant="incoming" groupPosition="last" time="10:42 am" avatar={senderAvatar("R")} senderName="Ravi">
            And what are the shift timings?
          </ChatBubble>
          <ChatBubble
            variant="incoming"
            time="10:43 am"
            media={
              // eslint-disable-next-line @next/next/no-img-element -- demo photo, size known
              <img src="/images/chats/bike.jpg" alt="An orange motorbike parked on a street" width={600} height={900} loading="lazy" />
            }
          >
            This is my bike.
          </ChatBubble>
          <ChatBubble variant="outgoing" time="10:44 am" status="read" avatar={senderAvatar("A")} senderName="You">
            Yes, Pune. Shifts are 9am to 6pm.
          </ChatBubble>
          <ChatUnreadDivider className="-mx-4">2 unread messages</ChatUnreadDivider>
          <ChatBubble variant="incoming" time="10:45 am">
            Great, I can start Monday.
          </ChatBubble>
          <ChatDayDivider>File cards</ChatDayDivider>
          <ChatBubble variant="incoming" time="10:45 am" media={<ChatFileCard name="Ravi Kumar resume.pdf" size={245760} href="#" />}>
            My resume.
          </ChatBubble>
          <ChatBubble variant="outgoing" time="10:46 am" status="read" media={<ChatFileCard name="Job description.docx" size={89000} onAction={() => {}} />}>
            The role details.
          </ChatBubble>
          <ChatBubble
            variant="assistant"
            label="Apna Assistant"
            time="10:47 am"
            status="sent"
            media={<ChatFileCard name="Salary-bands-for-delivery-executives-2026.xlsx" size={1572864} />}
          />
          <ChatDayDivider>Status ticks</ChatDayDivider>
          <ChatBubble variant="outgoing" time="10:46 am" status="sending">
            Sending: clock
          </ChatBubble>
          <ChatBubble variant="outgoing" time="10:46 am" status="sent">
            Sent: one tick
          </ChatBubble>
          <ChatBubble variant="outgoing" time="10:46 am" status="delivered">
            Delivered: two ticks
          </ChatBubble>
          <ChatBubble variant="outgoing" time="10:46 am" status="read">
            Read: two blue ticks
          </ChatBubble>
          <ChatBubble variant="assistant" label="Apna Assistant" time="10:47 am" status="sending">
            Sending
          </ChatBubble>
          <ChatBubble variant="assistant" label="Apna Assistant" time="10:47 am" status="sent">
            Sent
          </ChatBubble>
          <ChatBubble variant="assistant" label="Apna Assistant" time="10:47 am" status="delivered">
            Delivered
          </ChatBubble>
          <ChatBubble variant="assistant" label="Apna Assistant" time="10:47 am" status="read">
            Read
          </ChatBubble>
        </ChatMessageList>
      </div>

      {/* Chat attachments */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="text-base font-semibold text-foreground font-heading border-b border-border/60 pb-2">
          Chat Attachments
        </h2>
        <div className="grid max-w-xl gap-3">
          <ChatFileCard variant="standalone" name="Interview schedule.pdf" size={245760} actionLabel="Open" onAction={() => {}} />
          <ChatFileCard variant="standalone" name="Candidates.csv" size={512} />
          <ChatFileCard variant="standalone" name="Notes" />
          <ChatAttachmentTray
            items={[
              { id: "a", name: "Photo.jpg", size: 1200000, type: "image/jpeg", url: "/images/chats/bike.jpg" },
              { id: "b", name: "Job description.pdf", size: 245760, type: "application/pdf" },
              { id: "c", name: "Pay slip sheet with a very long name.xlsx", size: 90000, type: "" },
            ]}
            onRemove={() => {}}
          />
        </div>
      </div>

      {/* Conversation list */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="text-base font-semibold text-foreground font-heading border-b border-border/60 pb-2">
          Conversation List
        </h2>
        <ConversationList label="Conversations" className="max-w-md rounded-lg border border-border">
          <ConversationRow
            name="Ravi Kumar"
            initial="R"
            avatarSrc="/images/chats/ravi-kumar.jpg"
            subtitle="Delivery Executive · Super premium"
            preview="Can you share the joining date?"
            time="10:42 am"
            unreadCount={2}
            status={<Badge variant="destructive">Urgent: needs reply</Badge>}
          />
          <ConversationRow
            name="Meena Shah"
            initial="M"
            subtitle="Delivery Executive"
            preview="You: Thanks, I will be there at 11."
            previewStatus="read"
            time="Yesterday"
          />
          <ConversationRow
            name="Imran Khan"
            initial="I"
            subtitle="Delivery Executive"
            preview="You: Are you free this week?"
            previewStatus="delivered"
            time="Mon"
            active
          />
        </ConversationList>
        <div className="flex items-center gap-2">
          <Badge variant="count-positive" size="count">3</Badge>
          <span className="text-xs text-muted-foreground">Badge <code>count-positive</code> (green count)</span>
        </div>
      </div>
    </div>
  )
}
