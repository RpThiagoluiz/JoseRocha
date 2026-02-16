import { useState } from 'react'
import { Plus } from 'lucide-react'
import type { Asset } from '@/api/types'
import { BadgeAssetStatus } from '@/components/features/BadgeAssetStatus'
import { AssetTable } from './components/AssetTable'
import { DeleteAssetModal } from './components/DeleteAssetModal'
import { AssetForm } from '@/pages/AssetForm/components/AssetForm'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { useGetAssets } from '@/features/assets/hooks/useGetAssets'
import { useDeleteAsset } from '@/features/assets/hooks/useDeleteAsset'
import { useGetAssetById } from '@/features/assets/hooks/useGetAssetById'

export const DashboardPage = () => {
  const { data: assets, isLoading, error, refetch } = useGetAssets()
  const { remove, isLoading: isDeleting } = useDeleteAsset()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [assetToEditId, setAssetToEditId] = useState<string | null>(null)
  const [assetToDelete, setAssetToDelete] = useState<Asset | null>(null)

  // Fetch asset data when editing
  const { data: assetToEdit, isLoading: isLoadingAsset } = useGetAssetById(
    assetToEditId || undefined
  )

  const handleOpenNew = () => {
    setAssetToEditId(null)
    setDrawerOpen(true)
  }

  const handleEdit = (asset: Asset) => {
    setAssetToEditId(asset.id)
    setDrawerOpen(true)
  }

  const handleDrawerChange = (open: boolean) => {
    setDrawerOpen(open)
    if (!open) {
      setAssetToEditId(null)
    }
  }

  const handleSuccess = () => {
    setDrawerOpen(false)
    setAssetToEditId(null)
    refetch()
  }

  const handleDeleteConfirm = () => {
    if (!assetToDelete?.id) return

    remove(assetToDelete.id, () => {
      refetch()
      setAssetToDelete(null)
    })
  }

  const isEditMode = Boolean(assetToEditId)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Dashboard</h2>
        <Button onClick={handleOpenNew}>
          <Plus className="h-4 w-4" />
          Novo Ativo
        </Button>
      </div>
      <Sheet open={drawerOpen} onOpenChange={handleDrawerChange}>
        <SheetContent
          side="right"
          className="w-[60%] max-w-none sm:max-w-none"
        >
          <SheetHeader>
            <SheetTitle className="flex items-center gap-3">
              {isEditMode ? (
                <>
                  Editar Ativo
                  {assetToEdit && (
                    <BadgeAssetStatus status={assetToEdit.status} />
                  )}
                </>
              ) : (
                'Novo Ativo'
              )}
            </SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            {isLoadingAsset ? (
              <p className="text-muted-foreground">Carregando dados do ativo...</p>
            ) : (
              <AssetForm
                key={assetToEdit?.id ?? 'new'}
                initialData={assetToEdit || undefined}
                onSuccess={handleSuccess}
              />
            )}
          </div>
        </SheetContent>
      </Sheet>
      <div className="rounded-md border">
        {isLoading ? (
          <div className="p-8 text-center text-muted-foreground">
            Carregando ativos...
          </div>
        ) : error ? (
          <div className="p-8 text-center space-y-4">
            <p className="text-destructive">{error}</p>
            <Button onClick={refetch} variant="outline">
              Tentar Novamente
            </Button>
          </div>
        ) : (
          <AssetTable
            assets={assets || []}
            onEdit={handleEdit}
            onDeleteClick={(asset) => setAssetToDelete(asset)}
          />
        )}
      </div>
      <DeleteAssetModal
        isOpen={!!assetToDelete}
        onClose={() => setAssetToDelete(null)}
        onConfirm={handleDeleteConfirm}
        asset={assetToDelete}
        isDeleting={isDeleting}
      />
    </div>
  )
}
