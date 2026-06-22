export interface StatementTransaction {
  id: string // Unique identifier for the transaction
  date: Date
  description: string
  reference: string
  amount: number
  type: 'debit' | 'credit'
}