import { Inbox, MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
import type { Asset } from '@/api/types'
import { BadgeAssetStatus } from '@/components/features/BadgeAssetStatus'
import { dateUtils } from '@/utils/dateUtils'
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

interface AssetTableProps {
  assets: Asset[]
  onEdit?: (asset: Asset) => void
  onDeleteClick?: (asset: Asset) => void
}

export const AssetTable = ({
  assets,
  onEdit,
  onDeleteClick,
}: AssetTableProps) => {
  const handleEdit = (asset: Asset) => {
    onEdit?.(asset)
  }

  const handleDelete = (asset: Asset) => {
    onDeleteClick?.(asset)
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm">
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
          {!assets || assets.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5}>
                <div className="flex flex-col items-center justify-center py-16 text-center animate-in fade-in duration-500">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted/50 mb-4">
                    <Inbox className="h-10 w-10 text-muted-foreground opacity-70" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    Nenhum ativo encontrado
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2 max-w-sm mx-auto">
                    Não existem itens registados de momento ou não há resultados para os filtros aplicados.
                  </p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            assets.map((asset, index) => (
              <TableRow
                key={asset.id}
                className="cursor-default animate-slide-in-bottom-500 transition-colors hover:bg-muted/50"
                style={{ animationDelay: `${index * 40}ms`, animationFillMode: 'backwards' }}
              >
                <TableCell className="font-medium">{asset.name}</TableCell>
                <TableCell>{asset.serialNumber}</TableCell>
                <TableCell>{dateUtils.formatDisplay(asset.acquisitionDate)}</TableCell>
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
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
