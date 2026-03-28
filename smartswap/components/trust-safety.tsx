"use client"

import { Check, Eye, Smartphone, Database, AlertTriangle } from "lucide-react"

const trustFactors = [
  { label: "KYC Verification", value: 30, color: "bg-primary" },
  { label: "User Rating", value: 30, color: "bg-accent" },
  { label: "Transaction Volume", value: 20, color: "bg-chart-3" },
  { label: "Account Age", value: 10, color: "bg-chart-4" },
  { label: "Dispute Record", value: 10, color: "bg-chart-5" },
]

const safetyFeatures = [
  { icon: Eye, text: "Location blur until matched" },
  { icon: Smartphone, text: "OTP cleared after use" },
  { icon: Database, text: "Aadhaar hash-only storage" },
  { icon: AlertTriangle, text: "Report + emergency cancel" },
]

export function TrustSafety() {
  return (
    <section className="py-20 lg:py-28 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
            Trust & Safety
          </h2>
          <p className="text-lg text-muted-foreground">
            Multi-layered verification for secure exchanges
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">
          {/* Trust Score Breakdown */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="mb-6 text-xl font-semibold text-foreground">
              Trust Score Breakdown
            </h3>

            {/* Circular progress visualization */}
            <div className="relative mx-auto mb-8 h-48 w-48">
              <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="12"
                  className="text-secondary"
                />
                {/* Progress segments */}
                {trustFactors.reduce(
                  (acc, factor, i) => {
                    const circumference = 2 * Math.PI * 40
                    const offset = (acc.offset / 100) * circumference
                    const length = (factor.value / 100) * circumference
                    acc.elements.push(
                      <circle
                        key={i}
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        strokeWidth="12"
                        className={factor.color.replace("bg-", "stroke-")}
                        strokeDasharray={`${length} ${circumference - length}`}
                        strokeDashoffset={-offset}
                        style={{ transition: "stroke-dasharray 0.5s ease" }}
                      />
                    )
                    acc.offset += factor.value
                    return acc
                  },
                  { elements: [] as React.ReactNode[], offset: 0 }
                ).elements}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-foreground">100</span>
                <span className="text-sm text-muted-foreground">Max Score</span>
              </div>
            </div>

            {/* Legend */}
            <div className="space-y-3">
              {trustFactors.map((factor, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`h-3 w-3 rounded-full ${factor.color}`} />
                    <span className="text-sm text-muted-foreground">{factor.label}</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">{factor.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Safety Features */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="mb-6 text-xl font-semibold text-foreground">
              Safety Features
            </h3>

            <div className="space-y-4">
              {safetyFeatures.map((feature, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 rounded-lg bg-secondary p-4"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-accent" />
                    <span className="text-foreground">{feature.text}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional info */}
            <div className="mt-6 rounded-lg bg-accent/10 p-4">
              <p className="text-sm text-muted-foreground">
                All transactions are protected by end-to-end encryption and our 24/7 fraud monitoring system.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
