"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import {
  ArrowLeftRight, TrendingUp, Shield, Clock, Star,
  Plus, ArrowDownLeft, ArrowUpRight, CheckCircle,
  XCircle, Timer, Wallet, Bell, ChevronRight, User
} from "lucide-react"

const stats = [
  { label: "Total Swaps", value: "24", icon: ArrowLeftRight, color: "#D4AF37", bg: "rgba(212,175,55,0.1)" },
  { label: "Amount Exchanged", value: "₹48,200", icon: TrendingUp, color: "#4ade80", bg: "rgba(74,222,128,0.1)" },
  { label: "Avg Match Time", value: "4.2 min", icon: Clock, color: "#60a5fa", bg: "rgba(96,165,250,0.1)" },
  { label: "Trust Rating", value: "4.9 ★", icon: Star, color: "#f472b6", bg: "rgba(244,114,182,0.1)" },
]

const transactions = [
  { id: 1, type: "received", name: "Rahul Sharma", amount: "₹2,000", time: "2 min ago", status: "completed", method: "Cash → UPI" },
  { id: 2, type: "sent", name: "Priya Patel", amount: "₹5,500", time: "1 hr ago", status: "completed", method: "UPI → Cash" },
  { id: 3, type: "received", name: "Amit Kumar", amount: "₹1,200", time: "3 hrs ago", status: "pending", method: "Cash → UPI" },
  { id: 4, type: "sent", name: "Sneha Gupta", amount: "₹3,800", time: "Yesterday", status: "completed", method: "UPI → Cash" },
  { id: 5, type: "received", name: "Vikram Singh", amount: "₹900", time: "Yesterday", status: "failed", method: "Cash → UPI" },
]

const activeRequests = [
  { id: 1, type: "need-cash", amount: "₹3,000", location: "0.4 km away", name: "Neha R.", time: "5 min ago", rating: 4.8 },
  { id: 2, type: "have-cash", amount: "₹1,500", location: "0.8 km away", name: "Suresh K.", time: "12 min ago", rating: 4.6 },
  { id: 3, type: "need-cash", amount: "₹7,000", location: "0.6 km away", name: "Meena T.", time: "3 min ago", rating: 4.9 },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "transactions" | "requests">("overview")

  return (
    <div className="min-h-screen bg-[#080c14]">
      <Navbar />

      <main className="container mx-auto px-4 py-8 max-w-5xl">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center shadow-lg shadow-yellow-400/20">
              <User className="w-6 h-6 text-black" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Welcome back 👋</p>
              <h1 className="text-white font-bold text-xl">My Dashboard</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all">
              <Bell className="w-4 h-4 text-gray-400" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-yellow-400 rounded-full" />
            </button>
            <button className="flex items-center gap-2 bg-yellow-400 text-black px-4 py-2 rounded-xl font-bold text-sm hover:bg-yellow-300 transition-all shadow-lg shadow-yellow-400/20">
              <Plus className="w-4 h-4" />
              New Swap
            </button>
          </div>
        </div>

        {/* Wallet Card */}
        <div className="relative rounded-2xl overflow-hidden mb-8 p-6"
          style={{ background: "linear-gradient(135deg, #1a1200 0%, #2a1f00 50%, #1a1200 100%)", border: "1px solid rgba(212,175,55,0.2)" }}>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_30%_50%,rgba(212,175,55,0.15)_0%,transparent_70%)]" />
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-yellow-400/60 text-sm font-medium mb-1">Total Exchanged This Month</p>
              <h2 className="text-white text-4xl font-black">₹48,200</h2>
              <p className="text-green-400 text-sm mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +12.4% from last month
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="w-14 h-14 rounded-2xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center">
                <Wallet className="w-7 h-7 text-yellow-400" />
              </div>
              <div className="flex items-center gap-1">
                <Shield className="w-3 h-3 text-green-400" />
                <span className="text-green-400 text-xs">KYC Verified</span>
              </div>
            </div>
          </div>

          {/* Quick actions */}
          <div className="relative z-10 grid grid-cols-2 gap-3 mt-6">
            <button className="flex items-center justify-center gap-2 py-3 rounded-xl bg-yellow-400 text-black font-bold text-sm hover:bg-yellow-300 transition-all">
              <ArrowDownLeft className="w-4 h-4" /> Request Cash
            </button>
            <button className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-sm hover:bg-white/10 transition-all">
              <ArrowUpRight className="w-4 h-4" /> Provide Cash
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="rounded-2xl p-4 border border-white/5"
              style={{ background: "rgba(255,255,255,0.03)" }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                style={{ background: stat.bg }}>
                <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
              </div>
              <p className="text-white font-bold text-xl">{stat.value}</p>
              <p className="text-gray-500 text-xs mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white/5 rounded-xl p-1 mb-6">
          {(["overview", "transactions", "requests"] as const).map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold capitalize transition-all ${
                activeTab === tab ? "bg-yellow-400 text-black" : "text-gray-400 hover:text-white"}`}>
              {tab === "overview" ? "📊 Overview" : tab === "transactions" ? "💸 Transactions" : "🔄 Requests"}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg">Recent Activity</h3>
            {transactions.slice(0, 3).map((tx) => (
              <div key={tx.id} className="flex items-center justify-between p-4 rounded-2xl border border-white/5 bg-white/3 hover:bg-white/5 transition-all">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === "received" ? "bg-green-400/10" : "bg-blue-400/10"}`}>
                    {tx.type === "received"
                      ? <ArrowDownLeft className="w-5 h-5 text-green-400" />
                      : <ArrowUpRight className="w-5 h-5 text-blue-400" />}
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">{tx.name}</p>
                    <p className="text-gray-500 text-xs">{tx.method} · {tx.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <p className={`font-bold text-sm ${tx.type === "received" ? "text-green-400" : "text-white"}`}>
                    {tx.type === "received" ? "+" : "-"}{tx.amount}
                  </p>
                  {tx.status === "completed" && <CheckCircle className="w-4 h-4 text-green-400" />}
                  {tx.status === "pending" && <Timer className="w-4 h-4 text-yellow-400" />}
                  {tx.status === "failed" && <XCircle className="w-4 h-4 text-red-400" />}
                </div>
              </div>
            ))}
            <button onClick={() => setActiveTab("transactions")}
              className="w-full py-3 rounded-xl border border-white/10 text-gray-400 text-sm hover:border-yellow-400/30 hover:text-yellow-400 transition-all flex items-center justify-center gap-2">
              View All Transactions <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Transactions Tab */}
        {activeTab === "transactions" && (
          <div className="space-y-3">
            <h3 className="text-white font-bold text-lg">All Transactions</h3>
            {transactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between p-4 rounded-2xl border border-white/5 bg-white/3 hover:bg-white/5 transition-all">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === "received" ? "bg-green-400/10" : "bg-blue-400/10"}`}>
                    {tx.type === "received"
                      ? <ArrowDownLeft className="w-5 h-5 text-green-400" />
                      : <ArrowUpRight className="w-5 h-5 text-blue-400" />}
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">{tx.name}</p>
                    <p className="text-gray-500 text-xs">{tx.method} · {tx.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <p className={`font-bold text-sm ${tx.type === "received" ? "text-green-400" : "text-white"}`}>
                    {tx.type === "received" ? "+" : "-"}{tx.amount}
                  </p>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    tx.status === "completed" ? "bg-green-400/10 text-green-400" :
                    tx.status === "pending" ? "bg-yellow-400/10 text-yellow-400" :
                    "bg-red-400/10 text-red-400"}`}>
                    {tx.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Requests Tab */}
        {activeTab === "requests" && (
          <div className="space-y-3">
            <h3 className="text-white font-bold text-lg">Nearby Swap Requests</h3>
            {activeRequests.map((req) => (
              <div key={req.id} className="p-4 rounded-2xl border border-white/5 bg-white/3 hover:bg-white/5 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${req.type === "need-cash" ? "bg-yellow-400/10" : "bg-green-400/10"}`}>
                      {req.type === "need-cash"
                        ? <ArrowDownLeft className="w-5 h-5 text-yellow-400" />
                        : <ArrowUpRight className="w-5 h-5 text-green-400" />}
                    </div>
                    <div>
                      <p className="text-white text-sm font-semibold">{req.name}</p>
                      <p className="text-gray-500 text-xs">⭐ {req.rating} · {req.location} · {req.time}</p>
                    </div>
                  </div>
                  <p className="text-yellow-400 font-black text-lg">{req.amount}</p>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 py-2 bg-yellow-400 text-black rounded-xl text-sm font-bold hover:bg-yellow-300 transition-all">
                    Accept Swap
                  </button>
                  <button className="px-4 py-2 border border-white/10 text-gray-400 rounded-xl text-sm hover:border-red-400/30 hover:text-red-400 transition-all">
                    Skip
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </main>
      <Footer />
    </div>
  )
}