'use client'

import React, { useState } from 'react'
import { Zap, TrendingUp, AlertTriangle, CheckCircle2, ChevronRight, X, Sparkles, RefreshCw } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface Insight {
  id: string
  type: 'opportunity' | 'risk' | 'trend' | 'success'
  title: string
  body: string
  action?: {
    label: string
    href: string
  }
  confidence?: number // 0-100
}

interface InsightsSidebarProps {
  insights: Insight[]
  isOpen: boolean
  onClose: () => void
  onRefresh?: () => void
}

const TYPE_CONFIG: Record<Insight['type'], { icon: typeof Zap, color: string, bg: string, label: string }> = {
  opportunity: { icon: Zap, color: 'text-[#E0B03B]', bg: 'bg-[#E0B03B]/10', label: 'Opportunity' },
  risk:        { icon: AlertTriangle, color: 'text-[#EF4444]', bg: 'bg-[#EF4444]/10', label: 'Risk Alert' },
  trend:       { icon: TrendingUp, color: 'text-[#3B82F6]', bg: 'bg-[#3B82F6]/10', label: 'Market Trend' },
  success:     { icon: CheckCircle2, color: 'text-[#22C55E]', bg: 'bg-[#22C55E]/10', label: 'Milestone' },
}

export function InsightsSidebar({ insights, isOpen, onClose, onRefresh }: InsightsSidebarProps) {
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
      onRefresh?.()
    }, 1500)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="relative w-full max-w-sm bg-[#0B1220] border-l border-[#263043] shadow-2xl flex flex-col h-full overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-[#111B31] border-b border-[#263043] p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative h-8 w-8">
                <div className="absolute inset-0 bg-[#E0B03B]/20 blur-lg rounded-full" />
                <div className="relative h-8 w-8 rounded-xl bg-[#0B1220] border border-[#263043] flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-[#E0B03B]" />
                </div>
              </div>
              <div>
                <h2 className="text-sm font-bold text-white">MWALA Intelligence</h2>
                <p className="text-[10px] text-slate-400">{insights.length} active signals</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleRefresh}
                className="p-2 rounded-lg hover:bg-[#161F38] text-slate-400 hover:text-white transition-colors"
              >
                <RefreshCw className={cn("h-4 w-4", isRefreshing && "animate-spin")} />
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-[#161F38] text-slate-400 hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* AI Model Badge */}
          <div className="mt-3 flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-[#22C55E] shadow-[0_0_6px_rgba(34,197,94,0.8)]" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              MWALA AI Engine • Real-time Analysis
            </span>
          </div>
        </div>

        {/* Insights List */}
        <div className="flex-1 p-4 space-y-4">
          {insights.map((insight) => {
            const config = TYPE_CONFIG[insight.type]
            const Icon = config.icon

            return (
              <div
                key={insight.id}
                className="bg-[#111B31] border border-[#263043] rounded-2xl p-5 space-y-3 hover:border-slate-500 transition-all group"
              >
                {/* Type Badge */}
                <div className="flex items-center justify-between">
                  <div className={cn("flex items-center gap-1.5 px-2 py-1 rounded-lg", config.bg)}>
                    <Icon className={cn("h-3 w-3", config.color)} />
                    <span className={cn("text-[9px] font-bold uppercase tracking-widest", config.color)}>
                      {config.label}
                    </span>
                  </div>
                  {insight.confidence !== undefined && (
                    <span className="text-[9px] font-bold text-slate-500">
                      {insight.confidence}% confidence
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-sm font-bold text-white leading-snug">{insight.title}</h3>

                {/* Body */}
                <p className="text-xs text-slate-400 leading-relaxed">{insight.body}</p>

                {/* Action */}
                {insight.action && (
                  <a
                    href={insight.action.href}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E0B03B] hover:text-white transition-colors group-hover:gap-2"
                  >
                    {insight.action.label}
                    <ChevronRight className="h-3 w-3" />
                  </a>
                )}
              </div>
            )
          })}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-[#0B1220] border-t border-[#263043] p-4">
          <p className="text-[10px] text-center text-slate-600 leading-relaxed">
            Insights are generated from your financial data and updated in real-time. MWALA AI does not make financial decisions on your behalf.
          </p>
        </div>
      </div>
    </div>
  )
}

// Convenience hook for default insights
export const DEFAULT_INSIGHTS: Insight[] = [
  {
    id: 'ins-1',
    type: 'opportunity',
    title: 'Revenue Velocity Spike Detected',
    body: 'Your revenue collection rate increased 14% this month. This signals strong cash flow health — ideal for unlocking trade credit or overdraft facilities.',
    action: { label: 'View Revenue Report', href: '/dashboard/reports' },
    confidence: 87,
  },
  {
    id: 'ins-2',
    type: 'risk',
    title: 'Concentration Risk: 3 Clients = 71% Revenue',
    body: 'Over-reliance on a small customer base is a red flag for lenders. Diversifying to 8+ active clients would improve your bankability score significantly.',
    action: { label: 'Review Customer Portfolio', href: '/dashboard/customers' },
    confidence: 95,
  },
  {
    id: 'ins-3',
    type: 'trend',
    title: 'SME Lending Rates at 3-Year Low',
    body: 'RBM has maintained base lending rates, creating a window for affordable business financing. Your MWALA credit profile is currently rated Prime.',
    confidence: 72,
  },
  {
    id: 'ins-4',
    type: 'success',
    title: 'Reconciliation Rate: 98.3%',
    body: 'Your ledger is nearly fully reconciled for Q2. This is an audit-ready milestone that strengthens your position with financial institutions.',
    action: { label: 'Generate Audit Report', href: '/dashboard/reports' },
    confidence: 99,
  },
]
