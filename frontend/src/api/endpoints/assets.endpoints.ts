/**
 * Assets API endpoints.
 */
export const ASSETS_ENDPOINTS = {
  GET_ALL: '/assets',
  GET_BY_ID: (id: string) => `/assets/${id}`,
  CREATE: '/assets',
  UPDATE: (id: string) => `/assets/${id}`,
  DELETE: (id: string) => `/assets/${id}`,
} as const
