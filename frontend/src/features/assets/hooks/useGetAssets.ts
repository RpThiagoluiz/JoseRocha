import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import type { Asset } from '@/api/types';
import { getAssets } from '@/api/services/assets.service';

/**
 * Error code mapping for user-friendly messages.
 */
const ERROR_MAP: Record<number | string, string> = {
  500: 'Erro interno ao carregar ativos.',
  404: 'Recurso não encontrado.',
  403: 'Acesso negado.',
  401: 'Não autorizado.',
  default: 'Não foi possível carregar a lista.',
};

/**
 * Type guard to check if error has axios response structure.
 */
const isAxiosError = (
  err: unknown
): err is { response?: { data?: { code?: string | number }; status?: number } } => {
  return (
    typeof err === 'object' &&
    err !== null &&
    'response' in err
  );
};

/**
 * Custom hook for fetching assets.
 * Implements the Clean Hook pattern with state management and error handling.
 *
 * @returns Object containing assets data, loading state, error state, and refetch function.
 */
export const useGetAssets = () => {
  const [data, setData] = useState<Asset[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAssets = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const assets = await getAssets();
      setData(assets);
    } catch (err: unknown) {
      const code = isAxiosError(err)
        ? err.response?.data?.code || err.response?.status || 'default'
        : 'default';
      const message = ERROR_MAP[code] || ERROR_MAP.default;
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  return {
    data,
    isLoading,
    error,
    refetch: fetchAssets,
  };
};
