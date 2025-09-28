import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Heart, ShoppingCart, Eye, Clock, Flame } from 'lucide-react';
import { StarRating } from '@/components/atoms/StarRating';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { Product } from '@/types';
import { cn } from '@/lib/utils';

interface DealCardProps {
  product: Product;
  className?: string;
  showCountdown?: boolean;
  dealEndTime?: Date;
}

export const DealCard: React.FC<DealCardProps> = ({
  product,
  className = '',
  showCountdown = false,
  dealEndTime,
}) => {
  const navigate = useNavigate();
  const { addToCart } = useCartStore();
  const {
    items: wishlistItems,
    addToWishlist,
    removeFromWishlist,
  } = useWishlistStore();

  const [isImageLoading, setIsImageLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
  }>({ hours: 0, minutes: 0, seconds: 0 });

  const isInWishlist = wishlistItems.some(
    (item) => item.productId === product.id
  );

  // Calculate discount percentage
  const discountPercentage = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  // Countdown timer effect
  useEffect(() => {
    if (!showCountdown || !dealEndTime) return;

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = dealEndTime.getTime() - now;

      if (distance > 0) {
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({ hours, minutes, seconds });
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [showCountdown, dealEndTime]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/product/${product.id}`);
  };

  const handleNavigateToProduct = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <Card
      className={cn(
        'group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02]',
        'bg-white border border-gray-200',
        className
      )}
    >
      {/* Deal Badge & Timer */}
      <div className="absolute top-2 left-2 right-2 z-10 flex items-start justify-between">
        <div className="flex flex-col gap-1">
          {discountPercentage > 0 && (
            <Badge
              variant="destructive"
              className="bg-red-500 text-white px-2 py-1 text-xs font-bold animate-pulse"
            >
              <Flame className="w-3 h-3 mr-1" />-{discountPercentage}%
            </Badge>
          )}

          {!product.inStock && (
            <Badge
              variant="secondary"
              className="bg-gray-500 text-white px-2 py-1 text-xs"
            >
              Out of Stock
            </Badge>
          )}
        </div>

        {showCountdown && dealEndTime && (
          <div className="bg-black/80 text-white rounded-md px-2 py-1 text-xs font-mono">
            <div className="flex items-center gap-1 mb-1">
              <Clock className="w-3 h-3" />
              <span className="text-xs">Ends in</span>
            </div>
            <div className="flex gap-1">
              <span>{timeLeft.hours.toString().padStart(2, '0')}</span>
              <span>:</span>
              <span>{timeLeft.minutes.toString().padStart(2, '0')}</span>
              <span>:</span>
              <span>{timeLeft.seconds.toString().padStart(2, '0')}</span>
            </div>
          </div>
        )}
      </div>

      {/* Wishlist Button */}
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          'absolute top-2 right-2 z-10 w-8 h-8 rounded-full',
          'bg-white/90 hover:bg-white border border-gray-200',
          'opacity-0 group-hover:opacity-100 transition-all duration-300',
          isInWishlist && 'opacity-100 bg-red-50 border-red-200'
        )}
        onClick={handleWishlistToggle}
      >
        <Heart
          className={cn(
            'h-4 w-4 transition-colors',
            isInWishlist ? 'fill-red-500 text-red-500' : 'text-gray-600'
          )}
        />
      </Button>

      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-50 cursor-pointer" onClick={handleNavigateToProduct}>
        {isImageLoading && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
        <img
          src={product.images[0] || '/placeholder-product.jpg'}
          alt={product.name}
          className={cn(
            'w-full h-full object-cover transition-all duration-300 group-hover:scale-105',
            isImageLoading ? 'opacity-0' : 'opacity-100'
          )}
          onLoad={() => setIsImageLoading(false)}
          onError={() => setIsImageLoading(false)}
        />

        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300">
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="secondary"
                className="bg-white/90 hover:bg-white"
                onClick={handleQuickView}
              >
                <Eye className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Quick View</span>
              </Button>
              {product.inStock && (
                <Button
                  size="sm"
                  className="bg-primary hover:bg-primary/90"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Add to Cart</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <CardContent className="p-4">
        {/* Product Info */}
        <div className="space-y-3">
          {/* Brand & Category */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span className="truncate">{product.brand}</span>
            <span className="truncate">{product.category}</span>
          </div>

          {/* Product Name */}
          <h3 
            className="font-semibold text-gray-900 line-clamp-2 text-sm leading-tight min-h-[2.5rem] cursor-pointer hover:text-primary transition-colors"
            onClick={handleNavigateToProduct}
          >
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <StarRating rating={product.rating} size="sm" />
            <span className="text-xs text-gray-500">
              ({product.reviewCount})
            </span>
          </div>

          <Separator />

          {/* Price Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-primary">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              {discountPercentage > 0 && (
                <Badge
                  variant="outline"
                  className="text-xs text-green-600 border-green-200"
                >
                  Save $
                  {((product.originalPrice || 0) - product.price).toFixed(2)}
                </Badge>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  'w-2 h-2 rounded-full',
                  product.inStock ? 'bg-green-500' : 'bg-red-500'
                )}
              />
              <span
                className={cn(
                  'text-xs',
                  product.inStock ? 'text-green-600' : 'text-red-600'
                )}
              >
                {product.inStock
                  ? `${product.stockQuantity} in stock`
                  : 'Out of stock'}
              </span>
            </div>
          </div>

          {/* Action Button */}
          <Button
            className="w-full"
            disabled={!product.inStock}
            onClick={handleAddToCart}
          >
            {product.inStock ? (
              <>
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </>
            ) : (
              'Out of Stock'
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
