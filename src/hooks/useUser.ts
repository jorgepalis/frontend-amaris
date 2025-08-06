'use client';

import { useState, useEffect } from 'react';
import { userApi } from '@/services/api';
import type { User, UserBalance, UserFund, Transaction } from '@/types';

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [balance, setBalance] = useState<UserBalance | null>(null);
  const [userFunds, setUserFunds] = useState<UserFund[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const [userData, balanceData, fundsData, transactionsData] = await Promise.all([
        userApi.getUser(),
        userApi.getBalance(),
        userApi.getFunds(),
        userApi.getTransactions(10),
      ]);

      setUser(userData);
      setBalance(balanceData);
      setUserFunds(fundsData);
      setTransactions(transactionsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar datos del usuario');
      console.error('Error fetching user data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshBalance = async () => {
    try {
      const balanceData = await userApi.getBalance();
      setBalance(balanceData);
    } catch (err) {
      console.error('Error refreshing balance:', err);
    }
  };

  const refreshUserFunds = async () => {
    try {
      const fundsData = await userApi.getFunds();
      setUserFunds(fundsData);
    } catch (err) {
      console.error('Error refreshing user funds:', err);
    }
  };

  const refreshTransactions = async () => {
    try {
      const transactionsData = await userApi.getTransactions(10);
      setTransactions(transactionsData);
    } catch (err) {
      console.error('Error refreshing transactions:', err);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return {
    user,
    balance,
    userFunds,
    transactions,
    isLoading,
    error,
    refetch: fetchUserData,
    refreshBalance,
    refreshUserFunds,
    refreshTransactions,
  };
}
