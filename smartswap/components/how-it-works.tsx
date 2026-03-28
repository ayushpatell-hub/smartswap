"use client"

import { FileText, Users, CheckCircle, ArrowRight } from "lucide-react"

const steps = [
  {
    icon: FileText,
    title: "Post Request",
    description: "Enter amount + cash or online",
  },
  {
    icon: Users,
    title: "Get Matched",
    description: "Nearby providers notified instantly",
  },
  {
    icon: CheckCircle,
    title: "Confirm & Swap",
    description: "Meet, exchange, confirm via OTP",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground">
            Three simple steps to exchange money
          </p>
        </div>

        <div className="relative mx-auto max-w-4xl">
          {/* Connection line */}
          <div className="absolute left-0 right-0 top-1/2 hidden h-0.5 -translate-y-1/2 bg-border md:block" />

          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step, i) => (
              <div key={i} className="relative flex flex-col items-center text-center">
                {/* Step number and icon */}
                <div className="relative mb-6">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-card border border-border">
                    <step.icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {i + 1}
                  </div>
                </div>

                {/* Arrow between steps */}
                {i < steps.length - 1 && (
                  <div className="absolute right-0 top-10 hidden translate-x-1/2 md:block">
                    <ArrowRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                )}

                <h3 className="mb-2 text-xl font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
