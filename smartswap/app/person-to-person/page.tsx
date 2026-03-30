"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import {
  ArrowDownLeft, ArrowUpRight, MapPin, User, Star,
  Shield, Zap, Clock, Phone, X, CheckCircle,
  XCircle, ChevronRight, Navigation, Store, Users
} from "lucide-react"

type Tab = "send" | "request"
type StepStatus = "pending" | "active" | "done" | "cancelled"

const AVAILABLE_USERS = [
  { id: 1, name: "Rahul Sharma",   phone: "9876543210", distance: "0.3 km", rating: 4.9, swaps: 142, verified: true,  type: "person",      available: true,  x: 52, y: 38, amount: "₹500–₹5,000"  },
  { id: 2, name: "Priya's Store",  phone: "9812345678", distance: "0.6 km", rating: 4.7, swaps: 89,  verified: true,  type: "shop",        available: true,  x: 65, y: 28, amount: "₹100–₹10,000" },
  { id: 3, name: "Amit Kumar",     phone: "9845671230", distance: "0.8 km", rating: 4.5, swaps: 56,  verified: false, type: "person",      available: true,  x: 35, y: 55, amount: "₹200–₹2,000"  },
  { id: 4, name: "Sneha General",  phone: "9867452310", distance: "1.1 km", rating: 4.8, swaps: 203, verified: true,  type: "shop",        available: true,  x: 72, y: 58, amount: "₹500–₹20,000" },
  { id: 5, name: "Vikram Mehta",   phone: "9823456701", distance: "0.5 km", rating: 4.6, swaps: 78,  verified: true,  type: "person",      available: false, x: 28, y: 32, amount: "₹1,000–₹8,000"},
  { id: 6, name: "Meena Telecom",  phone: "9834567012", distance: "0.9 km", rating: 4.4, swaps: 34,  verified: false, type: "shop",        available: true,  x: 58, y: 70, amount: "₹100–₹3,000"  },
]

const SEND_STEPS = [
  { label: "Enter amount",          desc: "Choose how much to send"           },
  { label: "Select user",           desc: "Pick a nearby verified user"       },
  { label: "Request sent",          desc: "Waiting for user to accept"        },
  { label: "OTP verification",      desc: "Confirm exchange with OTP"         },
  { label: "Exchange complete",     desc: "Cash exchanged successfully"       },
]

const REQUEST_STEPS = [
  { label: "Enter amount",          desc: "Choose how much you need"          },
  { label: "Select provider",       desc: "Pick a nearby cash provider"       },
  { label: "Request posted",        desc: "Provider notified nearby"          },
  { label: "OTP verification",      desc: "Confirm exchange with OTP"         },
  { label: "Cash received",         desc: "Exchange completed successfully"   },
]

export default function PersonToPersonPage() {
  const [activeTab, setActiveTab]         = useState<Tab>("send")
  const [selectedUser, setSelectedUser]   = useState<typeof AVAILABLE_USERS[0] | null>(null)
  const [showUserDetail, setShowUserDetail] = useState(false)
  const [amount, setAmount]               = useState("")
  const [currentStep, setCurrentStep]     = useState(0)
  const [stepStatuses, setStepStatuses]   = useState<StepStatus[]>(["active","pending","pending","pending","pending"])
  const [cancelled, setCancelled]         = useState(false)
  const [completed, setCompleted]         = useState(false)

  const steps = activeTab === "send" ? SEND_STEPS : REQUEST_STEPS

  const resetAll = () => {
    setAmount("")
    setSelectedUser(null)
    setCurrentStep(0)
    setStepStatuses(["active","pending","pending","pending","pending"])
    setCancelled(false)
    setCompleted(false)
    setShowUserDetail(false)
  }

  const handleNextStep = () => {
    if (currentStep === 0 && !amount) return
    if (currentStep === 1 && !selectedUser) return

    const newStatuses = [...stepStatuses]
    newStatuses[currentStep] = "done"

    if (currentStep + 1 < steps.length) {
      newStatuses[currentStep + 1] = "active"
      setCurrentStep(currentStep + 1)
      setStepStatuses(newStatuses)
    } else {
      setStepStatuses(newStatuses)
      setCompleted(true)
    }
  }

  const handleCancel = () => {
    const newStatuses = [...stepStatuses]
    newStatuses[currentStep] = "cancelled"
    for (let i = currentStep + 1; i < steps.length; i++) newStatuses[i] = "pending"
    setStepStatuses(newStatuses)
    setCancelled(true)
  }

  const getStepStyle = (status: StepStatus, index: number) => {
    if (status === "done")      return { circle: "bg-green-500 border-green-500",      text: "text-green-400",  line: "bg-green-500"  }
    if (status === "active")    return { circle: "bg-blue-600 border-blue-500",         text: "text-blue-400",   line: "bg-white/10"   }
    if (status === "cancelled") return { circle: "bg-red-500 border-red-500",           text: "text-red-400",    line: "bg-red-500/30" }
    return                             { circle: "bg-transparent border-white/10",      text: "text-gray-600",   line: "bg-white/5"    }
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>
      <Navbar />

      <main className="container mx-auto px-4 py-8 max-w-6xl">

        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium mb-4"
            style={{ background: "rgba(33,150,243,0.1)", border: "1px solid rgba(33,150,243,0.3)", color: "#60a5fa" }}>
            <Users className="h-4 w-4" /> Person to Person Exchange
          </div>
          <h1 className="text-4xl font-black mb-2" style={{ color: "var(--foreground)" }}>
            Person to <span className="text-blue-500">Person</span>
          </h1>
          <p className="text-base" style={{ color: "var(--muted-foreground)" }}>
            Exchange cash with verified users within 1km — instantly & securely
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 p-1.5 rounded-2xl max-w-sm mx-auto"
          style={{ background: "rgba(33,150,243,0.06)", border: "1px solid rgba(33,150,243,0.15)" }}>
          {([
            { id: "send"    as Tab, label: "Send Cash",    icon: ArrowUpRight   },
            { id: "request" as Tab, label: "Request Cash", icon: ArrowDownLeft  },
          ]).map((tab) => (
            <button key={tab.id} onClick={() => { setActiveTab(tab.id); resetAll() }}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold transition-all"
              style={{
                background: activeTab === tab.id ? "#1976d2" : "transparent",
                color:      activeTab === tab.id ? "#ffffff" : "var(--muted-foreground)",
                boxShadow:  activeTab === tab.id ? "0 4px 15px rgba(33,150,243,0.3)" : "none",
              }}>
              <tab.icon className="h-4 w-4" /> {tab.label}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">

          {/* ── LEFT COLUMN ── */}
          <div className="space-y-6">

            {/* Amount Box */}
            <div className="rounded-2xl p-6 space-y-4"
              style={{ background: "rgba(33,150,243,0.04)", border: "1px solid rgba(33,150,243,0.15)" }}>
              <h3 className="font-bold text-base flex items-center gap-2" style={{ color: "var(--foreground)" }}>
                <span className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">1</span>
                Enter Amount
              </h3>

              {/* Amount input */}
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <span className="text-blue-400 font-black text-2xl">₹</span>
                </div>
                <input type="number" placeholder="0" value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full pl-10 pr-4 py-5 rounded-2xl text-3xl font-black outline-none transition-all"
                  style={{
                    background: "rgba(33,150,243,0.08)",
                    border: `2px solid ${amount ? "rgba(33,150,243,0.6)" : "rgba(33,150,243,0.2)"}`,
                    color: "var(--foreground)",
                    boxShadow: amount ? "0 0 0 4px rgba(33,150,243,0.08)" : "none",
                  }} />
                {amount && (
                  <button onClick={() => setAmount("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                    <X className="w-3 h-3 text-gray-400" />
                  </button>
                )}
              </div>

              {/* Quick amounts */}
              <div className="grid grid-cols-4 gap-2">
                {["500", "1000", "2000", "5000"].map((q) => (
                  <button key={q} onClick={() => setAmount(q)}
                    className="py-2.5 rounded-xl text-sm font-bold transition-all"
                    style={{
                      background: amount === q ? "rgba(33,150,243,0.25)" : "rgba(33,150,243,0.06)",
                      border: `1.5px solid ${amount === q ? "rgba(33,150,243,0.6)" : "rgba(33,150,243,0.12)"}`,
                      color: amount === q ? "#60a5fa" : "var(--muted-foreground)",
                      transform: amount === q ? "scale(1.03)" : "scale(1)",
                    }}>
                    ₹{q}
                  </button>
                ))}
              </div>

              {/* Custom amounts */}
              <div className="grid grid-cols-3 gap-2">
                {["10000", "15000", "20000"].map((q) => (
                  <button key={q} onClick={() => setAmount(q)}
                    className="py-2 rounded-xl text-xs font-semibold transition-all"
                    style={{
                      background: amount === q ? "rgba(33,150,243,0.2)" : "rgba(33,150,243,0.04)",
                      border: `1px solid ${amount === q ? "rgba(33,150,243,0.5)" : "rgba(33,150,243,0.1)"}`,
                      color: amount === q ? "#60a5fa" : "var(--muted-foreground)",
                    }}>
                    ₹{Number(q).toLocaleString()}
                  </button>
                ))}
              </div>

              {amount && (
                <div className="flex items-center justify-between text-xs px-1"
                  style={{ color: "var(--muted-foreground)" }}>
                  <span>Platform fee (1%)</span>
                  <span className="text-blue-400 font-semibold">₹{(Number(amount) * 0.01).toFixed(2)}</span>
                </div>
              )}
            </div>

            {/* Progress Steps */}
            <div className="rounded-2xl p-6"
              style={{ background: "rgba(33,150,243,0.04)", border: "1px solid rgba(33,150,243,0.15)" }}>
              <h3 className="font-bold text-base mb-5 flex items-center gap-2" style={{ color: "var(--foreground)" }}>
                <span className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">3</span>
                Transaction Progress
              </h3>

              <div className="space-y-1">
                {steps.map((step, i) => {
                  const status = stepStatuses[i]
                  const style  = getStepStyle(status, i)
                  return (
                    <div key={i} className="flex gap-4">
                      {/* Left — circle + line */}
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-300 ${style.circle}`}>
                          {status === "done"      && <CheckCircle className="w-4 h-4 text-white" />}
                          {status === "cancelled" && <XCircle className="w-4 h-4 text-white" />}
                          {status === "active"    && <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />}
                          {status === "pending"   && <span className="text-xs font-bold text-gray-600">{i+1}</span>}
                        </div>
                        {i < steps.length - 1 && (
                          <div className={`w-0.5 h-8 mt-1 rounded-full transition-all duration-500 ${style.line}`} />
                        )}
                      </div>

                      {/* Right — text */}
                      <div className="pb-6">
                        <p className={`text-sm font-semibold transition-all ${style.text}`}>{step.label}</p>
                        <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>{step.desc}</p>
                        {status === "cancelled" && (
                          <span className="inline-block mt-1 text-xs bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-0.5 rounded-full">
                            Cancelled
                          </span>
                        )}
                        {status === "active" && (
                          <span className="inline-block mt-1 text-xs bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded-full animate-pulse">
                            In Progress...
                          </span>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Action buttons */}
              {!cancelled && !completed && (
                <div className="flex gap-3 mt-2">
                  <button onClick={handleNextStep}
                    disabled={(currentStep === 0 && !amount) || (currentStep === 1 && !selectedUser)}
                    className="flex-1 py-3 rounded-xl font-bold text-sm text-white transition-all"
                    style={{
                      background: ((currentStep === 0 && !amount) || (currentStep === 1 && !selectedUser))
                        ? "rgba(33,150,243,0.2)" : "#1976d2",
                      boxShadow: ((currentStep === 0 && !amount) || (currentStep === 1 && !selectedUser))
                        ? "none" : "0 4px 15px rgba(33,150,243,0.3)",
                      cursor: ((currentStep === 0 && !amount) || (currentStep === 1 && !selectedUser))
                        ? "not-allowed" : "pointer",
                    }}>
                    {currentStep === steps.length - 1 ? "Complete ✓" : "Next Step →"}
                  </button>
                  <button onClick={handleCancel}
                    className="px-4 py-3 rounded-xl font-bold text-sm transition-all"
                    style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#f87171" }}>
                    Cancel
                  </button>
                </div>
              )}

              {/* Completed */}
              {completed && (
                <div className="mt-4 p-4 rounded-xl text-center"
                  style={{ background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.2)" }}>
                  <p className="text-green-400 font-black text-lg">🎉 Exchange Complete!</p>
                  <p className="text-xs mt-1" style={{ color: "var(--muted-foreground)" }}>
                    ₹{amount} exchanged with {selectedUser?.name}
                  </p>
                  <button onClick={resetAll}
                    className="mt-3 px-6 py-2 rounded-xl font-bold text-sm text-white bg-blue-600 hover:bg-blue-500 transition-all">
                    New Transaction
                  </button>
                </div>
              )}

              {/* Cancelled */}
              {cancelled && (
                <div className="mt-4 p-4 rounded-xl text-center"
                  style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}>
                  <p className="text-red-400 font-black text-lg">❌ Transaction Cancelled</p>
                  <button onClick={resetAll}
                    className="mt-3 px-6 py-2 rounded-xl font-bold text-sm text-white bg-blue-600 hover:bg-blue-500 transition-all">
                    Try Again
                  </button>
                </div>
              )}
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Shield, label: "OTP Secured",  val: "100%"    },
                { icon: Zap,    label: "Avg Time",      val: "4 min"   },
                { icon: Star,   label: "Success Rate",  val: "99.2%"   },
              ].map(({ icon: Icon, label, val }) => (
                <div key={label} className="flex flex-col items-center gap-1.5 p-3 rounded-2xl text-center"
                  style={{ background: "rgba(33,150,243,0.04)", border: "1px solid rgba(33,150,243,0.1)" }}>
                  <Icon className="w-5 h-5 text-blue-400" />
                  <p className="text-sm font-black" style={{ color: "var(--foreground)" }}>{val}</p>
                  <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="space-y-6">

            {/* Map */}
            <div className="rounded-2xl overflow-hidden relative"
              style={{ height: 320, background: "linear-gradient(135deg,#050a14 0%,#0a1628 100%)", border: "1px solid rgba(33,150,243,0.2)" }}>

              {/* Grid */}
              <svg className="absolute inset-0 h-full w-full opacity-15">
                <defs>
                  <pattern id="p2p-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#2196f3" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#p2p-grid)" />
              </svg>

              {/* Glow */}
              <div className="absolute inset-0"
                style={{ background: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(33,150,243,0.08) 0%, transparent 70%)" }} />

              {/* Distance rings */}
              <div className="absolute" style={{ left: "50%", top: "50%", transform: "translate(-50%,-50%)" }}>
                {[80,140,200].map((size,i) => (
                  <div key={i} className="absolute rounded-full border border-blue-500/10"
                    style={{ width: size, height: size, top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
                ))}
              </div>

              {/* Line to selected user */}
              {selectedUser && (
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <line
                    x1="50%" y1="50%"
                    x2={`${selectedUser.x}%`} y2={`${selectedUser.y}%`}
                    stroke="#2196f3" strokeWidth="1.5" strokeDasharray="5,4" opacity="0.6" />
                </svg>
              )}

              {/* YOU marker */}
              <div className="absolute" style={{ left: "50%", top: "50%", transform: "translate(-50%,-50%)" }}>
                <div className="relative flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-blue-600 border-2 border-white flex items-center justify-center shadow-lg shadow-blue-500/50 z-10">
                    <Navigation className="w-5 h-5 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-400 border-2 border-black animate-pulse" />
                  <span className="mt-1 text-xs font-bold text-white bg-blue-600 px-2 py-0.5 rounded-full shadow-lg">You</span>
                </div>
              </div>

              {/* User pins */}
              {AVAILABLE_USERS.map((user) => (
                <button key={user.id}
                  onClick={() => { setSelectedUser(user); setShowUserDetail(true) }}
                  className="absolute flex flex-col items-center transition-all hover:scale-110 z-10"
                  style={{ left: `${user.x}%`, top: `${user.y}%`, transform: "translate(-50%,-50%)" }}>
                  <div className={`relative w-10 h-10 rounded-full border-2 flex items-center justify-center shadow-lg transition-all ${
                    selectedUser?.id === user.id
                      ? "bg-blue-500 border-white scale-125 shadow-blue-500/60"
                      : user.available
                        ? "bg-green-500/20 border-green-400/60 hover:border-green-400"
                        : "bg-gray-500/20 border-gray-500/40"}`}>
                    {user.type === "shop"
                      ? <Store className="w-4 h-4 text-white" />
                      : <User  className="w-4 h-4 text-white" />}
                    {user.available && (
                      <div className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border border-black" />
                    )}
                  </div>
                  <span className="mt-0.5 text-[9px] font-semibold text-white/80 whitespace-nowrap bg-black/50 px-1 rounded">
                    {user.name.split(" ")[0]}
                  </span>
                </button>
              ))}

              {/* Legend */}
              <div className="absolute bottom-3 left-3 flex items-center gap-3 text-[10px]"
                style={{ color: "rgba(255,255,255,0.5)" }}>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-400" />Available</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-gray-500" />Busy</span>
              </div>

              <div className="absolute bottom-3 right-3 text-[10px] px-2 py-1 rounded-full"
                style={{ background: "rgba(33,150,243,0.15)", border: "1px solid rgba(33,150,243,0.3)", color: "#60a5fa" }}>
                📍 Within 1.5km
              </div>
            </div>

            {/* User Detail Card */}
            {showUserDetail && selectedUser && (
              <div className="rounded-2xl p-5 space-y-4 animate-in slide-in-from-bottom-2"
                style={{ background: "rgba(33,150,243,0.06)", border: "1px solid rgba(33,150,243,0.3)" }}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
                      {selectedUser.type === "shop"
                        ? <Store className="w-7 h-7 text-blue-400" />
                        : <User  className="w-7 h-7 text-blue-400" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-black text-base" style={{ color: "var(--foreground)" }}>{selectedUser.name}</h3>
                        {selectedUser.verified && <CheckCircle className="w-4 h-4 text-blue-400" />}
                      </div>
                      <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>
                        {selectedUser.type === "shop" ? "🏪 Shop" : "👤 Individual"} · {selectedUser.distance}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        {[1,2,3,4,5].map(i => (
                          <Star key={i} className={`w-3 h-3 ${i <= Math.floor(selectedUser.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-600"}`} />
                        ))}
                        <span className="text-xs text-yellow-400 font-semibold ml-1">{selectedUser.rating}</span>
                        <span className="text-xs ml-1" style={{ color: "var(--muted-foreground)" }}>({selectedUser.swaps} swaps)</span>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => setShowUserDetail(false)}>
                    <X className="w-5 h-5 text-gray-500 hover:text-red-400 transition-colors" />
                  </button>
                </div>

                {/* Details grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl" style={{ background: "rgba(33,150,243,0.06)", border: "1px solid rgba(33,150,243,0.1)" }}>
                    <p className="text-xs mb-1" style={{ color: "var(--muted-foreground)" }}>Amount Range</p>
                    <p className="font-bold text-sm text-blue-400">{selectedUser.amount}</p>
                  </div>
                  <div className="p-3 rounded-xl" style={{ background: "rgba(33,150,243,0.06)", border: "1px solid rgba(33,150,243,0.1)" }}>
                    <p className="text-xs mb-1" style={{ color: "var(--muted-foreground)" }}>Distance</p>
                    <p className="font-bold text-sm" style={{ color: "var(--foreground)" }}>📍 {selectedUser.distance}</p>
                  </div>
                  <div className="p-3 rounded-xl" style={{ background: "rgba(33,150,243,0.06)", border: "1px solid rgba(33,150,243,0.1)" }}>
                    <p className="text-xs mb-1" style={{ color: "var(--muted-foreground)" }}>Status</p>
                    <p className={`font-bold text-sm ${selectedUser.available ? "text-green-400" : "text-red-400"}`}>
                      {selectedUser.available ? "🟢 Available" : "🔴 Busy"}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl" style={{ background: "rgba(33,150,243,0.06)", border: "1px solid rgba(33,150,243,0.1)" }}>
                    <p className="text-xs mb-1" style={{ color: "var(--muted-foreground)" }}>KYC Status</p>
                    <p className={`font-bold text-sm ${selectedUser.verified ? "text-blue-400" : "text-yellow-400"}`}>
                      {selectedUser.verified ? "✅ Verified" : "⚠️ Unverified"}
                    </p>
                  </div>
                </div>

                {/* Phone & Call */}
                <div className="flex items-center justify-between p-3 rounded-xl"
                  style={{ background: "rgba(33,150,243,0.08)", border: "1px solid rgba(33,150,243,0.2)" }}>
                  <div>
                    <p className="text-xs mb-0.5" style={{ color: "var(--muted-foreground)" }}>Phone Number</p>
                    <p className="font-bold text-sm" style={{ color: "var(--foreground)" }}>+91 {selectedUser.phone}</p>
                  </div>
                  <a href={`tel:+91${selectedUser.phone}`}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm text-white bg-green-600 hover:bg-green-500 transition-all shadow-lg shadow-green-500/20">
                    <Phone className="w-4 h-4" /> Call
                  </a>
                </div>

                {/* Select button */}
                <button
                  onClick={() => {
                    setShowUserDetail(false)
                    if (currentStep === 1) handleNextStep()
                  }}
                  disabled={!selectedUser.available}
                  className="w-full py-3.5 rounded-xl font-black text-sm text-white transition-all"
                  style={{
                    background: selectedUser.available ? "#1976d2" : "rgba(33,150,243,0.15)",
                    boxShadow: selectedUser.available ? "0 4px 20px rgba(33,150,243,0.3)" : "none",
                    cursor: selectedUser.available ? "pointer" : "not-allowed",
                  }}>
                  {selectedUser.available ? `Select ${selectedUser.name} →` : "Currently Unavailable"}
                </button>
              </div>
            )}

            {/* Available Users List */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base flex items-center gap-2" style={{ color: "var(--foreground)" }}>
                  <span className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">2</span>
                  Current Available Users
                  <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                    {AVAILABLE_USERS.filter(u => u.available).length} online
                  </span>
                </h3>
              </div>

              {AVAILABLE_USERS.map((user) => (
                <button key={user.id}
                  onClick={() => { setSelectedUser(user); setShowUserDetail(true) }}
                  className="w-full flex items-center justify-between p-4 rounded-2xl transition-all text-left group"
                  style={{
                    background: selectedUser?.id === user.id ? "rgba(33,150,243,0.12)" : "rgba(33,150,243,0.03)",
                    border: `1.5px solid ${selectedUser?.id === user.id ? "rgba(33,150,243,0.5)" : "rgba(33,150,243,0.1)"}`,
                    opacity: user.available ? 1 : 0.5,
                  }}>
                  <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className="relative w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
                      style={{ background: user.available ? "rgba(33,150,243,0.15)" : "rgba(100,100,100,0.1)", border: "1px solid rgba(33,150,243,0.2)" }}>
                      {user.type === "shop"
                        ? <Store className="w-5 h-5 text-blue-400" />
                        : <User  className="w-5 h-5 text-blue-400" />}
                      <div className={`absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-black ${user.available ? "bg-green-400" : "bg-gray-500"}`} />
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-bold" style={{ color: "var(--foreground)" }}>{user.name}</span>
                        {user.verified && <CheckCircle className="w-3.5 h-3.5 text-blue-400" />}
                        <span className="text-xs px-1.5 py-0.5 rounded-full"
                          style={{ background: user.type === "shop" ? "rgba(251,191,36,0.1)" : "rgba(96,165,250,0.1)",
                                   color: user.type === "shop" ? "#fbbf24" : "#60a5fa",
                                   border: `1px solid ${user.type === "shop" ? "rgba(251,191,36,0.2)" : "rgba(96,165,250,0.2)"}` }}>
                          {user.type === "shop" ? "Shop" : "Person"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-yellow-400">⭐ {user.rating}</span>
                        <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>·</span>
                        <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>{user.swaps} swaps</span>
                        <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>·</span>
                        <span className="text-xs text-blue-400">📍 {user.distance}</span>
                      </div>
                      <p className="text-xs mt-0.5 text-green-400 font-medium">{user.amount}</p>
                    </div>
                  </div>

                  <ChevronRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1"
                    style={{ color: selectedUser?.id === user.id ? "#60a5fa" : "var(--muted-foreground)" }} />
                </button>
              ))}
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
