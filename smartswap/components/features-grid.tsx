"use client"

import { MapPin, Shield, Smartphone, Navigation, Store, FileText } from "lucide-react"

const features = [
  {
    icon: MapPin,
    title: "Smart Radius Matching",
    description: "₹0–1k = 1km, ₹1–5k = 3km, ₹5k+ = 5–10km range",
    span: "md:col-span-1",
  },
  {
    icon: Shield,
    title: "Trust Score System",
    description: "KYC + ratings + history = 0–100 score",
    span: "md:col-span-1",
  },
  {
    icon: Smartphone,
    title: "OTP Transaction Confirmation",
    description: "Tamper-proof, offline-capable verification",
    span: "md:col-span-1",
  },
  {
    icon: Navigation,
    title: "Live Location Tracking",
    description: "During meetups only, privacy-first approach",
    span: "md:col-span-1",
  },
  {
    icon: Store,
    title: "Verified Shop Network",
    description: "Priority listings, fixed service charges",
    span: "md:col-span-1",
  },
  {
    icon: FileText,
    title: "Immutable Audit Log",
    description: "SHA-256 hash chain, admin-accessible records",
    span: "md:col-span-1",
  },
]

export function FeaturesGrid() {
  return (
    <section id="features" className="py-20 lg:py-28 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
            Powerful Features
          </h2>
          <p className="text-lg text-muted-foreground">
            Built for security, speed, and trust
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <div
              key={i}
              className={`group relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 ${feature.span}`}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
              
              {/* Hover gradient */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
