import { useState } from 'react'
import { showNotification } from '@/utils/notification'
import type { AssetRequest } from '@/api/types'
import { updateAsset } from '@/api/services/assets.service'
import { getErrorMessage } from '@/utils/errorMapper'

/**
 * Custom hook for updating assets.
 * Implements the Clean Hook pattern with state management and error handling.
 *
 * @returns Object containing loading state and update function.
 */
export const useUpdateAsset = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const update = async (
    id: string,
    data: AssetRequest,
    onSuccess?: () => void
  ): Promise<void> => {
    setIsLoading(true)
    try {
      await updateAsset(id, data)
      showNotification({ type: 'success', message: 'Ativo atualizado!' })
      onSuccess?.()
    } catch (err: unknown) {
      const message = getErrorMessage(err)
      showNotification({ type: 'error', message })
    } finally {
      setIsLoading(false)
    }
  }

  return {
    update,
    isLoading,
  }
}
