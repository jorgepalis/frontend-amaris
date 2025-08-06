'use client';

import { TrendingUp, TrendingDown, DollarSign, Users, Target, Activity } from 'lucide-react';
import { StatsCard } from '@/components/ui/StatsCard';
import { formatCurrency } from '@/lib/utils';

interface DashboardStatsProps {
  stats: {
    totalBalance: number;
    totalUsers: number;
    activeSubscriptions: number;
    monthlyGrowth: number;
  };
  loading?: boolean;
}

export function DashboardStats({ stats, loading = false }: DashboardStatsProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/4"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <StatsCard
        title="Balance Total"
        value={formatCurrency(stats.totalBalance)}
        icon={<DollarSign />}
      />
      
      <StatsCard
        title="Usuarios Totales"
        value={stats.totalUsers.toLocaleString()}
        icon={<Users />}
        subtitle="Usuarios registrados"
      />
      
      <StatsCard
        title="Suscripciones Activas"
        value={stats.activeSubscriptions.toLocaleString()}
        icon={<Target />}
        subtitle="Fondos activos"
      />
    </div>
  );
}
