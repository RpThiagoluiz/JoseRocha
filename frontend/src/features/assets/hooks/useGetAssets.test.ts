import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import type { Asset } from '@/api/types'
import { getAssets } from '@/api/services/assets.service'
import { useGetAssets } from './useGetAssets'
import { toast } from 'sonner'
import { getErrorMessage } from '@/utils/errorMapper'

vi.mock('@/api/services/assets.service')
vi.mock('@/utils/errorMapper')
vi.mock('sonner', () => ({
  toast: {
    error: vi.fn(),
  },
}))

describe('useGetAssets', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Happy Path', () => {
    it('should initialize with loading state and fetch data successfully', async () => {
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

      vi.mocked(getAssets).mockResolvedValue(mockAssets)

      const { result } = renderHook(() => useGetAssets())

      // Initial state should be loading
      expect(result.current.isLoading).toBe(true)
      expect(result.current.data).toEqual([])
      expect(result.current.error).toBeNull()

      // Wait for loading to complete
      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      // After loading, data should be populated
      expect(result.current.data).toEqual(mockAssets)
      expect(result.current.error).toBeNull()
      expect(getAssets).toHaveBeenCalledTimes(1)
    })

    it('should refetch data when refetch is called', async () => {
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
      ]

      vi.mocked(getAssets).mockResolvedValue(mockAssets)

      const { result } = renderHook(() => useGetAssets())

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      expect(getAssets).toHaveBeenCalledTimes(1)
      expect(result.current.data).toEqual(mockAssets)

      // Call refetch
      result.current.refetch()

      // Wait for refetch to complete
      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      }, { timeout: 3000 })

      // Should have called getAssets again and data should still be correct
      expect(getAssets).toHaveBeenCalledTimes(2)
      expect(result.current.data).toEqual(mockAssets)
    })
  })

  describe('Error Handling', () => {
    it('should handle API errors and show error toast', async () => {
      const mockError = {
        response: {
          status: 500,
          data: {
            code: 'GEN-001',
          },
        },
      }
      const errorMessage = 'Ocorreu um erro interno no servidor. Tente novamente mais tarde.'

      vi.mocked(getAssets).mockRejectedValue(mockError)
      vi.mocked(getErrorMessage).mockReturnValue(errorMessage)

      const { result } = renderHook(() => useGetAssets())

      // Initial loading state
      expect(result.current.isLoading).toBe(true)

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      // Error state should be set
      expect(result.current.error).toBe(errorMessage)
      expect(result.current.data).toEqual([])
      expect(getErrorMessage).toHaveBeenCalledWith(mockError)
      expect(toast.error).toHaveBeenCalledWith(errorMessage)
    })

    it('should handle errors with AST-001 code', async () => {
      const mockError = {
        response: {
          status: 404,
          data: {
            code: 'AST-001',
          },
        },
      }
      const errorMessage = 'O ativo solicitado não foi encontrado no sistema.'

      vi.mocked(getAssets).mockRejectedValue(mockError)
      vi.mocked(getErrorMessage).mockReturnValue(errorMessage)

      const { result } = renderHook(() => useGetAssets())

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      expect(result.current.error).toBe(errorMessage)
      expect(toast.error).toHaveBeenCalledWith(errorMessage)
    })

    it('should handle errors with unknown codes', async () => {
      const mockError = {
        response: {
          status: 400,
          data: {
            code: 'UNKNOWN-ERROR',
          },
        },
      }
      const errorMessage = 'Ocorreu um erro inesperado. Verifique sua conexão.'

      vi.mocked(getAssets).mockRejectedValue(mockError)
      vi.mocked(getErrorMessage).mockReturnValue(errorMessage)

      const { result } = renderHook(() => useGetAssets())

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      // Should use default error message for unknown codes
      expect(result.current.error).toBe(errorMessage)
      expect(toast.error).toHaveBeenCalledWith(errorMessage)
    })

    it('should handle errors without response structure', async () => {
      const mockError = new Error('Network error')
      const errorMessage = 'Ocorreu um erro inesperado. Verifique sua conexão.'

      vi.mocked(getAssets).mockRejectedValue(mockError)
      vi.mocked(getErrorMessage).mockReturnValue(errorMessage)

      const { result } = renderHook(() => useGetAssets())

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      // Should use default error message
      expect(result.current.error).toBe(errorMessage)
      expect(toast.error).toHaveBeenCalledWith(errorMessage)
    })

    it('should clear error state when refetching after an error', async () => {
      const mockError = {
        response: {
          status: 500,
          data: {
            code: 'GEN-001',
          },
        },
      }
      const errorMessage = 'Ocorreu um erro interno no servidor. Tente novamente mais tarde.'

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
      ]

      // First call fails
      vi.mocked(getAssets).mockRejectedValueOnce(mockError)
      vi.mocked(getErrorMessage).mockReturnValueOnce(errorMessage)

      const { result } = renderHook(() => useGetAssets())

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      expect(result.current.error).toBe(errorMessage)
      expect(result.current.data).toEqual([])

      // Second call succeeds
      vi.mocked(getAssets).mockResolvedValueOnce(mockAssets)

      // Refetch
      result.current.refetch()

      // Wait for refetch to complete
      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
        expect(result.current.error).toBeNull()
        expect(result.current.data).toEqual(mockAssets)
      }, { timeout: 3000 })
    })
  })
})
