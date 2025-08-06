'use client';

import { CheckCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SuccessMessageProps {
  title?: string;
  message: string;
  onDismiss?: () => void;
  className?: string;
}

export function SuccessMessage({ 
  title = 'Éxito', 
  message, 
  onDismiss, 
  className 
}: SuccessMessageProps) {
  return (
    <div className={cn(
      'bg-success-50 border border-success-200 rounded-lg p-4',
      className
    )}>
      <div className="flex">
        <div className="flex-shrink-0">
          <CheckCircle className="h-5 w-5 text-success-400" />
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium text-success-800">
            {title}
          </h3>
          <div className="mt-2 text-sm text-success-700">
            <p>{message}</p>
          </div>
        </div>
        {onDismiss && (
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                type="button"
                onClick={onDismiss}
                className="inline-flex bg-success-50 rounded-md p-1.5 text-success-500 hover:bg-success-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-success-50 focus:ring-success-600"
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
