'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Table } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { useUserFunds } from '@/hooks/useUserFunds';
import { UserFund } from '@/types';
import { formatCurrency, formatDate } from '@/lib/utils';
import { fundsApi } from '@/services/api';
import { toast } from 'react-hot-toast';

interface UserSubscriptionsTableProps {
  onUnsubscribeChange?: () => void;
}

export function UserSubscriptionsTable({ onUnsubscribeChange }: UserSubscriptionsTableProps) {
  const { userFunds, isLoading, error, refetch } = useUserFunds();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFund, setSelectedFund] = useState<UserFund | null>(null);
  const [isUnsubscribing, setIsUnsubscribing] = useState(false);

  const filteredUserFunds = userFunds.filter((userFund: UserFund) =>
    userFund.fund.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    userFund.fund.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      key: 'fund_name',
      header: 'Nombre del Fondo',
      render: (userFund: UserFund) => (
        <div>
          <div className="font-medium text-gray-900">{userFund.fund.name}</div>
          <div className="text-sm text-gray-500">{userFund.fund.category}</div>
        </div>
      )
    },
    {
      key: 'subscribed_amount',
      header: 'Monto Suscrito',
      render: (userFund: UserFund) => formatCurrency(parseFloat(userFund.subscription.subscription_amount))
    },
    {
      key: 'current_value',
      header: 'Valor Actual',
      render: (userFund: UserFund) => (
        <div>
          <div className="font-medium">
            {formatCurrency(parseFloat(userFund.subscription.invested_amount))}
          </div>
          <div className={`text-sm ${
            parseFloat(userFund.subscription.invested_amount) >= parseFloat(userFund.subscription.subscription_amount)
              ? 'text-green-600'
              : 'text-red-600'
          }`}>
            {parseFloat(userFund.subscription.invested_amount) >= parseFloat(userFund.subscription.subscription_amount) ? '+' : ''}
            {((parseFloat(userFund.subscription.invested_amount) - parseFloat(userFund.subscription.subscription_amount)) / parseFloat(userFund.subscription.subscription_amount) * 100).toFixed(2)}%
          </div>
        </div>
      )
    },
    {
      key: 'subscription_date',
      header: 'Fecha de Suscripción',
      render: (userFund: UserFund) => formatDate(userFund.subscription.subscribed_at)
    },
    {
      key: 'is_active',
      header: 'Estado',
      render: (userFund: UserFund) => (
        <Badge variant={userFund.subscription.active ? 'success' : 'error'}>
          {userFund.subscription.active ? 'Activa' : 'Cancelada'}
        </Badge>
      )
    },
    {
      key: 'actions',
      header: 'Acciones',
      render: (userFund: UserFund) => (
        userFund.subscription.active ? (
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleUnsubscribe(userFund)}
          >
            Cancelar
          </Button>
        ) : (
          <span className="text-gray-400 text-sm">Sin acciones</span>
        )
      )
    }
  ];

  const handleUnsubscribe = (userFund: UserFund) => {
    setSelectedFund(userFund);
    setIsModalOpen(true);
  };

  const confirmUnsubscribe = async () => {
    if (!selectedFund) return;

    setIsUnsubscribing(true);
    try {
      await fundsApi.cancel(selectedFund.subscription.fund_id);
      toast.success('Suscripción cancelada exitosamente');
      setIsModalOpen(false);
      setSelectedFund(null);
      refetch(); // Refrescar lista de suscripciones
      onUnsubscribeChange?.(); // Refrescar estadísticas del dashboard
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Error al cancelar la suscripción');
    } finally {
      setIsUnsubscribing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-lg font-medium text-gray-900">
          Mis Suscripciones
        </h2>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar suscripciones..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 w-full sm:w-64"
          />
        </div>
      </div>

      {/* Table */}
      <Table
        data={filteredUserFunds}
        columns={columns}
        loading={isLoading}
        error={error || undefined}
        onRetry={refetch}
        emptyMessage="No tienes suscripciones activas"
      />

      {/* Unsubscribe Confirmation Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Confirmar Cancelación"
        size="md"
      >
        {selectedFund && (
          <div className="space-y-4">
            <p className="text-gray-700">
              ¿Estás seguro de que deseas cancelar tu suscripción al fondo{' '}
              <strong>{selectedFund.fund.name}</strong>?
            </p>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                <strong>Advertencia:</strong> Al cancelar esta suscripción, perderás acceso
                a futuras ganancias y no podrás reactivarla automáticamente.
              </p>
            </div>

            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setIsModalOpen(false)}
                disabled={isUnsubscribing}
              >
                Cancelar
              </Button>
              <Button
                variant="error"
                onClick={confirmUnsubscribe}
                isLoading={isUnsubscribing}
              >
                Confirmar Cancelación
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
