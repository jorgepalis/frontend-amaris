'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-hot-toast';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Fund } from '@/types';
import { apiClient, fundsApi } from '@/services/api';
import { formatCurrency } from '@/lib/utils';

const subscribeSchema = z.object({
  amount: z.number()
    .min(1, 'El monto debe ser mayor a 0')
    .refine((val) => val >= 0, 'El monto debe ser positivo'),
});

type SubscribeFormData = z.infer<typeof subscribeSchema>;

interface SubscribeFundFormProps {
  fund: Fund;
  onSuccess: () => void;
  onCancel: () => void;
}

export function SubscribeFundForm({ fund, onSuccess, onCancel }: SubscribeFundFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<SubscribeFormData>({
    resolver: zodResolver(subscribeSchema),
    defaultValues: {
      amount: parseFloat(fund.minimum_amount)
    }
  });

  const amount = watch('amount');

  const onSubmit = async (data: SubscribeFormData) => {
    if (data.amount < parseFloat(fund.minimum_amount)) {
      toast.error(`El monto mínimo es ${formatCurrency(parseFloat(fund.minimum_amount))}`);
      return;
    }

    setIsSubmitting(true);
    try {
      await fundsApi.subscribe(fund.id);

      toast.success('Suscripción realizada exitosamente');
      onSuccess();
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Error al realizar la suscripción');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Fund Info */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-medium text-gray-900 mb-2">{fund.name}</h3>
        <p className="text-sm text-gray-600 mb-1">Categoría: {fund.category}</p>
        <p className="text-sm text-gray-600">
          Monto mínimo: {formatCurrency(fund.minimum_amount)}
        </p>
      </div>

      {/* Amount Input */}
      <div className="space-y-2">
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
          Monto a invertir
        </label>
        <Input
          id="amount"
          type="number"
          step="0.01"
          placeholder="Ingrese el monto"
          {...register('amount', { valueAsNumber: true })}
          error={errors.amount?.message}
        />
        {amount && (
          <p className="text-sm text-gray-500">
            Monto: {formatCurrency(amount)}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-end space-x-3">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          isLoading={isSubmitting}
        >
          Confirmar Suscripción
        </Button>
      </div>
    </form>
  );
}
