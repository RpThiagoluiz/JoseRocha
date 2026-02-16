import { useState } from 'react'
import { toast } from 'sonner'
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
      toast.success('Ativo criado com sucesso!')
      onSuccess?.()
    } catch (err: unknown) {
      const message = getErrorMessage(err)
      toast.error(message)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    create,
    isLoading,
  }
}
