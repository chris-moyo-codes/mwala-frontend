'use client'

import { useState, useEffect, useRef, useMemo, useCallback, MouseEvent } from 'react'
import { useRouter } from 'next/navigation'
import { X, Search, Users, FileText, Receipt, Clock, ChevronRight } from 'lucide-react'
import { Input } from '@/components/shared/Input'
import { cn, formatDate, formatCurrency } from '@/lib/utils'
import { mockCustomers, mockInvoices, mockReceipts } from '@/mock-data'

interface GlobalSearchProps {
  isOpen: boolean
  onClose: () => void
}

const RECENT_SEARCHES_KEY = 'mwala_recent_searches'

interface SearchResult {
  id: string
  type: 'customer' | 'invoice' | 'receipt'
  title: string
  subtitle: string
  icon: React.ElementType
  href: string
  score: number
}

function getRecentSearches(): string[] {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(RECENT_SEARCHES_KEY)
    return stored ? JSON.parse(stored) : []
  }
  return []
}

function saveRecentSearches(searches: string[]) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(searches))
  }
}

export function GlobalSearch({ isOpen, onClose }: GlobalSearchProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeIndex, setActiveIndex] = useState(-1)
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  const [recentSearches, setRecentSearches] = useState<string[]>(getRecentSearches())

  useEffect(() => {
    saveRecentSearches(recentSearches)
  }, [recentSearches])

  // Combine and filter mock data
  const allResults = useMemo(() => {
    if (!searchTerm) return []

    const query = searchTerm.toLowerCase().trim()
    const queryWords = query.split(/\s+/).filter(Boolean)

    /**
     * Weighted Relevance Scoring
     * Exact Match: 100
     * Starts With: 80
     * Substring Match: 40
     * Word Match: 10
     * Fuzzy Sequence: 5
     */
    const calculateScore = (title: string, subtitle: string): number => {
      const t = title.toLowerCase()
      const s = subtitle.toLowerCase()
      let score = 0

      if (t === query) score += 100
      else if (t.startsWith(query)) score += 80
      else if (t.includes(query)) score += 40

      if (s.includes(query)) score += 20

      // Multi-word matching
      queryWords.forEach(word => {
        if (t.includes(word)) score += 10
        if (s.includes(word)) score += 5
      })

      // Simplified Fuzzy Sequence match
      if (score === 0) {
        let i = 0, j = 0
        while (i < t.length && j < query.length) {
          if (t[i] === query[j]) j++
          i++
        }
        if (j === query.length) score += 5
      }

      return score
    }

    const customerResults: SearchResult[] = mockCustomers
      .map(c => {
        const score = calculateScore(c.name, c.businessName + ' ' + c.email)
        return {
          id: c.id,
          type: 'customer' as const,
          title: c.name,
          subtitle: c.businessName,
          icon: Users,
          href: `/dashboard/customers?id=${c.id}`,
          score
        }
      })
      .filter(r => r.score > 0)

    const invoiceResults: SearchResult[] = mockInvoices
      .map(i => {
        const score = calculateScore(i.invoiceNumber, i.description)
        return {
          id: i.id,
          type: 'invoice' as const,
          title: i.invoiceNumber,
          subtitle: `${i.description} - ${formatCurrency(i.amount)}`,
          icon: FileText,
          href: `/dashboard/invoices?id=${i.id}`,
          score
        }
      })
      .filter(r => r.score > 0)

    const receiptResults: SearchResult[] = mockReceipts
      .map(r => {
        const score = calculateScore(r.receiptNumber, r.paymentMethod)
        return {
          id: r.id,
          type: 'receipt' as const,
          title: r.receiptNumber,
          subtitle: `${formatCurrency(r.amount)} via ${r.paymentMethod.replace('_', ' ')}`,
          icon: Receipt,
          href: `/dashboard/receipts?id=${r.id}`,
          score
        }
      })
      .filter(r => r.score > 0)

    return [...customerResults, ...invoiceResults, ...receiptResults].sort((a, b) => b.score - a.score)
  }, [searchTerm])

  // Group results by type
  const groupedResults = useMemo(() => {
    const groups: Record<string, SearchResult[]> = {}
    // Iterating through sorted results ensures groups themselves are prioritized by their best match
    allResults.forEach(result => {
      if (!groups[result.type]) groups[result.type] = []
      groups[result.type].push(result)
    })
    return groups
  }, [allResults])

  const flatResults = useMemo(() => Object.values(groupedResults).flat(), [groupedResults])

  // Keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return

    if (e.key === 'Escape') {
      onClose()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (flatResults.length > 0) {
        setActiveIndex(prev => (prev + 1) % flatResults.length)
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (flatResults.length > 0) {
        setActiveIndex(prev => (prev - 1 + flatResults.length) % flatResults.length)
      }
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (activeIndex !== -1 && flatResults[activeIndex]) {
        const selectedResult = flatResults[activeIndex]
        handleSelectResult(selectedResult)
      }
    }
  }, [isOpen, onClose, flatResults, activeIndex, router])

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
      setActiveIndex(-1) // Reset active index when opening
      window.addEventListener('keydown', handleKeyDown)
    } else {
      window.removeEventListener('keydown', handleKeyDown)
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, handleKeyDown])

  // Scroll active item into view
  useEffect(() => {
    if (resultsRef.current && activeIndex !== -1) {
      const activeElement = resultsRef.current.children[activeIndex] as HTMLElement
      activeElement?.scrollIntoView({ block: 'nearest' })
    }
  }, [activeIndex])

  const handleSelectResult = (result: SearchResult) => {
    router.push(result.href)
    setRecentSearches(prev => {
      const newRecents = [result.title, ...prev.filter(s => s !== result.title)].slice(0, 5)
      return newRecents
    })
    onClose()
  }

  const handleRecentSearchClick = (query: string) => {
    setSearchTerm(query)
    inputRef.current?.focus()
  }

  const handleClearRecentSearch = (e: MouseEvent, queryToRemove: string) => {
    e.stopPropagation() // Prevent triggering the parent onClick
    const updatedRecents = recentSearches.filter(q => q !== queryToRemove)
    setRecentSearches(updatedRecents)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-8 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col">
        {/* Search Input */}
        <div className="relative flex items-center p-4 border-b border-slate-100">
          <Search className="h-5 w-5 text-slate-400 absolute left-4" />
          <Input
            ref={inputRef}
            placeholder="Search customers, invoices, receipts..."
            className="w-full pl-12 pr-10 py-3 text-base border-none focus:ring-0 focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={onClose} className="absolute right-4 p-1 rounded-full hover:bg-slate-50 text-slate-400">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Search Results / Recent Searches */}
        <div className="flex-1 overflow-y-auto p-4 max-h-[calc(100vh-160px)]" ref={resultsRef}>
          {searchTerm === '' ? (
            // Recent Searches
            <div className="space-y-4">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">Recent Searches</p>
              <div className="space-y-1 divide-y divide-slate-50">
                {recentSearches.map((query, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 cursor-pointer group"
                    onClick={() => handleRecentSearchClick(query)}
                  >
                    <div className="flex items-center gap-3">
                      <Clock className="h-4 w-4 text-slate-400" />
                      <span className="text-sm font-medium text-[#0F172A]">{query}</span>
                    </div>
                    <button 
                      onClick={(e) => handleClearRecentSearch(e, query)}
                      className="p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-red-500 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            // Search Results
            Object.keys(groupedResults).length > 0 ? (
              <div className="space-y-6">
                {Object.entries(groupedResults).map(([type, results], typeIndex) => (
                  <div key={type} className="first:mt-0 mt-4"> {/* Add margin to separate groups */}
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 px-2">{type}s</p>
                    <div className="space-y-1">
                      {results.map((result, index) => {
                        const absoluteIndex = flatResults.findIndex(r => r.id === result.id && r.type === result.type);
                        const Icon = result.icon;
                        return (
                          <div
                            key={result.id}
                            className={cn(
                              "flex items-center justify-between px-2 py-2 rounded-lg cursor-pointer group",
                              absoluteIndex === activeIndex ? 'bg-[#0F172A] text-white' : 'hover:bg-slate-50'
                            )}
                            onClick={() => handleSelectResult(result)}
                          >
                            <div className="flex items-center gap-3">
                              <Icon className={cn("h-4 w-4", absoluteIndex === activeIndex ? 'text-white' : 'text-slate-400 group-hover:text-[#0F172A]')} />
                              <div>
                                <p className={cn("text-sm font-medium", absoluteIndex === activeIndex ? 'text-white' : 'text-[#0F172A] group-hover:text-black')}>{result.title}</p>
                                <p className={cn("text-xs", absoluteIndex === activeIndex ? 'text-slate-300' : 'text-slate-500')}>{result.subtitle}</p>
                              </div>
                            </div>
                            <ChevronRight className={cn("h-4 w-4", absoluteIndex === activeIndex ? 'text-white' : 'text-slate-300 group-hover:text-[#D4A017]')} />
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-10 text-center text-slate-500">
                No results found for "{searchTerm}".
              </div>
            )
          )}
        </div>
      </div>
    </div>
  )
}