import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Button, Heading2 } from '@/components/atoms';
import { ProductCard } from '@/components/molecules';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Star, TrendingUp, Zap, Award } from 'lucide-react';
import { Product } from '@/types';

interface ProductCarouselProps {
  title: string;
  products: Product[];
  variant?: 'featured' | 'bestseller' | 'new' | 'deals';
  viewAllLink?: string;
  className?: string;
}

const variantConfig = {
  featured: {
    icon: Star,
    badge: 'Featured',
    badgeColor: 'bg-yellow-500',
    titleColor: 'text-yellow-600',
  },
  bestseller: {
    icon: TrendingUp,
    badge: 'Best Seller',
    badgeColor: 'bg-green-500',
    titleColor: 'text-green-600',
  },
  new: {
    icon: Zap,
    badge: 'New Arrivals',
    badgeColor: 'bg-blue-500',
    titleColor: 'text-blue-600',
  },
  deals: {
    icon: Award,
    badge: 'Hot Deals',
    badgeColor: 'bg-red-500',
    titleColor: 'text-red-600',
  },
};

export const ProductCarousel: React.FC<ProductCarouselProps> = ({
  title,
  products,
  variant = 'featured',
  viewAllLink,
  className = '',
}) => {
  const navigate = useNavigate();
  const config = variantConfig[variant];
  const IconComponent = config.icon;

  const handleViewAll = () => {
    if (viewAllLink) {
      navigate(viewAllLink);
    }
  };

  return (
    <div
      className={`w-full min-w-[375px] max-w-full overflow-hidden ${className}`}
    >
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-6 gap-2 px-1">
        <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
          <div
            className={`p-1.5 sm:p-2 rounded-full ${config.badgeColor} flex-shrink-0`}
          >
            <IconComponent className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <Heading2
              className={`text-base sm:text-lg lg:text-2xl xl:text-3xl font-bold ${config.titleColor} truncate`}
            >
              {title}
            </Heading2>
            <Badge
              variant="secondary"
              className={`${config.badgeColor} text-white text-xs hidden sm:inline-flex mt-1`}
            >
              {config.badge}
            </Badge>
          </div>
        </div>

        {viewAllLink && (
          <Button
            variant="outline"
            onClick={handleViewAll}
            className="hidden sm:flex items-center flex-shrink-0 text-xs sm:text-sm px-3 py-1.5"
          >
            <span className="hidden md:inline">View All</span>
            <span className="md:hidden">All</span>
            <ArrowRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        )}
      </div>

      {/* Products Carousel */}
      <Carousel
        opts={{
          align: 'start',
          loop: false,
        }}
        className="w-full max-w-full"
      >
        <CarouselContent className="-ml-1 sm:-ml-2 lg:-ml-4">
          {products.map((product) => (
            <CarouselItem
              key={product.id}
              className="pl-1 sm:pl-2 lg:pl-4 basis-full min-[375px]:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
            >
              <div className="h-full flex flex-col min-w-0 max-w-full">
                <ProductCard
                  product={product}
                  className="flex-1 flex flex-col w-full min-w-0 max-w-full"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-0 -translate-x-2 sm:-translate-x-4 bg-white shadow-md border hidden lg:flex" />
        <CarouselNext className="right-0 translate-x-2 sm:translate-x-4 bg-white shadow-md border hidden lg:flex" />
      </Carousel>

      {/* Mobile View All Button */}
      {viewAllLink && (
        <div className="flex justify-center mt-4 sm:mt-6">
          <Button
            onClick={handleViewAll}
            className="w-full max-w-xs sm:hidden text-sm px-4 py-2"
          >
            View All Products
            <ArrowRight className="ml-1 h-3 w-3" />
          </Button>
        </div>
      )}
    </div>
  );
};

// Specialized Product Carousels
export const FeaturedProductsCarousel: React.FC<{
  products: Product[];
  className?: string;
}> = ({ products, className }) => (
  <ProductCarousel
    title="Featured Products"
    products={products}
    variant="featured"
    viewAllLink="/shop?featured=true"
    className={className}
  />
);

export const BestSellerCarousel: React.FC<{
  products: Product[];
  className?: string;
}> = ({ products, className }) => (
  <ProductCarousel
    title="Best Sellers"
    products={products}
    variant="bestseller"
    viewAllLink="/shop?sort=bestseller"
    className={className}
  />
);

export const NewArrivalsCarousel: React.FC<{
  products: Product[];
  className?: string;
}> = ({ products, className }) => (
  <ProductCarousel
    title="New Arrivals"
    products={products}
    variant="new"
    viewAllLink="/shop?sort=newest"
    className={className}
  />
);

export const DealsCarousel: React.FC<{
  products: Product[];
  className?: string;
}> = ({ products, className }) => (
  <ProductCarousel
    title="Hot Deals"
    products={products}
    variant="deals"
    viewAllLink="/shop?deals=true"
    className={className}
  />
);

export default ProductCarousel;
