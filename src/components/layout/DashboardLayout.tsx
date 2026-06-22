'use client'
// Import layout components
import { AppSidebar } from './AppSidebar' // Import AppSidebar component
import { TopNavbar } from './TopNavbar' // Import TopNavbar
import { Breadcrumbs } from '@/components/shared/Breadcrumbs'

interface DashboardLayoutProps {
  children: React.ReactNode
  title?: string
}

export function DashboardLayout({ children, title }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-white">
      <AppSidebar />
      <div className="flex flex-1 flex-col">
        <TopNavbar title={title} />
        <main className="flex-1 overflow-auto">
          <div className="p-4 lg:p-6">
            <Breadcrumbs />
            {children}
          </div>
        </main>
        <footer className="border-t border-slate-50 py-4 px-6 bg-white">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em]">
            <div className="flex items-center gap-6">
              <span>© {new Date().getFullYear()} MWALA. Ledger</span>
              <span className="flex items-center gap-1.5"><div className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Database Live</span>
            </div>
            <div className="flex items-center gap-6">
              <span>Version 1.0.4-stable</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
