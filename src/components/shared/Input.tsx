'use client'

import React from 'react'
// Import utility functions
import { cn } from '@/lib/utils' // Import cn utility

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        'flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-[#D4A017] focus:outline-none focus:ring-2 focus:ring-[#D4A017]/20',
        className
      )}
      {...props}
    />
  )
)
Input.displayName = 'Input'
