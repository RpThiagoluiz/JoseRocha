import type { Asset } from '@/api/types'

export const ASSETS_MOCK: Asset[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    name: 'Laptop Dell XPS 15',
    serialNumber: 'SN-LAP-001',
    acquisitionDate: '2024-01-15T10:00:00Z',
    status: 'AVAILABLE',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440002',
    name: 'Monitor LG 27"',
    serialNumber: 'SN-MON-002',
    acquisitionDate: '2023-06-20T14:30:00Z',
    status: 'IN_USE',
    createdAt: '2023-06-20T14:30:00Z',
    updatedAt: '2023-06-20T14:30:00Z',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440003',
    name: 'Teclado Mecânico Keychron',
    serialNumber: 'SN-KBD-003',
    acquisitionDate: '2024-02-01T09:00:00Z',
    status: 'MAINTENANCE',
    createdAt: '2024-02-01T09:00:00Z',
    updatedAt: '2024-02-01T09:00:00Z',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440004',
    name: 'Mouse Logitech MX Master',
    serialNumber: 'SN-MSE-004',
    acquisitionDate: '2022-11-10T16:45:00Z',
    status: 'DISPOSED',
    createdAt: '2022-11-10T16:45:00Z',
    updatedAt: '2022-11-10T16:45:00Z',
  },
]

/**
 * Simulates an async fetch of assets (500ms delay).
 * Use in Phase 2 when integrating with the API.
 */
export const fetchAssetsMock = (): Promise<Asset[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(ASSETS_MOCK)
    }, 500)
  })
}
