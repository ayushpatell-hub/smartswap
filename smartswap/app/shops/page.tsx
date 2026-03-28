import { Navbar } from "@/components/navbar"
import { ShopSection } from "@/components/shop-section"
import { Footer } from "@/components/footer"

export default function ShopsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <ShopSection />
      </main>
      <Footer />
    </div>
  )
}
