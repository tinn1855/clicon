import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Button } from '@/components/atoms';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Star, Zap, ShoppingBag, Truck } from 'lucide-react';

interface HeroBannerSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  backgroundImage: string;
  primaryCTA: {
    text: string;
    action: string;
  };
  secondaryCTA?: {
    text: string;
    action: string;
  };
  badge?: string;
  discount?: string;
  features?: string[];
}

const heroSlides: HeroBannerSlide[] = [
  {
    id: '1',
    title: 'Summer Electronics Sale',
    subtitle: 'Up to 70% Off',
    description:
      'Discover amazing deals on the latest smartphones, laptops, and accessories. Limited time offer!',
    backgroundImage:
      'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1120&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    primaryCTA: {
      text: 'Shop Now',
      action: '/shop',
    },
    secondaryCTA: {
      text: 'View Deals',
      action: '/deals',
    },
    badge: 'Hot Sale',
    discount: '70% OFF',
    features: ['Free Shipping', '30-Day Returns', '2-Year Warranty'],
  },
  {
    id: '2',
    title: 'New iPhone 15 Collection',
    subtitle: 'Innovation at Your Fingertips',
    description:
      'Experience the future with the latest iPhone 15 series. Advanced camera, powerful performance.',
    backgroundImage:
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=1200&h=600&fit=crop',
    primaryCTA: {
      text: 'Pre-Order Now',
      action: '/products/iphone-15',
    },
    secondaryCTA: {
      text: 'Learn More',
      action: '/products/iphone-15/specs',
    },
    badge: 'New Arrival',
    features: ['A17 Pro Chip', '48MP Camera', 'Titanium Design'],
  },
  {
    id: '3',
    title: 'Gaming Gear Paradise',
    subtitle: 'Level Up Your Game',
    description:
      'Professional gaming equipment for serious gamers. Mechanical keyboards, gaming mice, and headsets.',
    backgroundImage:
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=600&fit=crop',
    primaryCTA: {
      text: 'Explore Gaming',
      action: '/shop/gaming',
    },
    secondaryCTA: {
      text: 'Build PC',
      action: '/pc-builder',
    },
    badge: 'Gaming Zone',
    discount: '25% OFF',
    features: ['RGB Lighting', 'Mechanical Keys', 'Pro Gaming'],
  },
];

export const HeroBannerSlider: React.FC = () => {
  const navigate = useNavigate();

  const handleCTAClick = (action: string) => {
    navigate(action);
  };

  return (
    <div className="relative w-full">
      <Carousel className="w-full" opts={{ align: 'start', loop: true }}>
        <CarouselContent>
          {heroSlides.map((slide) => (
            <CarouselItem key={slide.id}>
              <div className="relative py-2 sm:h-[500px] lg:h-[600px] overflow-hidden">
                {/* Background Image with Overlay */}
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${slide.backgroundImage})`,
                  }}
                />

                {/* Content */}
                <div className="relative h-full flex items-center">
                  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-2xl text-white">
                      {/* Badge */}
                      {slide.badge && (
                        <Badge
                          variant="secondary"
                          className="mb-4 bg-primary/20 text-primary-foreground border-primary/30"
                        >
                          <Zap className="w-3 h-3 mr-1" />
                          {slide.badge}
                        </Badge>
                      )}

                      {/* Discount */}
                      {slide.discount && (
                        <div className="mb-4">
                          <span className="inline-block bg-red-500 text-white px-3 py-1 rounded-full text-lg font-bold">
                            {slide.discount}
                          </span>
                        </div>
                      )}

                      {/* Title & Subtitle */}
                      <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-2 leading-tight">
                        {slide.title}
                      </h1>
                      <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-4 text-yellow-300">
                        {slide.subtitle}
                      </h2>

                      {/* Description */}
                      <p className="text-base sm:text-lg mb-6 text-gray-200 max-w-xl">
                        {slide.description}
                      </p>

                      {/* Features */}
                      {slide.features && (
                        <div className="flex flex-wrap gap-4 mb-6">
                          {slide.features.map((feature, index) => (
                            <div
                              key={index}
                              className="flex items-center text-sm text-gray-200"
                            >
                              <Star className="w-4 h-4 mr-2 text-yellow-400" />
                              {feature}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* CTA Buttons */}
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button
                          size="lg"
                          onClick={() =>
                            handleCTAClick(slide.primaryCTA.action)
                          }
                          className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg font-semibold"
                        >
                          {slide.primaryCTA.text}
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>

                        {slide.secondaryCTA && (
                          <Button
                            variant="outline"
                            size="lg"
                            onClick={() =>
                              slide.secondaryCTA &&
                              handleCTAClick(slide.secondaryCTA.action)
                            }
                            className="border-white  hover:bg-white text-black px-8 py-3 text-lg"
                          >
                            {slide.secondaryCTA.text}
                          </Button>
                        )}
                      </div>

                      {/* Quick Info */}
                      <div className="flex flex-wrap gap-6 mt-6 text-sm text-gray-300">
                        <div className="flex items-center">
                          <Truck className="w-4 h-4 mr-2" />
                          Free Shipping
                        </div>
                        <div className="flex items-center">
                          <ShoppingBag className="w-4 h-4 mr-2" />
                          Easy Returns
                        </div>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 mr-2" />
                          Best Price
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation */}
        <CarouselPrevious className="left-4 bg-white/20 border-white/30 text-white hover:bg-white/30" />
        <CarouselNext className="right-4 bg-white/20 border-white/30 text-white hover:bg-white/30" />

        {/* Dots Indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <div
              key={index}
              className="w-2 h-2 rounded-full bg-white/50 hover:bg-white/80 cursor-pointer transition-all"
            />
          ))}
        </div>
      </Carousel>
    </div>
  );
};

export default HeroBannerSlider;
