"use client"

import { ArrowDown } from "lucide-react"

const steps = [
  { code: "POST /requests", label: "User posts request" },
  { code: "Matching Engine", label: "System finds nearby providers" },
  { code: "FCM Notification", label: "Providers notified instantly" },
  { code: "POST /offers", label: "Providers submit offers" },
  { code: "Accept Offer", label: "User selects best match" },
  { code: "OTP Generated", label: "Secure code created" },
  { code: "Physical Meet", label: "Users meet nearby" },
  { code: "Dual OTP Confirm", label: "Both parties verify" },
  { code: "Complete + Ratings", label: "Transaction finalized" },
]

export function TransactionFlow() {
  return (
    <section className="py-20 lg:py-28 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
            Transaction Flow
          </h2>
          <p className="text-lg text-muted-foreground">
            Complete P2P exchange process
          </p>
        </div>

        <div className="mx-auto max-w-md">
          {steps.map((step, i) => (
            <div key={i} className="relative">
              <div className="flex items-center gap-4">
                {/* Step number */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {i + 1}
                </div>

                {/* Step content */}
                <div className="flex-1 rounded-lg border border-border bg-card p-4">
                  <code className="block text-sm font-mono text-primary">{step.code}</code>
                  <p className="mt-1 text-sm text-muted-foreground">{step.label}</p>
                </div>
              </div>

              {/* Connector */}
              {i < steps.length - 1 && (
                <div className="ml-5 flex h-8 items-center justify-center">
                  <div className="h-full w-px bg-border" />
                  <ArrowDown className="absolute h-4 w-4 text-muted-foreground" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
