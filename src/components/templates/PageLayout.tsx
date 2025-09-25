import React from 'react';
import { Header, Footer } from '../organisms';
import { cn } from '@/lib/utils';

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
  showHeader?: boolean;
  showFooter?: boolean;
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  className,
  showHeader = true,
  showFooter = true,
}) => {
  return (
    <div className="min-h-screen flex flex-col">
      {showHeader && <Header />}

      <main className={cn('flex-1', className)}>{children}</main>

      {showFooter && <Footer />}
    </div>
  );
};
