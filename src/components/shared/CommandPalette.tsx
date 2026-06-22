'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Command } from 'cmdk'
import { 
  Users, 
  FileText, 
  Receipt, 
  Search, 
  Plus, 
  Settings, 
  CreditCard,
  Building2,
  PieChart
} from 'lucide-react'
import { cn } from '@/lib/utils'

export function CommandPalette({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const router = useRouter()
  const [search, setSearch] = useState('')

  // Toggle the menu when ⌘K is pressed
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        isOpen ? onClose() : null // The navbar handles opening it, this can just act as a safeguard
      }
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const runCommand = (command: () => void) => {
    onClose()
    command()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] sm:pt-[20vh] bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="w-full max-w-2xl bg-[#0B1220] rounded-xl shadow-2xl border border-[#263043] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <Command 
          label="Global Command Menu"
          className="flex flex-col w-full h-full"
          shouldFilter={true}
        >
          <div className="flex items-center border-b border-[#263043] px-4">
            <Search className="h-5 w-5 text-slate-400 mr-2" />
            <Command.Input 
              value={search}
              onValueChange={setSearch}
              autoFocus
              placeholder="Type a command or search..."
              className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-white placeholder-slate-500 py-4 text-base"
            />
            <div className="hidden sm:flex items-center gap-1">
              <span className="text-[10px] font-bold text-slate-500 bg-[#161F38] px-1.5 py-0.5 rounded border border-[#263043]">ESC</span>
            </div>
          </div>

          <Command.List className="max-h-[60vh] overflow-y-auto p-2 scroll-smooth">
            <Command.Empty className="py-10 text-center text-sm text-slate-500">
              No results found for "{search}".
            </Command.Empty>

            <Command.Group heading="Quick Actions" className="px-2 py-3">
              <Command.Item 
                onSelect={() => runCommand(() => router.push('/dashboard/customers/new'))}
                className="flex items-center gap-3 px-3 py-3 rounded-lg cursor-pointer aria-selected:bg-[#E0B03B] aria-selected:text-[#0B1220] text-slate-300 hover:bg-[#161F38] group transition-colors"
              >
                <Users className="h-4 w-4 group-aria-selected:text-[#0B1220] text-slate-400" />
                <span className="font-medium">Create Customer</span>
              </Command.Item>
              <Command.Item 
                onSelect={() => runCommand(() => router.push('/dashboard/invoices/new'))}
                className="flex items-center gap-3 px-3 py-3 rounded-lg cursor-pointer aria-selected:bg-[#E0B03B] aria-selected:text-[#0B1220] text-slate-300 hover:bg-[#161F38] group transition-colors"
              >
                <FileText className="h-4 w-4 group-aria-selected:text-[#0B1220] text-slate-400" />
                <span className="font-medium">Create Invoice</span>
              </Command.Item>
              <Command.Item 
                onSelect={() => runCommand(() => router.push('/dashboard/receipts/new'))}
                className="flex items-center gap-3 px-3 py-3 rounded-lg cursor-pointer aria-selected:bg-[#E0B03B] aria-selected:text-[#0B1220] text-slate-300 hover:bg-[#161F38] group transition-colors"
              >
                <Plus className="h-4 w-4 group-aria-selected:text-[#0B1220] text-slate-400" />
                <span className="font-medium">Record Payment</span>
              </Command.Item>
            </Command.Group>

            <Command.Separator className="h-px bg-[#263043] mx-2 my-1" />

            <Command.Group heading="Navigation" className="px-2 py-3">
              <Command.Item 
                onSelect={() => runCommand(() => router.push('/dashboard/customers'))}
                className="flex items-center gap-3 px-3 py-3 rounded-lg cursor-pointer aria-selected:bg-[#161F38] aria-selected:text-white text-slate-300 hover:bg-[#161F38] group transition-colors"
              >
                <Building2 className="h-4 w-4 group-aria-selected:text-[#E0B03B] text-slate-400" />
                <span className="font-medium">Customer Directory</span>
              </Command.Item>
              <Command.Item 
                onSelect={() => runCommand(() => router.push('/dashboard/invoices'))}
                className="flex items-center gap-3 px-3 py-3 rounded-lg cursor-pointer aria-selected:bg-[#161F38] aria-selected:text-white text-slate-300 hover:bg-[#161F38] group transition-colors"
              >
                <Receipt className="h-4 w-4 group-aria-selected:text-[#E0B03B] text-slate-400" />
                <span className="font-medium">Invoices & Estimates</span>
              </Command.Item>
              <Command.Item 
                onSelect={() => runCommand(() => router.push('/dashboard/reports'))}
                className="flex items-center gap-3 px-3 py-3 rounded-lg cursor-pointer aria-selected:bg-[#161F38] aria-selected:text-white text-slate-300 hover:bg-[#161F38] group transition-colors"
              >
                <PieChart className="h-4 w-4 group-aria-selected:text-[#E0B03B] text-slate-400" />
                <span className="font-medium">Financial Reports</span>
              </Command.Item>
              <Command.Item 
                onSelect={() => runCommand(() => router.push('/dashboard/settings'))}
                className="flex items-center gap-3 px-3 py-3 rounded-lg cursor-pointer aria-selected:bg-[#161F38] aria-selected:text-white text-slate-300 hover:bg-[#161F38] group transition-colors"
              >
                <Settings className="h-4 w-4 group-aria-selected:text-[#E0B03B] text-slate-400" />
                <span className="font-medium">Business Settings</span>
              </Command.Item>
            </Command.Group>
            
          </Command.List>
        </Command>
      </div>
    </div>
  )
}
