'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, Home } from 'lucide-react'

export function Breadcrumbs() {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)

  // Don't show breadcrumbs on the main dashboard home
  if (segments.length === 1 && segments[0] === 'dashboard') return null

  return (
    <nav className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-6">
      <Link href="/dashboard" className="hover:text-[#0F172A] transition-colors flex items-center gap-1.5">
        <Home className="h-3 w-3" />
        <span>Command</span>
      </Link>
      {segments.map((segment, index) => {
        if (segment === 'dashboard') return null
        const href = `/${segments.slice(0, index + 1).join('/')}`
        const isLast = index === segments.length - 1
        const label = segment.replace(/-/g, ' ')

        return (
          <div key={href} className="flex items-center space-x-2">
            <ChevronRight className="h-3 w-3 text-slate-300" />
            {isLast ? (
              <span className="text-[#D4A017]">{label}</span>
            ) : (
              <Link href={href} className="hover:text-[#0F172A] transition-colors">
                {label}
              </Link>
            )}
          </div>
        )
      })}
    </nav>
  )
}