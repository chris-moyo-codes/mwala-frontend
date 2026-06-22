'use client'
import { useEffect, useState } from 'react'
import { Input } from '@/components/shared/Input'
import { Button } from '@/components/shared/Button'
import { Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ReceiptSearchAndFilterProps {
  searchValue: string
  onSearchChange: (value: string) => void
  filterStatus: 'all' | 'verified' | 'unverified' | 'pending_review'
  onFilterChange: (status: 'all' | 'verified' | 'unverified' | 'pending_review') => void
  isLoading?: boolean
}

export function ReceiptSearchAndFilter({
  searchValue,
  onSearchChange,
  filterStatus,
  onFilterChange,
  isLoading
}: ReceiptSearchAndFilterProps) {
  const [localSearch, setLocalSearch] = useState(searchValue)

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(localSearch)
    }, 300)

    return () => clearTimeout(timer)
  }, [localSearch, onSearchChange])

  return (
    <div className="space-y-4">
      <div className="relative flex items-center">
        <Search className="h-4 w-4 text-slate-400 absolute left-3" />
        <Input
          placeholder="Search by receipt number or customer..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          disabled={isLoading}
          className="pl-9 pr-8 h-10 text-sm border-slate-200 focus:border-[#D4A017] focus:ring-[#D4A017]/20 transition-all"
          aria-label="Search receipts"
        />
        {localSearch && (
          <button
            onClick={() => setLocalSearch('')}
            className="absolute right-2 p-1 rounded-full hover:bg-slate-100 text-slate-400 transition-colors"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {(['all', 'verified', 'unverified', 'pending_review'] as const).map((status) => (
          <Button
            key={status}
            variant={filterStatus === status ? 'default' : 'secondary'}
            onClick={() => onFilterChange(status)}
            disabled={isLoading}
            className={cn("capitalize text-[10px] font-bold uppercase tracking-wider h-8 px-3", filterStatus === status ? "bg-[#0F172A] text-white" : "bg-slate-50 text-slate-600 hover:bg-slate-100")}
            aria-pressed={filterStatus === status}
          >
            {status.replace('_', ' ')}
          </Button>
        ))}
      </div>
    </div>
  )
}