'use client'
import { useState } from 'react'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/shared/Card'
import { Button } from '@/components/shared/Button'
import { InvoiceTable } from '@/components/invoices/InvoiceTable'
import { InvoiceSearchAndFilter } from '@/components/invoices/InvoiceSearchAndFilter'
import { InvoiceDetail } from '@/components/invoices/InvoiceDetail'
import { EmptyState } from '@/components/shared/EmptyState'
import { mockInvoices } from '@/mock-data'
import { Invoice } from '@/types'
import { Plus, SearchX } from 'lucide-react'

export default function InvoicesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'paid' | 'pending' | 'overdue'>('all')
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  const filteredInvoices = mockInvoices.filter((invoice) => {
    const matchesSearch =
      invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.description.toLowerCase().includes(searchTerm.toLowerCase())
    if (filterStatus === 'all') return matchesSearch
    return matchesSearch && invoice.status === filterStatus
  })

  const handleRowClick = (invoice: Invoice) => {
    setSelectedInvoice(invoice)
    setIsDetailOpen(true)
  }

  const handleCloseDetail = () => {
    setIsDetailOpen(false)
    setTimeout(() => setSelectedInvoice(null), 300)
  }

  return (
    <DashboardLayout title="Invoices">
      <div className="max-w-[1200px] mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-[#0F172A]">Revenue Operations</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Your Revenue Operations Center. Oversee billing, track payments, and manage collections.
            </p>
          </div>
          <Button variant="default" className="w-full sm:w-auto shadow-sm flex items-center justify-center gap-2">
            <Plus className="h-4 w-4 stroke-[3px]" />
            New Invoice
          </Button>
        </div>
        
        <Card className="border-none shadow-sm ring-1 ring-slate-100">
          <CardHeader>
            <CardTitle>Invoice Ledger</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Showing {filteredInvoices.length} invoices
            </p>
          </CardHeader>
          <CardContent>
            <InvoiceSearchAndFilter
              searchValue={searchTerm}
              onSearchChange={setSearchTerm}
              filterStatus={filterStatus}
              onFilterChange={setFilterStatus}
            />
            <div className="mt-6">
              {filteredInvoices.length > 0 ? (
                <InvoiceTable
                  invoices={filteredInvoices}
                  onRowClick={handleRowClick}
                />
              ) : (
                <EmptyState
                  icon={SearchX}
                  title="No Invoices Found"
                  description="We couldn't find any invoices matching your current filters. Try adjusting your search term or status filter."
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
            </div>
          </CardContent>
        </Card>

        <InvoiceDetail
          invoice={selectedInvoice}
          isOpen={isDetailOpen}
          onClose={handleCloseDetail}
        />
      </div>
    </DashboardLayout>
  )
}
