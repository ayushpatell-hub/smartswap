import { Navbar } from "@/components/navbar"
import { DashboardPreview } from "@/components/dashboard-preview"
import { Footer } from "@/components/footer"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <DashboardPreview />
      </main>
      <Footer />
    </div>
  )
}
