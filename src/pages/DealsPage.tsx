import React, { useState, useEffect } from 'react';
import { PageLayout } from '@/components/templates';
import { ShadcnPagination } from '@/components/ShadcnPagination';
import { DealCard } from '@/components/molecules/DealCard';
import { FlashSale } from '@/components/molecules/FlashSale';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Flame, Zap, Percent, Tag, Filter } from 'lucide-react';
import { useProductStore } from '@/store';
import { Product } from '@/types';

const DealsPage: React.FC = () => {
  const { getSaleProducts, isLoading, categories, loadCategories } =
    useProductStore();

  // State for deals and filters
  const [saleProducts, setSaleProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [totalProducts, setTotalProducts] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [minDiscount, setMinDiscount] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<
    'discount_high' | 'discount_low' | 'price_low' | 'price_high' | 'newest'
  >('discount_high');

  // Flash sale end time (24 hours from now)
  const flashSaleEndTime = React.useMemo(() => {
    const now = new Date();
    now.setHours(now.getHours() + 24);
    return now;
  }, []);

  // Load data
  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const response = await getSaleProducts(100); // Get more to filter locally
        if (response) {
          let filteredProducts = response.filter(
            (product) =>
              product.originalPrice && product.originalPrice > product.price
          );

          // Filter by category
          if (selectedCategory && selectedCategory !== 'all') {
            filteredProducts = filteredProducts.filter(
              (product) => product.category === selectedCategory
            );
          }

          // Filter by minimum discount
          if (minDiscount > 0) {
            filteredProducts = filteredProducts.filter((product) => {
              if (product.originalPrice) {
                const discountPercent =
                  ((product.originalPrice - product.price) /
                    product.originalPrice) *
                  100;
                return discountPercent >= minDiscount;
              }
              return false;
            });
          }

          // Sort products
          filteredProducts.sort((a, b) => {
            switch (sortOrder) {
              case 'discount_high': {
                const discountA = a.originalPrice
                  ? ((a.originalPrice - a.price) / a.originalPrice) * 100
                  : 0;
                const discountB = b.originalPrice
                  ? ((b.originalPrice - b.price) / b.originalPrice) * 100
                  : 0;
                return discountB - discountA;
              }
              case 'discount_low': {
                const discountA2 = a.originalPrice
                  ? ((a.originalPrice - a.price) / a.originalPrice) * 100
                  : 0;
                const discountB2 = b.originalPrice
                  ? ((b.originalPrice - b.price) / b.originalPrice) * 100
                  : 0;
                return discountA2 - discountB2;
              }
              case 'price_low':
                return a.price - b.price;
              case 'price_high':
                return b.price - a.price;
              case 'newest':
              default:
                return (
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
                );
            }
          });

          setTotalProducts(filteredProducts.length);

          // Paginate results
          const startIndex = (currentPage - 1) * itemsPerPage;
          const endIndex = startIndex + itemsPerPage;
          setSaleProducts(filteredProducts.slice(startIndex, endIndex));
        }
      } catch (error) {
        console.error('Error fetching sale products:', error);
      }
    };

    fetchDeals();
  }, [
    getSaleProducts,
    currentPage,
    itemsPerPage,
    selectedCategory,
    minDiscount,
    sortOrder,
  ]);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle filters
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleDiscountChange = (discount: string) => {
    setMinDiscount(Number(discount));
    setCurrentPage(1);
  };

  const handleSortChange = (sort: string) => {
    setSortOrder(
      sort as
        | 'discount_high'
        | 'discount_low'
        | 'price_low'
        | 'price_high'
        | 'newest'
    );
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSelectedCategory('all');
    setMinDiscount(0);
    setSortOrder('discount_high');
    setCurrentPage(1);
  };

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-500 via-red-600 to-pink-600 text-white py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Flame className="h-8 w-8 text-yellow-300 animate-pulse" />
              <Badge
                variant="secondary"
                className="bg-yellow-400 text-yellow-900 px-4 py-1"
              >
                MEGA SALE
              </Badge>
              <Flame className="h-8 w-8 text-yellow-300 animate-pulse" />
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Unbeatable Deals & Discounts
            </h1>
            <p className="text-lg sm:text-xl text-red-100 mb-6 max-w-2xl mx-auto">
              Discover amazing savings on thousands of products. Limited time
              offers you don't want to miss!
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>Limited Time Offers</span>
              </div>
              <Separator
                orientation="vertical"
                className="h-5 hidden sm:block bg-red-300"
              />
              <div className="flex items-center gap-2">
                <Percent className="h-5 w-5" />
                <span>Up to 70% Off</span>
              </div>
              <Separator
                orientation="vertical"
                className="h-5 hidden sm:block bg-red-300"
              />
              <div className="flex items-center gap-2">
                <Tag className="h-5 w-5" />
                <span>Free Shipping</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Flash Sale Section */}
      <section className="py-6 lg:py-8 bg-gradient-to-r from-yellow-400 to-orange-500">
        <div className="container mx-auto px-4">
          <FlashSale endTime={flashSaleEndTime} />
        </div>
      </section>

      {/* Quick Filters */}
      <section className="py-6 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium text-gray-700">
              Quick Filters:
            </span>
            <Button
              variant={minDiscount >= 50 ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleDiscountChange('50')}
            >
              <Flame className="h-4 w-4 mr-1" />
              50%+ Off
            </Button>
            <Button
              variant={minDiscount >= 30 ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleDiscountChange('30')}
            >
              30%+ Off
            </Button>
            <Button
              variant={minDiscount >= 20 ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleDiscountChange('20')}
            >
              20%+ Off
            </Button>
            <Button
              variant={
                selectedCategory === 'Electronics' ? 'default' : 'outline'
              }
              size="sm"
              onClick={() => handleCategoryChange('Electronics')}
            >
              Electronics
            </Button>
            <Button
              variant={selectedCategory === 'Fashion' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleCategoryChange('Fashion')}
            >
              Fashion
            </Button>
            <Button
              variant={sortOrder === 'price_low' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleSortChange('price_low')}
            >
              Lowest Price
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 lg:py-12">
        <div className="container mx-auto px-4">
          {/* Filters Section */}
          <Card className="mb-8">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filter Deals
                </CardTitle>
                <Button variant="outline" size="sm" onClick={clearFilters}>
                  Clear All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Category Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Category
                  </label>
                  <Select
                    value={selectedCategory}
                    onValueChange={handleCategoryChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Minimum Discount Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Minimum Discount
                  </label>
                  <Select
                    value={minDiscount.toString()}
                    onValueChange={handleDiscountChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Any Discount" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Any Discount</SelectItem>
                      <SelectItem value="10">10% or more</SelectItem>
                      <SelectItem value="20">20% or more</SelectItem>
                      <SelectItem value="30">30% or more</SelectItem>
                      <SelectItem value="50">50% or more</SelectItem>
                      <SelectItem value="70">70% or more</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Sort Order */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Sort By
                  </label>
                  <Select value={sortOrder} onValueChange={handleSortChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="discount_high">
                        Highest Discount
                      </SelectItem>
                      <SelectItem value="discount_low">
                        Lowest Discount
                      </SelectItem>
                      <SelectItem value="price_low">
                        Price: Low to High
                      </SelectItem>
                      <SelectItem value="price_high">
                        Price: High to Low
                      </SelectItem>
                      <SelectItem value="newest">Newest First</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Items Per Page */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Items Per Page
                  </label>
                  <Select
                    value={itemsPerPage.toString()}
                    onValueChange={(value) => setItemsPerPage(Number(value))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12">12 items</SelectItem>
                      <SelectItem value="20">20 items</SelectItem>
                      <SelectItem value="36">36 items</SelectItem>
                      <SelectItem value="48">48 items</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results Summary */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-500" />
              <h2 className="text-xl font-semibold">
                {totalProducts} Amazing Deals Found
              </h2>
              {selectedCategory && selectedCategory !== 'all' && (
                <Badge variant="outline" className="ml-2">
                  in {selectedCategory}
                </Badge>
              )}
              {minDiscount > 0 && (
                <Badge variant="outline" className="ml-1">
                  {minDiscount}%+ off
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="text-sm">
                Page {currentPage} of {Math.ceil(totalProducts / itemsPerPage)}
              </Badge>
              {totalProducts > 0 && (
                <span className="text-sm text-gray-500">
                  Showing {(currentPage - 1) * itemsPerPage + 1}-
                  {Math.min(currentPage * itemsPerPage, totalProducts)} of{' '}
                  {totalProducts}
                </span>
              )}
            </div>
          </div>

          {/* Products Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-gray-200 rounded-lg aspect-square mb-4"></div>
                  <div className="space-y-2">
                    <div className="bg-gray-200 h-4 rounded w-3/4"></div>
                    <div className="bg-gray-200 h-4 rounded w-1/2"></div>
                    <div className="bg-gray-200 h-6 rounded w-1/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : saleProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                {saleProducts.map((product) => (
                  <DealCard
                    key={product.id}
                    product={product}
                    showCountdown={true}
                    dealEndTime={flashSaleEndTime}
                  />
                ))}
              </div>

              {/* Special Promotion Banner */}
              {currentPage === 1 && (
                <div className="mb-8">
                  <Card className="bg-gradient-to-r from-purple-600 via-blue-600 to-blue-700 text-white overflow-hidden">
                    <CardContent className="p-6 sm:p-8">
                      <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                        <div className="text-center lg:text-left">
                          <div className="flex items-center justify-center lg:justify-start gap-2 mb-3">
                            <Badge
                              variant="secondary"
                              className="bg-yellow-400 text-yellow-900 px-3 py-1"
                            >
                              <Flame className="w-4 h-4 mr-1" />
                              EXCLUSIVE
                            </Badge>
                          </div>
                          <h3 className="text-2xl sm:text-3xl font-bold mb-2">
                            Member Exclusive Deals
                          </h3>
                          <p className="text-blue-100 mb-4 max-w-md">
                            Join our membership program and get access to
                            exclusive deals, early access to sales, and free
                            shipping on all orders.
                          </p>
                          <div className="flex flex-col sm:flex-row gap-3">
                            <Button
                              variant="secondary"
                              size="lg"
                              className="bg-white text-blue-700 hover:bg-gray-50"
                            >
                              Join Membership
                            </Button>
                            <Button
                              variant="outline"
                              size="lg"
                              className="border-white text-white hover:bg-white/10"
                            >
                              Learn More
                            </Button>
                          </div>
                        </div>
                        <div className="hidden lg:block">
                          <div className="grid grid-cols-2 gap-3">
                            <div className="text-center bg-white/10 rounded-lg p-3">
                              <div className="text-2xl font-bold">15%</div>
                              <div className="text-sm text-blue-200">
                                Extra Discount
                              </div>
                            </div>
                            <div className="text-center bg-white/10 rounded-lg p-3">
                              <div className="text-2xl font-bold">FREE</div>
                              <div className="text-sm text-blue-200">
                                Shipping
                              </div>
                            </div>
                            <div className="text-center bg-white/10 rounded-lg p-3 col-span-2">
                              <div className="text-2xl font-bold">24/7</div>
                              <div className="text-sm text-blue-200">
                                Priority Support
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Pagination */}
              {totalProducts > itemsPerPage && (
                <div className="flex justify-center">
                  <ShadcnPagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(totalProducts / itemsPerPage)}
                    onPageChange={handlePageChange}
                    pageSize={itemsPerPage}
                    onPageSizeChange={setItemsPerPage}
                    totalCount={totalProducts}
                  />
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <div className="mx-auto mb-4 w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
                <Tag className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No deals found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your filters to see more results.
              </p>
              <Button onClick={clearFilters}>Clear All Filters</Button>
            </div>
          )}
        </div>
      </section>

      {/* Additional Promotions */}
      <section className="py-8 lg:py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold mb-4">
              Why Shop Our Deals?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We offer the best prices, authentic products, and exceptional
              service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <Percent className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Best Prices Guaranteed
              </h3>
              <p className="text-gray-600">
                We match any competitor's price and beat it by 5%.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Limited Time Offers
              </h3>
              <p className="text-gray-600">
                Flash sales and daily deals that won't last long.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                <Tag className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Authentic Products</h3>
              <p className="text-gray-600">
                100% genuine products with manufacturer warranty.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default DealsPage;
