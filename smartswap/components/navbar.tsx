"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { ArrowLeftRight, Menu } from "lucide-react"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/person-to-person", label: "Person to Person" },
  { href: "/shops", label: "Person to Shop" },
  { href: "/pricing", label: "Subscription" },
  { href: "/how-it-works", label: "How it Works" },
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/contact", label: "Contact" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white">
            <ArrowLeftRight className="h-5 w-5 text-black" />
          </div>
          <span className="text-xl font-bold text-white">SmartSwap</span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/70 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Sign In */}
        <div className="hidden items-center lg:flex">
          <Button className="bg-white text-black font-semibold hover:bg-white/90">
            Sign In
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon" className="text-white">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-70 bg-black border-white/10">
      <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
      <nav className="mt-8 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-lg font-medium text-white/70 hover:text-white"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Button className="mt-4 bg-white text-black font-semibold hover:bg-white/90">
                Sign In
              </Button>
            </nav>
          </SheetContent>
        </Sheet>

      </div>
    </header>
  )
}

