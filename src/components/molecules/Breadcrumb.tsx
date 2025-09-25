import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  className?: string;
  showHome?: boolean;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator = <ChevronRight className="h-4 w-4 text-muted-foreground" />,
  className,
  showHome = true,
}) => {
  const breadcrumbItems = showHome
    ? [{ label: 'Home', href: '/' }, ...items]
    : items;

  return (
    <nav className={cn('flex items-center space-x-1 text-sm', className)}>
      {breadcrumbItems.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <span className="flex items-center">{separator}</span>}

          <div className="flex items-center">
            {index === 0 && showHome && <Home className="h-4 w-4 mr-1" />}

            {item.href && !item.current ? (
              <a
                href={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </a>
            ) : (
              <span
                className={cn(
                  'font-medium',
                  item.current ? 'text-foreground' : 'text-muted-foreground'
                )}
              >
                {item.label}
              </span>
            )}
          </div>
        </React.Fragment>
      ))}
    </nav>
  );
};
