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
    <div
      className="absolute pointer-events-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: `rotate(${rotate}deg) scale(${scale})`,
        animation: `floatNote 6s ease-in-out infinite`,
        animationDelay: `${delay}s`,
        opacity: 0.4,
      }}
    >
      <div
        className="flex items-center justify-center rounded-xl border border-yellow-500/30 bg-black/60 shadow-lg backdrop-blur-sm"
        style={{ width: 72, height: 44 }}
      >
        <span className="text-yellow-400 font-bold text-xl">₹</span>
      </div>
    </div>
  )
}

export function HeroSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative min-h-screen overflow-hidden flex flex-col">

      {/* Dark background */}
      <div className="absolute inset-0 bg-[#111111]" />

      {/* Coin glow effect in center */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_50%,rgba(180,130,30,0.25)_0%,rgba(120,80,10,0.12)_40%,transparent_70%)]" />

      {/* Coin circle visual */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div
          className="rounded-full opacity-20"
          style={{
            width: 500,
            height: 300,
            background: "radial-gradient(ellipse, rgba(200,160,30,0.6) 0%, rgba(150,100,10,0.3) 50%, transparent 80%)",
            filter: "blur(40px)",
          }}
        />
      </div>

      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-10">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#ffffff" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>

      {/* Floating ₹ notes */}
      {mounted && FLOATING_NOTES.map((note, i) => (
        <RupeeNote key={i} {...note} />
      ))}

      <style>{`
        @keyframes floatNote {
          0%   { transform: translateY(0px); }
          50%  { transform: translateY(-18px); }
          100% { transform: translateY(0px); }
        }
      `}</style>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-4 pt-24 pb-8 text-center">

        {/* Top label */}
        <p className="mb-4 text-sm font-medium text-white/60 tracking-widest uppercase">
          Revolutionize Your Financial Transactions
        </p>

        {/* Heading */}
        <h1 className="max-w-4xl text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl leading-tight">
          Exchange Cash & Digital Money — Instantly, Nearby.
        </h1>

        {/* Subtitle */}
        <p className="mt-6 max-w-xl text-lg text-white/60">
          Post a request, get matched with verified users within 1km, confirm with OTP. No banks, no waiting.
        </p>

        {/* Secure | Instant | Verified */}
        <div className="mt-8 flex items-center gap-6 text-sm text-white/60">
          <span className="flex items-center gap-1.5">
            <Lock className="h-4 w-4 text-yellow-400" /> Secure
          </span>
          <span className="h-4 w-px bg-white/20" />
          <span className="flex items-center gap-1.5">
            <Zap className="h-4 w-4 text-yellow-400" /> Instant
          </span>
          <span className="h-4 w-px bg-white/20" />
          <span className="flex items-center gap-1.5">
            <CheckCircle className="h-4 w-4 text-yellow-400" /> Verified
          </span>
        </div>

        {/* Trust badges */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm text-white/60">
          <span className="flex items-center gap-1.5">
            <Shield className="h-4 w-4 text-yellow-400" /> OTP Secured
          </span>
          <span className="flex items-center gap-1.5">
            <BadgeCheck className="h-4 w-4 text-yellow-400" /> KYC Verified Users
          </span>
          <span className="flex items-center gap-1.5">
            <Percent className="h-4 w-4 text-yellow-400" /> 1% Platform Fee
          </span>
        </div>

        {/* Two cards */}
        <div className="mt-14 grid w-full max-w-3xl grid-cols-1 gap-5 sm:grid-cols-2">

          <div className="rounded-2xl border border-white/10 bg-black/60 p-6 text-left shadow-xl backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-2">
              <Store className="h-6 w-6 text-yellow-400" />
              <h3 className="text-lg font-bold text-white">Shop to Person</h3>
            </div>
            <p className="text-sm text-white/50 mb-5">Exchange cash directly with nearby shops instantly</p>
            <button className="w-full rounded-lg bg-white text-black font-bold py-2.5 hover:bg-white/90 transition-colors">
              Try Now
            </button>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/60 p-6 text-left shadow-xl backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-2">
              <Users className="h-6 w-6 text-yellow-400" />
              <h3 className="text-lg font-bold text-white">Person to Person</h3>
            </div>
            <p className="text-sm text-white/50 mb-5">Send and receive cash with anyone around you</p>
            <button className="w-full rounded-lg bg-white text-black font-bold py-2.5 hover:bg-white/90 transition-colors">
              Try Now
            </button>
          </div>

        </div>
      </div>
    </section>
  )
}