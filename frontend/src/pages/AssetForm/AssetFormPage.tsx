import { useParams, useNavigate } from 'react-router-dom'
import { AssetForm } from './components/AssetForm'
import { useGetAssetById } from '@/features/assets/hooks/useGetAssetById'

export const AssetFormPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: asset, isLoading, error } = useGetAssetById(id)
  const isEdit = Boolean(id)
  const title = isEdit ? 'Editar Ativo' : 'Novo Ativo'

  const handleSuccess = () => {
    navigate('/dashboard')
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <div className="max-w-md">
          <p className="text-muted-foreground">Carregando dados do ativo...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <div className="max-w-md">
          <p className="text-destructive">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <div className="max-w-md">
        <AssetForm initialData={asset || undefined} onSuccess={handleSuccess} />
      </div>
    </div>
  )
}
