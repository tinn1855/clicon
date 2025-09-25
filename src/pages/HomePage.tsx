import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PageLayout } from '@/components/templates';
import {
  Button,
  Heading1,
  Heading2,
  Heading3,
  Card,
  CardContent,
  Badge,
  Input,
  ImageWithSkeleton,
  GlassCard,
} from '@/components/atoms';
import {
  ProductCard,
  FlashSale,
  SkeletonProductCard,
} from '@/components/molecules';
import {
  ArrowRight,
  Zap,
  TrendingUp,
  ShoppingBag,
  Smartphone,
  Headphones,
  Camera,
  Gamepad2,
  Shield,
  Users,
} from 'lucide-react';
import { useProductStore } from '@/store';
import { Product } from '@/types';

// Mock data for categories
const categories = [
  {
    id: '1',
    name: 'Computer & Laptop',
    slug: 'computer-laptop',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300',
    productCount: 1250,
    icon: <Gamepad2 className="h-6 w-6 sm:h-8 sm:w-8" />,
  },
  {
    id: '2',
    name: 'SmartPhone',
    slug: 'smartphone',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300',
    productCount: 890,
    icon: <Smartphone className="h-6 w-6 sm:h-8 sm:w-8" />,
  },
  {
    id: '3',
    name: 'Headphone',
    slug: 'headphone',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300',
    productCount: 650,
    icon: <Headphones className="h-6 w-6 sm:h-8 sm:w-8" />,
  },
  {
    id: '4',
    name: 'Camera & Photo',
    slug: 'camera-photo',
    image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=300',
    productCount: 420,
    icon: <Camera className="h-6 w-6 sm:h-8 sm:w-8" />,
  },
];

export default function HomePage() {
  const {
    loadFeaturedProducts,
    isLoading,
    featuredProducts: storeProducts,
  } = useProductStore();

  React.useEffect(() => {
    // Load featured products if not already loaded
    if (storeProducts.length === 0) {
      loadFeaturedProducts();
    }
  }, [loadFeaturedProducts, storeProducts.length]);

  // Flash sale end time (24 hours from now)
  const flashSaleEndTime = React.useMemo(() => {
    const now = new Date();
    now.setHours(now.getHours() + 24);
    return now;
  }, []);

  const navigate = useNavigate();

  // Get featured products from store
  const featuredProducts = storeProducts;
  // Get today's best deals (first 4 products)
  const todaysDeals = featuredProducts.slice(0, 4);

  return (
    <PageLayout>
      {/* Hero Section with Featured Product */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="container mx-auto px-4 py-8 sm:py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-white space-y-4 sm:space-y-6 order-2 lg:order-1">
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="new" className="text-xs sm:text-sm">
                    WEEKEND DISCOUNT
                  </Badge>
                  <Badge variant="featured" className="text-xs sm:text-sm">
                    BEST COLLECTION
                  </Badge>
                </div>
                <Heading1 className="text-white leading-tight text-2xl sm:text-3xl lg:text-4xl">
                  The best notebook collection 2024
                </Heading1>
                <p className="text-base sm:text-lg lg:text-xl text-white/90">
                  Exclusive selection of this year's best laptops and cameras
                </p>
              </div>

              <div className="flex items-center gap-4 sm:gap-6">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold">50%</div>
                  <div className="text-xs sm:text-sm">Discount</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold">Free</div>
                  <div className="text-xs sm:text-sm">Shipping</div>
                </div>
              </div>

              <Button
                size="lg"
                className="bg-white text-orange-600 hover:bg-gray-50 w-full sm:w-auto"
                onClick={() => navigate('/shop')}
              >
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="relative order-1 lg:order-2">
              <GlassCard variant="light" className="p-4 sm:p-6 lg:p-8">
                <ImageWithSkeleton
                  src={
                    featuredProducts[0]?.images[0] ||
                    'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=600'
                  }
                  alt={featuredProducts[0]?.name || 'Featured Product'}
                  className="w-full h-48 sm:h-64 lg:h-80 object-cover rounded-lg"
                  fallbackSrc="https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=600"
                />
                <div className="mt-4 text-center glass-text-light">
                  <h3 className="text-lg sm:text-xl font-semibold">
                    {featuredProducts[0]?.name || 'Amazing Product'}
                  </h3>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <span className="text-xl sm:text-2xl font-bold">
                      ${featuredProducts[0]?.price || '999.00'}
                    </span>
                    {featuredProducts[0]?.originalPrice && (
                      <span className="text-base sm:text-lg line-through opacity-75">
                        ${featuredProducts[0].originalPrice}
                      </span>
                    )}
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      {/* Flash Sale Section */}
      <section className="py-4 sm:py-6 lg:py-8">
        <div className="container mx-auto px-4">
          <FlashSale endTime={flashSaleEndTime} />
        </div>
      </section>

      {/* Today's Best Deals */}
      <section className="py-8 sm:py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
            <div className="flex items-center gap-3">
              <Heading2 className="flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl lg:text-3xl">
                <Zap className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-500" />
                Today's Best Deals
              </Heading2>
              <Badge variant="sale" className="text-xs animate-pulse">
                LIMITED TIME
              </Badge>
            </div>
            <Button
              variant="outline"
              className="w-full sm:w-auto text-sm"
              onClick={() => navigate('/shop')}
            >
              <span className="hidden sm:inline">Browse All Products</span>
              <span className="sm:hidden">View All</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 overflow-hidden">
            {isLoading
              ? // Show skeleton loading
                Array.from({ length: 4 }).map((_, index) => (
                  <SkeletonProductCard key={index} />
                ))
              : // Show actual products
                todaysDeals.map((product: Product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="py-8 sm:py-12 lg:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <Heading2 className="mb-4 text-xl sm:text-2xl lg:text-3xl">
              Shop by Category
            </Heading2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
              Browse our wide range of categories to find exactly what you're
              looking for
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {categories.map((category) => (
              <Link key={category.id} to={`/category/${category.slug}`}>
                <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-2 hover:border-primary">
                  <CardContent className="p-4 sm:p-6 text-center">
                    <div className="mb-3 sm:mb-4 flex justify-center text-primary">
                      {category.icon}
                    </div>
                    <Heading3 className="mb-2 text-sm sm:text-base lg:text-lg">
                      {category.name}
                    </Heading3>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {category.productCount} products
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Grid */}
      <section className="py-8 sm:py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
            <div className="flex items-center gap-3">
              <Heading2 className="flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl lg:text-3xl">
                <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                Featured Products
              </Heading2>
              <Badge variant="featured" className="text-xs">
                TRENDING
              </Badge>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant="outline"
                size="sm"
                className="text-xs sm:text-sm"
              >
                Popular
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs sm:text-sm"
              >
                Best Selling
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs sm:text-sm hidden sm:inline-flex"
              >
                Top Rated
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 overflow-hidden">
            {isLoading
              ? // Show skeleton loading
                Array.from({ length: 8 }).map((_, index) => (
                  <SkeletonProductCard key={index} />
                ))
              : // Show actual products
                featuredProducts.map((product: Product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
          </div>

          <div className="text-center mt-8 sm:mt-12">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto"
              onClick={() => navigate('/shop')}
            >
              Load More Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center space-y-3 sm:space-y-4">
              <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <ShoppingBag className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
              </div>
              <Heading3 className="text-base sm:text-lg">
                Free Shipping
              </Heading3>
              <p className="text-muted-foreground text-sm sm:text-base">
                Free shipping on orders over $50. Fast and reliable delivery
                worldwide.
              </p>
            </div>

            <div className="text-center space-y-3 sm:space-y-4">
              <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
              </div>
              <Heading3 className="text-base sm:text-lg">
                Secure Payment
              </Heading3>
              <p className="text-muted-foreground text-sm sm:text-base">
                Your payments are secure with our advanced encryption
                technology.
              </p>
            </div>

            <div className="text-center space-y-3 sm:space-y-4">
              <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
              </div>
              <Heading3 className="text-base sm:text-lg">24/7 Support</Heading3>
              <p className="text-muted-foreground text-sm sm:text-base">
                Get help anytime with our dedicated customer support team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <Heading2 className="mb-4 text-white text-xl sm:text-2xl lg:text-3xl">
            Subscribe to our Newsletter
          </Heading2>
          <p className="text-base sm:text-lg lg:text-xl text-primary-foreground/90 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Get the latest updates on new products and exclusive offers
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-sm sm:max-w-md mx-auto">
            <Input
              type="email"
              inputSize="lg"
              placeholder="Enter your email"
              className="flex-1 bg-white text-gray-900 placeholder:text-gray-500 border-white"
            />
            <Button size="lg" variant="secondary" className="w-full sm:w-auto">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
