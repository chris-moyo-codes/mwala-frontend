'use client'

import { useMemo } from 'react' // Removed useState as it's not directly used here
import { Customer } from '@/types'
import { Button } from '@/components/shared/Button'
import { formatCurrency, formatDate, cn } from '@/lib/utils'
import { X, Send, Printer, FileText, FileSpreadsheet, Download } from 'lucide-react'
import { useStatementExport } from '@/hooks/useStatementExport'
import { StatementTransaction } from '@/types/statement'

interface CustomerStatementProps {
  customer: Customer | null
  transactions: StatementTransaction[]
  isOpen: boolean
  onClose: () => void
  dateRange?: { from: Date; to: Date }
}

export function CustomerStatement({ customer, transactions, isOpen, onClose, dateRange }: CustomerStatementProps) {
  const { downloadPDF, downloadCSV, isPdfLoading, isCsvLoading } = useStatementExport()

  if (!isOpen || !customer) return null

  /**
   * Triggers the native browser print dialog.
   * The @media print CSS below handles visibility of document elements.
   */
  const handlePrint = () => {
    window.print()
  }

  const handleDownloadPDF = () => {
    downloadPDF(customer, transactions, closingBalance)
  }

  const handleDownloadCSV = () => {
    downloadCSV(customer, transactions)
  }

  // Memoized balance calculations to avoid expensive filter/reduce calls on every re-render
  const { totalDebits, totalCredits, closingBalance } = useMemo(() => {
    const debits = transactions.filter(t => t.type === 'debit').reduce((sum, t) => sum + t.amount, 0)
    const credits = transactions.filter(t => t.type === 'credit').reduce((sum, t) => sum + t.amount, 0)
    return { totalDebits: debits, totalCredits: credits, closingBalance: debits - credits }
  }, [transactions])

  return (
    <> {/* Fragment is correctly opened here */}
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #statement-document, #statement-document * { visibility: visible; }
          #statement-document { position: absolute; left: 0; top: 0; width: 100%; }
        }
      `}</style>
      
      <div className="fixed inset-0 bg-black/50 z-40 md:hidden no-print" onClick={onClose} aria-hidden="true" />

      <div className={cn(
        "fixed right-0 top-0 h-screen w-full sm:w-[500px] bg-white border-l border-[#E2E8F0] shadow-2xl z-50 transform transition-transform duration-300 overflow-y-auto no-print",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="sticky top-0 bg-white border-b border-[#E2E8F0] p-6 flex items-center justify-between z-20">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Statement Intelligence</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-xl transition-colors text-slate-400 hover:text-[#0F172A]">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 sm:p-8 space-y-8">
          <div id="statement-document" className="relative bg-white border border-slate-100 shadow-sm p-6 sm:p-8 rounded-sm overflow-hidden">
            {/* Premium Watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none -rotate-12 select-none z-0">
              <span className="text-9xl font-black tracking-tighter text-[#0F172A]">MWALA</span>
            </div>

            {/* Official Header */}
            <div className="relative z-10 flex justify-between items-start mb-12">
              <div className="space-y-1">
                <span className="text-xl font-black tracking-tighter text-[#0F172A]">
                  MWALA<span className="text-[#D4A017]">.</span>
                </span>
                <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Enterprise Finance System</p>
              </div>
              <div className="text-right">
                <h1 className="text-sm font-black text-[#0F172A] uppercase tracking-widest mb-1">Statement of Account</h1>
                <p className="text-[10px] font-bold text-slate-500 italic">
                  {dateRange ? `${formatDate(dateRange.from)} - ${formatDate(dateRange.to)}` : 'Current Period'}
                </p>
              </div>
            </div>

            {/* Customer Info Grid */}
            <div className="relative z-10 grid grid-cols-2 gap-8 mb-12 border-y border-slate-50 py-6">
              <div className="space-y-2">
                <p className="text-[9px] font-bold text-[#D4A017] uppercase tracking-widest">Account Holder</p>
                <div className="text-xs text-[#0F172A] space-y-1">
                  <p className="font-bold">{customer.name}</p>
                  <p className="text-slate-500">{customer.businessName}</p>
                  <p className="text-slate-500">{customer.email}</p>
                </div>
              </div>
              <div className="text-right space-y-2">
                <p className="text-[9px] font-bold text-[#D4A017] uppercase tracking-widest">Summary of Balances</p>
                <div className="text-xs text-[#0F172A] space-y-1 font-bold">
                  <p><span className="text-slate-400 font-medium">Total Invoiced:</span> {formatCurrency(totalDebits)}</p>
                  <p><span className="text-slate-400 font-medium">Total Paid:</span> {formatCurrency(totalCredits)}</p>
                </div>
              </div>
            </div>

            {transactions.length > 0 ? (
              <>
                {/* Ledger Table */}
                <div className="relative z-10 mb-12">
                  <table className="w-full text-[10px]">
                    <thead>
                      <tr className="border-b-2 border-[#0F172A] text-left">
                        <th className="py-2 font-bold text-[#0F172A] uppercase tracking-widest">Date</th>
                        <th className="py-2 font-bold text-[#0F172A] uppercase tracking-widest">Description</th>
                        <th className="py-2 text-right font-bold text-[#0F172A] uppercase tracking-widest">Debit</th>
                        <th className="py-2 text-right font-bold text-[#0F172A] uppercase tracking-widest">Credit</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {transactions.map((tx) => (
                        <tr key={tx.id}>
                          <td className="py-3 text-slate-500">{formatDate(tx.date)}</td>
                          <td className="py-3 font-medium text-[#0F172A]">{tx.description} <span className="text-[8px] text-slate-400 ml-1">({tx.reference})</span></td>
                          <td className="py-3 text-right font-semibold">{tx.type === 'debit' ? formatCurrency(tx.amount) : '-'}</td>
                          <td className="py-3 text-right font-semibold text-emerald-600">{tx.type === 'credit' ? formatCurrency(tx.amount) : '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Final Balance Card */}
                <div className="relative z-10 flex justify-between items-center bg-[#0F172A] p-6 rounded-lg shadow-lg">
                  <div className="space-y-1">
                    <p className="text-[9px] font-bold text-[#D4A017] uppercase tracking-widest">Outstanding Closing Balance</p>
                    <p className="text-2xl font-black text-white tabular-nums tracking-tighter">{formatCurrency(closingBalance)}</p>
                  </div>
                  <FileText className="h-8 w-8 text-[#D4A017] opacity-20" />
                </div>

                <div className="relative z-10 mt-8 text-center">
                  <p className="text-[8px] text-slate-400 italic">This statement is a system-generated reflection of the MWALA ledger as of {new Date().toLocaleDateString()}.</p>
                </div>
              </>
            ) : (
              <div className="relative z-10 py-20 text-center">
                <p className="text-sm text-slate-500">No transactions found for the selected period.</p>
              </div>
            )}
          </div>

          {/* Actions UI */}
          <div className="space-y-3 pt-4">
            <div className="grid grid-cols-2 gap-3">
              <Button variant="default" onClick={handlePrint} className="flex items-center justify-center gap-2 h-12">
                <Printer className="h-4 w-4" />
                Print / PDF
              </Button>
              <Button variant="secondary" className="flex items-center justify-center gap-2 h-12">
                <Send className="h-4 w-4" />
                Email Statement
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="secondary" 
                onClick={handleDownloadPDF} 
                className="flex items-center justify-center gap-2 h-12"
                disabled={isPdfLoading}
              >
                {isPdfLoading ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-400 border-t-transparent" />
                ) : (
                  <Download className="h-4 w-4" />
                )}
                {isPdfLoading ? 'Exporting...' : 'PDF Export'}
              </Button>
              <Button 
                variant="secondary" 
                onClick={handleDownloadCSV} 
                className="flex items-center justify-center gap-2 h-12"
                disabled={isCsvLoading}
              >
                {isCsvLoading ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-400 border-t-transparent" />
                ) : (
                  <FileSpreadsheet className="h-4 w-4" />
                )}
                {isCsvLoading ? 'Exporting...' : 'CSV Export'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}