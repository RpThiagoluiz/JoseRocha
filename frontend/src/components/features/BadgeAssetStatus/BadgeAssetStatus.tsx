import { CheckCircle, Laptop, Trash2, Wrench } from 'lucide-react'
import type { AssetStatus } from '@/api/types'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const STATUS_CONFIG: Record<
  AssetStatus,
  { icon: typeof CheckCircle; variant: 'default' | 'secondary' | 'destructive' | 'outline' }
> = {
  AVAILABLE: { icon: CheckCircle, variant: 'default' },
  IN_USE: { icon: Laptop, variant: 'secondary' },
  MAINTENANCE: { icon: Wrench, variant: 'outline' },
  DISPOSED: { icon: Trash2, variant: 'destructive' },
}

interface BadgeAssetStatusProps {
  status: AssetStatus
  className?: string
}

export const BadgeAssetStatus = ({ status, className }: BadgeAssetStatusProps) => {
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.AVAILABLE
  const Icon = config.icon

  return (
    <Badge
      variant={config.variant}
      className={cn('min-w-[7.5rem] justify-start gap-1.5', className)}
    >
      <Icon className="h-3.5 w-3.5" />
      {status}
    </Badge>
  )
}
