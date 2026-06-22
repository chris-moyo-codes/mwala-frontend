'use client'
// Import necessary React hooks and types
import { useState } from 'react'
import { Customer } from '@/types'
import { StatementTransaction } from '@/types/statement'
import { formatCurrency, formatDate } from '@/lib/utils'

export function useStatementExport() {
  const [isPdfLoading, setIsPdfLoading] = useState(false)
  const [isCsvLoading, setIsCsvLoading] = useState(false)

  const downloadPDF = async (
    customer: Customer,
    transactions: StatementTransaction[],
    closingBalance: number
  ) => {
    if (!customer || isPdfLoading) return
    setIsPdfLoading(true)

    try {
      const { jsPDF } = await import('jspdf')
      // @ts-ignore - jspdf-autotable extends jsPDF types internally
      const autoTable = (await import('jspdf-autotable')).default
      
      const doc = new jsPDF()
      
      // MWALA Branding - Institutional Colors
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(24)
      doc.setTextColor(15, 23, 42) // Deep Navy #0F172A
      doc.text('MWALA.', 20, 20)
      
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(8)
      doc.setTextColor(100, 116, 139) // Slate-400
      doc.text('ENTERPRISE FINANCE SYSTEM', 20, 26)

      doc.setFont('helvetica', 'bold')
      doc.setFontSize(14)
      doc.setTextColor(15, 23, 42)
      doc.text('Statement of Account', 190, 20, { align: 'right' })

      // Customer & Account Details
      doc.setFontSize(9)
      doc.setTextColor(212, 160, 23) // Premium Gold #D4A017
      doc.text('ACCOUNT HOLDER', 20, 45)
      doc.setTextColor(15, 23, 42)
      doc.setFontSize(10)
      doc.text(customer.name, 20, 52)
      doc.setFont('helvetica', 'normal')
      doc.text(customer.businessName, 20, 58)
      doc.text(customer.email, 20, 64)

      doc.setFont('helvetica', 'bold')
      doc.setFontSize(9)
      doc.setTextColor(212, 160, 23)
      doc.text('CLOSING BALANCE', 190, 45, { align: 'right' })
      doc.setTextColor(15, 23, 42)
      doc.setFontSize(18)
      doc.text(formatCurrency(closingBalance), 190, 55, { align: 'right' })

      // Ledger Content
      const tableData = transactions.map(tx => [
        formatDate(tx.date),
        tx.description,
        tx.reference,
        tx.type === 'debit' ? formatCurrency(tx.amount) : '-',
        tx.type === 'credit' ? formatCurrency(tx.amount) : '-'
      ])

      autoTable(doc, {
        startY: 80,
        head: [['Date', 'Description', 'Reference', 'Debit', 'Credit']],
        body: tableData,
        headStyles: { fillColor: [15, 23, 42], textColor: [255, 255, 255], fontStyle: 'bold' },
        alternateRowStyles: { fillColor: [248, 250, 252] },
        margin: { left: 20, right: 20 },
        theme: 'striped'
      })

      doc.save(`Statement_${customer.name.replace(/\s+/g, '_')}.pdf`)
    } catch (error) {
      console.error('PDF Generation Error:', error)
    } finally {
      setIsPdfLoading(false)
    }
  }

  const downloadCSV = (customer: Customer, transactions: StatementTransaction[]) => {
    const headers = ['Date', 'Description', 'Reference', 'Debit', 'Credit']
    const rows = transactions.map((tx) => [
      formatDate(tx.date),
      tx.description,
      tx.reference,
      tx.type === 'debit' ? tx.amount : '',
      tx.type === 'credit' ? tx.amount : '',
    ])

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.map(cell => `"${cell}"`).join(',')),
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.setAttribute('href', url)
    link.setAttribute('download', `Statement_${customer.name.replace(/\s+/g, '_')}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const generateCSV = (customer: Customer, transactions: StatementTransaction[]) => {
    if (!customer || isCsvLoading) return
    setIsCsvLoading(true)

    setTimeout(() => {
      try {
        downloadCSV(customer, transactions)
      } catch (error) {
        console.error('CSV Generation Error:', error)
      } finally {
        setIsCsvLoading(false)
      }
    }, 10)
  }

  return {
    downloadPDF,
    downloadCSV: generateCSV,
    isPdfLoading,
    isCsvLoading
  }
}