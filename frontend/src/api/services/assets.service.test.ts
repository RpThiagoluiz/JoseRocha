import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { Asset, AssetRequest } from '@/api/types'
import { apiClient } from '@/api/axios'
import {
  getAssets,
  createAsset,
  getAssetById,
  updateAsset,
  deleteAsset,
} from './assets.service'
import { ASSETS_ENDPOINTS } from '@/api/endpoints/assets.endpoints'

vi.mock('@/api/axios')

describe('assets.service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getAssets', () => {
    it('should fetch all assets successfully', async () => {
      const mockAssets: Asset[] = [
        {
          id: '1',
          name: 'Laptop Dell',
          serialNumber: 'SN-001',
          acquisitionDate: '2024-01-15',
          status: 'AVAILABLE',
          createdAt: '2024-01-15T10:00:00Z',
          updatedAt: '2024-01-15T10:00:00Z',
        },
        {
          id: '2',
          name: 'Monitor LG',
          serialNumber: 'SN-002',
          acquisitionDate: '2024-02-01',
          status: 'IN_USE',
          createdAt: '2024-02-01T10:00:00Z',
          updatedAt: '2024-02-01T10:00:00Z',
        },
      ]

      vi.mocked(apiClient.get).mockResolvedValue({
        data: mockAssets,
      } as never)

      const result = await getAssets()

      expect(apiClient.get).toHaveBeenCalledWith(
        ASSETS_ENDPOINTS.GET_ALL,
        expect.objectContaining({ params: expect.anything() })
      )
      expect(result).toEqual(mockAssets)
    })

    it('should pass filter params when provided', async () => {
      const mockAssets: Asset[] = []
      vi.mocked(apiClient.get).mockResolvedValue({
        data: mockAssets,
      } as never)

      await getAssets({ name: 'laptop', status: 'AVAILABLE' })

      expect(apiClient.get).toHaveBeenCalledWith(ASSETS_ENDPOINTS.GET_ALL, {
        params: { name: 'laptop', status: 'AVAILABLE' },
      })
    })

    it('should handle API errors when fetching assets', async () => {
      const error = new Error('Network error')
      vi.mocked(apiClient.get).mockRejectedValue(error)

      await expect(getAssets()).rejects.toThrow('Network error')
      expect(apiClient.get).toHaveBeenCalledWith(
        ASSETS_ENDPOINTS.GET_ALL,
        expect.objectContaining({ params: expect.anything() })
      )
    })
  })

  describe('createAsset', () => {
    it('should create an asset successfully', async () => {
      const assetRequest: AssetRequest = {
        name: 'New Laptop',
        serialNumber: 'SN-003',
        acquisitionDate: '2024-03-01',
        status: 'AVAILABLE',
      }

      const createdAsset: Asset = {
        id: '3',
        ...assetRequest,
        status: 'AVAILABLE',
        createdAt: '2024-03-01T10:00:00Z',
        updatedAt: '2024-03-01T10:00:00Z',
      }

      vi.mocked(apiClient.post).mockResolvedValue({
        data: createdAsset,
      } as never)

      const result = await createAsset(assetRequest)

      expect(apiClient.post).toHaveBeenCalledWith(
        ASSETS_ENDPOINTS.CREATE,
        assetRequest
      )
      expect(result).toEqual(createdAsset)
    })

    it('should handle API errors when creating asset', async () => {
      const assetRequest: AssetRequest = {
        name: 'New Laptop',
        serialNumber: 'SN-003',
        acquisitionDate: '2024-03-01',
      }

      const error = new Error('Validation error')
      vi.mocked(apiClient.post).mockRejectedValue(error)

      await expect(createAsset(assetRequest)).rejects.toThrow(
        'Validation error'
      )
      expect(apiClient.post).toHaveBeenCalledWith(
        ASSETS_ENDPOINTS.CREATE,
        assetRequest
      )
    })
  })

  describe('getAssetById', () => {
    it('should fetch an asset by ID successfully', async () => {
      const assetId = '1'
      const mockAsset: Asset = {
        id: assetId,
        name: 'Laptop Dell',
        serialNumber: 'SN-001',
        acquisitionDate: '2024-01-15',
        status: 'AVAILABLE',
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-01-15T10:00:00Z',
      }

      vi.mocked(apiClient.get).mockResolvedValue({
        data: mockAsset,
      } as never)

      const result = await getAssetById(assetId)

      expect(apiClient.get).toHaveBeenCalledWith(
        ASSETS_ENDPOINTS.GET_BY_ID(assetId)
      )
      expect(result).toEqual(mockAsset)
    })

    it('should handle API errors when fetching asset by ID', async () => {
      const assetId = '999'
      const error = new Error('Asset not found')
      vi.mocked(apiClient.get).mockRejectedValue(error)

      await expect(getAssetById(assetId)).rejects.toThrow('Asset not found')
      expect(apiClient.get).toHaveBeenCalledWith(
        ASSETS_ENDPOINTS.GET_BY_ID(assetId)
      )
    })
  })

  describe('updateAsset', () => {
    it('should update an asset successfully', async () => {
      const assetId = '1'
      const updateData: AssetRequest = {
        name: 'Updated Laptop',
        serialNumber: 'SN-001-UPDATED',
        acquisitionDate: '2024-01-15',
        status: 'MAINTENANCE',
      }

      const updatedAsset: Asset = {
        id: assetId,
        ...updateData,
        status: 'MAINTENANCE',
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-03-01T10:00:00Z',
      }

      vi.mocked(apiClient.put).mockResolvedValue({
        data: updatedAsset,
      } as never)

      const result = await updateAsset(assetId, updateData)

      expect(apiClient.put).toHaveBeenCalledWith(
        ASSETS_ENDPOINTS.UPDATE(assetId),
        updateData
      )
      expect(result).toEqual(updatedAsset)
    })

    it('should handle API errors when updating asset', async () => {
      const assetId = '1'
      const updateData: AssetRequest = {
        name: 'Updated Laptop',
        serialNumber: 'SN-001-UPDATED',
        acquisitionDate: '2024-01-15',
      }

      const error = new Error('Update failed')
      vi.mocked(apiClient.put).mockRejectedValue(error)

      await expect(updateAsset(assetId, updateData)).rejects.toThrow(
        'Update failed'
      )
      expect(apiClient.put).toHaveBeenCalledWith(
        ASSETS_ENDPOINTS.UPDATE(assetId),
        updateData
      )
    })
  })

  describe('deleteAsset', () => {
    it('should delete an asset successfully', async () => {
      const assetId = '1'

      vi.mocked(apiClient.delete).mockResolvedValue(undefined as never)

      await deleteAsset(assetId)

      expect(apiClient.delete).toHaveBeenCalledWith(
        ASSETS_ENDPOINTS.DELETE(assetId)
      )
    })

    it('should handle API errors when deleting asset', async () => {
      const assetId = '999'
      const error = new Error('Delete failed')
      vi.mocked(apiClient.delete).mockRejectedValue(error)

      await expect(deleteAsset(assetId)).rejects.toThrow('Delete failed')
      expect(apiClient.delete).toHaveBeenCalledWith(
        ASSETS_ENDPOINTS.DELETE(assetId)
      )
    })
  })
})
