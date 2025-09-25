import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Share2, ShoppingCart, Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductOptionsProps {
  product: {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    inStock: boolean;
    stockQuantity: number;
    brand: string;
    category: string;
  };
  onAddToCart: (quantity: number) => void;
  onAddToWishlist: () => void;
  isInWishlist: boolean;
}

// Mock size and color options - in real app, this would come from product data
const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const COLORS = [
  { name: 'White', value: '#FFFFFF', available: true },
  { name: 'Black', value: '#000000', available: true },
  { name: 'Navy', value: '#1e293b', available: true },
  { name: 'Gray', value: '#6b7280', available: false },
];

export const ProductOptions: React.FC<ProductOptionsProps> = ({
  product,
  onAddToCart,
  onAddToWishlist,
  isInWishlist,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [wishlistAnimation, setWishlistAnimation] = useState(false);

  const handleQuantityChange = (change: number) => {
    const newQuantity = Math.max(
      1,
      Math.min(product.stockQuantity, quantity + change)
    );
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    onAddToCart(quantity);
  };

  const handleWishlistClick = () => {
    setWishlistAnimation(true);
    setTimeout(() => setWishlistAnimation(false), 600);
    onAddToWishlist();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: `Check out this ${product.name}`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    }
  };

  const discountPercentage = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  return (
    <div className="space-y-6">
      {/* Price Section */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <span className="text-3xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <>
              <span className="text-xl text-gray-500 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
              <Badge variant="destructive" className="animate-pulse">
                -{discountPercentage}%
              </Badge>
            </>
          )}
        </div>

        {/* Stock Status */}
        <div className="flex items-center gap-2">
          <div
            className={cn(
              'w-3 h-3 rounded-full',
              product.inStock ? 'bg-green-500' : 'bg-red-500'
            )}
          />
          <span
            className={cn(
              'text-sm font-medium',
              product.inStock ? 'text-green-600' : 'text-red-600'
            )}
          >
            {product.inStock
              ? `In Stock (${product.stockQuantity} available)`
              : 'Out of Stock'}
          </span>
        </div>
      </div>

      {/* Size Selection */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
          Size
        </h3>
        <div className="flex flex-wrap gap-2">
          {SIZES.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={cn(
                'px-4 py-2 border rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105',
                selectedSize === size
                  ? 'border-blue-500 bg-blue-50 text-blue-600 ring-2 ring-blue-200'
                  : 'border-gray-300 text-gray-700 hover:border-gray-400'
              )}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Color Selection */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
          Color: {selectedColor.name}
        </h3>
        <div className="flex gap-2">
          {COLORS.map((color) => (
            <button
              key={color.name}
              onClick={() => color.available && setSelectedColor(color)}
              disabled={!color.available}
              className={cn(
                'w-10 h-10 rounded-full border-2 transition-all duration-200 hover:scale-110',
                selectedColor.name === color.name
                  ? 'border-blue-500 ring-2 ring-blue-200'
                  : 'border-gray-300',
                !color.available && 'opacity-50 cursor-not-allowed'
              )}
              style={{ backgroundColor: color.value }}
            >
              {selectedColor.name === color.name && (
                <div className="w-full h-full rounded-full border-2 border-white" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity Selection */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
          Quantity
        </h3>
        <div className="flex items-center gap-3">
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
              className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="px-4 py-2 font-medium min-w-[60px] text-center">
              {quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(1)}
              disabled={quantity >= product.stockQuantity}
              className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          onClick={handleAddToCart}
          disabled={!product.inStock || !selectedSize}
          className="w-full py-3 text-base font-medium transition-all duration-300 hover:scale-105"
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          Add to Cart
        </Button>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleWishlistClick}
            className={cn(
              'flex-1 transition-all duration-300 hover:scale-105',
              isInWishlist && 'text-red-500 border-red-500',
              wishlistAnimation && 'animate-bounce'
            )}
          >
            <Heart
              className={cn(
                'w-4 h-4 mr-2 transition-all duration-300',
                isInWishlist && 'fill-current'
              )}
            />
            {isInWishlist ? 'In Wishlist' : 'Add to Wishlist'}
          </Button>

          <Button
            variant="outline"
            onClick={handleShare}
            className="flex-1 transition-all duration-300 hover:scale-105"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      {/* Product Meta */}
      <div className="pt-4 border-t border-gray-200 space-y-2 text-sm text-gray-600">
        <div>
          <strong>Brand:</strong>{' '}
          <span className="text-blue-600 hover:text-blue-800 cursor-pointer">
            {product.brand}
          </span>
        </div>
        <div>
          <strong>Category:</strong>{' '}
          <span className="text-blue-600 hover:text-blue-800 cursor-pointer">
            {product.category}
          </span>
        </div>
        <div>
          <strong>SKU:</strong> {product.id}
        </div>
      </div>
    </div>
  );
};
