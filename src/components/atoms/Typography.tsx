import React from 'react';
import { cn } from '@/lib/utils';

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export const Heading1: React.FC<TypographyProps> = ({
  children,
  className,
  as: Component = 'h1',
}) => (
  <Component
    className={cn('text-4xl font-bold tracking-tight lg:text-5xl', className)}
  >
    {children}
  </Component>
);

export const Heading2: React.FC<TypographyProps> = ({
  children,
  className,
  as: Component = 'h2',
}) => (
  <Component className={cn('text-3xl font-semibold tracking-tight', className)}>
    {children}
  </Component>
);

export const Heading3: React.FC<TypographyProps> = ({
  children,
  className,
  as: Component = 'h3',
}) => (
  <Component className={cn('text-2xl font-semibold tracking-tight', className)}>
    {children}
  </Component>
);

export const Heading4: React.FC<TypographyProps> = ({
  children,
  className,
  as: Component = 'h4',
}) => (
  <Component className={cn('text-xl font-semibold tracking-tight', className)}>
    {children}
  </Component>
);

export const Heading5: React.FC<TypographyProps> = ({
  children,
  className,
  as: Component = 'h5',
}) => (
  <Component className={cn('text-lg font-semibold', className)}>
    {children}
  </Component>
);

export const Heading6: React.FC<TypographyProps> = ({
  children,
  className,
  as: Component = 'h6',
}) => (
  <Component className={cn('text-base font-semibold', className)}>
    {children}
  </Component>
);

export const Paragraph: React.FC<TypographyProps> = ({
  children,
  className,
  as: Component = 'p',
}) => (
  <Component className={cn('leading-7 [&:not(:first-child)]:mt-6', className)}>
    {children}
  </Component>
);

export const Large: React.FC<TypographyProps> = ({
  children,
  className,
  as: Component = 'div',
}) => (
  <Component className={cn('text-lg font-semibold', className)}>
    {children}
  </Component>
);

export const Small: React.FC<TypographyProps> = ({
  children,
  className,
  as: Component = 'small',
}) => (
  <Component className={cn('text-sm font-medium leading-none', className)}>
    {children}
  </Component>
);

export const Muted: React.FC<TypographyProps> = ({
  children,
  className,
  as: Component = 'p',
}) => (
  <Component className={cn('text-sm text-muted-foreground', className)}>
    {children}
  </Component>
);

export const Lead: React.FC<TypographyProps> = ({
  children,
  className,
  as: Component = 'p',
}) => (
  <Component className={cn('text-xl text-muted-foreground', className)}>
    {children}
  </Component>
);

export const Code: React.FC<TypographyProps> = ({
  children,
  className,
  as: Component = 'code',
}) => (
  <Component
    className={cn(
      'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
      className
    )}
  >
    {children}
  </Component>
);
