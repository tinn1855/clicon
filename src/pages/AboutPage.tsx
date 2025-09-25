import React from 'react';
import { PageLayout } from '@/components/templates';
import {
  Button,
  Heading1,
  Heading2,
  Heading3,
  Card,
  CardContent,
} from '@/components/atoms';
import {
  Users,
  Target,
  Award,
  Heart,
  Globe,
  Truck,
  Shield,
  HeadphonesIcon,
  CheckCircle,
  Star,
} from 'lucide-react';

const teamMembers = [
  {
    id: 1,
    name: 'John Smith',
    role: 'CEO & Founder',
    image:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
    bio: 'Passionate about bringing the best technology to everyone.',
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    role: 'Head of Product',
    image:
      'https://images.unsplash.com/photo-1494790108755-2616b612b8f5?w=300&h=300&fit=crop&crop=face',
    bio: 'Expert in product strategy and user experience design.',
  },
  {
    id: 3,
    name: 'Mike Chen',
    role: 'Tech Lead',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
    bio: 'Leading our technical innovation and development.',
  },
  {
    id: 4,
    name: 'Emily Davis',
    role: 'Customer Success',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
    bio: 'Ensuring every customer has an amazing experience.',
  },
];

const stats = [
  { label: 'Happy Customers', value: '50K+', icon: Users },
  { label: 'Products Sold', value: '200K+', icon: Award },
  { label: 'Countries Served', value: '25+', icon: Globe },
  { label: 'Years Experience', value: '10+', icon: Star },
];

const values = [
  {
    icon: Target,
    title: 'Innovation',
    description:
      'We constantly push boundaries to bring you the latest and greatest technology products.',
  },
  {
    icon: Heart,
    title: 'Customer First',
    description:
      'Your satisfaction is our top priority. We go above and beyond to exceed expectations.',
  },
  {
    icon: CheckCircle,
    title: 'Quality',
    description:
      'We carefully curate every product to ensure it meets our high standards of excellence.',
  },
  {
    icon: Shield,
    title: 'Trust',
    description:
      "Built on transparency, reliability, and a commitment to doing what's right.",
  },
];

export default function AboutPage() {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="container mx-auto px-4 py-12 lg:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <Heading1 className="text-white mb-6 text-3xl lg:text-5xl">
              About Clicon
            </Heading1>
            <p className="text-lg lg:text-xl text-white/90 leading-relaxed">
              We're passionate about connecting people with the technology that
              enhances their lives. Since 2014, we've been your trusted partner
              in discovering amazing products at unbeatable prices.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Heading2 className="mb-6 text-2xl lg:text-3xl">
                Our Story
              </Heading2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  What started as a small tech enthusiast's dream has grown into
                  a global marketplace serving millions of customers worldwide.
                  Our journey began with a simple mission: make cutting-edge
                  technology accessible to everyone.
                </p>
                <p>
                  From our humble beginnings in a garage to becoming a leading
                  e-commerce platform, we've never lost sight of what matters
                  most - our customers and the communities we serve.
                </p>
                <p>
                  Today, we're proud to offer over 100,000 products from trusted
                  brands, backed by our commitment to quality, affordability,
                  and exceptional service.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop"
                alt="Our team working together"
                className="rounded-lg shadow-lg w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 lg:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="text-2xl lg:text-3xl font-bold mb-2">
                  {stat.value}
                </div>
                <div className="text-sm lg:text-base text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Heading2 className="mb-4 text-2xl lg:text-3xl">
              Our Values
            </Heading2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do and shape our
              commitment to you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <Heading3 className="mb-3 text-lg">{value.title}</Heading3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 lg:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Heading2 className="mb-4 text-2xl lg:text-3xl">
              Meet Our Team
            </Heading2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The passionate people behind Clicon who work tirelessly to bring
              you the best experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <Card
                key={member.id}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <CardContent className="p-6 text-center">
                  <Heading3 className="mb-1 text-lg">{member.name}</Heading3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Heading2 className="mb-4 text-2xl lg:text-3xl">
              Why Choose Clicon?
            </Heading2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Here's what makes us different and why thousands of customers
              trust us daily
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <Truck className="h-8 w-8 text-green-600" />
              </div>
              <Heading3 className="text-lg">Fast & Free Shipping</Heading3>
              <p className="text-muted-foreground">
                Free shipping on orders over $50. Express delivery available for
                urgent needs.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <Heading3 className="text-lg">Secure Payments</Heading3>
              <p className="text-muted-foreground">
                Your data is protected with bank-level security. Multiple
                payment options available.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                <HeadphonesIcon className="h-8 w-8 text-purple-600" />
              </div>
              <Heading3 className="text-lg">24/7 Support</Heading3>
              <p className="text-muted-foreground">
                Our dedicated support team is always here to help you with any
                questions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 lg:py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <Heading2 className="text-white mb-4 text-2xl lg:text-3xl">
            Ready to Start Shopping?
          </Heading2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Join millions of satisfied customers and discover amazing products
            at unbeatable prices.
          </p>
          <Button size="lg" variant="secondary">
            Browse Products
          </Button>
        </div>
      </section>
    </PageLayout>
  );
}
