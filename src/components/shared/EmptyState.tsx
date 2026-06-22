'use client'

import React from 'react'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from './Button'

interface EmptyStateAction {
  label: string
  onClick?: () => void
  href?: string
  variant?: 'default' | 'secondary' | 'ghost'
  icon?: LucideIcon
}

interface EmptyStateProps {
  icon?: LucideIcon
  eyebrow?: string
  title: string
  description?: string
  primaryAction?: EmptyStateAction
  secondaryAction?: EmptyStateAction
  className?: string
  compact?: boolean
}

export function EmptyState({
  icon: Icon,
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
  className,
  compact = false
}: EmptyStateProps) {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center text-center",
      compact ? "py-12 px-6" : "py-20 px-8",
      className
    )}>
      {/* Icon Container */}
      {Icon && (
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-[#E0B03B]/20 blur-2xl rounded-full scale-150" />
          <div className="relative h-16 w-16 rounded-2xl bg-[#111B31] border border-[#263043] flex items-center justify-center shadow-xl">
            <Icon className="h-7 w-7 text-[#E0B03B]" strokeWidth={1.5} />
          </div>
        </div>
      )}

      {/* Eyebrow */}
      {eyebrow && (
        <p className="text-[10px] font-bold text-[#E0B03B] uppercase tracking-[0.25em] mb-3">
          {eyebrow}
        </p>
      )}

      {/* Title */}
      <h3 className={cn(
        "font-bold text-white tracking-tight leading-tight",
        compact ? "text-lg" : "text-2xl max-w-sm"
      )}>
        {title}
      </h3>

      {/* Description */}
      {description && (
        <p className={cn(
          "text-slate-400 leading-relaxed mt-3",
          compact ? "text-sm max-w-xs" : "text-sm max-w-md"
        )}>
          {description}
        </p>
      )}

      {/* Actions */}
      {(primaryAction || secondaryAction) && (
        <div className={cn("flex items-center gap-3 mt-8", compact && "mt-6")}>
          {primaryAction && (
            <Button
              variant={primaryAction.variant || 'default'}
              className="bg-[#E0B03B] hover:bg-[#c99a2c] text-[#0B1220] font-bold shadow-lg shadow-[#E0B03B]/20 px-6"
              onClick={primaryAction.onClick}
            >
              {primaryAction.icon && <primaryAction.icon className="h-4 w-4 mr-2" />}
              {primaryAction.label}
            </Button>
          )}
          {secondaryAction && (
            <Button
              variant={secondaryAction.variant || 'ghost'}
              className="text-slate-400 hover:text-white"
              onClick={secondaryAction.onClick}
            >
              {secondaryAction.icon && <secondaryAction.icon className="h-4 w-4 mr-2" />}
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
