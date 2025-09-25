import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  readonly?: boolean;
  onRatingChange?: (rating: number) => void;
  className?: string;
}

const starSizes = {
  sm: 'h-3 w-3',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
};

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxRating = 5,
  size = 'md',
  showValue = false,
  readonly = true,
  onRatingChange,
  className,
}) => {
  const [hoverRating, setHoverRating] = React.useState(0);

  const handleStarClick = (starValue: number) => {
    if (!readonly && onRatingChange) {
      onRatingChange(starValue);
    }
  };

  const handleStarHover = (starValue: number) => {
    if (!readonly) {
      setHoverRating(starValue);
    }
  };

  const handleMouseLeave = () => {
    if (!readonly) {
      setHoverRating(0);
    }
  };

  const getStarFill = (starIndex: number) => {
    const value = hoverRating || rating;
    if (value >= starIndex) {
      return 'fill-yellow-400 text-yellow-400';
    } else if (value >= starIndex - 0.5) {
      return 'fill-yellow-400/50 text-yellow-400';
    }
    return 'fill-gray-200 text-gray-200';
  };

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <div className="flex items-center" onMouseLeave={handleMouseLeave}>
        {Array.from({ length: maxRating }, (_, i) => i + 1).map((starValue) => (
          <button
            key={starValue}
            type="button"
            className={cn(
              'transition-colors duration-150',
              readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'
            )}
            onClick={() => handleStarClick(starValue)}
            onMouseEnter={() => handleStarHover(starValue)}
            disabled={readonly}
          >
            <Star
              className={cn(
                starSizes[size],
                getStarFill(starValue),
                'transition-all duration-150'
              )}
            />
          </button>
        ))}
      </div>
      {showValue && (
        <span className="text-sm text-muted-foreground ml-1">
          ({rating.toFixed(1)})
        </span>
      )}
    </div>
  );
};
