"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SplashScreen from "@/components/splash-screen";
import { Navbar } from "@/components/navbar";
import {HeroSection} from "@/components/hero-section";
import {StatsBanner} from "@/components/stats-banner";
import {Footer} from "@/components/footer";

export default function Home() {
  const [showSplash, setShowSplash] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const visited = sessionStorage.getItem("visited");
    if (!visited) {
      setShowSplash(true);
    }
  }, []);

  const handleSplashDone = () => {
    sessionStorage.setItem("visited", "true");
    setShowSplash(false);
    router.push("/auth");
  };

  if (showSplash) {
    return <SplashScreen onDone={handleSplashDone} />;
  }

  return (
    <main>
      <Navbar />
      <HeroSection />
      <StatsBanner />
      <Footer />
    </main>
  );
}
