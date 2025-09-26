import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/atoms';
import { Badge } from '@/components/ui/badge';
import { Star, Quote, ShoppingBag, Users } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  location: string;
  rating: number;
  comment: string;
  productPurchased?: string;
  verifiedBuyer: boolean;
  purchaseDate: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    avatar:
      'https://images.unsplash.com/photo-1494790108755-2616b612b5e1?w=150&h=150&fit=crop&crop=face',
    location: 'New York, USA',
    rating: 5,
    comment:
      "Amazing quality products and super fast delivery! I've been shopping here for over a year now and never been disappointed. The customer service is exceptional.",
    productPurchased: 'iPhone 15 Pro',
    verifiedBuyer: true,
    purchaseDate: '2024-01-15',
  },
  {
    id: '2',
    name: 'Michael Chen',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    location: 'San Francisco, USA',
    rating: 5,
    comment:
      'The best online electronics store! Great prices, authentic products, and excellent packaging. My gaming setup is complete thanks to their amazing selection.',
    productPurchased: 'Gaming Mechanical Keyboard',
    verifiedBuyer: true,
    purchaseDate: '2024-02-28',
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    location: 'Los Angeles, USA',
    rating: 5,
    comment:
      'Outstanding experience from start to finish. The website is easy to navigate, checkout is smooth, and they have the latest tech at competitive prices.',
    productPurchased: 'MacBook Air M2',
    verifiedBuyer: true,
    purchaseDate: '2024-03-10',
  },
  {
    id: '4',
    name: 'David Park',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    location: 'Seattle, USA',
    rating: 4,
    comment:
      'Reliable service and quality products. I particularly love their extended warranty options and hassle-free return policy. Highly recommended!',
    productPurchased: 'Wireless Headphones',
    verifiedBuyer: true,
    purchaseDate: '2024-01-20',
  },
  {
    id: '5',
    name: 'Lisa Thompson',
    avatar:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    location: 'Chicago, USA',
    rating: 5,
    comment:
      'Fantastic customer support and lightning-fast shipping! I ordered a laptop late Friday night and received it Monday morning. Incredible service!',
    productPurchased: 'Dell XPS 13',
    verifiedBuyer: true,
    purchaseDate: '2024-02-05',
  },
];

interface TestimonialsSliderProps {
  className?: string;
  title?: string;
}

export const TestimonialsSlider: React.FC<TestimonialsSliderProps> = ({
  className = '',
  title = 'What Our Customers Say',
}) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Section Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="p-3 rounded-full bg-blue-100">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
          {title}
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Don't just take our word for it - see what our satisfied customers
          have to say about their shopping experience.
        </p>
        <div className="flex items-center justify-center mt-4 space-x-4">
          <div className="flex items-center">
            <div className="flex">{renderStars(5)}</div>
            <span className="ml-2 text-sm font-medium text-gray-600">
              4.8/5
            </span>
          </div>
          <span className="text-gray-400">•</span>
          <span className="text-sm text-gray-600">10,000+ Reviews</span>
        </div>
      </div>

      {/* Testimonials Carousel */}
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full max-w-6xl mx-auto"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {testimonials.map((testimonial) => (
            <CarouselItem
              key={testimonial.id}
              className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3"
            >
              <Card className="h-full bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  {/* Quote Icon */}
                  <div className="flex justify-between items-start mb-4">
                    <Quote className="h-8 w-8 text-blue-200" />
                    {testimonial.verifiedBuyer && (
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-700"
                      >
                        <ShoppingBag className="w-3 h-3 mr-1" />
                        Verified Buyer
                      </Badge>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    <div className="flex">
                      {renderStars(testimonial.rating)}
                    </div>
                    <span className="ml-2 text-sm font-medium text-gray-600">
                      {testimonial.rating}.0
                    </span>
                  </div>

                  {/* Comment */}
                  <blockquote className="text-gray-700 mb-6 leading-relaxed">
                    "{testimonial.comment}"
                  </blockquote>

                  {/* Product Info */}
                  {testimonial.productPurchased && (
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">
                        <strong>Product:</strong> {testimonial.productPurchased}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Purchased on{' '}
                        {new Date(
                          testimonial.purchaseDate
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  )}

                  {/* Customer Info */}
                  <div className="flex items-center">
                    <div className="h-12 w-12 mr-4 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                      <div className="hidden h-full w-full bg-blue-500 items-center justify-center text-white font-semibold">
                        {testimonial.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-0 -translate-x-4 bg-white shadow-md border" />
        <CarouselNext className="right-0 translate-x-4 bg-white shadow-md border" />
      </Carousel>

      {/* Trust Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">10K+</div>
          <p className="text-gray-600">Happy Customers</p>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">99.5%</div>
          <p className="text-gray-600">Satisfaction Rate</p>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
          <p className="text-gray-600">Customer Support</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSlider;
