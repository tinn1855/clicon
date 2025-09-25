import React from 'react';
import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react';
import { Card, CardContent, Button, Badge, ImageWithSkeleton } from '../atoms';
import { StarRating } from '../atoms/StarRating';
import { Price } from '../atoms/Price';
import { WishlistIconButton } from './WishlistButton';
import { CartButton } from './CartButton';
import { cn } from '@/lib/utils';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onAddToWishlist?: (product: Product) => void;
  onQuickView?: (product: Product) => void;
  className?: string;
  variant?: 'default' | 'compact' | 'featured';
  wishlistMode?: boolean; // True when showing in wishlist (changes heart icon behavior)
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onAddToWishlist,
  onQuickView,
  className,
  variant = 'default',
  wishlistMode = false,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const discountPercentage = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  return (
    <Card
      className={cn(
        'group relative overflow-hidden transition-all duration-300 hover:shadow-lg',
        variant === 'compact' && 'max-w-sm',
        variant === 'featured' && 'max-w-md',
        'transform-gpu',
        className
      )}
      style={{ contain: 'layout style' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div
        className="relative aspect-square overflow-hidden bg-gray-50"
        style={{ contain: 'layout' }}
      >
        <Link to={`/product/${product.id}`}>
          <ImageWithSkeleton
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-102 cursor-pointer transform-gpu"
            skeletonClassName="rounded-none"
            category={product.category}
            width={400}
            height={400}
            quality={90}
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-2 sm:top-3 left-2 sm:left-3 flex flex-col gap-1 sm:gap-2">
          {!product.inStock && (
            <Badge variant="destructive" className="text-xs">
              Out of Stock
            </Badge>
          )}
          {discountPercentage > 0 && (
            <Badge variant="sale" className="text-xs font-bold">
              -{discountPercentage}%
            </Badge>
          )}
          {product.tags.includes('new') && (
            <Badge variant="new" className="text-xs">
              New
            </Badge>
          )}
          {product.tags.includes('featured') && (
            <Badge variant="featured" className="text-xs">
              Featured
            </Badge>
          )}
          {product.tags.includes('bestseller') && (
            <Badge variant="success" className="text-xs">
              Best Seller
            </Badge>
          )}
        </div>

        {/* Action Buttons */}
        <div
          className={cn(
            'absolute top-2 sm:top-3 right-2 sm:right-3 flex flex-col gap-1 sm:gap-2 transition-opacity duration-300',
            isHovered ? 'opacity-100' : 'opacity-0 sm:opacity-0',
            'opacity-100 sm:opacity-0' // Always visible on mobile
          )}
        >
          <WishlistIconButton
            product={product}
            className={cn(
              'h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-white/90 hover:bg-white',
              wishlistMode && 'bg-red-100 text-red-600 hover:bg-red-200'
            )}
          />

          <Button
            size="sm"
            variant="secondary"
            className="h-7 w-7 sm:h-8 sm:w-8 p-0 rounded-full bg-white/90 hover:bg-white"
            onClick={() => onQuickView?.(product)}
          >
            <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        </div>

        {/* Quick Add to Cart */}
        <div
          className={cn(
            'absolute bottom-0 left-0 right-0 p-2 sm:p-3 transition-transform duration-300',
            isHovered ? 'translate-y-0' : 'translate-y-full',
            'translate-y-0 sm:translate-y-full' // Always visible on mobile
          )}
        >
          <CartButton
            product={product}
            className="w-full text-xs sm:text-sm py-2"
          />
        </div>
      </div>

      {/* Product Info */}
      <CardContent className="p-3 sm:p-4">
        <div className="space-y-1 sm:space-y-2">
          {/* Category Badge */}
          <div className="flex items-center justify-between">
            <Link to={`/category/${product.category.toLowerCase()}`}>
              <Badge
                variant="category"
                className="text-xs hover:bg-gray-200 cursor-pointer"
              >
                {product.category}
              </Badge>
            </Link>
          </div>

          {/* Product Name */}
          <Link to={`/product/${product.id}`}>
            <h3 className="font-medium line-clamp-2 text-sm sm:text-base leading-tight hover:text-primary transition-colors cursor-pointer">
              {product.name}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-1 sm:gap-2">
            <StarRating rating={product.rating} size="sm" />
            <span className="text-xs text-muted-foreground">
              ({product.reviewCount})
            </span>
          </div>

          {/* Price */}
          <div className="pt-1">
            <Price
              price={product.price}
              originalPrice={product.originalPrice}
              size="sm"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
