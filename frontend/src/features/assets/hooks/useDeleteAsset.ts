import { useState } from 'react'
import { showNotification } from '@/utils/notification'
import { deleteAsset } from '@/api/services/assets.service'
import { getErrorMessage } from '@/utils/errorMapper'

/**
 * Custom hook for deleting assets.
 * Implements the Clean Hook pattern with state management and error handling.
 *
 * @returns Object containing loading state and remove function.
 */
export const useDeleteAsset = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const remove = async (id: string, onSuccess?: () => void): Promise<void> => {
    setIsLoading(true)
    try {
      await deleteAsset(id)
      showNotification({ type: 'success', message: 'Ativo excluído com sucesso!' })
      onSuccess?.()
    } catch (err: unknown) {
      const message = getErrorMessage(err)
      showNotification({ type: 'error', message })
    } finally {
      setIsLoading(false)
    }
  }

  return {
    remove,
    isLoading,
  }
}
