import type { Asset, AssetRequest } from '@/api/types'
import { apiClient } from '@/api/axios'
import { ASSETS_ENDPOINTS } from '@/api/endpoints/assets.endpoints'

/**
 * Fetches all assets from the API with optional filters.
 * @param params Optional query params (name, serialNumber, status).
 * @returns Promise resolving to an array of assets.
 */
export const getAssets = async (
  params?: Record<string, string>
): Promise<Asset[]> => {
  const response = await apiClient.get<Asset[]>(ASSETS_ENDPOINTS.GET_ALL, {
    params: params ?? {},
  })
  return response.data
}

/**
 * Creates a new asset.
 * @param data Asset creation data.
 * @returns Promise resolving to the created asset.
 */
export const createAsset = async (data: AssetRequest): Promise<Asset> => {
  const response = await apiClient.post<Asset>(ASSETS_ENDPOINTS.CREATE, data)
  return response.data
}

/**
 * Fetches an asset by ID.
 * @param id Asset ID.
 * @returns Promise resolving to the asset.
 */
export const getAssetById = async (id: string): Promise<Asset> => {
  const response = await apiClient.get<Asset>(ASSETS_ENDPOINTS.GET_BY_ID(id))
  return response.data
}

/**
 * Updates an existing asset.
 * @param id Asset ID to update.
 * @param data Asset update data.
 * @returns Promise resolving to the updated asset.
 */
export const updateAsset = async (
  id: string,
  data: AssetRequest
): Promise<Asset> => {
  const response = await apiClient.put<Asset>(
    ASSETS_ENDPOINTS.UPDATE(id),
    data
  )
  return response.data
}

/**
 * Deletes an asset by ID.
 * @param id Asset ID to delete.
 * @returns Promise that resolves when deletion is complete.
 */
export const deleteAsset = async (id: string): Promise<void> => {
  await apiClient.delete(ASSETS_ENDPOINTS.DELETE(id))
}
