import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, User, Search, MapPin, Phone, ChevronDown } from 'lucide-react';
import { Logo } from '../atoms/Logo';
import { SearchBar } from '@/components/molecules';
import { WishlistQuickView, CartQuickView } from '@/components/molecules';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../atoms';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store';

interface HeaderProps {
  className?: string;
}

const categories = [
  'Electronics',
  'Fashion',
  'Home & Garden',
  'Sports',
  'Books',
  'Health & Beauty',
  'Automotive',
  'Toys & Games',
];

export const Header: React.FC<HeaderProps> = ({ className }) => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate('/signin');
  };

  const handleSearch = (query: string) => {
    if (query.trim()) {
      navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
    } else {
      navigate('/shop');
    }
    // Close mobile search after searching
    setIsMobileSearchOpen(false);
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <header className={cn('border-b bg-background', className)}>
      {/* Top Bar - Hidden on mobile */}
      <div className="border-b bg-muted/30 hidden lg:block">
        <div className="container mx-auto px-4">
          <div className="flex h-10 items-center justify-between text-sm">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span className="text-muted-foreground">
                  Store Location: Lincoln- 344, Illinois, Chicago, USA
                </span>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">
                  Need help? Call Us:
                </span>
                <div className="flex items-center gap-1">
                  <Phone className="h-4 w-4" />
                  <span className="font-medium">+1-202-555-0104</span>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-auto p-0">
                    English <ChevronDown className="ml-1 h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>English</DropdownMenuItem>
                  <DropdownMenuItem>Vietnamese</DropdownMenuItem>
                  <DropdownMenuItem>Spanish</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex h-14 sm:h-16 items-center justify-between">
          {/* Mobile Menu + Logo */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>

            <Logo size="sm" className="sm:mr-4 lg:mr-8" />
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
            <SearchBar
              placeholder="Search for anything..."
              className="w-full"
              onSearch={handleSearch}
            />
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search - Mobile */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden p-2"
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* User Account */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2 px-2 sm:px-3"
                >
                  <User className="h-4 w-4 sm:h-5 sm:w-5" />
                  <div className="hidden sm:block text-left">
                    <div className="text-xs text-muted-foreground">Account</div>
                    <div className="text-sm font-medium">
                      {isAuthenticated ? user?.firstName : 'Sign In'}
                    </div>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {isAuthenticated ? (
                  <>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Orders</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>
                      Sign Out
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem onClick={handleSignIn}>
                      Sign In
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleSignUp}>
                      Create Account
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Wishlist */}
            <WishlistQuickView className="relative px-2 sm:px-3" />

            {/* Shopping Cart Quick View */}
            <CartQuickView className="px-2 sm:px-3" />
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isMobileSearchOpen && (
        <div className="lg:hidden border-t bg-muted/20">
          <div className="container mx-auto px-4 py-3">
            <SearchBar
              placeholder="Search products..."
              className="w-full"
              onSearch={handleSearch}
            />
          </div>
        </div>
      )}

      {/* Navigation Bar */}
      <div className="border-t hidden lg:block">
        <div className="container mx-auto px-4">
          <div className="flex h-12 items-center justify-between">
            {/* Categories Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <Menu className="h-4 w-4" />
                  All Categories
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                {categories.map((category) => (
                  <DropdownMenuItem key={category}>{category}</DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Main Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link
                to="/"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Home
              </Link>
              <Link
                to="/shop"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Shop
              </Link>
              <Link
                to="/deals"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Deals
              </Link>
              <Link
                to="/about"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Contact
              </Link>
            </nav>

            {/* Contact Info */}
            <div className="hidden lg:flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4" />
              <span>+1-202-555-0104</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t bg-background">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-sm font-medium hover:text-primary transition-colors py-2 border-b"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/shop"
                className="text-sm font-medium hover:text-primary transition-colors py-2 border-b"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Shop
              </Link>
              <Link
                to="/deals"
                className="text-sm font-medium hover:text-primary transition-colors py-2 border-b"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Deals
              </Link>
              <Link
                to="/about"
                className="text-sm font-medium hover:text-primary transition-colors py-2 border-b"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-sm font-medium hover:text-primary transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>

              {/* Mobile Categories */}
              <div className="pt-4">
                <h3 className="text-sm font-semibold mb-2">Categories</h3>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((category) => (
                    <Link
                      key={category}
                      to={`/category/${category.toLowerCase()}`}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors py-1"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};
