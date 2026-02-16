import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import type { Asset } from '@/api/types'
import { getAssetById } from '@/api/services/assets.service'
import { getErrorMessage } from '@/utils/errorMapper'

/**
 * Custom hook for fetching a single asset by ID.
 * Implements the Clean Hook pattern with state management and error handling.
 *
 * @param id Optional asset ID. If not provided, no request is made.
 * @returns Object containing asset data, loading state, and error state.
 */
export const useGetAssetById = (id?: string) => {
  const [data, setData] = useState<Asset | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) {
      setData(null)
      setError(null)
      setIsLoading(false)
      return
    }

    const fetchAsset = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const asset = await getAssetById(id)
        setData(asset)
      } catch (err: unknown) {
        const message = getErrorMessage(err)
        setError(message)
        toast.error(message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAsset()
  }, [id])

  return {
    data,
    isLoading,
    error,
  }
}
