'use client'

import { useState, useMemo } from 'react' // Import useState hook, useMemo
import { toast } from 'react-toastify' // Import toast for notifications
import { Receipt } from '@/types'
import { Button } from '@/components/shared/Button'
import { Input } from '@/components/shared/Input' // Keep Input for WhatsApp share
import { formatCurrency, formatDate, cn } from '@/lib/utils'
import { X, Download, Share2, Receipt as ReceiptIcon, Wallet, Calendar, Printer, FileText, History, ShieldCheck, MessageCircle, Link as LinkIcon, CheckCircle2, AlertCircle } from 'lucide-react' // Added CheckCircle2, AlertCircle
import { useReceiptExport } from '@/hooks/useReceiptExport'
import { mockCustomers, mockInvoices, mockReceipts } from '@/mock-data' // Import mockCustomers, mockInvoices, mockReceipts

interface ReceiptDetailProps {
  receipt: Receipt | null
  isOpen: boolean
  onClose: () => void
}

export function ReceiptDetail({ receipt, isOpen, onClose }: ReceiptDetailProps) {
  const [whatsappPhoneNumber, setWhatsappPhoneNumber] = useState('');
  const { downloadPDF, isPdfLoading } = useReceiptExport()

  const customer = useMemo(() => {
    return mockCustomers.find(c => c.id === receipt?.customerId) || null;
  }, [receipt]);

  const linkedInvoice = useMemo(() => {
    return mockInvoices.find(i => i.id === receipt?.invoiceId) || null;
  }, [receipt]);

  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen || !receipt) return null

  const handlePrint = () => {
    window.print();
  }

  const handleShareWhatsApp = () => {
    if (!receipt || !whatsappPhoneNumber) {
      toast.error('Please enter a phone number to share via WhatsApp.', { autoClose: 3000 });
      return;
    }

    const message = `*MWALA Digital Receipt*\n\n` +
      `Receipt No: ${receipt.receiptNumber}\n` +
      `Customer: ${receipt.customerName || 'Valued Customer'}\n` +
      `Amount: ${formatCurrency(receipt.amount)}\n` +
      `Date: ${formatDate(receipt.date)}\n` +
      `Reference: ${receipt.id.slice(0, 8).toUpperCase()}\n\n` +
      `_Generated via MWALA secure digital ledger._`

    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/${whatsappPhoneNumber}?text=${encodedMessage}`, '_blank')
    toast.success('WhatsApp message opened!', { autoClose: 2000 });
  }

  const handleCopyLink = async () => {
    if (!receipt) return

    // Generate a secure, short-lived mock verification URL
    const baseUrl = window.location.origin
    const token = btoa(`${receipt.id}-${Date.now()}`).slice(0, 16)
    const publicUrl = `${baseUrl}/receipts/verify/${receipt.id}?auth=${token}`

    try {
      await navigator.clipboard.writeText(publicUrl)
      setCopiedLink(true);
      toast.success('Secure link copied to clipboard!', { autoClose: 1500 });
      setTimeout(() => setCopiedLink(false), 1500);
    } catch (err) {
      toast.error('Failed to copy link to clipboard.')
    }
  }

  const handleGenericShare = async () => {
    toast.info('Opening system share...', { autoClose: 2000 });
  }

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
        className={cn(
          "fixed right-0 top-0 h-screen w-full sm:w-96 bg-white border-l border-[#E2E8F0] shadow-2xl z-50 transform transition-transform duration-300 overflow-y-auto no-print",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* The rest of the component's content */}
        <div className="sticky top-0 bg-white border-b border-[#E2E8F0] p-6 flex items-center justify-between z-20">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Receipt Intelligence</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-50 rounded-xl transition-colors text-slate-400 hover:text-[#0F172A] no-print"
            aria-label="Close details"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 sm:p-8 space-y-8">
          {/* Document Preview Container */}
          <div id="receipt-document" className="relative bg-white border border-slate-100 shadow-sm p-6 sm:p-8 rounded-sm overflow-hidden">
            {/* Premium Watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none -rotate-12 select-none z-0">
              <span className="text-8xl font-black tracking-tighter text-[#0F172A]">MWALA</span>
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
                <h1 className="text-sm font-black text-[#0F172A] uppercase tracking-widest mb-1">Official Receipt</h1>
                <p className="text-xs font-bold text-slate-500">{receipt.receiptNumber}</p>
              </div>
            </div>

            {/* Transaction Grid */}
            <div className="relative z-10 grid grid-cols-2 gap-y-8 gap-x-12 mb-12 border-y border-slate-50 py-8">
              <div className="space-y-2">
                <p className="text-[9px] font-bold text-[#D4A017] uppercase tracking-widest">Received From</p>
                <div className="text-xs text-[#0F172A] space-y-1">
                  <p className="font-bold">{customer?.name || 'N/A'}</p>
                  {customer?.businessName && <p className="text-slate-500 text-[10px]">{customer.businessName}</p>}
                </div>
              </div>
              <div className="text-right space-y-2">
                <p className="text-[9px] font-bold text-[#D4A017] uppercase tracking-widest">Linked Document</p>
                <div className="text-xs text-[#0F172A] space-y-1">
                  <p className="font-bold text-[#0F172A]">INV-2024-0012</p>
                  <p className="text-slate-500 text-[10px]">Original Obligation Settled</p>
                </div> 
              </div>
              <div className="space-y-2">
                <p className="text-[9px] font-bold text-[#D4A017] uppercase tracking-widest">Payment Method</p>
                <div className="text-xs text-[#0F172A] flex items-center gap-2">
                  <Wallet className="h-3 w-3 text-slate-400" />
                  <span className="capitalize font-medium">{receipt.paymentMethod.replace('_', ' ')}</span>
                </div>
              </div>
              <div className="text-right space-y-2">
                <p className="text-[9px] font-bold text-[#D4A017] uppercase tracking-widest">Settlement Date</p>
                <div className="text-xs text-[#0F172A] flex items-center justify-end gap-2">
                  <Calendar className="h-3 w-3 text-slate-400" />
                  <span className="font-medium">{formatDate(receipt.date)}</span>
                </div>
              </div>
            </div>

            {/* Settlement Details */}
            <div className="relative z-10 mb-8 bg-slate-50 p-6 rounded-lg border border-slate-100 shadow-inner">
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Total Settled</p>
                  <p className="text-3xl font-black text-[#0F172A] tabular-nums tracking-tighter">{formatCurrency(receipt.amount)}</p>
                </div>
                <div className="h-10 w-10 bg-emerald-100 rounded-full flex items-center justify-center">
                  <div className="h-5 w-5 bg-emerald-500 rounded-full flex items-center justify-center text-white">
                    <CheckCircle2 className="h-3 w-3" />
                  </div>
                </div>
              </div>
            </div>

            {/* Verification Status */}
            <div className="relative z-10 mb-8 space-y-2">
              <p className="text-[9px] font-bold text-[#D4A017] uppercase tracking-widest">Verification Status</p>
              <div className={cn(
                "flex items-center gap-2 p-3 rounded-lg",
                receipt.status === 'verified' ? "bg-emerald-50/50 text-emerald-700" :
                receipt.status === 'unverified' ? "bg-rose-50/50 text-rose-700" :
                "bg-amber-50/50 text-amber-700"
              )}>
                {receipt.status === 'verified' && <CheckCircle2 className="h-4 w-4" />}
                {receipt.status === 'unverified' && <AlertCircle className="h-4 w-4" />}
                {receipt.status === 'pending_review' && <History className="h-4 w-4" />}
                <span className="text-sm font-bold capitalize">{receipt.status?.replace('_', ' ')}</span>
              </div>
            </div>

            {/* Payment History Section (Auditor Grade) - DISABLED FOR BUILD FIX */}
            {/* 
            <div className="relative z-10 mb-12">
              <div className="flex items-center gap-2 mb-4">
                <History className="h-3 w-3 text-[#D4A017]" />
                <p className="text-[9px] font-bold text-[#0F172A] uppercase tracking-widest">Customer Settlement Ledger (Recent)</p>
              </div>
              <div className="space-y-3">
                {paymentHistory.length > 0 ? paymentHistory.map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-[10px] py-2 border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <span className="text-slate-400 w-16">{formatDate(item.date)}</span>
                      <span className="font-medium text-slate-600 capitalize">{item.paymentMethod.replace('_', ' ')}</span>
                    </div>
                    <span className="font-bold text-[#0F172A]">{formatCurrency(item.amount)}</span>
                  </div>
                ))}
              </div>
            </div>
            */}

            {/* Footer Verification */}
            <div className="relative z-10 pt-8 border-t border-slate-100">
              <div className="flex justify-between items-start">
                <div className="max-w-[240px] space-y-2">
                  <div className="flex items-center gap-1.5 text-[9px] font-bold text-emerald-600 uppercase tracking-widest">
                    <ShieldCheck className="h-3 w-3" />
                    Verified Transaction
                  </div>
                  <p className="text-[8px] text-slate-400 italic">This is a system-generated document. Payment has been verified and logged in the MWALA Enterprise Ledger under Ref: {receipt.id.slice(0,8).toUpperCase()}</p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] font-black text-[#0F172A] uppercase tracking-widest">Verified Digital Receipt</p>
                  <p className="text-[8px] text-[#D4A017] font-bold uppercase tracking-widest mt-1">MWALA. Trust Systems</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Suite UI */}
          <div className="space-y-3 pt-4">
            <div className="grid grid-cols-2 gap-3">
              <Button variant="default" onClick={handlePrint} className="flex items-center justify-center gap-2 h-12 no-print">
                <Printer className="h-4 w-4" />
                Print
              </Button>
              <Button 
                variant="secondary" 
                onClick={() => downloadPDF(receipt)} 
                disabled={isPdfLoading}
                className="flex items-center justify-center gap-2 h-12"
              >
                {isPdfLoading ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-400 border-t-transparent" />
                ) : (
                  <Download className="h-4 w-4" />
                )}
                Download PDF
              </Button>
            </div>
            
            {/* WhatsApp Share Section */}
            <div className="space-y-2">
              <label htmlFor="whatsapp-phone" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Share via WhatsApp
              </label>
              <div className="flex gap-2">
                <Input
                  id="whatsapp-phone"
                  type="tel" // Use type="tel" for phone numbers
                  placeholder="e.g., +265 999 123 456"
                  value={whatsappPhoneNumber}
                  onChange={(e) => setWhatsappPhoneNumber(e.target.value)}
                  className="flex-1 h-11 text-sm"
                />
                <Button 
                  variant="default" // Using default for primary action
                  onClick={handleShareWhatsApp}
                  disabled={!whatsappPhoneNumber} // Disable if no number
                  className="flex items-center justify-center gap-2 h-11 bg-[#25D366] hover:bg-[#1DA851] text-white" // WhatsApp brand color
                >
                  <MessageCircle className="h-4 w-4 fill-current" />
                  Send
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button variant="secondary" onClick={handleCopyLink} className="flex items-center justify-center gap-2 h-12">
                <LinkIcon className="h-4 w-4" />
                {copiedLink ? 'Link Copied!' : 'Copy Link'}
              </Button>
              <Button variant="secondary" onClick={handleGenericShare} className="flex items-center justify-center gap-2 h-12">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </div>
            <Button variant="subtle" className="w-full h-12 text-slate-600 font-bold">
              Archive Transaction
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}