'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/shared/Button'
import { cn } from '@/lib/utils'
import { NAV_LINKS } from './constants'

export function LandingNav() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 lg:h-[4.5rem]">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-[#0F172A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A017] focus-visible:ring-offset-2"
          aria-label="MWALA home"
        >
          MWALA<span className="text-[#D4A017]">.</span>
        </Link>

        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Main navigation"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-[#0F172A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A017] focus-visible:ring-offset-2"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="default" size="sm">
              Get Started
            </Button>
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-[#0F172A] hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A017] md:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        id="mobile-nav"
        className={cn(
          'border-t border-slate-200 bg-white md:hidden',
          mobileOpen ? 'block' : 'hidden'
        )}
      >
        <nav className="flex flex-col gap-1 px-6 py-4" aria-label="Mobile navigation">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-[#0F172A]"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-4 flex flex-col gap-2 border-t border-slate-100 pt-4">
            <Link href="/login" onClick={() => setMobileOpen(false)}>
              <Button variant="secondary" className="w-full">
                Sign In
              </Button>
            </Link>
            <Link href="/login" onClick={() => setMobileOpen(false)}>
              <Button variant="default" className="w-full">
                Get Started
              </Button>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
