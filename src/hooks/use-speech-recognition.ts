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

const isAndroid = () => typeof navigator !== "undefined" && /android/i.test(navigator.userAgent)

export function useSpeechRecognition({ lang = "en-IN" }: { lang?: string } = {}) {
  const [supported, setSupported] = React.useState(false)
  const [listening, setListening] = React.useState(false)
  const [transcript, setTranscript] = React.useState("")
  const [error, setError] = React.useState<string | null>(null)
  const recRef = React.useRef<SpeechRecognitionLike | null>(null)
  // Chrome ends a session after a few seconds of silence even with
  // `continuous`; we restart until the user taps Stop. Each session's text is
  // banked in `doneRef` so a restart never drops what was already said.
  const wantRef = React.useRef(false)
  const doneRef = React.useRef("")
  const tokenRef = React.useRef(0)

  React.useEffect(() => {
    setSupported(getCtor() !== null)
    return () => {
      wantRef.current = false
      recRef.current?.abort()
    }
  }, [])

  const start = React.useCallback(() => {
    const Ctor = getCtor()
    if (!Ctor) return
    recRef.current?.abort()
    wantRef.current = true
    doneRef.current = ""
    setError(null)
    setTranscript("")
    setListening(true)

    // Each start() gets a token; a session from an earlier start (its abort
    // is async) must not restart or write text when it finally ends.
    const token = ++tokenRef.current
    const session = () => {
      const rec = new Ctor()
      rec.lang = lang
      // Android Chrome in continuous mode resends each phrase growing
      // ("hello", "hello there") as separate results, which doubled words.
      // There we take one phrase per session; onend restarts the next one.
      rec.continuous = !isAndroid()
      rec.interimResults = true
      let text = ""
      rec.onresult = (e) => {
        if (token !== tokenRef.current) return
        const parts: string[] = []
        for (let i = 0; i < e.results.length; i++) {
          const t = e.results[i][0].transcript.trim()
          if (t) parts.push(t)
        }
        text = parts.join(" ")
        setTranscript([doneRef.current, text].filter(Boolean).join(" "))
      }
      rec.onerror = (e) => {
        if (token !== tokenRef.current) return
        // Silence and our own restarts aren't failures.
        if (e.error === "no-speech" || e.error === "aborted") return
        wantRef.current = false
        setError(e.error === "not-allowed" ? "Microphone access is blocked for this site." : "Couldn't hear that. Try again.")
        setListening(false)
      }
      rec.onend = () => {
        if (token !== tokenRef.current) return
        doneRef.current = [doneRef.current, text].filter(Boolean).join(" ")
        if (wantRef.current) session()
        else setListening(false)
      }
      recRef.current = rec
      rec.start()
    }
    session()
  }, [lang])

  const stop = React.useCallback(() => {
    wantRef.current = false
    recRef.current?.stop()
    setListening(false)
  }, [])

  return { supported, listening, transcript, error, start, stop }
}
