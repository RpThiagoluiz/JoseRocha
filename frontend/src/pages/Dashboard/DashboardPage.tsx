import { useState } from 'react'
import { Plus } from 'lucide-react'
import type { Asset } from '@/api/types'
import { ASSETS_MOCK } from '@/mocks/assets.mock'
import { BadgeAssetStatus } from '@/components/features/BadgeAssetStatus'
import { AssetTable } from './components/AssetTable'
import { AssetForm } from '@/pages/AssetForm/components/AssetForm'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

export const DashboardPage = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [assetToEdit, setAssetToEdit] = useState<Asset | null>(null)

  const handleOpenNew = () => {
    setAssetToEdit(null)
    setDrawerOpen(true)
  }

  const handleEdit = (asset: Asset) => {
    setAssetToEdit(asset)
    setDrawerOpen(true)
  }

  const handleDrawerChange = (open: boolean) => {
    setDrawerOpen(open)
    if (!open) setAssetToEdit(null)
  }

  const handleSuccess = () => {
    setDrawerOpen(false)
    setAssetToEdit(null)
  }

  const isEditMode = Boolean(assetToEdit)

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
            <AssetForm
              key={assetToEdit?.id ?? 'new'}
              asset={assetToEdit}
              onSuccess={handleSuccess}
            />
          </div>
        </SheetContent>
      </Sheet>
      <div className="rounded-md border">
        <AssetTable assets={ASSETS_MOCK} onEdit={handleEdit} />
      </div>
    </div>
  )
}
