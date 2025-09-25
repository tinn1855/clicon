import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PageLayout } from '@/components/templates';
import {
  Heading1,
  Heading2,
  Button,
  Card,
  CardContent,
  Separator,
} from '@/components/atoms';
import { Price } from '@/components/atoms/Price';
import {
  QuantitySelector,
  CartItemRemoveButton,
} from '@/components/molecules/CartButton';
import { useCartStore } from '@/store';
import { ArrowLeft, ShoppingBag, Trash2 } from 'lucide-react';

export default function CartPage() {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart, clearCart } = useCartStore();

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    updateQuantity(itemId, newQuantity);
  };

  const handleRemoveItem = (itemId: string) => {
    removeFromCart(itemId);
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      clearCart();
    }
  };

  const handleContinueShopping = () => {
    navigate('/shop');
  };

  const handleCheckout = () => {
    // TODO: Navigate to checkout page
    console.log('Proceeding to checkout...');
  };

  if (cart.items.length === 0) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-8">
          {/* Back Button */}
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          {/* Empty Cart */}
          <div className="text-center py-16">
            <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <Heading2 className="mb-4">Your cart is empty</Heading2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Looks like you haven't added any items to your cart yet. Start
              shopping to fill it up!
            </p>
            <Button onClick={handleContinueShopping} size="lg">
              Continue Shopping
            </Button>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <Heading1>Shopping Cart ({cart.itemCount} items)</Heading1>
          </div>

          {cart.items.length > 0 && (
            <Button
              variant="outline"
              onClick={handleClearCart}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear Cart
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map((item) => (
              <Card key={item.id} className="p-6">
                <div className="flex gap-4">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-lg bg-gray-100"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-lg truncate">
                          {item.product.name}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {item.product.brand}
                        </p>

                        {/* Variants */}
                        {item.selectedVariants &&
                          Object.keys(item.selectedVariants).length > 0 && (
                            <div className="flex gap-2 mt-1">
                              {Object.entries(item.selectedVariants).map(
                                ([key, value]) => (
                                  <span
                                    key={key}
                                    className="text-xs bg-gray-100 px-2 py-1 rounded"
                                  >
                                    {key}: {value}
                                  </span>
                                )
                              )}
                            </div>
                          )}
                      </div>

                      <CartItemRemoveButton
                        onRemove={() => handleRemoveItem(item.id)}
                      />
                    </div>

                    {/* Price and Quantity */}
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <QuantitySelector
                          value={item.quantity}
                          onChange={(quantity) =>
                            handleQuantityChange(item.id, quantity)
                          }
                          max={item.product.stockQuantity}
                        />
                        <Price
                          price={item.product.price}
                          className="text-sm text-gray-600"
                        />
                      </div>

                      <Price
                        price={item.product.price * item.quantity}
                        className="font-semibold text-lg"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-6">
              <CardContent className="p-0 space-y-4">
                <Heading2 className="text-lg">Order Summary</Heading2>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Subtotal ({cart.itemCount} items)</span>
                    <Price price={cart.subtotal} />
                  </div>

                  <div className="flex justify-between">
                    <span>Shipping</span>
                    {cart.shipping === 0 ? (
                      <span className="text-green-600 font-medium">Free</span>
                    ) : (
                      <Price price={cart.shipping} />
                    )}
                  </div>

                  <div className="flex justify-between">
                    <span>Tax</span>
                    <Price price={cart.tax} />
                  </div>

                  <Separator />

                  <div className="flex justify-between items-center text-lg font-semibold">
                    <span>Total</span>
                    <Price price={cart.total} />
                  </div>
                </div>

                {cart.shipping === 0 && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <p className="text-green-800 text-sm">
                      <span role="img" aria-label="celebration">
                        🎉
                      </span>{' '}
                      You're eligible for free shipping!
                    </p>
                  </div>
                )}

                <div className="space-y-3 pt-4">
                  <Button onClick={handleCheckout} className="w-full" size="lg">
                    Proceed to Checkout
                  </Button>

                  <Button
                    variant="outline"
                    onClick={handleContinueShopping}
                    className="w-full"
                  >
                    Continue Shopping
                  </Button>
                </div>

                {/* Promo Code */}
                <div className="pt-4 border-t">
                  <details className="group">
                    <summary className="flex cursor-pointer items-center justify-between text-sm font-medium">
                      <span>Have a promo code?</span>
                      <span className="transition group-open:rotate-180">
                        ⌄
                      </span>
                    </summary>
                    <div className="mt-3 space-y-2">
                      <input
                        type="text"
                        placeholder="Enter promo code"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <Button variant="outline" size="sm" className="w-full">
                        Apply Code
                      </Button>
                    </div>
                  </details>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Continue Shopping */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Need more items? Continue shopping to explore our full collection.
          </p>
          <Link
            to="/shop"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Browse All Products →
          </Link>
        </div>
      </div>
    </PageLayout>
  );
}
