import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Cart, Product } from '../types';

interface CartStore {
  cart: Cart;
  addToCart: (
    product: Product,
    quantity?: number,
    variants?: Record<string, string>
  ) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getCartItemsCount: () => number;
}

const initialCart: Cart = {
  items: [],
  subtotal: 0,
  shipping: 0,
  tax: 0,
  total: 0,
  itemCount: 0,
};

const calculateCartTotals = (items: CartItem[]): Omit<Cart, 'items'> => {
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const shipping = subtotal > 50 ? 0 : 5.99; // Free shipping over $50
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  return {
    subtotal: Number(subtotal.toFixed(2)),
    shipping: Number(shipping.toFixed(2)),
    tax: Number(tax.toFixed(2)),
    total: Number(total.toFixed(2)),
    itemCount,
  };
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: initialCart,

      addToCart: (product, quantity = 1, variants = {}) => {
        set((state) => {
          // Check if item already exists in cart with same variants
          const existingItemIndex = state.cart.items.findIndex(
            (item) =>
              item.productId === product.id &&
              JSON.stringify(item.selectedVariants) === JSON.stringify(variants)
          );

          let newItems: CartItem[];

          if (existingItemIndex >= 0) {
            // Update quantity of existing item
            newItems = state.cart.items.map((item, index) =>
              index === existingItemIndex
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
          } else {
            // Add new item
            const newItem: CartItem = {
              id: `${product.id}-${Date.now()}`,
              productId: product.id,
              product,
              quantity,
              selectedVariants: variants,
              addedAt: new Date().toISOString(),
            };
            newItems = [...state.cart.items, newItem];
          }

          const totals = calculateCartTotals(newItems);

          return {
            cart: {
              items: newItems,
              ...totals,
            },
          };
        });
      },

      removeFromCart: (itemId) => {
        set((state) => {
          const newItems = state.cart.items.filter(
            (item) => item.id !== itemId
          );
          const totals = calculateCartTotals(newItems);

          return {
            cart: {
              items: newItems,
              ...totals,
            },
          };
        });
      },

      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(itemId);
          return;
        }

        set((state) => {
          const newItems = state.cart.items.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
          );
          const totals = calculateCartTotals(newItems);

          return {
            cart: {
              items: newItems,
              ...totals,
            },
          };
        });
      },

      clearCart: () => {
        set({ cart: initialCart });
      },

      getCartItemsCount: () => {
        return get().cart.itemCount;
      },
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ cart: state.cart }),
    }
  )
);
