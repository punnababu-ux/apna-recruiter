"use client"

/**
 * CopyBlock — a block of text to copy whole (a generation prompt): shown
 * as-is, with one Copy button. Docs only.
 */

import * as React from "react"
import { Button, Check, Copy } from "@apna/design-system"

export function CopyBlock({ text, label = "Copy" }: { text: string; label?: string }) {
  const [copied, setCopied] = React.useState(false)
  return (
    <div className="relative rounded-card-nested border border-border bg-muted">
      <pre className="overflow-x-auto p-4 pr-24 font-mono text-xs leading-relaxed whitespace-pre-wrap text-foreground">{text}</pre>
      <Button
        size="sm"
        variant="outline"
        className="absolute top-3 right-3"
        onClick={() => {
          navigator.clipboard.writeText(text).then(() => {
            setCopied(true)
            window.setTimeout(() => setCopied(false), 1600)
          })
        }}
      >
        {copied ? <Check aria-hidden /> : <Copy aria-hidden />}
        {copied ? "Copied" : label}
      </Button>
    </div>
  )
}
