import type { Asset } from '@/api/types'
import { BadgeAssetStatus } from '@/components/features/BadgeAssetStatus'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

interface DeleteAssetModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  asset: Asset | null
}

export const DeleteAssetModal = ({
  isOpen,
  onClose,
  onConfirm,
  asset,
}: DeleteAssetModalProps) => {
  const handleConfirm = () => {
    onConfirm()
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja excluir este ativo? Esta ação não pode ser
            desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        {asset && (
          <div className="bg-muted p-3 rounded-md mt-4 flex items-center justify-between">
            <span className="font-medium">{asset.name}</span>
            <BadgeAssetStatus status={asset.status} />
          </div>
        )}
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <Button variant="destructive" onClick={handleConfirm}>
            Confirmar
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
