import React from 'react';
import { ShoppingCart, Minus, Plus, X } from 'lucide-react';
import { Button } from '@/components/atoms';
import { useCartStore } from '@/store';
import { useToast } from '@/hooks/use-enhanced-toast';
import { cn } from '@/lib/utils';
import { Product } from '@/types';

interface CartButtonProps {
  product: Product;
  className?: string;
  size?: 'sm' | 'default' | 'lg';
  variant?: 'default' | 'ghost' | 'outline' | 'secondary';
  showText?: boolean;
  quantity?: number;
}

/**
 * CartButton component that automatically handles add to cart
 */
export const CartButton: React.FC<CartButtonProps> = ({
  product,
  className,
  size = 'default',
  variant = 'default',
  showText = true,
  quantity = 1,
}) => {
  const { addToCart } = useCartStore();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, quantity);

    // Show success toast
    toast.success({
      title: 'Added to cart!',
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleAddToCart}
      className={cn('transition-all duration-200', className)}
      disabled={!product.inStock}
    >
      <ShoppingCart className={cn('h-4 w-4', showText && 'mr-2')} />
      {showText && <span>Add to Cart</span>}
    </Button>
  );
};

interface CartIconButtonProps {
  className?: string;
}

/**
 * Compact cart icon button for header navigation
 */
export const CartIconButton: React.FC<CartIconButtonProps> = ({
  className,
}) => {
  const { getCartItemsCount } = useCartStore();
  const itemCount = getCartItemsCount();

  return (
    <button
      className={cn(
        'relative p-2 rounded-full hover:bg-gray-100 transition-colors duration-200',
        className
      )}
      title="Shopping Cart"
    >
      <ShoppingCart className="h-5 w-5 text-gray-700" />
      {itemCount > 0 && <CartCounter className="absolute -top-1 -right-1" />}
    </button>
  );
};

interface CartCounterProps {
  className?: string;
}

/**
 * Displays the current cart items count
 */
export const CartCounter: React.FC<CartCounterProps> = ({ className }) => {
  const { getCartItemsCount } = useCartStore();
  const count = getCartItemsCount();

  if (count === 0) {
    return null;
  }

  return (
    <span
      className={cn(
        'bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium',
        className
      )}
    >
      {count > 99 ? '99+' : count}
    </span>
  );
};

interface QuantitySelectorProps {
  value: number;
  onChange: (quantity: number) => void;
  min?: number;
  max?: number;
  className?: string;
}

/**
 * Quantity selector component for cart items
 */
export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  value,
  onChange,
  min = 1,
  max = 99,
  className,
}) => {
  const handleDecrease = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrease = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      onChange(newValue);
    }
  };

  return (
    <div className={cn('flex items-center border rounded-md', className)}>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleDecrease}
        disabled={value <= min}
        className="h-8 w-8 p-0 hover:bg-gray-100"
      >
        <Minus className="h-3 w-3" />
      </Button>

      <input
        type="number"
        value={value}
        onChange={handleInputChange}
        min={min}
        max={max}
        className="w-12 h-8 text-center border-0 focus:ring-0 focus:outline-none text-sm"
      />

      <Button
        variant="ghost"
        size="sm"
        onClick={handleIncrease}
        disabled={value >= max}
        className="h-8 w-8 p-0 hover:bg-gray-100"
      >
        <Plus className="h-3 w-3" />
      </Button>
    </div>
  );
};

interface CartItemRemoveButtonProps {
  onRemove: () => void;
  className?: string;
}

/**
 * Remove button for cart items
 */
export const CartItemRemoveButton: React.FC<CartItemRemoveButtonProps> = ({
  onRemove,
  className,
}) => {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onRemove}
      className={cn(
        'h-6 w-6 p-0 text-gray-400 hover:text-red-500 hover:bg-red-50',
        className
      )}
      title="Remove from cart"
    >
      <X className="h-3 w-3" />
    </Button>
  );
};
