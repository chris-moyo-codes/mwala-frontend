'use client'
// Import necessary React hooks and components
import { useEffect, useState, useMemo } from 'react' // Added useMemo
import { Input } from '@/components/shared/Input'
import { Button } from '@/components/shared/Button'
import { Search, X } from 'lucide-react'

interface SearchAndFilterProps {
  searchValue: string
  onSearchChange: (value: string) => void
  filterStatus: 'all' | 'active' | 'inactive'
  onFilterChange: (status: 'all' | 'active' | 'inactive') => void
  isLoading?: boolean
}

export function SearchAndFilter({
  searchValue,
  onSearchChange,
  filterStatus,
  onFilterChange,
  isLoading
}: SearchAndFilterProps) {
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
          placeholder="Search by name or email..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          disabled={isLoading}
          className="flex-1"
          aria-label="Search customers"
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
        {(['all', 'active', 'inactive'] as const).map((status) => (
          <Button
            key={status}
            variant={filterStatus === status ? 'default' : 'outline'}
            onClick={() => onFilterChange(status)}
            disabled={isLoading}
            className="capitalize"
            aria-pressed={filterStatus === status}
          >
            {status === 'all' ? 'All Customers' : status === 'active' ? 'Active' : 'Inactive'}
          </Button>
        ))}
      </div>
    </div>
  )
}
