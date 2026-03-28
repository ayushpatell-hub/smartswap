"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowLeftRight } from "lucide-react"

type Pin = { x: number; y: number; delay: number }
type Connection = { from: number; to: number }

// Fixed constants only (no Math.random / Date.now).
const PINS: Pin[] = [
  { x: 50, y: 50, delay: 0 },
  { x: 25, y: 35, delay: 0.5 },
  { x: 75, y: 30, delay: 1 },
  { x: 30, y: 70, delay: 1.5 },
  { x: 70, y: 65, delay: 2 },
  { x: 45, y: 25, delay: 2.5 },
]

const CONNECTIONS: Connection[] = [
  { from: 0, to: 1 },
  { from: 0, to: 4 },
  { from: 0, to: 2 },
]

export function AnimatedMap() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [mounted, setMounted] = useState(false)
  const [activeConnection, setActiveConnection] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReducedMotion(media.matches)

    update()
    if (media.addEventListener) {
      media.addEventListener("change", update)
      return () => media.removeEventListener("change", update)
    }

    // Safari fallback
    media.addListener(update)
    return () => media.removeListener(update)
  }, [mounted])

  useEffect(() => {
    if (!mounted) return
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        setIsVisible(Boolean(entry?.isIntersecting))
      },
      { threshold: 0.25 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [mounted])

  useEffect(() => {
    if (!mounted) return
    if (reducedMotion || !isVisible) return

    const interval = window.setInterval(() => {
      setActiveConnection((prev) => (prev + 1) % CONNECTIONS.length)
    }, 2000)

    return () => window.clearInterval(interval)
  }, [mounted, isVisible, reducedMotion])

  // SSR + first client render: static placeholder only (prevents hydration mismatches).
  if (!mounted) {
    return (
      <div className="relative aspect-square w-full max-w-md mx-auto">
        <div className="absolute inset-0 rounded-2xl bg-zinc-900/60 border border-border" />
      </div>
    )
  }

  return (
    <div ref={containerRef} className="relative aspect-square w-full max-w-md mx-auto">
      <div className="absolute inset-0 rounded-2xl bg-card border border-border overflow-hidden">
        {/* Grid pattern */}
        <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                strokeLinecap="square"
                className="text-border"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Connection lines */}
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100">
          {CONNECTIONS.map((conn, i) => (
            <line
              key={`${conn.from}-${conn.to}-${i}`}
              x1={PINS[conn.from].x}
              y1={PINS[conn.from].y}
              x2={PINS[conn.to].x}
              y2={PINS[conn.to].y}
              strokeLinecap="round"
              className={`transition-all duration-500 ${
                activeConnection === i ? "stroke-primary stroke-2" : "stroke-border stroke-1"
              }`}
              strokeDasharray={activeConnection === i ? undefined : "4 4"}
            />
          ))}
        </svg>

        {/* Swap arrow indicator on active connection */}
        {CONNECTIONS.map((conn, i) => {
          const midX = (PINS[conn.from].x + PINS[conn.to].x) / 2
          const midY = (PINS[conn.from].y + PINS[conn.to].y) / 2
          return (
            <div
              key={`${conn.from}-${conn.to}-arrow-${i}`}
              className={`absolute transition-all duration-500 ${
                activeConnection === i ? "opacity-100 scale-100" : "opacity-0 scale-75"
              }`}
              style={{
                left: `${midX}%`,
                top: `${midY}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary shadow-lg shadow-primary/50">
                <ArrowLeftRight className="h-4 w-4 text-primary-foreground" />
              </div>
            </div>
          )
        })}

        {/* Location pins */}
        {PINS.map((pin, i) => (
          <div
            key={`pin-${i}`}
            className="absolute"
            style={{
              left: `${pin.x}%`,
              top: `${pin.y}%`,
              transform: "translate(-50%, -50%)",
              animationDelay: `${pin.delay}s`,
            }}
          >
            {/* Pulse ring */}
            {!reducedMotion && isVisible && (
              <div
                className="absolute inset-0 animate-ping rounded-full bg-accent/50"
                style={{
                  width: "40px",
                  height: "40px",
                  transform: "translate(-50%, -50%)",
                  left: "50%",
                  top: "50%",
                  animationDuration: "2s",
                  animationDelay: `${pin.delay}s`,
                }}
              />
            )}
            <div
              className={`relative flex h-4 w-4 items-center justify-center rounded-full ${
                i === 0 ? "bg-primary" : "bg-accent"
              }`}
            >
              <div
                className={`h-2 w-2 rounded-full ${
                  i === 0 ? "bg-primary-foreground" : "bg-accent-foreground"
                }`}
              />
            </div>
          </div>
        ))}

        {/* Radius circles */}
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100">
          <circle
            cx={PINS[0].x}
            cy={PINS[0].y}
            r="15"
            fill="none"
            className="stroke-primary/30"
            strokeWidth="0.5"
            strokeDasharray="2 2"
            strokeLinecap="round"
          />
          <circle
            cx={PINS[0].x}
            cy={PINS[0].y}
            r="30"
            fill="none"
            className="stroke-primary/20"
            strokeWidth="0.5"
            strokeDasharray="2 2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  )
}
