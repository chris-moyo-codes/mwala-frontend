'use client'

import { useEffect, useCallback, useRef } from 'react'
import { X, Bell, CheckCircle2, AlertCircle, UserPlus, ReceiptText, BarChart, Clock, Mail } from 'lucide-react'
import { cn, formatDate } from '@/lib/utils'
import { Button } from '@/components/shared/Button'

export interface Notification {
  id: string
  type: 'invoice_paid' | 'invoice_overdue' | 'customer_added' | 'receipt_recorded' | 'report_generated' | 'system_alert'
  message: string
  timestamp: Date
  actionHref?: string
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
  invoice_paid: 'text-[#22C55E]',
  invoice_overdue: 'text-[#EF4444]',
  customer_added: 'text-[#E0B03B]',
  receipt_recorded: 'text-[#E0B03B]',
  report_generated: 'text-[#3B82F6]',
  system_alert: 'text-slate-400',
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
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Notification Panel */}
      <div
        ref={panelRef}
        className="relative w-full max-w-sm bg-[#0B1220] shadow-2xl flex flex-col h-full border-l border-[#263043]"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#263043] bg-[#111B31]">
          <h3 className="text-base font-bold text-white">Notification Center</h3>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-[#161F38] text-slate-400 hover:text-white transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Actions */}
        <div className="flex justify-between p-3 border-b border-[#263043] bg-[#0B1220]">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onMarkAllAsRead}
            disabled={unreadNotifications.length === 0}
            className="text-xs font-bold text-slate-300 hover:text-white hover:bg-[#161F38]"
          >
            Mark all as read
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClearAll}
            disabled={notifications.length === 0}
            className="text-xs font-bold text-[#EF4444] hover:text-white hover:bg-[#EF4444]"
          >
            Clear all
          </Button>
        </div>

        {/* Notification List */}
        <div className="flex-1 overflow-y-auto bg-[#0B1220]">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              <Bell className="h-12 w-12 mx-auto mb-4 text-[#263043]" />
              <p className="text-sm font-medium text-slate-300">No new notifications</p>
              <p className="text-xs text-slate-500 mt-1">You're all caught up!</p>
            </div>
          ) : (
            <div className="divide-y divide-[#263043]">
              {unreadNotifications.length > 0 && (
                <div className="py-2 px-4 bg-[#111B31] text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  Unread ({unreadNotifications.length})
                </div>
              )}
              {unreadNotifications.map(notification => {
                const Icon = notificationIcons[notification.type]
                return (
                  <div 
                    key={notification.id} 
                    className="flex items-start gap-3 p-4 hover:bg-[#161F38] cursor-pointer transition-colors"
                    onClick={() => onMarkAsRead(notification.id)}
                  >
                    <div className={cn("flex-shrink-0 p-2 rounded-lg bg-[#111B31] border border-[#263043]", notificationColors[notification.type])}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">{notification.message}</p>
                      <p className="text-xs text-slate-400 flex items-center gap-1 mt-1.5">
                        <Clock className="h-3 w-3 flex-shrink-0" />
                        {formatDate(notification.timestamp)}
                      </p>
                    </div>
                    {!notification.read && (
                      <div className="h-2 w-2 rounded-full bg-[#E0B03B] flex-shrink-0 mt-2.5 shadow-[0_0_8px_rgba(224,176,59,0.8)]" />
                    )}
                  </div>
                )
              })}

              {readNotifications.length > 0 && (
                <div className="py-2 px-4 bg-[#111B31] text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  Read ({readNotifications.length})
                </div>
              )}
              {readNotifications.map(notification => {
                const Icon = notificationIcons[notification.type]
                return (
                  <div 
                    key={notification.id} 
                    className="flex items-start gap-3 p-4 hover:bg-[#161F38] cursor-pointer transition-colors opacity-60"
                  >
                    <div className="flex-shrink-0 p-2 rounded-lg bg-[#111B31] border border-[#263043]">
                      <Icon className="h-4 w-4 text-slate-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-slate-300">{notification.message}</p>
                      <p className="text-xs flex items-center gap-1 mt-1.5 text-slate-500">
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