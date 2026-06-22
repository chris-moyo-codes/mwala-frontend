'use client'
import React, { useState, useMemo } from 'react'
import { Invoice, Receipt } from '@/types'
import { formatCurrency, formatDate, cn } from '@/lib/utils'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { Button } from '@/components/shared/Button'
import { ChevronUp, ChevronDown } from 'lucide-react'
import { mockCustomers, mockInvoices } from '@/mock-data'

interface ReceiptTableProps {
  receipts: Receipt[]
  isLoading?: boolean
  onRowClick?: (receipt: Receipt) => void
  selectedReceiptId?: string
}

type SortField = keyof Receipt | 'customerName' | 'invoiceNumber'
type SortDirection = 'asc' | 'desc'

export function ReceiptTable({ receipts, isLoading, onRowClick, selectedReceiptId }: ReceiptTableProps) {
  const [sortField, setSortField] = useState<SortField>('date')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const receiptsWithDetails = useMemo(() => {
    return receipts.map(receipt => {
      const customer = mockCustomers.find(c => c.id === receipt.customerId);
      const invoice = mockInvoices.find(i => i.id === receipt.invoiceId);
      return {
        ...receipt,
        customerName: customer ? customer.name : 'Unknown Customer',
        invoiceNumber: invoice ? invoice.invoiceNumber : 'N/A',
      };
    });
  }, [receipts]);

  const sortedReceipts = useMemo(() => {
    return [...receiptsWithDetails].sort((a, b) => {
      let aValue: any;
      let bValue: any;

      if (sortField === 'customerName') {
        aValue = a.customerName;
        bValue = b.customerName;
      } else if (sortField === 'invoiceNumber') {
        aValue = a.invoiceNumber;
        bValue = b.invoiceNumber;
      } else {
        aValue = a[sortField];
        bValue = b[sortField];
      }

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
  }, [receiptsWithDetails, sortField, sortDirection]);

  if (isLoading) {
    return (
      <div className="space-y-3 p-6">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 bg-slate-50 animate-pulse rounded-lg" />
        ))}
      </div>
    )
  }

  if (receipts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-6">
        <p className="text-sm text-muted-foreground">No receipts found</p>
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
            <th className="px-6 py-4 text-left text-[10px]"><SortHeader field="receiptNumber" label="Receipt #" /></th>
            <th className="px-6 py-4 text-left text-[10px]"><SortHeader field="customerName" label="Customer" /></th>
            <th className="px-6 py-4 text-left text-[10px] hidden md:table-cell"><SortHeader field="invoiceNumber" label="Invoice" /></th>
            <th className="px-6 py-4 text-left text-[10px] hidden sm:table-cell"><SortHeader field="paymentMethod" label="Method" /></th>
            <th className="px-6 py-4 text-right text-[10px]"><SortHeader field="amount" label="Amount" /></th>
            <th className="px-6 py-4 text-left text-[10px]"><SortHeader field="date" label="Date" /></th>
            <th className="px-6 py-4 text-center text-[10px]"><SortHeader field="status" label="Status" /></th>
            <th className="px-6 py-4 text-right text-[10px]"><span className="font-bold text-slate-400 uppercase tracking-widest">Actions</span></th>
          </tr>
        </thead>
        <tbody>
          {sortedReceipts.map((receipt) => (
            <tr
              key={receipt.id}
              className={cn(
                "border-b border-slate-50 hover:bg-slate-50/80 transition-all duration-200 cursor-pointer group",
                selectedReceiptId === receipt.id ? "bg-slate-100/70 ring-1 ring-[#D4A017]/30 shadow-inner" : ""
              )}
              onClick={() => onRowClick?.(receipt)}
            >
              <td className="px-6 py-4 text-sm font-bold text-[#0F172A]">{receipt.receiptNumber}</td>
              <td className="px-6 py-4 text-sm text-slate-700">{receipt.customerName}</td>
              <td className="px-6 py-4 text-sm text-slate-500 hidden md:table-cell">{receipt.invoiceNumber}</td>
              <td className="px-6 py-4 text-sm text-slate-500 hidden sm:table-cell capitalize">{receipt.paymentMethod.replace('_', ' ')}</td>
              <td className="px-6 py-4 text-right text-sm font-bold text-emerald-600 tabular-nums">+{formatCurrency(receipt.amount)}</td>
              <td className="px-6 py-4 text-sm text-slate-500">{formatDate(receipt.date)}</td>
              <td className="px-6 py-4 text-center text-sm"><StatusBadge status={receipt.status ?? 'pending'} /></td>
              <td className="px-4 py-4 text-right">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    onRowClick?.(receipt)
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