'use client'

import { useState, useMemo } from 'react' // Added useMemo
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/shared/Card'
import { Button } from '@/components/shared/Button'
import { ReceiptTable } from '@/components/receipts/ReceiptTable'
import { ReceiptSearchAndFilter } from '@/components/receipts/ReceiptSearchAndFilter'
import { ReceiptDetail } from '@/components/receipts/ReceiptDetail'
import { EmptyState } from '@/components/shared/EmptyState'
import { mockReceipts } from '@/mock-data'
import { Receipt } from '@/types'
import { formatCurrency } from '@/lib/utils'
import { Plus, SearchX } from 'lucide-react'

export default function ReceiptsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'verified' | 'unverified' | 'pending_review'>(
    'all'
  )
  const [selectedReceipt, setSelectedReceipt] = useState<Receipt | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  const filteredReceipts = mockReceipts.filter((receipt) => {
    const matchesSearch = receipt.receiptNumber
      .toLowerCase()
      .includes(searchTerm.toLowerCase())

    // For now, all receipts are treated as verified
    if (filterStatus === 'all') return matchesSearch
    if (filterStatus === 'verified') return matchesSearch
    
    return false
  })
  
  const totalReceived = useMemo(() => filteredReceipts.reduce((sum, r) => sum + r.amount, 0), [filteredReceipts]);

  const methodCounts = useMemo(() => ({
    all: mockReceipts.length,
    verified: mockReceipts.length,
    unverified: 0,
    pending_review: 0,
  }), []);

  const handleRowClick = (receipt: Receipt) => {
    setSelectedReceipt(receipt)
    setIsDetailOpen(true)
  }

  const handleCloseDetail = () => {
    setIsDetailOpen(false)
    setTimeout(() => setSelectedReceipt(null), 300)
  }

  return (
    <DashboardLayout title="Receipts">
      <div className="space-y-6">
        {/* Page header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Receipts</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Record and track payments received
            </p>
          </div>
          <Button variant="default" className="w-full sm:w-auto shadow-sm flex items-center justify-center gap-2">
            <Plus className="h-4 w-4" />
            New Receipt
          </Button>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
          {[
            { label: 'Total Receipts', value: methodCounts.all },
            { label: 'Verified', value: methodCounts.verified },
            { label: 'Unverified', value: methodCounts.unverified },
            { label: 'Pending Review', value: methodCounts.pending_review },
          ].map((kpi) => (
            <Card key={kpi.label} className="border-none shadow-sm ring-1 ring-slate-100 overflow-hidden transition-all duration-300 hover:shadow-lg hover:ring-slate-200 hover:-translate-y-1 group">
              <CardContent className="p-5">
                <div className="flex flex-col gap-1">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.12em]">
                    {kpi.label}
                  </p>
                  <p className="text-3xl font-bold text-[#0F172A] tracking-tighter tabular-nums transition-colors group-hover:text-black">
                    {kpi.value}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Total received summary */}
        <Card className="border-none bg-[#0F172A] shadow-xl shadow-slate-200 overflow-hidden relative">
          <div className="absolute top-0 right-0 h-full w-32 bg-[#D4A017]/10 blur-3xl rounded-full" />
          <CardContent className="p-8 relative z-10">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-[11px] font-bold text-[#D4A017] uppercase tracking-[0.2em] mb-1">Total Liquidity Received</p>
                <p className="text-4xl font-bold text-white tabular-nums tracking-tight">{formatCurrency(totalReceived)}</p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                <Plus className="h-6 w-6 text-[#D4A017]" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search and filters */}
        <Card>
          <CardContent className="pt-6">
            <ReceiptSearchAndFilter
              searchValue={searchTerm}
              onSearchChange={setSearchTerm}
              filterStatus={filterStatus}
              onFilterChange={setFilterStatus}
            />
          </CardContent>
        </Card>

        {/* Receipts table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              {filteredReceipts.length} Receipt{filteredReceipts.length !== 1 ? 's' : ''}
            </CardTitle>
          </CardHeader>
          <CardContent className="px-0">
            {filteredReceipts.length > 0 ? (
              <ReceiptTable
                receipts={filteredReceipts}
                onRowClick={handleRowClick}
              />
            ) : (
              <EmptyState
                icon={SearchX}
                title="No Receipts Found"
                description="We couldn't find any receipts matching your current filters. Try adjusting your search term or status filter."
                primaryAction={{
                  label: "Clear Filters",
                  onClick: () => {
                    setSearchTerm('')
                    setFilterStatus('all')
                  }
                }}
                className="py-12"
              />
            )}
          </CardContent>
        </Card>
      </div>

      {/* Receipt detail drawer */}
      <ReceiptDetail
        receipt={selectedReceipt}
        isOpen={isDetailOpen}
        onClose={handleCloseDetail}
      />
    </DashboardLayout>
  )
}
