'use client'
// Import utility functions
import { cn } from '@/lib/utils' // Import cn utility

type Status = 'paid' | 'pending' | 'overdue' | 'active' | 'inactive' | 'verified' | 'unverified' | 'pending_review'

const statusStyles: Record<Status, string> = {
  paid: 'bg-green-50 text-green-700 border-green-200',
  pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  overdue: 'bg-red-50 text-red-700 border-red-200',
  active: 'bg-green-50 text-green-700 border-green-200',
  inactive: 'bg-gray-50 text-gray-700 border-gray-200',
  verified: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  unverified: 'bg-rose-50 text-rose-700 border-rose-200',
  pending_review: 'bg-amber-50 text-amber-700 border-amber-200',
}

const statusLabels: Record<Status, string> = {
  paid: 'Paid',
  pending: 'Pending',
  overdue: 'Overdue',
  active: 'Active',
  inactive: 'Inactive',
  verified: 'Verified',
  unverified: 'Unverified',
  pending_review: 'Pending Review',
}

interface StatusBadgeProps {
  status: Status
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium',
        statusStyles[status],
        className
      )}
    >
      {statusLabels[status]}
    </span>
  )
}
