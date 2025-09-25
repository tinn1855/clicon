import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageLayout } from '@/components/templates';
import {
  Button,
  Heading1,
  Heading2,
  Card,
  CardContent,
  Badge,
} from '@/components/atoms';
import { ProductCard } from '@/components/molecules';
import { useWishlistStore, useCartStore } from '@/store';
import {
  Heart,
  ShoppingCart,
  Trash2,
  ArrowLeft,
  Share2,
  Filter,
  Grid,
  List,
  Package,
} from 'lucide-react';

export default function WishlistPage() {
  const navigate = useNavigate();
  const { items, removeFromWishlist, clearWishlist } = useWishlistStore();
  const { addToCart } = useCartStore();
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = React.useState<
    'newest' | 'oldest' | 'price-low' | 'price-high'
  >('newest');

  // Sort wishlist items
  const sortedItems = React.useMemo(() => {
    const sorted = [...items];
    switch (sortBy) {
      case 'newest':
        return sorted.sort(
          (a, b) =>
            new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime()
        );
      case 'oldest':
        return sorted.sort(
          (a, b) =>
            new Date(a.addedAt).getTime() - new Date(b.addedAt).getTime()
        );
      case 'price-low':
        return sorted.sort((a, b) => a.product.price - b.product.price);
      case 'price-high':
        return sorted.sort((a, b) => b.product.price - a.product.price);
      default:
        return sorted;
    }
  }, [items, sortBy]);

  const handleAddToCart = (productId: string) => {
    const wishlistItem = items.find((item) => item.productId === productId);
    if (wishlistItem) {
      addToCart(wishlistItem.product, 1);
      // Show success toast could be added here
    }
  };

  const handleRemoveFromWishlist = (productId: string) => {
    removeFromWishlist(productId);
  };

  const handleMoveAllToCart = () => {
    items.forEach((item) => {
      addToCart(item.product, 1);
    });
    clearWishlist();
    navigate('/cart');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Wishlist - Clicon',
        text: `Check out my wishlist with ${items.length} amazing products!`,
        url: window.location.href,
      });
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (items.length === 0) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
              <Heart className="h-12 w-12 text-muted-foreground" />
            </div>
            <Heading2 className="mb-4">Your wishlist is empty</Heading2>
            <p className="text-muted-foreground mb-8">
              Start adding products you love to your wishlist to keep track of
              them.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => navigate('/shop')} size="lg">
                <Package className="mr-2 h-4 w-4" />
                Browse Products
              </Button>
              <Button variant="outline" onClick={() => navigate('/')} size="lg">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="p-2"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <Heading1 className="flex items-center gap-2 text-2xl lg:text-3xl">
                <Heart className="h-6 w-6 lg:h-8 lg:w-8 text-red-500" />
                My Wishlist
              </Heading1>
              <p className="text-muted-foreground mt-1">
                {items.length} {items.length === 1 ? 'item' : 'items'} saved
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full lg:w-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="flex-1 lg:flex-none"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            {items.length > 0 && (
              <Button
                onClick={handleMoveAllToCart}
                size="sm"
                className="flex-1 lg:flex-none"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add All to Cart
              </Button>
            )}
          </div>
        </div>

        {/* Filters and Controls */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) =>
                      setSortBy(
                        e.target.value as
                          | 'newest'
                          | 'oldest'
                          | 'price-low'
                          | 'price-high'
                      )
                    }
                    className="text-sm border rounded px-2 py-1"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">View:</span>
                <div className="flex border rounded overflow-hidden">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-none"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
                {items.length > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearWishlist}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Clear All
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Wishlist Items */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedItems.map((item) => (
              <div key={item.id} className="relative group">
                <ProductCard
                  product={item.product}
                  onAddToCart={() => handleAddToCart(item.productId)}
                  onAddToWishlist={() =>
                    handleRemoveFromWishlist(item.productId)
                  }
                  onQuickView={(product) => navigate(`/product/${product.id}`)}
                  wishlistMode={true}
                />
                <Badge
                  variant="secondary"
                  className="absolute top-2 left-2 text-xs z-10"
                >
                  Added {new Date(item.addedAt).toLocaleDateString()}
                </Badge>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {sortedItems.map((item) => (
              <Card key={item.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="w-full sm:w-24 h-48 sm:h-24 flex-shrink-0">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1 line-clamp-2">
                            {item.product.name}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-2 line-clamp-2">
                            {item.product.description}
                          </p>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xl font-bold text-primary">
                              ${item.product.price.toFixed(2)}
                            </span>
                            {item.product.originalPrice && (
                              <span className="text-muted-foreground line-through">
                                ${item.product.originalPrice.toFixed(2)}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Added on{' '}
                            {new Date(item.addedAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button
                            onClick={() => handleAddToCart(item.productId)}
                            size="sm"
                            className="w-full sm:w-auto"
                          >
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Add to Cart
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() =>
                              handleRemoveFromWishlist(item.productId)
                            }
                            size="sm"
                            className="w-full sm:w-auto text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Bottom Actions */}
        {items.length > 0 && (
          <div className="mt-12 text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => navigate('/shop')}
                variant="outline"
                size="lg"
              >
                Continue Shopping
              </Button>
              <Button onClick={handleMoveAllToCart} size="lg">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Move All to Cart ({items.length} items)
              </Button>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
