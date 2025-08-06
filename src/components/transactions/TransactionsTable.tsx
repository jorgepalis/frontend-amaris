'use client';

import { Badge } from '@/components/ui/Badge';
import { Table } from '@/components/ui/Table';
import { useTransactions } from '@/hooks/useTransactions';
import { Transaction } from '@/types';
import { formatCurrency, formatDate } from '@/lib/utils';
import { ArrowUpCircle, ArrowDownCircle, Clock, CheckCircle, XCircle } from 'lucide-react';

interface TransactionsTableProps {
  limit?: number;
}

export function TransactionsTable({ limit = 10 }: TransactionsTableProps) {
  const { transactions, isLoading, error, refetch } = useTransactions(limit);

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'SUBSCRIPTION':
        return <ArrowUpCircle className="h-4 w-4 text-green-500" />;
      case 'CANCELLATION':
        return <ArrowDownCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'FAILED':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'PENDING':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'success';
      case 'FAILED':
        return 'error';
      case 'PENDING':
        return 'warning';
      default:
        return 'default';
    }
  };

  const columns = [
    {
      key: 'type',
      header: 'Tipo',
      render: (transaction: Transaction) => (
        <div className="flex items-center space-x-2">
          {getTransactionIcon(transaction.transaction_type)}
          <span className="text-sm font-medium">
            {transaction.transaction_type_display}
          </span>
        </div>
      )
    },
    {
      key: 'fund_name',
      header: 'Fondo',
      render: (transaction: Transaction) => (
        <div>
          <div className="font-medium text-gray-900">{transaction.fund_name}</div>
        </div>
      )
    },
    {
      key: 'amount',
      header: 'Monto',
      render: (transaction: Transaction) => (
        <div className={`font-medium ${
          transaction.transaction_type === 'SUBSCRIPTION' 
            ? 'text-green-600' 
            : 'text-red-600'
        }`}>
          {transaction.transaction_type === 'SUBSCRIPTION' ? '+' : '-'}
          {transaction.formatted_amount}
        </div>
      )
    },
    {
      key: 'status',
      header: 'Estado',
      render: (transaction: Transaction) => (
        <div className="flex items-center space-x-2">
          {getStatusIcon(transaction.status)}
          <Badge variant={getStatusVariant(transaction.status) as any}>
            {transaction.status === 'COMPLETED' ? 'Completada' :
             transaction.status === 'FAILED' ? 'Fallida' :
             transaction.status === 'PENDING' ? 'Pendiente' : transaction.status}
          </Badge>
        </div>
      )
    },
    {
      key: 'created_at',
      header: 'Fecha',
      render: (transaction: Transaction) => formatDate(transaction.created_at)
    },
    {
      key: 'notification',
      header: 'Notificación',
      render: (transaction: Transaction) => (
        <Badge variant={transaction.notification_sent ? 'success' : 'warning'} size="sm">
          {transaction.notification_sent ? 'Enviada' : 'Pendiente'}
        </Badge>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-gray-900">
          Historial de Transacciones
        </h2>
        <span className="text-sm text-gray-500">
          Últimas {limit} transacciones
        </span>
      </div>

      <Table
        data={transactions}
        columns={columns}
        loading={isLoading}
        error={error || undefined}
        onRetry={refetch}
        emptyMessage="No hay transacciones registradas"
      />
    </div>
  );
}
