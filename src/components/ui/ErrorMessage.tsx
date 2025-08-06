'use client';

import { AlertTriangle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ErrorMessageProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  onDismiss?: () => void;
  className?: string;
}

export function ErrorMessage({ 
  title = 'Error', 
  message, 
  onRetry, 
  onDismiss, 
  className 
}: ErrorMessageProps) {
  return (
    <div className={cn(
      'bg-error-50 border border-error-200 rounded-lg p-4',
      className
    )}>
      <div className="flex">
        <div className="flex-shrink-0">
          <AlertTriangle className="h-5 w-5 text-error-400" />
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium text-error-800">
            {title}
          </h3>
          <div className="mt-2 text-sm text-error-700">
            <p>{message}</p>
          </div>
          {onRetry && (
            <div className="mt-4">
              <button
                type="button"
                onClick={onRetry}
                className="bg-error-100 px-3 py-2 rounded-md text-sm font-medium text-error-800 hover:bg-error-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-error-500"
              >
                Reintentar
              </button>
            </div>
          )}
        </div>
        {onDismiss && (
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                type="button"
                onClick={onDismiss}
                className="inline-flex bg-error-50 rounded-md p-1.5 text-error-500 hover:bg-error-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-error-50 focus:ring-error-600"
              >
                <span className="sr-only">Cerrar</span>
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
