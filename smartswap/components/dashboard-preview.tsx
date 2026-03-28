"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Home,
  ArrowDownCircle,
  ArrowUpCircle,
  History,
  Store,
  Wallet,
  User,
  FileText,
  MapPin,
  Check,
  X,
} from "lucide-react"
import { CtaLeadDialog } from "./cta-lead-dialog"

const sidebarItems = [
  { icon: Home, label: "Home", active: true },
  { icon: ArrowDownCircle, label: "Request Money" },
  { icon: ArrowUpCircle, label: "Provide Money" },
  { icon: History, label: "Transactions" },
  { icon: Store, label: "Shops" },
  { icon: Wallet, label: "Wallet" },
  { icon: User, label: "Profile" },
  { icon: FileText, label: "Reports" },
]

const stats = [
  { label: "Active Requests", value: "3" },
  { label: "Completed Today", value: "12" },
  { label: "Trust Score", value: "87" },
  { label: "Daily Remaining", value: "₹8,000" },
]

const transactions = [
  { amount: "₹2,500", type: "CASH", status: "completed", party: "Rahul S.", time: "2m ago" },
  { amount: "₹1,000", type: "ONLINE", status: "pending", party: "Priya M.", time: "15m ago" },
  { amount: "₹5,000", type: "CASH", status: "completed", party: "Shop: Kumar", time: "1h ago" },
]

const offers = [
  { amount: "₹3,000", type: "CASH", provider: "Amit K.", score: 92 },
  { amount: "₹1,500", type: "ONLINE", provider: "Shop: Sharma", score: 95 },
]

export function DashboardPreview() {
  return (
    <section id="dashboard" className="py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
            Powerful Dashboard
          </h2>
          <p className="text-lg text-muted-foreground">
            Manage all your exchanges in one place
          </p>
        </div>

        {/* Browser frame */}
        <div className="mx-auto max-w-5xl overflow-hidden rounded-xl border border-border bg-card shadow-2xl">
          {/* Browser top bar */}
          <div className="flex items-center gap-2 border-b border-border bg-secondary px-4 py-3">
            <div className="flex gap-2">
              <div className="h-3 w-3 rounded-full bg-destructive/50" />
              <div className="h-3 w-3 rounded-full bg-chart-3/50" />
              <div className="h-3 w-3 rounded-full bg-accent/50" />
            </div>
            <div className="flex-1 text-center">
              <span className="rounded-md bg-background px-4 py-1 text-xs text-muted-foreground">
                app.smartswap.in/dashboard
              </span>
            </div>
          </div>

          {/* Dashboard content */}
          <div className="flex min-h-125">
            {/* Sidebar */}
            <div className="hidden w-56 border-r border-border bg-sidebar p-4 md:block">
              <div className="mb-6 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <span className="text-xs font-bold text-primary-foreground">SS</span>
                </div>
                <span className="font-semibold text-sidebar-foreground">SmartSwap</span>
              </div>

              <nav className="space-y-1">
                {sidebarItems.map((item, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm ${
                      item.active
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50"
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </div>
                ))}
              </nav>
            </div>

            {/* Main content */}
            <div className="flex-1 p-4 lg:p-6">
              {/* Stats row */}
              <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
                {stats.map((stat, i) => (
                  <div key={i} className="rounded-lg border border-border bg-background p-3">
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                    <p className="text-xl font-bold text-foreground">{stat.value}</p>
                  </div>
                ))}
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                {/* Map panel */}
                <div className="rounded-lg border border-border bg-background p-4">
                  <h4 className="mb-3 text-sm font-medium text-foreground">Nearby Requests</h4>
                  <div className="relative h-40 rounded-lg bg-secondary">
                    {/* Mini map with pins */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative h-full w-full">
                        {[
                          { x: 30, y: 40 },
                          { x: 60, y: 30 },
                          { x: 45, y: 60 },
                          { x: 70, y: 55 },
                        ].map((pos, i) => (
                          <div
                            key={i}
                            className="absolute"
                            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                          >
                            <MapPin className="h-4 w-4 text-primary" />
                          </div>
                        ))}
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                          <div className="h-3 w-3 rounded-full bg-accent" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent transactions */}
                <div className="rounded-lg border border-border bg-background p-4">
                  <h4 className="mb-3 text-sm font-medium text-foreground">Recent Transactions</h4>
                  <div className="space-y-2">
                    {transactions.map((tx, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between rounded-lg bg-secondary p-2 text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-foreground">{tx.amount}</span>
                          <Badge
                            variant="secondary"
                            className={`text-[10px] ${
                              tx.type === "CASH"
                                ? "bg-accent/20 text-accent"
                                : "bg-primary/20 text-primary"
                            }`}
                          >
                            {tx.type}
                          </Badge>
                        </div>
                        <span className="text-muted-foreground">{tx.party}</span>
                        <Badge
                          variant="secondary"
                          className={`text-[10px] ${
                            tx.status === "completed"
                              ? "bg-accent/20 text-accent"
                              : "bg-chart-3/20 text-chart-3"
                          }`}
                        >
                          {tx.status}
                        </Badge>
                        <span className="text-muted-foreground">{tx.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pending offers */}
                <div className="rounded-lg border border-border bg-background p-4 lg:col-span-2">
                  <h4 className="mb-3 text-sm font-medium text-foreground">Pending Offers</h4>
                  <div className="space-y-2">
                    {offers.map((offer, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between rounded-lg bg-secondary p-3"
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-medium text-foreground">{offer.amount}</span>
                          <Badge
                            variant="secondary"
                            className={`text-xs ${
                              offer.type === "CASH"
                                ? "bg-accent/20 text-accent"
                                : "bg-primary/20 text-primary"
                            }`}
                          >
                            {offer.type}
                          </Badge>
                          <span className="text-sm text-muted-foreground">{offer.provider}</span>
                          <span className="text-xs text-muted-foreground">
                            Score: {offer.score}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <CtaLeadDialog
                            title="Accept Request"
                            description="Placeholder action confirmation."
                            trigger={
                              <Button
                                size="sm"
                                className="h-7 bg-accent text-accent-foreground hover:bg-accent/90"
                              >
                                <Check className="mr-1 h-3 w-3" /> Accept
                              </Button>
                            }
                          />
                          <CtaLeadDialog
                            title="Reject Request"
                            description="Placeholder action confirmation."
                            trigger={
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-7 border-border"
                              >
                                <X className="mr-1 h-3 w-3" /> Reject
                              </Button>
                            }
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
