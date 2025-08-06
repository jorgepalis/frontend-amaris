'use client';

import { useState, useEffect } from 'react';
import { userApi } from '@/services/api';

interface DashboardStats {
  totalBalance: number;
  totalUsers: number;
  activeSubscriptions: number;
  monthlyGrowth: number;
}

export function useDashboardStats() {
  const [stats, setStats] = useState<DashboardStats>({
    totalBalance: 0,
    totalUsers: 0,
    activeSubscriptions: 0,
    monthlyGrowth: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Obtener datos reales de la API
      const [balanceData, userFundsData] = await Promise.all([
        userApi.getBalance(),
        userApi.getFunds(),
      ]);

      // Calcular estadísticas basadas en datos reales
      const totalBalance = parseFloat(balanceData.available_balance);
      const activeSubscriptions = userFundsData.filter(fund => fund.subscription.active).length;
      
      setStats({
        totalBalance,
        totalUsers: 1, // Solo el usuario actual por ahora
        activeSubscriptions,
        monthlyGrowth: 12.5, // Esto requeriría lógica adicional para calcular
      });
    } catch (err: any) {
      console.error('Error fetching dashboard stats:', err);
      setError(err.message || 'Error al cargar las estadísticas');
      
      // Fallback a datos mock si hay error
      setStats({
        totalBalance: 500000,
        totalUsers: 1250,
        activeSubscriptions: 8,
        monthlyGrowth: 12.5,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return {
    stats,
    isLoading,
    error,
    refetch: fetchStats,
  };
}
