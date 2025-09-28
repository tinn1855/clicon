import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface ShadcnPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageSize: number;
  onPageSizeChange: (size: number) => void;
  totalCount: number;
  isLoading?: boolean;
  className?: string;
}

export const ShadcnPagination: React.FC<ShadcnPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  pageSize,
  onPageSizeChange,
  totalCount,
  isLoading = false,
  className = '',
}) => {
  const pageSizeOptions = [10, 20, 50, 100];

  // Generate visible pages with smart ellipsis
  const getVisiblePages = () => {
    const pages = [];
    const showEllipsisThreshold = 7; // Show ellipsis when more than 7 pages

    if (totalPages <= showEllipsisThreshold) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage <= 3) {
        // Near beginning: show 1, 2, 3, 4, ..., last
        pages.push(2, 3, 4);
        if (totalPages > 4) {
          pages.push('ellipsis');
          pages.push(totalPages);
        }
      } else if (currentPage >= totalPages - 2) {
        // Near end: show 1, ..., last-3, last-2, last-1, last
        pages.push('ellipsis');
        pages.push(totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        // Middle: show 1, ..., current-1, current, current+1, ..., last
        pages.push('ellipsis');
        pages.push(currentPage - 1, currentPage, currentPage + 1);
        pages.push('ellipsis');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const visiblePages = getVisiblePages();
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalCount);

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div
      className={cn(
        'w-full min-w-[375px] px-3 sm:px-4 lg:px-8 mx-auto',
        className
      )}
    >
      <div className="flex gap-3 flex-row items-center justify-between">
        {/* Results info */}
        <div className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
          <span className="hidden sm:inline">
            Showing {startItem.toLocaleString()} to {endItem.toLocaleString()}{' '}
            of {totalCount.toLocaleString()} results
          </span>
          <span className="sm:hidden">
            {startItem}-{endItem} of {totalCount.toLocaleString()}
          </span>
        </div>

        {/* Page size selector - mobile responsive */}
        <div className="flex items-center gap-2 justify-center sm:justify-end">
          <span className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">
            <span className="hidden sm:inline">Show</span>
            <span className="sm:hidden">Per page:</span>
          </span>
          <Select
            value={pageSize.toString()}
            onValueChange={(value) => onPageSizeChange(Number(value))}
            disabled={isLoading}
          >
            <SelectTrigger className="w-16 sm:w-20 h-7 sm:h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {pageSizeOptions.map((option) => (
                <SelectItem key={option} value={option.toString()}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className="hidden sm:inline text-xs sm:text-sm text-muted-foreground">
            per page
          </span>
        </div>
      </div>

      {/* Pagination navigation */}
      <Pagination className="mt-4">
        <PaginationContent className="flex-wrap justify-center gap-1">
          {/* Previous button - hidden on small screens, shown on md+ */}
          <PaginationItem className="hidden md:block">
            <PaginationPrevious
              onClick={() => onPageChange(currentPage - 1)}
              className={cn('cursor-pointer h-8 px-2 sm:h-9 sm:px-3', {
                'pointer-events-none opacity-50': currentPage <= 1 || isLoading,
                'hover:bg-accent hover:text-accent-foreground':
                  currentPage > 1 && !isLoading,
              })}
            />
          </PaginationItem>

          {/* Mobile compact previous for small screens */}
          <PaginationItem className="md:hidden">
            <PaginationLink
              onClick={() => onPageChange(currentPage - 1)}
              className={cn('cursor-pointer h-8 w-8 p-0 text-sm font-bold', {
                'pointer-events-none opacity-50': currentPage <= 1 || isLoading,
                'hover:bg-accent hover:text-accent-foreground':
                  currentPage > 1 && !isLoading,
              })}
            >
              {'<'}
            </PaginationLink>
          </PaginationItem>

          {/* Page numbers */}
          {visiblePages.map((page, index) => (
            <PaginationItem key={index}>
              {page === 'ellipsis' ? (
                <PaginationEllipsis className="h-8 w-8 sm:h-9 sm:w-9" />
              ) : (
                <PaginationLink
                  onClick={() => onPageChange(page as number)}
                  isActive={page === currentPage}
                  className={cn(
                    'cursor-pointer h-8 w-8 sm:h-9 sm:w-9 text-xs sm:text-sm',
                    {
                      'pointer-events-none': isLoading,
                      'bg-primary text-primary-foreground hover:bg-primary/80':
                        page === currentPage,
                      'hover:bg-accent hover:text-accent-foreground':
                        page !== currentPage && !isLoading,
                    }
                  )}
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          {/* Mobile compact next for small screens */}
          <PaginationItem className="md:hidden">
            <PaginationLink
              onClick={() => onPageChange(currentPage + 1)}
              className={cn('cursor-pointer h-8 w-8 p-0 text-sm font-bold', {
                'pointer-events-none opacity-50':
                  currentPage >= totalPages || isLoading,
                'hover:bg-accent hover:text-accent-foreground':
                  currentPage < totalPages && !isLoading,
              })}
            >
              {'>'}
            </PaginationLink>
          </PaginationItem>

          {/* Next button - hidden on small screens, shown on md+ */}
          <PaginationItem className="hidden md:block">
            <PaginationNext
              onClick={() => onPageChange(currentPage + 1)}
              className={cn('cursor-pointer h-8 px-2 sm:h-9 sm:px-3', {
                'pointer-events-none opacity-50':
                  currentPage >= totalPages || isLoading,
                'hover:bg-accent hover:text-accent-foreground':
                  currentPage < totalPages && !isLoading,
              })}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-background/50 flex items-center justify-center rounded-md">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            Loading...
          </div>
        </div>
      )}
    </div>
  );
};
