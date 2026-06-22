import { cn } from '@/lib/utils'

interface ContainerProps {
  children: React.ReactNode
  className?: string
  as?: 'div' | 'section'
  id?: string
  'aria-labelledby'?: string
}

export function Container({
  children,
  className,
  as: Component = 'div',
  id,
  'aria-labelledby': ariaLabelledby,
}: ContainerProps) {
  return (
    <Component
      id={id}
      aria-labelledby={ariaLabelledby}
      className={cn('mx-auto w-full max-w-6xl px-6', className)}
    >
      {children}
    </Component>
  )
}
