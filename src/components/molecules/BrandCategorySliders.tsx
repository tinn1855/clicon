import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from '@/components/ui/carousel';
import { Button, Heading2, Card, CardContent } from '@/components/atoms';
import { Badge } from '@/components/ui/badge';
import {
  ArrowRight,
  Smartphone,
  Laptop,
  Headphones,
  Camera,
  Gamepad2,
  Tv,
  Watch,
  Tablet,
  Grid3x3,
} from 'lucide-react';

// Brand Data
interface Brand {
  id: string;
  name: string;
  logo: string;
  description: string;
}

const brands: Brand[] = [
  {
    id: '1',
    name: 'Apple',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
    description: 'Innovation at its finest',
  },
  {
    id: '2',
    name: 'Samsung',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg',
    description: 'Inspire the world',
  },
  {
    id: '3',
    name: 'Sony',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg',
    description: 'BE MOVED',
  },
  {
    id: '4',
    name: 'Microsoft',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
    description: 'Empowering us all',
  },
  {
    id: '5',
    name: 'Google',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
    description: 'Organize the world',
  },
  {
    id: '6',
    name: 'Intel',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7d/Intel_logo_%282006-2020%29.svg',
    description: 'The computer inside',
  },
  {
    id: '7',
    name: 'NVIDIA',
    logo: 'https://upload.wikimedia.org/wikipedia/en/2/21/Nvidia_logo.svg',
    description: "The way it's meant to be played",
  },
  {
    id: '8',
    name: 'AMD',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/AMD_Logo.svg',
    description: 'High performance computing',
  },
  {
    id: '9',
    name: 'Dell',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Dell_Logo.svg',
    description: 'Technologies that drive human progress',
  },
  {
    id: '10',
    name: 'HP',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/HP_logo_2012.svg',
    description: 'Keep Reinventing',
  },
  {
    id: '11',
    name: 'Lenovo',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Lenovo_logo_2015.svg',
    description: 'For those who do',
  },
  {
    id: '12',
    name: 'Asus',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/ASUS_Logo.svg',
    description: 'In search of incredible',
  },
];

// Category Data
interface Category {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  productCount: number;
  image: string;
  bgColor: string;
  textColor: string;
}

const categories: Category[] = [
  {
    id: '1',
    name: 'Smartphones',
    icon: Smartphone,
    productCount: 256,
    image:
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=200&fit=crop',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-600',
  },
  {
    id: '2',
    name: 'Laptops',
    icon: Laptop,
    productCount: 189,
    image:
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-600',
  },
  {
    id: '3',
    name: 'Headphones',
    icon: Headphones,
    productCount: 143,
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop',
    bgColor: 'bg-green-50',
    textColor: 'text-green-600',
  },
  {
    id: '4',
    name: 'Cameras',
    icon: Camera,
    productCount: 98,
    image:
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=300&h=200&fit=crop',
    bgColor: 'bg-yellow-50',
    textColor: 'text-yellow-600',
  },
  {
    id: '5',
    name: 'Gaming',
    icon: Gamepad2,
    productCount: 176,
    image:
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300&h=200&fit=crop',
    bgColor: 'bg-red-50',
    textColor: 'text-red-600',
  },
  {
    id: '6',
    name: 'TV & Audio',
    icon: Tv,
    productCount: 87,
    image:
      'https://images.unsplash.com/photo-1461151304267-38535e780c79?w=300&h=200&fit=crop',
    bgColor: 'bg-indigo-50',
    textColor: 'text-indigo-600',
  },
  {
    id: '7',
    name: 'Smart Watches',
    icon: Watch,
    productCount: 124,
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop',
    bgColor: 'bg-pink-50',
    textColor: 'text-pink-600',
  },
  {
    id: '8',
    name: 'Tablets',
    icon: Tablet,
    productCount: 67,
    image:
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=200&fit=crop',
    bgColor: 'bg-teal-50',
    textColor: 'text-teal-600',
  },
];

// Brand Logo Component with fallback
interface BrandLogoProps {
  brand: Brand;
  className?: string;
  style?: React.CSSProperties;
}

const BrandLogo: React.FC<BrandLogoProps> = ({ brand, className, style }) => {
  const [hasError, setHasError] = React.useState(false);
  const [useSecondFallback, setUseSecondFallback] = React.useState(false);

  const handleImageError = () => {
    if (!hasError) {
      setHasError(true);
    } else {
      setUseSecondFallback(true);
    }
  };

  // Generate a simple SVG fallback
  const generateSvgFallback = (brandName: string) => {
    const initials = brandName
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

    const svgString = `
      <svg width="120" height="40" viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg">
        <rect width="120" height="40" fill="#666666"/>
        <text x="60" y="25" text-anchor="middle" fill="#FFFFFF" font-family="Arial, sans-serif" font-size="14" font-weight="bold">${initials}</text>
      </svg>
    `;
    return `data:image/svg+xml;base64,${btoa(svgString)}`;
  };

  if (useSecondFallback) {
    return (
      <div
        className="w-full h-full bg-gray-300 rounded flex items-center justify-center text-gray-600 text-xs font-medium"
        style={style}
      >
        {brand.name}
      </div>
    );
  }

  return (
    <img
      src={hasError ? generateSvgFallback(brand.name) : brand.logo}
      alt={brand.name}
      className={className}
      style={style}
      onError={handleImageError}
    />
  );
};

// Brand Carousel Component
interface BrandCarouselProps {
  className?: string;
  title?: string;
}

export const BrandCarousel: React.FC<BrandCarouselProps> = ({
  className = '',
  title = 'Trusted Brands',
}) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [isHovered, setIsHovered] = React.useState(false);

  React.useEffect(() => {
    if (!api || isHovered) {
      return;
    }

    // Auto-scroll every 3 seconds when not hovered
    const interval = setInterval(() => {
      api.scrollNext();
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [api, isHovered]);

  // Duplicate brands for smoother infinite scroll effect
  const duplicatedBrands = [...brands, ...brands];

  return (
    <div
      className={`w-full min-w-[375px] max-w-full overflow-hidden ${className}`}
    >
      {/* Section Header */}
      <div className="text-center mb-4 sm:mb-6 lg:mb-8 px-2 sm:px-4">
        <Heading2 className="text-base sm:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 mb-2">
          {title}
        </Heading2>
        <p className="text-gray-600 max-w-2xl mx-auto text-xs sm:text-sm lg:text-base">
          Shop from the world's most trusted and innovative technology brands
        </p>
      </div>

      {/* Brands Carousel */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative px-1 sm:px-2"
      >
        <Carousel
          setApi={setApi}
          opts={{
            align: 'start',
            loop: true,
            skipSnaps: false,
            dragFree: true,
          }}
          className="w-full max-w-full"
        >
          <CarouselContent className="-ml-1 sm:-ml-2 lg:-ml-4">
            {duplicatedBrands.map((brand, index) => (
              <CarouselItem
                key={`${brand.id}-${index}`}
                className="pl-1 sm:pl-2 lg:pl-4 basis-1/2 min-[375px]:basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6 xl:basis-1/8"
              >
                <div className="group/item cursor-pointer">
                  <Card className="border-0 shadow-none hover:shadow-md transition-all duration-300 group-hover/item:scale-105">
                    <CardContent className="p-1.5 sm:p-2 lg:p-3 text-center">
                      {/* Fixed size container for logos */}
                      <div className="h-10 sm:h-12 lg:h-14 w-full flex items-center justify-center mb-1.5 sm:mb-2 bg-gray-50 rounded-lg group-hover/item:bg-white transition-colors duration-300">
                        <BrandLogo
                          brand={brand}
                          className="max-h-6 sm:max-h-8 lg:max-h-9 max-w-[85%] object-contain grayscale group-hover/item:grayscale-0 transition-all duration-300"
                          style={{
                            width: 'auto',
                            height: 'auto',
                            maxWidth: '85%',
                            maxHeight: '1.5rem', // 24px on mobile, responsive up
                          }}
                        />
                      </div>
                      <h3 className="font-medium text-xs sm:text-sm text-gray-900 group-hover/item:text-primary transition-colors duration-300 truncate">
                        {brand.name}
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5 truncate hidden md:block">
                        {brand.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation buttons - visible on hover */}
          <CarouselPrevious className="left-0 -translate-x-2 lg:-translate-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden lg:flex" />
          <CarouselNext className="right-0 translate-x-2 lg:translate-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden lg:flex" />
        </Carousel>
      </div>

      {/* Auto-scroll indicator */}
      <div className="text-center mt-3 sm:mt-4">
        <p className="text-xs text-gray-400 flex items-center justify-center gap-1 sm:gap-2">
          <div
            className={`w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full ${
              isHovered ? 'opacity-50' : 'animate-pulse'
            } transition-all duration-300`}
          ></div>
          <span className="text-xs">
            {isHovered ? 'Paused' : 'Auto-scrolling'} • Hover to pause
          </span>
        </p>
      </div>
    </div>
  );
};

// Category Carousel Component
interface CategoryCarouselProps {
  className?: string;
  title?: string;
  viewAllLink?: string;
}

export const CategoryCarousel: React.FC<CategoryCarouselProps> = ({
  className = '',
  title = 'Shop by Category',
  viewAllLink = '/categories',
}) => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/shop?category=${categoryId}`);
  };

  const handleViewAll = () => {
    navigate(viewAllLink);
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <Heading2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            {title}
          </Heading2>
          <p className="text-gray-600">
            Explore our wide range of product categories
          </p>
        </div>
        <Button
          variant="outline"
          onClick={handleViewAll}
          className="hidden sm:flex items-center"
        >
          <Grid3x3 className="mr-2 h-4 w-4" />
          View All
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      {/* Categories Carousel */}
      <Carousel
        opts={{
          align: 'start',
          loop: false,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <CarouselItem
                key={category.id}
                className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
              >
                <Card
                  className="cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                  onClick={() => handleCategoryClick(category.id)}
                >
                  <CardContent className="p-0">
                    {/* Category Image */}
                    <div className="relative h-32 overflow-hidden rounded-t-lg">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                      {/* Icon Overlay */}
                      <div
                        className={`absolute top-3 right-3 p-2 rounded-full ${category.bgColor}`}
                      >
                        <IconComponent
                          className={`h-4 w-4 ${category.textColor}`}
                        />
                      </div>
                    </div>

                    {/* Category Info */}
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-500 mb-2">
                        {category.productCount} Products
                      </p>
                      <Badge variant="secondary" className="text-xs">
                        Shop Now
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        <CarouselPrevious className="left-0 -translate-x-4" />
        <CarouselNext className="right-0 translate-x-4" />
      </Carousel>

      {/* Mobile View All Button */}
      <div className="flex justify-center mt-6 sm:hidden">
        <Button onClick={handleViewAll} className="w-full max-w-xs">
          View All Categories
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default { BrandCarousel, CategoryCarousel };
