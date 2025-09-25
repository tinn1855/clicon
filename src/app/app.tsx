import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { ScrollToTopButton } from '@/components/molecules/ScrollToTopButton';

// Pages - Will create these next
const HomePage = React.lazy(() => import('../pages/HomePage'));
const ShopPage = React.lazy(() => import('../pages/ShopPage'));
const ProductDetailPage = React.lazy(
  () => import('../pages/ProductDetailPage')
);
const CartPage = React.lazy(() => import('../pages/CartPage'));
const CheckoutPage = React.lazy(() => import('../pages/CheckoutPage'));
const SignInPage = React.lazy(() => import('../pages/SignInPage'));
const SignUpPage = React.lazy(() => import('../pages/SignUpPage'));
const ForgotPasswordPage = React.lazy(
  () => import('../pages/ForgotPasswordPage')
);
const TrackOrderPage = React.lazy(() => import('../pages/TrackOrderPage'));
const AboutPage = React.lazy(() => import('../pages/AboutPage'));
const ContactPage = React.lazy(() => import('../pages/ContactPage'));
const WishlistPage = React.lazy(() => import('../pages/WishlistPage'));

export function App() {
  // Hook để scroll lên top khi chuyển trang
  useScrollToTop();

  return (
    <>
      <React.Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        }
      >
        <Routes>
          {/* Main Pages */}
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />

          {/* Shopping Flow */}
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/track-order" element={<TrackOrderPage />} />

          {/* Authentication */}
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />

          {/* Catch all route - 404 */}
          <Route
            path="*"
            element={
              <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                  <h1 className="text-4xl font-bold mb-4">404</h1>
                  <p className="text-muted-foreground">Page not found</p>
                </div>
              </div>
            }
          />
        </Routes>
      </React.Suspense>

      <Toaster />
      <ScrollToTopButton />
    </>
  );
}

export default App;
