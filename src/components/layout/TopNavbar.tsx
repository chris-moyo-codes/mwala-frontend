'use client'
// Import necessary Lucide icons, components, and hooks
import { 
  Bell, 
  Search, 
  LogOut, 
  Command, 
  BellDot, 
  UserCircle2, 
  Settings, 
  HelpCircle 
} from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { useRouter, usePathname } from 'next/navigation'
import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import { Button } from '@/components/shared/Button'
import { toast } from 'react-toastify'
import { GlobalSearch } from './GlobalSearch'
import { NotificationCenter, notificationIcons, notificationColors } from './NotificationCenter'

// Corrected absolute path alias to the single canonical source of truth
import { useNotificationStore } from '@/hooks/notification-store'
interface TopNavbarProps {
  title?: string
}

export function TopNavbar({ title }: TopNavbarProps) {
  const { user, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [showUserMenu, setShowUserMenu] = useState(false) // State for user dropdown
  const [isSearchOpen, setIsSearchOpen] = useState(false) // State for global search modal
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false); // State for notification center
  
  // Zustand state with persistence, correctly imported from the canonical path
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearAll } = useNotificationStore()

  const lastNotifId = useRef<string | null>(null)
  const isFirstMount = useRef(true)
  const [hasHydrated, setHasHydrated] = useState(false)

  // Handle hydration to prevent SSR mismatch for notification counts
  useEffect(() => {
    setHasHydrated(true)
  }, [])

  // Side effect: trigger toast popups only for newly added, unread notifications
  useEffect(() => {
    if (isFirstMount.current || !hasHydrated) {
      if (notifications.length > 0) lastNotifId.current = notifications[0].id
      isFirstMount.current = false
      return
    }

    // Find all notifications added since the last one we saw
    const lastSeenIndex = lastNotifId.current
      ? notifications.findIndex(n => n.id === lastNotifId.current) 
      : notifications.length

    // slice(0, index) gives us everything newer than the last seen item
    const newItems = notifications.slice(0, lastSeenIndex === -1 ? 0 : lastSeenIndex).reverse()
    
    newItems.forEach(notif => {
      if (!notif.read) {
        const Icon = notificationIcons[notif.type as keyof typeof notificationIcons] || Bell
        toast(notif.message, {
          icon: <div className={notificationColors[notif.type as keyof typeof notificationColors]}><Icon size={18} /></div>,
          className: 'border border-slate-100 shadow-xl rounded-xl font-medium text-sm text-[#0F172A]',
        })
      }
    })

    if (notifications.length > 0) lastNotifId.current = notifications[0].id
  }, [notifications, hasHydrated])

  // Keyboard shortcut to open search
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault()
      setIsSearchOpen(true)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  // Close search when navigating
  useEffect(() => { setIsSearchOpen(false) }, [pathname])

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  return (
    <header className="border-b border-[#E2E8F0] bg-white sticky top-0 z-30">
      <div className="flex h-16 items-center justify-between px-4 lg:px-6">
        <div className="flex-1">
          {title && <h2 className="text-lg font-semibold text-[#0F172A]">{title}</h2>}
        </div>

        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="hidden sm:block">
            <button
              onClick={() => setIsSearchOpen(true)} // Use the existing state setter
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-50 border border-slate-100 text-sm text-slate-500 hover:bg-slate-100 transition-colors shadow-sm hover:shadow-md"
            >
              <Search className="h-4 w-4 text-slate-400" />
              <span className="text-slate-400">Search...</span>
              <span className="ml-4 text-xs text-slate-400 hidden lg:inline-flex items-center gap-1">
                <Command className="h-3 w-3" />K
              </span>
            </button>
          </div>

          {/* Notifications Bell */}
          <button 
            onClick={() => setIsNotificationsOpen(true)} 
            className="relative rounded-lg p-2 hover:bg-slate-50 transition-colors"
            aria-label="Notifications"
          >
            {unreadCount > 0 ? (
              <BellDot size={20} className="text-[#0F172A] animate-bell-ring" />
            ) : (
              <Bell size={20} className="text-[#0F172A]" />
            )}
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 h-4 w-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                {unreadCount}
              </span>
            )}
          </button>

          {/* User Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="rounded-lg p-2 hover:bg-slate-50 transition-colors flex items-center gap-2"
              aria-label="User menu"
            >
              <UserCircle2 size={20} className="text-[#0F172A]" />
              <span className="hidden md:inline text-sm font-medium text-[#0F172A]">{user?.name || 'My Account'}</span>
            </button>

            {/* Dropdown Menu */}
            {showUserMenu && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} />
                <div className="absolute right-0 mt-2 w-52 rounded-xl border border-[#E2E8F0] bg-white shadow-xl shadow-slate-200/50 z-50 overflow-hidden">
                  <div className="p-4 border-b border-[#E2E8F0] bg-slate-50/50">
                    <p className="text-sm font-bold text-[#0F172A]">{user?.name}</p>
                    <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                  </div>
                  <div className="p-1.5 space-y-0.5">
                    <Link href="/dashboard/profile" onClick={() => setShowUserMenu(false)}>
                      <Button variant="ghost" className="w-full justify-start gap-2.5 px-3 py-2.5 text-sm font-bold text-slate-500 hover:bg-slate-50 hover:text-[#0F172A] rounded-lg group">
                        <UserCircle2 size={16} className="text-slate-400 group-hover:text-[#0F172A]" />
                        My Profile
                      </Button>
                    </Link>
                    <Link href="/dashboard/settings" onClick={() => setShowUserMenu(false)}>
                      <Button variant="ghost" className="w-full justify-start gap-2.5 px-3 py-2.5 text-sm font-bold text-slate-500 hover:bg-slate-50 hover:text-[#0F172A] rounded-lg group">
                        <Settings size={16} className="text-slate-400 group-hover:text-[#0F172A]" />
                        Business Settings
                      </Button>
                    </Link>
                    <Button variant="ghost" onClick={() => { setShowUserMenu(false); setIsNotificationsOpen(true); }} className="w-full justify-start gap-2.5 px-3 py-2.5 text-sm font-bold text-slate-500 hover:bg-slate-50 hover:text-[#0F172A] rounded-lg group">
                      <Bell size={16} className="text-slate-400 group-hover:text-[#0F172A]" />
                      Notifications
                    </Button>
                    <Link href="/help" onClick={() => setShowUserMenu(false)}>
                      <Button variant="ghost" className="w-full justify-start gap-2.5 px-3 py-2.5 text-sm font-bold text-slate-500 hover:bg-slate-50 hover:text-[#0F172A] rounded-lg group">
                        <HelpCircle size={16} className="text-slate-400 group-hover:text-[#0F172A]" />
                        Help Center
                      </Button>
                    </Link>
                    <div className="my-1 border-t border-slate-100" />
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm font-bold text-slate-500 hover:bg-slate-50 hover:text-red-600 transition-all rounded-lg group"
                    >
                      <LogOut size={16} className="text-slate-400 group-hover:text-red-600" />
                      Logout
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Overlays/Modals */}
      <GlobalSearch
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      <NotificationCenter
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        onMarkAsRead={markAsRead}
        onMarkAllAsRead={markAllAsRead}
        onClearAll={clearAll}
      />
    </header>
  )
}
