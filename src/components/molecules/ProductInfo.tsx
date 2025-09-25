import React from 'react';
import {
  Share2,
  ShoppingCart,
  Minus,
  Plus,
  Check,
  Truck,
  Shield,
  RotateCcw,
} from 'lucide-react';
import {
  Button,
  Badge,
  Heading1,
  Heading3,
  Separator,
  Card,
  CardContent,
} from '../atoms';
import { StarRating } from '../atoms/StarRating';
import { Price } from '../atoms/Price';
import { WishlistIconButton } from './WishlistButton';
import { cn } from '@/lib/utils';
import { Product } from '@/types';

interface ProductInfoProps {
  product: Product;
  onAddToCart?: (product: Product, quantity: number) => void;
  className?: string;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({
  product,
  onAddToCart,
  className,
}) => {
  const [quantity, setQuantity] = React.useState(1);
  const [selectedVariant, setSelectedVariant] = React.useState<string>('');

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) =>
      Math.max(1, Math.min(prev + delta, product.stockQuantity))
    );
  };

  const handleAddToCart = () => {
    onAddToCart?.(product, quantity);
  };

  const discountPercentage = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  // Mock variant options (sizes, colors, etc.)
  const mockVariants = ['Small', 'Medium', 'Large', 'XL'];

  return (
    <div className={cn('space-y-6', className)}>
      {/* Breadcrumb */}
      <div className="text-sm text-muted-foreground">
        <span>Home</span> &gt; <span>{product.category}</span> &gt;{' '}
        <span className="text-foreground">{product.name}</span>
      </div>

      {/* Product Title & Rating */}
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-4">
          <Heading1 className="flex-1">{product.name}</Heading1>
          <Button variant="ghost" size="sm" className="shrink-0">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <StarRating rating={product.rating} size="sm" />
          <span className="text-sm text-muted-foreground">
            ({product.reviewCount} reviews)
          </span>
          <Separator orientation="vertical" className="h-4" />
          <span className="text-sm font-medium">SKU: {product.sku}</span>
        </div>
      </div>

      {/* Price */}
      <div className="space-y-2">
        <Price
          price={product.price}
          originalPrice={product.originalPrice}
          size="lg"
        />
        {discountPercentage > 0 && (
          <Badge variant="destructive" className="text-sm">
            Save {discountPercentage}%
          </Badge>
        )}
      </div>

      {/* Stock Status */}
      <div className="flex items-center gap-2">
        {product.inStock ? (
          <>
            <Check className="h-4 w-4 text-green-500" />
            <span className="text-sm text-green-600 font-medium">
              In Stock ({product.stockQuantity} available)
            </span>
          </>
        ) : (
          <span className="text-sm text-red-600 font-medium">Out of Stock</span>
        )}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Heading3>Description</Heading3>
        <p className="text-muted-foreground leading-relaxed">
          {product.description}
        </p>
      </div>

      <Separator />

      {/* Variants (Mock - Size selection) */}
      <div className="space-y-3">
        <Heading3>Size</Heading3>
        <div className="flex gap-2 flex-wrap">
          {mockVariants.map((variant) => (
            <Button
              key={variant}
              variant={selectedVariant === variant ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedVariant(variant)}
              className="min-w-[60px]"
            >
              {variant}
            </Button>
          ))}
        </div>
      </div>

      {/* Quantity & Add to Cart */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center border rounded-lg">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="px-4 py-2 min-w-[60px] text-center">
              {quantity}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleQuantityChange(1)}
              disabled={quantity >= product.stockQuantity}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <Button
            className="flex-1"
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>

          <WishlistIconButton
            product={product}
            className="!p-3 !rounded-lg border border-gray-200"
          />
        </div>
      </div>

      {/* Product Features */}
      <Card>
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center gap-3">
            <Truck className="h-5 w-5 text-primary" />
            <div>
              <div className="font-medium text-sm">Free Shipping</div>
              <div className="text-xs text-muted-foreground">
                On orders over $50
              </div>
            </div>
          </div>

          <Separator />

          <div className="flex items-center gap-3">
            <RotateCcw className="h-5 w-5 text-primary" />
            <div>
              <div className="font-medium text-sm">30-Day Returns</div>
              <div className="text-xs text-muted-foreground">
                Easy return policy
              </div>
            </div>
          </div>

          <Separator />

          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-primary" />
            <div>
              <div className="font-medium text-sm">Secure Payment</div>
              <div className="text-xs text-muted-foreground">
                100% secure checkout
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Product Details */}
      <div className="space-y-3">
        <Heading3>Product Details</Heading3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="text-muted-foreground">Brand:</div>
          <div className="font-medium">{product.brand}</div>

          <div className="text-muted-foreground">Category:</div>
          <div className="font-medium">{product.category}</div>

          <div className="text-muted-foreground">Rating:</div>
          <div className="font-medium">
            {product.rating}/5 ({product.reviewCount} reviews)
          </div>

          <div className="text-muted-foreground">Availability:</div>
          <div className="font-medium">
            {product.inStock
              ? `${product.stockQuantity} in stock`
              : 'Out of stock'}
          </div>
        </div>
      </div>
    </div>
  );
};
