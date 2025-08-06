'use client';

import { useState, useEffect } from 'react';
import { UserFund } from '@/types';
import { userApi } from '@/services/api';

export function useUserFunds() {
  const [userFunds, setUserFunds] = useState<UserFund[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserFunds = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await userApi.getFunds();
      setUserFunds(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al cargar las suscripciones');
      console.error('Error fetching user funds:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserFunds();
  }, []);

  return {
    userFunds,
    isLoading,
    error,
    refetch: fetchUserFunds,
  };
}
