'use client';

import { useState, useEffect } from 'react';
import { fundsApi } from '@/services/api';
import type { Fund } from '@/types';

export function useFunds() {
  const [funds, setFunds] = useState<Fund[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFunds = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const fundsData = await fundsApi.getFunds();
      setFunds(fundsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar los fondos');
      console.error('Error fetching funds:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFunds();
  }, []);

  return {
    funds,
    isLoading,
    error,
    refetch: fetchFunds,
  };
}
