import React, { useEffect, useState } from 'react';
import { useProductStore } from '@/store/productStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TestResult {
  success: boolean;
  [key: string]: unknown;
}

interface TestResults {
  [testName: string]: TestResult;
}

const APITestPage: React.FC = () => {
  const {
    products,
    isLoading,
    categories,
    brands,
    priceRange,
    loadFeaturedProducts,
    loadCategories,
    loadBrands,
    loadPriceRange,
    searchProducts,
    getBestsellers,
    getNewArrivals,
    getSaleProducts,
    getSearchSuggestions,
  } = useProductStore();

  const [testResults, setTestResults] = useState<
    TestResults | { error: string }
  >({});

  useEffect(() => {
    // Load initial data
    loadCategories();
    loadBrands();
    loadPriceRange();
    loadFeaturedProducts();
  }, [loadCategories, loadBrands, loadPriceRange, loadFeaturedProducts]);

  const runAPITests = async () => {
    console.log('🚀 Starting API Tests...');
    const results: any = {};

    try {
      // Test 1: Basic search
      console.log('Test 1: Basic search...');
      const searchResult = await searchProducts(
        {},
        { field: 'createdAt', order: 'desc' },
        1,
        10
      );
      results.searchTest = {
        success: true,
        totalProducts: searchResult.pagination.total,
        returnedProducts: searchResult.data.length,
      };

      // Test 2: Category filter
      console.log('Test 2: Category filter...');
      const categoryResult = await searchProducts(
        { category: 'Keyboards' },
        { field: 'rating', order: 'desc' }
      );
      results.categoryTest = {
        success: true,
        keyboardProducts: categoryResult.data.length,
        firstProduct: categoryResult.data[0]?.name || 'None',
      };

      // Test 3: Price range filter
      console.log('Test 3: Price range filter...');
      const priceResult = await searchProducts({
        minPrice: 100,
        maxPrice: 500,
      });
      results.priceTest = {
        success: true,
        productsInRange: priceResult.data.length,
        avgPrice:
          priceResult.data.reduce((sum, p) => sum + p.price, 0) /
          priceResult.data.length,
      };

      // Test 4: Text search
      console.log('Test 4: Text search...');
      const textResult = await searchProducts({ search: 'gaming' });
      results.textSearchTest = {
        success: true,
        gamingProducts: textResult.data.length,
        sampleProducts: textResult.data.slice(0, 3).map((p) => p.name),
      };

      // Test 5: Bestsellers
      console.log('Test 5: Bestsellers...');
      const bestsellers = await getBestsellers(5);
      results.bestsellersTest = {
        success: true,
        count: bestsellers.length,
        topBestseller: bestsellers[0]?.name || 'None',
      };

      // Test 6: New arrivals
      console.log('Test 6: New arrivals...');
      const newArrivals = await getNewArrivals(5);
      results.newArrivalsTest = {
        success: true,
        count: newArrivals.length,
        newest: newArrivals[0]?.name || 'None',
      };

      // Test 7: Sale products
      console.log('Test 7: Sale products...');
      const saleProducts = await getSaleProducts(5);
      results.saleTest = {
        success: true,
        count: saleProducts.length,
        biggestDiscount: saleProducts[0]
          ? `${Math.round(
              ((saleProducts[0].originalPrice! - saleProducts[0].price) /
                saleProducts[0].originalPrice!) *
                100
            )}%`
          : 'None',
      };

      // Test 8: Search suggestions
      console.log('Test 8: Search suggestions...');
      const suggestions = await getSearchSuggestions('key', 5);
      results.suggestionsTest = {
        success: true,
        count: suggestions.length,
        suggestions: suggestions,
      };

      setTestResults(results);
      console.log('✅ All tests completed!', results);
    } catch (error) {
      console.error('❌ Test failed:', error);
      setTestResults({ error: error.message });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Mock API Test Dashboard
          </h1>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="glass-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Total Products
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {testResults.searchTest?.totalProducts || 'Loading...'}
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Categories
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{categories.length}</div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Brands
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{brands.length}</div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Price Range
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold">
                  {priceRange
                    ? `$${priceRange.min} - $${priceRange.max}`
                    : 'Loading...'}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Test Controls */}
          <div className="mb-8">
            <Button onClick={runAPITests} className="mr-4" disabled={isLoading}>
              {isLoading ? 'Running Tests...' : 'Run API Tests'}
            </Button>
          </div>

          {/* Test Results */}
          {Object.keys(testResults).length > 0 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Test Results</h2>

              {testResults.error ? (
                <Card className="border-red-200 bg-red-50">
                  <CardHeader>
                    <CardTitle className="text-red-800">Test Failed</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-red-700">{testResults.error}</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(testResults).map(
                    ([testName, result]: [string, any]) => (
                      <Card key={testName} className="glass-card">
                        <CardHeader>
                          <CardTitle className="text-lg capitalize">
                            {testName
                              .replace(/([A-Z])/g, ' $1')
                              .replace(/^./, (str) => str.toUpperCase())}
                            {result.success ? ' ✅' : ' ❌'}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                            {JSON.stringify(result, null, 2)}
                          </pre>
                        </CardContent>
                      </Card>
                    )
                  )}
                </div>
              )}
            </div>
          )}

          {/* Sample Data */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Current Product Sample
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.slice(0, 6).map((product) => (
                <Card key={product.id} className="glass-card">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      {product.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1 text-sm">
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
                      <p>
                        <strong>Stock:</strong> {product.inStock ? '✅' : '❌'}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APITestPage;
