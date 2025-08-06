'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { FundsTable } from '@/components/funds/FundsTable';
import { UserSubscriptionsTable } from '@/components/subscriptions/UserSubscriptionsTable';
import { TransactionsTable } from '@/components/transactions/TransactionsTable';
import { NotificationPreferences } from '@/components/notifications/NotificationPreferences';
import { useDashboardStats } from '@/hooks/useDashboardStats';
import { Wallet, TrendingUp, Settings, History, Target } from 'lucide-react';

export default function Dashboard() {
  const { stats, isLoading, refetch: refreshStats } = useDashboardStats();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-32 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Dashboard de Inversiones
          </h1>
          <p className="text-gray-600">
            Bienvenido - Gestiona tus fondos de inversión
          </p>
        </div>

        {/* Stats */}
        <div className="mb-8">
          <DashboardStats stats={stats} loading={isLoading} />
        </div>

        {/* Main Content */}
        <Tabs defaultValue="funds" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="funds" className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span>Fondos</span>
            </TabsTrigger>
            <TabsTrigger value="subscriptions" className="flex items-center space-x-2">
              <Target className="h-4 w-4" />
              <span>Mis Suscripciones</span>
            </TabsTrigger>
            <TabsTrigger value="transactions" className="flex items-center space-x-2">
              <History className="h-4 w-4" />
              <span>Transacciones</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>Configuración</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="funds" className="space-y-6">
            <FundsTable onSubscriptionChange={refreshStats} />
          </TabsContent>

          <TabsContent value="subscriptions" className="space-y-6">
            <UserSubscriptionsTable onUnsubscribeChange={refreshStats} />
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <TransactionsTable limit={20} />
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="max-w-2xl">
              <NotificationPreferences />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
