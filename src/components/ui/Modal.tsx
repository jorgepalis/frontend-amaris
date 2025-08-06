'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizes = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl'
};

export function Modal({
  isOpen,
  onClose,
  children,
  title,
  size = 'md',
  className
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Overlay */}
        <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        />

        {/* Center modal */}
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
          &#8203;
        </span>

        <div className={cn(
          'inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:p-6 w-full',
          sizes[size],
          className
        )}>
          {title && (
            <div className="mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                {title}
              </h3>
            </div>
          )}
          
          {children}
        </div>
      </div>
    </div>
  );
}
