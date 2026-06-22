'use client'

import React from 'react'
import { Customer } from '@/types'
import { formatCurrency, formatDate } from '@/lib/utils'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { AdvancedTable, Column } from '@/components/shared/AdvancedTable'

interface CustomerTableProps {
  customers: Customer[]
  isLoading?: boolean
  onRowClick?: (customer: Customer) => void
  selectedCustomerId?: string
}

export function CustomerTable({ customers, isLoading, onRowClick, selectedCustomerId }: CustomerTableProps) {
  
  if (isLoading) {
    return (
      <div className="space-y-3 p-6">
        {[...Array(5)].map((_, i) => (<div key={i} className="h-16 bg-[#161F38] animate-pulse rounded-lg" />))}
      </div>
    )
  }

  const columns: Column<Customer>[] = [
    {
      header: 'Customer Details',
      accessorKey: 'name',
      cell: (customer) => (
        <div className="flex flex-col">
          <span className="font-bold text-white">{customer.name}</span>
          <span className="text-xs text-slate-400">{customer.email}</span>
        </div>
      )
    },
    {
      header: 'Business Name',
      accessorKey: 'businessName',
      cell: (customer) => <span className="font-medium text-slate-300">{customer.businessName}</span>
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (customer) => <StatusBadge status={customer.status} />
    },
    {
      header: 'Created On',
      accessorKey: 'createdAt',
      cell: (customer) => <span className="text-slate-400">{formatDate(customer.createdAt)}</span>
    },
    {
      header: 'Total Revenue',
      accessorKey: 'totalRevenue',
      align: 'right',
      cell: (customer) => <span className="font-bold text-white">{formatCurrency(customer.totalRevenue || 0)}</span>
    },
    {
      header: 'Outstanding',
      accessorKey: 'outstandingBalance',
      align: 'right',
      cell: (customer) => (
        <span className={customer.outstandingBalance > 0 ? "font-bold text-[#EF4444]" : "font-medium text-slate-400"}>
          {formatCurrency(customer.outstandingBalance)}
        </span>
      )
    }
  ]

  return (
    <AdvancedTable
      data={customers}
      columns={columns}
      onRowClick={onRowClick}
      keyExtractor={(c) => c.id}
      selectedRowId={selectedCustomerId}
      searchPlaceholder="Search customers by name, business, or email..."
      searchableKeys={['name', 'businessName', 'email']}
      onExport={(data) => console.log('Exporting...', data)}
      bulkActions={[
        { label: 'Archive', onClick: (items) => console.log('Archive', items), variant: 'secondary' },
        { label: 'Send Reminder', onClick: (items) => console.log('Remind', items), variant: 'default' }
      ]}
    />
  )
}
