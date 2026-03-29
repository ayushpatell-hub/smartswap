"use client"

import { useEffect, useState } from "react"
import { Shield, BadgeCheck, Percent, Lock, Zap, CheckCircle, Store, Users } from "lucide-react"

const FLOATING_NOTES = [
  { x: 8,  y: 28, rotate: -15, delay: 0,   scale: 1.1 },
  { x: 14, y: 60, rotate: 8,   delay: 0.8, scale: 0.95 },
  { x: 3,  y: 75, rotate: -5,  delay: 1.6, scale: 1.05 },
  { x: 78, y: 20, rotate: 12,  delay: 0.4, scale: 0.9  },
  { x: 85, y: 55, rotate: -8,  delay: 1.2, scale: 1.0  },
  { x: 82, y: 78, rotate: 5,   delay: 2.0, scale: 1.15 },
  { x: 50, y: 8,  rotate: -3,  delay: 1.0, scale: 0.85 },
  { x: 22, y: 18, rotate: 10,  delay: 2.4, scale: 0.9  },
  { x: 68, y: 82, rotate: -12, delay: 1.8, scale: 1.05 },
]

function RupeeNote({ x, y, rotate, delay, scale }: { x: number; y: number; rotate: number; delay: number; scale: number }) {
  return (
    <div className="absolute pointer-events-none" style={{
      left: `${x}%`, top: `${y}%`,
      transform: `rotate(${rotate}deg) scale(${scale})`,
      animation: `floatNote 6s ease-in-out infinite`,
      animationDelay: `${delay}s`, opacity: 0.4,
    }}>
      <div className="flex items-center justify-center rounded-xl shadow-lg backdrop-blur-sm"
        style={{ width: 72, height: 44, background: "rgba(33,150,243,0.12)", border: "1px solid rgba(33,150,243,0.25)" }}>
        <span className="font-bold text-xl text-blue-400">₹</span>
      </div>
    </div>
  )
}

export function HeroSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  return (
    <section className="relative min-h-screen overflow-hidden flex flex-col bg-black dark:bg-black"
      style={{ background: "var(--background)" }}>

      {/* Grid */}
      <div className="absolute inset-0 opacity-10">
        <svg className="h-full w-full">
          <defs>
            <pattern id="hero-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#2196f3" strokeWidth="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>

      {/* Glow */}
      <div className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(33,150,243,0.12) 0%, transparent 70%)" }} />

      {/* Floating notes */}
      {mounted && FLOATING_NOTES.map((note, i) => <RupeeNote key={i} {...note} />)}

      <style>{`
        @keyframes floatNote {
          0%   { transform: translateY(0px); }
          50%  { transform: translateY(-18px); }
          100% { transform: translateY(0px); }
        }
      `}</style>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-4 pt-24 pb-8 text-center">

        <div className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium"
          style={{ background: "rgba(33,150,243,0.1)", border: "1px solid rgba(33,150,243,0.3)", color: "#60a5fa" }}>
          <span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
          Trusted Fintech Platform
        </div>

        <h1 className="max-w-4xl text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl leading-tight"
          style={{ color: "var(--foreground)" }}>
          Exchange Cash & Digital Money — Instantly, Nearby.
        </h1>

        <p className="mt-6 max-w-xl text-lg" style={{ color: "var(--muted-foreground)" }}>
          Post a request, get matched with verified users within 1km, confirm with OTP. No banks, no waiting.
        </p>

        <div className="mt-8 flex items-center gap-6 text-sm" style={{ color: "var(--muted-foreground)" }}>
          <span className="flex items-center gap-1.5"><Lock className="h-4 w-4 text-blue-400" /> Secure</span>
          <span className="h-4 w-px bg-white/20" />
          <span className="flex items-center gap-1.5"><Zap className="h-4 w-4 text-blue-400" /> Instant</span>
          <span className="h-4 w-px bg-white/20" />
          <span className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-blue-400" /> Verified</span>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm" style={{ color: "var(--muted-foreground)" }}>
          <span className="flex items-center gap-1.5"><Shield className="h-4 w-4 text-blue-400" /> OTP Secured</span>
          <span className="flex items-center gap-1.5"><BadgeCheck className="h-4 w-4 text-blue-400" /> KYC Verified</span>
          <span className="flex items-center gap-1.5"><Percent className="h-4 w-4 text-blue-400" /> 1% Platform Fee</span>
        </div>

        <div className="mt-14 grid w-full max-w-3xl grid-cols-1 gap-5 sm:grid-cols-2">

          <div className="rounded-2xl p-6 text-left shadow-xl backdrop-blur-sm"
            style={{ background: "rgba(33,150,243,0.06)", border: "1px solid rgba(33,150,243,0.2)" }}>
            <div className="flex items-center gap-3 mb-2">
              <Store className="h-6 w-6 text-blue-400" />
              <h3 className="text-lg font-bold" style={{ color: "var(--foreground)" }}>Shop to Person</h3>
            </div>
            <p className="text-sm mb-5" style={{ color: "var(--muted-foreground)" }}>
              Exchange cash directly with nearby shops instantly
            </p>
            <button className="w-full rounded-xl py-2.5 font-bold text-white bg-blue-600 hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20">
              Try Now
            </button>
          </div>

          <div className="rounded-2xl p-6 text-left shadow-xl backdrop-blur-sm"
            style={{ background: "rgba(33,150,243,0.06)", border: "1px solid rgba(33,150,243,0.2)" }}>
            <div className="flex items-center gap-3 mb-2">
              <Users className="h-6 w-6 text-blue-400" />
              <h3 className="text-lg font-bold" style={{ color: "var(--foreground)" }}>Person to Person</h3>
            </div>
            <p className="text-sm mb-5" style={{ color: "var(--muted-foreground)" }}>
              Send and receive cash with anyone around you
            </p>
            <button className="w-full rounded-xl py-2.5 font-bold text-white bg-blue-600 hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20">
              Try Now
            </button>
          </div>

        </div>
      </div>
    </section>
  )
}