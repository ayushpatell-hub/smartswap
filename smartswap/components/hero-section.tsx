"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, BadgeCheck, Percent } from "lucide-react"
import { AnimatedMap } from "./animated-map"
import { CtaLeadDialog } from "./cta-lead-dialog"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
      
      <div className="container relative mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Content */}
          <div className="flex flex-col gap-6">
            <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Exchange Cash & Digital Money — Instantly, Nearby.
            </h1>
            <p className="text-pretty text-lg text-muted-foreground lg:text-xl">
              Post a request, get matched with verified users within 1km, confirm with OTP. No banks, no waiting.
            </p>
            
            {/* CTAs */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <CtaLeadDialog
                title="Request Money"
                description="Post a request. We will contact you to start matching."
                trigger={
                  <Button
                    size="lg"
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Request Money
                  </Button>
                }
              />
              <CtaLeadDialog
                title="Become a Provider"
                description="Provide cash or services. We will contact you to onboard."
                trigger={
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-border text-foreground hover:bg-secondary"
                  >
                    Become a Provider
                  </Button>
                }
              />
            </div>

            {/* Trust Badges */}
            <div className="mt-4 flex flex-wrap gap-3">
              <Badge variant="secondary" className="gap-2 bg-secondary px-4 py-2 text-secondary-foreground">
                <Shield className="h-4 w-4 text-accent" />
                OTP Secured
              </Badge>
              <Badge variant="secondary" className="gap-2 bg-secondary px-4 py-2 text-secondary-foreground">
                <BadgeCheck className="h-4 w-4 text-accent" />
                KYC Verified Users
              </Badge>
              <Badge variant="secondary" className="gap-2 bg-secondary px-4 py-2 text-secondary-foreground">
                <Percent className="h-4 w-4 text-accent" />
                1% Platform Fee
              </Badge>
            </div>
          </div>

          {/* Animated Map */}
          <div className="relative">
            <AnimatedMap />
          </div>
        </div>
      </div>
    </section>
  )
}
