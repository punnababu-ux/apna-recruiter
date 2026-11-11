"use client"

/**
 * FooterWatermark — the footer's sign-off: "apna" edge to edge, filled with a
 * looping video masked to the letters, its bottom cropped by the page's end.
 * As the page reaches its end, the letters rise and grow into place while
 * the video inside drifts at another rate (`parallax-rise` / `parallax-drift`,
 * driven by `--parallax-p`). Decorative. Reduced motion: no video (the faint
 * letters show through the same mask) and no movement.
 */

import * as React from "react"

const MASK_URL = 'url("/images/footer/apna-wordmark-mask.svg")'
const WORDMARK_MASK: React.CSSProperties = {
  maskImage: MASK_URL,
  WebkitMaskImage: MASK_URL,
  maskSize: "100% 100%",
  WebkitMaskSize: "100% 100%",
  maskRepeat: "no-repeat",
  WebkitMaskRepeat: "no-repeat",
}

export function FooterWatermark() {
  const frame = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const el = frame.current
    if (!el) return
    let raf = 0
    const update = () => {
      raf = 0
      const { top, height } = el.getBoundingClientRect()
      const p = Math.min(1, Math.max(0, (window.innerHeight - top) / height))
      el.style.setProperty("--parallax-p", p.toFixed(3))
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div ref={frame} aria-hidden className="mt-16 aspect-13/4 overflow-hidden mask-b-from-20%">
      <div className="parallax-rise aspect-30/11 w-full origin-bottom bg-foreground/5" style={WORDMARK_MASK}>
        <video
          src="/videos/footer-watermark.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="parallax-drift size-full object-cover motion-reduce:hidden"
        />
      </div>
    </div>
  )
}
