"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, BadgeCheck, MapPin } from "lucide-react"

const shops = [
  {
    name: "Sharma Mobile Shop",
    avatar: "SM",
    rating: 4.9,
    serviceCharge: 0.5,
    distance: "0.3km",
  },
  {
    name: "Patel General Store",
    avatar: "PG",
    rating: 4.8,
    serviceCharge: 0.8,
    distance: "0.5km",
  },
  {
    name: "Singh Electronics",
    avatar: "SE",
    rating: 4.7,
    serviceCharge: 0.6,
    distance: "0.7km",
  },
  {
    name: "Kumar Stationers",
    avatar: "KS",
    rating: 4.9,
    serviceCharge: 0.5,
    distance: "1.0km",
  },
  {
    name: "Gupta Pharmacy",
    avatar: "GP",
    rating: 4.6,
    serviceCharge: 0.7,
    distance: "1.2km",
  },
]

export function ShopSection() {
  return (
    <section id="shops" className="py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="mb-12 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div>
            <h2 className="mb-2 text-3xl font-bold text-foreground sm:text-4xl">
              Verified Shop Network
            </h2>
            <p className="text-lg text-muted-foreground">
              Trusted local businesses ready to serve you
            </p>
          </div>
          <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            Register Your Shop
          </Button>
        </div>

        {/* Horizontal scroll on mobile */}
        <div className="relative -mx-4 px-4">
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
            {shops.map((shop, i) => (
              <div
                key={i}
                className="min-w-[280px] snap-start rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/50"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">
                      {shop.avatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground">{shop.name}</h3>
                      </div>
                      <Badge variant="secondary" className="mt-1 gap-1 bg-accent/10 text-accent text-xs">
                        <BadgeCheck className="h-3 w-3" />
                        Verified
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Star className="h-4 w-4 fill-chart-3 text-chart-3" />
                    <span className="font-medium text-foreground">{shop.rating}</span>
                  </div>
                  <div className="text-muted-foreground">
                    {shop.serviceCharge}% fee
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {shop.distance}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
