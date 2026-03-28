"use client"

import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { CtaLeadDialog } from "./cta-lead-dialog"

const plans = [
  {
    name: "Basic",
    price: "Free",
    period: "",
    description: "For occasional users",
    features: [
      "Up to ₹1,000/day",
      "1km radius",
      "Standard matching",
      "OTP verification",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Verified",
    price: "₹99",
    period: "/mo",
    description: "For regular users",
    features: [
      "Up to ₹10,000/day",
      "3km radius",
      "Priority matching",
      "KYC badge",
      "Lower platform fee",
    ],
    cta: "Upgrade Now",
    highlighted: true,
  },
  {
    name: "Shop Partner",
    price: "₹499",
    period: "/mo",
    description: "For businesses",
    features: [
      "Unlimited daily limit",
      "10km radius",
      "Top listing placement",
      "Analytics dashboard",
      "Custom service fees",
      "Priority support",
    ],
    cta: "Become Partner",
    highlighted: false,
  },
]

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 lg:py-28 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
            Simple Pricing
          </h2>
          <p className="text-lg text-muted-foreground">
            Choose the plan that fits your needs
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`relative rounded-xl border p-6 transition-all ${
                plan.highlighted
                  ? "border-primary bg-card shadow-lg shadow-primary/10 scale-105"
                  : "border-border bg-card hover:border-primary/50"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="mb-2 text-xl font-semibold text-foreground">{plan.name}</h3>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                <span className="text-muted-foreground">{plan.period}</span>
              </div>

              <ul className="mb-8 space-y-3">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-accent" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <CtaLeadDialog
                title={plan.cta}
                description={`Placeholder signup flow for the ${plan.name} plan.`}
                trigger={
                  <Button
                    className={`w-full ${
                      plan.highlighted
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {plan.cta}
                  </Button>
                }
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
