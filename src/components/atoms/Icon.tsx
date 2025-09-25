import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';

interface IconProps {
  icon: React.ComponentType<{ className?: string }>;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  asChild?: boolean;
}

const iconSizes = {
  xs: 'h-3 w-3',
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
  xl: 'h-8 w-8',
};

export const Icon: React.FC<IconProps> = ({
  icon: IconComponent,
  size = 'md',
  className,
  asChild = false,
  ...props
}) => {
  const Comp = asChild ? Slot : 'span';

  return (
    <Comp
      className={cn('inline-flex items-center justify-center', className)}
      {...props}
    >
      <IconComponent className={cn(iconSizes[size], 'shrink-0')} />
    </Comp>
  );
};
