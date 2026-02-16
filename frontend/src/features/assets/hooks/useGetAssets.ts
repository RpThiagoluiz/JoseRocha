import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import type { Asset } from '@/api/types';
import { getAssets } from '@/api/services/assets.service';
import { getErrorMessage } from '@/utils/errorMapper';

/**
 * Custom hook for fetching assets with optional filters.
 * Implements the Clean Hook pattern with state management and error handling.
 *
 * @param filters Optional filters (name, serialNumber, status).
 * @returns Object containing assets data, loading state, error state, and refetch function.
 */
export const useGetAssets = (filters?: Record<string, string>) => {
  const [data, setData] = useState<Asset[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAssets = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const assets = await getAssets(filters);
      setData(assets);
    } catch (err: unknown) {
      const message = getErrorMessage(err);
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, [JSON.stringify(filters ?? {})]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchAssets,
  };
};
