import { Product } from '@/types';
import { MOCK_PRODUCTS } from '../data/mockProducts';

// API Response types
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ProductFilters {
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  rating?: number;
  tags?: string[];
  search?: string;
}

export interface ProductSort {
  field: 'price' | 'rating' | 'reviewCount' | 'createdAt' | 'name';
  order: 'asc' | 'desc';
}

// Simulate API delay
const simulateDelay = (ms = 100) =>
  new Promise((resolve) => setTimeout(resolve, ms));

class MockAPI {
  private products: Product[] = MOCK_PRODUCTS;

  // Get all categories
  async getCategories(): Promise<string[]> {
    await simulateDelay(50);
    const categories = [...new Set(this.products.map((p) => p.category))];
    return categories.sort();
  }

  // Get all brands
  async getBrands(): Promise<string[]> {
    await simulateDelay(50);
    const brands = [...new Set(this.products.map((p) => p.brand))];
    return brands.sort();
  }

  // Get price range
  async getPriceRange(): Promise<{ min: number; max: number }> {
    await simulateDelay(50);
    const prices = this.products.map((p) => p.price);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
    };
  }

  // Search and filter products
  async searchProducts(
    filters: ProductFilters = {},
    sort: ProductSort = { field: 'createdAt', order: 'desc' },
    page = 1,
    limit = 20
  ): Promise<PaginatedResponse<Product>> {
    await simulateDelay(200);

    let filteredProducts = [...this.products];

    // Apply filters
    if (filters.category) {
      filteredProducts = filteredProducts.filter(
        (p) => p.category.toLowerCase() === filters.category?.toLowerCase()
      );
    }

    if (filters.brand) {
      filteredProducts = filteredProducts.filter(
        (p) => p.brand.toLowerCase() === filters.brand?.toLowerCase()
      );
    }

    if (filters.minPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        (p) => p.price >= (filters.minPrice ?? 0)
      );
    }

    if (filters.maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        (p) => p.price <= (filters.maxPrice ?? Infinity)
      );
    }

    if (filters.inStock !== undefined) {
      filteredProducts = filteredProducts.filter(
        (p) => p.inStock === filters.inStock
      );
    }

    if (filters.rating !== undefined) {
      filteredProducts = filteredProducts.filter(
        (p) => p.rating >= (filters.rating ?? 0)
      );
    }

    if (filters.tags && filters.tags.length > 0) {
      filteredProducts = filteredProducts.filter(
        (p) => filters.tags?.some((tag) => p.tags.includes(tag)) ?? false
      );
    }

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredProducts = filteredProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm) ||
          p.description.toLowerCase().includes(searchTerm) ||
          p.brand.toLowerCase().includes(searchTerm) ||
          p.category.toLowerCase().includes(searchTerm) ||
          p.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
      );
    }

    // Apply sorting
    filteredProducts.sort((a, b) => {
      const aValue = a[sort.field];
      const bValue = b[sort.field];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sort.order === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sort.order === 'asc' ? aValue - bValue : bValue - aValue;
      }

      return 0;
    });

    // Apply pagination
    const total = filteredProducts.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const data = filteredProducts.slice(startIndex, endIndex);

    return {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    };
  }

  // Get product by ID
  async getProductById(id: string): Promise<Product | null> {
    await simulateDelay(100);
    return this.products.find((p) => p.id === id) || null;
  }

  // Get featured products
  async getFeaturedProducts(limit = 8): Promise<Product[]> {
    await simulateDelay(150);
    const featuredProducts = this.products
      .filter(
        (p) => p.tags.includes('featured') || p.tags.includes('bestseller')
      )
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);

    // If not enough featured products, add highly rated ones
    if (featuredProducts.length < limit) {
      const additionalProducts = this.products
        .filter((p) => !featuredProducts.includes(p))
        .sort((a, b) => b.rating - a.rating)
        .slice(0, limit - featuredProducts.length);

      featuredProducts.push(...additionalProducts);
    }

    return featuredProducts;
  }

  // Get related products
  async getRelatedProducts(productId: string, limit = 4): Promise<Product[]> {
    await simulateDelay(100);
    const product = await this.getProductById(productId);
    if (!product) return [];

    const relatedProducts = this.products
      .filter((p) => p.id !== productId && p.category === product.category)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);

    // If not enough related products in same category, get from similar price range
    if (relatedProducts.length < limit) {
      const priceRange = product.price * 0.3; // 30% price range
      const additionalProducts = this.products
        .filter(
          (p) =>
            p.id !== productId &&
            !relatedProducts.includes(p) &&
            Math.abs(p.price - product.price) <= priceRange
        )
        .sort((a, b) => b.rating - a.rating)
        .slice(0, limit - relatedProducts.length);

      relatedProducts.push(...additionalProducts);
    }

    return relatedProducts;
  }

  // Get bestsellers
  async getBestsellers(limit = 10): Promise<Product[]> {
    await simulateDelay(120);
    return this.products
      .filter((p) => p.tags.includes('bestseller') || p.reviewCount > 500)
      .sort((a, b) => b.reviewCount - a.reviewCount)
      .slice(0, limit);
  }

  // Get new arrivals
  async getNewArrivals(limit = 10): Promise<Product[]> {
    await simulateDelay(120);
    return this.products
      .filter((p) => p.tags.includes('new'))
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, limit);
  }

  // Get sale products
  async getSaleProducts(limit = 10): Promise<Product[]> {
    await simulateDelay(120);
    return this.products
      .filter((p) => p.originalPrice && p.originalPrice > p.price)
      .sort((a, b) => {
        const aOriginalPrice = a.originalPrice ?? a.price;
        const bOriginalPrice = b.originalPrice ?? b.price;
        const aDiscount = ((aOriginalPrice - a.price) / aOriginalPrice) * 100;
        const bDiscount = ((bOriginalPrice - b.price) / bOriginalPrice) * 100;
        return bDiscount - aDiscount;
      })
      .slice(0, limit);
  }

  // Get products by category
  async getProductsByCategory(
    category: string,
    page = 1,
    limit = 20,
    sort: ProductSort = { field: 'rating', order: 'desc' }
  ): Promise<PaginatedResponse<Product>> {
    return this.searchProducts({ category }, sort, page, limit);
  }

  // Get search suggestions
  async getSearchSuggestions(query: string, limit = 10): Promise<string[]> {
    await simulateDelay(50);
    if (!query || query.length < 2) return [];

    const suggestions = new Set<string>();
    const queryLower = query.toLowerCase();

    // Add product names that match
    this.products.forEach((product) => {
      if (product.name.toLowerCase().includes(queryLower)) {
        suggestions.add(product.name);
      }

      // Add brand names that match
      if (product.brand.toLowerCase().includes(queryLower)) {
        suggestions.add(product.brand);
      }

      // Add categories that match
      if (product.category.toLowerCase().includes(queryLower)) {
        suggestions.add(product.category);
      }
    });

    return Array.from(suggestions).slice(0, limit);
  }
}

// Export singleton instance
export const mockAPI = new MockAPI();

// Export convenience functions
export const {
  getCategories,
  getBrands,
  getPriceRange,
  searchProducts,
  getProductById,
  getFeaturedProducts,
  getRelatedProducts,
  getBestsellers,
  getNewArrivals,
  getSaleProducts,
  getProductsByCategory,
  getSearchSuggestions,
} = mockAPI;
