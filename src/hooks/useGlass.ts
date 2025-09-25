import { useState, useEffect } from 'react';

/**
 * Hook to detect if the browser supports backdrop-filter
 */
export function useBackdropSupport(): boolean {
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    const testElement = document.createElement('div');
    testElement.style.backdropFilter = 'blur(1px)';

    const supported = testElement.style.backdropFilter !== '';
    setIsSupported(supported);
  }, []);

  return isSupported;
}

/**
 * Hook to dynamically apply glass effects based on scroll position
 */
export function useGlassOnScroll(threshold = 50) {
  const [isGlassy, setIsGlassy] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > threshold;
      setIsGlassy(scrolled);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return isGlassy;
}

/**
 * Hook to generate glassmorphism styles dynamically
 */
export function useGlassStyles(options: {
  opacity?: number;
  blur?: number;
  borderOpacity?: number;
  shadowOpacity?: number;
}) {
  const {
    opacity = 0.1,
    blur = 12,
    borderOpacity = 0.2,
    shadowOpacity = 0.37,
  } = options;

  return {
    background: `rgba(255, 255, 255, ${opacity})`,
    backdropFilter: `blur(${blur}px)`,
    WebkitBackdropFilter: `blur(${blur}px)`,
    border: `1px solid rgba(255, 255, 255, ${borderOpacity})`,
    boxShadow: `0 8px 32px 0 rgba(31, 38, 135, ${shadowOpacity})`,
  };
}

/**
 * Hook to create adaptive glass effects based on theme
 */
export function useAdaptiveGlass(isDark?: boolean) {
  const [isDarkTheme, setIsDarkTheme] = useState(isDark ?? false);

  useEffect(() => {
    if (isDark === undefined) {
      // Auto-detect theme if not provided
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      setIsDarkTheme(mediaQuery.matches);

      const handleChange = (e: MediaQueryListEvent) => {
        setIsDarkTheme(e.matches);
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      setIsDarkTheme(isDark);
    }
  }, [isDark]);

  const glassClass = isDarkTheme ? 'glass-dark' : 'glass-light';
  const textClass = isDarkTheme ? 'glass-text-light' : 'glass-text-dark';

  return {
    glassClass,
    textClass,
    isDarkTheme,
    styles: isDarkTheme
      ? {
          background: 'rgba(0, 0, 0, 0.15)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
        }
      : {
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.25)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.2)',
        },
  };
}
