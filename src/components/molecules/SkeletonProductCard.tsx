import React from 'react';
import { Card, CardContent } from '../atoms';
import { cn } from '@/lib/utils';

interface SkeletonProductCardProps {
  className?: string;
}

export const SkeletonProductCard: React.FC<SkeletonProductCardProps> = ({
  className,
}) => {
  return (
    <Card className={cn('overflow-hidden', className)}>
      <div className="relative aspect-square overflow-hidden bg-gray-200 animate-pulse" />

      <CardContent className="p-3 sm:p-4 space-y-3">
        {/* Product name skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
        </div>

        {/* Rating skeleton */}
        <div className="flex items-center gap-2">
          <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-12 bg-gray-200 rounded animate-pulse" />
        </div>

        {/* Price skeleton */}
        <div className="flex items-center gap-2">
          <div className="h-6 w-16 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-12 bg-gray-200 rounded animate-pulse" />
        </div>

        {/* Button skeleton */}
        <div className="h-9 bg-gray-200 rounded animate-pulse" />
      </CardContent>
    </Card>
  );
};
