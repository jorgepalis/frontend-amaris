'use client';

import { Info, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InfoMessageProps {
  title?: string;
  message: string;
  onDismiss?: () => void;
  className?: string;
}

export function InfoMessage({ 
  title = 'Información', 
  message, 
  onDismiss, 
  className 
}: InfoMessageProps) {
  return (
    <div className={cn(
      'bg-blue-50 border border-blue-200 rounded-lg p-4',
      className
    )}>
      <div className="flex">
        <div className="flex-shrink-0">
          <Info className="h-5 w-5 text-blue-400" />
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium text-blue-800">
            {title}
          </h3>
          <div className="mt-2 text-sm text-blue-700">
            <p>{message}</p>
          </div>
        </div>
        {onDismiss && (
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                type="button"
                onClick={onDismiss}
                className="inline-flex bg-blue-50 rounded-md p-1.5 text-blue-500 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-50 focus:ring-blue-600"
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
