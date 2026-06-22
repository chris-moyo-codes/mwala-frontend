'use client'
// Import utility functions
import { cn } from '@/lib/utils' // Import cn utility

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'accent' | 'ghost' | 'subtle' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

export function Button({
  className,
  variant = 'default',
  size = 'md',
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white'

  const variants = {
    default:
      'bg-[#0F172A] text-white hover:bg-[#1e293b] focus:ring-[#D4A017]',
    secondary:
      'bg-white border border-[#0F172A]/10 text-[#0F172A] hover:bg-slate-50 focus:ring-[#D4A017]',
    destructive:
      'bg-red-600 text-white hover:bg-red-700 focus:ring-red-600',
    accent:
      'bg-[#D4A017] text-[#0F172A] hover:bg-[#b88a14] focus:ring-[#0F172A]',
    ghost:
      'text-[#0F172A] hover:bg-slate-50 focus:ring-[#D4A017]',
    subtle:
      'bg-slate-100 text-[#0F172A] hover:bg-slate-200 focus:ring-[#D4A017]',
    outline:
      'border border-[#0F172A]/20 text-[#0F172A] bg-transparent hover:bg-slate-50 focus:ring-[#D4A017]',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  )
}
