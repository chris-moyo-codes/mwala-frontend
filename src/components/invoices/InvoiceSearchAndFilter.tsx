'use client'
// Import necessary React hooks and components
import { useEffect, useState, useMemo } from 'react' // Added useMemo
import { Input } from '@/components/shared/Input'
import { Button } from '@/components/shared/Button'
import { Search, X } from 'lucide-react'

interface InvoiceSearchAndFilterProps {
  searchValue: string
  onSearchChange: (value: string) => void
  filterStatus: 'all' | 'paid' | 'pending' | 'overdue'
  onFilterChange: (status: 'all' | 'paid' | 'pending' | 'overdue') => void
  isLoading?: boolean
}

export function InvoiceSearchAndFilter({
  searchValue,
  onSearchChange,
  filterStatus,
  onFilterChange,
  isLoading
}: InvoiceSearchAndFilterProps) {
  const [localSearch, setLocalSearch] = useState(searchValue)

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(localSearch)
    }, 300)

    return () => clearTimeout(timer)
  }, [localSearch, onSearchChange])

  return ( // Render search and filter UI
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Search className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        <Input
          placeholder="Search by invoice number or description..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          disabled={isLoading}
          className="flex-1"
          aria-label="Search invoices"
        />
        {localSearch && (
          <button
            onClick={() => setLocalSearch('')}
            className="p-1 hover:bg-muted rounded transition-colors"
            aria-label="Clear search"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {(['all', 'paid', 'pending', 'overdue'] as const).map((status) => (
          <Button
            key={status}
            variant={filterStatus === status ? 'default' : 'secondary'}
            onClick={() => onFilterChange(status)}
            disabled={isLoading}
            className="capitalize"
            aria-pressed={filterStatus === status}
          >
            {status === 'all' ? 'All Invoices' : status}
          </Button>
        ))}
      </div>
    </div>
  )
}
