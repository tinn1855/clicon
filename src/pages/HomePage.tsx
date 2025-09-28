import React from 'react';
import { PageLayout } from '@/components/templates';
import {
  Button,
  Heading2,
  Heading3,
  Card,
  CardContent,
} from '@/components/atoms';
import {
  HeroBannerSlider,
  FeaturedProductsCarousel,
  BestSellerCarousel,
  NewArrivalsCarousel,
  DealsCarousel,
  TestimonialsSlider,
  BrandCarousel,
  CategoryCarousel,
  FlashSale,
} from '@/components/molecules';
import {
  Shield,
  Truck,
  RefreshCw,
  Headphones,
  Star,
  Gift,
  Clock,
} from 'lucide-react';
import { useProductStore } from '@/store';

// Service Features Data
const serviceFeatures = [
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'Free shipping on orders over $50',
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    icon: RefreshCw,
    title: 'Easy Returns',
    description: '30-day return policy',
    bgColor: 'bg-green-50',
    iconColor: 'text-green-600',
  },
  {
    icon: Shield,
    title: 'Secure Payment',
    description: '100% secure transactions',
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-600',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Always here to help',
    bgColor: 'bg-orange-50',
    iconColor: 'text-orange-600',
  },
];

export default function HomePage() {
  const { loadFeaturedProducts, featuredProducts: storeProducts } =
    useProductStore();

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

  // Get different product collections
  const featuredProducts = storeProducts.slice(0, 8);
  const bestSellerProducts = storeProducts.slice(8, 16);
  const newArrivals = storeProducts.slice(16, 24);
  const dealsProducts = storeProducts.slice(0, 6);

  return (
    <PageLayout>
      {/* Hero Banner Slider */}
      <section className="mb-6 sm:mb-8 lg:mb-12">
        <HeroBannerSlider />
      </section>

      {/* Service Features */}
      <section className="mb-8 sm:mb-12 lg:mb-16">
        <div
          className="w-full min-w-[375px] px-3 sm:px-4 lg:px-8 mx-auto"
          style={{ maxWidth: '100vw', overflowX: 'hidden' }}
        >
          <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {serviceFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card
                  key={index}
                  className="text-center hover:shadow-md transition-shadow duration-300 min-w-0 w-full"
                >
                  <CardContent className="p-3 sm:p-4 lg:p-6">
                    <div
                      className={`inline-flex p-2 sm:p-3 rounded-full ${feature.bgColor} mb-3 sm:mb-4`}
                    >
                      <IconComponent
                        className={`h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 ${feature.iconColor} flex-shrink-0`}
                      />
                    </div>
                    <Heading3 className="font-semibold mb-2 text-sm sm:text-base lg:text-lg">
                      {feature.title}
                    </Heading3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Categories Carousel */}
      <section className="mb-8 sm:mb-12 lg:mb-16">
        <div
          className="w-full min-w-[375px] px-3 sm:px-4 lg:px-8 mx-auto"
          style={{ maxWidth: '100vw', overflowX: 'hidden' }}
        >
          <CategoryCarousel />
        </div>
      </section>

      {/* Flash Sale Section */}
      {dealsProducts.length > 0 && (
        <section className="mb-8 sm:mb-12 lg:mb-16">
          <div
            className="w-full min-w-[375px] px-3 sm:px-4 lg:px-8 mx-auto"
            style={{ maxWidth: '100vw', overflowX: 'hidden' }}
          >
            <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-lg p-4 sm:p-6 lg:p-8 text-white">
              <div className="flex flex-col gap-4 sm:gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="text-center lg:text-left min-w-0 flex-1">
                  <div className="flex items-center justify-center lg:justify-start gap-2 mb-2 sm:mb-3">
                    <Clock className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                    <span className="font-semibold text-sm sm:text-base">
                      Limited Time Offer
                    </span>
                  </div>
                  <Heading2 className="text-base sm:text-lg lg:text-2xl xl:text-3xl font-bold text-white mb-1 sm:mb-2">
                    Flash Sale - Up to 70% Off
                  </Heading2>
                  <p className="text-red-100 text-xs sm:text-sm mb-2 sm:mb-4">
                    Hurry! These deals won't last long
                  </p>
                </div>
                <div className="flex-shrink-0 flex justify-center lg:justify-end">
                  <FlashSale endTime={flashSaleEndTime} />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Deals Carousel */}
      {dealsProducts.length > 0 && (
        <section className="mb-8 sm:mb-12 lg:mb-16">
          <div
            className="w-full min-w-[375px] px-3 sm:px-4 lg:px-8 mx-auto"
            style={{ maxWidth: '100vw', overflowX: 'hidden' }}
          >
            <DealsCarousel products={dealsProducts} />
          </div>
        </section>
      )}

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="mb-8 sm:mb-12 lg:mb-16">
          <div
            className="w-full min-w-[375px] px-3 sm:px-4 lg:px-8 mx-auto"
            style={{ maxWidth: '100vw', overflowX: 'hidden' }}
          >
            <FeaturedProductsCarousel products={featuredProducts} />
          </div>
        </section>
      )}

      {/* Best Sellers */}
      {bestSellerProducts.length > 0 && (
        <section className="mb-8 sm:mb-12 lg:mb-16">
          <div
            className="w-full min-w-[375px] px-3 sm:px-4 lg:px-8 mx-auto"
            style={{ maxWidth: '100vw', overflowX: 'hidden' }}
          >
            <BestSellerCarousel products={bestSellerProducts} />
          </div>
        </section>
      )}

      {/* Brand Carousel */}
      <section className="mb-8 sm:mb-12 lg:mb-16">
        <div
          className="w-full min-w-[375px] px-3 sm:px-4 lg:px-8 mx-auto"
          style={{ maxWidth: '100vw', overflowX: 'hidden' }}
        >
          <BrandCarousel />
        </div>
      </section>

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section className="mb-8 sm:mb-12 lg:mb-16">
          <div
            className="w-full min-w-[375px] px-3 sm:px-4 lg:px-8 mx-auto"
            style={{ maxWidth: '100vw', overflowX: 'hidden' }}
          >
            <NewArrivalsCarousel products={newArrivals} />
          </div>
        </section>
      )}

      {/* Newsletter Signup */}
      <section className="mb-8 sm:mb-12 lg:mb-16">
        <div
          className="w-full min-w-[375px] px-3 sm:px-4 lg:px-8 mx-auto"
          style={{ maxWidth: '100vw', overflowX: 'hidden' }}
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-4 sm:p-6 lg:p-8 xl:p-12 text-white text-center">
            <Gift className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 xl:h-12 xl:w-12 mx-auto mb-3 sm:mb-4 flex-shrink-0" />
            <Heading2 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold mb-3 sm:mb-4">
              Stay in the Loop
            </Heading2>
            <p className="text-blue-100 mb-4 sm:mb-6 max-w-2xl mx-auto text-xs sm:text-sm lg:text-base leading-relaxed">
              Subscribe to our newsletter and be the first to know about new
              products, exclusive deals, and tech insights.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 sm:px-4 text-sm sm:text-base rounded-lg text-gray-900 placeholder-gray-500 outline-none min-w-0"
              />
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base whitespace-nowrap"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="mb-8 sm:mb-12 lg:mb-16">
        <div
          className="w-full min-w-[375px] px-3 sm:px-4 lg:px-8 mx-auto"
          style={{ maxWidth: '100vw', overflowX: 'hidden' }}
        >
          <TestimonialsSlider />
        </div>
      </section>

      {/* Call to Action */}
      <section className="mb-6 sm:mb-8">
        <div
          className="w-full min-w-[375px] px-3 sm:px-4 lg:px-8 mx-auto"
          style={{ maxWidth: '100vw', overflowX: 'hidden' }}
        >
          <div className="bg-gray-50 rounded-lg p-4 sm:p-6 lg:p-8 text-center">
            <Star className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 xl:h-12 xl:w-12 mx-auto text-yellow-500 mb-3 sm:mb-4 flex-shrink-0" />
            <Heading2 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold mb-3 sm:mb-4">
              Ready to Explore?
            </Heading2>
            <p className="text-gray-600 mb-4 sm:mb-6 max-w-2xl mx-auto text-xs sm:text-sm lg:text-base leading-relaxed">
              Discover thousands of products from the world's best brands.
              Quality guaranteed, fast shipping, and excellent customer service.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => (window.location.href = '/shop')}
                className="text-sm sm:text-base"
              >
                Start Shopping
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => (window.location.href = '/about')}
                className="text-sm sm:text-base"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
