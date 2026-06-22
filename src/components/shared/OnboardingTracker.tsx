'use client'

import React, { useState } from 'react'
import { CheckCircle2, Circle, ChevronDown, ChevronUp, X, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

interface OnboardingStep {
  id: string
  title: string
  description: string
  completed: boolean
  href?: string
  ctaLabel?: string
}

interface OnboardingTrackerProps {
  steps: OnboardingStep[]
  onDismiss?: () => void
  onStepAction?: (stepId: string) => void
}

export function OnboardingTracker({ steps, onDismiss, onStepAction }: OnboardingTrackerProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const completedCount = steps.filter(s => s.completed).length
  const totalCount = steps.length
  const progressPercent = (completedCount / totalCount) * 100
  const allComplete = completedCount === totalCount

  if (allComplete && onDismiss) {
    // Auto-dismiss after a moment when all steps are complete
    setTimeout(onDismiss, 3000)
  }

  return (
    <div className="bg-[#111B31] border border-[#263043] rounded-2xl overflow-hidden shadow-2xl">
      {/* Header */}
      <div
        className="flex items-center justify-between p-5 cursor-pointer hover:bg-[#161F38] transition-colors"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className="flex items-center gap-3">
          <div className="relative h-9 w-9 flex-shrink-0">
            <div className="absolute inset-0 bg-[#E0B03B]/20 blur-lg rounded-full" />
            <div className="relative h-9 w-9 rounded-xl bg-[#0B1220] border border-[#263043] flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-[#E0B03B]" />
            </div>
          </div>
          <div>
            <p className="text-sm font-bold text-white">
              {allComplete ? '🎉 Setup Complete!' : 'Get Started with MWALA'}
            </p>
            <p className="text-xs text-slate-400">
              {allComplete 
                ? 'Your financial operating system is ready.' 
                : `${completedCount} of ${totalCount} steps complete`
              }
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Progress Ring */}
          <div className="relative h-10 w-10 flex-shrink-0">
            <svg viewBox="0 0 36 36" className="h-10 w-10 -rotate-90">
              <circle
                cx="18" cy="18" r="15.9"
                fill="none"
                stroke="#263043"
                strokeWidth="3"
              />
              <circle
                cx="18" cy="18" r="15.9"
                fill="none"
                stroke="#E0B03B"
                strokeWidth="3"
                strokeDasharray={`${progressPercent} ${100 - progressPercent}`}
                strokeLinecap="round"
                style={{ transition: 'stroke-dasharray 0.5s ease' }}
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-white">
              {Math.round(progressPercent)}%
            </span>
          </div>

          <div className="flex items-center gap-1">
            {isCollapsed ? (
              <ChevronDown className="h-4 w-4 text-slate-400" />
            ) : (
              <ChevronUp className="h-4 w-4 text-slate-400" />
            )}
            {onDismiss && (
              <button
                onClick={(e) => { e.stopPropagation(); onDismiss(); }}
                className="p-1 rounded-lg hover:bg-[#263043] text-slate-500 hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-0.5 bg-[#263043]">
        <div
          className="h-full bg-[#E0B03B] transition-all duration-700 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Steps List */}
      {!isCollapsed && (
        <div className="p-3 space-y-1">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={cn(
                "flex items-start gap-3 p-3 rounded-xl transition-colors",
                step.completed ? "opacity-60" : "hover:bg-[#161F38] cursor-pointer"
              )}
              onClick={() => !step.completed && onStepAction?.(step.id)}
            >
              {/* Step Icon */}
              <div className="flex-shrink-0 mt-0.5">
                {step.completed ? (
                  <CheckCircle2 className="h-5 w-5 text-[#22C55E]" />
                ) : (
                  <div className="h-5 w-5 rounded-full border-2 border-[#263043] flex items-center justify-center">
                    <span className="text-[9px] font-bold text-slate-500">{index + 1}</span>
                  </div>
                )}
              </div>

              {/* Step Content */}
              <div className="flex-1 min-w-0">
                <p className={cn(
                  "text-sm font-bold",
                  step.completed ? "text-slate-400 line-through" : "text-white"
                )}>
                  {step.title}
                </p>
                {!step.completed && (
                  <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{step.description}</p>
                )}
              </div>

              {/* CTA */}
              {!step.completed && step.ctaLabel && (
                <span className="text-[10px] font-bold text-[#E0B03B] whitespace-nowrap self-center">
                  {step.ctaLabel} →
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
