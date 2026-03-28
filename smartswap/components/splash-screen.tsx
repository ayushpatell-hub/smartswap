"use client"

import { useEffect, useState } from "react"
import { ArrowLeftRight } from "lucide-react"

// All Indian currency notes & coins
const CURRENCY = [
  // Notes - [denomination, color1, color2, textColor]
  { type: "note", denom: "₹2000", bg1: "#9B4F96", bg2: "#6A1B6E", left: 3,  delay: 0,   dur: 6.0, rot: -12, sc: 1.0  },
  { type: "note", denom: "₹500",  bg1: "#4A7C59", bg2: "#2D5A3D", left: 12, delay: 1.2, dur: 5.5, rot: 8,   sc: 0.9  },
  { type: "note", denom: "₹200",  bg1: "#E8A838", bg2: "#B07A1A", left: 22, delay: 0.5, dur: 6.5, rot: -6,  sc: 0.95 },
  { type: "note", denom: "₹100",  bg1: "#4A90D9", bg2: "#2B5F9E", left: 32, delay: 2.0, dur: 5.8, rot: 14,  sc: 1.05 },
  { type: "note", denom: "₹50",   bg1: "#E87038", bg2: "#B04A18", left: 42, delay: 0.8, dur: 6.2, rot: -18, sc: 0.88 },
  { type: "note", denom: "₹20",   bg1: "#E8D038", bg2: "#B0A018", left: 52, delay: 1.8, dur: 5.3, rot: 10,  sc: 0.92 },
  { type: "note", denom: "₹10",   bg1: "#8BC34A", bg2: "#558B2F", left: 62, delay: 0.3, dur: 6.8, rot: -8,  sc: 1.0  },
  { type: "note", denom: "₹2000", bg1: "#9B4F96", bg2: "#6A1B6E", left: 72, delay: 2.5, dur: 5.6, rot: 16,  sc: 0.85 },
  { type: "note", denom: "₹500",  bg1: "#4A7C59", bg2: "#2D5A3D", left: 82, delay: 1.0, dur: 6.3, rot: -14, sc: 1.08 },
  { type: "note", denom: "₹100",  bg1: "#4A90D9", bg2: "#2B5F9E", left: 91, delay: 3.0, dur: 5.9, rot: 7,   sc: 0.93 },
  // Second wave
  { type: "note", denom: "₹200",  bg1: "#E8A838", bg2: "#B07A1A", left: 7,  delay: 3.5, dur: 6.1, rot: -20, sc: 0.9  },
  { type: "note", denom: "₹50",   bg1: "#E87038", bg2: "#B04A18", left: 18, delay: 4.0, dur: 5.7, rot: 11,  sc: 1.02 },
  { type: "note", denom: "₹20",   bg1: "#E8D038", bg2: "#B0A018", left: 38, delay: 2.8, dur: 6.4, rot: -5,  sc: 0.87 },
  { type: "note", denom: "₹10",   bg1: "#8BC34A", bg2: "#558B2F", left: 58, delay: 3.8, dur: 5.4, rot: 18,  sc: 1.0  },
  { type: "note", denom: "₹500",  bg1: "#4A7C59", bg2: "#2D5A3D", left: 78, delay: 4.5, dur: 6.6, rot: -9,  sc: 0.95 },
  // Coins
  { type: "coin", denom: "₹10",   bg1: "#FFD700", bg2: "#B8860B", left: 8,  delay: 0.6, dur: 4.8, rot: 0,   sc: 0.7  },
  { type: "coin", denom: "₹5",    bg1: "#C0C0C0", bg2: "#808080", left: 27, delay: 1.5, dur: 5.1, rot: 0,   sc: 0.65 },
  { type: "coin", denom: "₹2",    bg1: "#FFD700", bg2: "#B8860B", left: 47, delay: 0.2, dur: 4.5, rot: 0,   sc: 0.6  },
  { type: "coin", denom: "₹1",    bg1: "#C0C0C0", bg2: "#808080", left: 67, delay: 2.3, dur: 5.3, rot: 0,   sc: 0.55 },
  { type: "coin", denom: "₹10",   bg1: "#CD7F32", bg2: "#8B4513", left: 87, delay: 1.7, dur: 4.9, rot: 0,   sc: 0.68 },
  { type: "coin", denom: "₹5",    bg1: "#FFD700", bg2: "#B8860B", left: 17, delay: 3.2, dur: 5.0, rot: 0,   sc: 0.62 },
  { type: "coin", denom: "₹2",    bg1: "#C0C0C0", bg2: "#808080", left: 57, delay: 4.2, dur: 4.7, rot: 0,   sc: 0.58 },
  { type: "coin", denom: "₹1",    bg1: "#CD7F32", bg2: "#8B4513", left: 77, delay: 2.9, dur: 5.2, rot: 0,   sc: 0.6  },
]

function CurrencyItem({ type, denom, bg1, bg2, left, delay, dur, rot, sc }: typeof CURRENCY[0]) {
  if (type === "coin") {
    return (
      <div className="absolute pointer-events-none" style={{
        left: `${left}%`, top: "-60px",
        animation: `fallDown ${dur}s linear ${delay}s infinite`,
        zIndex: 1,
      }}>
        <div style={{
          width: 44 * sc, height: 44 * sc,
          borderRadius: "50%",
          background: `radial-gradient(circle at 35% 35%, ${bg1}, ${bg2})`,
          border: `2px solid rgba(255,255,255,0.3)`,
          boxShadow: `0 4px 12px rgba(0,0,0,0.5), inset 0 2px 4px rgba(255,255,255,0.3), inset 0 -2px 4px rgba(0,0,0,0.3)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          flexDirection: "column" as const,
          position: "relative" as const,
        }}>
          {/* Coin shine */}
          <div style={{
            position: "absolute", top: "10%", left: "15%",
            width: "30%", height: "25%",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.4)",
            filter: "blur(2px)",
          }} />
          <span style={{ fontSize: 9 * sc, fontWeight: "bold", color: "rgba(255,255,255,0.9)", lineHeight: 1 }}>{denom}</span>
          <span style={{ fontSize: 6 * sc, color: "rgba(255,255,255,0.6)", lineHeight: 1 }}>INDIA</span>
        </div>
      </div>
    )
  }

  return (
    <div className="absolute pointer-events-none" style={{
      left: `${left}%`, top: "-50px",
      animation: `fallDown ${dur}s linear ${delay}s infinite`,
      transform: `rotate(${rot}deg)`,
      zIndex: 1,
    }}>
      <div style={{
        width: 90 * sc, height: 48 * sc,
        borderRadius: 6,
        background: `linear-gradient(135deg, ${bg1} 0%, ${bg2} 50%, ${bg1} 100%)`,
        border: "1px solid rgba(255,255,255,0.2)",
        boxShadow: "0 6px 20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15)",
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative" as const,
        overflow: "hidden",
      }}>
        {/* Shine */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "35%",
          background: "linear-gradient(180deg, rgba(255,255,255,0.12) 0%, transparent 100%)",
        }} />
        {/* Security strip */}
        <div style={{
          position: "absolute", left: "28%", top: 0, bottom: 0, width: "4%",
          background: "rgba(255,255,255,0.15)",
        }} />
        {/* Center oval */}
        <div style={{
          width: 30 * sc, height: 22 * sc,
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.25)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <span style={{ color: "rgba(255,255,255,0.9)", fontSize: 11 * sc, fontWeight: "bold" }}>₹</span>
        </div>
        {/* Top-left denom */}
        <span style={{
          position: "absolute", top: 3, left: 5,
          color: "rgba(255,255,255,0.7)", fontSize: 7 * sc, fontWeight: "bold",
        }}>{denom}</span>
        {/* Bottom-right denom */}
        <span style={{
          position: "absolute", bottom: 3, right: 5,
          color: "rgba(255,255,255,0.7)", fontSize: 7 * sc, fontWeight: "bold",
        }}>{denom}</span>
        {/* RBI text */}
        <span style={{
          position: "absolute", bottom: 3, left: 5,
          color: "rgba(255,255,255,0.4)", fontSize: 5 * sc,
        }}>RBI</span>
      </div>
    </div>
  )
}

export default function SplashScreen({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState(0)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 200)
    const t2 = setTimeout(() => setPhase(2), 800)
    const t3 = setTimeout(() => setPhase(3), 1400)
    const t4 = setTimeout(() => setPhase(4), 2000)
    const t5 = setTimeout(() => {
      setLeaving(true)
      setTimeout(() => onDone(), 900)
    }, 3200)
    return () => [t1, t2, t3, t4, t5].forEach(clearTimeout)
  }, [onDone])

  return (
    <div className="fixed inset-0 z-9999 overflow-hidden flex items-center justify-center"
      style={{
        background: "linear-gradient(160deg, #0a0e1a 0%, #0d1520 50%, #0a0e1a 100%)",
        opacity: leaving ? 0 : 1,
        transition: leaving ? "opacity 0.9s ease-in-out" : "none",
      }}
    >
      <style>{`
        @keyframes fallDown {
          0%   { transform: translateY(-80px); opacity: 0; }
          8%   { opacity: 1; }
          88%  { opacity: 0.85; }
          100% { transform: translateY(105vh); opacity: 0; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50%      { opacity: 1;   transform: scale(1.04); }
        }
        @keyframes expandW {
          from { width: 0; opacity: 0; }
          to   { width: 100px; opacity: 1; }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
      `}</style>

      {/* Falling currency */}
      {CURRENCY.map((c, i) => <CurrencyItem key={i} {...c} />)}

      {/* Deep vignette */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 2,
        background: "radial-gradient(ellipse 85% 85% at 50% 50%, transparent 30%, rgba(5,8,18,0.85) 100%)",
      }} />

      {/* Gold glow */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 3,
        background: "radial-gradient(ellipse 45% 35% at 50% 50%, rgba(212,175,55,0.18) 0%, transparent 65%)",
        animation: "glowPulse 3s ease-in-out infinite",
      }} />

      {/* Branding */}
      <div className="relative flex flex-col items-center gap-4 text-center px-10" style={{ zIndex: 10 }}>

        {/* Logo */}
        <div style={{
          opacity: phase >= 1 ? 1 : 0,
          animation: phase >= 1 ? "slideUp 0.65s cubic-bezier(0.16,1,0.3,1) forwards" : "none",
        }}>
          <div style={{
            width: 80, height: 80, borderRadius: 22,
            background: "linear-gradient(135deg, #D4AF37 0%, #F5D060 40%, #B8860B 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 0 50px rgba(212,175,55,0.45), 0 8px 30px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.4)",
          }}>
            <ArrowLeftRight style={{ width: 38, height: 38, color: "#0a0e1a" }} />
          </div>
        </div>

        {/* SmartSwap */}
        <div style={{
          opacity: phase >= 1 ? 1 : 0,
          animation: phase >= 1 ? "slideUp 0.65s cubic-bezier(0.16,1,0.3,1) 0.1s forwards" : "none",
        }}>
          <p style={{
            fontSize: 10, fontWeight: 700,
            letterSpacing: "0.4em", textTransform: "uppercase" as const,
            color: "rgba(212,175,55,0.6)", marginBottom: 6,
          }}>
            Welcome to
          </p>
          <h1 style={{
            fontSize: 42, fontWeight: 900,
            letterSpacing: "0.1em", textTransform: "uppercase" as const,
            lineHeight: 1,
            background: "linear-gradient(90deg, #B8860B 0%, #F5D060 30%, #D4AF37 50%, #F5D060 70%, #B8860B 100%)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: "shimmer 3s linear infinite",
            textShadow: "none",
          }}>
            SmartSwap
          </h1>
        </div>

        {/* Divider */}
        <div style={{
          height: 1,
          background: "linear-gradient(90deg, transparent, #D4AF37, transparent)",
          animation: phase >= 2 ? "expandW 0.7s cubic-bezier(0.16,1,0.3,1) forwards" : "none",
          width: phase >= 2 ? 100 : 0,
          opacity: phase >= 2 ? 1 : 0,
        }} />

        {/* YOUR ASSETS */}
        <div style={{
          opacity: phase >= 2 ? 1 : 0,
          animation: phase >= 2 ? "slideUp 0.6s cubic-bezier(0.16,1,0.3,1) forwards" : "none",
        }}>
          <p style={{
            fontSize: 24, fontWeight: 900,
            letterSpacing: "0.06em", textTransform: "uppercase" as const,
            color: "#D4AF37", lineHeight: 1.2,
          }}>
            YOUR ASSETS.
          </p>
        </div>

        {/* YOUR CONTROL */}
        <div style={{
          opacity: phase >= 3 ? 1 : 0,
          animation: phase >= 3 ? "slideUp 0.6s cubic-bezier(0.16,1,0.3,1) forwards" : "none",
          marginTop: -8,
        }}>
          <p style={{
            fontSize: 24, fontWeight: 900,
            letterSpacing: "0.06em", textTransform: "uppercase" as const,
            color: "#ffffff", lineHeight: 1.2,
          }}>
            YOUR CONTROL.
          </p>
        </div>

        {/* Tagline */}
        <p style={{
          fontSize: 10, fontWeight: 600,
          letterSpacing: "0.28em", textTransform: "uppercase" as const,
          color: "rgba(212,175,55,0.45)",
          opacity: phase >= 4 ? 1 : 0,
          animation: phase >= 4 ? "slideUp 0.5s ease forwards" : "none",
          marginTop: 4,
        }}>
          Instant · Secure · Nearby
        </p>

        {/* Loading dots */}
        <div className="flex gap-2" style={{
          opacity: phase >= 4 ? 1 : 0,
          transition: "opacity 0.5s ease",
          marginTop: 6,
        }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{
              width: 7, height: 7, borderRadius: "50%",
              background: "#D4AF37",
              animation: `glowPulse 1s ease-in-out ${i * 0.25}s infinite`,
            }} />
          ))}
        </div>

      </div>
    </div>
  )
}