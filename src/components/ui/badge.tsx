import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80',
        outline: 'text-foreground',
        // Ecommerce specific variants
        sale: 'border-transparent bg-red-500 text-white shadow hover:bg-red-600',
        new: 'border-transparent bg-green-500 text-white shadow hover:bg-green-600',
        featured:
          'border-transparent bg-blue-500 text-white shadow hover:bg-blue-600',
        discount:
          'border-transparent bg-orange-500 text-white shadow hover:bg-orange-600',
        category: 'border-gray-200 bg-gray-100 text-gray-800 hover:bg-gray-200',
        success:
          'border-transparent bg-emerald-500 text-white shadow hover:bg-emerald-600',
        warning:
          'border-transparent bg-yellow-500 text-white shadow hover:bg-yellow-600',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
