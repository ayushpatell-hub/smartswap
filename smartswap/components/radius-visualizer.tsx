"use client"

import { useState, useMemo } from "react"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function RadiusVisualizer() {
  const [amount, setAmount] = useState([5000])

  const { radius, providerCount, radiusLabel } = useMemo(() => {
    const amt = amount[0]
    if (amt <= 1000) {
      return { radius: 15, providerCount: 3, radiusLabel: "1km" }
    } else if (amt <= 5000) {
      return { radius: 25, providerCount: 8, radiusLabel: "3km" }
    } else if (amt <= 20000) {
      return { radius: 35, providerCount: 15, radiusLabel: "5km" }
    } else {
      return { radius: 45, providerCount: 24, radiusLabel: "10km" }
    }
  }, [amount])

  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
            Smart Radius Logic
          </h2>
          <p className="text-lg text-muted-foreground">
            Higher amounts unlock wider matching ranges
          </p>
        </div>

        <Card className="mx-auto max-w-2xl border-border bg-card">
          <CardHeader>
            <CardTitle className="text-center text-foreground">
              Amount: ₹{amount[0].toLocaleString("en-IN")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Visual radius */}
            <div className="relative mx-auto aspect-square max-w-xs">
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Outer rings */}
                <div
                  className="absolute rounded-full border-2 border-dashed border-primary/20 transition-all duration-500"
                  style={{ width: "90%", height: "90%" }}
                />
                <div
                  className="absolute rounded-full border-2 border-dashed border-primary/30 transition-all duration-500"
                  style={{ width: "70%", height: "70%" }}
                />
                <div
                  className="absolute rounded-full border-2 border-dashed border-primary/40 transition-all duration-500"
                  style={{ width: "50%", height: "50%" }}
                />
                <div
                  className="absolute rounded-full border-2 border-dashed border-primary/50 transition-all duration-500"
                  style={{ width: "30%", height: "30%" }}
                />

                {/* Active radius circle */}
                <div
                  className="absolute rounded-full bg-primary/20 transition-all duration-500"
                  style={{
                    width: `${radius * 2}%`,
                    height: `${radius * 2}%`,
                  }}
                />

                {/* Center point */}
                <div className="absolute flex h-4 w-4 items-center justify-center rounded-full bg-primary">
                  <div className="h-2 w-2 rounded-full bg-primary-foreground" />
                </div>

                {/* Provider dots */}
                {Array.from({ length: Math.min(providerCount, 12) }).map((_, i) => {
                  const angle = (i / 12) * 2 * Math.PI
                  const distance = (radius - 5) * 0.8
                  const x = 50 + distance * Math.cos(angle)
                  const y = 50 + distance * Math.sin(angle)
                  return (
                    <div
                      key={i}
                      className="absolute h-2 w-2 rounded-full bg-accent transition-all duration-500"
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        transform: "translate(-50%, -50%)",
                        opacity: i < providerCount ? 1 : 0,
                      }}
                    />
                  )
                })}

                {/* Labels */}
                <span className="absolute top-2 text-xs text-muted-foreground">10km</span>
                <span className="absolute right-2 text-xs text-muted-foreground">5km</span>
                <span className="absolute bottom-2 text-xs text-muted-foreground">3km</span>
                <span className="absolute left-2 text-xs text-muted-foreground">1km</span>
              </div>
            </div>

            {/* Slider */}
            <div className="space-y-4">
              <Slider
                value={amount}
                onValueChange={setAmount}
                min={500}
                max={50000}
                step={500}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>₹500</span>
                <span>₹50,000</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 rounded-lg bg-secondary p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{radiusLabel}</p>
                <p className="text-sm text-muted-foreground">Search Radius</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-accent">~{providerCount}</p>
                <p className="text-sm text-muted-foreground">Providers</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
