"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import {
  ArrowDownLeft, ArrowUpRight, ArrowLeftRight,
  MapPin, User, Star, Shield, Zap,
  CheckCircle, Clock, Phone, ChevronRight, X
} from "lucide-react"

type Tab = "send" | "request" | "upi-to-cash" | "cash-to-upi"

const NEARBY_USERS = [
  { id: 1, name: "Rahul S.",    distance: "0.3 km", rating: 4.9, swaps: 142, verified: true,  x: 48, y: 42, type: "both"         },
  { id: 2, name: "Priya P.",    distance: "0.6 km", rating: 4.7, swaps: 89,  verified: true,  x: 62, y: 30, type: "cash-to-upi"  },
  { id: 3, name: "Amit K.",     distance: "0.8 km", rating: 4.5, swaps: 56,  verified: false, x: 32, y: 58, type: "upi-to-cash"  },
  { id: 4, name: "Sneha G.",    distance: "1.1 km", rating: 4.8, swaps: 203, verified: true,  x: 70, y: 55, type: "both"         },
  { id: 5, name: "Vikram M.",   distance: "0.5 km", rating: 4.6, swaps: 78,  verified: true,  x: 25, y: 35, type: "upi-to-cash"  },
  { id: 6, name: "Meena T.",    distance: "0.9 km", rating: 4.4, swaps: 34,  verified: false, x: 55, y: 68, type: "cash-to-upi"  },
]

const STEPS = {
  send:         ["Enter amount & select user", "User accepts your request", "Confirm with OTP", "Exchange complete ✓"],
  request:      ["Post your cash request",     "Nearby user responds",      "Confirm with OTP", "Receive cash ✓"    ],
  "upi-to-cash":["Send UPI amount to user",    "User confirms receipt",     "Get cash from user","Done ✓"           ],
  "cash-to-upi":["Hand cash to user",          "User sends UPI to you",     "Confirm with OTP", "UPI received ✓"   ],
}

export default function PersonToPersonPage() {
  const [activeTab, setActiveTab]     = useState<Tab>("send")
  const [selectedUser, setSelectedUser] = useState<typeof NEARBY_USERS[0] | null>(null)
  const [amount, setAmount]           = useState("")
  const [step, setStep]               = useState(0)
  const [showSuccess, setShowSuccess] = useState(false)

  const tabs = [
    { id: "send"         as Tab, label: "Send Cash",      icon: ArrowUpRight   },
    { id: "request"      as Tab, label: "Request Cash",   icon: ArrowDownLeft  },
    { id: "upi-to-cash"  as Tab, label: "UPI → Cash",     icon: ArrowLeftRight },
    { id: "cash-to-upi"  as Tab, label: "Cash → UPI",     icon: ArrowLeftRight },
  ]

  const handleProceed = () => {
    if (!amount || !selectedUser) return
    if (step < 3) setStep(step + 1)
    else { setShowSuccess(true); setStep(0) }
  }

  const reset = () => {
    setShowSuccess(false)
    setAmount("")
    setSelectedUser(null)
    setStep(0)
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>
      <Navbar />

      <main className="container mx-auto px-4 py-8 max-w-6xl">

        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium mb-4"
            style={{ background: "rgba(33,150,243,0.1)", border: "1px solid rgba(33,150,243,0.3)", color: "#60a5fa" }}>
            <MapPin className="h-4 w-4" /> Live Nearby Users
          </div>
          <h1 className="text-4xl font-black mb-2" style={{ color: "var(--foreground)" }}>
            Person to <span className="text-blue-500">Person</span>
          </h1>
          <p className="text-lg" style={{ color: "var(--muted-foreground)" }}>
            Exchange cash with verified users within 1km — instantly & securely
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 p-1 rounded-2xl"
          style={{ background: "rgba(33,150,243,0.06)", border: "1px solid rgba(33,150,243,0.15)" }}>
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => { setActiveTab(tab.id); reset() }}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold transition-all"
              style={{
                background: activeTab === tab.id ? "#1976d2" : "transparent",
                color: activeTab === tab.id ? "#ffffff" : "var(--muted-foreground)",
                boxShadow: activeTab === tab.id ? "0 4px 15px rgba(33,150,243,0.3)" : "none",
              }}>
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">

          {/* LEFT — Map */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold" style={{ color: "var(--foreground)" }}>
              📍 Nearby Users
            </h2>

            {/* Map Container */}
            <div className="relative rounded-2xl overflow-hidden"
              style={{
                height: 380,
                background: "linear-gradient(135deg, #0a0a1a 0%, #0d1b2a 100%)",
                border: "1px solid rgba(33,150,243,0.2)",
              }}>

              {/* Grid lines */}
              <svg className="absolute inset-0 h-full w-full opacity-20">
                <defs>
                  <pattern id="map-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#2196f3" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#map-grid)" />
              </svg>

              {/* Glow rings — YOU */}
              <div className="absolute" style={{ left: "50%", top: "50%", transform: "translate(-50%,-50%)" }}>
                <div className="absolute rounded-full border border-blue-500/20 animate-ping"
                  style={{ width: 120, height: 120, top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
                <div className="absolute rounded-full border border-blue-500/10"
                  style={{ width: 200, height: 200, top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />

                {/* You marker */}
                <div className="relative flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-blue-600 border-2 border-white flex items-center justify-center shadow-lg shadow-blue-500/50 z-10">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <span className="mt-1 text-xs font-bold text-white bg-blue-600 px-2 py-0.5 rounded-full">You</span>
                </div>
              </div>

              {/* Nearby user pins */}
              {NEARBY_USERS.map((user) => (
                <button key={user.id}
                  onClick={() => setSelectedUser(selectedUser?.id === user.id ? null : user)}
                  className="absolute flex flex-col items-center transition-transform hover:scale-110"
                  style={{ left: `${user.x}%`, top: `${user.y}%`, transform: "translate(-50%,-50%)" }}>
                  <div className={`w-9 h-9 rounded-full border-2 flex items-center justify-center shadow-lg transition-all ${
                    selectedUser?.id === user.id
                      ? "bg-blue-500 border-white scale-125 shadow-blue-500/60"
                      : "bg-white/10 border-blue-400/50 hover:border-blue-400"}`}>
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="mt-0.5 text-[10px] font-semibold text-white/80 whitespace-nowrap">
                    {user.name}
                  </span>
                  {user.verified && (
                    <CheckCircle className="w-3 h-3 text-blue-400 absolute -top-1 -right-1" />
                  )}
                </button>
              ))}

              {/* Distance label */}
              <div className="absolute bottom-4 right-4 text-xs px-3 py-1.5 rounded-full font-medium"
                style={{ background: "rgba(33,150,243,0.15)", border: "1px solid rgba(33,150,243,0.3)", color: "#60a5fa" }}>
                📍 Showing users within 1.5 km
              </div>
            </div>

            {/* User list */}
            <div className="space-y-2">
              {NEARBY_USERS.map((user) => (
                <button key={user.id} onClick={() => setSelectedUser(selectedUser?.id === user.id ? null : user)}
                  className="w-full flex items-center justify-between p-3 rounded-xl transition-all text-left"
                  style={{
                    background: selectedUser?.id === user.id ? "rgba(33,150,243,0.15)" : "rgba(33,150,243,0.04)",
                    border: `1px solid ${selectedUser?.id === user.id ? "rgba(33,150,243,0.5)" : "rgba(33,150,243,0.1)"}`,
                  }}>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
                      <User className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>{user.name}</span>
                        {user.verified && <CheckCircle className="w-3.5 h-3.5 text-blue-400" />}
                      </div>
                      <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                        ⭐ {user.rating} · {user.swaps} swaps · {user.distance}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4" style={{ color: selectedUser?.id === user.id ? "#60a5fa" : "var(--muted-foreground)" }} />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT — Form */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold" style={{ color: "var(--foreground)" }}>
              {activeTab === "send"          ? "💸 Send Cash"
               : activeTab === "request"    ? "📥 Request Cash"
               : activeTab === "upi-to-cash"? "📲 UPI → Cash"
               :                              "💵 Cash → UPI"}
            </h2>

            {/* Success Screen */}
            {showSuccess ? (
              <div className="rounded-2xl p-8 text-center space-y-4"
                style={{ background: "rgba(33,150,243,0.06)", border: "1px solid rgba(33,150,243,0.2)" }}>
                <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-2xl font-black text-green-400">Success! 🎉</h3>
                <p style={{ color: "var(--muted-foreground)" }}>
                  ₹{amount} exchange completed with {selectedUser?.name}
                </p>
                <button onClick={reset}
                  className="w-full py-3 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-500 transition-all">
                  New Transaction
                </button>
              </div>
            ) : (
              <div className="rounded-2xl p-6 space-y-5"
                style={{ background: "rgba(33,150,243,0.04)", border: "1px solid rgba(33,150,243,0.15)" }}>

                {/* Selected user */}
                {selectedUser ? (
                  <div className="flex items-center justify-between p-3 rounded-xl"
                    style={{ background: "rgba(33,150,243,0.1)", border: "1px solid rgba(33,150,243,0.3)" }}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-bold" style={{ color: "var(--foreground)" }}>{selectedUser.name}</p>
                        <p className="text-xs text-blue-400">⭐ {selectedUser.rating} · {selectedUser.distance}</p>
                      </div>
                    </div>
                    <button onClick={() => setSelectedUser(null)}>
                      <X className="w-4 h-4 text-gray-400 hover:text-red-400" />
                    </button>
                  </div>
                ) : (
                  <div className="p-3 rounded-xl text-center text-sm"
                    style={{ background: "rgba(33,150,243,0.04)", border: "1px dashed rgba(33,150,243,0.3)", color: "var(--muted-foreground)" }}>
                    👆 Select a nearby user from the map
                  </div>
                )}

                {/* Amount */}
                <div>
                  <label className="text-sm font-medium block mb-2" style={{ color: "var(--muted-foreground)" }}>
                    Amount (₹)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400 font-bold text-lg">₹</span>
                    <input type="number" placeholder="0" value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full pl-8 pr-4 py-4 rounded-xl text-2xl font-black outline-none transition-all"
                      style={{
                        background: "rgba(33,150,243,0.06)",
                        border: "1px solid rgba(33,150,243,0.2)",
                        color: "var(--foreground)",
                      }} />
                  </div>
                  {/* Quick amounts */}
                  <div className="flex gap-2 mt-2">
                    {["500", "1000", "2000", "5000"].map((q) => (
                      <button key={q} onClick={() => setAmount(q)}
                        className="flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all"
                        style={{
                          background: amount === q ? "rgba(33,150,243,0.2)" : "rgba(33,150,243,0.06)",
                          border: `1px solid ${amount === q ? "rgba(33,150,243,0.5)" : "rgba(33,150,243,0.1)"}`,
                          color: amount === q ? "#60a5fa" : "var(--muted-foreground)",
                        }}>
                        ₹{q}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Progress steps */}
                <div>
                  <p className="text-xs font-medium mb-3" style={{ color: "var(--muted-foreground)" }}>Progress</p>
                  <div className="space-y-2">
                    {STEPS[activeTab].map((s, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all ${
                          i < step ? "bg-green-500 text-white"
                          : i === step ? "bg-blue-600 text-white"
                          : "text-gray-600"}`}
                          style={i >= step ? { background: "rgba(33,150,243,0.1)", border: "1px solid rgba(33,150,243,0.2)" } : {}}>
                          {i < step ? "✓" : i + 1}
                        </div>
                        <span className={`text-sm transition-all ${
                          i === step ? "font-semibold text-blue-400"
                          : i < step ? "line-through"
                          : ""}`}
                          style={{ color: i === step ? "#60a5fa" : "var(--muted-foreground)" }}>
                          {s}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Trust badges */}
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { icon: Shield, label: "OTP Secured" },
                    { icon: Zap,    label: "Instant"     },
                    { icon: Clock,  label: "< 5 mins"    },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex flex-col items-center gap-1 p-2 rounded-xl"
                      style={{ background: "rgba(33,150,243,0.06)", border: "1px solid rgba(33,150,243,0.1)" }}>
                      <Icon className="w-4 h-4 text-blue-400" />
                      <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>{label}</span>
                    </div>
                  ))}
                </div>

                {/* Action button */}
                <button onClick={handleProceed}
                  disabled={!amount || !selectedUser}
                  className="w-full py-4 rounded-xl font-black text-white text-base transition-all"
                  style={{
                    background: amount && selectedUser ? "#1976d2" : "rgba(33,150,243,0.2)",
                    color: amount && selectedUser ? "#ffffff" : "rgba(255,255,255,0.3)",
                    boxShadow: amount && selectedUser ? "0 4px 20px rgba(33,150,243,0.35)" : "none",
                    cursor: amount && selectedUser ? "pointer" : "not-allowed",
                  }}>
                  {step === 0 ? (activeTab === "send" ? "Send Request →"
                              : activeTab === "request" ? "Post Request →"
                              : activeTab === "upi-to-cash" ? "Send UPI →"
                              : "Confirm Cash →")
                   : step === 3 ? "Confirm & Complete ✓"
                   : "Next Step →"}
                </button>

                <p className="text-center text-xs" style={{ color: "var(--muted-foreground)" }}>
                  🔐 256-bit encrypted · 1% platform fee · RBI compliant
                </p>
              </div>
            )}

            {/* Info card */}
            <div className="rounded-xl p-4 space-y-2"
              style={{ background: "rgba(33,150,243,0.06)", border: "1px solid rgba(33,150,243,0.15)" }}>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>How it works</span>
              </div>
              <ol className="space-y-1">
                {STEPS[activeTab].map((s, i) => (
                  <li key={i} className="text-xs flex items-center gap-2" style={{ color: "var(--muted-foreground)" }}>
                    <span className="w-4 h-4 rounded-full bg-blue-600/20 flex items-center justify-center text-[10px] text-blue-400 font-bold flex-shrink-0">
                      {i + 1}
                    </span>
                    {s}
                  </li>
                ))}
              </ol>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}


