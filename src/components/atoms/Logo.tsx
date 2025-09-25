import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'full' | 'icon' | 'text';
}

const logoSizes = {
  sm: 'h-6',
  md: 'h-8',
  lg: 'h-12',
};

export const Logo: React.FC<LogoProps> = ({
  className,
  size = 'md',
  variant = 'full',
}) => {
  if (variant === 'icon') {
    return (
      <div
        className={cn(
          'rounded-lg bg-primary text-primary-foreground font-bold flex items-center justify-center aspect-square',
          logoSizes[size],
          className
        )}
      >
        C
      </div>
    );
  }

  if (variant === 'text') {
    return (
      <span
        className={cn(
          'font-bold text-foreground',
          size === 'sm' && 'text-lg',
          size === 'md' && 'text-xl',
          size === 'lg' && 'text-2xl',
          className
        )}
      >
        Clicon
      </span>
    );
  }

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div
        className={cn(
          'rounded-lg bg-primary text-primary-foreground font-bold flex items-center justify-center aspect-square',
          logoSizes[size]
        )}
      >
        C
      </div>
      <span
        className={cn(
          'font-bold text-foreground',
          size === 'sm' && 'text-lg',
          size === 'md' && 'text-xl',
          size === 'lg' && 'text-2xl'
        )}
      >
        Clicon
      </span>
    </div>
  );
};
