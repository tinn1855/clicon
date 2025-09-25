import React from 'react';
import { cn } from '@/lib/utils';

interface PriceProps {
  price: number;
  originalPrice?: number;
  currency?: string;
  size?: 'sm' | 'md' | 'lg';
  showDiscount?: boolean;
  className?: string;
}

const priceSizes = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

export const Price: React.FC<PriceProps> = ({
  price,
  originalPrice,
  currency = '$',
  size = 'md',
  showDiscount = true,
  className,
}) => {
  const hasDiscount = originalPrice && originalPrice > price;
  const discountPercentage = hasDiscount
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  const formatPrice = (amount: number) => {
    return `${currency}${amount.toFixed(2)}`;
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span className={cn('font-semibold text-foreground', priceSizes[size])}>
        {formatPrice(price)}
      </span>

      {hasDiscount && (
        <>
          <span
            className={cn(
              'text-muted-foreground line-through',
              size === 'sm' && 'text-xs',
              size === 'md' && 'text-sm',
              size === 'lg' && 'text-base'
            )}
          >
            {formatPrice(originalPrice)}
          </span>

          {showDiscount && (
            <span
              className={cn(
                'bg-red-100 text-red-600 px-1.5 py-0.5 rounded text-xs font-medium',
                'dark:bg-red-900/20 dark:text-red-400'
              )}
            >
              -{discountPercentage}%
            </span>
          )}
        </>
      )}
    </div>
  );
};
