import type { Asset } from '@/api/types'
import { apiClient } from '@/api/axios'
import { ASSETS_ENDPOINTS } from '@/api/endpoints/assets.endpoints'

/**
 * Fetches all assets from the API.
 * @returns Promise resolving to an array of assets.
 */
export const getAssets = async (): Promise<Asset[]> => {
  const response = await apiClient.get<Asset[]>(ASSETS_ENDPOINTS.GET_ALL)
  return response.data
}
