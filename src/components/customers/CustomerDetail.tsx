'use client'

import { useState, useMemo, useEffect } from 'react'
import { Customer, Invoice, Receipt } from '@/types'
import { StatementTransaction } from '@/types/statement'
import { Button } from '@/components/shared/Button'
import { Input } from '@/components/shared/Input'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { formatCurrency, formatDate, cn } from '@/lib/utils'
import { 
  X, 
  FileText, 
  TrendingUp, 
  ShieldCheck, 
  Clock, 
  MessageSquare, 
  Mail, 
  Phone, 
  MapPin,
  ArrowUpRight, // Used for new invoice
  Plus, // Used for new invoice
  Search
} from 'lucide-react'
import { CustomerStatement } from './CustomerStatement'
import { mockInvoices, mockReceipts } from '@/mock-data'

/**
 * Maps raw invoice and receipt data to a unified StatementTransaction format.
 * Extracted to ensure the "Mwala Intelligence" layer is testable and reliable.
 */
export function mapTransactionsToStatement(
  customer: Customer,
  invoices: Invoice[],
  receipts: Receipt[],
  dateRange: { from: string; to: string }
): StatementTransaction[] {
  const fromDate = dateRange.from ? new Date(dateRange.from) : null
  const toDate = dateRange.to ? new Date(dateRange.to) : null
  if (toDate) toDate.setHours(23, 59, 59, 999)

  const customerInvoices = invoices
    .filter((inv: any) => inv.customerId === customer.id)
    .map((inv: any) => ({
      id: inv.id,
      date: new Date(inv.createdAt),
      description: inv.description,
      reference: inv.invoiceNumber,
      amount: inv.amount,
      type: 'debit' as const
    }))
    .filter((inv) => {
      if (fromDate && inv.date < fromDate) return false
      if (toDate && inv.date > toDate) return false
      return true
    })

  const customerReceipts = receipts
    .filter((rec: any) => rec.customerId === customer.id || rec.customerName === customer.name)
    .map((rec: any) => ({
      id: rec.id,
      date: new Date(rec.date),
      description: `Payment via ${rec.paymentMethod.replace('_', ' ')}`,
      reference: rec.receiptNumber,
      amount: rec.amount,
      type: 'credit' as const
    }))
    .filter((rec) => {
      if (fromDate && rec.date < fromDate) return false
      if (toDate && rec.date > toDate) return false
      return true
    })

  return [...customerInvoices, ...customerReceipts].sort((a, b) => b.date.getTime() - a.date.getTime())
}

interface CustomerDetailProps {
  customer: Customer | null
  isOpen: boolean
  onClose: () => void
}

type DetailTab = 'overview' | 'invoices' | 'receipts' | 'activity' | 'notes'

export function CustomerDetail({ customer, isOpen, onClose }: CustomerDetailProps) {
  const [isStatementOpen, setIsStatementOpen] = useState(false)
  const [dateRange, setDateRange] = useState({ from: '', to: '' })
  const [activeTab, setActiveTab] = useState<DetailTab>('overview')
  const [activityFilter, setActivityFilter] = useState<'all' | 'invoices' | 'payments'>('all')
  const [docSearch, setDocSearch] = useState('')
  const [invStatusFilter, setInvStatusFilter] = useState<'all' | 'paid' | 'pending' | 'overdue'>('all')
  const [recMethodFilter, setRecMethodFilter] = useState<'all' | 'cash' | 'bank_transfer' | 'mobile_money'>('all')

  useEffect(() => {
    setDocSearch('');
    setInvStatusFilter('all');
    setRecMethodFilter('all');
    setActivityFilter('all');
  }, [customer])

  const transactions = useMemo(() => {
    if (!customer) return []
    return mapTransactionsToStatement(customer, mockInvoices as any, mockReceipts as any, dateRange)
  }, [customer, dateRange])

  const { customerInvoices, customerReceipts } = useMemo(() => {
    if (!customer) return { customerInvoices: [], customerReceipts: [] }
    
    const invs = mockInvoices.filter((i: any) => i.customerId === customer.id)
    const recs = mockReceipts.filter((r: any) => r.customerId === customer.id || r.customerName === customer.name)
    
    return {
      customerInvoices: invs,
      customerReceipts: recs,
    }
  }, [customer])

  const filteredActivity = useMemo(() => {
    return transactions.filter(tx => {
      if (activityFilter === 'all') return true
      if (activityFilter === 'invoices') return tx.type === 'debit'
      if (activityFilter === 'payments') return tx.type === 'credit'
      return true
    })
  }, [transactions, activityFilter])

  const filteredInvoices = useMemo(() => {
    return customerInvoices.filter((inv: any) => {
      const matchesSearch = inv.invoiceNumber.toLowerCase().includes(docSearch.toLowerCase()) || 
                           inv.description.toLowerCase().includes(docSearch.toLowerCase())
      const matchesStatus = invStatusFilter === 'all' || inv.status === invStatusFilter
      return matchesSearch && matchesStatus
    })
  }, [customerInvoices, docSearch, invStatusFilter])

  const filteredReceipts = useMemo(() => {
    return customerReceipts.filter((rec: any) => {
      const matchesSearch = rec.receiptNumber.toLowerCase().includes(docSearch.toLowerCase())
      const matchesMethod = recMethodFilter === 'all' || rec.paymentMethod === recMethodFilter
      return matchesSearch && matchesMethod
    })
  }, [customerReceipts, docSearch, recMethodFilter])

  const statementPeriod = useMemo(() => {
    if (!dateRange.from || !dateRange.to) return undefined;
    return {
      from: new Date(dateRange.from),
      to: new Date(dateRange.to)
    }
  }, [dateRange])
  
  // Calculate last payment date for overview tab
  const lastPaymentDate = useMemo(() => {
    const lastReceipt = customerReceipts.length > 0
      ? customerReceipts.reduce((latest, current) => {
          return new Date(current.date) > new Date(latest.date) ? current : latest;
        })
      : null;
    
    return lastReceipt ? new Date(lastReceipt.date) : null;
  }, [customerReceipts]);

  // Calculate collection performance for overview tab
  const collectionPerformancePercentage = useMemo(() => {
    if (customerInvoices.length === 0) return 'N/A';
    const paidCount = customerInvoices.filter((inv: any) => inv.status === 'paid').length;
    const percentage = (paidCount / customerInvoices.length) * 100;
    if (isNaN(percentage)) return 'N/A';
    return `${percentage.toFixed(1)}% Paid`;
  }, [customerInvoices]);

  if (!isOpen || !customer) return null

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40 md:hidden no-print"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer/Modal */}
      <div
        className={`fixed right-0 top-0 h-screen w-full sm:w-96 bg-[#0B1220] border-l border-[#263043] shadow-2xl z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } overflow-y-auto no-print`}
      >
        <div className="sticky top-0 bg-[#111B31] border-b border-[#263043] p-6 flex items-center justify-between z-10">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Customer Intelligence Center</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#161F38] rounded-xl transition-colors text-slate-400 hover:text-white"
            aria-label="Close details"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-8 space-y-8">
          {/* Profile Identity */}
          <div className="space-y-4">
            <div>
              <h3 className="text-3xl font-bold text-white tracking-tighter leading-none">{customer.name}</h3>
              <p className="text-sm font-medium text-slate-400 mt-1">{customer.businessName}</p>
            </div>
            <div className="flex items-center gap-4">
              <StatusBadge status={customer.status} />
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                <Clock className="h-3 w-3 text-slate-500" />
                Active since {formatDate(customer.createdAt)}
              </div>
            </div>
          </div>

          {/* Executive Insights Layer */}
          <div className="grid grid-cols-1 gap-4">
            <div className="p-4 bg-[#111B31] border border-[#263043] rounded-2xl relative overflow-hidden shadow-xl shadow-black/50 group transition-all hover:-translate-y-1">
               <div className="absolute top-0 right-0 h-full w-24 bg-[#E0B03B]/10 blur-2xl rounded-full" />
               <div className="relative z-10 flex justify-between items-center">
                 <div className="space-y-1">
                   <p className="text-[9px] font-bold text-[#E0B03B] uppercase tracking-[0.2em]">Health Status</p>
                   <p className="text-2xl font-bold text-white tracking-tight capitalize">{(customer as any)?.healthStatus ? (customer as any).healthStatus.replace('_', ' ') : 'Active'}</p>
                 </div>
                 <ShieldCheck className="h-8 w-8 text-[#E0B03B] opacity-40" />
               </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-[#161F38] rounded-2xl border border-[#263043]">
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Lifetime Revenue</p>
                <p className="text-sm font-bold text-white tabular-nums">
                  {formatCurrency((customer.totalRevenue || 0))}
                </p>
              </div>
              <div className="p-4 bg-[#161F38] rounded-2xl border border-[#263043]">
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Outstanding Balance</p>
                <p className="text-sm font-bold text-[#EF4444] tabular-nums">
                  {formatCurrency(customer.outstandingBalance)}
                </p>
              </div>
              <div className="p-4 bg-[#161F38] rounded-2xl border border-[#263043]">
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Last Payment</p>
                <p className="text-sm font-bold text-white">
                  {lastPaymentDate ? formatDate(lastPaymentDate) : 'N/A'}
                </p>
              </div>
              <div className="p-4 bg-[#161F38] rounded-2xl border border-[#263043]">
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Payment Reliability</p>
                <p className="text-sm font-bold text-white">
                  {collectionPerformancePercentage}
                </p>
               </div>
            </div>
          </div>

          {/* Activity Navigation (Tabs) */}
          <div className="space-y-6">
            <div className="flex items-center gap-1 border-b border-slate-50 overflow-x-auto no-scrollbar">
              {(['overview', 'invoices', 'receipts', 'activity', 'notes'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "px-4 py-2 text-[10px] font-bold uppercase tracking-[0.1em] transition-all whitespace-nowrap",
                    activeTab === tab 
                      ? "text-[#0F172A] border-b-2 border-[#D4A017]" 
                      : "text-slate-400 hover:text-[#0F172A]"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content Area */}
            <div className="min-h-[200px]">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-bold text-[#0F172A] uppercase tracking-widest">Primary Contact</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-3 text-slate-600">
                        <Mail className="h-4 w-4 text-slate-300" />
                        {customer.email}
                      </div>
                      <div className="flex items-center gap-3 text-slate-600">
                        <Phone className="h-4 w-4 text-slate-300" />
                        {customer.phone}
                      </div>
                      <div className="flex items-start gap-3 text-slate-600">
                        <MapPin className="h-4 w-4 text-slate-300 mt-0.5" />
                        {customer.address}
                      </div>
                    </div>
                  </div>

                  {/* Statement Period Picker */}
                  <div className="space-y-3 border-t border-[#E2E8F0] pt-6">
                    <div className="flex items-center justify-between">
                      <h4 className="text-[10px] font-bold text-[#0F172A] uppercase tracking-widest">Statement Period</h4>
                      {(dateRange.from || dateRange.to) && (
                        <button 
                          onClick={() => setDateRange({ from: '', to: '' })}
                          className="text-[10px] font-bold text-[#D4A017] hover:text-[#b88a14] uppercase tracking-widest transition-colors"
                        >
                          Reset
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <Input 
                        type="date" 
                        value={dateRange.from} 
                        onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value }))}
                        className="h-8 text-[10px]"
                      />
                      <Input 
                        type="date" 
                        value={dateRange.to} 
                        onChange={(e) => setDateRange(prev => ({ ...prev, to: e.target.value }))}
                        className="h-8 text-[10px]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'invoices' && (
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
                    <Input
                      placeholder="Search invoices..."
                      value={docSearch}
                      onChange={(e) => setDocSearch(e.target.value)}
                      className="pl-9 h-9 text-[10px]"
                    />
                  </div>
                  <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
                    {(['all', 'paid', 'pending', 'overdue'] as const).map((status) => (
                      <button
                        key={status}
                        onClick={() => setInvStatusFilter(status)}
                        className={cn(
                          "px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider border transition-all whitespace-nowrap",
                          invStatusFilter === status
                            ? "bg-[#0F172A] text-white border-[#0F172A]"
                            : "bg-white text-slate-400 border-slate-100 hover:border-slate-200"
                        )}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                  <div className="space-y-3">
                    {filteredInvoices.length > 0 ? filteredInvoices.map((inv: any) => (
                      <div key={inv.id} className="p-3 rounded-xl bg-slate-50 ring-1 ring-slate-100 flex items-center justify-between group hover:ring-[#D4A017]/30 transition-all">
                        <div>
                          <p className="text-xs font-bold text-[#0F172A]">{inv.invoiceNumber}</p>
                          <p className="text-[10px] text-slate-400">{formatDate(inv.createdAt)}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-bold text-[#0F172A]">{formatCurrency(inv.amount)}</p>
                          <StatusBadge status={inv.status} className="h-4 px-1.5 text-[8px] mt-1" />
                        </div>
                      </div>
                    )) : (
                      <p className="text-center py-8 text-xs text-slate-400 italic">No matching invoices found.</p>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'receipts' && (
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
                    <Input
                      placeholder="Search receipts..."
                      value={docSearch}
                      onChange={(e) => setDocSearch(e.target.value)}
                      className="pl-9 h-9 text-[10px]"
                    />
                  </div>
                  <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
                    {(['all', 'cash', 'bank_transfer', 'mobile_money'] as const).map((method) => (
                      <button
                        key={method}
                        onClick={() => setRecMethodFilter(method)}
                        className={cn(
                          "px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider border transition-all whitespace-nowrap",
                          recMethodFilter === method
                            ? "bg-[#0F172A] text-white border-[#0F172A]"
                            : "bg-white text-slate-400 border-slate-100 hover:border-slate-200"
                        )}
                      >
                        {method.replace('_', ' ')}
                      </button>
                    ))}
                  </div>
                  <div className="space-y-3">
                    {filteredReceipts.length > 0 ? filteredReceipts.map((rec: any) => (
                      <div key={rec.id} className="p-3 rounded-xl bg-slate-50 ring-1 ring-slate-100 flex items-center justify-between group hover:ring-[#D4A017]/30 transition-all">
                        <div>
                          <p className="text-xs font-bold text-[#0F172A]">{rec.receiptNumber}</p>
                          <p className="text-[10px] text-slate-400">{formatDate(rec.date)}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-bold text-emerald-600">+{formatCurrency(rec.amount)}</p>
                          <p className="text-[9px] text-slate-400 uppercase font-bold mt-1">{rec.paymentMethod.replace('_', ' ')}</p>
                        </div>
                      </div>
                    )) : (
                      <p className="text-center py-8 text-xs text-slate-400 italic">No matching receipts found.</p>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'activity' && (
                <div className="space-y-6">
                  {/* Activity Filters */}
                  <div className="flex gap-2">
                    {(['all', 'invoices', 'payments'] as const).map((filter) => (
                      <button
                        key={filter}
                        onClick={() => setActivityFilter(filter)}
                        className={cn(
                          "px-3 py-1 text-[9px] font-bold uppercase tracking-wider rounded-full ring-1 ring-inset transition-all",
                          activityFilter === filter
                            ? "bg-[#0F172A] text-white ring-[#0F172A]"
                            : "text-slate-400 ring-slate-200 hover:ring-slate-300"
                        )}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>

                  <div className="relative pl-4 space-y-8 before:absolute before:left-0 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
                    {filteredActivity.length > 0 ? filteredActivity.map((tx) => (
                      <div key={tx.id} className="relative group">
                        <div className={cn(
                          "absolute -left-[21px] top-1.5 h-3 w-3 rounded-full border-2 border-white ring-4 ring-white transition-transform group-hover:scale-125",
                          tx.type === 'debit' ? "bg-slate-300" : "bg-[#D4A017]"
                        )} />
                        <div className="space-y-1">
                          <p className="text-xs font-bold text-[#0F172A]">{tx.description}</p>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{tx.reference}</span>
                            <span className="text-[10px] text-slate-300">•</span>
                            <span className="text-[10px] text-slate-400">{formatDate(tx.date)}</span>
                          </div>
                          <p className={cn("text-xs font-bold pt-1", tx.type === 'debit' ? "text-slate-600" : "text-emerald-600")}>
                            {tx.type === 'debit' ? '-' : '+'}{formatCurrency(tx.amount)}
                          </p>
                        </div>
                      </div>
                    )) : (
                      <p className="text-xs text-slate-400 italic">No historical activity found for this filter.</p>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'notes' && (
                <div className="space-y-4">
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-slate-300" />
                    <textarea 
                      className="w-full bg-slate-50 border-none ring-1 ring-slate-100 rounded-2xl p-3 pl-10 text-xs focus:ring-[#D4A017] min-h-[100px] outline-none transition-all"
                      placeholder="Add a private note about this business relationship..."
                    />
                  </div>
                  <Button variant="secondary" className="w-full text-[10px] font-bold uppercase tracking-widest">Save Internal Note</Button>
                </div>
              )}
            </div>
          </div>

          {/* Global Actions Panel */}
          <div className="space-y-3 pt-6 border-t border-slate-50">
             <div className="flex items-center justify-between mb-2">
               <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Intelligence Controls</h4>
             </div>
             <div className="grid grid-cols-2 gap-3">
               <Button 
                 variant="default" 
                 className="h-11 shadow-lg shadow-slate-200"
                 onClick={() => setIsStatementOpen(true)}
               >
                 <FileText className="h-4 w-4 mr-2" />
                 Statement
               </Button>
               <Button variant="secondary" className="h-11">
                 <ArrowUpRight className="h-4 w-4 mr-2" />
                 New Invoice
               </Button>
             </div>
             <Button variant="ghost" className="w-full h-11 text-red-600 hover:bg-red-50">Archive Relationship</Button>
          </div>
        </div>
      </div>

      {/* Statement Drawer */}
      <CustomerStatement
        customer={customer}
        transactions={transactions}
        dateRange={statementPeriod}
        isOpen={isStatementOpen}
        onClose={() => setIsStatementOpen(false)}
      />
    </>
  )
}
