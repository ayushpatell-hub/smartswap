"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { StatsBanner } from "@/components/stats-banner"
import { Footer } from "@/components/footer"
import SplashScreen from "@/components/splash-screen"

export default function Home() {
  const [showSplash, setShowSplash] = useState(false)

  useEffect(() => {
    const visited = sessionStorage.getItem("visited")
    if (!visited) {
      setShowSplash(true)
    }
  }, [])

  const handleSplashDone = () => {
    sessionStorage.setItem("visited", "true")
    setShowSplash(false)
  }

  return (
    <>
      {showSplash && <SplashScreen onDone={handleSplashDone} />}
      <div
        className="min-h-screen bg-background"
        style={{
          opacity: showSplash ? 0 : 1,
          transition: "opacity 0.6s ease-in-out",
        }}
      >
        <Navbar />
        <main>
          <HeroSection />
          <StatsBanner />
        </main>
        <Footer />
      </div>
    </>
  )
}