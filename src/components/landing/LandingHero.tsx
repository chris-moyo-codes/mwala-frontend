import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/shared/Button'
import { Container } from './Container'
import { DashboardPreview } from './DashboardPreview'

export function LandingHero() {
  return (
    <section className="relative overflow-hidden bg-[#FAFAFA] pb-20 pt-16 sm:pb-28 sm:pt-20 lg:pt-24">
      <Container className="relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-6 inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600">
            Financial Operating System
          </p>

          <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight text-[#0F172A] sm:text-5xl lg:text-6xl">
            The financial operating system for African businesses
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Unify client management, invoicing, payments, and reporting in one
            platform built for trust, clarity, and scale.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link href="/login">
              <Button variant="default" size="lg" className="w-full gap-2 sm:w-auto">
                Get Started
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </Link>
            <Link href="#product">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                View platform
              </Button>
            </Link>
          </div>
        </div>

        <DashboardPreview />
      </Container>

      {/* Subtle background */}
      <div
        className="pointer-events-none absolute inset-0 -z-0"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-0 h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-slate-100/60 blur-3xl" />
      </div>
    </section>
  )
}
