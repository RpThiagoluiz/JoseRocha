/**
 * Asset status - aligned with backend AssetStatus enum.
 */
export type AssetStatus = 'AVAILABLE' | 'IN_USE' | 'MAINTENANCE' | 'DISPOSED'

/**
 * Asset entity - aligned with backend AssetResponse.
 */
export interface Asset {
  id: string
  name: string
  serialNumber: string
  acquisitionDate: string
  status: AssetStatus
  createdAt: string
  updatedAt: string
}

/**
 * Request DTO for creating or updating an asset - aligned with backend AssetRequest.
 */
export interface AssetRequest {
  name: string
  serialNumber: string
  acquisitionDate: string
  status?: AssetStatus
}

/**
 * Validation error detail - aligned with backend ApiErrorResponse.ValidationError.
 */
export interface ValidationError {
  field: string
  message: string
}

/**
 * API error response - aligned with backend ApiErrorResponse (RFC 7807 style).
 */
export interface ApiErrorResponse {
  status: number
  code: string
  message: string
  timestamp: string
  details?: ValidationError[]
}
