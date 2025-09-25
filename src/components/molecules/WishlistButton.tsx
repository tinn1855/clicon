import React from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/atoms';
import { useWishlistStore } from '@/store';
import { cn } from '@/lib/utils';
import { Product } from '@/types';

interface WishlistButtonProps {
  product: Product;
  className?: string;
  size?: 'sm' | 'default' | 'lg';
  variant?: 'default' | 'ghost' | 'outline' | 'secondary';
  showText?: boolean;
}

/**
 * WishlistButton component that automatically handles add/remove from wishlist
 * Shows filled heart when product is in wishlist, outline when not
 */
export const WishlistButton: React.FC<WishlistButtonProps> = ({
  product,
  className,
  size = 'default',
  variant = 'ghost',
  showText = false,
}) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } =
    useWishlistStore();
  const isWishlisted = isInWishlist(product.id);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation if used inside Link
    e.stopPropagation(); // Prevent event bubbling

    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleToggle}
      className={cn(
        'transition-all duration-200',
        isWishlisted && 'text-black hover:text-gray-800',
        !isWishlisted && 'text-muted-foreground hover:text-black',
        className
      )}
      title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      <Heart
        className={cn(
          'h-4 w-4',
          showText && 'mr-2',
          isWishlisted && 'fill-current'
        )}
      />
      {showText && (
        <span className="hidden sm:inline">
          {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
        </span>
      )}
    </Button>
  );
};

interface WishlistIconButtonProps {
  product: Product;
  className?: string;
}

/**
 * Compact wishlist icon button for use in cards or small spaces
 */
export const WishlistIconButton: React.FC<WishlistIconButtonProps> = ({
  product,
  className,
}) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } =
    useWishlistStore();
  const isWishlisted = isInWishlist(product.id);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <button
      onClick={handleToggle}
      className={cn(
        'p-2 rounded-full bg-white/90 hover:bg-white transition-all duration-200 shadow-sm hover:shadow-md',
        isWishlisted && 'text-black',
        !isWishlisted && 'text-gray-600 hover:text-black',
        className
      )}
      title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      <Heart
        className={cn(
          'h-4 w-4 transition-transform duration-200',
          isWishlisted && 'fill-current scale-110',
          !isWishlisted && 'hover:scale-110'
        )}
      />
    </button>
  );
};

interface WishlistCounterProps {
  className?: string;
}

/**
 * Displays the current wishlist count
 */
export const WishlistCounter: React.FC<WishlistCounterProps> = ({
  className,
}) => {
  const { getWishlistCount } = useWishlistStore();
  const count = getWishlistCount();

  if (count === 0) {
    return null;
  }

  return (
    <span
      className={cn(
        'bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center',
        className
      )}
    >
      {count > 99 ? '99+' : count}
    </span>
  );
};
