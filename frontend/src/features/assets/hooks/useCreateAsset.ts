import { useState } from 'react'
import { showNotification } from '@/utils/notification'
import type { AssetRequest } from '@/api/types'
import { createAsset } from '@/api/services/assets.service'
import { getErrorMessage } from '@/utils/errorMapper'

/**
 * Custom hook for creating assets.
 * Implements the Clean Hook pattern with state management and error handling.
 *
 * @returns Object containing loading state and create function.
 */
export const useCreateAsset = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const create = async (
    data: AssetRequest,
    onSuccess?: () => void
  ): Promise<void> => {
    setIsLoading(true)
    try {
      await createAsset(data)
      showNotification({ type: 'success', message: 'Ativo criado com sucesso!' })
      onSuccess?.()
    } catch (err: unknown) {
      const message = getErrorMessage(err)
      showNotification({ type: 'error', message })
    } finally {
      setIsLoading(false)
    }
  }

  return {
    create,
    isLoading,
  }
}
