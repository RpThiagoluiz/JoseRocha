import { CheckCircle, Laptop, Trash2, Wrench } from 'lucide-react'
import type { AssetStatus } from '@/api/types'
import { cn } from '@/lib/utils'

const STATUS_CONFIG: Record<
  AssetStatus,
  { icon: typeof CheckCircle; className: string }
> = {
  AVAILABLE: {
    icon: CheckCircle,
    className: 'rounded-full bg-emerald-500/15 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 border border-emerald-500/20',
  },
  IN_USE: {
    icon: Laptop,
    className: 'rounded-full bg-blue-500/15 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400 border border-blue-500/20',
  },
  MAINTENANCE: {
    icon: Wrench,
    className: 'rounded-full bg-amber-500/15 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 border border-amber-500/20',
  },
  DISPOSED: {
    icon: Trash2,
    className: 'rounded-full bg-slate-400/15 text-slate-600 dark:bg-slate-400/20 dark:text-slate-400 border border-slate-400/20',
  },
}

interface BadgeAssetStatusProps {
  status: AssetStatus
  className?: string
}

export const BadgeAssetStatus = ({ status, className }: BadgeAssetStatusProps) => {
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.AVAILABLE
  const Icon = config.icon

  return (
    <span
      className={cn(
        'inline-flex min-w-30 items-center justify-center gap-1.5 px-2.5 py-0.5 text-xs font-medium',
        config.className,
        className
      )}
    >
      <Icon className="h-3.5 w-3.5 shrink-0" />
      {TranslateStatus({ status })}
    </span>
  )
}

const TranslateStatus = ({ status }: { status: AssetStatus }) => {
  switch (status) {
    case 'AVAILABLE':
      return 'Disponível'
    case 'IN_USE':
      return 'Em uso'
    case 'MAINTENANCE':
      return 'Manutenção'
    case 'DISPOSED':
      return 'Disposto'
    default:
      return status
  }
}