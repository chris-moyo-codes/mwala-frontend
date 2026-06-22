'use client'

import { v4 as uuidv4 } from 'uuid'
import { useState, useMemo } from 'react'
import { toast } from 'react-toastify'
import { Invoice } from '@/types'
import { useNotificationStore } from '@/hooks/notification-store'
import { Button } from '@/components/shared/Button'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { formatCurrency, formatDate, cn } from '@/lib/utils'
import { X, Download, Send, CreditCard, Building2, Smartphone, Copy, Check } from 'lucide-react'
import { mockCustomers } from '@/mock-data'

interface InvoiceDetailProps {
  invoice: Invoice | null
  isOpen: boolean
  onClose: () => void
  className?: string
}

export function InvoiceDetail({ invoice, isOpen, onClose, className = '' }: InvoiceDetailProps) {
  const [copiedText, setCopiedText] = useState<string | null>(null)
  const addNotification = useNotificationStore((state) => state.addNotification);

  const customer = useMemo(() => {
    return mockCustomers.find(c => c.id === invoice?.customerId) || {
      name: "Unknown Customer", email: "", phone: "", address: "", businessName: ""
    };
  }, [invoice]);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedText(text)
      toast.success('Copied to clipboard!', { autoClose: 1500 })
      setTimeout(() => setCopiedText(null), 1500)
    } catch (err) {
      toast.error('Failed to copy to clipboard.')
    }
  }

  if (!isOpen || !invoice) return null

  const daysUntilDue = Math.ceil(
    (new Date(invoice.dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  )

  const handleDownloadPDF = () => {
    toast.info('Generating PDF...', { autoClose: 1500 });
    console.log('Downloading PDF for invoice:', invoice?.invoiceNumber);
  }

  const handleSendInvoice = () => {
    toast.success('Invoice sent to customer!', { autoClose: 1500 });
    console.log('Sending invoice:', invoice?.invoiceNumber);
  }

  const handleRecordPayment = () => {
    toast.success('Payment recorded!', { autoClose: 1500 });
    addNotification({
      id: uuidv4(),
      type: 'invoice_paid',
      message: `Invoice ${invoice?.invoiceNumber} from ${customer.name} has been paid.`,
      timestamp: new Date(),
      read: false,
    });
    console.log('Recording payment for invoice:', invoice?.invoiceNumber);
  }

  return (
    <>
      <style jsx global>{`
        @media print {
          body * { visibility: hidden; }
          #invoice-document, #invoice-document * { visibility: visible; }
          #invoice-document { 
            position: absolute; 
            left: 0; 
            top: 0; 
            width: 100%; 
            border: none !important; 
            box-shadow: none !important; 
          }
        }
      `}</style>

      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden no-print"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer/Modal */}
      <div
        className={`fixed right-0 top-0 h-screen w-full sm:w-96 bg-[#0B1220] border-l border-[#263043] shadow-2xl z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } overflow-y-auto ${className}`}
      >
        <div className="sticky top-0 bg-[#111B31] border-b border-[#263043] p-6 flex items-center justify-between">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Financial Intelligence</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#161F38] rounded-xl transition-colors text-slate-400 hover:text-white"
            aria-label="Close details"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-8 space-y-8" id="invoice-document">
          {/* Invoice header */}
          <div>
            <h3 className="text-3xl font-bold text-white tracking-tighter mb-4">
              {invoice.invoiceNumber}
            </h3>
            <div className="flex items-center justify-between">
              <StatusBadge status={invoice.status} />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                {daysUntilDue > 0 && `Due in ${daysUntilDue} days`}
                {daysUntilDue === 0 && 'Due today'}
                {daysUntilDue < 0 && `${Math.abs(daysUntilDue)} days overdue`}
              </span>
            </div>
          </div>

          {/* Premium Watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none -rotate-12 select-none z-0">
            <span className="text-9xl font-black tracking-tighter text-white">MWALA</span>
          </div>

          {/* Customer Info */}
          <div className="relative z-10 space-y-2 border-b border-[#263043] pb-6">
            <p className="text-[9px] font-bold text-[#E0B03B] uppercase tracking-widest">Billed To</p>
            <div className="text-sm text-white space-y-1">
              <p className="font-bold">{customer.name}</p>
              {customer.businessName && <p className="text-slate-400">{customer.businessName}</p>}
              {customer.email && <p className="text-slate-400">{customer.email}</p>}
              {customer.phone && <p className="text-slate-400">{customer.phone}</p>}
              {customer.address && <p className="text-slate-400">{customer.address}</p>}
            </div>
          </div>

          {/* Invoice details */}
          <div className="space-y-4 text-sm">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Description</p>
              <p className="text-white font-semibold">{invoice.description}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Created</p>
                <p className="text-white font-semibold">{formatDate(invoice.createdAt)}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Due Date</p>
                <p className="text-white font-semibold">{formatDate(invoice.dueDate)}</p>
              </div>
            </div>
          </div>

          {/* Amount section */}
          <div className="bg-[#111B31] border border-[#263043] p-6 rounded-2xl space-y-2 relative overflow-hidden shadow-xl shadow-black/50">
            <div className="absolute top-0 right-0 h-full w-24 bg-[#E0B03B]/10 blur-2xl rounded-full" />
            <p className="text-[10px] font-bold text-[#E0B03B] uppercase tracking-[0.2em] relative z-10">Total Amount Due</p>
            <div className="flex justify-between items-end relative z-10">
              <span className="text-3xl font-bold text-white tabular-nums tracking-tighter">
                {formatCurrency(invoice.amount)}
              </span>
              <CreditCard className="h-5 w-5 text-[#E0B03B] opacity-50" />
            </div>
          </div>

          {/* Settlement Instructions */}
          <div className="space-y-4 pt-4 border-t border-[#263043]">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Settlement Instructions</h4>
            <div className="grid gap-3">
              {/* Bank Transfer */}
              <div className="p-4 bg-[#161F38] rounded-xl border border-[#263043] flex items-start gap-3">
                <Building2 className="h-4 w-4 text-[#E0B03B] mt-0.5" />
                <div className="space-y-1">
                  <p className="text-xs font-bold text-white">Bank Transfer</p>
                  <div className="text-[10px] text-slate-400 space-y-0.5">
                    <p>Standard Bank • Mwala Business</p>
                    <div className="flex items-center gap-2">
                      <p className="font-mono">Account: 90812233445</p>
                      <button 
                        onClick={() => copyToClipboard('90812233445')}
                        className="p-1 hover:bg-[#263043] rounded transition-colors text-slate-500 hover:text-[#E0B03B]"
                        title="Copy account number"
                      >
                        {copiedText === '90812233445' ? <Check className="h-3 w-3 text-[#22C55E]" /> : <Copy className="h-3 w-3" />}
                      </button>
                    </div>
                    <p>Branch: Lilongwe Corporate</p>
                  </div>
                </div>
              </div>

              {/* Mobile Money */}
              <div className="p-4 bg-[#161F38] rounded-xl border border-[#263043] flex items-start gap-3">
                <Smartphone className="h-4 w-4 text-[#E0B03B] mt-0.5" />
                <div className="space-y-1">
                  <p className="text-xs font-bold text-white">Mobile Money</p>
                  <div className="text-[10px] text-slate-400 space-y-0.5">
                    <p>Airtel Money / TNM Mpamba</p>
                    <div className="flex items-center gap-2">
                      <p className="font-mono">Number: +265 888 123 456</p>
                      <button 
                        onClick={() => copyToClipboard('+265 888 123 456')}
                        className="p-1 hover:bg-[#263043] rounded transition-colors text-slate-500 hover:text-[#E0B03B]"
                        title="Copy mobile number"
                      >
                        {copiedText === '+265 888 123 456' ? <Check className="h-3 w-3 text-[#22C55E]" /> : <Copy className="h-3 w-3" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3 pt-4">
            <Button
              variant="default"
              className="w-full flex items-center justify-center gap-2 h-12 bg-[#E0B03B] hover:bg-[#c99a2c] text-[#0B1220] font-bold border-none"
              onClick={handleDownloadPDF}
            >
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
            <Button
              variant="secondary"
              className="w-full flex items-center justify-center gap-2 h-12 bg-[#161F38] hover:bg-[#263043] text-white border-[#263043]"
              onClick={handleSendInvoice}
            >
              <Send className="h-4 w-4" />
              Send Invoice
            </Button>
            <Button
              variant={invoice.status === 'pending' ? 'accent' : 'subtle'}
              onClick={invoice.status === 'pending' || invoice.status === 'overdue' ? handleRecordPayment : undefined}
              className={cn(
                "w-full h-12",
                invoice.status === 'pending' || invoice.status === 'overdue'
                  ? "bg-[#22C55E] hover:bg-[#16a34a] text-white border-none"
                  : "bg-[#161F38] text-slate-400 border-[#263043]"
              )}
            >
              {invoice.status === 'pending' || invoice.status === 'overdue' ? 'Mark as Paid' : 'Edit Invoice'}
            </Button>
          </div>

          {/* Additional info */}
          <div className="pt-4 border-t border-[#263043]">
            <p className="text-xs text-slate-500">
              Invoice ID: <span className="font-mono text-slate-300">{invoice.id}</span>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
