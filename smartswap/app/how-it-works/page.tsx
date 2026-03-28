import { Navbar } from "@/components/navbar"
import { HowItWorks } from "@/components/how-it-works"
import { TransactionFlow } from "@/components/transaction-flow"
import { Footer } from "@/components/footer"

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HowItWorks />
        <TransactionFlow />
      </main>
      <Footer />
    </div>
  )
}
