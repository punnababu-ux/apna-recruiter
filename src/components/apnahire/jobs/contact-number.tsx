"use client"

/**
 * After "View number" on a job's applicants (as on live employer.apna.co):
 *
 *   ContactNumber   phones: one call button with the number (tel:).
 *                   desktop: the number, Copy, and a QR that opens a pop-up
 *                   to scan with a phone (a desktop can't place the call).
 *   CallStatusMenu  the recruiter records how the call went: Answered ·
 *                   Did not pick up.
 *
 * The QR is drawn on the device (qrcode), so the number never leaves it.
 */

import * as React from "react"
import QRCode from "qrcode"
import { toast } from "sonner"
import {
  Button,
  ButtonGroup,
  Check,
  ChevronDown,
  Copy,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
  Phone,
  CalendarClock,
  PhoneOff,
  QrCode,
} from "@apna/design-system"
import { PlanPopup, PopupBody, PopupHeader } from "@/components/apnahire/plan-popup"

export function ContactNumber({ name, phone }: { name: string; phone: string }) {
  const [qrOpen, setQrOpen] = React.useState(false)
  return (
    <>
      {/* Phones: calling is one tap. */}
      <Button variant="outline" size="sm" className="md:hidden" nativeButton={false} render={<a href={`tel:${phone}`} />}>
        <Phone /> {phone}
      </Button>
      {/* Desktop: the number is the copy button, the QR sits joined to it,
          so the three read as one control (user call, 2026-11-06). */}
      <ButtonGroup className="max-md:hidden">
        <Button
          variant="outline"
          size="sm"
          aria-label={`Copy ${name}'s number, ${phone}`}
          onClick={(e) => {
            e.stopPropagation()
            navigator.clipboard?.writeText(phone).then(() => toast.success("Number copied"))
          }}
        >
          <Phone aria-hidden className="text-success" />
          <span className="text-sm tabular-nums">{phone}</span>
          <Copy aria-hidden className="text-muted-foreground" />
        </Button>
        <Button
          variant="outline"
          size="icon-sm"
          aria-label={`Show a QR code to call ${name}`}
          onClick={(e) => {
            e.stopPropagation()
            setQrOpen(true)
          }}
        >
          <QrCode />
        </Button>
      </ButtonGroup>
      <PlanPopup open={qrOpen} onOpenChange={setQrOpen}>
        <PopupHeader art="contact" title={`Call ${name}`} description="Scan with your phone camera to call." />
        <PopupBody className="items-center">
          <CallQr phone={phone} />
          <span className="text-sm font-semibold text-foreground">{phone}</span>
        </PopupBody>
      </PlanPopup>
    </>
  )
}

function CallQr({ phone }: { phone: string }) {
  const [src, setSrc] = React.useState<string>()
  React.useEffect(() => {
    QRCode.toDataURL(`tel:${phone}`, { margin: 1, width: 400 }).then(setSrc)
  }, [phone])
  return (
    <div className="size-48 rounded-card-nested border border-border bg-card p-2">
      {/* eslint-disable-next-line @next/next/no-img-element -- a generated data URL */}
      {src && <img src={src} alt={`QR code to call ${phone}`} className="size-full" />}
    </div>
  )
}

export type CallStatus = "answered" | "follow-up" | "not-connected"

const CALL_STATUS: { id: CallStatus; label: string; icon: React.ReactNode }[] = [
  { id: "answered", label: "Answered", icon: <Check aria-hidden className="text-success" /> },
  { id: "follow-up", label: "Follow up", icon: <CalendarClock aria-hidden className="text-info" /> },
  { id: "not-connected", label: "Did not pick up", icon: <PhoneOff aria-hidden className="text-warning" /> },
]

export function CallStatusMenu({ value, onChange }: { value?: CallStatus; onChange: (v: CallStatus) => void }) {
  const current = CALL_STATUS.find((s) => s.id === value)
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" size="sm" onClick={(e) => e.stopPropagation()} />}>
        {current ? current.icon : null}
        {current ? current.label : "Call status"}
        <ChevronDown aria-hidden className="text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" onClick={(e) => e.stopPropagation()}>
        <CallStatusGroup value={value} onChange={onChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

/** The call status choices, for any menu. */
export function CallStatusGroup({ value, onChange }: { value?: CallStatus; onChange: (v: CallStatus) => void }) {
  return (
    <DropdownMenuGroup>
      <DropdownMenuLabel>How did the call go?</DropdownMenuLabel>
      <DropdownMenuRadioGroup value={value ?? ""} onValueChange={(v) => onChange(v as CallStatus)}>
        {CALL_STATUS.map((s) => (
          <DropdownMenuRadioItem key={s.id} value={s.id}>
            {s.icon}
            {s.label}
          </DropdownMenuRadioItem>
        ))}
      </DropdownMenuRadioGroup>
    </DropdownMenuGroup>
  )
}

export const callStatusLabel = (v: CallStatus) => CALL_STATUS.find((s) => s.id === v)?.label
