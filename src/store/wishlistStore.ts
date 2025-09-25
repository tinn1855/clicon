import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { WishlistItem, Product } from '../types';

interface WishlistStore {
  items: WishlistItem[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  getWishlistCount: () => number;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addToWishlist: (product) => {
        set((state) => {
          // Check if product already in wishlist
          const exists = state.items.some(
            (item) => item.productId === product.id
          );
          if (exists) return state;

          const newItem: WishlistItem = {
            id: `wishlist-${product.id}-${Date.now()}`,
            productId: product.id,
            product,
            addedAt: new Date().toISOString(),
          };

          return {
            items: [...state.items, newItem],
          };
        });
      },

      removeFromWishlist: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        }));
      },

      isInWishlist: (productId) => {
        return get().items.some((item) => item.productId === productId);
      },

      clearWishlist: () => {
        set({ items: [] });
      },

      getWishlistCount: () => {
        return get().items.length;
      },
    }),
    {
      name: 'wishlist-storage',
    }
  )
);
