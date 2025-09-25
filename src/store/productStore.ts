import { create } from 'zustand';
import { Product } from '@/types';
import {
  mockAPI,
  ProductFilters,
  ProductSort,
  PaginatedResponse,
} from '@/services/mockAPI';

interface ProductStore {
  products: Product[];
  isLoading: boolean;
  featuredProducts: Product[];
  categories: string[];
  brands: string[];
  priceRange: { min: number; max: number } | null;
  lastSearchResult: PaginatedResponse<Product> | null;

  // Actions
  setProducts: (products: Product[]) => void;
  setLoading: (loading: boolean) => void;
  loadFeaturedProducts: () => Promise<void>;
  loadCategories: () => Promise<void>;
  loadBrands: () => Promise<void>;
  loadPriceRange: () => Promise<void>;
  searchProducts: (
    filters?: ProductFilters,
    sort?: ProductSort,
    page?: number,
    limit?: number
  ) => Promise<PaginatedResponse<Product>>;
  getProductById: (id: string) => Promise<Product | null>;
  getRelatedProducts: (productId: string, limit?: number) => Promise<Product[]>;
  getBestsellers: (limit?: number) => Promise<Product[]>;
  getNewArrivals: (limit?: number) => Promise<Product[]>;
  getSaleProducts: (limit?: number) => Promise<Product[]>;
  getProductsByCategory: (
    category: string,
    page?: number,
    limit?: number
  ) => Promise<PaginatedResponse<Product>>;
  getSearchSuggestions: (query: string, limit?: number) => Promise<string[]>;
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  isLoading: false,
  featuredProducts: [],
  categories: [],
  brands: [],
  priceRange: null,
  lastSearchResult: null,

  setProducts: (products: Product[]) => set({ products }),

  setLoading: (isLoading: boolean) => set({ isLoading }),

  loadFeaturedProducts: async () => {
    set({ isLoading: true });
    try {
      const featuredProducts = await mockAPI.getFeaturedProducts();
      set({ featuredProducts });
    } catch (error) {
      console.error('Error loading featured products:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  loadCategories: async () => {
    try {
      const categories = await mockAPI.getCategories();
      set({ categories });
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  },

  loadBrands: async () => {
    try {
      const brands = await mockAPI.getBrands();
      set({ brands });
    } catch (error) {
      console.error('Error loading brands:', error);
    }
  },

  loadPriceRange: async () => {
    try {
      const priceRange = await mockAPI.getPriceRange();
      set({ priceRange });
    } catch (error) {
      console.error('Error loading price range:', error);
    }
  },

  searchProducts: async (filters, sort, page, limit) => {
    set({ isLoading: true });
    try {
      const result = await mockAPI.searchProducts(filters, sort, page, limit);
      set({ lastSearchResult: result, products: result.data });
      return result;
    } catch (error) {
      console.error('Error searching products:', error);
      const emptyResult = {
        data: [],
        pagination: { page: 1, limit: 20, total: 0, totalPages: 0 },
      };
      set({ lastSearchResult: emptyResult, products: [] });
      return emptyResult;
    } finally {
      set({ isLoading: false });
    }
  },

  getProductById: async (id: string) => {
    try {
      return await mockAPI.getProductById(id);
    } catch (error) {
      console.error('Error getting product by ID:', error);
      return null;
    }
  },

  getRelatedProducts: async (productId: string, limit) => {
    try {
      return await mockAPI.getRelatedProducts(productId, limit);
    } catch (error) {
      console.error('Error getting related products:', error);
      return [];
    }
  },

  getBestsellers: async (limit) => {
    try {
      return await mockAPI.getBestsellers(limit);
    } catch (error) {
      console.error('Error getting bestsellers:', error);
      return [];
    }
  },

  getNewArrivals: async (limit) => {
    try {
      return await mockAPI.getNewArrivals(limit);
    } catch (error) {
      console.error('Error getting new arrivals:', error);
      return [];
    }
  },

  getSaleProducts: async (limit) => {
    try {
      return await mockAPI.getSaleProducts(limit);
    } catch (error) {
      console.error('Error getting sale products:', error);
      return [];
    }
  },

  getProductsByCategory: async (category: string, page, limit) => {
    set({ isLoading: true });
    try {
      const result = await mockAPI.getProductsByCategory(category, page, limit);
      set({ lastSearchResult: result, products: result.data });
      return result;
    } catch (error) {
      console.error('Error getting products by category:', error);
      const emptyResult = {
        data: [],
        pagination: { page: 1, limit: 20, total: 0, totalPages: 0 },
      };
      set({ lastSearchResult: emptyResult, products: [] });
      return emptyResult;
    } finally {
      set({ isLoading: false });
    }
  },

  getSearchSuggestions: async (query: string, limit) => {
    try {
      return await mockAPI.getSearchSuggestions(query, limit);
    } catch (error) {
      console.error('Error getting search suggestions:', error);
      return [];
    }
  },
}));
