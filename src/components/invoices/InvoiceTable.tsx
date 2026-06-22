'use client'
// Import necessary React hooks and components
import React, { useMemo } from 'react' // Added useMemo
import { Invoice } from '@/types'
import { formatCurrency, formatDate } from '@/lib/utils'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { Button } from '@/components/shared/Button'
import { ChevronUp, ChevronDown } from 'lucide-react'

interface InvoiceTableProps {
  invoices: Invoice[]
  isLoading?: boolean
  onRowClick?: (invoice: Invoice) => void
}

type SortField = keyof Invoice
type SortDirection = 'asc' | 'desc'

export function InvoiceTable({ invoices, isLoading, onRowClick }: InvoiceTableProps) {
  const [sortField, setSortField] = React.useState<SortField>('createdAt')
  const [sortDirection, setSortDirection] = React.useState<SortDirection>('desc')

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const sortedInvoices = useMemo(() => {
    return [...invoices].sort((a, b) => {
      const aValue = a[sortField]
      const bValue = b[sortField]

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue)
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc'
          ? aValue - bValue
          : bValue - aValue
      }

      if (aValue instanceof Date && bValue instanceof Date) {
        return sortDirection === 'asc'
          ? aValue.getTime() - bValue.getTime()
          : bValue.getTime() - aValue.getTime()
      }
      return 0
    })
  }, [invoices, sortField, sortDirection]);

  if (isLoading) {
    return (
      <div className="space-y-3 p-6">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-12 bg-muted animate-pulse rounded" />
        ))}
      </div>
    )
  }

  if (invoices.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-6">
        <p className="text-sm text-muted-foreground">No invoices found</p>
      </div>
    )
  }

  const SortHeader = ({ field, label }: { field: SortField; label: string }) => (
    <button
      onClick={() => handleSort(field)}
      className="flex items-center gap-2 font-bold text-slate-400 uppercase tracking-widest hover:text-[#0F172A] transition-colors"
      aria-sort={
        sortField === field
          ? sortDirection === 'asc'
            ? 'ascending'
            : 'descending'
          : 'none'
      }
    >
      {label}
      {sortField === field && (
        sortDirection === 'asc' ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )
      )}
    </button>
  )

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="px-4 py-3 text-left text-sm">
              <SortHeader field="invoiceNumber" label="Invoice" />
            </th>
            <th className="px-4 py-3 text-left text-sm hidden md:table-cell">
              <span className="font-semibold text-foreground">Description</span>
            </th>
            <th className="px-4 py-3 text-left text-sm">
              <SortHeader field="amount" label="Amount" />
            </th>
            <th className="px-4 py-3 text-left text-sm hidden sm:table-cell">
              <SortHeader field="status" label="Status" />
            </th>
            <th className="px-4 py-3 text-left text-sm hidden lg:table-cell">
              <SortHeader field="createdAt" label="Date" />
            </th>
            <th className="px-4 py-3 text-right text-sm">
              <span className="font-semibold text-foreground">Action</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedInvoices.map((invoice) => (
            <tr
              key={invoice.id}
              className="border-b border-border hover:bg-muted/50 transition-colors cursor-pointer"
              onClick={() => onRowClick?.(invoice)}
            >
              <td className="px-4 py-4 text-sm font-medium text-foreground">
                <div>{invoice.invoiceNumber}</div>
                <div className="text-xs text-muted-foreground md:hidden">
                  {invoice.description}
                </div>
              </td>
              <td className="px-4 py-4 text-sm text-muted-foreground hidden md:table-cell">
                {invoice.description}
              </td>
              <td className="px-4 py-4 text-sm font-semibold text-foreground">
                {formatCurrency(invoice.amount)}
              </td>
              <td className="px-4 py-4 text-sm hidden sm:table-cell">
                <StatusBadge status={invoice.status} />
              </td>
              <td className="px-4 py-4 text-sm text-muted-foreground hidden lg:table-cell">
                {formatDate(invoice.createdAt)}
              </td>
              <td className="px-4 py-4 text-right">
                <Button
                  variant="outline"
                  className="font-bold"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    onRowClick?.(invoice)
                  }}
                >
                  View
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
