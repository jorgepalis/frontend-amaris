'use client';

import { useState } from 'react';
import { fundsApi } from '@/services/api';
import type { ApiResponse } from '@/types';

export function useFundActions() {
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const subscribe = async (fundId: string): Promise<ApiResponse<any> | null> => {
    try {
      setIsSubscribing(true);
      setError(null);
      const result = await fundsApi.subscribe(fundId);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al suscribirse al fondo';
      setError(errorMessage);
      console.error('Error subscribing to fund:', err);
      return null;
    } finally {
      setIsSubscribing(false);
    }
  };

  const cancel = async (fundId: string): Promise<ApiResponse<any> | null> => {
    try {
      setIsCancelling(true);
      setError(null);
      const result = await fundsApi.cancel(fundId);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cancelar la suscripción';
      setError(errorMessage);
      console.error('Error cancelling fund subscription:', err);
      return null;
    } finally {
      setIsCancelling(false);
    }
  };

  return {
    subscribe,
    cancel,
    isSubscribing,
    isCancelling,
    error,
    clearError: () => setError(null),
  };
}
