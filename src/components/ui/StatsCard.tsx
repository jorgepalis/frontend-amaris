'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function StatsCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  className
}: StatsCardProps) {
  return (
    <div className={cn(
      'bg-white rounded-lg shadow p-6',
      className
    )}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 truncate">
            {title}
          </p>
          <p className="text-2xl font-semibold text-gray-900 mt-1">
            {value}
          </p>
          {subtitle && (
            <p className="text-sm text-gray-500 mt-1">
              {subtitle}
            </p>
          )}
        </div>
        {icon && (
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-primary-100 rounded-md flex items-center justify-center">
              {React.cloneElement(icon as React.ReactElement, {
                className: 'w-5 h-5 text-primary-600'
              })}
            </div>
          </div>
        )}
      </div>
      
      {trend && (
        <div className="mt-4 flex items-center">
          <span className={cn(
            'text-sm font-medium',
            trend.isPositive ? 'text-green-600' : 'text-red-600'
          )}>
            {trend.isPositive ? '+' : ''}{trend.value}%
          </span>
        </div>
      )}
    </div>
  );
}
