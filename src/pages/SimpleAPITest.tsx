import React, { useEffect, useState } from 'react';
import { useProductStore } from '@/store/productStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SimpleAPITest: React.FC = () => {
  const {
    products,
    isLoading,
    categories,
    brands,
    priceRange,
    loadCategories,
    loadBrands,
    loadPriceRange,
    searchProducts,
  } = useProductStore();

  const [testStatus, setTestStatus] = useState('Ready to test');
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    loadCategories();
    loadBrands();
    loadPriceRange();
  }, [loadCategories, loadBrands, loadPriceRange]);

  const runBasicTest = async () => {
    setTestStatus('Testing...');
    try {
      const result = await searchProducts(
        {},
        { field: 'createdAt', order: 'desc' },
        1,
        20
      );
      setTotalProducts(result.pagination.total);
      setTestStatus(`✅ Success! Found ${result.pagination.total} products`);
    } catch (error) {
      setTestStatus(
        `❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Mock API Test</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Total Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totalProducts || 'Not loaded'}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{categories.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Brands</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{brands.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Price Range</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">
                {priceRange
                  ? `$${priceRange.min}-$${priceRange.max}`
                  : 'Loading...'}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <Button onClick={runBasicTest} disabled={isLoading}>
            {isLoading ? 'Testing...' : 'Run Basic Test'}
          </Button>
          <div className="mt-4 p-4 bg-white rounded border">
            <strong>Status:</strong> {testStatus}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Sample Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.slice(0, 6).map((product) => (
              <Card key={product.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">{product.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm space-y-1">
                    <p>
                      <strong>Category:</strong> {product.category}
                    </p>
                    <p>
                      <strong>Brand:</strong> {product.brand}
                    </p>
                    <p>
                      <strong>Price:</strong> ${product.price}
                    </p>
                    <p>
                      <strong>Rating:</strong> {product.rating} ⭐
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleAPITest;
