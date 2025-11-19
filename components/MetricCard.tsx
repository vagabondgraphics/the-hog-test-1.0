'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

interface MetricCardProps {
  label: string;
  value: number | string;
  trend?: {
    direction: 'up' | 'down' | 'neutral';
    value: string;
  };
  subtitle?: string;
  href?: string;
}

export default function MetricCard({ label, value, trend, subtitle, href }: MetricCardProps) {
  const router = useRouter();
  const getTrendColor = (direction: 'up' | 'down' | 'neutral') => {
    switch (direction) {
      case 'up':
        return 'text-success';
      case 'down':
        return 'text-danger';
      default:
        return 'text-neutral';
    }
  };

  const getTrendIcon = (direction: 'up' | 'down' | 'neutral') => {
    switch (direction) {
      case 'up':
        return '↗';
      case 'down':
        return '↘';
      default:
        return '→';
    }
  };

  const handleClick = () => {
    if (href) {
      router.push(href);
    }
  };

  return (
    <div
      className={`p-4 ${href ? 'cursor-pointer hover:bg-gray-50 transition-colors' : ''}`}
      onClick={handleClick}
    >
      <div className="text-caption text-neutral mb-1">{label}</div>
      <div className="text-4xl font-bold text-gray-900 mb-1 leading-tight">{value}</div>
      {trend && (
        <div className={`text-xs ${getTrendColor(trend.direction)}`}>
          <span>{trend.value}</span>
        </div>
      )}
      {subtitle && (
        <div className="text-xs text-neutral mt-1">{subtitle}</div>
      )}
    </div>
  );
}
