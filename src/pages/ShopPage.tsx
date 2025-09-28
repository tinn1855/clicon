import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProductStore } from '@/store/productStore';
import { useDebounce } from '@/hooks';
import { ProductFilters, ProductSort } from '@/services/mockAPI';
import { ProductCard } from '@/components/molecules';
import { PageLayout } from '@/components/templates';
import { ShadcnPagination } from '@/components/ShadcnPagination';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Search, Filter, Grid3X3, List, SlidersHorizontal } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const ShopPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    products,
    isLoading,
    categories,
    brands,
    priceRange,
    lastSearchResult,
    searchProducts,
    loadCategories,
    loadBrands,
    loadPriceRange,
    getSearchSuggestions,
  } = useProductStore();

  // State for filters and search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRangeFilter, setPriceRangeFilter] = useState<[number, number]>([
    0, 5000,
  ]);
  const [minRating, setMinRating] = useState<number>(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortOption, setSortOption] = useState<ProductSort>({
    field: 'createdAt',
    order: 'desc',
  });

  // Debounce search query to reduce API calls
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  // Get current page from URL parameters
  const [currentPage, setCurrentPage] = useState(() => {
    const pageParam = searchParams.get('page');
    return pageParam ? parseInt(pageParam, 10) : 1;
  });
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Sync URL parameters on mount and when they change
  useEffect(() => {
    const pageParam = searchParams.get('page');
    const searchParam = searchParams.get('search');

    const page = pageParam ? parseInt(pageParam, 10) : 1;
    if (page !== currentPage) {
      setCurrentPage(page);
    }

    // Set search query from URL parameter without causing infinite loop
    if (searchParam !== null) {
      if (searchParam !== searchQuery) {
        setSearchQuery(searchParam);
        setShowSuggestions(false); // Close suggestions when setting from URL
      }
    } else if (searchQuery !== '') {
      setSearchQuery('');
      setShowSuggestions(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]); // Intentionally exclude currentPage and searchQuery to prevent loops

  // Load initial data
  useEffect(() => {
    loadCategories();
    loadBrands();
    loadPriceRange();
  }, [loadCategories, loadBrands, loadPriceRange]);

  // Set initial price range when data loads
  useEffect(() => {
    if (
      priceRange &&
      priceRangeFilter[0] === 0 &&
      priceRangeFilter[1] === 5000
    ) {
      setPriceRangeFilter([priceRange.min, priceRange.max]);
    }
  }, [priceRange, priceRangeFilter]);

  // Search products when filters change
  useEffect(() => {
    const filters: ProductFilters = {
      search: debouncedSearchQuery || undefined,
      category:
        selectedCategories.length === 1 ? selectedCategories[0] : undefined,
      brand: selectedBrands.length === 1 ? selectedBrands[0] : undefined,
      minPrice: priceRangeFilter[0],
      maxPrice: priceRangeFilter[1],
      rating: minRating > 0 ? minRating : undefined,
      inStock: inStockOnly || undefined,
    };

    searchProducts(filters, sortOption, currentPage, itemsPerPage);
  }, [
    debouncedSearchQuery,
    selectedCategories,
    selectedBrands,
    priceRangeFilter,
    minRating,
    inStockOnly,
    sortOption,
    currentPage,
    itemsPerPage,
    searchProducts,
  ]);

  // Handle search suggestions with debounce
  const debouncedGetSuggestions = useDebounce(searchQuery, 300);

  useEffect(() => {
    const getSuggestions = async () => {
      if (debouncedGetSuggestions.length >= 2) {
        const suggestions = await getSearchSuggestions(
          debouncedGetSuggestions,
          5
        );
        setSearchSuggestions(suggestions);
        setShowSuggestions(true);
      } else {
        setShowSuggestions(false);
        setSearchSuggestions([]);
      }
    };

    getSuggestions();
  }, [debouncedGetSuggestions, getSearchSuggestions]);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    // Reset page to 1 when search changes
    setCurrentPage(1);

    // Update URL with search parameter
    const newSearchParams = new URLSearchParams(searchParams);
    if (query.trim()) {
      newSearchParams.set('search', query.trim());
    } else {
      newSearchParams.delete('search');
    }
    newSearchParams.set('page', '1');
    setSearchParams(newSearchParams);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPriceRangeFilter(
      priceRange ? [priceRange.min, priceRange.max] : [0, 5000]
    );
    setMinRating(0);
    setInStockOnly(false);
    setCurrentPage(1);

    // Clear URL parameters
    const newSearchParams = new URLSearchParams();
    newSearchParams.set('page', '1');
    setSearchParams(newSearchParams);
  };

  // Toggle category filter
  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
    setCurrentPage(1);
  };

  // Toggle brand filter
  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
    setCurrentPage(1);
  };

  // Handle pagination
  const handlePageChange = (page: number) => {
    setCurrentPage(page);

    // Update URL parameters
    const newSearchParams = new URLSearchParams(searchParams);
    if (page > 1) {
      newSearchParams.set('page', page.toString());
    } else {
      newSearchParams.delete('page');
    }
    setSearchParams(newSearchParams);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle page size change
  const handlePageSizeChange = (size: number) => {
    setItemsPerPage(size);
    setCurrentPage(1);

    // Update URL parameters
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete('page');
    setSearchParams(newSearchParams);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalPages = lastSearchResult?.pagination.totalPages || 0;
  const totalProducts = lastSearchResult?.pagination.total || 0;

  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Shop</h1>
            <p className="text-gray-600">
              Discover our collection of {totalProducts.toLocaleString()} tech
              products
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <div
              className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}
            >
              <Card className="glass-card sticky top-4">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Filter className="w-5 h-5" />
                      Filters
                    </span>
                    <Button variant="ghost" size="sm" onClick={clearFilters}>
                      Clear All
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Categories */}
                  <div>
                    <h3 className="font-semibold mb-3">Categories</h3>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {categories.map((category) => (
                        <div
                          key={category}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`category-${category}`}
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={() => toggleCategory(category)}
                          />
                          <Label
                            htmlFor={`category-${category}`}
                            className="text-sm cursor-pointer"
                          >
                            {category}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Brands */}
                  <div>
                    <h3 className="font-semibold mb-3">Brands</h3>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {brands.slice(0, 20).map((brand) => (
                        <div
                          key={brand}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`brand-${brand}`}
                            checked={selectedBrands.includes(brand)}
                            onCheckedChange={() => toggleBrand(brand)}
                          />
                          <Label
                            htmlFor={`brand-${brand}`}
                            className="text-sm cursor-pointer"
                          >
                            {brand}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Price Range */}
                  <div>
                    <h3 className="font-semibold mb-3">Price Range</h3>
                    <div className="space-y-4">
                      <Slider
                        value={priceRangeFilter}
                        onValueChange={(value) =>
                          setPriceRangeFilter(value as [number, number])
                        }
                        min={priceRange?.min || 0}
                        max={priceRange?.max || 5000}
                        step={10}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>${priceRangeFilter[0]}</span>
                        <span>${priceRangeFilter[1]}</span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Rating */}
                  <div>
                    <h3 className="font-semibold mb-3">Minimum Rating</h3>
                    <Select
                      value={minRating.toString()}
                      onValueChange={(value) => setMinRating(Number(value))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">Any Rating</SelectItem>
                        <SelectItem value="3">3+ Stars</SelectItem>
                        <SelectItem value="4">4+ Stars</SelectItem>
                        <SelectItem value="4.5">4.5+ Stars</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  {/* Stock Status */}
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="inStock"
                      checked={inStockOnly}
                      onCheckedChange={(checked) =>
                        setInStockOnly(checked === true)
                      }
                    />
                    <Label htmlFor="inStock" className="text-sm cursor-pointer">
                      In Stock Only
                    </Label>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Search and Controls */}
              <div className="mb-6 space-y-4">
                {/* Search Bar */}
                <div className="relative">
                  <div className="relative flex">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            setShowSuggestions(false);
                            e.currentTarget.blur(); // Remove focus to hide suggestions
                          }
                        }}
                        onBlur={() => {
                          // Delay hiding suggestions to allow click on suggestions
                          setTimeout(() => setShowSuggestions(false), 200);
                        }}
                        className="pl-10 rounded-r-none"
                      />
                    </div>
                    <Button
                      type="button"
                      onClick={() => {
                        setShowSuggestions(false);
                        // Trigger search with current query
                        handleSearchChange(searchQuery);
                      }}
                      className="rounded-l-none"
                    >
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Search Suggestions */}
                  {showSuggestions && searchSuggestions.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
                      {searchSuggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          className="w-full px-4 py-2 text-left hover:bg-gray-50 first:rounded-t-md last:rounded-b-md"
                          onClick={() => {
                            setSearchQuery(suggestion);
                            setShowSuggestions(false);
                          }}
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Controls */}
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="lg:hidden"
                      onClick={() => setShowFilters(!showFilters)}
                    >
                      <SlidersHorizontal className="w-4 h-4 mr-2" />
                      Filters
                    </Button>

                    <div className="flex items-center gap-2">
                      <Button
                        variant={viewMode === 'grid' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setViewMode('grid')}
                      >
                        <Grid3X3 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant={viewMode === 'list' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setViewMode('list')}
                      >
                        <List className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="bg-green-50 border-green-200 text-green-800"
                      >
                        {totalProducts.toLocaleString()} products found
                      </Badge>
                    </div>

                    <Select
                      value={`${sortOption.field}-${sortOption.order}`}
                      onValueChange={(value) => {
                        const [field, order] = value.split('-') as [
                          ProductSort['field'],
                          ProductSort['order']
                        ];
                        setSortOption({ field, order });
                      }}
                    >
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="createdAt-desc">
                          Newest First
                        </SelectItem>
                        <SelectItem value="createdAt-asc">
                          Oldest First
                        </SelectItem>
                        <SelectItem value="price-asc">
                          Price: Low to High
                        </SelectItem>
                        <SelectItem value="price-desc">
                          Price: High to Low
                        </SelectItem>
                        <SelectItem value="rating-desc">
                          Highest Rated
                        </SelectItem>
                        <SelectItem value="reviewCount-desc">
                          Most Reviews
                        </SelectItem>
                        <SelectItem value="name-asc">Name: A to Z</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Active Filters */}
                {(selectedCategories.length > 0 ||
                  selectedBrands.length > 0 ||
                  searchQuery ||
                  minRating > 0 ||
                  inStockOnly) && (
                  <div className="flex flex-wrap gap-2">
                    {searchQuery && (
                      <Badge
                        variant="outline"
                        className="gap-1 bg-blue-50 border-blue-200 text-blue-800"
                      >
                        Search: {searchQuery}
                        <button
                          onClick={() => setSearchQuery('')}
                          className="ml-1 hover:text-red-500"
                        >
                          ×
                        </button>
                      </Badge>
                    )}
                    {selectedCategories.map((category) => (
                      <Badge
                        key={category}
                        variant="category"
                        className="gap-1"
                      >
                        {category}
                        <button
                          onClick={() => toggleCategory(category)}
                          className="ml-1 hover:text-red-500"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                    {selectedBrands.map((brand) => (
                      <Badge
                        key={brand}
                        variant="outline"
                        className="gap-1 bg-purple-50 border-purple-200 text-purple-800"
                      >
                        {brand}
                        <button
                          onClick={() => toggleBrand(brand)}
                          className="ml-1 hover:text-red-500"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                    {minRating > 0 && (
                      <Badge variant="warning" className="gap-1">
                        {minRating}+ Stars
                        <button
                          onClick={() => setMinRating(0)}
                          className="ml-1 hover:text-red-500"
                        >
                          ×
                        </button>
                      </Badge>
                    )}
                    {inStockOnly && (
                      <Badge variant="success" className="gap-1">
                        In Stock
                        <button
                          onClick={() => setInStockOnly(false)}
                          className="ml-1 hover:text-red-500"
                        >
                          ×
                        </button>
                      </Badge>
                    )}
                  </div>
                )}
              </div>

              {/* Products Grid/List */}
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {Array.from({ length: 8 }).map((_, index) => (
                    <div key={index} className="animate-pulse">
                      <div className="bg-gray-200 aspect-square rounded-lg mb-4"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : products.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">
                    No products found matching your criteria.
                  </p>
                  <Button
                    variant="outline"
                    onClick={clearFilters}
                    className="mt-4"
                  >
                    Clear Filters
                  </Button>
                </div>
              ) : (
                <div
                  className={
                    viewMode === 'grid'
                      ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 overflow-hidden'
                      : 'space-y-4 overflow-hidden'
                  }
                >
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}

              {/* Pagination */}
              <ShadcnPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                pageSize={itemsPerPage}
                onPageSizeChange={handlePageSizeChange}
                totalCount={totalProducts}
                isLoading={isLoading}
                className="mt-8"
              />
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ShopPage;
