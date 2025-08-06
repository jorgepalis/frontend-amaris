'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-hot-toast';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useNotificationPreferences } from '@/hooks/useNotificationPreferences';
import { Mail, MessageSquare, Bell } from 'lucide-react';

const notificationSchema = z.object({
  notification_type: z.enum(['email', 'sms'], {
    required_error: 'Debes seleccionar un tipo de notificación'
  }),
});

type NotificationFormData = z.infer<typeof notificationSchema>;

export function NotificationPreferences() {
  const { preferences, isLoading, updatePreferences } = useNotificationPreferences();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm<NotificationFormData>({
    resolver: zodResolver(notificationSchema),
    defaultValues: {
      notification_type: preferences?.notification_type || 'email',
    }
  });

  // Update form when preferences load
  useEffect(() => {
    if (preferences) {
      setValue('notification_type', preferences.notification_type);
    }
  }, [preferences, setValue]);

  const notificationType = watch('notification_type');

  const onSubmit = async (data: NotificationFormData) => {
    setIsSubmitting(true);
    try {
      await updatePreferences(data);
      toast.success('Preferencias de notificación actualizadas');
    } catch (error: any) {
      toast.error(error.message || 'Error al actualizar las preferencias');
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
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Bell className="h-6 w-6 text-primary-600" />
        <h2 className="text-lg font-medium text-gray-900">
          Preferencias de Notificación
        </h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Notification Type Selection */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-700">
            Tipo de Notificación Preferido
          </h3>
          
          <div className="space-y-3">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                value="email"
                {...register('notification_type')}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
              />
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gray-500" />
                <div>
                  <span className="text-sm font-medium text-gray-700">
                    Notificaciones por Email
                  </span>
                  <p className="text-xs text-gray-500">
                    Recibirás notificaciones en tu correo electrónico registrado
                  </p>
                </div>
              </div>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                value="sms"
                {...register('notification_type')}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
              />
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4 text-gray-500" />
                <div>
                  <span className="text-sm font-medium text-gray-700">
                    Notificaciones por SMS
                  </span>
                  <p className="text-xs text-gray-500">
                    Recibirás notificaciones en tu teléfono registrado
                  </p>
                </div>
              </div>
            </label>
          </div>

          {errors.notification_type && (
            <p className="text-sm text-red-600">{errors.notification_type.message}</p>
          )}
        </div>

        {/* Current Settings Display */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-2">Configuración Actual</h4>
          <div className="space-y-1 text-sm text-gray-600">
            <p>• Tipo seleccionado: {notificationType === 'email' ? 'Email' : 'SMS'}</p>
            <p>• Email habilitado: {preferences?.email_enabled ? 'Sí' : 'No'}</p>
            <p>• SMS habilitado: {preferences?.sms_enabled ? 'Sí' : 'No'}</p>
          </div>
        </div>

        {/* Info Text */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-700">
            Recibirás notificaciones cuando te suscribas o canceles una suscripción a un fondo.
            Los datos de contacto (email y teléfono) se toman de tu perfil de usuario.
          </p>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button
            type="submit"
            isLoading={isSubmitting}
          >
            Guardar Preferencias
          </Button>
        </div>
      </form>
    </Card>
  );
}
