import { useState, useEffect } from 'react';

interface UseScrollDirectionReturn {
  /** Hướng scroll: 'up' | 'down' | null */
  scrollDirection: 'up' | 'down' | null;
  /** Vị trí scroll hiện tại */
  scrollY: number;
  /** Có đang scroll không */
  isScrolling: boolean;
}

/**
 * Hook để detect hướng scroll và vị trí scroll
 * Hữu ích cho hide/show header, animations, etc.
 */
export function useScrollDirection(): UseScrollDirectionReturn {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(
    null
  );
  const [scrollY, setScrollY] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let lastScrollY = window.pageYOffset;
    let scrollTimeout: NodeJS.Timeout;

    const updateScrollDirection = () => {
      const currentScrollY = window.pageYOffset;

      setScrollY(currentScrollY);
      setIsScrolling(true);

      // Clear timeout trước đó
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      // Set timeout để detect khi dừng scroll
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 150);

      // Detect direction chỉ khi scroll đủ xa (tránh jitter)
      const difference = Math.abs(currentScrollY - lastScrollY);
      if (difference > 5) {
        const direction = currentScrollY > lastScrollY ? 'down' : 'up';
        setScrollDirection(direction);
        lastScrollY = currentScrollY;
      }
    };

    window.addEventListener('scroll', updateScrollDirection, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateScrollDirection);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, []);

  return { scrollDirection, scrollY, isScrolling };
}

/**
 * Hook đơn giản để check xem có scroll quá vị trí nào đó không
 */
export function useScrollPast(threshold = 100): boolean {
  const [isPast, setIsPast] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsPast(window.pageYOffset > threshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return isPast;
}
