import React from 'react';
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Truck,
  Shield,
  RotateCcw,
} from 'lucide-react';
import { Logo } from '../atoms/Logo';
import { Button, Input, Separator } from '../atoms';
import { cn } from '@/lib/utils';

interface FooterProps {
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({ className }) => {
  const [email, setEmail] = React.useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  return (
    <footer className={cn('bg-muted/30 border-t', className)}>
      {/* Top Features Section */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Fast & Secure Delivery</h3>
                <p className="text-sm text-muted-foreground">
                  Tell about your service.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Money Back Guarantee</h3>
                <p className="text-sm text-muted-foreground">Within 10 days.</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <RotateCcw className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">24 Hour Return Policy</h3>
                <p className="text-sm text-muted-foreground">
                  No question ask.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Pro Quality Support</h3>
                <p className="text-sm text-muted-foreground">
                  24/7 Live support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Logo size="md" />
            <p className="text-sm text-muted-foreground max-w-xs">
              Clicon is a premium ecommerce platform that offers the best
              products at competitive prices with excellent customer service.
            </p>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+1-202-555-0104</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>info@clicon.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Lincoln- 344, Illinois, Chicago, USA</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Top Category</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/categories/computer-laptop"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Computer & Laptop
                </a>
              </li>
              <li>
                <a
                  href="/categories/smartphone"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  SmartPhone
                </a>
              </li>
              <li>
                <a
                  href="/categories/headphone"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Headphone
                </a>
              </li>
              <li>
                <a
                  href="/categories/accessories"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Accessories
                </a>
              </li>
              <li>
                <a
                  href="/categories/camera-photo"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Camera & Photo
                </a>
              </li>
              <li>
                <a
                  href="/categories/tv-homes"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  TV & Homes
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div className="space-y-4">
            <h3 className="font-semibold">Quick links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/shop"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Shop Product
                </a>
              </li>
              <li>
                <a
                  href="/cart"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Shopping Cart
                </a>
              </li>
              <li>
                <a
                  href="/wishlist"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Wishlist
                </a>
              </li>
              <li>
                <a
                  href="/compare"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Compare
                </a>
              </li>
              <li>
                <a
                  href="/track-order"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Track Order
                </a>
              </li>
              <li>
                <a
                  href="/help"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Customer Help
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="font-semibold">Download App</h3>
            <p className="text-sm text-muted-foreground">
              Get 10% off your first order
            </p>

            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <div className="flex">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-r-none"
                  required
                />
                <Button type="submit" className="rounded-l-none">
                  Subscribe
                </Button>
              </div>
            </form>

            <div className="space-y-3">
              <p className="text-sm font-medium">Follow Us</p>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                  <Instagram className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                  <Youtube className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Bottom Footer */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 Clicon. All Rights Reserved.
          </p>

          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">We Accept:</span>
            <div className="flex items-center gap-2">
              <div className="h-6 w-10 bg-muted rounded border flex items-center justify-center text-xs font-bold">
                VISA
              </div>
              <div className="h-6 w-10 bg-muted rounded border flex items-center justify-center text-xs font-bold">
                MC
              </div>
              <div className="h-6 w-10 bg-muted rounded border flex items-center justify-center text-xs font-bold">
                AMEX
              </div>
              <div className="h-6 w-10 bg-muted rounded border flex items-center justify-center text-xs font-bold">
                PP
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
