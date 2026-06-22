'use client'
// Import necessary Next.js and React hooks, and Lucide icons
import Link from 'next/link' // Import Link for navigation
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Users,
  FileText,
  Receipt,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '@/lib/auth-context' // Import useAuth

const mainNavItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/customers', label: 'Customers', icon: Users },
  { href: '/dashboard/invoices', label: 'Invoices', icon: FileText },
  { href: '/dashboard/receipts', label: 'Receipts', icon: Receipt },
  { href: '/dashboard/reports', label: 'Reports', icon: BarChart3 },
]

export function AppSidebar() {
  const { logout } = useAuth() // Use the logout function from auth context
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed right-4 top-4 z-50 rounded-xl bg-[#0F172A] p-2.5 text-white shadow-lg lg:hidden transition-transform active:scale-90"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 w-64 border-r border-white/5 bg-[#0F172A] transition-all duration-300 ease-in-out lg:translate-x-0 lg:relative shadow-2xl',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-screen flex-col">
          {/* Logo */}
          <div className="px-8 py-12">
            <Link href="/dashboard" className="inline-block transition-opacity hover:opacity-80">
              <span className="text-2xl font-black tracking-tighter text-white">
                MWALA<span className="text-[#D4A017]">.</span>
              </span>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mt-1">Operating System</p>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1.5 overflow-y-auto px-4">
            {mainNavItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'group relative flex items-center gap-3.5 px-4 py-3 text-sm font-semibold transition-all duration-200 rounded-lg',
                    isActive
                      ? 'bg-white/10 text-white shadow-[0_0_20px_rgba(255,255,255,0.02)]'
                      : 'text-slate-400 hover:bg-white/[0.03] hover:text-white'
                  )}
                >
                  {/* Active Indicator Accent */}
                  {isActive && (
                    <div className="absolute left-0 h-5 w-[2px] bg-[#D4A017] rounded-r-full" />
                  )}
                  
                  <item.icon 
                    className={cn(
                      "h-[18px] w-[18px] transition-all duration-200",
                      isActive ? "text-white" : "text-slate-500 group-hover:text-white group-hover:-translate-y-[1px]"
                    )} 
                  />
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* System Controls */}
          <div className="mt-auto border-t border-white/5 p-4 space-y-1">
            <Link
              href="/dashboard/settings"
              onClick={() => setIsOpen(false)}
              className={cn(
                'group flex items-center gap-3.5 px-4 py-3 text-sm font-semibold transition-all duration-200 rounded-lg',
                pathname === '/dashboard/settings'
                  ? 'bg-white/10 text-white'
                  : 'text-slate-400 hover:bg-white/[0.03] hover:text-white'
              )}
            >
              <Settings size={18} className="text-slate-500 group-hover:text-white group-hover:-translate-y-[1px] transition-all" />
              Settings
            </Link>
            <button className="flex w-full items-center gap-3.5 rounded-lg px-4 py-3 text-sm font-semibold text-slate-400 transition-all duration-200 hover:bg-white/[0.03] hover:text-white group">
              <LogOut size={18} className="text-slate-500 group-hover:text-white group-hover:-translate-y-[1px]" onClick={logout} />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
