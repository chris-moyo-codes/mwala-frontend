import { describe, it, expect } from 'vitest'
import { mapTransactionsToStatement } from './CustomerDetail'
import { Customer } from '@/types'

describe('CustomerDetail Data Mapping Intelligence', () => {
  const mockCustomer: Customer = {
    id: 'cust-123',
    name: 'Banda Logistics',
    businessName: 'Banda Logistics Ltd',
    email: 'info@banda.mw',
    phone: '+265 888 123 456',
    address: 'Lilongwe, Area 4',
    outstandingBalance: 500000,
    status: 'active',
    createdAt: new Date('2023-01-01T00:00:00Z'),
  }

  const mockInvoices: any[] = [
    {
      id: 'inv-1',
      customerId: 'cust-123',
      invoiceNumber: 'INV-001',
      amount: 150000,
      description: 'Monthly Logistics Support',
      createdAt: '2023-05-10T10:00:00Z',
    },
    {
      id: 'inv-2',
      customerId: 'other-cust',
      invoiceNumber: 'INV-002',
      amount: 200000,
      description: 'Should not appear',
      createdAt: '2023-05-11T10:00:00Z',
    }
  ]

  const mockReceipts: any[] = [
    {
      id: 'rec-1',
      customerId: 'cust-123',
      receiptNumber: 'REC-001',
      amount: 50000,
      paymentMethod: 'bank_transfer',
      date: '2023-05-12T14:00:00Z',
    }
  ]

  it('should accurately map invoices to Debit transactions', () => {
    const result = mapTransactionsToStatement(mockCustomer, mockInvoices, [], { from: '', to: '' })
    
    expect(result).toHaveLength(1)
    expect(result[0]).toMatchObject({
      id: 'inv-1',
      reference: 'INV-001',
      amount: 150000,
      type: 'debit',
      description: 'Monthly Logistics Support'
    })
    expect(result[0].date).toBeInstanceOf(Date)
  })

  it('should accurately map receipts to Credit transactions', () => {
    const result = mapTransactionsToStatement(mockCustomer, [], mockReceipts, { from: '', to: '' })
    
    expect(result).toHaveLength(1)
    expect(result[0]).toMatchObject({
      id: 'rec-1',
      reference: 'REC-001',
      amount: 50000,
      type: 'credit',
      description: 'Payment via bank transfer'
    })
  })

  it('should sort transactions in descending chronological order', () => {
    const result = mapTransactionsToStatement(mockCustomer, mockInvoices, mockReceipts, { from: '', to: '' })
    
    expect(result).toHaveLength(2)
    expect(result[0].id).toBe('rec-1') // May 12th comes before May 10th in desc order
    expect(result[1].id).toBe('inv-1')
  })

  it('should respect the date range filter in the intelligence layer', () => {
    const result = mapTransactionsToStatement(mockCustomer, mockInvoices, mockReceipts, { 
      from: '2023-05-11', 
      to: '2023-05-13' 
    })
    
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('rec-1')
  })
})