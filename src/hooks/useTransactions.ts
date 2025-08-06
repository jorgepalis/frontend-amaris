'use client';

import { useState, useEffect } from 'react';
import { Transaction } from '@/types';
import { userApi } from '@/services/api';

export function useTransactions(limit: number = 10) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await userApi.getTransactions(limit);
      setTransactions(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al cargar las transacciones');
      console.error('Error fetching transactions:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [limit]);

  return {
    transactions,
    isLoading,
    error,
    refetch: fetchTransactions,
  };
}
