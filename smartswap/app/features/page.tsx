import { Navbar } from "@/components/navbar"
import { FeaturesGrid } from "@/components/features-grid"
import { TrustSafety } from "@/components/trust-safety"
import { RadiusVisualizer } from "@/components/radius-visualizer"
import { Footer } from "@/components/footer"

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <FeaturesGrid />
        <RadiusVisualizer />
        <TrustSafety />
      </main>
      <Footer />
    </div>
  )
}
