'use client';

import { useState, useEffect } from 'react';
import { userApi } from '@/services/api';
import { UserBalance } from '@/types';

export function useBalance() {
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
      console.error('Error fetching balance:', err);
      setError(err.message || 'Error al cargar el balance');
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
    refetch: fetchBalance
  };
}
