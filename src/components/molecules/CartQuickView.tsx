import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, ImageWithSkeleton } from '@/components/atoms';
import { Price } from '@/components/atoms/Price';
import { useCartStore } from '@/store';
import { ShoppingCart, ShoppingBag, Trash2, Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CartQuickViewProps {
  className?: string;
}

/**
 * Quick view dropdown for cart items in header
 */
export const CartQuickView: React.FC<CartQuickViewProps> = ({ className }) => {
  const { cart, updateQuantity, removeFromCart } = useCartStore();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    updateQuantity(itemId, newQuantity);
  };

  const handleRemoveItem = (itemId: string) => {
    removeFromCart(itemId);
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

  if (cart.items.length === 0) {
    return (
      <div className={cn('relative', className)} ref={dropdownRef}>
        <button onClick={() => setIsOpen(!isOpen)}>
          <Button variant="ghost" size="sm" className="relative px-2 sm:px-3">
            <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="hidden lg:block ml-2">Cart</span>
          </Button>
        </button>

        {isOpen && (
          <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            <div className="p-6 text-center">
              <ShoppingBag className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">
                Your cart is empty
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Add some products to get started
              </p>
              <Link to="/shop">
                <Button onClick={() => setIsOpen(false)} className="w-full">
                  Continue Shopping
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
          <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
          {cart.itemCount > 0 && (
            <span className="bg-blue-500 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center font-medium absolute -top-1 -right-1">
              {cart.itemCount > 99 ? '99+' : cart.itemCount}
            </span>
          )}
          <span className="hidden lg:block ml-2">Cart</span>
        </Button>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-96 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">
                Cart ({cart.itemCount} items)
              </h3>
              <Link to="/cart">
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

            {/* Cart Items */}
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {cart.items.slice(0, 3).map((item) => (
                <div key={item.id} className="flex gap-3 p-3 rounded-lg border">
                  {/* Product Image */}
                  <div className="w-12 h-12 flex-shrink-0">
                    <ImageWithSkeleton
                      src={item.product.images?.[0] || ''}
                      alt={item.product.name}
                      className="w-full h-full object-cover rounded bg-gray-100"
                      skeletonClassName="w-12 h-12 rounded bg-gray-100"
                      fallbackSrc="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=center&auto=format&q=80"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-gray-600 text-xs">
                      {item.product.brand}
                    </p>

                    {/* Quantity and Price */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                          className="h-6 w-6 rounded border hover:bg-gray-50 flex items-center justify-center disabled:opacity-50"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-sm font-medium w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity + 1)
                          }
                          disabled={item.quantity >= item.product.stockQuantity}
                          className="h-6 w-6 rounded border hover:bg-gray-50 flex items-center justify-center disabled:opacity-50"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <Price
                          price={item.product.price * item.quantity}
                          className="font-medium text-sm"
                        />
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-gray-400 hover:text-red-500 p-1"
                          title="Remove item"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {cart.items.length > 3 && (
                <div className="text-center py-2">
                  <Link to="/cart">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsOpen(false)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      +{cart.items.length - 3} more items
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Summary */}
            <div className="border-t pt-4 mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <Price price={cart.subtotal} />
              </div>

              {cart.shipping === 0 ? (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
              ) : (
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <Price price={cart.shipping} />
                </div>
              )}

              <div className="flex justify-between font-semibold border-t pt-2">
                <span>Total</span>
                <Price price={cart.total} />
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 space-y-2">
              <Link to="/cart">
                <Button
                  onClick={() => setIsOpen(false)}
                  className="w-full"
                  size="sm"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  View Cart
                </Button>
              </Link>

              <Link to="/checkout">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  className="w-full"
                  size="sm"
                >
                  Checkout
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
