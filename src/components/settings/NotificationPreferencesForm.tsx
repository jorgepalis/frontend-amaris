'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-hot-toast';
import { Mail, MessageSquare, Bell, Settings } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useNotificationPreferences } from '@/hooks/useNotificationPreferences';

const preferencesSchema = z.object({
  notification_type: z.enum(['email', 'sms']),
  email_enabled: z.boolean(),
  sms_enabled: z.boolean(),
});

type PreferencesFormData = z.infer<typeof preferencesSchema>;

export function NotificationPreferencesForm() {
  const { preferences, isLoading, updatePreferences } = useNotificationPreferences();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isDirty }
  } = useForm<PreferencesFormData>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: {
      notification_type: preferences?.notification_type || 'email',
      email_enabled: preferences?.email_enabled || false,
      sms_enabled: preferences?.sms_enabled || false,
    }
  });

  // Update form when preferences load
  useEffect(() => {
    if (preferences) {
      setValue('notification_type', preferences.notification_type);
      setValue('email_enabled', preferences.email_enabled);
      setValue('sms_enabled', preferences.sms_enabled);
    }
  }, [preferences, setValue]);

  const notificationType = watch('notification_type');
  const emailEnabled = watch('email_enabled');
  const smsEnabled = watch('sms_enabled');

  const onSubmit = async (data: PreferencesFormData) => {
    setIsSubmitting(true);
    try {
      await updatePreferences(data);
      toast.success('Preferencias actualizadas correctamente');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-primary-100 rounded-lg p-2">
          <Bell className="h-5 w-5 text-primary-600" />
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900">
            Preferencias de Notificaciones
          </h3>
          <p className="text-sm text-gray-500">
            Configura cómo deseas recibir las notificaciones de tus transacciones
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Notification Type */}
        <div className="space-y-4">
          <label className="text-sm font-medium text-gray-700">
            Tipo de notificación preferido
          </label>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="relative">
              <input
                type="radio"
                value="email"
                {...register('notification_type')}
                className="sr-only peer"
              />
              <div className="border-2 border-gray-200 rounded-lg p-4 cursor-pointer peer-checked:border-primary-500 peer-checked:bg-primary-50 hover:border-gray-300 transition-colors">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gray-400 peer-checked:text-primary-600" />
                  <div>
                    <div className="font-medium text-gray-900">Email</div>
                    <div className="text-sm text-gray-500">Recibir por correo electrónico</div>
                  </div>
                </div>
              </div>
            </label>

            <label className="relative">
              <input
                type="radio"
                value="sms"
                {...register('notification_type')}
                className="sr-only peer"
              />
              <div className="border-2 border-gray-200 rounded-lg p-4 cursor-pointer peer-checked:border-primary-500 peer-checked:bg-primary-50 hover:border-gray-300 transition-colors">
                <div className="flex items-center space-x-3">
                  <MessageSquare className="h-5 w-5 text-gray-400 peer-checked:text-primary-600" />
                  <div>
                    <div className="font-medium text-gray-900">SMS</div>
                    <div className="text-sm text-gray-500">Recibir por mensaje de texto</div>
                  </div>
                </div>
              </div>
            </label>
          </div>
        </div>

        {/* Enable/Disable Options */}
        <div className="space-y-4">
          <label className="text-sm font-medium text-gray-700">
            Canales activos
          </label>
          
          <div className="space-y-3">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                {...register('email_enabled')}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-700">Habilitar notificaciones por email</span>
              </div>
            </label>

            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                {...register('sms_enabled')}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-700">Habilitar notificaciones por SMS</span>
              </div>
            </label>
          </div>
        </div>

        {/* Preview */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-2">Vista previa de configuración</h4>
          <div className="space-y-1 text-sm text-gray-600">
            <p>• Tipo preferido: {notificationType === 'email' ? 'Email' : 'SMS'}</p>
            <p>• Email: {emailEnabled ? 'Habilitado' : 'Deshabilitado'}</p>
            <p>• SMS: {smsEnabled ? 'Habilitado' : 'Deshabilitado'}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-3">
          <Button
            type="submit"
            isLoading={isSubmitting}
            disabled={!isDirty}
          >
            <Settings className="h-4 w-4 mr-2" />
            Guardar Preferencias
          </Button>
        </div>
      </form>
    </Card>
  );
}
