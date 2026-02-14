import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
import type { Asset } from '@/api/types'
import { BadgeAssetStatus } from '@/components/features/BadgeAssetStatus'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
})

interface AssetTableProps {
  assets: Asset[]
  onEdit?: (asset: Asset) => void
}

export const AssetTable = ({ assets, onEdit }: AssetTableProps) => {
  const formatDate = (dateStr: string) => {
    return dateFormatter.format(new Date(dateStr))
  }

  const handleEdit = (asset: Asset) => {
    onEdit?.(asset)
  }

  const handleDelete = (asset: Asset) => {
    console.log('[AssetTable] Delete clicked:', asset)
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Número de Série</TableHead>
          <TableHead>Data de Aquisição</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {assets.map((asset) => (
          <TableRow key={asset.id}>
            <TableCell className="font-medium">{asset.name}</TableCell>
            <TableCell>{asset.serialNumber}</TableCell>
            <TableCell>{formatDate(asset.acquisitionDate)}</TableCell>
            <TableCell>
              <BadgeAssetStatus status={asset.status} />
            </TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="Ações">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleEdit(asset)}>
                    <Pencil className="h-4 w-4" />
                    Editar
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleDelete(asset)}
                    className="text-destructive focus:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                    Excluir
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
