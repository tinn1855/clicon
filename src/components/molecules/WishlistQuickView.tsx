import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, X } from 'lucide-react';
import { Button } from '@/components/atoms';
import { Price } from '@/components/atoms/Price';
import { useWishlistStore, useCartStore } from '@/store';
import { useToast } from '@/hooks/use-enhanced-toast';
import { cn } from '@/lib/utils';

interface WishlistQuickViewProps {
  className?: string;
}

export const WishlistQuickView: React.FC<WishlistQuickViewProps> = ({
  className,
}) => {
  const { items, removeFromWishlist, getWishlistCount } = useWishlistStore();
  const { addToCart } = useCartStore();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const wishlistCount = getWishlistCount();

  const handleAddToCart = (productId: string) => {
    const wishlistItem = items.find((item) => item.productId === productId);
    if (wishlistItem) {
      addToCart(wishlistItem.product, 1);
      toast.success({
        title: 'Added to cart!',
        description: `${wishlistItem.product.name} has been added to your cart.`,
      });
    }
  };

  const handleRemoveFromWishlist = (productId: string) => {
    removeFromWishlist(productId);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (wishlistCount === 0) {
    return (
      <div className={cn('relative', className)} ref={dropdownRef}>
        <button onClick={() => setIsOpen(!isOpen)}>
          <Button variant="ghost" size="sm" className="relative px-2 sm:px-3">
            <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="hidden lg:block ml-2">Wishlist</span>
          </Button>
        </button>

        {isOpen && (
          <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            <div className="p-6 text-center">
              <Heart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">
                Your wishlist is empty
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Save items you love for later
              </p>
              <Link to="/shop">
                <Button onClick={() => setIsOpen(false)} className="w-full">
                  Browse Products
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={cn('relative', className)} ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)}>
        <Button variant="ghost" size="sm" className="relative px-2 sm:px-3">
          <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
          {wishlistCount > 0 && (
            <span className="bg-blue-500 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center font-medium absolute -top-1 -right-1">
              {wishlistCount > 99 ? '99+' : wishlistCount}
            </span>
          )}
          <span className="hidden lg:block ml-2">Wishlist</span>
        </Button>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-96 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">
                Wishlist ({wishlistCount} items)
              </h3>
              <Link to="/wishlist">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-blue-600 hover:text-blue-700"
                >
                  View All
                </Button>
              </Link>
            </div>

            <div className="space-y-3 max-h-64 overflow-y-auto">
              {items.slice(0, 3).map((item) => (
                <div key={item.id} className="flex gap-3 p-3 rounded-lg border">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-12 h-12 object-cover rounded bg-gray-100 flex-shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-gray-600 text-xs">
                      {item.product.brand}
                    </p>

                    <div className="flex items-center justify-between mt-2">
                      <Price
                        price={item.product.price}
                        className="font-medium text-sm"
                      />

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleAddToCart(item.productId)}
                          className="text-gray-400 hover:text-blue-500 p-1"
                          title="Add to cart"
                        >
                          <ShoppingCart className="h-3 w-3" />
                        </button>
                        <button
                          onClick={() =>
                            handleRemoveFromWishlist(item.productId)
                          }
                          className="text-gray-400 hover:text-red-500 p-1"
                          title="Remove from wishlist"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {items.length > 3 && (
                <div className="text-center py-2">
                  <Link to="/wishlist">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsOpen(false)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      +{items.length - 3} more items
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            <div className="pt-4 space-y-2">
              <Link to="/wishlist">
                <Button
                  onClick={() => setIsOpen(false)}
                  className="w-full"
                  size="sm"
                >
                  <Heart className="h-4 w-4 mr-2" />
                  View Wishlist
                </Button>
              </Link>

              <Button
                variant="outline"
                onClick={() => {
                  setIsOpen(false);
                  items.forEach((item) => handleAddToCart(item.productId));
                }}
                className="w-full"
                size="sm"
              >
                Add All to Cart
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
