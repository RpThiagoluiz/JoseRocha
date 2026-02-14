import { useParams } from 'react-router-dom'
import { AssetForm } from './components/AssetForm'

export const AssetFormPage = () => {
  const { id } = useParams<{ id: string }>()
  const isEdit = Boolean(id)
  const title = isEdit ? 'Editar Ativo' : 'Novo Ativo'

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <div className="max-w-md">
        <AssetForm />
      </div>
    </div>
  )
}
