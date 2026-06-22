import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-MW', {
    style: 'currency',
    currency: 'MWK',
  }).format(amount)
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-MW', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date)
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

export function calculateCustomerMetrics(customerId: string, invoices: any[], receipts: any[]) {
  const customerInvoices = invoices.filter(inv => inv.customerId === customerId)
  const customerReceipts = receipts.filter(rec => rec.customerId === customerId)
  
  const totalRevenue = customerInvoices.reduce((sum, inv) => sum + inv.amount, 0)
  const totalPaid = customerReceipts.reduce((sum, rec) => sum + rec.amount, 0)
  const outstandingBalance = totalRevenue - totalPaid
  
  const paidInvoices = customerInvoices.filter(inv => inv.status === 'paid').length
  const overdueInvoices = customerInvoices.filter(inv => inv.status === 'overdue').length
  
  const lastActivity = customerReceipts.length > 0 
    ? new Date(Math.max(...customerReceipts.map(rec => new Date(rec.date).getTime())))
    : undefined
  
  return {
    totalRevenue,
    outstandingBalance,
    lastActivity,
    overdueInvoicesCount: overdueInvoices,
    totalInvoices: customerInvoices.length,
    totalPaidInvoices: paidInvoices,
  }
}
