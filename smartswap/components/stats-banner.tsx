"use client"

const stats = [
  { value: "10,000+", label: "Swaps Completed" },
  { value: "₹2.4Cr", label: "Exchanged" },
  { value: "4.8★", label: "Avg Rating" },
  { value: "<5min", label: "Match Time" },
]

export function StatsBanner() {
  return (
    <section className="py-12" style={{ background: "linear-gradient(135deg, #1565c0 0%, #1976d2 50%, #0d47a1 100%)" }}>
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-3xl font-bold text-white lg:text-4xl">{stat.value}</p>
              <p className="mt-1 text-sm text-blue-100">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}