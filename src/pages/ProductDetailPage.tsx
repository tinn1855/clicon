import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageLayout } from '@/components/templates';
import {
  ProductGallery,
  ProductCard,
  ProductOptions,
} from '@/components/molecules';
import {
  Heading2,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Button,
  Card,
  CardContent,
  Badge,
} from '@/components/atoms';
import { StarRating } from '@/components/atoms/StarRating';
import { ArrowLeft } from 'lucide-react';
import { useCartStore, useWishlistStore } from '@/store';
import { useProductStore } from '@/store/productStore';
import { useToast } from '@/hooks/use-enhanced-toast';
import { Product } from '@/types';
import { getUniqueProductImages } from '@/utils/imageUtils';

// Mock reviews for now - in real app, this would come from API
const mockReviews = [
  {
    id: '1',
    userName: 'John D.',
    rating: 5,
    comment:
      'Excellent product! Very responsive and comfortable to use for long sessions.',
    date: '2024-01-15',
    verified: true,
  },
  {
    id: '2',
    userName: 'Sarah M.',
    rating: 4,
    comment:
      'Great product overall, love the features. Could be a bit lighter but still very good.',
    date: '2024-01-10',
    verified: true,
  },
  {
    id: '3',
    userName: 'Mike R.',
    rating: 5,
    comment:
      'Perfect for competitive use. The precision is amazing and battery life is excellent.',
    date: '2024-01-05',
    verified: false,
  },
];

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addToCart } = useCartStore();
  const { addToWishlist, removeFromWishlist, isInWishlist } =
    useWishlistStore();
  const { getProductById, getRelatedProducts } = useProductStore();

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity] = useState(1);
  const [extendedImages, setExtendedImages] = useState<string[]>([]);

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;

      setIsLoading(true);
      try {
        const productData = await getProductById(id);
        if (productData) {
          setProduct(productData);

          // Generate additional images for better gallery experience
          const additionalImages = getUniqueProductImages(
            id,
            productData.category,
            8
          );
          const allImages = [
            ...productData.images,
            ...additionalImages.slice(productData.images.length),
          ];
          setExtendedImages(allImages);

          // Load related products
          const related = await getRelatedProducts(id, 4);
          setRelatedProducts(related);
        } else {
          toast.error({
            title: 'Product not found',
            description: "The product you're looking for doesn't exist.",
          });
          navigate('/shop');
        }
      } catch (error) {
        console.error('Error loading product:', error);
        toast.error({
          title: 'Error loading product',
          description: 'Please try again later.',
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [id, getProductById, getRelatedProducts, navigate, toast]);

  const handleAddToCart = (qty = quantity) => {
    if (!product) return;

    addToCart(product, qty);

    toast.success({
      title: 'Added to cart',
      description: `${qty}x ${product.name} added to your cart.`,
    });
  };

  const handleWishlistToggle = () => {
    if (!product) return;

    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast.error({
        title: 'Removed from wishlist',
        description: `${product.name} removed from your wishlist.`,
      });
    } else {
      addToWishlist(product);
      toast.success({
        title: 'Added to wishlist',
        description: `${product.name} added to your wishlist.`,
      });
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-6">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
              <div className="aspect-square bg-gray-200 rounded-lg"></div>
              <div className="space-y-6">
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-12 bg-gray-200 rounded w-1/3"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }

  if (!product) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Product not found
          </h1>
          <Button onClick={handleGoBack}>Go Back</Button>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-6">
        {/* Back Button */}
        <Button variant="ghost" onClick={handleGoBack} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        {/* Product Detail Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {/* Product Gallery */}
          <ProductGallery
            images={extendedImages.length > 0 ? extendedImages : product.images}
            productName={product.name}
          />

          {/* Enhanced Product Info */}
          <div className="space-y-6">
            {/* Product Header */}
            <div>
              {/* Product Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="category" className="text-sm">
                  {product.category}
                </Badge>
                {!product.inStock && (
                  <Badge variant="destructive">Out of Stock</Badge>
                )}
                {product.tags.includes('new') && (
                  <Badge variant="new">New Arrival</Badge>
                )}
                {product.tags.includes('featured') && (
                  <Badge variant="featured">Featured</Badge>
                )}
                {product.tags.includes('bestseller') && (
                  <Badge variant="success">Best Seller</Badge>
                )}
                {product.originalPrice &&
                  product.originalPrice > product.price && (
                    <Badge variant="sale">
                      {Math.round(
                        ((product.originalPrice - product.price) /
                          product.originalPrice) *
                          100
                      )}
                      % OFF
                    </Badge>
                  )}
              </div>

              <h1 className="text-4xl font-bold text-gray-900 mb-3 leading-tight">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 mb-6">
                <StarRating rating={product.rating} size="sm" />
                <span className="text-sm text-gray-600">
                  ({product.reviewCount} reviews)
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed text-lg">
                {product.description}
              </p>
            </div>

            {/* Product Options Component */}
            <ProductOptions
              product={product}
              onAddToCart={(qty) => handleAddToCart(qty)}
              onAddToWishlist={() => handleWishlistToggle()}
              isInWishlist={isInWishlist(product.id)}
            />

            {/* Key Specifications Preview */}
            {product.specifications && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold mb-3 text-gray-900">
                  Key Features
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {Object.entries(product.specifications)
                    .slice(0, 4)
                    .map(([key, value]) => (
                      <div key={key} className="flex justify-between text-sm">
                        <span className="text-gray-600">{key}:</span>
                        <span className="font-medium text-gray-900">
                          {value}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mb-12">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="prose max-w-none">
                    <p className="text-gray-700 leading-relaxed">
                      {product.description}
                    </p>
                    <div className="mt-6">
                      <h4 className="font-semibold mb-2">
                        Product Highlights:
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        <li>Premium quality materials and construction</li>
                        <li>Designed for optimal performance and durability</li>
                        <li>Backed by manufacturer warranty</li>
                        <li>Compatible with standard accessories</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  {product.specifications ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(product.specifications).map(
                        ([key, value]) => (
                          <div
                            key={key}
                            className="flex justify-between items-center py-3 border-b border-gray-200 last:border-b-0"
                          >
                            <span className="font-medium text-gray-900">
                              {key}:
                            </span>
                            <span className="text-gray-700">{value}</span>
                          </div>
                        )
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-500">
                      No detailed specifications available for this product.
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {mockReviews.map((review) => (
                      <div
                        key={review.id}
                        className="border-b border-gray-200 pb-6 last:border-b-0"
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-medium">{review.userName}</h4>
                              {review.verified && (
                                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                  Verified Purchase
                                </span>
                              )}
                            </div>
                            <StarRating rating={review.rating} size="sm" />
                            <p className="text-gray-700 mt-3">
                              {review.comment}
                            </p>
                            <p className="text-sm text-gray-500 mt-2">
                              {review.date}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <Heading2 className="mb-6">You might also like</Heading2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default ProductDetailPage;
