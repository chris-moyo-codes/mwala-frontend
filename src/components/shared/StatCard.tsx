'use client'
// Import utility functions and shared components
import { formatCurrency, cn } from '@/lib/utils' // Added cn import
import { Card, CardContent } from '@/components/shared/Card'
import { LucideIcon } from 'lucide-react'

interface StatCardProps {
  label: string
  value: number
  icon: LucideIcon
  format?: 'currency' | 'number'
  trend?: {
    value: number
    direction: 'up' | 'down'
  }
}

export function StatCard({
  label,
  value,
  icon: Icon,
  format = 'currency',
  trend,
}: StatCardProps) {
  const displayValue = format === 'currency' ? formatCurrency(value) : value.toLocaleString()

  return (
    <Card className="flex-1">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{label}</p>
            <p className="mt-2 text-2xl font-bold text-foreground">{displayValue}</p>
            {trend && (
              <p // Conditional styling for trend
                className={`mt-2 text-sm font-medium ${
                  trend.direction === 'up' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {trend.direction === 'up' ? '↑' : '↓'} {trend.value}%
              </p> 
            )}
          </div>
          <div className="rounded-xl bg-slate-50 p-3">
            <Icon className="h-6 w-6 text-[#0F172A]" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
