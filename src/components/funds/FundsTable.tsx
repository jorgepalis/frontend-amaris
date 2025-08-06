'use client';

import { useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Table } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { SubscribeFundForm } from '@/components/forms/SubscribeFundForm';
import { useFunds } from '@/hooks/useFunds';
import { Fund } from '@/types';
import { formatCurrency } from '@/lib/utils';

interface FundsTableProps {
  onSubscriptionChange?: () => void;
}

export function FundsTable({ onSubscriptionChange }: FundsTableProps) {
  const { funds, isLoading, error, refetch } = useFunds();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFund, setSelectedFund] = useState<Fund | null>(null);

  const filteredFunds = funds.filter(fund =>
    fund.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fund.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      key: 'name',
      header: 'Nombre del Fondo',
      render: (fund: Fund) => (
        <div>
          <div className="font-medium text-gray-900">{fund.name}</div>
          <div className="text-sm text-gray-500">{fund.category}</div>
        </div>
      )
    },
    {
      key: 'minimum_amount',
      header: 'Monto Mínimo',
      render: (fund: Fund) => formatCurrency(fund.minimum_amount)
    },
    {
      key: 'is_active',
      header: 'Estado',
      render: (fund: Fund) => (
        <Badge variant={fund.is_active ? 'success' : 'error'}>
          {fund.is_active ? 'Activo' : 'Inactivo'}
        </Badge>
      )
    },
    {
      key: 'actions',
      header: 'Acciones',
      render: (fund: Fund) => (
        <Button
          size="sm"
          onClick={() => handleSubscribe(fund)}
          disabled={!fund.is_active}
        >
          Suscribirse
        </Button>
      )
    }
  ];

  const handleSubscribe = (fund: Fund) => {
    setSelectedFund(fund);
    setIsModalOpen(true);
  };

  const handleSubscribeSuccess = () => {
    setIsModalOpen(false);
    setSelectedFund(null);
    refetch(); // Refrescar lista de fondos
    onSubscriptionChange?.(); // Refrescar estadísticas del dashboard
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-lg font-medium text-gray-900">
          Fondos Disponibles
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar fondos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 w-full sm:w-64"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <Table
        data={filteredFunds}
        columns={columns}
        loading={isLoading}
        error={error || undefined}
        onRetry={refetch}
        emptyMessage="No se encontraron fondos"
      />

      {/* Subscribe Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Suscribirse a ${selectedFund?.name}`}
        size="md"
      >
        {selectedFund && (
          <SubscribeFundForm
            fund={selectedFund}
            onSuccess={handleSubscribeSuccess}
            onCancel={() => setIsModalOpen(false)}
          />
        )}
      </Modal>
    </div>
  );
}
