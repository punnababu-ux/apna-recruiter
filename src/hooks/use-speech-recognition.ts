"use client"

/**
 * useSpeechRecognition — browser speech-to-text via the Web Speech API
 * (Chrome, Edge, Safari). `transcript` streams interim words as the user
 * speaks; `supported` is false where the API doesn't exist, so callers can
 * hide the mic instead of showing a dead button.
 *
 * `en-IN` by default: it handles Indian-English place names and the odd
 * Hindi word in an otherwise English sentence better than `en-US`.
 */

import * as React from "react"

interface SpeechRecognitionResultLike {
  0: { transcript: string }
  isFinal: boolean
}
interface SpeechRecognitionEventLike {
  resultIndex: number
  results: ArrayLike<SpeechRecognitionResultLike>
}
interface SpeechRecognitionLike {
  lang: string
  continuous: boolean
  interimResults: boolean
  start: () => void
  stop: () => void
  abort: () => void
  onresult: ((e: SpeechRecognitionEventLike) => void) | null
  onend: (() => void) | null
  onerror: ((e: { error: string }) => void) | null
}
type SpeechRecognitionCtor = new () => SpeechRecognitionLike

function getCtor(): SpeechRecognitionCtor | null {
  if (typeof window === "undefined") return null
  const w = window as unknown as {
    SpeechRecognition?: SpeechRecognitionCtor
    webkitSpeechRecognition?: SpeechRecognitionCtor
  }
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null
}

export function useSpeechRecognition({ lang = "en-IN" }: { lang?: string } = {}) {
  const [supported, setSupported] = React.useState(false)
  const [listening, setListening] = React.useState(false)
  const [transcript, setTranscript] = React.useState("")
  const [error, setError] = React.useState<string | null>(null)
  const recRef = React.useRef<SpeechRecognitionLike | null>(null)

  React.useEffect(() => {
    setSupported(getCtor() !== null)
    return () => recRef.current?.abort()
  }, [])

  const start = React.useCallback(() => {
    const Ctor = getCtor()
    if (!Ctor) return
    recRef.current?.abort()
    const rec = new Ctor()
    rec.lang = lang
    rec.continuous = true
    rec.interimResults = true
    let finalText = ""
    rec.onresult = (e) => {
      let interim = ""
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const r = e.results[i]
        if (r.isFinal) finalText += r[0].transcript
        else interim += r[0].transcript
      }
      setTranscript((finalText + interim).trim())
    }
    rec.onerror = (e) => {
      setError(e.error === "not-allowed" ? "Microphone access is blocked for this site." : "Couldn't hear that. Try again.")
      setListening(false)
    }
    rec.onend = () => setListening(false)
    recRef.current = rec
    setError(null)
    setTranscript("")
    setListening(true)
    rec.start()
  }, [lang])

  const stop = React.useCallback(() => {
    recRef.current?.stop()
    setListening(false)
  }, [])

  return { supported, listening, transcript, error, start, stop }
}
