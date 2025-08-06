'use client';

import { useState, useEffect } from 'react';
import { NotificationPreferences } from '@/types';
import { notificationsApi } from '@/services/api';

export function useNotificationPreferences() {
  const [preferences, setPreferences] = useState<NotificationPreferences | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPreferences = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await notificationsApi.getPreferences();
      setPreferences(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al cargar las preferencias');
      console.error('Error fetching notification preferences:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const updatePreferences = async (data: any) => {
    try {
      const updated = await notificationsApi.updatePreferences(data);
      setPreferences(updated);
      return updated;
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Error al actualizar las preferencias');
    }
  };

  useEffect(() => {
    fetchPreferences();
  }, []);

  return {
    preferences,
    isLoading,
    error,
    refetch: fetchPreferences,
    updatePreferences,
  };
}
