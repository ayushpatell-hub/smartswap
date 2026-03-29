"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ArrowLeftRight, Menu, Sun, Moon } from "lucide-react"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/person-to-person", label: "Person to Person" },
  { href: "/shops", label: "Person to Shop" },
  { href: "/pricing", label: "Subscription" },
  { href: "/how-it-works", label: "How it Works" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/contact", label: "Contact" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [dark, setDark] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem("theme")
    if (saved === "light") {
      setDark(false)
      document.documentElement.classList.remove("dark")
    } else {
      setDark(true)
      document.documentElement.classList.add("dark")
    }
  }, [])

  const toggleTheme = () => {
    if (dark) {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
      setDark(false)
    } else {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
      setDark(true)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b backdrop-blur-md transition-all"
      style={{
        background: dark ? "rgba(0,0,0,0.95)" : "rgba(255,255,255,0.95)",
        borderColor: dark ? "rgba(33,150,243,0.15)" : "rgba(0,112,224,0.15)",
      }}>
      <div className="container mx-auto flex h-16 items-center justify-between px-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-500/30">
            <ArrowLeftRight className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-black" style={{ color: dark ? "#ffffff" : "#0a0a0a" }}>
            Smart<span className="text-blue-500">Swap</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}
              className="text-sm font-medium transition-colors hover:text-blue-500"
              style={{ color: dark ? "#aaaaaa" : "#555555" }}>
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="hidden items-center gap-3 lg:flex">

          {/* Theme Toggle */}
          <button onClick={toggleTheme}
            className="w-10 h-10 rounded-xl border flex items-center justify-center transition-all hover:border-blue-500/50"
            style={{
              background: dark ? "#111111" : "#f0f7ff",
              borderColor: dark ? "#1a2a3a" : "#e0eaf5",
            }}>
            {dark
              ? <Sun className="h-4 w-4 text-yellow-400" />
              : <Moon className="h-4 w-4 text-blue-600" />}
          </button>

          {/* Sign In */}
          <a href="/auth">
            <button className="px-5 py-2 rounded-xl font-bold text-sm text-white bg-blue-600 hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/25">
              Sign In
            </button>
          </a>
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <button className="p-2 rounded-lg" style={{ color: dark ? "#ffffff" : "#0a0a0a" }}>
              <Menu className="h-5 w-5" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px]"
            style={{ background: dark ? "#000000" : "#ffffff", borderColor: dark ? "#1a2a3a" : "#e0eaf5" }}>
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <nav className="mt-8 flex flex-col gap-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium" style={{ color: dark ? "#aaaaaa" : "#555555" }}>Theme</span>
                <button onClick={toggleTheme}
                  className="w-9 h-9 rounded-xl border flex items-center justify-center"
                  style={{ background: dark ? "#111111" : "#f0f7ff", borderColor: dark ? "#1a2a3a" : "#e0eaf5" }}>
                  {dark ? <Sun className="h-4 w-4 text-yellow-400" /> : <Moon className="h-4 w-4 text-blue-600" />}
                </button>
              </div>
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}
                  className="text-base font-medium transition-colors hover:text-blue-500"
                  style={{ color: dark ? "#aaaaaa" : "#555555" }}
                  onClick={() => setIsOpen(false)}>
                  {link.label}
                </Link>
              ))}
              <a href="/auth" className="mt-2">
                <button className="w-full py-3 rounded-xl font-bold text-sm text-white bg-blue-600 hover:bg-blue-500 transition-all">
                  Sign In
                </button>
              </a>
            </nav>
          </SheetContent>
        </Sheet>

      </div>
    </header>
  )
}