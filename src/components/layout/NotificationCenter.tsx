'use client'

import { useEffect, useCallback, useRef } from 'react' // Removed useState as it's not used
import { X, Bell, CheckCircle2, AlertCircle, UserPlus, ReceiptText, BarChart, Clock, Mail } from 'lucide-react'
import { cn, formatDate } from '@/lib/utils'
import { Button } from '@/components/shared/Button'

export interface Notification {
  id: string
  type: 'invoice_paid' | 'invoice_overdue' | 'customer_added' | 'receipt_recorded' | 'report_generated' | 'system_alert'
  message: string
  timestamp: Date
  actionHref?: string // Added actionHref for direct navigation
  read: boolean
}

interface NotificationCenterProps {
  isOpen: boolean
  onClose: () => void
  notifications: Notification[]
  onMarkAsRead: (id: string) => void
  onMarkAllAsRead: () => void
  onClearAll: () => void
}

export const notificationIcons = {
  invoice_paid: CheckCircle2,
  invoice_overdue: AlertCircle,
  customer_added: UserPlus,
  receipt_recorded: ReceiptText,
  report_generated: BarChart,
  system_alert: Mail,
}

export const notificationColors = {
  invoice_paid: 'text-emerald-500',
  invoice_overdue: 'text-red-500',
  customer_added: 'text-blue-500',
  receipt_recorded: 'text-[#D4A017]',
  report_generated: 'text-purple-500',
  system_alert: 'text-slate-500',
}

export function NotificationCenter({ isOpen, onClose, notifications, onMarkAsRead, onMarkAllAsRead, onClearAll }: NotificationCenterProps) {
  const panelRef = useRef<HTMLDivElement>(null)

  const unreadNotifications = notifications.filter(n => !n.read)
  const readNotifications = notifications.filter(n => n.read)

  const handleOutsideClick = useCallback((event: MouseEvent) => {
    if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
      onClose()
    }
  }, [onClose])

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick)
    } else {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [isOpen, handleOutsideClick])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/20" onClick={onClose} />

      {/* Notification Panel */}
      <div
        ref={panelRef}
        className="relative w-full max-w-sm bg-white shadow-xl flex flex-col h-full border-l border-slate-100"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100">
          <h3 className="text-lg font-bold text-[#0F172A]">Notifications</h3>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-50 text-slate-500">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Actions */}
        <div className="flex justify-between p-4 border-b border-slate-100">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onMarkAllAsRead}
            disabled={unreadNotifications.length === 0}
            className="text-xs font-bold text-[#0F172A] hover:bg-slate-50"
          >
            Mark all as read
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClearAll}
            disabled={notifications.length === 0}
            className="text-xs font-bold text-red-600 hover:bg-red-50"
          >
            Clear all
          </Button>
        </div>

        {/* Notification List */}
        <div className="flex-1 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              <Bell className="h-12 w-12 mx-auto mb-4 text-slate-300" />
              <p className="text-sm font-medium">No new notifications</p>
              <p className="text-xs text-slate-400 mt-1">You're all caught up!</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {unreadNotifications.length > 0 && (
                <div className="py-2 px-4 bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Unread ({unreadNotifications.length})</div>
              )}
              {unreadNotifications.map(notification => {
                const Icon = notificationIcons[notification.type]
                return (
                  <div 
                    key={notification.id} 
                    className="flex items-start gap-3 p-4 hover:bg-slate-50 cursor-pointer transition-colors"
                    onClick={() => onMarkAsRead(notification.id)}
                  >
                    <div className={cn("flex-shrink-0 p-2 rounded-full bg-slate-100", notificationColors[notification.type])}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[#0F172A]">{notification.message}</p>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                        <Clock className="h-3 w-3 flex-shrink-0" />
                        {formatDate(notification.timestamp)}
                      </p>
                      {notification.actionHref && (
                        <Button variant="ghost" size="sm" className="mt-2 h-auto px-2 py-1 text-xs font-bold text-[#D4A017] hover:bg-[#D4A017]/10">
                          View Details
                        </Button>
                      )}
                    </div>
                    {!notification.read && (
                      <div className="h-2 w-2 rounded-full bg-[#D4A017] flex-shrink-0 mt-2.5" />
                    )}
                  </div>
                )
              })}

              {readNotifications.length > 0 && (
                <div className="py-2 px-4 bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Read ({readNotifications.length})</div>
              )}
              {readNotifications.map(notification => {
                const Icon = notificationIcons[notification.type]
                return (
                  <div 
                    key={notification.id} 
                    className="flex items-start gap-3 p-4 text-slate-500 hover:bg-slate-50 cursor-pointer transition-colors"
                  >
                    <div className="flex-shrink-0 p-2 rounded-full bg-slate-100">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">{notification.message}</p>
                      <p className="text-xs flex items-center gap-1 mt-1">
                        <Clock className="h-3 w-3" />
                        {formatDate(notification.timestamp)}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}