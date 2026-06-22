'use client'
// Import necessary React hooks and components
import { useState, useMemo } from 'react' // Added useMemo
import { Customer, Invoice, Receipt } from '@/types' // Added Invoice, Receipt
import { formatCurrency, formatDate, cn } from '@/lib/utils' // Added cn
import { StatusBadge } from '@/components/shared/StatusBadge'
import { Button } from '@/components/shared/Button'
import { ChevronUp, ChevronDown } from 'lucide-react'
import { mockInvoices, mockReceipts } from '@/mock-data' // Added mockInvoices, mockReceipts

interface CustomerTableProps {
  customers: Customer[]
  isLoading?: boolean
  onRowClick?: (customer: Customer) => void
  selectedCustomerId?: string; // Added for highlighting selected row
}

type SortField = keyof Customer | 'industry' | 'healthStatus' | 'collectionPerformance'
type SortDirection = 'asc' | 'desc'

export function CustomerTable({ customers, isLoading, onRowClick, selectedCustomerId }: CustomerTableProps) {
  const [sortField, setSortField] = useState<SortField>('name')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const sortedCustomers = useMemo(() => {
    return [...customers].sort((a: any, b: any) => { // Cast to any for dynamic sortField
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
          : bValue.getTime() - aValue.getTime();
      }
      return 0
    })
  }, [customers, sortField, sortDirection]);

  if (isLoading) {
    return (
      <div className="space-y-3 p-6">
        {[...Array(5)].map((_, i) => (<div key={i} className="h-16 bg-slate-50 animate-pulse rounded-lg" />))}
      </div>
    )
  }

  if (customers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-6">
        <p className="text-sm text-muted-foreground">No customers found</p>
      </div>
    )
  }

  const SortHeader = ({
    field,
    label
  }: {
    field: SortField
    label: string // Changed to string
  }) => (
    <button
      onClick={() => handleSort(field)}
      className="flex items-center gap-2 font-semibold text-foreground hover:text-british-khaki transition-colors"
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
          <ChevronUp className="h-3 w-3 text-[#D4A017]" />
        ) : (
          <ChevronDown className="h-3 w-3 text-[#D4A017]" />
        )
      )}
    </button>
  )

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50/50">
            <th className="px-6 py-4 text-left text-[10px]">
              <SortHeader field="name" label="Name" />
            </th>
            <th className="px-6 py-4 text-left text-[10px] hidden md:table-cell">
              <SortHeader field="industry" label="Industry" />
            </th>
            <th className="px-6 py-4 text-right text-[10px]">
              <SortHeader field="outstandingBalance" label="Balance" />
            </th>
            <th className="px-6 py-4 text-right text-[10px] hidden lg:table-cell">
              <SortHeader field="totalRevenue" label="Lifetime Revenue" />
            </th>
            <th className="px-6 py-4 text-left text-[10px] hidden xl:table-cell">
              <SortHeader field="lastActivity" label="Last Activity" />
            </th>
            <th className="px-6 py-4 text-center text-[10px]">
              <SortHeader field="status" label="Status" />
            </th>
            <th className="px-6 py-4 text-right text-[10px]">
              <span className="font-bold text-slate-400 uppercase tracking-widest">Action</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedCustomers.map((customer) => (
            <tr
              key={customer.id}
              className={cn(
                "border-b border-slate-50 hover:bg-slate-50/80 transition-all duration-200 cursor-pointer group",
                selectedCustomerId === customer.id ? "bg-slate-100/70 ring-1 ring-[#D4A017]/30 shadow-inner" : ""
              )}
              onClick={() => onRowClick?.(customer)}
            >
              <td className="px-6 py-4 text-sm font-bold text-[#0F172A]">
                <div>{customer.name}</div>
                <div className="text-xs text-slate-500">{customer.businessName}</div>
              </td>
              <td className="px-6 py-4 text-sm text-slate-500 hidden md:table-cell">
                {customer.industry}
              </td>
              <td className="px-6 py-4 text-right text-sm font-bold tabular-nums">
                <span className={cn(customer.outstandingBalance > 0 ? "text-rose-600" : "text-[#0F172A]")}>
                  {formatCurrency(customer.outstandingBalance)}
                </span>
              </td>
              <td className="px-6 py-4 text-right text-sm font-bold text-emerald-600 tabular-nums hidden lg:table-cell">
                {formatCurrency(customer.totalRevenue ?? 0)}
              </td>
              <td className="px-6 py-4 text-sm text-slate-500 hidden xl:table-cell">
                {customer.lastActivity ? formatDate(customer.lastActivity) : 'N/A'}
              </td>
              <td className="px-6 py-4 text-center text-sm">
                <StatusBadge status={customer.status} />
              </td>
              <td className="px-6 py-4 text-right">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    onRowClick?.(customer)
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
