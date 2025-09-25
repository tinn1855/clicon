import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Hook để scroll lên top khi route thay đổi
 * Sử dụng trong App component hoặc layout component
 */
export function useScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll lên top với smooth behavior
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [pathname]);
}

/**
 * Hook để scroll lên top ngay lập tức (không smooth)
 * Hữu ích cho các trang cần load nhanh
 */
export function useScrollToTopInstant() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll lên top ngay lập tức
    window.scrollTo(0, 0);
  }, [pathname]);
}

/**
 * Hook để scroll lên top với delay (chờ content load xong)
 * Hữu ích cho các trang có lazy loading
 */
export function useScrollToTopDelayed(delay = 100) {
  const { pathname } = useLocation();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [pathname, delay]);
}
