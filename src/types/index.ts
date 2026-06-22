// Business entities
export interface Customer {
  id: string
  name: string
  businessName: string
  email: string
  phone: string
  industry?: string,
  address: string,
  outstandingBalance: number
  totalRevenue?: number
  lastActivity?: Date
  status: 'active' | 'inactive'
  createdAt: Date
}

export interface Invoice {
  id: string
  customerId: string
  invoiceNumber: string
  amount: number
  dueDate: Date
  status: 'paid' | 'pending' | 'overdue'
  description: string
  createdAt: Date
}

export interface Receipt {
  id: string
  customerId: string
  receiptNumber: string
  amount: number
  paymentMethod: 'cash' | 'bank_transfer' | 'mobile_money'
  date: Date
  invoiceId?: string
  customerName?: string
  status?: 'verified' | 'unverified' | 'pending_review'
}

export interface Transaction {
  id: string
  type: 'income' | 'expense'
  amount: number
  description: string
  date: Date
  category?: string
}

export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'user'
}

export interface DashboardStats {
  totalRevenue: number
  outstandingBalance: number
  totalCustomers: number
  totalInvoices: number
}
