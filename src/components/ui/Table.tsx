'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { SuccessMessage } from '@/components/ui/SuccessMessage';
import { InfoMessage } from '@/components/ui/InfoMessage';

interface TableColumn<T> {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
  sortable?: boolean;
  className?: string;
}

interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  loading?: boolean;
  error?: string;
  onRetry?: () => void;
  emptyMessage?: string;
  className?: string;
  rowClassName?: (item: T) => string;
  onRowClick?: (item: T) => void;
}

export function Table<T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  error,
  onRetry,
  emptyMessage = 'No hay datos disponibles',
  className,
  rowClassName,
  onRowClick
}: TableProps<T>) {
  if (error) {
    return (
      <ErrorMessage
        title="Error al cargar datos"
        message={error}
        onRetry={onRetry}
      />
    );
  }

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <InfoMessage
        title="Sin datos"
        message={emptyMessage}
      />
    );
  }

  return (
    <div className={cn('bg-white shadow rounded-lg overflow-hidden', className)}>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={cn(
                    'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
                    column.className
                  )}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item, index) => (
              <tr
                key={index}
                className={cn(
                  'hover:bg-gray-50 transition-colors',
                  onRowClick && 'cursor-pointer',
                  rowClassName?.(item)
                )}
                onClick={() => onRowClick?.(item)}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={cn(
                      'px-6 py-4 whitespace-nowrap text-sm text-gray-900',
                      column.className
                    )}
                  >
                    {column.render 
                      ? column.render(item)
                      : item[column.key]
                    }
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
