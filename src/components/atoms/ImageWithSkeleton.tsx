import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  optimizeImageUrl,
  FALLBACK_IMAGES,
  getCategoryFallback,
} from '@/utils/imageUtils';

interface ImageWithSkeletonProps {
  src: string;
  alt: string;
  className?: string;
  skeletonClassName?: string;
  onLoad?: () => void;
  onError?: () => void;
  fallbackSrc?: string;
  category?: string; // For category-specific fallbacks
  width?: number;
  height?: number;
  quality?: number;
}

export const ImageWithSkeleton: React.FC<ImageWithSkeletonProps> = ({
  src,
  alt,
  className,
  skeletonClassName,
  onLoad,
  onError,
  fallbackSrc,
  category,
  width = 800,
  height = 800,
  quality = 85,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Optimize the source image URL
  const optimizedSrc = optimizeImageUrl(src, width, height, quality);

  // Get fallback based on category or use provided fallback
  const finalFallback =
    fallbackSrc ||
    (category ? getCategoryFallback(category) : FALLBACK_IMAGES.default);

  const [currentSrc, setCurrentSrc] = useState(optimizedSrc);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);

    if (finalFallback && currentSrc !== finalFallback) {
      setCurrentSrc(finalFallback);
      setHasError(false);
      setIsLoading(true);
    }

    onError?.();
  };

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {/* Skeleton */}
      {isLoading && (
        <div
          className={cn(
            'absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center',
            skeletonClassName
          )}
        >
          <div className="text-gray-400 text-sm">Loading...</div>
        </div>
      )}

      {/* Error state */}
      {hasError && !finalFallback && (
        <div
          className={cn(
            'absolute inset-0 bg-gray-100 flex items-center justify-center border',
            skeletonClassName
          )}
        >
          <div className="text-gray-400 text-sm text-center px-2">
            <div className="mb-1">
              <span role="img" aria-label="Camera icon">
                📷
              </span>
            </div>
            <div>Image not available</div>
          </div>
        </div>
      )}

      {/* Actual image */}
      <img
        src={currentSrc}
        alt={alt}
        className={cn(
          'transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100',
          className
        )}
        onLoad={handleLoad}
        onError={handleError}
        style={{ display: hasError && !finalFallback ? 'none' : 'block' }}
      />
    </div>
  );
};
