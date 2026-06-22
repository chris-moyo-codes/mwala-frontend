'use client'
// Import utility functions
import { cn } from '@/lib/utils' // Import cn utility

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-[#0F172A] shadow-sm transition-all duration-200',
        className
      )}
      {...props}
    />
  )
}

export function CardHeader({ className, ...props }: CardProps) {
  return (
    <div className={cn('border-b border-[#E2E8F0] px-6 py-4', className)} {...props} />
  )
}

export function CardTitle({ className, ...props }: CardProps) {
  return (
    <h2 // Changed text-foreground to text-[#0F172A] for consistency
      className={cn('text-lg font-semibold text-[#0F172A]', className)}
      {...props}
    />
  )
}

export function CardDescription({ className, ...props }: CardProps) {
  return (
    <p className={cn('text-sm text-slate-400', className)} {...props} />
  )
}

export function CardContent({ className, ...props }: CardProps) {
  return <div className={cn('px-6 py-4', className)} {...props} />
}

export function CardFooter({ className, ...props }: CardProps) {
  return (
    <div className={cn('border-t border-[#E2E8F0] px-6 py-4', className)} {...props} />
  )
}
