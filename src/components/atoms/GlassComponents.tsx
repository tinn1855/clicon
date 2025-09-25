import React from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const glassVariants = cva(
  'relative backdrop-blur-sm border rounded-lg transition-all duration-300',
  {
    variants: {
      variant: {
        default: 'glass',
        light: 'glass-light',
        medium: 'glass-medium',
        strong: 'glass-strong',
        dark: 'glass-dark',
        primary: 'glass-primary',
        secondary: 'glass-secondary',
        frosted: 'glass-frosted',
        'gradient-border': 'glass-gradient-border',
      },
      interactive: {
        true: 'glass-hover cursor-pointer',
        false: '',
      },
      animated: {
        pulse: 'glass-pulse',
        shimmer: 'glass-shimmer',
        none: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      interactive: false,
      animated: 'none',
    },
  }
);

export interface GlassCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof glassVariants> {
  children: React.ReactNode;
}

/**
 * Glass Card Component with glassmorphism effect
 *
 * @example
 * <GlassCard variant="light" interactive>
 *   <h3>Glass Content</h3>
 * </GlassCard>
 */
export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant, interactive, animated, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          glassVariants({ variant, interactive, animated, className })
        )}
        {...props}
      >
        <div className="glass-content relative z-10">{children}</div>
      </div>
    );
  }
);
GlassCard.displayName = 'GlassCard';

export interface GlassButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof glassVariants> {
  children: React.ReactNode;
}

/**
 * Glass Button Component with glassmorphism effect
 */
export const GlassButton = React.forwardRef<
  HTMLButtonElement,
  GlassButtonProps
>(({ className, variant, children, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        glassVariants({ variant, interactive: true, className }),
        'px-4 py-2 font-medium glass-text-light hover:glass-text-light focus:outline-none focus:ring-2 focus:ring-white/25'
      )}
      {...props}
    >
      <span className="glass-content relative z-10">{children}</span>
    </button>
  );
});
GlassButton.displayName = 'GlassButton';

export interface GlassInputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof glassVariants> {}

/**
 * Glass Input Component with glassmorphism effect
 */
export const GlassInput = React.forwardRef<HTMLInputElement, GlassInputProps>(
  ({ className, variant, type, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          glassVariants({ variant, className }),
          'px-4 py-2 w-full glass-text placeholder:glass-text-light/70 focus:outline-none focus:ring-2 focus:ring-white/25'
        )}
        {...props}
      />
    );
  }
);
GlassInput.displayName = 'GlassInput';

export interface GlassModalProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof glassVariants> {
  children: React.ReactNode;
  isOpen: boolean;
  onClose?: () => void;
}

/**
 * Glass Modal Component with glassmorphism backdrop
 */
export const GlassModal = React.forwardRef<HTMLDivElement, GlassModalProps>(
  ({ className, variant, children, isOpen, onClose, ...props }, ref) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <div className="absolute inset-0 glass-dark" onClick={onClose} />

        {/* Modal Content */}
        <div
          ref={ref}
          className={cn(
            glassVariants({ variant, className }),
            'relative z-10 max-w-lg w-full max-h-[90vh] overflow-y-auto'
          )}
          {...props}
        >
          <div className="glass-content relative z-10 p-6">{children}</div>
        </div>
      </div>
    );
  }
);
GlassModal.displayName = 'GlassModal';

export interface GlassNavigationProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof glassVariants> {
  children: React.ReactNode;
}

/**
 * Glass Navigation Component for headers/navbars
 */
export const GlassNavigation = React.forwardRef<
  HTMLElement,
  GlassNavigationProps
>(({ className, variant, children, ...props }, ref) => {
  return (
    <nav
      ref={ref}
      className={cn(
        glassVariants({ variant, className }),
        'sticky top-0 z-40 w-full'
      )}
      {...props}
    >
      <div className="glass-content relative z-10">{children}</div>
    </nav>
  );
});
GlassNavigation.displayName = 'GlassNavigation';
