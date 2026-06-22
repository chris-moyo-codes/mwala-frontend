import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  className?: string
  id?: string
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
  id,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'max-w-2xl space-y-4',
        align === 'center' && 'mx-auto text-center',
        className
      )}
    >
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#9B8B6B]">
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        className="text-3xl font-semibold tracking-tight text-[#0F172A] sm:text-4xl"
      >
        {title}
      </h2>
      {description && (
        <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
          {description}
        </p>
      )}
    </div>
  )
}
