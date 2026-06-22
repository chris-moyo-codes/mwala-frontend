'use client'

import React, { useState, useMemo } from 'react'
import { 
  ChevronUp, 
  ChevronDown, 
  Search, 
  Download, 
  Settings2,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  CheckSquare,
  Square
} from 'lucide-react'
import { Button } from './Button'
import { Input } from './Input'
import { cn } from '@/lib/utils'

export interface Column<T> {
  header: string
  accessorKey: keyof T | string
  cell?: (item: T) => React.ReactNode
  sortable?: boolean
  align?: 'left' | 'center' | 'right'
}

interface AdvancedTableProps<T> {
  data: T[]
  columns: Column<T>[]
  onRowClick?: (item: T) => void
  searchPlaceholder?: string
  searchableKeys?: (keyof T | string)[]
  onExport?: (data: T[]) => void
  bulkActions?: {
    label: string
    onClick: (selectedItems: T[]) => void
    variant?: 'default' | 'destructive' | 'secondary'
  }[]
  selectedRowId?: string | number
  keyExtractor: (item: T) => string | number
}

export function AdvancedTable<T>({ 
  data, 
  columns, 
  onRowClick, 
  searchPlaceholder = "Search...",
  searchableKeys = [],
  onExport,
  bulkActions = [],
  selectedRowId,
  keyExtractor
}: AdvancedTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' } | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [selectedIds, setSelectedIds] = useState<Set<string | number>>(new Set())

  // Filter
  const filteredData = useMemo(() => {
    if (!searchQuery) return data
    const lowerQuery = searchQuery.toLowerCase()
    return data.filter(item => {
      return searchableKeys.some(key => {
        const val = (item as any)[key]
        return val && String(val).toLowerCase().includes(lowerQuery)
      })
    })
  }, [data, searchQuery, searchableKeys])

  // Sort
  const sortedData = useMemo(() => {
    if (!sortConfig) return filteredData
    return [...filteredData].sort((a: any, b: any) => {
      const aVal = a[sortConfig.key]
      const bVal = b[sortConfig.key]
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortConfig.direction === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal)
      }
      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1
      return 0
    })
  }, [filteredData, sortConfig])

  // Pagination
  const totalPages = Math.ceil(sortedData.length / pageSize)
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return sortedData.slice(start, start + pageSize)
  }, [sortedData, currentPage, pageSize])

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc'
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
  }

  const toggleSelectAll = () => {
    if (selectedIds.size === paginatedData.length) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(paginatedData.map(keyExtractor)))
    }
  }

  const toggleSelectRow = (id: string | number) => {
    const newSet = new Set(selectedIds)
    if (newSet.has(id)) newSet.delete(id)
    else newSet.add(id)
    setSelectedIds(newSet)
  }

  return (
    <div className="w-full bg-[#111B31] border border-[#263043] rounded-xl overflow-hidden shadow-2xl">
      
      {/* Table Toolbar */}
      <div className="p-4 border-b border-[#263043] flex flex-col sm:flex-row gap-4 items-center justify-between bg-[#161F38]">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <Input 
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            className="pl-9 bg-[#0B1220] border-[#263043] text-sm h-9 focus:border-[#E0B03B] text-white"
          />
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto no-scrollbar">
          {selectedIds.size > 0 && bulkActions.length > 0 && (
            <div className="flex items-center gap-2 pr-4 border-r border-[#263043] animate-in fade-in slide-in-from-right-4">
              <span className="text-xs font-bold text-[#E0B03B] whitespace-nowrap">{selectedIds.size} selected</span>
              {bulkActions.map((action, i) => (
                <Button 
                  key={i} 
                  variant={action.variant || 'secondary'} 
                  size="sm" 
                  className="h-8 text-xs font-bold"
                  onClick={() => action.onClick(data.filter(d => selectedIds.has(keyExtractor(d))))}
                >
                  {action.label}
                </Button>
              ))}
            </div>
          )}
          <Button variant="ghost" size="sm" className="h-9 px-3 text-slate-400 hover:text-white hover:bg-[#263043]">
            <Settings2 className="h-4 w-4 mr-2" />
            <span className="text-xs font-bold">Columns</span>
          </Button>
          {onExport && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-9 px-3 text-slate-400 hover:text-white hover:bg-[#263043]"
              onClick={() => onExport(sortedData)}
            >
              <Download className="h-4 w-4 mr-2" />
              <span className="text-xs font-bold">Export</span>
            </Button>
          )}
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto min-h-[400px]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#263043] bg-[#0B1220]">
              {bulkActions.length > 0 && (
                <th className="p-4 w-12">
                  <button onClick={toggleSelectAll} className="text-slate-400 hover:text-[#E0B03B]">
                    {selectedIds.size === paginatedData.length && paginatedData.length > 0 ? (
                      <CheckSquare className="h-4 w-4 text-[#E0B03B]" />
                    ) : (
                      <Square className="h-4 w-4" />
                    )}
                  </button>
                </th>
              )}
              {columns.map((col, i) => (
                <th 
                  key={i} 
                  className={cn(
                    "p-4 text-[10px] font-bold text-slate-400 uppercase tracking-[0.1em] whitespace-nowrap select-none",
                    col.sortable !== false ? "cursor-pointer hover:text-white" : "",
                    col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'
                  )}
                  onClick={() => col.sortable !== false && handleSort(String(col.accessorKey))}
                >
                  <div className={cn("flex items-center gap-1.5", col.align === 'right' && "justify-end")}>
                    {col.header}
                    {sortConfig?.key === col.accessorKey && (
                      sortConfig.direction === 'asc' ? <ChevronUp className="h-3 w-3 text-[#E0B03B]" /> : <ChevronDown className="h-3 w-3 text-[#E0B03B]" />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (bulkActions.length > 0 ? 1 : 0)} className="p-8 text-center text-slate-500 text-sm">
                  No records found.
                </td>
              </tr>
            ) : (
              paginatedData.map((item, rowIndex) => {
                const id = keyExtractor(item)
                const isSelected = selectedIds.has(id)
                const isRowActive = selectedRowId === id

                return (
                  <tr 
                    key={id}
                    onClick={() => onRowClick?.(item)}
                    className={cn(
                      "border-b border-[#263043]/50 transition-colors group",
                      onRowClick ? "cursor-pointer hover:bg-[#161F38]" : "",
                      isSelected ? "bg-[#161F38]/50" : "",
                      isRowActive ? "bg-[#161F38] border-l-2 border-l-[#E0B03B]" : "border-l-2 border-l-transparent"
                    )}
                  >
                    {bulkActions.length > 0 && (
                      <td className="p-4" onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => toggleSelectRow(id)} className="text-slate-500 hover:text-[#E0B03B]">
                          {isSelected ? <CheckSquare className="h-4 w-4 text-[#E0B03B]" /> : <Square className="h-4 w-4 group-hover:text-slate-400" />}
                        </button>
                      </td>
                    )}
                    {columns.map((col, colIndex) => (
                      <td 
                        key={colIndex} 
                        className={cn(
                          "p-4 text-sm text-slate-300",
                          col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'
                        )}
                      >
                        {col.cell ? col.cell(item) : String((item as any)[col.accessorKey] || '')}
                      </td>
                    ))}
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-4 border-t border-[#263043] bg-[#0B1220] flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
          <span>Rows per page:</span>
          <select 
            value={pageSize}
            onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}
            className="bg-[#111B31] border border-[#263043] rounded px-2 py-1 text-white focus:outline-none focus:border-[#E0B03B]"
          >
            {[10, 20, 50].map(v => <option key={v} value={v}>{v}</option>)}
          </select>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-xs text-slate-400 font-medium">
            Page {currentPage} of {Math.max(1, totalPages)}
          </span>
          <div className="flex items-center gap-1">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="h-8 w-8 p-0 text-slate-400 hover:text-white disabled:opacity-50"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="h-8 w-8 p-0 text-slate-400 hover:text-white disabled:opacity-50"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
