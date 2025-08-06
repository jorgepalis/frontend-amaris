'use client';

import { useState, useEffect } from 'react';
import { UserBalance } from '@/types';
import { userApi } from '@/services/api';

export function useUserBalance() {
  const [balance, setBalance] = useState<UserBalance | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBalance = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await userApi.getBalance();
      setBalance(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al cargar el balance');
      console.error('Error fetching user balance:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  return {
    balance,
    isLoading,
    error,
    refetch: fetchBalance,
  };
}
